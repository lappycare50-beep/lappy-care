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
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  InventoryItem,
  StockTransaction,
} from "@/types/inventory";

const INVENTORY_COLLECTION =
  "inventory";

const HISTORY_COLLECTION =
  "inventoryStockHistory";

const inventoryCollection =
  collection(
    db,
    INVENTORY_COLLECTION
  );

const historyCollection =
  collection(
    db,
    HISTORY_COLLECTION
  );

// =====================================================
// CACHE
// =====================================================

let inventoryCache:
  InventoryItem[] | null = null;

let inventoryCacheTime = 0;

const INVENTORY_CACHE_TTL =
  60 * 1000;

// =====================================================
// CACHE INVALIDATION
// =====================================================

function invalidateInventoryCache() {
  inventoryCache = null;
  inventoryCacheTime = 0;
}

// =====================================================
// Calculate Status
// =====================================================

export function getInventoryStatus(
  stockQty: number,
  minimumStock: number
): InventoryItem["status"] {
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
// Normalize Inventory
// =====================================================

function normalizeInventoryItem(
  document: {
    id: string;
    data: () => Record<string, unknown>;
  }
): InventoryItem {
  const data =
    document.data() as Omit<
      InventoryItem,
      "id"
    >;

  const stockQty =
    Number(
      data.stockQty || 0
    );

  const minimumStock =
    Number(
      data.minimumStock || 0
    );

  return {
    id:
      document.id,

    ...data,

    stockQty,

    minimumStock,

    purchasePrice:
      Number(
        data.purchasePrice || 0
      ),

    sellingPrice:
      Number(
        data.sellingPrice || 0
      ),

    status:
      getInventoryStatus(
        stockQty,
        minimumStock
      ),
  };
}

// =====================================================
// Get All Inventory
// =====================================================

export async function getInventoryItems(
  forceRefresh = false
): Promise<InventoryItem[]> {
  const now =
    Date.now();

  if (
    !forceRefresh &&
    inventoryCache &&
    now -
      inventoryCacheTime <
      INVENTORY_CACHE_TTL
  ) {
    return inventoryCache;
  }

  const snapshot =
    await getDocs(
      inventoryCollection
    );

  const result =
    snapshot.docs
      .map((document) =>
        normalizeInventoryItem(
          {
            id:
              document.id,

            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          }
        )
      )
      .sort((a, b) =>
        a.name.localeCompare(
          b.name
        )
      );

  inventoryCache =
    result;

  inventoryCacheTime =
    now;

  return result;
}

// =====================================================
// Get Single Inventory Item
// =====================================================

export async function getInventoryItemById(
  id: string
): Promise<InventoryItem | null> {
  const itemRef =
    doc(
      db,
      INVENTORY_COLLECTION,
      id
    );

  const snapshot =
    await getDoc(
      itemRef
    );

  if (
    !snapshot.exists()
  ) {
    return null;
  }

  const data =
    snapshot.data() as Omit<
      InventoryItem,
      "id"
    >;

  const stockQty =
    Number(
      data.stockQty || 0
    );

  const minimumStock =
    Number(
      data.minimumStock || 0
    );

  return {
    id:
      snapshot.id,

    ...data,

    stockQty,

    minimumStock,

    purchasePrice:
      Number(
        data.purchasePrice || 0
      ),

    sellingPrice:
      Number(
        data.sellingPrice || 0
      ),

    status:
      getInventoryStatus(
        stockQty,
        minimumStock
      ),
  };
}

// =====================================================
// ADD INVENTORY ITEM
// =====================================================

export async function addInventoryItem(
  item: Omit<
    InventoryItem,
    "id"
  >
) {
  const itemRef =
    doc(
      inventoryCollection
    );

  const historyRef =
    doc(
      historyCollection
    );

  const stockQty =
    Number(
      item.stockQty || 0
    );

  const minimumStock =
    Number(
      item.minimumStock || 0
    );

  const now =
    new Date().toISOString();

  await runTransaction(
    db,
    async (
      transaction
    ) => {
      transaction.set(
        itemRef,
        {
          ...item,

          purchasePrice:
            Number(
              item.purchasePrice || 0
            ),

          sellingPrice:
            Number(
              item.sellingPrice || 0
            ),

          stockQty,

          minimumStock,

          status:
            getInventoryStatus(
              stockQty,
              minimumStock
            ),

          createdAt:
            item.createdAt ||
            now,

          updatedAt:
            now,
        }
      );

      if (
        stockQty > 0
      ) {
        transaction.set(
          historyRef,
          {
            inventoryId:
              itemRef.id,

            sku:
              item.sku,

            itemName:
              item.name,

            type:
              "Initial Stock",

            quantity:
              stockQty,

            previousStock:
              0,

            newStock:
              stockQty,

            reason:
              "Opening stock",

            createdAt:
              now,
          } satisfies Omit<
            StockTransaction,
            "id"
          >
        );
      }
    }
  );

  invalidateInventoryCache();

  return {
    id:
      itemRef.id,
  };
}

// =====================================================
// UPDATE INVENTORY ITEM
// =====================================================

export async function updateInventoryItem(
  id: string,
  item: Partial<InventoryItem>
) {
  const itemRef =
    doc(
      db,
      INVENTORY_COLLECTION,
      id
    );

  const snapshot =
    await getDoc(
      itemRef
    );

  if (
    !snapshot.exists()
  ) {
    throw new Error(
      "Inventory item not found."
    );
  }

  const current =
    snapshot.data() as Omit<
      InventoryItem,
      "id"
    >;

  const nextStock =
    item.stockQty !==
    undefined
      ? Number(
          item.stockQty
        )
      : Number(
          current.stockQty || 0
        );

  const nextMinimumStock =
    item.minimumStock !==
    undefined
      ? Number(
          item.minimumStock
        )
      : Number(
          current.minimumStock || 0
        );

  await updateDoc(
    itemRef,
    {
      ...item,

      stockQty:
        nextStock,

      minimumStock:
        nextMinimumStock,

      purchasePrice:
        item.purchasePrice !==
        undefined
          ? Number(
              item.purchasePrice
            )
          : Number(
              current.purchasePrice || 0
            ),

      sellingPrice:
        item.sellingPrice !==
        undefined
          ? Number(
              item.sellingPrice
            )
          : Number(
              current.sellingPrice || 0
            ),

      status:
        getInventoryStatus(
          nextStock,
          nextMinimumStock
        ),

      updatedAt:
        new Date().toISOString(),
    }
  );

  invalidateInventoryCache();
}

// =====================================================
// STOCK IN
// =====================================================

export async function stockIn(
  id: string,
  quantity: number,
  reason = "",
  reference = ""
) {
  const qty =
    Math.floor(
      Number(quantity)
    );

  if (
    !Number.isFinite(qty) ||
    qty <= 0
  ) {
    throw new Error(
      "Stock In quantity must be greater than 0."
    );
  }

  const itemRef =
    doc(
      db,
      INVENTORY_COLLECTION,
      id
    );

  const historyRef =
    doc(
      historyCollection
    );

  const now =
    new Date().toISOString();

  let result:
    StockTransaction | null =
    null;

  await runTransaction(
    db,
    async (
      transaction
    ) => {
      const snapshot =
        await transaction.get(
          itemRef
        );

      if (
        !snapshot.exists()
      ) {
        throw new Error(
          "Inventory item not found."
        );
      }

      const current =
        snapshot.data() as Omit<
          InventoryItem,
          "id"
        >;

      const previousStock =
        Number(
          current.stockQty || 0
        );

      const newStock =
        previousStock +
        qty;

      const minimumStock =
        Number(
          current.minimumStock || 0
        );

      transaction.update(
        itemRef,
        {
          stockQty:
            newStock,

          status:
            getInventoryStatus(
              newStock,
              minimumStock
            ),

          updatedAt:
            now,
        }
      );

      result = {
        id:
          historyRef.id,

        inventoryId:
          id,

        sku:
          current.sku,

        itemName:
          current.name,

        type:
          "Stock In",

        quantity:
          qty,

        previousStock,

        newStock,

        reason:
          reason.trim(),

        reference:
          reference.trim(),

        createdAt:
          now,
      };

      transaction.set(
        historyRef,
        result
      );
    }
  );

  invalidateInventoryCache();

  return result;
}

// =====================================================
// STOCK OUT
// =====================================================

export async function stockOut(
  id: string,
  quantity: number,
  reason = "",
  reference = ""
) {
  const qty =
    Math.floor(
      Number(quantity)
    );

  if (
    !Number.isFinite(qty) ||
    qty <= 0
  ) {
    throw new Error(
      "Stock Out quantity must be greater than 0."
    );
  }

  const itemRef =
    doc(
      db,
      INVENTORY_COLLECTION,
      id
    );

  const historyRef =
    doc(
      historyCollection
    );

  const now =
    new Date().toISOString();

  let result:
    StockTransaction | null =
    null;

  await runTransaction(
    db,
    async (
      transaction
    ) => {
      const snapshot =
        await transaction.get(
          itemRef
        );

      if (
        !snapshot.exists()
      ) {
        throw new Error(
          "Inventory item not found."
        );
      }

      const current =
        snapshot.data() as Omit<
          InventoryItem,
          "id"
        >;

      const previousStock =
        Number(
          current.stockQty || 0
        );

      if (
        qty >
        previousStock
      ) {
        throw new Error(
          `Insufficient stock. Available stock: ${previousStock}.`
        );
      }

      const newStock =
        previousStock -
        qty;

      const minimumStock =
        Number(
          current.minimumStock || 0
        );

      transaction.update(
        itemRef,
        {
          stockQty:
            newStock,

          status:
            getInventoryStatus(
              newStock,
              minimumStock
            ),

          updatedAt:
            now,
        }
      );

      result = {
        id:
          historyRef.id,

        inventoryId:
          id,

        sku:
          current.sku,

        itemName:
          current.name,

        type:
          "Stock Out",

        quantity:
          qty,

        previousStock,

        newStock,

        reason:
          reason.trim(),

        reference:
          reference.trim(),

        createdAt:
          now,
      };

      transaction.set(
        historyRef,
        result
      );
    }
  );

  invalidateInventoryCache();

  return result;
}

// =====================================================
// STOCK ADJUSTMENT
// =====================================================

export async function adjustStock(
  id: string,
  newStock: number,
  reason = ""
) {
  const quantity =
    Math.floor(
      Number(newStock)
    );

  if (
    !Number.isFinite(
      quantity
    ) ||
    quantity < 0
  ) {
    throw new Error(
      "Stock quantity cannot be negative."
    );
  }

  const itemRef =
    doc(
      db,
      INVENTORY_COLLECTION,
      id
    );

  const historyRef =
    doc(
      historyCollection
    );

  const now =
    new Date().toISOString();

  let result:
    StockTransaction | null =
    null;

  await runTransaction(
    db,
    async (
      transaction
    ) => {
      const snapshot =
        await transaction.get(
          itemRef
        );

      if (
        !snapshot.exists()
      ) {
        throw new Error(
          "Inventory item not found."
        );
      }

      const current =
        snapshot.data() as Omit<
          InventoryItem,
          "id"
        >;

      const previousStock =
        Number(
          current.stockQty || 0
        );

      const minimumStock =
        Number(
          current.minimumStock || 0
        );

      transaction.update(
        itemRef,
        {
          stockQty:
            quantity,

          status:
            getInventoryStatus(
              quantity,
              minimumStock
            ),

          updatedAt:
            now,
        }
      );

      result = {
        id:
          historyRef.id,

        inventoryId:
          id,

        sku:
          current.sku,

        itemName:
          current.name,

        type:
          "Adjustment",

        quantity:
          Math.abs(
            quantity -
              previousStock
          ),

        previousStock,

        newStock:
          quantity,

        reason:
          reason.trim() ||
          "Stock adjustment",

        createdAt:
          now,
      };

      transaction.set(
        historyRef,
        result
      );
    }
  );

  invalidateInventoryCache();

  return result;
}

// =====================================================
// GET STOCK HISTORY
// =====================================================

export async function getStockHistory(
  inventoryId?: string
): Promise<
  StockTransaction[]
> {
  let snapshot;

  if (
    inventoryId
  ) {
    const q =
      query(
        historyCollection,

        where(
          "inventoryId",
          "==",
          inventoryId
        )
      );

    snapshot =
      await getDocs(q);
  } else {
    const q =
      query(
        historyCollection,

        orderBy(
          "createdAt",
          "desc"
        )
      );

    snapshot =
      await getDocs(q);
  }

  return snapshot.docs
    .map(
      (document) => ({
        id:
          document.id,

        ...(document.data() as Omit<
          StockTransaction,
          "id"
        >),
      })
    )
    .sort(
      (a, b) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    );
}

// =====================================================
// DELETE INVENTORY ITEM
// =====================================================

export async function deleteInventoryItem(
  id: string
) {
  const itemRef =
    doc(
      db,
      INVENTORY_COLLECTION,
      id
    );

  await deleteDoc(
    itemRef
  );

  invalidateInventoryCache();
}