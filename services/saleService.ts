import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  Sale,
} from "@/types/sale";

// =====================================================
// COLLECTIONS
// =====================================================

const SALES_COLLECTION =
  "sales";

const INVENTORY_COLLECTION =
  "inventory";

const HISTORY_COLLECTION =
  "inventoryStockHistory";

const INVOICE_COLLECTION =
  "invoices";

const COUNTER_COLLECTION =
  "counters";

const salesCollection =
  collection(
    db,
    SALES_COLLECTION
  );

const historyCollection =
  collection(
    db,
    HISTORY_COLLECTION
  );

const invoiceCollection =
  collection(
    db,
    INVOICE_COLLECTION
  );

// =====================================================
// CACHE
// =====================================================

let salesCache:
  Sale[] | null = null;

let salesCacheTime = 0;

const SALES_CACHE_TTL =
  30 * 1000;

// =====================================================
// INVALIDATE CACHE
// =====================================================

function invalidateSalesCache() {
  salesCache = null;
  salesCacheTime = 0;
}

// =====================================================
// INVENTORY STATUS
// =====================================================

function calculateInventoryStatus(
  stockQty: number,
  minimumStock: number
) {
  if (
    stockQty <= 0
  ) {
    return "Out of Stock";
  }

  if (
    stockQty <=
    minimumStock
  ) {
    return "Low Stock";
  }

  return "In Stock";
}

// =====================================================
// FINANCIAL YEAR
// =====================================================

function getFinancialYear(): string {
  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    today.getMonth() + 1;

  if (
    month >= 4
  ) {
    return `${String(
      year
    ).slice(-2)}-${String(
      year + 1
    ).slice(-2)}`;
  }

  return `${String(
    year - 1
  ).slice(-2)}-${String(
    year
  ).slice(-2)}`;
}

// =====================================================
// CLEAN SALE
// =====================================================

function cleanSaleData(
  sale: Omit<Sale, "id">
): Record<string, unknown> {
  const data: Record<
    string,
    unknown
  > = {
    saleNo:
      sale.saleNo,

    customerName:
      sale.customerName,

    mobile:
      sale.mobile,

    items:
      sale.items,

    subTotal:
      sale.subTotal,

    discount:
      sale.discount,

    gst:
      sale.gst,

    grandTotal:
      sale.grandTotal,

    paymentMethod:
      sale.paymentMethod,

    paymentStatus:
      sale.paymentStatus,

    status:
      sale.status,

    remarks:
      sale.remarks || "",

    createdAt:
      sale.createdAt,

    updatedAt:
      sale.updatedAt,
  };

  if (
    sale.customerId
  ) {
    data.customerId =
      sale.customerId;
  }

  if (
    sale.email
  ) {
    data.email =
      sale.email;
  }

  return data;
}

// =====================================================
// GET SALES
// =====================================================

export async function getSales(
  forceRefresh = false
): Promise<Sale[]> {
  const now =
    Date.now();

  if (
    !forceRefresh &&
    salesCache &&
    now -
      salesCacheTime <
      SALES_CACHE_TTL
  ) {
    return salesCache;
  }

  const q =
    query(
      salesCollection,

      orderBy(
        "createdAt",
        "desc"
      )
    );

  const snapshot =
    await getDocs(q);

  const result =
    snapshot.docs.map(
      (document) => ({
        id:
          document.id,

        ...(document.data() as Omit<
          Sale,
          "id"
        >),
      })
    );

  salesCache =
    result;

  salesCacheTime =
    now;

  return result;
}

// =====================================================
// GET SALE BY ID
// =====================================================

export async function getSaleById(
  id: string
): Promise<Sale | null> {
  const saleRef =
    doc(
      db,
      SALES_COLLECTION,
      id
    );

  const snapshot =
    await getDoc(
      saleRef
    );

  if (
    !snapshot.exists()
  ) {
    return null;
  }

  return {
    id:
      snapshot.id,

    ...(snapshot.data() as Omit<
      Sale,
      "id"
    >),
  };
}

// =====================================================
// ADD SALE ONLY
// =====================================================

