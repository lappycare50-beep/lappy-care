"use client";

import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Printer,
  Eye,
} from "lucide-react";

import { Invoice } from "@/types/invoice";

import {
  getInvoices,
  deleteInvoice,
} from "@/services/invoiceService";

import PrintInvoiceButton from "./PrintInvoiceButton";

type Props = {
  search: string;
  onEdit: (invoice: Invoice) => void;
  onView: (invoice: Invoice) => void;
};

export default function InvoiceTable({
  search,
  onEdit,
  onView,
}: Props) {

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // LOAD INVOICES
  // =====================================================

  async function loadInvoices() {

    try {

      setLoading(true);

      const data =
        await getInvoices();

      setInvoices(data);

    } catch (error) {

      console.error(
        "Failed to load invoices:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadInvoices();

  }, []);

  // =====================================================
  // DELETE
  // =====================================================

  async function handleDelete(
    invoice: Invoice
  ) {

    if (!invoice.id) return;

    const confirmed =
      window.confirm(
        `Delete invoice ${invoice.invoiceNo}?`
      );

    if (!confirmed) return;

    try {

      await deleteInvoice(
        invoice.id
      );

      await loadInvoices();

    } catch (error) {

      console.error(
        "Failed to delete invoice:",
        error
      );

      window.alert(
        "Failed to delete invoice."
      );

    }

  }

  // =====================================================
  // SEARCH
  // =====================================================

  const keyword =
    search.trim().toLowerCase();

  const filteredInvoices =
    invoices.filter((invoice) => {

      return (

        invoice.invoiceNo
          ?.toLowerCase()
          .includes(keyword)

        ||

        invoice.customerName
          ?.toLowerCase()
          .includes(keyword)

        ||

        invoice.mobile
          ?.toLowerCase()
          .includes(keyword)

        ||

        invoice.repairId
          ?.toLowerCase()
          .includes(keyword)

      );

    });

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-12 text-center">

        <p className="text-sm font-semibold text-gray-400">
          Loading Invoices...
        </p>

      </div>

    );

  }

  // =====================================================
  // TABLE
  // =====================================================

  return (

    <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#181818]">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* =================================================
              HEADER
          ================================================= */}

          <thead className="bg-[#202020]">

            <tr>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                Invoice No
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                Repair ID
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                Customer
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                Mobile
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                Payment
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-yellow-400">
                Total
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                Date
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-yellow-400">
                Actions
              </th>

            </tr>

          </thead>

          {/* =================================================
              BODY
          ================================================= */}

          <tbody>

            {filteredInvoices.map(
              (invoice) => {

                const total =
                  Number(
                    invoice.grandTotal || 0
                  );

                const date =
                  invoice.createdAt
                    ? new Date(
                        invoice.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-";

                return (

                  <tr
                    key={invoice.id}
                    className="border-t border-zinc-800 transition hover:bg-[#202020]"
                  >

                    {/* Invoice No */}

                    <td className="px-5 py-4">

                      <span className="font-bold text-yellow-400">
                        {invoice.invoiceNo}
                      </span>

                    </td>

                    {/* Repair ID */}

                    <td className="px-5 py-4">

                      {invoice.repairId ? (

                        <span className="inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400">
                          {invoice.repairId}
                        </span>

                      ) : (

                        <span className="text-sm text-zinc-600">
                          —
                        </span>

                      )}

                    </td>

                    {/* Customer */}

                    <td className="px-5 py-4">

                      <span className="font-medium text-white">
                        {invoice.customerName}
                      </span>

                    </td>

                    {/* Mobile */}

                    <td className="px-5 py-4">

                      <span className="text-sm text-gray-400">
                        {invoice.mobile}
                      </span>

                    </td>

                    {/* Payment */}

                    <td className="px-5 py-4">

                      <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
                        {invoice.paymentMethod}
                      </span>

                    </td>

                    {/* Total */}

                    <td className="px-5 py-4 text-right">

                      <span className="font-bold text-green-400">

                        ₹
                        {total.toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits:
                              2,
                          }
                        )}

                      </span>

                    </td>

                    {/* Date */}

                    <td className="px-5 py-4">

                      <span className="text-sm text-gray-400">
                        {date}
                      </span>

                    </td>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <td className="px-5 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            onView(invoice)
                          }
                          className="rounded-lg p-2 text-yellow-400 transition hover:bg-yellow-500/10 hover:text-yellow-300"
                          title="View Invoice"
                        >

                          <Eye
                            size={18}
                          />

                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            onEdit(invoice)
                          }
                          className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
                          title="Edit Invoice"
                        >

                          <Pencil
                            size={18}
                          />

                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              invoice
                            )
                          }
                          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                          title="Delete Invoice"
                        >

                          <Trash2
                            size={18}
                          />

                        </button>

                        {/* PRINT */}

                        <PrintInvoiceButton
                          invoice={invoice}
                          label=""
                        />

                      </div>

                    </td>

                  </tr>

                );

              }
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {filteredInvoices.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="px-6 py-14 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="mb-3 rounded-full bg-zinc-800 p-4">

                      <Printer
                        size={24}
                        className="text-zinc-500"
                      />

                    </div>

                    <p className="font-semibold text-gray-400">

                      {keyword
                        ? "No invoices found for your search."
                        : "No invoices found."}

                    </p>

                    {keyword && (

                      <p className="mt-1 text-xs text-zinc-600">

                        Try a different invoice,
                        customer, repair ID
                        or mobile number.

                      </p>

                    )}

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}