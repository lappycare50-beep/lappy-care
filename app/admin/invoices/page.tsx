"use client";

import { useState } from "react";

import {
  FileText,
  Plus,
  IndianRupee,
  CreditCard,
  Clock3,
  CheckCircle2,
  X,
  Printer,
} from "lucide-react";

import InvoiceTable from "@/components/invoice/InvoiceTable";
import InvoiceModal from "@/components/invoice/InvoiceModal";

import type { Invoice } from "@/types/invoice";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingInvoice, setEditingInvoice] =
    useState<Invoice | null>(null);

  const [viewingInvoice, setViewingInvoice] =
    useState<Invoice | null>(null);

  // =====================================================
  // CREATE
  // =====================================================

  function handleCreate() {
    setEditingInvoice(null);
    setModalOpen(true);
  }

  // =====================================================
  // EDIT
  // =====================================================

  function handleEdit(invoice: Invoice) {
    setEditingInvoice(invoice);
    setModalOpen(true);
  }

  // =====================================================
  // VIEW
  // =====================================================

  function handleView(invoice: Invoice) {
    setViewingInvoice(invoice);
  }

  // =====================================================
  // CLOSE VIEW
  // =====================================================

  function handleCloseView() {
    setViewingInvoice(null);
  }

  // =====================================================
  // SUCCESS
  // =====================================================

  function handleSuccess() {
    setModalOpen(false);
    setEditingInvoice(null);
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =================================================
          PAGE
      ================================================= */}

      <main className="min-h-screen">

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-3">

                  <FileText
                    size={24}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h1 className="text-3xl font-black tracking-tight">
                    Invoices
                  </h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    Manage customer invoices,
                    payments and billing.
                  </p>

                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
            >

              <Plus size={18} />

              New Invoice

            </button>

          </div>

          {/* =================================================
              SUMMARY
              
              InvoiceTable handles pagination.
              Summary cards are therefore shown inside
              the table's loaded-data flow.
          ================================================= */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              title="Invoice Loading"
              value="10"
              subtitle="Latest invoices loaded initially"
              icon={
                <FileText size={20} />
              }
            />

            <SummaryCard
              title="Pagination"
              value="10 / Page"
              subtitle="More invoices load on demand"
              icon={
                <IndianRupee size={20} />
              }
            />

            <SummaryCard
              title="Cash"
              value="Loaded Data"
              subtitle="Based on loaded invoices"
              icon={
                <CheckCircle2 size={20} />
              }
            />

            <SummaryCard
              title="Online"
              value="Loaded Data"
              subtitle="UPI / Card / Bank"
              icon={
                <CreditCard size={20} />
              }
            />

          </div>

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className="mb-5">

            <div className="relative w-full sm:max-w-md">

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search invoice, customer or mobile..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
              />

            </div>

          </div>

          {/* =================================================
              INVOICE TABLE
              
              IMPORTANT:
              No onInvoiceChange prop.
              
              InvoiceTable itself handles:
              - First 10 invoices
              - Load More
              - Search
              - Edit
              - View
              - WhatsApp
              - Print
          ================================================= */}

          <InvoiceTable
            search={search}
            onEdit={handleEdit}
            onView={handleView}
          />

        </div>

      </main>

      {/* =================================================
          CREATE / EDIT MODAL
      ================================================= */}

      <InvoiceModal
        open={modalOpen}
        invoice={editingInvoice}
        onClose={() => {
          setModalOpen(false);
          setEditingInvoice(null);
        }}
        onSuccess={handleSuccess}
      />

      {/* =================================================
          VIEW INVOICE MODAL
      ================================================= */}

      {viewingInvoice && (
        <InvoiceViewModal
          invoice={viewingInvoice}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

      <div className="mb-4 flex items-center justify-between">

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-2.5 text-yellow-400">
          {icon}
        </div>

        <Clock3
          size={16}
          className="text-zinc-700"
        />

      </div>

      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <p className="mt-1 truncate text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-600">
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   VIEW INVOICE MODAL
========================================================= */

function InvoiceViewModal({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  const subtotal =
    Number(
      invoice.subTotal || 0
    );

  const discount =
    Number(
      invoice.discount || 0
    );

  const gst =
    Number(
      invoice.gst || 0
    );

  const grandTotal =
    Number(
      invoice.grandTotal || 0
    );

  const date =
    invoice.createdAt
      ? new Date(
          invoice.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "-";

  function handlePrint() {
    if (!invoice.id) {
      window.alert(
        "Invoice ID is missing."
      );
      return;
    }

    window.open(
      `/admin/invoices/${invoice.id}/print`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">

      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-[#181818] shadow-2xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
              Invoice
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              {invoice.invoiceNo}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            title="Close"
          >
            <X size={24} />
          </button>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="overflow-y-auto p-6">

          {/* CUSTOMER + DETAILS */}

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Customer
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                {invoice.customerName ||
                  "-"}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Mobile:{" "}
                {invoice.mobile ||
                  "-"}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Email:{" "}
                {invoice.email ||
                  "-"}
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Invoice Details
              </p>

              <div className="mt-3 space-y-2 text-sm">

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Invoice No
                  </span>

                  <span className="font-bold text-yellow-400">
                    {invoice.invoiceNo ||
                      "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Repair ID
                  </span>

                  <span className="font-medium text-white">
                    {invoice.repairId ||
                      "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Date
                  </span>

                  <span className="text-white">
                    {date}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Payment
                  </span>

                  <span className="font-bold text-green-400">
                    {invoice.paymentMethod ||
                      "-"}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              ITEMS
          ================================================= */}

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-zinc-900">

                  <tr>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-zinc-500">
                      Item
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-bold uppercase text-zinc-500">
                      Qty
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-bold uppercase text-zinc-500">
                      Price
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-bold uppercase text-zinc-500">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {invoice.items?.map(
                    (item, index) => (
                      <tr
                        key={
                          item.id ||
                          `invoice-item-${index}`
                        }
                        className="border-t border-zinc-800"
                      >

                        <td className="px-4 py-4 font-medium text-white">
                          {item.name ||
                            "-"}
                        </td>

                        <td className="px-4 py-4 text-center text-zinc-400">
                          {item.qty}
                        </td>

                        <td className="px-4 py-4 text-right text-zinc-400">
                          ₹
                          {Number(
                            item.price ||
                              0
                          ).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>

                        <td className="px-4 py-4 text-right font-bold text-white">
                          ₹
                          {Number(
                            item.total ||
                              0
                          ).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* =================================================
              TOTALS
          ================================================= */}

          <div className="mt-6 flex justify-end">

            <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <div className="flex justify-between py-2 text-sm">

                <span className="text-zinc-500">
                  Sub Total
                </span>

                <span className="text-white">
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

              <div className="flex justify-between py-2 text-sm">

                <span className="text-zinc-500">
                  Discount
                </span>

                <span className="text-red-400">
                  - ₹
                  {discount.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

              <div className="flex justify-between py-2 text-sm">

                <span className="text-zinc-500">
                  GST
                </span>

                <span className="text-white">
                  ₹
                  {gst.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

              <div className="my-2 border-t border-zinc-800" />

              <div className="flex justify-between pt-2">

                <span className="font-bold text-white">
                  Grand Total
                </span>

                <span className="text-2xl font-black text-green-400">
                  ₹
                  {grandTotal.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              REMARKS
          ================================================= */}

          {invoice.remarks && (
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Remarks
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {invoice.remarks}
              </p>

            </div>
          )}

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-zinc-800 px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:bg-zinc-800"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
          >

            <Printer size={17} />

            Print Invoice

          </button>

        </div>

      </div>

    </div>
  );
}