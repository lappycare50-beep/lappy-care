"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Eye,
  Pencil,
  Trash2,
  Printer,
  MessageCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";

import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import type { Invoice } from "@/types/invoice";

import {
  getInvoicesPage,
  deleteInvoice,
  INVOICE_PAGE_SIZE,
} from "@/services/invoiceService";

import InvoicePrint from "@/components/invoice/InvoicePrint";

import {
  generateInvoicePdfBase64,
} from "@/lib/utils/pdf";

// =====================================================
// TYPES
// =====================================================

type Props = {
  search: string;

  onEdit: (
    invoice: Invoice
  ) => void;

  onView: (
    invoice: Invoice
  ) => void;

  onInvoiceChange?: (
    invoices: Invoice[]
  ) => void;
};

// =====================================================
// HELPERS
// =====================================================

function formatDate(
  value: unknown
): string {
  if (!value) {
    return "-";
  }

  const date =
    new Date(
      String(value)
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "-";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

// =====================================================
// MONEY
// =====================================================

function formatMoney(
  value: unknown
): string {
  return Number(
    value || 0
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  );
}

// =====================================================
// WHATSAPP NUMBER
// =====================================================

function normalizeWhatsAppNumber(
  mobile: string
): string {
  let number =
    String(
      mobile || ""
    ).replace(
      /\D/g,
      ""
    );

  // Indian 10 digit number
  if (
    number.length === 10
  ) {
    number =
      `91${number}`;
  }

  // If number starts with 0
  if (
    number.startsWith("0") &&
    number.length === 11
  ) {
    number =
      `91${number.slice(1)}`;
  }

  return number;
}

// =====================================================
// COMPONENT
// =====================================================

export default function InvoiceTable({
  search,
  onEdit,
  onView,
  onInvoiceChange,
}: Props) {
  // ===================================================
  // INVOICES
  // ===================================================

  const [
    invoices,
    setInvoices,
  ] = useState<Invoice[]>([]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const [
    lastDoc,
    setLastDoc,
  ] =
    useState<
      QueryDocumentSnapshot<DocumentData> | null
    >(null);

  const [
    hasMore,
    setHasMore,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);

  // ===================================================
  // DELETE
  // ===================================================

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  // ===================================================
  // WHATSAPP
  // ===================================================

  const [
    whatsappId,
    setWhatsappId,
  ] = useState<string | null>(
    null
  );

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
  ] = useState<Invoice | null>(
    null
  );

  // ===================================================
  // UPDATE PARENT
  // ===================================================

  function notifyInvoiceChange(
    data: Invoice[]
  ) {
    setInvoices(data);

    onInvoiceChange?.(
      data
    );
  }

  // ===================================================
  // LOAD FIRST PAGE
  // ===================================================

  async function loadFirstPage() {
    try {
      setLoading(true);

      const result =
        await getInvoicesPage(
          INVOICE_PAGE_SIZE
        );

      notifyInvoiceChange(
        result.invoices
      );

      setLastDoc(
        result.lastDoc
      );

      setHasMore(
        result.hasMore
      );
    } catch (error) {
      console.error(
        "Failed to load invoices:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // ===================================================
  // LOAD MORE
  // ===================================================

  async function loadMoreInvoices() {
    if (
      loadingMore ||
      !hasMore ||
      !lastDoc
    ) {
      return;
    }

    try {
      setLoadingMore(true);

      const result =
        await getInvoicesPage(
          INVOICE_PAGE_SIZE,
          lastDoc
        );

      setInvoices(
        (current) => {
          const updated =
            [
              ...current,
              ...result.invoices,
            ];

          onInvoiceChange?.(
            updated
          );

          return updated;
        }
      );

      setLastDoc(
        result.lastDoc
      );

      setHasMore(
        result.hasMore
      );
    } catch (error) {
      console.error(
        "Failed to load more invoices:",
        error
      );

      window.alert(
        "Failed to load more invoices."
      );
    } finally {
      setLoadingMore(false);
    }
  }

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    loadFirstPage();
  }, []);

  // ===================================================
  // REFRESH EVENT
  // ===================================================

  useEffect(() => {
    function handleRefresh() {
      loadFirstPage();
    }

    window.addEventListener(
      "invoice-refresh",
      handleRefresh
    );

    return () => {
      window.removeEventListener(
        "invoice-refresh",
        handleRefresh
      );
    };
  }, []);

  // ===================================================
  // SEARCH
  // ===================================================

  const filteredInvoices =
    useMemo(() => {
      const term =
        search
          .trim()
          .toLowerCase();

      if (!term) {
        return invoices;
      }

      return invoices.filter(
        (invoice) => {
          const invoiceNo =
            String(
              invoice.invoiceNo ||
                ""
            ).toLowerCase();

          const repairId =
            String(
              invoice.repairId ||
                ""
            ).toLowerCase();

          const customer =
            String(
              invoice.customerName ||
                ""
            ).toLowerCase();

          const mobile =
            String(
              invoice.mobile ||
                ""
            ).toLowerCase();

          const email =
            String(
              invoice.email ||
                ""
            ).toLowerCase();

          return (
            invoiceNo.includes(
              term
            ) ||
            repairId.includes(
              term
            ) ||
            customer.includes(
              term
            ) ||
            mobile.includes(
              term
            ) ||
            email.includes(
              term
            )
          );
        }
      );
    }, [
      invoices,
      search,
    ]);

  // ===================================================
  // DELETE
  // ===================================================

  async function handleDelete(
    invoice: Invoice
  ) {
    if (!invoice.id) {
      window.alert(
        "Invoice ID is missing."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Delete invoice ${
          invoice.invoiceNo || ""
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(
        invoice.id
      );

      await deleteInvoice(
        invoice.id
      );

      const updated =
        invoices.filter(
          (item) =>
            item.id !==
            invoice.id
        );

      notifyInvoiceChange(
        updated
      );
    } catch (error) {
      console.error(
        "Failed to delete invoice:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete invoice."
      );
    } finally {
      setDeletingId(null);
    }
  }

  // ===================================================
  // PRINT
  // ===================================================

  function handlePrint(
    invoice: Invoice
  ) {
    if (!invoice.id) {
      window.alert(
        "Invoice ID is missing."
      );

      return;
    }

    const printUrl =
      `/admin/invoices/${invoice.id}/print`;

    window.open(
      printUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // ===================================================
  // WAIT FOR PDF
  // ===================================================

  async function waitForPdfRender() {
    await new Promise<void>(
      (resolve) => {
        requestAnimationFrame(
          () => {
            requestAnimationFrame(
              () => {
                resolve();
              }
            );
          }
        );
      }
    );
  }

  // ===================================================
  // WHATSAPP
  // ===================================================

  async function handleWhatsApp(
    invoice: Invoice
  ) {
    if (!invoice.id) {
      window.alert(
        "Invoice ID is missing."
      );

      return;
    }

    // =================================================
    // GET CUSTOMER MOBILE
    // =================================================

    const mobile =
      String(
        invoice.mobile ||
          ""
      ).trim();

    const digits =
      mobile.replace(
        /\D/g,
        ""
      );

    if (!digits) {
      window.alert(
        "Customer mobile number is missing for WhatsApp."
      );

      return;
    }

    // =================================================
    // NORMALIZE
    // =================================================

    const whatsappNumber =
      normalizeWhatsAppNumber(
        mobile
      );

    if (
      !whatsappNumber ||
      whatsappNumber.length <
        12
    ) {
      window.alert(
        "Invalid customer WhatsApp number."
      );

      return;
    }

    try {
      setWhatsappId(
        invoice.id
      );

      // =================================================
      // PREPARE PDF
      // =================================================

      setPdfInvoice(
        invoice
      );

      await waitForPdfRender();

      // =================================================
      // FIND PDF ELEMENT
      // =================================================

      const pdfElement =
        pdfRef.current?.querySelector(
          "#invoice-print"
        ) as HTMLElement | null;

      if (!pdfElement) {
        throw new Error(
          "Invoice PDF could not be prepared."
        );
      }

      // =================================================
      // GENERATE PDF
      // =================================================

      const pdfBase64 =
  await generateInvoicePdfBase64(
    pdfElement
  );

      if (!pdfBase64) {
        throw new Error(
          "Invoice PDF generation failed."
        );
      }

      // =================================================
      // SAFE FILE NAME
      // =================================================

      const safeInvoiceNo =
        String(
          invoice.invoiceNo ||
            invoice.id
        ).replace(
          /[^a-zA-Z0-9-_]/g,
          "_"
        );

      const filename =
        `Lappy-Care-${safeInvoiceNo}.pdf`;

      // =================================================
      // CAPTION
      // =================================================

      const caption =
        `Hello ${
          invoice.customerName ||
          "Customer"
        },\n\n` +
        `Your Lappy Care invoice ${
          invoice.invoiceNo ||
          ""
        } is attached.\n\n` +
        `Thank you for choosing Lappy Care.\n\n` +
        `📞 95950 57006`;

      // =================================================
      // API
      // =================================================

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

                filename,

                caption,
              }),
          }
        );

      // =================================================
      // RESPONSE
      // =================================================

      const rawResponse =
        await response.text();

      let data: any = null;

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

      // =================================================
      // SUCCESS
      // =================================================

      window.alert(
        `✅ Invoice ${
          invoice.invoiceNo ||
          ""
        } sent successfully on WhatsApp.`
      );
    } catch (error) {
      console.error(
        "WhatsApp invoice error:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to send invoice on WhatsApp."
      );
    } finally {
      setPdfInvoice(null);
      setWhatsappId(null);
    }
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (
    loading &&
    invoices.length === 0
  ) {
    return (
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
        <div className="flex min-h-[280px] items-center justify-center">
          <div className="flex items-center gap-3 text-zinc-500">
            <Loader2
              size={20}
              className="animate-spin"
            />

            Loading invoices...
          </div>
        </div>
      </div>
    );
  }

  // ===================================================
  // TABLE
  // ===================================================

  return (
    <>
      {/* =================================================
          HIDDEN PDF
      ================================================= */}

      {pdfInvoice && (
        <div
          ref={pdfRef}
          className="fixed left-[-10000px] top-0 z-[-1] bg-white"
          style={{
            width: "794px",
          }}
        >
          <InvoicePrint
            invoice={
              pdfInvoice
            }
          />
        </div>
      )}

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            {/* =================================================
                HEADER
            ================================================= */}

            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80">
                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Invoice No
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Repair ID
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Customer
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Mobile
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Payment
                </th>

                <th className="px-4 py-4 text-right text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Total
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Date
                </th>

                <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-wide text-yellow-400">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                BODY
            ================================================= */}

            <tbody>
              {filteredInvoices.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center text-sm text-zinc-500"
                  >
                    {search.trim()
                      ? "No matching invoices found."
                      : "No invoices found."}
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(
                  (invoice) => (
                    <tr
                      key={
                        invoice.id
                      }
                      className="border-b border-zinc-800 transition hover:bg-zinc-900/70"
                    >
                      {/* INVOICE NO */}

                      <td className="px-4 py-4">
                        <span className="font-black text-yellow-400">
                          {invoice.invoiceNo ||
                            "-"}
                        </span>
                      </td>

                      {/* REPAIR ID */}

                      <td className="px-4 py-4">
                        {invoice.repairId ? (
                          <span className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold text-purple-300">
                            {
                              invoice.repairId
                            }
                          </span>
                        ) : (
                          <span className="text-zinc-600">
                            —
                          </span>
                        )}
                      </td>

                      {/* CUSTOMER */}

                      <td className="px-4 py-4">
                        <span className="font-semibold text-white">
                          {invoice.customerName ||
                            "-"}
                        </span>
                      </td>

                      {/* MOBILE */}

                      <td className="px-4 py-4">
                        <span className="text-sm text-zinc-400">
                          {invoice.mobile ||
                            "-"}
                        </span>
                      </td>

                      {/* PAYMENT */}

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-400">
                          {invoice.paymentMethod ||
                            "-"}
                        </span>
                      </td>

                      {/* TOTAL */}

                      <td className="px-4 py-4 text-right">
                        <span className="font-black text-green-400">
                          ₹
                          {formatMoney(
                            invoice.grandTotal
                          )}
                        </span>
                      </td>

                      {/* DATE */}

                      <td className="px-4 py-4">
                        <span className="text-sm text-zinc-400">
                          {formatDate(
                            invoice.createdAt
                          )}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-4">
                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              onView(
                                invoice
                              )
                            }
                            className="text-yellow-400 transition hover:text-yellow-300"
                            title="View Invoice"
                            aria-label="View Invoice"
                          >
                            <Eye
                              size={17}
                            />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              onEdit(
                                invoice
                              )
                            }
                            className="text-sky-400 transition hover:text-sky-300"
                            title="Edit Invoice"
                            aria-label="Edit Invoice"
                          >
                            <Pencil
                              size={17}
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
                            disabled={
                              deletingId ===
                              invoice.id
                            }
                            className="text-red-400 transition hover:text-red-300 disabled:opacity-40"
                            title="Delete Invoice"
                            aria-label="Delete Invoice"
                          >
                            {deletingId ===
                            invoice.id ? (
                              <Loader2
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={17}
                              />
                            )}
                          </button>

                          {/* PRINT */}

                          <button
                            type="button"
                            onClick={() =>
                              handlePrint(
                                invoice
                              )
                            }
                            className="text-emerald-400 transition hover:text-emerald-300"
                            title="Print Invoice"
                            aria-label="Print Invoice"
                          >
                            <Printer
                              size={17}
                            />
                          </button>

                          {/* WHATSAPP */}

                          <button
                            type="button"
                            onClick={() =>
                              handleWhatsApp(
                                invoice
                              )
                            }
                            disabled={
                              whatsappId ===
                              invoice.id
                            }
                            className="text-green-400 transition hover:scale-110 hover:text-green-300 disabled:cursor-wait disabled:opacity-50"
                            title="Send Invoice on WhatsApp"
                            aria-label="Send Invoice on WhatsApp"
                          >
                            {whatsappId ===
                            invoice.id ? (
                              <Loader2
                                size={18}
                                className="animate-spin"
                              />
                            ) : (
                              <MessageCircle
                                size={18}
                              />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            LOAD MORE
        ================================================= */}

        {hasMore && (
          <div className="flex justify-center border-t border-zinc-800 px-5 py-4">
            <button
              type="button"
              onClick={
                loadMoreInvoices
              }
              disabled={
                loadingMore
              }
              className="inline-flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-2.5 text-sm font-black text-yellow-400 transition hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  Loading...
                </>
              ) : (
                <>
                  <ChevronDown
                    size={17}
                  />

                  Load More Invoices
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}