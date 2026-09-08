"use client";

import { useEffect, useState } from "react";

import type {
  Invoice,
  InvoiceItem,
  PaymentMethod,
} from "@/types/invoice";

import {
  addInvoice,
  updateInvoice,
} from "@/services/invoiceService";

import {
  generateInvoiceId,
} from "@/services/idGenerator";

import {
  findCustomerByMobile,
  syncCustomer,
  updateCustomerInvoice,
} from "@/services/customerService";

import {
  getRepairsByCustomerId,
} from "@/services/repairService";

type Props = {
  invoice?: Invoice | null;
  onSuccess?: () => void;
};

const createEmptyItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  name: "",
  qty: 1,
  price: 0,
  total: 0,
});

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default function InvoiceForm({
  invoice,
  onSuccess,
}: Props) {
  const isEdit = Boolean(invoice?.id);

  // =====================================================
  // CUSTOMER
  // =====================================================

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [customerLoading, setCustomerLoading] =
    useState(false);

  const [existingCustomer, setExistingCustomer] =
    useState(false);

  // =====================================================
  // INVOICE
  // =====================================================

  const [invoiceNo, setInvoiceNo] = useState("");
  const [repairId, setRepairId] = useState("");
  const [createdAt, setCreatedAt] =
    useState(getToday());

  // =====================================================
  // ITEMS
  // =====================================================

  const [items, setItems] = useState<InvoiceItem[]>([
    createEmptyItem(),
  ]);

  // =====================================================
  // TOTALS
  // =====================================================

  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(18);
  const [grandTotal, setGrandTotal] = useState(0);

  // =====================================================
  // PAYMENT
  // =====================================================

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Cash");

  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================================
  // GENERATE INVOICE NUMBER
  // =====================================================

  useEffect(() => {
    if (invoice?.id) {
      setInvoiceNo(invoice.invoiceNo);
      return;
    }

    let cancelled = false;

    async function createInvoiceNumber() {
      try {
        const generated =
          await generateInvoiceId();

        if (!cancelled) {
          setInvoiceNo(generated);
        }
      } catch (error) {
        console.error(
          "Failed to generate invoice number:",
          error
        );
      }
    }

    createInvoiceNumber();

    return () => {
      cancelled = true;
    };
  }, [invoice?.id, invoice?.invoiceNo]);

  // =====================================================
  // LOAD EDIT INVOICE
  // =====================================================

  useEffect(() => {
    if (!invoice) {
      setCustomerName("");
      setMobile("");
      setEmail("");
      setRepairId("");

      setCreatedAt(getToday());

      setItems([createEmptyItem()]);

      setSubTotal(0);
      setDiscount(0);
      setGst(18);
      setGrandTotal(0);

      setPaymentMethod("Cash");
      setRemarks("");

      setExistingCustomer(false);

      return;
    }

    setInvoiceNo(invoice.invoiceNo);

    setCustomerName(
      invoice.customerName ?? ""
    );

    setMobile(invoice.mobile ?? "");

    setEmail(invoice.email ?? "");

    setRepairId(
      invoice.repairId ?? ""
    );

    setCreatedAt(
      invoice.createdAt
        ? invoice.createdAt.split("T")[0]
        : getToday()
    );

    setItems(
      invoice.items?.length
        ? invoice.items.map((item) => {
            const qty =
              Number(item.qty) || 0;

            const price =
              Number(item.price) || 0;

            return {
              ...item,
              qty,
              price,
              total: qty * price,
            };
          })
        : [createEmptyItem()]
    );

    setSubTotal(
      Number(invoice.subTotal) || 0
    );

    setDiscount(
      Number(invoice.discount) || 0
    );

    setGst(
      Number(invoice.gst) || 0
    );

    setGrandTotal(
      Number(invoice.grandTotal) || 0
    );

    setPaymentMethod(
      invoice.paymentMethod ?? "Cash"
    );

    setRemarks(
      invoice.remarks ?? ""
    );
  }, [invoice]);

  // =====================================================
  // FIND EXISTING CUSTOMER
  // =====================================================

  async function loadCustomerByMobile(
    value: string
  ) {
    const normalized =
      value.replace(/\D/g, "");

    if (normalized.length < 10) {
      setExistingCustomer(false);
      setRepairId("");
      return;
    }

    try {
      setCustomerLoading(true);

      // =================================================
      // FIND CUSTOMER
      // =================================================

      const customer =
        await findCustomerByMobile(
          normalized
        );

      if (!customer) {
        setExistingCustomer(false);
        setRepairId("");
        return;
      }

      setExistingCustomer(true);

      // =================================================
      // LOAD CUSTOMER DETAILS
      // =================================================

      setCustomerName(
        customer.name ?? ""
      );

      setMobile(
        customer.mobile ?? normalized
      );

      setEmail(
        customer.email ?? ""
      );

      // =================================================
      // LOAD ACTUAL REPAIR HISTORY
      //
      // IMPORTANT:
      // Do NOT depend only on customer.lastRepairId.
      // Fetch actual repairs collection.
      // =================================================

      let latestRepairId = "";

      if (customer.customerId) {
        try {
          const repairs =
            await getRepairsByCustomerId(
              customer.customerId
            );

          if (repairs.length > 0) {
            latestRepairId =
              repairs[0]?.repairId ?? "";
          }
        } catch (repairError) {
          console.error(
            "Failed to load customer repair history:",
            repairError
          );
        }
      }

      // =================================================
      // FALLBACK
      // =================================================

      if (!latestRepairId) {
        latestRepairId =
          customer.lastRepairId ?? "";
      }

      // =================================================
      // SET REPAIR ID
      // =================================================

      setRepairId(
        latestRepairId
      );

    } catch (error) {
      console.error(
        "Failed to load customer:",
        error
      );

      setExistingCustomer(false);
      setRepairId("");

    } finally {
      setCustomerLoading(false);
    }
  }

  // =====================================================
  // CUSTOMER MOBILE CHANGE
  // =====================================================

  function handleMobileChange(
    value: string
  ) {
    setMobile(value);

    // Don't search while editing existing invoice
    if (isEdit) return;

    const normalized =
      value.replace(/\D/g, "");

    if (normalized.length === 10) {
      void loadCustomerByMobile(
        normalized
      );
    } else {
      setExistingCustomer(false);
      setRepairId("");
    }
  }

  // =====================================================
  // CALCULATE TOTALS
  // =====================================================

  useEffect(() => {
    const total = items.reduce(
      (sum, item) =>
        sum +
        Number(item.qty || 0) *
          Number(item.price || 0),
      0
    );

    const safeDiscount = Math.min(
      Math.max(
        Number(discount) || 0,
        0
      ),
      total
    );

    const taxableAmount =
      total - safeDiscount;

    const gstAmount =
      taxableAmount *
      (
        Math.max(
          Number(gst) || 0,
          0
        ) / 100
      );

    const grand =
      taxableAmount + gstAmount;

    setSubTotal(total);

    setGrandTotal(
      Math.round(
        (grand + Number.EPSILON) * 100
      ) / 100
    );
  }, [items, discount, gst]);

  // =====================================================
  // ADD ITEM
  // =====================================================

  function addItem() {
    setItems((previous) => [
      ...previous,
      createEmptyItem(),
    ]);
  }

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  function removeItem(id: string) {
    setItems((previous) => {
      if (previous.length === 1) {
        return [createEmptyItem()];
      }

      return previous.filter(
        (item) => item.id !== id
      );
    });
  }

  // =====================================================
  // UPDATE ITEM
  // =====================================================

  function updateItem(
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) {
    setItems((previous) =>
      previous.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const updated = {
          ...item,
          [field]: value,
        };

        const qty = Math.max(
          Number(updated.qty) || 0,
          0
        );

        const price = Math.max(
          Number(updated.price) || 0,
          0
        );

        return {
          ...updated,
          qty,
          price,
          total: qty * price,
        };
      })
    );
  }

  // =====================================================
  // VALIDATION
  // =====================================================

  function validateForm() {
    if (!customerName.trim()) {
      alert(
        "Please enter customer name."
      );
      return false;
    }

    if (!mobile.trim()) {
      alert(
        "Please enter mobile number."
      );
      return false;
    }

    if (!invoiceNo.trim()) {
      alert(
        "Invoice number is not ready yet."
      );
      return false;
    }

    if (!createdAt) {
      alert(
        "Please select invoice date."
      );
      return false;
    }

    if (!items.length) {
      alert(
        "Please add at least one item."
      );
      return false;
    }

    const invalidItem = items.some(
      (item) =>
        !item.name.trim() ||
        Number(item.qty) <= 0 ||
        Number(item.price) < 0
    );

    if (invalidItem) {
      alert(
        "Please complete all invoice items or remove empty rows."
      );
      return false;
    }

    return true;
  }

  // =====================================================
  // SAVE
  // =====================================================

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // NORMALIZE ITEMS
      // =================================================

      const normalizedItems =
        items.map((item) => {
          const qty = Math.max(
            Number(item.qty) || 0,
            0
          );

          const price = Math.max(
            Number(item.price) || 0,
            0
          );

          return {
            ...item,
            name: item.name.trim(),
            qty,
            price,
            total: qty * price,
          };
        });

      // =================================================
      // CALCULATE
      // =================================================

      const calculatedSubtotal =
        normalizedItems.reduce(
          (sum, item) =>
            sum + item.total,
          0
        );

      const safeDiscount =
        Math.min(
          Math.max(
            Number(discount) || 0,
            0
          ),
          calculatedSubtotal
        );

      const taxableAmount =
        calculatedSubtotal -
        safeDiscount;

      const gstRate =
        Math.max(
          Number(gst) || 0,
          0
        );

      const gstAmount =
        taxableAmount *
        (gstRate / 100);

      const calculatedGrandTotal =
        Math.round(
          (
            taxableAmount +
            gstAmount +
            Number.EPSILON
          ) * 100
        ) / 100;

      // =================================================
      // INVOICE DATA
      // =================================================

      const invoiceData: Omit<
        Invoice,
        "id"
      > = {
        invoiceNo:
          invoiceNo.trim(),

        repairId:
          repairId.trim(),

        customerName:
          customerName.trim(),

        mobile:
          mobile.replace(/\D/g, ""),

        email:
          email.trim(),

        items:
          normalizedItems,

        subTotal:
          calculatedSubtotal,

        discount:
          safeDiscount,

        gst:
          gstRate,

        grandTotal:
          calculatedGrandTotal,

        paymentMethod,

        createdAt,

        remarks:
          remarks.trim(),
      };

      // =================================================
      // EDIT
      // =================================================

      if (invoice?.id) {
        await updateInvoice(
          invoice.id,
          invoiceData
        );

        alert(
          "✅ Invoice updated successfully."
        );
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        const created =
          await addInvoice(
            invoiceData
          );

        // ---------------------------------------------
        // CUSTOMER SYNC
        // ---------------------------------------------

        const normalizedMobile =
          mobile.replace(/\D/g, "");

        const customer =
          await findCustomerByMobile(
            normalizedMobile
          );

        if (customer) {

          // Existing customer:
          // update invoice history

          await updateCustomerInvoice(
            normalizedMobile,
            calculatedGrandTotal,
            0,
            created.id
          );

          // Keep latest repair reference synced
          if (repairId.trim()) {
            await syncCustomer({
              name:
                customer.name ||
                customerName.trim(),

              mobile:
                normalizedMobile,

              email:
                email.trim(),

              repairId:
                repairId.trim(),
            });
          }

        } else {

          // -------------------------------------------
          // NEW CUSTOMER
          // -------------------------------------------

          await syncCustomer({
            name:
              customerName.trim(),

            mobile:
              normalizedMobile,

            email:
              email.trim(),

            repairId:
              repairId.trim(),
          });

          // Update invoice statistics
          await updateCustomerInvoice(
            normalizedMobile,
            calculatedGrandTotal,
            0,
            created.id
          );
        }

        alert(
          existingCustomer
            ? "✅ Invoice created and customer history updated."
            : "✅ Invoice created successfully."
        );
      }

      onSuccess?.();

    } catch (error) {

      console.error(
        "Failed to save invoice:",
        error
      );

      alert(
        "❌ Failed to save invoice. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // CURRENCY
  // =====================================================

  function formatCurrency(
    value: number
  ) {
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
  // UI
  // =====================================================

  return (
    <div className="space-y-8">

      {/* =================================================
          CUSTOMER DETAILS
      ================================================= */}

      <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Customer Details
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Enter mobile number to load existing customer.
            </p>
          </div>

          {existingCustomer && (
            <span className="rounded-full bg-green-500/20 px-4 py-2 text-xs font-bold text-green-400">
              Existing Customer
            </span>
          )}

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Customer Name *
            </label>

            <input
              value={customerName}
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
              placeholder="Customer Name"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />
          </div>

          {/* MOBILE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Mobile Number *
            </label>

            <div className="relative">

              <input
                value={mobile}
                onChange={(e) =>
                  handleMobileChange(
                    e.target.value
                  )
                }
                placeholder="Mobile Number"
                inputMode="numeric"
                maxLength={10}
                className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              {customerLoading && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-yellow-400">
                  Loading...
                </span>
              )}

            </div>

            {existingCustomer && (
              <p className="mt-2 text-xs text-green-400">
                ✓ Existing customer loaded
              </p>
            )}

          </div>

          {/* EMAIL */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Email Address"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          INVOICE DETAILS
      ================================================= */}

      <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Invoice Details
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          {/* INVOICE NUMBER */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Invoice Number
            </label>

            <input
              value={invoiceNo}
              readOnly
              className="w-full rounded-xl border border-zinc-700 bg-black p-4 font-semibold text-yellow-400"
            />

          </div>

          {/* REPAIR ID */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Repair ID
            </label>

            <input
              value={repairId}
              onChange={(e) =>
                setRepairId(
                  e.target.value
                )
              }
              placeholder="Repair ID"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            {existingCustomer &&
              repairId && (
                <p className="mt-1 text-xs text-green-400">
                  ✓ Latest Repair ID loaded from repair history
                </p>
              )}

            {existingCustomer &&
              !repairId &&
              !customerLoading && (
                <p className="mt-1 text-xs text-yellow-500">
                  No previous repair found for this customer.
                </p>
              )}

          </div>

          {/* DATE */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Invoice Date *
            </label>

            <input
              type="date"
              value={createdAt}
              onChange={(e) =>
                setCreatedAt(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          ITEMS
      ================================================= */}

      <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Invoice Items
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Add repair services, parts or products.
            </p>

          </div>

          <button
            type="button"
            onClick={addItem}
            className="rounded-xl bg-yellow-400 px-5 py-2.5 font-bold text-black transition hover:bg-yellow-300"
          >
            + Add Item
          </button>

        </div>

        <div className="space-y-4">

          {items.map(
            (item, index) => (

              <div
                key={item.id}
                className="rounded-2xl border border-zinc-800 bg-black/40 p-4"
              >

                <div className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-600">
                  Item {index + 1}
                </div>

                <div className="grid gap-4 md:grid-cols-5">

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-xs font-semibold text-zinc-500">
                      Item / Service
                    </label>

                    <input
                      value={item.name}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Laptop repair / SSD / Service"
                      className="w-full rounded-xl border border-zinc-700 bg-black p-3.5 text-white outline-none focus:border-yellow-400"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold text-zinc-500">
                      Qty
                    </label>

                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "qty",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="w-full rounded-xl border border-zinc-700 bg-black p-3.5 text-white outline-none focus:border-yellow-400"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold text-zinc-500">
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "price",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="w-full rounded-xl border border-zinc-700 bg-black p-3.5 text-white outline-none focus:border-yellow-400"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold text-zinc-500">
                      Total
                    </label>

                    <div className="flex h-[54px] items-center justify-between gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4">

                      <span className="font-bold text-yellow-400">
                        {formatCurrency(
                          item.total
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        className="text-xs font-bold text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </section>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Invoice Summary
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold text-zinc-400">
                Discount
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={discount}
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
                className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-zinc-400">
                GST %
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={gst}
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
                className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-6">

            <div className="space-y-4">

              <div className="flex items-center justify-between text-zinc-400">

                <span>
                  Subtotal
                </span>

                <span className="font-semibold text-white">
                  {formatCurrency(
                    subTotal
                  )}
                </span>

              </div>

              <div className="flex items-center justify-between text-zinc-400">

                <span>
                  Discount
                </span>

                <span className="font-semibold text-red-400">
                  -{" "}
                  {formatCurrency(
                    Math.min(
                      discount,
                      subTotal
                    )
                  )}
                </span>

              </div>

              <div className="flex items-center justify-between text-zinc-400">

                <span>
                  GST ({gst}%)
                </span>

                <span className="font-semibold text-white">

                  {formatCurrency(
                    Math.max(
                      subTotal -
                        Math.min(
                          discount,
                          subTotal
                        ),
                      0
                    ) *
                      (
                        Number(gst) /
                        100
                      )
                  )}

                </span>

              </div>

              <div className="border-t border-zinc-800 pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold text-white">
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

          </div>

        </div>

      </section>

      {/* =================================================
          PAYMENT
      ================================================= */}

      <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Payment
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-semibold text-zinc-400">
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value as PaymentMethod
                )
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
              Remarks
            </label>

            <input
              value={remarks}
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
              placeholder="Optional remarks"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          SAVE
      ================================================= */}

      <div className="flex justify-end border-t border-zinc-800 pt-6">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="min-w-[200px] rounded-xl bg-yellow-400 px-10 py-4 font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
        >

          {loading
            ? isEdit
              ? "Updating..."
              : "Saving..."
            : isEdit
              ? "Update Invoice"
              : "Save Invoice"}

        </button>

      </div>

    </div>
  );
}