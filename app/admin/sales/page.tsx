"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CircleDollarSign,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import {
  toPng,
} from "html-to-image";

import jsPDF from "jspdf";

import AdminLayout from "@/components/admin/AdminLayout";

import SalesCustomerSelector from "@/components/sales/SalesCustomerSelector";

import InvoicePrint from "@/components/invoice/InvoicePrint";

import type {
  InventoryItem,
} from "@/types/inventory";

import type {
  Sale,
  SaleItem,
  SalePaymentMethod,
} from "@/types/sale";

import type {
  Invoice,
} from "@/types/invoice";

import {
  getInventoryItems,
} from "@/services/inventoryService";

import {
  createSaleWithInventory,
  getSales,
} from "@/services/saleService";

// =====================================================
// HELPERS
// =====================================================

function getToday(): string {
  return new Date()
    .toISOString()
    .split("T")[0];
}

function generateSaleNumber(): string {
  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  const unique =
    String(
      Date.now()
    ).slice(-6);

  return `WKD-SALE-${year}${month}${day}-${unique}`;
}

function createEmptyItem(): SaleItem {
  return {
    id:
      crypto.randomUUID(),

    inventoryId:
      "",

    sku:
      "",

    name:
      "",

    category:
      "",

    quantity:
      1,

    unitPrice:
      0,

    total:
      0,
  };
}

