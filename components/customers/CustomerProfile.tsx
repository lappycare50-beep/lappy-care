"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Wrench,
  Receipt,
  QrCode,
  ExternalLink,
  Download,
  Copy,
  Printer,
} from "lucide-react";

import QRCode from "react-qr-code";

import { Customer } from "@/types/customer";
import { Repair } from "@/types/repair";
import { Invoice } from "@/types/invoice";

import AddRepairModal from "@/components/admin/AddRepairModal";

import {
  getRepairsByCustomerId,
} from "@/services/repairService";

import {
  getInvoicesByMobile,
} from "@/services/invoiceService";

import {
  ensureCustomerQrToken,
  getCustomerQrUrl,
} from "@/services/customerQrService";

type Props = {
  customer: Customer;
};

export default function CustomerProfile({
  customer,
}: Props) {
  const router = useRouter();

  // ==========================================
  // State
  // ==========================================

  const [repairs, setRepairs] =
    useState<Repair[]>([]);

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [loadingRepairs, setLoadingRepairs] =
    useState(true);

  const [loadingInvoices, setLoadingInvoices] =
    useState(true);

  const [selectedRepair, setSelectedRepair] =
    useState<Repair | null>(null);

  const [openRepairModal, setOpenRepairModal] =
    useState(false);

  const [qrToken, setQrToken] =
    useState("");

  const [qrLoading, setQrLoading] =
    useState(false);

  const [qrError, setQrError] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  // ==========================================
  // Load Customer History
  // ==========================================

  useEffect(() => {
    loadRepairs();
    loadInvoices();
  }, [
    customer.id,
    customer.customerId,
    customer.mobile,
  ]);

  // ==========================================
  // Load Repairs
  // ==========================================

  async function loadRepairs() {
    try {
      setLoadingRepairs(true);

      if (
        !customer.customerId &&
        !customer.id &&
        !customer.mobile
      ) {
        setRepairs([]);
        return;
      }

      const data =
        await getRepairsByCustomerId(
          customer.customerId,
          customer.id,
          customer.mobile
        );

      setRepairs(data);
    } catch (error) {
      console.error(
        "Unable to load repair history:",
        error
      );

      setRepairs([]);
    } finally {
      setLoadingRepairs(false);
    }
  }

  // ==========================================
  // Load Invoices
  // ==========================================

  async function loadInvoices() {
    try {
      setLoadingInvoices(true);

      if (!customer.mobile) {
        setInvoices([]);
        return;
      }

      const data =
        await getInvoicesByMobile(
          customer.mobile
        );

      setInvoices(data);
    } catch (error) {
      console.error(
        "Unable to load invoice history:",
        error
      );

      setInvoices([]);
    } finally {
      setLoadingInvoices(false);
    }
  }

  // ==========================================
  // Generate QR
  // ==========================================

  async function handleGenerateQr() {
    try {
      setQrLoading(true);
      setQrError("");

      const token =
        await ensureCustomerQrToken(
          customer
        );

      setQrToken(token);
    } catch (error) {
      console.error(error);

      setQrError(
        error instanceof Error
          ? error.message
          : "Unable to generate customer QR."
      );
    } finally {
      setQrLoading(false);
    }
  }

  // ==========================================
  // QR URL
  // ==========================================

  const qrUrl =
    qrToken
      ? getCustomerQrUrl(qrToken)
      : "";

  // ==========================================
  // Download QR
  // ==========================================

  function handleDownloadQr() {
    const svg =
      document.getElementById(
        "customer-qr-code"
      ) as SVGElement | null;

    if (!svg) return;

    const serializer =
      new XMLSerializer();

    const source =
      serializer.serializeToString(svg);

    const blob =
      new Blob(
        [source],
        {
          type: "image/svg+xml;charset=utf-8",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${customer.customerId}-customer-qr.svg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  // ==========================================
  // Copy QR URL
  // ==========================================

  async function handleCopyUrl() {
    if (!qrUrl) return;

    try {
      await navigator.clipboard.writeText(
        qrUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================================
  // Open Repair
  // ==========================================

  function handleOpenRepair(
    repair: Repair
  ) {
    setSelectedRepair(repair);
    setOpenRepairModal(true);
  }

  // ==========================================
  // Print Invoice
  // ==========================================

  function handlePrintInvoice() {
    if (invoices.length > 0) {
      const invoice = invoices[0];

      if (invoice.id) {
        router.push(
          `/admin/invoices/${invoice.id}`
        );

        return;
      }
    }

    router.push("/admin/invoices");
  }

  // ==========================================
  // Print Job Card
  // ==========================================

  function handlePrintJobCard() {
    if (repairs.length > 0) {
      const repair = repairs[0];

      if (repair.id) {
        router.push(
          `/admin/repairs/${repair.id}`
        );

        return;
      }
    }

    router.push("/admin/repairs");
  }

  // ==========================================
  // Format Currency
  // ==========================================

  function formatCurrency(
    amount: number
  ) {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-8">

      {/* ==========================================
          Customer Card
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-white">
              {customer.name}
            </h1>

            <p className="mt-2 text-gray-400">
              Customer ID :{" "}
              {customer.customerId}
            </p>
          </div>

          <div className="rounded-full bg-yellow-400 px-6 py-3 text-center font-bold text-black">
            {repairs.length} Repairs
          </div>

        </div>

        {/* Contact */}

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <div className="flex items-center gap-3">
            <Phone
              size={20}
              className="text-yellow-400"
            />

            <span className="text-white">
              {customer.mobile}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail
              size={20}
              className="text-yellow-400"
            />

            <span className="text-white">
              {customer.email || "-"}
            </span>
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <MapPin
              size={20}
              className="text-yellow-400"
            />

            <span className="text-white">
              {customer.address || ""}

              {customer.city
                ? `, ${customer.city}`
                : ""}

              {customer.state
                ? `, ${customer.state}`
                : ""}

              {customer.pincode
                ? ` - ${customer.pincode}`
                : ""}

              {!customer.address &&
              !customer.city &&
              !customer.state &&
              !customer.pincode
                ? "-"
                : ""}
            </span>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-8 flex flex-wrap gap-4">

          <a
            href={`tel:${customer.mobile}`}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
          >
            <Phone size={18} />
            Call
          </a>

          <a
            href={`https://wa.me/91${customer.mobile.replace(
              /\D/g,
              ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

        </div>

      </div>

      {/* ==========================================
          Customer QR
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="mb-6 flex items-center gap-3">

          <QrCode
            size={26}
            className="text-yellow-400"
          />

          <div>
            <h2 className="text-2xl font-bold text-white">
              Customer QR Code
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Scan this QR code to open the customer care profile.
            </p>
          </div>

        </div>

        {!qrToken ? (

          <div className="rounded-2xl border border-dashed border-gray-700 bg-[#202020] p-8 text-center">

            <QrCode
              size={48}
              className="mx-auto mb-4 text-gray-500"
            />

            <p className="text-gray-300">
              QR code has not been generated yet.
            </p>

            <button
              type="button"
              onClick={handleGenerateQr}
              disabled={qrLoading}
              className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {qrLoading
                ? "Generating QR..."
                : "Generate Customer QR"}
            </button>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

            <div className="flex justify-center">

              <div className="rounded-2xl bg-white p-5">

                <QRCode
                  id="customer-qr-code"
                  value={qrUrl}
                  size={230}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />

              </div>

            </div>

            <div className="flex flex-col justify-center">

              <p className="text-sm font-semibold text-gray-300">
                Customer Profile URL
              </p>

              <div className="mt-2 break-all rounded-xl bg-[#202020] p-4 text-sm text-gray-300">
                {qrUrl}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">

                <a
                  href={qrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-300"
                >
                  <ExternalLink size={18} />
                  Open Profile
                </a>

                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
                >
                  <Download size={18} />
                  Download QR
                </button>

                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="flex items-center gap-2 rounded-xl bg-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-600"
                >
                  <Copy size={18} />

                  {copied
                    ? "Copied"
                    : "Copy URL"}
                </button>

              </div>

            </div>

          </div>

        )}

        {qrError && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {qrError}
          </div>
        )}

      </div>

      {/* ==========================================
          Summary Cards
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-[#181818] p-6">

          <Wrench
            className="mb-3 text-yellow-400"
            size={26}
          />

          <p className="text-gray-400">
            Total Repairs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {repairs.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-[#181818] p-6">

          <Receipt
            className="mb-3 text-blue-400"
            size={26}
          />

          <p className="text-gray-400">
            Total Invoices
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {invoices.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-[#181818] p-6">

          <Receipt
            className="mb-3 text-green-400"
            size={26}
          />

          <p className="text-gray-400">
            Total Spent
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {formatCurrency(
              customer.totalSpent
            )}
          </h2>

        </div>

        <div className="rounded-2xl bg-[#181818] p-6">

          <Receipt
            className="mb-3 text-red-400"
            size={26}
          />

          <p className="text-gray-400">
            Pending Amount
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {formatCurrency(
              customer.pendingAmount
            )}
          </h2>

        </div>

      </div>

      {/* ==========================================
          Repair History
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="mb-6 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Wrench
              size={24}
              className="text-yellow-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Repair History
            </h2>

          </div>

          <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400">
            {repairs.length} Repairs
          </span>

        </div>

        {loadingRepairs ? (

          <div className="rounded-xl bg-[#202020] p-8 text-center text-gray-400">
            Loading Repair History...
          </div>

        ) : repairs.length === 0 ? (

          <div className="rounded-xl bg-[#202020] p-8 text-center text-gray-400">
            No Repair History Found
          </div>

        ) : (

          <div className="space-y-4">

            {repairs.map((repair) => (

              <div
                key={
                  repair.id ||
                  repair.repairId
                }
                onClick={() =>
                  handleOpenRepair(
                    repair
                  )
                }
                className="cursor-pointer rounded-xl border border-transparent bg-[#202020] p-5 transition hover:border-yellow-400"
              >

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h3 className="font-semibold text-white">
                      {repair.repairId}
                    </h3>

                    <p className="mt-1 text-gray-400">
                      {repair.device?.brand ||
                        ""}
                      {" "}
                      {repair.device?.model ||
                        ""}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {repair.problem?.complaint ||
                        "-"}
                    </p>

                  </div>

                  <div className="text-right">

                    <span className="rounded-full bg-yellow-500/20 px-4 py-1 text-sm font-semibold text-yellow-400">
                      {repair.status}
                    </span>

                    <p className="mt-3 text-sm text-gray-500">
                      ₹
                      {Number(
                        repair.estimate?.totalAmount ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ==========================================
          Invoice History
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="mb-6 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Receipt
              size={24}
              className="text-yellow-400"
            />

            <div>

              <h2 className="text-2xl font-bold text-white">
                Invoice History
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                All invoices created for this customer.
              </p>

            </div>

          </div>

          <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-400">
            {invoices.length} Invoice
            {invoices.length !== 1
              ? "s"
              : ""}
          </span>

        </div>

        {loadingInvoices ? (

          <div className="rounded-xl bg-[#202020] p-8 text-center text-gray-400">
            Loading Invoice History...
          </div>

        ) : invoices.length === 0 ? (

          <div className="rounded-xl bg-[#202020] p-8 text-center text-gray-400">
            No Invoice History Found
          </div>

        ) : (

          <div className="space-y-4">

            {invoices.map((invoice) => (

              <div
                key={
                  invoice.id ||
                  invoice.invoiceNo
                }
                className="rounded-xl border border-transparent bg-[#202020] p-5"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="font-semibold text-white">
                        {invoice.invoiceNo}
                      </h3>

                      <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                        {invoice.paymentMethod}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-gray-400">
                      Date:{" "}
                      {formatDate(
                        invoice.createdAt
                      )}
                    </p>

                    {invoice.repairId && (
                      <p className="mt-1 text-sm text-yellow-400">
                        Repair ID:{" "}
                        {invoice.repairId}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-gray-500">
                      Items:{" "}
                      {invoice.items?.length ||
                        0}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Grand Total
                    </p>

                    <p className="mt-1 text-2xl font-bold text-green-400">
                      {formatCurrency(
                        invoice.grandTotal
                      )}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ==========================================
          Notes
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Notes
        </h2>

        <div className="rounded-xl bg-[#202020] p-5">

          <p className="leading-7 text-gray-300">
            {customer.notes ||
              "No notes available."}
          </p>

        </div>

      </div>

      {/* ==========================================
          Activity Timeline
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Activity Timeline
        </h2>

        <div className="space-y-6">

          <div className="flex gap-4">

            <div className="mt-1 h-4 w-4 rounded-full bg-yellow-400" />

            <div>

              <h3 className="font-semibold text-white">
                Customer Created
              </h3>

              <p className="text-sm text-gray-400">
                {new Date(
                  customer.createdAt
                ).toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>

          <div className="flex gap-4">

            <div className="mt-1 h-4 w-4 rounded-full bg-blue-400" />

            <div>

              <h3 className="font-semibold text-white">
                Last Updated
              </h3>

              <p className="text-sm text-gray-400">
                {new Date(
                  customer.updatedAt
                ).toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          Quick Actions
      ========================================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            type="button"
            onClick={handlePrintInvoice}
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300"
          >
            <Printer size={18} />
            Print Invoice
          </button>

          <button
            type="button"
            onClick={handlePrintJobCard}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            <Printer size={18} />
            Print Job Card
          </button>

          <a
            href={`https://wa.me/91${customer.mobile.replace(
              /\D/g,
              ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <a
            href={`tel:${customer.mobile}`}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-500"
          >
            <Phone size={18} />
            Call
          </a>

        </div>

      </div>

      {/* ==========================================
          Repair Modal
      ========================================== */}

      <AddRepairModal
        open={openRepairModal}
        repair={selectedRepair}
        onClose={() => {
          setOpenRepairModal(false);
          setSelectedRepair(null);
        }}
        onSuccess={() => {
          loadRepairs();
          loadInvoices();

          setOpenRepairModal(false);
          setSelectedRepair(null);
        }}
      />

      {/* ==========================================
          Customer Statistics
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-[#181818] p-6 text-center">

          <h3 className="text-lg font-semibold text-gray-400">
            Loyalty Status
          </h3>

          <p className="mt-4 text-3xl font-bold text-yellow-400">

            {repairs.length >= 10
              ? "Gold"
              : repairs.length >= 5
              ? "Silver"
              : "Regular"}

          </p>

          <p className="mt-2 text-sm text-gray-500">
            {repairs.length} Repairs Completed
          </p>

        </div>

        <div className="rounded-2xl bg-[#181818] p-6 text-center">

          <h3 className="text-lg font-semibold text-gray-400">
            Payment Status
          </h3>

          <p
            className={`mt-4 text-3xl font-bold ${
              customer.pendingAmount > 0
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {customer.pendingAmount > 0
              ? "Pending"
              : "Clear"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Current Account Status
          </p>

        </div>

        <div className="rounded-2xl bg-[#181818] p-6 text-center">

          <h3 className="text-lg font-semibold text-gray-400">
            Customer Since
          </h3>

          <p className="mt-4 text-3xl font-bold text-blue-400">
            {new Date(
              customer.createdAt
            ).getFullYear()}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Trusted Customer
          </p>

        </div>

      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <div className="border-t border-yellow-500/20 pt-8 text-center">

        <p className="text-gray-500">
          Lappy Care ERP • Customer Profile
        </p>

      </div>

    </div>
  );
}

// ==========================================
// Date Formatter
// ==========================================

function formatDate(
  value?: string
) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}