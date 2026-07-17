"use client";

import { useEffect, useState } from "react";

import { generateInvoiceId } from "@/services/idGenerator";

import {
  updateCustomerInvoice,
} from "@/services/customerService";

import {
  Invoice,
  InvoiceItem,
  PaymentMethod,
} from "@/types/invoice";

import {
  addInvoice,
  updateInvoice,
} from "@/services/invoiceService";

type Props = {
  invoice?: Invoice | null;
  onSuccess?: () => void;
};

export default function InvoiceForm({
  invoice,
  onSuccess,
}: Props) {

  // ==========================
  // Customer
  // ==========================

  const [customerName, setCustomerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  // ==========================
  // Invoice
  // ==========================

  const [invoiceNo, setInvoiceNo] =
    useState("");

  const [repairId, setRepairId] =
    useState("");

  const today =
    new Date().toISOString().split("T")[0];

  const [createdAt, setCreatedAt] =
    useState(today);

  // ==========================
  // Items
  // ==========================

  const [items, setItems] =
    useState<InvoiceItem[]>([
      {
        id: crypto.randomUUID(),
        name: "",
        qty: 1,
        price: 0,
        total: 0,
      },
    ]);

  // ==========================
  // Totals
  // ==========================

  const [subTotal, setSubTotal] =
    useState(0);

  const [discount, setDiscount] =
    useState(0);

  const [gst, setGst] =
    useState(18);

  const [grandTotal, setGrandTotal] =
    useState(0);

  // ==========================
  // Payment
  // ==========================

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Cash");

  const [remarks, setRemarks] =
    useState("");

  const [loading, setLoading] =
    useState(false);
      // ==========================
  // Auto Invoice Number
  // ==========================

  useEffect(() => {

  if (invoice?.id) {
    setInvoiceNo(invoice.invoiceNo);
    return;
  }

  async function loadInvoiceNo() {
    const id = await generateInvoiceId();
    setInvoiceNo(id);
  }

  loadInvoiceNo();

}, [invoice]);

  // ==========================
  // Calculate Totals
  // ==========================

  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    setSubTotal(total);

    const grand =
      total - discount + (total * gst) / 100;

    setGrandTotal(grand);

  }, [items, discount, gst]);

  // ==========================
  // Add Item
  // ==========================

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        qty: 1,
        price: 0,
        total: 0,
      },
    ]);
  }

  // ==========================
  // Remove Item
  // ==========================

  function removeItem(id: string) {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // ==========================
  // Update Item
  // ==========================

  function updateItem(
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updated = {
          ...item,
          [field]: value,
        };

        updated.total =
          updated.qty * updated.price;

        return updated;
      })
    );
  }

  // ==========================
  // Edit Mode
  // ==========================

  useEffect(() => {
    if (!invoice) return;

    setInvoiceNo(invoice.invoiceNo);
    setRepairId(invoice.repairId ?? "");

    setCustomerName(invoice.customerName);
    setMobile(invoice.mobile);
    setEmail(invoice.email ?? "");

    setItems(invoice.items);

    setSubTotal(invoice.subTotal);
    setDiscount(invoice.discount);
    setGst(invoice.gst);
    setGrandTotal(invoice.grandTotal);

    setPaymentMethod(invoice.paymentMethod);

    setCreatedAt(invoice.createdAt);

    setRemarks(invoice.remarks ?? "");

  }, [invoice]);
    // ==========================
  // Save Invoice
  // ==========================

  async function handleSubmit() {

    if (
      !customerName ||
      !mobile ||
      items.length === 0
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const invoiceData: Omit<Invoice, "id"> = {
        invoiceNo,
        repairId,

        customerName,
        mobile,
        email,

        items,

        subTotal,
        discount,
        gst,
        grandTotal,

        paymentMethod,

        createdAt,

        remarks,
      };

      if (invoice?.id) {

        await updateInvoice(
          invoice.id,
          invoiceData
        );

        alert("✅ Invoice Updated Successfully");

      } else {

        await addInvoice(
          invoiceData
        );
        await updateCustomerInvoice(

  mobile,

  grandTotal,

  grandTotal

);

        alert("✅ Invoice Added Successfully");
      }

      // ==========================
      // Reset Form
      // ==========================

      setCustomerName("");
      setMobile("");
      setEmail("");

      setRepairId("");

      setItems([
        {
          id: crypto.randomUUID(),
          name: "",
          qty: 1,
          price: 0,
          total: 0,
        },
      ]);

      setSubTotal(0);
      setDiscount(0);
      setGst(18);
      setGrandTotal(0);

      setPaymentMethod("Cash");

      setRemarks("");

     const newId = await generateInvoiceId();

setInvoiceNo(newId);

      onSuccess?.();

    } catch (error) {

      console.error(error);

      alert("❌ Failed to save invoice.");

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="space-y-8">

      {/* Customer Details */}

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Customer Details
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <input
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            placeholder="Customer Name"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

          <input
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
            placeholder="Mobile Number"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email Address"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white md:col-span-2"
          />

        </div>

      </div>

      {/* Invoice Details */}

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Invoice Details
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <input
            value={invoiceNo}
            readOnly
            className="rounded-xl border border-gray-700 bg-black p-4 text-gray-300"
          />

          <input
            value={repairId}
            onChange={(e) =>
              setRepairId(e.target.value)
            }
            placeholder="Repair ID"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

          <input
            type="date"
            value={createdAt}
            onChange={(e) =>
              setCreatedAt(e.target.value)
            }
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

        </div>

      </div>
            {/* ==========================
          Invoice Items
      ========================== */}

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Invoice Items
          </h2>

          <button
            type="button"
            onClick={addItem}
            className="rounded-xl bg-yellow-400 px-5 py-2 font-bold text-black hover:bg-yellow-300"
          >
            + Add Item
          </button>

        </div>

        <div className="space-y-4">

          {items.map((item) => (

            <div
              key={item.id}
              className="grid gap-4 md:grid-cols-5"
            >

              <input
                value={item.name}
                onChange={(e) =>
                  updateItem(item.id, "name", e.target.value)
                }
                placeholder="Item Name"
                className="rounded-xl border border-gray-700 bg-black p-4 text-white"
              />

              <input
                type="number"
                value={item.qty}
                onChange={(e) =>
                  updateItem(item.id, "qty", Number(e.target.value))
                }
                placeholder="Qty"
                className="rounded-xl border border-gray-700 bg-black p-4 text-white"
              />

              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  updateItem(item.id, "price", Number(e.target.value))
                }
                placeholder="Price"
                className="rounded-xl border border-gray-700 bg-black p-4 text-white"
              />

              <input
                value={item.total}
                readOnly
                className="rounded-xl border border-gray-700 bg-[#222] p-4 text-yellow-400"
              />

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-600"
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* ==========================
          Totals
      ========================== */}

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Invoice Summary
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            placeholder="Discount"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

          <input
            type="number"
            value={gst}
            onChange={(e) =>
              setGst(Number(e.target.value))
            }
            placeholder="GST %"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

          <input
            value={subTotal}
            readOnly
            className="rounded-xl border border-gray-700 bg-[#222] p-4 text-yellow-400"
          />

          <input
            value={grandTotal}
            readOnly
            className="rounded-xl border border-gray-700 bg-[#222] p-4 text-green-400"
          />

        </div>

      </div>

      {/* ==========================
          Payment
      ========================== */}

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Payment
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value as PaymentMethod
              )
            }
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>

          <input
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Remarks"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white"
          />

        </div>

      </div>

      {/* ==========================
          Save Button
      ========================== */}

      <div className="flex justify-end">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-yellow-400 px-10 py-4 font-bold text-black hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading
            ? invoice
              ? "Updating..."
              : "Saving..."
            : invoice
            ? "Update Invoice"
            : "Save Invoice"}
        </button>

      </div>

    </div>
  );
}