function formatCurrency(
  value: number
): string {
  return `₹${Number(
    value || 0
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
}

// =====================================================
// PAGE
// =====================================================

export default function SalesPage() {
  // ===================================================
  // CUSTOMER
  // ===================================================

  const [
    customerId,
    setCustomerId,
  ] = useState<
    string | undefined
  >(undefined);

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    mobile,
    setMobile,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  // ===================================================
  // SALE
  // ===================================================

  const [
    saleNo,
    setSaleNo,
  ] = useState(
    generateSaleNumber()
  );

  const [
    saleDate,
    setSaleDate,
  ] = useState(
    getToday()
  );

  // ===================================================
  // ITEMS
  // ===================================================

  const [
    items,
    setItems,
  ] = useState<SaleItem[]>([
    createEmptyItem(),
  ]);

  // ===================================================
  // INVENTORY
  // ===================================================

  const [
    inventoryItems,
    setInventoryItems,
  ] = useState<
    InventoryItem[]
  >([]);

  const [
    inventoryLoading,
    setInventoryLoading,
  ] = useState(true);

  const [
    inventorySearch,
    setInventorySearch,
  ] = useState("");

  // ===================================================
  // SALES
  // ===================================================

  const [
    sales,
    setSales,
  ] = useState<
    Sale[]
  >([]);

  const [
    salesLoading,
    setSalesLoading,
  ] = useState(true);

  const [
    salesSearch,
    setSalesSearch,
  ] = useState("");

  // ===================================================
  // TOTALS
  // ===================================================

  const [
    discount,
    setDiscount,
  ] = useState(0);

  const [
    gst,
    setGst,
  ] = useState(18);

  // ===================================================
  // PAYMENT
  // ===================================================

  const [
    paymentMethod,
    setPaymentMethod,
  ] =
    useState<SalePaymentMethod>(
      "Cash"
    );

  const [
    paymentStatus,
    setPaymentStatus,
  ] = useState<
    "Pending" | "Paid" | "Partial"
  >("Paid");

  const [
    remarks,
    setRemarks,
  ] = useState("");

  // ===================================================
  // UI
  // ===================================================

  const [
    saving,
    setSaving,
  ] = useState(false);

  // ===================================================
  // PDF
  // ===================================================

  const pdfRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    pdfInvoice,
    setPdfInvoice,
  ] = useState<
    Invoice | null
  >(null);

  // ===================================================
  // LOAD INVENTORY
  // ===================================================

  async function loadInventory(
    forceRefresh = false
  ) {
    try {
      setInventoryLoading(
        true
      );

      const data =
        await getInventoryItems(forceRefresh);

      setInventoryItems(
        data
      );
    } catch (error) {
      console.error(
        "Failed to load inventory:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to load inventory."
      );
    } finally {
      setInventoryLoading(
        false
      );
    }
  }

  // ===================================================
  // LOAD SALES
  // ===================================================

  async function loadSales() {
    try {
      setSalesLoading(
        true
      );

      const data =
        await getSales();

      setSales(data);
    } catch (error) {
      console.error(
        "Failed to load sales:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to load sales."
      );
    } finally {
      setSalesLoading(
        false
      );
    }
  }

  useEffect(() => {
    void loadInventory();
    void loadSales();
  }, []);

  // ===================================================
  // FILTER INVENTORY
  // ===================================================

  const filteredInventory =
    useMemo(() => {
      const keyword =
        inventorySearch
          .toLowerCase()
          .trim();

      const available =
        inventoryItems.filter(
          (item) =>
            Number(
              item.stockQty || 0
            ) > 0
        );

      if (!keyword) {
        return available;
      }

      return available.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(keyword) ||
          item.sku
            .toLowerCase()
            .includes(keyword) ||
          item.category
            .toLowerCase()
            .includes(keyword) ||
          item.brand
            ?.toLowerCase()
            .includes(keyword) ||
          item.model
            ?.toLowerCase()
            .includes(keyword)
      );
    }, [
      inventoryItems,
      inventorySearch,
    ]);

  // ===================================================
  // FILTER SALES
  // ===================================================

  const filteredSales =
    useMemo(() => {
      const keyword =
        salesSearch
          .toLowerCase()
          .trim();

      if (!keyword) {
        return sales;
      }

      return sales.filter(
        (sale) =>
          sale.saleNo
            ?.toLowerCase()
            .includes(keyword) ||
          sale.customerName
            ?.toLowerCase()
            .includes(keyword) ||
          sale.mobile
            ?.toLowerCase()
            .includes(keyword) ||
          sale.paymentMethod
            ?.toLowerCase()
            .includes(keyword) ||
          sale.status
            ?.toLowerCase()
            .includes(keyword) ||
          sale.items?.some(
            (item) =>
              item.name
                ?.toLowerCase()
                .includes(
                  keyword
                ) ||
              item.sku
                ?.toLowerCase()
                .includes(
                  keyword
                )
          )
      );
    }, [
      sales,
      salesSearch,
    ]);

  // ===================================================
  // TOTALS
  // ===================================================

  const subTotal =
    items.reduce(
      (sum, item) =>
        sum +
        Number(
          item.total || 0
        ),
      0
    );

  const safeDiscount =
    Math.min(
      Math.max(
        Number(
          discount
        ) || 0,
        0
      ),
      subTotal
    );

  const taxableAmount =
    subTotal -
    safeDiscount;

  const gstRate =
    Math.max(
      Number(
        gst
      ) || 0,
      0
    );

  const gstAmount =
    taxableAmount *
    (gstRate / 100);

  const grandTotal =
    Math.round(
      (
        taxableAmount +
        gstAmount
      ) * 100
    ) / 100;

  // ===================================================
  // DASHBOARD TOTALS
  // ===================================================

  const totalSales =
    sales.length;

  const totalRevenue =
    sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.grandTotal || 0
        ),
      0
    );

  const paidSales =
    sales.filter(
      (sale) =>
        sale.paymentStatus ===
        "Paid"
    ).length;

  const pendingSales =
    sales.filter(
      (sale) =>
        sale.paymentStatus !==
        "Paid"
    ).length;

  // ===================================================
  // ADD ITEM
  // ===================================================

  function addItem() {
    setItems(
      (previous) => [
        ...previous,
        createEmptyItem(),
      ]
    );
  }

  // ===================================================
  // REMOVE ITEM
  // ===================================================

  function removeItem(
    itemId: string
  ) {
    setItems(
      (previous) => {
        if (
          previous.length ===
          1
        ) {
          return [
            createEmptyItem(),
          ];
        }

        return previous.filter(
          (item) =>
            item.id !==
            itemId
        );
      }
    );
  }

  // ===================================================
  // SELECT INVENTORY
  // ===================================================

  function selectInventoryItem(
    rowId: string,
    inventoryId: string
  ) {
    if (!inventoryId) {
      setItems(
        (previous) =>
          previous.map(
            (item) =>
              item.id === rowId
                ? createEmptyItem()
                : item
          )
      );

      return;
    }

    const inventory =
      inventoryItems.find(
        (item) =>
          item.id ===
          inventoryId
      );

    if (!inventory) {
      alert(
        "Inventory item not found."
      );

      return;
    }

    const stock =
      Number(
        inventory.stockQty || 0
      );

    if (stock <= 0) {
      alert(
        "This item is out of stock."
      );

      return;
    }

    setItems(
      (previous) =>
        previous.map(
          (item) => {
            if (
              item.id !==
              rowId
            ) {
              return item;
            }

            const quantity =
              Math.min(
                Math.max(
                  Number(
                    item.quantity ||
                      1
                  ),
                  1
                ),
                stock
              );

            const unitPrice =
              Number(
                inventory.sellingPrice ||
                  0
              );

            return {
              ...item,

              inventoryId:
                inventory.id!,

              sku:
                inventory.sku,

              name:
                inventory.name,

              category:
                inventory.category,

              quantity,

              unitPrice,

              total:
                quantity *
                unitPrice,
            };
          }
        )
    );
  }

  // ===================================================
  // QUANTITY
  // ===================================================

  function changeQuantity(
    itemId: string,
    value: number
  ) {
    setItems(
      (previous) =>
        previous.map(
          (item) => {
            if (
              item.id !==
              itemId
            ) {
              return item;
            }

            const inventory =
              inventoryItems.find(
                (inventoryItem) =>
                  inventoryItem.id ===
                  item.inventoryId
              );

            const stock =
              Number(
                inventory?.stockQty ||
                  0
              );

            let quantity =
              Math.floor(
                Number(
                  value
                ) || 1
              );

            if (
              quantity < 1
            ) {
              quantity = 1;
            }

            if (
              stock > 0 &&
              quantity >
                stock
            ) {
              quantity =
                stock;

              alert(
                `Available stock is ${stock}.`
              );
            }

            return {
              ...item,

              quantity,

              total:
                quantity *
                Number(
                  item.unitPrice ||
                    0
                ),
            };
          }
        )
    );
  }

  // ===================================================
  // CUSTOMER
  // ===================================================

  function handleCustomerChange(
    data: {
      customerId?: string;
      customerName: string;
      mobile: string;
      email: string;
    }
  ) {
    setCustomerId(
      data.customerId
    );

    setCustomerName(
      data.customerName
    );

    setMobile(
      data.mobile
    );

    setEmail(
      data.email
    );
  }

  // ===================================================
  // VALIDATE
  // ===================================================

  function validateSale() {
    if (
      !customerName.trim()
    ) {
      alert(
        "Customer name is required."
      );

      return false;
    }

    const normalizedMobile =
      mobile.replace(
        /\D/g,
        ""
      );

    if (
      normalizedMobile.length !==
      10
    ) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );

      return false;
    }

    if (
      items.length ===
      0
    ) {
      alert(
        "Please add at least one item."
      );

      return false;
    }

    const selectedIds =
      new Set<string>();

    for (
      const item of items
    ) {
      if (
        !item.inventoryId
      ) {
        alert(
          "Please select an inventory item for every row."
        );

        return false;
      }

      if (
        selectedIds.has(
          item.inventoryId
        )
      ) {
        alert(
          `Duplicate inventory item selected: ${item.name}`
        );

        return false;
      }

      selectedIds.add(
        item.inventoryId
      );

      const quantity =
        Math.floor(
          Number(
            item.quantity
          )
        );

      if (
        quantity <= 0
      ) {
        alert(
          `Invalid quantity for ${item.name}.`
        );

        return false;
      }

      const inventory =
        inventoryItems.find(
          (inventoryItem) =>
            inventoryItem.id ===
            item.inventoryId
        );

      if (
        !inventory
      ) {
        alert(
          `Inventory item not found for ${item.name}.`
        );

        return false;
      }

      const availableStock =
        Number(
          inventory.stockQty || 0
        );

      if (
        quantity >
        availableStock
      ) {
        alert(
          `Insufficient stock for "${item.name}". Available: ${availableStock}, Required: ${quantity}.`
        );

        return false;
      }

      if (
        Number(
          item.unitPrice
        ) < 0
      ) {
        alert(
          `Invalid selling price for ${item.name}.`
        );

        return false;
      }
    }

    return true;
  }

  // ===================================================
  // SEND INVOICE PDF TO WHATSAPP
  // ===================================================

  async function sendInvoiceWhatsApp(
    invoiceData: Invoice
  ) {
    const normalizedMobile =
      invoiceData.mobile?.replace(
        /\D/g,
        ""
      );

    if (
      !normalizedMobile
    ) {
      throw new Error(
        "Customer mobile number is missing for WhatsApp."
      );
    }

    const whatsappNumber =
      normalizedMobile.length ===
      10
        ? `91${normalizedMobile}`
        : normalizedMobile;

    const pdfElement =
      pdfRef.current?.querySelector(
        "#invoice-print"
      ) as HTMLElement | null;

    if (!pdfElement) {
      throw new Error(
        "Invoice PDF could not be prepared."
      );
    }

    const imageData =
      await toPng(
        pdfElement,
        {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor:
            "#ffffff",
        }
      );

    const pdf =
      new jsPDF({
        orientation:
          "portrait",

        unit:
          "mm",

        format:
          "a4",
      });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const image =
      new Image();

    image.src =
      imageData;

    await new Promise<void>(
      (resolve, reject) => {
        image.onload =
          () => resolve();

        image.onerror =
          () =>
            reject(
              new Error(
                "Failed to load invoice image."
              )
            );
      }
    );

    const imageHeight =
      (
        image.height *
        pageWidth
      ) /
      image.width;

    let position = 0;

    let remainingHeight =
      imageHeight;

    while (
      remainingHeight > 0
    ) {
      pdf.addImage(
        imageData,
        "PNG",
        0,
        position,
        pageWidth,
        imageHeight
      );

      remainingHeight -=
        pageHeight;

      if (
        remainingHeight > 0
      ) {
        pdf.addPage();

        position -=
          pageHeight;
      }
    }

    const dataUri =
      pdf.output(
        "datauristring"
      );

    const pdfBase64 =
      dataUri.split(",")[1];

    if (!pdfBase64) {
      throw new Error(
        "Invoice PDF generation failed."
      );
    }

    const safeInvoiceNo =
      invoiceData.invoiceNo.replace(
        /[^a-zA-Z0-9-_]/g,
        "_"
      );

    const response =
      await fetch(
        "/api/invoice/send-whatsapp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              to:
                whatsappNumber,

              pdfBase64,

              filename:
                `Lappy-Care-${safeInvoiceNo}.pdf`,

              caption:
                `Hello ${
                  invoiceData.customerName ||
                  "Customer"
                },\n\nYour Lappy Care invoice ${
                  invoiceData.invoiceNo
                } is attached.\n\nThank you for choosing Lappy Care.\n\n📞 95950 57006`,
            }),
        }
      );

    const rawResponse =
      await response.text();

    let data:
      any = null;

    try {
      data =
        rawResponse
          ? JSON.parse(
              rawResponse
            )
          : null;
    } catch {
      data = {
        raw:
          rawResponse,
      };
    }

    if (
      !response.ok ||
      !data?.success
    ) {
      throw new Error(
        data?.error ||
          data?.raw ||
          "Invoice WhatsApp sending failed."
      );
    }

    return true;
  }

  // ===================================================
  // SAVE SALE
  // ===================================================

  async function handleSave() {
    if (
      !validateSale()
    ) {
      return;
    }

    try {
      setSaving(
        true
      );

      const normalizedMobile =
        mobile.replace(
          /\D/g,
          ""
        );

      const normalizedItems =
        items.map(
          (item) => {
            const quantity =
              Math.floor(
                Number(
                  item.quantity || 0
                )
              );

            const unitPrice =
              Number(
                item.unitPrice || 0
              );

            return {
              ...item,

              quantity,

              unitPrice,

              total:
                quantity *
                unitPrice,
            };
          }
        );

      const normalizedSubtotal =
        normalizedItems.reduce(
          (sum, item) =>
            sum +
            item.total,
          0
        );

      const normalizedDiscount =
        Math.min(
          Math.max(
            Number(
              discount
            ) || 0,
            0
          ),
          normalizedSubtotal
        );

      const normalizedGst =
        Math.max(
          Number(
            gst
          ) || 0,
          0
        );

      const normalizedTaxable =
        normalizedSubtotal -
        normalizedDiscount;

      const normalizedGstAmount =
        normalizedTaxable *
        (
          normalizedGst /
          100
        );

      const normalizedGrandTotal =
        Math.round(
          (
            normalizedTaxable +
            normalizedGstAmount
          ) * 100
        ) / 100;

      const now =
        new Date().toISOString();

      const createdAt =
        saleDate
          ? `${saleDate}T${now.split("T")[1]}`
          : now;

      const saleData:
        Omit<Sale, "id"> = {
        saleNo:
          saleNo.trim(),

        customerName:
          customerName.trim(),

        mobile:
          normalizedMobile,

        email:
          email.trim(),

        items:
          normalizedItems,

        subTotal:
          normalizedSubtotal,

        discount:
          normalizedDiscount,

        gst:
          normalizedGst,

        grandTotal:
          normalizedGrandTotal,

        paymentMethod,

        paymentStatus,

        status:
          "Completed",

        remarks:
          remarks.trim(),

        createdAt,

        updatedAt:
          now,

        ...(customerId
          ? {
              customerId,
            }
          : {}),
      };

      // ================================================
      // PDF DATA WILL BE CREATED AFTER TRANSACTION
      // ================================================

      const result =
        await createSaleWithInventory(
          saleData
        );

      // ================================================
      // BUILD INVOICE OBJECT
      // ================================================

      const invoiceData:
        Invoice = {
        id:
          result.invoiceId,

        invoiceNo:
          result.invoiceNo,

        customerId:
          customerId,

        customerName:
          saleData.customerName,

        mobile:
          saleData.mobile,

        email:
          saleData.email,

        items:
          normalizedItems.map(
            (item) => ({
              id:
                item.id,

              name:
                item.name,

              qty:
                item.quantity,

              price:
                item.unitPrice,

              total:
                item.total,
            })
          ),

        subTotal:
          normalizedSubtotal,

        discount:
          normalizedDiscount,

        gst:
          normalizedGst,

        grandTotal:
          normalizedGrandTotal,

        paymentMethod:
          paymentMethod,

        createdAt,

        remarks:
          remarks.trim(),
      };

      // ================================================
      // PREPARE PDF
      // ================================================

      setPdfInvoice(
        invoiceData
      );

      await new Promise<void>(
        (resolve) => {
          requestAnimationFrame(
            () => {
              requestAnimationFrame(
                () => resolve()
              );
            }
          );
        }
      );

      // ================================================
      // WHATSAPP ONLY
      // ================================================

      let whatsappSent =
        false;

      let whatsappError =
        "";

      try {
        await sendInvoiceWhatsApp(
          invoiceData
        );

        whatsappSent =
          true;
      } catch (error) {
        console.error(
          "Invoice WhatsApp error:",
          error
        );

        whatsappError =
          error instanceof Error
            ? error.message
            : "WhatsApp sending failed.";
      }

      // ================================================
      // SUCCESS MESSAGE
      // ================================================

      alert(
        `SALE COMPLETED SUCCESSFULLY

Sale Number:
${result.saleNo}

Invoice Number:
${result.invoiceNo}

Stock Updated:
${
  result.stockUpdated
    ? "YES"
    : "NO"
}

Invoice Created:
${
  result.invoiceCreated
    ? "YES"
    : "NO"
}

WhatsApp:
${
  whatsappSent
    ? "SENT"
    : `FAILED - ${whatsappError}`
}
`
      );

      // ================================================
      // RESET
      // ================================================

      setPdfInvoice(
        null
      );

      setCustomerId(
        undefined
      );

      setCustomerName(
        ""
      );

      setMobile(
        ""
      );

      setEmail(
        ""
      );

      setItems([
        createEmptyItem(),
      ]);

      setDiscount(
        0
      );

      setGst(
        18
      );

      setPaymentMethod(
        "Cash"
      );

      setPaymentStatus(
        "Paid"
      );

      setRemarks(
        ""
      );

      setSaleNo(
        generateSaleNumber()
      );

      setSaleDate(
        getToday()
      );

      await loadInventory(true);
      await loadSales();
    } catch (error) {
      console.error(
        "SALE SAVE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to complete sale."
      );
    } finally {
      setPdfInvoice(
        null
      );

      setSaving(
        false
      );
    }
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <>
      {/* =================================================
          HIDDEN INVOICE PDF
      ================================================= */}

      {pdfInvoice && (
        <div
          ref={pdfRef}
          className="fixed left-[-10000px] top-0 z-[-1] bg-white"
          style={{
            width:
              "794px",
          }}
        >
          <InvoicePrint
            invoice={
              pdfInvoice
            }
          />
        </div>
      )}

      <AdminLayout>

        <div className="min-h-screen bg-black p-5 text-white sm:p-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-3">

                <ShoppingCart
                  size={24}
                  className="text-yellow-400"
                />

              </div>

              <div>

                <h1 className="text-3xl font-black">
                  Sales
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                  Sales, inventory, invoices and customer billing.
                </p>

              </div>

            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Sale Number
              </p>

              <p className="mt-1 font-bold text-yellow-400">
                {saleNo}
              </p>

            </div>

          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              title="Loaded Sales"
              value={
                totalSales
              }
              icon={
                <ShoppingCart
                  size={20}
                />
              }
            />

            <SummaryCard
              title="Loaded Revenue"
              value={formatCurrency(
                totalRevenue
              )}
              icon={
                <CircleDollarSign
                  size={20}
                />
              }
            />

            <SummaryCard
              title="Loaded Paid"
              value={
                paidSales
              }
              icon={
                <CircleDollarSign
                  size={20}
                />
              }
            />

            <SummaryCard
              title="Loaded Pending"
              value={
                pendingSales
              }
              icon={
                <Package
                  size={20}
                />
              }
            />

          </div>

          {/* =================================================
              CUSTOMER
          ================================================= */}

          <section className="mb-6 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <div className="mb-6">

              <h2 className="text-2xl font-bold">
                Customer Details
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Select an existing customer or enter a new customer.
              </p>

            </div>

            <SalesCustomerSelector
              customerName={
                customerName
              }
              mobile={
                mobile
              }
              email={
                email
              }
              onChange={
                handleCustomerChange
              }
            />

          </section>

          {/* =================================================
              SALE DATE
          ================================================= */}

          <section className="mb-6 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <div className="max-w-md">

              <label className="mb-2 block text-sm font-semibold text-zinc-400">
                Sale Date
              </label>

              <input
                type="date"
                value={
                  saleDate
                }
                onChange={(e) =>
                  setSaleDate(
                    e.target.value
                  )
                }
                disabled={
                  saving
                }
                className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

          </section>

          {/* =================================================
              SALE ITEMS
          ================================================= */}

          <section className="mb-6 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Sale Items
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Select available inventory products.
                </p>

              </div>

              <button
                type="button"
                onClick={
                  addItem
                }
                disabled={
                  saving ||
                  inventoryLoading ||
                  inventoryItems.length ===
                    0
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-black text-black hover:bg-yellow-300 disabled:opacity-50"
              >

                <Plus
                  size={18}
                />

                Add Item

              </button>

            </div>

            {/* Inventory search */}

            <div className="relative mb-5">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                value={
                  inventorySearch
                }
                onChange={(e) =>
                  setInventorySearch(
                    e.target.value
                  )
                }
                disabled={
                  saving
                }
                placeholder="Search inventory..."
                className="w-full rounded-xl border border-zinc-800 bg-black py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
              />

            </div>

            {inventoryLoading && (
              <div className="rounded-xl border border-zinc-800 bg-black p-6 text-center text-zinc-500">
                Loading inventory...
              </div>
            )}

            {!inventoryLoading &&
              filteredInventory.length ===
                0 && (
                <div className="rounded-xl border border-dashed border-zinc-800 bg-black p-8 text-center">

                  <Package
                    size={32}
                    className="mx-auto mb-3 text-zinc-700"
                  />

                  <p className="text-sm text-zinc-500">
                    No available inventory found.
                  </p>

                </div>
              )}

            {!inventoryLoading &&
              items.map(
                (
                  item,
                  index
                ) => {

                  const selectedInventory =
                    inventoryItems.find(
                      (
                        inventoryItem
                      ) =>
                        inventoryItem.id ===
                        item.inventoryId
                    );

                  const availableStock =
                    Number(
                      selectedInventory?.stockQty ||
                        0
                    );

                  return (
                    <div
                      key={
                        item.id
                      }
                      className="mb-4 rounded-2xl border border-zinc-800 bg-black/40 p-5"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                          Item{" "}
                          {index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          disabled={
                            saving
                          }
                          className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 disabled:opacity-50"
                        >

                          <Trash2
                            size={14}
                          />

                          Remove

                        </button>

                      </div>

                      <div className="grid gap-4 md:grid-cols-4">

                        <div className="md:col-span-2">

                          <label className="mb-2 block text-xs font-semibold text-zinc-500">
                            Inventory Product
                          </label>

                          <select
                            value={
                              item.inventoryId
                            }
                            onChange={(e) =>
                              selectInventoryItem(
                                item.id,
                                e.target.value
                              )
                            }
                            disabled={
                              saving
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                          >

                            <option value="">
                              Select Inventory Item
                            </option>

                            {filteredInventory.map(
                              (
                                inventory
                              ) => (
                                <option
                                  key={
                                    inventory.id
                                  }
                                  value={
                                    inventory.id
                                  }
                                >
                                  {
                                    inventory.name
                                  }{" "}
                                  —{" "}
                                  {
                                    inventory.sku
                                  }{" "}
                                  — Stock{" "}
                                  {
                                    inventory.stockQty
                                  }
                                </option>
                              )
                            )}

                          </select>

                          {item.inventoryId && (
                            <p className="mt-2 text-xs text-zinc-500">

                              Available Stock:{" "}

                              <span className="font-bold text-blue-400">
                                {
                                  availableStock
                                }
                              </span>

                            </p>
                          )}

                        </div>

                        <div>

                          <label className="mb-2 block text-xs font-semibold text-zinc-500">
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={
                              item.quantity
                            }
                            onChange={(e) =>
                              changeQuantity(
                                item.id,
                                Number(
                                  e.target.value
                                )
                              )
                            }
                            disabled={
                              saving ||
                              !item.inventoryId
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                          />

                        </div>

                        <div>

                          <label className="mb-2 block text-xs font-semibold text-zinc-500">
                            Selling Price
                          </label>

                          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 font-bold text-yellow-400">
                            {formatCurrency(
                              item.unitPrice
                            )}
                          </div>

                        </div>

                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">

                        <span className="text-sm font-semibold text-zinc-500">
                          Line Total
                        </span>

                        <span className="text-xl font-black text-green-400">
                          {formatCurrency(
                            item.total
                          )}
                        </span>

                      </div>

                    </div>
                  );
                }
              )}

            <button
              type="button"
              onClick={
                addItem
              }
              disabled={
                saving ||
                inventoryLoading ||
                inventoryItems.length ===
                  0
              }
              className="mt-2 w-full rounded-xl border border-dashed border-zinc-800 bg-black p-4 text-sm font-bold text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-50"
            >
              + Add Another Item
            </button>

          </section>

          {/* =================================================
              SUMMARY + PAYMENT
          ================================================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

              <h2 className="mb-6 text-2xl font-bold">
                Sale Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-zinc-400">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-semibold text-white">
                    {formatCurrency(
                      subTotal
                    )}
                  </span>

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-zinc-400">
                    Discount
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      discount
                    }
                    onChange={(e) =>
                      setDiscount(
                        Math.max(
                          Number(
                            e.target.value
                          ) || 0,
                          0
                        )
                      )
                    }
                    disabled={
                      saving
                    }
                    className="w-40 rounded-xl border border-zinc-700 bg-black p-3 text-right text-white outline-none focus:border-yellow-400"
                  />

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-zinc-400">
                    GST %
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      gst
                    }
                    onChange={(e) =>
                      setGst(
                        Math.max(
                          Number(
                            e.target.value
                          ) || 0,
                          0
                        )
                      )
                    }
                    disabled={
                      saving
                    }
                    className="w-40 rounded-xl border border-zinc-700 bg-black p-3 text-right text-white outline-none focus:border-yellow-400"
                  />

                </div>

                <div className="flex justify-between text-zinc-400">

                  <span>
                    GST Amount
                  </span>

                  <span className="font-semibold text-white">
                    {formatCurrency(
                      gstAmount
                    )}
                  </span>

                </div>

                <div className="border-t border-zinc-800 pt-4">

                  <div className="flex justify-between">

                    <span className="text-lg font-bold">
                      Grand Total
                    </span>

                    <span className="text-3xl font-black text-green-400">
                      {formatCurrency(
                        grandTotal
                      )}
                    </span>

                  </div>

                </div>

              </div>

            </section>

            <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

              <div className="mb-6 flex items-center gap-3">

                <CircleDollarSign
                  size={22}
                  className="text-yellow-400"
                />

                <h2 className="text-2xl font-bold">
                  Payment
                </h2>

              </div>

              <div className="space-y-5">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-zinc-400">
                    Payment Method
                  </label>

                  <select
                    value={
                      paymentMethod
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target
                          .value as SalePaymentMethod
                      )
                    }
                    disabled={
                      saving
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                  >

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Card">
                      Card
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-zinc-400">
                    Payment Status
                  </label>

                  <select
                    value={
                      paymentStatus
                    }
                    onChange={(e) =>
                      setPaymentStatus(
                        e.target.value as
                          | "Paid"
                          | "Partial"
                          | "Pending"
                      )
                    }
                    disabled={
                      saving
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                  >

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Partial">
                      Partial
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-zinc-400">
                    Remarks
                  </label>

                  <textarea
                    value={
                      remarks
                    }
                    onChange={(e) =>
                      setRemarks(
                        e.target.value
                      )
                    }
                    disabled={
                      saving
                    }
                    rows={5}
                    placeholder="Optional sale remarks..."
                    className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
                  />

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              SAVE
          ================================================= */}

          <div className="mt-6 flex justify-end border-t border-zinc-800 pt-6">

            <button
              type="button"
              onClick={() =>
                void handleSave()
              }
              disabled={
                saving ||
                inventoryLoading
              }
              className="inline-flex min-w-[260px] items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-black text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <ShoppingCart
                size={18}
              />

              {saving
                ? "Processing Sale..."
                : "Save Sale"}

            </button>

          </div>

          {/* =================================================
              SALES HISTORY
          ================================================= */}

          <section className="mt-10 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Sales History
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  All sales created through the Sales module.
                </p>

              </div>

              <div className="relative w-full lg:w-96">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  value={
                    salesSearch
                  }
                  onChange={(e) =>
                    setSalesSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search sale, customer, mobile or item..."
                  className="w-full rounded-xl border border-zinc-800 bg-black py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
                />

              </div>

            </div>

            {salesLoading ? (
              <div className="rounded-xl border border-zinc-800 bg-black p-10 text-center text-zinc-500">
                Loading sales...
              </div>
            ) : filteredSales.length ===
              0 ? (
              <div className="rounded-xl border border-dashed border-zinc-800 bg-black p-10 text-center">

                <ShoppingCart
                  size={32}
                  className="mx-auto mb-3 text-zinc-700"
                />

                <p className="text-sm text-zinc-500">
                  No sales found.
                </p>

              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-zinc-800">

                <table className="min-w-full">

                  <thead className="bg-zinc-900">

                    <tr>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Sale No
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Date
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Customer
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Items
                      </th>

                      <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Total
                      </th>

                      <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Payment
                      </th>

                      <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Invoice
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredSales.map(
                      (sale) => {

                        const saleWithInvoice =
                          sale as Sale & {
                            invoiceId?: string;
                            invoiceNo?: string;
                          };

                        return (
                          <tr
                            key={
                              sale.id
                            }
                            className="border-t border-zinc-800 hover:bg-zinc-900"
                          >

                            <td className="px-4 py-4">

                              <p className="font-bold text-yellow-400">
                                {
                                  sale.saleNo
                                }
                              </p>

                            </td>

                            <td className="px-4 py-4 text-sm text-zinc-400">

                              {
                                sale.createdAt
                                  ?.split(
                                    "T"
                                  )[0] ||
                                "-"
                              }

                            </td>

                            <td className="px-4 py-4">

                              <p className="font-semibold text-white">
                                {
                                  sale.customerName
                                }
                              </p>

                              <p className="mt-1 text-xs text-zinc-500">
                                {
                                  sale.mobile
                                }
                              </p>

                            </td>

                            <td className="px-4 py-4">

                              <p className="font-semibold text-zinc-300">
                                {
                                  sale.items
                                    ?.length ||
                                  0
                                }{" "}
                                item(s)
                              </p>

                              <div className="mt-1 max-w-xs">

                                {sale.items
                                  ?.slice(
                                    0,
                                    2
                                  )
                                  .map(
                                    (
                                      item
                                    ) => (
                                      <p
                                        key={
                                          item.id
                                        }
                                        className="truncate text-xs text-zinc-500"
                                      >
                                        {
                                          item.name
                                        }{" "}
                                        ×{" "}
                                        {
                                          item.quantity
                                        }
                                      </p>
                                    )
                                  )}

                              </div>

                            </td>

                            <td className="px-4 py-4 text-right">

                              <p className="font-black text-green-400">
                                {formatCurrency(
                                  sale.grandTotal
                                )}
                              </p>

                            </td>

                            <td className="px-4 py-4 text-center">

                              <p className="text-xs font-bold text-blue-400">
                                {
                                  sale.paymentMethod
                                }
                              </p>

                              <p
                                className={`mt-1 text-xs font-semibold ${
                                  sale.paymentStatus ===
                                  "Paid"
                                    ? "text-green-400"
                                    : sale.paymentStatus ===
                                        "Partial"
                                      ? "text-yellow-400"
                                      : "text-red-400"
                                }`}
                              >
                                {
                                  sale.paymentStatus
                                }
                              </p>

                            </td>

                            <td className="px-4 py-4 text-center">

                              {saleWithInvoice.invoiceNo ? (
                                <div>

                                  <p className="font-bold text-purple-400">
                                    {
                                      saleWithInvoice.invoiceNo
                                    }
                                  </p>

                                  <p className="mt-1 text-[10px] text-zinc-600">
                                    Invoice Created
                                  </p>

                                </div>
                              ) : (
                                <span className="text-xs text-zinc-600">
                                  -
                                </span>
                              )}

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </section>

        </div>

      </AdminLayout>
    </>
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

      <div className="mb-4 w-fit rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-2.5 text-yellow-400">
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        {value}
      </p>

    </div>
  );
}