export async function addSale(
  sale: Omit<Sale, "id">
) {
  const result =
    await addDoc(
      salesCollection,
      cleanSaleData(
        sale
      )
    );

  invalidateSalesCache();

  return result;
}

// =====================================================
// CREATE SALE + INVENTORY + HISTORY + INVOICE
// =====================================================

export async function createSaleWithInventory(
  sale: Omit<Sale, "id">
) {
  if (
    !sale.items ||
    sale.items.length ===
      0
  ) {
    throw new Error(
      "Sale must contain at least one item."
    );
  }

  const quantityMap =
    new Map<
      string,
      number
    >();

  for (
    const item of sale.items
  ) {
    const inventoryId =
      String(
        item.inventoryId ||
          ""
      ).trim();

    const quantity =
      Math.floor(
        Number(
          item.quantity ||
            0
        )
      );

    if (
      !inventoryId
    ) {
      throw new Error(
        `Inventory ID missing for "${item.name}".`
      );
    }

    if (
      quantity <= 0
    ) {
      throw new Error(
        `Invalid quantity for "${item.name}".`
      );
    }

    quantityMap.set(
      inventoryId,

      (
        quantityMap.get(
          inventoryId
        ) || 0
      ) +
        quantity
    );
  }

  if (
    quantityMap.size ===
    0
  ) {
    throw new Error(
      "No valid inventory items selected."
    );
  }

  const saleRef =
    doc(
      salesCollection
    );

  const invoiceRef =
    doc(
      invoiceCollection
    );

  const now =
    new Date().toISOString();

  const financialYear =
    getFinancialYear();

  const counterRef =
    doc(
      db,
      COUNTER_COLLECTION,
      `invoice_${financialYear}`
    );

  let createdInvoiceNo =
    "";

  await runTransaction(
    db,
    async (
      transaction
    ) => {
      // ================================================
      // READS FIRST
      // ================================================

      const inventoryData =
        new Map<
          string,
          {
            ref: ReturnType<
              typeof doc
            >;

            data: Record<
              string,
              unknown
            >;
          }
        >();

      for (
        const inventoryId of
          quantityMap.keys()
      ) {
        const inventoryRef =
          doc(
            db,
            INVENTORY_COLLECTION,
            inventoryId
          );

        const snapshot =
          await transaction.get(
            inventoryRef
          );

        if (
          !snapshot.exists()
        ) {
          throw new Error(
            `Inventory item not found: ${inventoryId}`
          );
        }

        inventoryData.set(
          inventoryId,
          {
            ref:
              inventoryRef,

            data:
              snapshot.data(),
          }
        );
      }

      // ================================================
      // COUNTER READ
      // ================================================

      const counterSnapshot =
        await transaction.get(
          counterRef
        );

      const currentCounter =
        counterSnapshot.exists()
          ? Number(
              counterSnapshot
                .data()
                .current || 0
            )
          : 0;

      const nextInvoiceNumber =
        currentCounter +
        1;

      const generatedInvoiceNo =
        `WKD-INV-${financialYear}-${String(
          nextInvoiceNumber
        ).padStart(
          6,
          "0"
        )}`;

      createdInvoiceNo =
        generatedInvoiceNo;

      // ================================================
      // VALIDATE STOCK
      // ================================================

      for (
        const [
          inventoryId,
          quantity,
        ] of quantityMap
      ) {
        const inventory =
          inventoryData.get(
            inventoryId
          );

        if (
          !inventory
        ) {
          throw new Error(
            "Inventory data not found."
          );
        }

        const currentStock =
          Number(
            inventory.data
              .stockQty || 0
          );

        if (
          quantity >
          currentStock
        ) {
          throw new Error(
            `Insufficient stock for "${
              inventory.data.name ||
              "Inventory Item"
            }". Available: ${currentStock}, Required: ${quantity}.`
          );
        }
      }

      // ================================================
      // COUNTER WRITE
      // ================================================

      transaction.set(
        counterRef,
        {
          current:
            nextInvoiceNumber,

          updatedAt:
            now,
        },
        {
          merge:
            true,
        }
      );

      // ================================================
      // STOCK OUT + HISTORY
      // ================================================

      for (
        const [
          inventoryId,
          quantity,
        ] of quantityMap
      ) {
        const inventory =
          inventoryData.get(
            inventoryId
          );

        if (
          !inventory
        ) {
          throw new Error(
            "Inventory data not found."
          );
        }

        const current =
          inventory.data;

        const previousStock =
          Number(
            current.stockQty || 0
          );

        const minimumStock =
          Number(
            current.minimumStock ||
              0
          );

        const newStock =
          previousStock -
          quantity;

        const status =
          calculateInventoryStatus(
            newStock,
            minimumStock
          );

        transaction.update(
          inventory.ref,
          {
            stockQty:
              newStock,

            status,

            updatedAt:
              now,
          }
        );

        const historyRef =
          doc(
            historyCollection
          );

        transaction.set(
          historyRef,
          {
            inventoryId,

            sku:
              String(
                current.sku ||
                  ""
              ),

            itemName:
              String(
                current.name ||
                  "Inventory Item"
              ),

            type:
              "Stock Out",

            quantity,

            previousStock,

            newStock,

            reason:
              "Sale",

            reference:
              sale.saleNo,

            createdAt:
              now,
          }
        );
      }

      // ================================================
      // INVOICE ITEMS
      // ================================================

      const invoiceItems =
        sale.items.map(
          (item) => ({
            id:
              item.id,

            name:
              item.name,

            qty:
              Number(
                item.quantity
              ),

            price:
              Number(
                item.unitPrice
              ),

            total:
              Number(
                item.total
              ),
          })
        );

      // ================================================
      // INVOICE
      // ================================================

      transaction.set(
        invoiceRef,
        {
          invoiceNo:
            generatedInvoiceNo,

          customerId:
            sale.customerId ||
            "",

          customerName:
            sale.customerName,

          mobile:
            sale.mobile,

          email:
            sale.email ||
            "",

          items:
            invoiceItems,

          subTotal:
            Number(
              sale.subTotal ||
                0
            ),

          discount:
            Number(
              sale.discount ||
                0
            ),

          gst:
            Number(
              sale.gst ||
                0
            ),

          grandTotal:
            Number(
              sale.grandTotal ||
                0
            ),

          paymentMethod:
            sale.paymentMethod,

          createdAt:
            sale.createdAt ||
            now,

          remarks:
            sale.remarks ||
            "",

          saleId:
            saleRef.id,

          saleNo:
            sale.saleNo,
        }
      );

      // ================================================
      // SALE
      // ================================================

      const saleData =
        cleanSaleData(
          sale
        );

      saleData.createdAt =
        sale.createdAt ||
        now;

      saleData.updatedAt =
        now;

      saleData.invoiceId =
        invoiceRef.id;

      saleData.invoiceNo =
        generatedInvoiceNo;

      transaction.set(
        saleRef,
        saleData
      );
    }
  );

  if (
    !createdInvoiceNo
  ) {
    throw new Error(
      "Invoice number could not be generated."
    );
  }

  invalidateSalesCache();

  return {
    id:
      saleRef.id,

    saleNo:
      sale.saleNo,

    invoiceId:
      invoiceRef.id,

    invoiceNo:
      createdInvoiceNo,

    stockUpdated:
      true,

    invoiceCreated:
      true,
  };
}

// =====================================================
// UPDATE SALE
// =====================================================

export async function updateSale(
  id: string,
  sale: Partial<Sale>
) {
  const saleRef =
    doc(
      db,
      SALES_COLLECTION,
      id
    );

  const cleanData: Record<
    string,
    unknown
  > = {};

  Object.entries(
    sale
  ).forEach(
    ([key, value]) => {
      if (
        value !== undefined
      ) {
        cleanData[key] =
          value;
      }
    }
  );

  cleanData.updatedAt =
    new Date().toISOString();

  await updateDoc(
    saleRef,
    cleanData
  );

  invalidateSalesCache();
}

// =====================================================
// DELETE SALE
// =====================================================

export async function deleteSale(
  id: string
) {
  const saleRef =
    doc(
      db,
      SALES_COLLECTION,
      id
    );

  await deleteDoc(
    saleRef
  );

  invalidateSalesCache();
}