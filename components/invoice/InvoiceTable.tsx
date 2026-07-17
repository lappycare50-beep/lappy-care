"use client";

import { useEffect, useState } from "react";

import { Invoice } from "@/types/invoice";

import {
  getInvoices,
  deleteInvoice,
} from "@/services/invoiceService";

import {
  Pencil,
  Printer,
  Trash2,
  Search,
} from "lucide-react";

type Props = {
  search: string;
  onEdit: (invoice: Invoice) => void;
};

export default function InvoiceTable({
  search,
  onEdit,
}: Props) {

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // Load Invoices
  // ==========================

  async function loadInvoices() {
    try {

      const data = await getInvoices();

      setInvoices(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  // ==========================
  // Delete
  // ==========================

  async function handleDelete(id: string) {

    const ok = confirm(
      "Delete this invoice?"
    );

    if (!ok) return;

    await deleteInvoice(id);

    await loadInvoices();

  }

  // ==========================
  // Search
  // ==========================

  const filtered = invoices.filter((invoice) => {

    const keyword =
      search.toLowerCase();

    return (

      invoice.invoiceNo
        .toLowerCase()
        .includes(keyword)

      ||

      invoice.customerName
        .toLowerCase()
        .includes(keyword)

      ||

      invoice.mobile
        .toLowerCase()
        .includes(keyword)

    );

  });
    // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#181818] p-10 text-center text-white">
        Loading Invoices...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-yellow-500/20 bg-[#181818]">

      <table className="min-w-full">

        {/* ==========================
            Table Header
        ========================== */}

        <thead className="bg-[#202020]">

          <tr>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Invoice No
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Customer
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Mobile
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Payment
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Total
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Date
            </th>

            <th className="px-4 py-4 text-center text-sm font-semibold text-yellow-400">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>
                      {filtered.map((invoice) => (

            <tr
              key={invoice.id}
              className="border-t border-gray-800 hover:bg-[#202020]"
            >

              {/* Invoice No */}

              <td className="px-4 py-4 font-semibold text-yellow-400">
                {invoice.invoiceNo}
              </td>

              {/* Customer */}

              <td className="px-4 py-4 text-white">
                {invoice.customerName}
              </td>

              {/* Mobile */}

              <td className="px-4 py-4 text-gray-300">
                {invoice.mobile}
              </td>

              {/* Payment Method */}

              <td className="px-4 py-4">

                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                  {invoice.paymentMethod}
                </span>

              </td>

              {/* Grand Total */}

              <td className="px-4 py-4 font-semibold text-green-400">
                ₹{invoice.grandTotal.toLocaleString("en-IN")}
              </td>

              {/* Date */}

              <td className="px-4 py-4 text-gray-400">
                {new Date(invoice.createdAt).toLocaleDateString("en-IN")}
              </td>

              {/* Actions */}

              <td className="px-4 py-4">

                <div className="flex items-center justify-center gap-3">

                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => onEdit(invoice)}
                    className="text-blue-400 transition hover:text-blue-300"
                    title="Edit Invoice"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() => handleDelete(invoice.id!)}
                    className="text-red-400 transition hover:text-red-300"
                    title="Delete Invoice"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Print */}

                  <button
                    type="button"
                    className="text-green-400 transition hover:text-green-300"
                    title="Print Invoice"
                  >
                    <Printer size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}
                    {/* ==========================
              Empty State
          ========================== */}

          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-12 text-center text-gray-400"
              >
                No invoices found.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}
