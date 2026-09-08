"use client";

import { Invoice } from "@/types/invoice";
import InvoiceForm from "./InvoiceForm";

type Props = {
  open: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
  onSuccess?: () => void;
  mode?: "create" | "edit" | "view";
};

export default function InvoiceModal({
  open,
  onClose,
  invoice,
  onSuccess,
  mode = invoice ? "edit" : "create",
}: Props) {
  if (!open) return null;

  // =====================================================
  // VIEW MODE
  // =====================================================

  if (mode === "view" && invoice) {
    const total = Number(invoice.grandTotal || 0);

    const date = invoice.createdAt
      ? new Date(invoice.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6">
        <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-yellow-500/20 bg-[#181818] p-6 sm:p-8">

          {/* HEADER */}

          <div className="mb-8 flex items-start justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                Invoice
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                {invoice.invoiceNo || "Invoice"}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Invoice details and billing information
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-1 text-3xl text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              ×
            </button>

          </div>

          {/* CUSTOMER + INVOICE */}

          <div className="grid gap-5 md:grid-cols-2">

            <InfoSection title="Customer Details">

              <InfoRow
                label="Customer Name"
                value={invoice.customerName}
              />

              <InfoRow
                label="Mobile"
                value={invoice.mobile}
              />

              <InfoRow
                label="Email"
                value={
                  (invoice as any).email ||
                  (invoice as any).customerEmail ||
                  "-"
                }
              />

            </InfoSection>

            <InfoSection title="Invoice Details">

              <InfoRow
                label="Invoice Number"
                value={invoice.invoiceNo}
              />

              <InfoRow
                label="Repair ID"
                value={
                  (invoice as any).repairId || "-"
                }
              />

              <InfoRow
                label="Invoice Date"
                value={date}
              />

              <InfoRow
                label="Payment Method"
                value={invoice.paymentMethod || "-"}
              />

            </InfoSection>

          </div>

          {/* ITEMS */}

          <div className="mt-5 rounded-2xl border border-zinc-800 bg-[#101010] p-5">

            <h3 className="mb-4 text-lg font-black text-white">
              Invoice Items
            </h3>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[600px]">

                <thead>
                  <tr className="border-b border-zinc-800">

                    <th className="px-3 py-3 text-left text-xs font-bold uppercase text-yellow-400">
                      Item / Service
                    </th>

                    <th className="px-3 py-3 text-center text-xs font-bold uppercase text-yellow-400">
                      Qty
                    </th>

                    <th className="px-3 py-3 text-right text-xs font-bold uppercase text-yellow-400">
                      Price
                    </th>

                    <th className="px-3 py-3 text-right text-xs font-bold uppercase text-yellow-400">
                      Total
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {(invoice.items || []).map(
                    (item: any, index: number) => {

                      const qty = Number(item.qty || 0);
                      const price = Number(item.price || 0);
                      const itemTotal =
                        Number(
                          item.total ??
                          qty * price
                        );

                      return (
                        <tr
                          key={index}
                          className="border-b border-zinc-800/70"
                        >

                          <td className="px-3 py-4 text-sm font-medium text-white">
                            {item.name ||
                              item.item ||
                              item.description ||
                              "-"}
                          </td>

                          <td className="px-3 py-4 text-center text-sm text-zinc-400">
                            {qty}
                          </td>

                          <td className="px-3 py-4 text-right text-sm text-zinc-400">
                            ₹
                            {price.toLocaleString(
                              "en-IN",
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>

                          <td className="px-3 py-4 text-right text-sm font-bold text-green-400">
                            ₹
                            {itemTotal.toLocaleString(
                              "en-IN",
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>

                        </tr>
                      );
                    }
                  )}

                  {(!invoice.items ||
                    invoice.items.length === 0) && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-8 text-center text-sm text-zinc-500"
                      >
                        No invoice items.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* TOTAL */}

          <div className="mt-5 flex justify-end">

            <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-[#101010] p-5">

              <div className="flex items-center justify-between">

                <span className="text-sm font-bold text-zinc-400">
                  Grand Total
                </span>

                <span className="text-2xl font-black text-green-400">
                  ₹
                  {total.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

            </div>

          </div>

          {/* CLOSE */}

          <div className="mt-6 flex justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // CREATE / EDIT MODE
  // =====================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6">

      <div className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-3xl bg-[#181818] p-6 sm:p-8">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-black text-white sm:text-3xl">
            {invoice ? "Edit Invoice" : "New Invoice"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl text-white transition hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* FORM */}

        <InvoiceForm
          invoice={invoice}
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />

      </div>

    </div>
  );
}

// =====================================================
// INFO SECTION
// =====================================================

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#101010] p-5">

      <h3 className="mb-4 text-lg font-black text-white">
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}

// =====================================================
// INFO ROW
// =====================================================

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-zinc-200">
        {value || "-"}
      </p>
    </div>
  );
}