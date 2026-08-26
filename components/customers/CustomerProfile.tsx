"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";
import { Repair } from "@/types/repair";

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
} from "lucide-react";

import AddRepairModal from "@/components/admin/AddRepairModal";

import {
  getRepairsByCustomerId,
} from "@/services/repairService";

import {
  ensureCustomerQrToken,
  getCustomerQrUrl,
} from "@/services/customerQrService";

import QRCode from "react-qr-code";

type Props = {
  customer: Customer;
};

export default function CustomerProfile({
  customer,
}: Props) {

  // ==========================================
  // State
  // ==========================================

  const [repairs, setRepairs] =
    useState<Repair[]>([]);

  const [loadingRepairs, setLoadingRepairs] =
    useState(true);

  const [selectedRepair, setSelectedRepair] =
    useState<Repair | null>(null);

  const [openRepairModal, setOpenRepairModal] =
    useState(false);

  const [qrToken, setQrToken] =
    useState(customer.qrToken ?? "");

  const [qrLoading, setQrLoading] =
    useState(false);

  const [qrError, setQrError] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  // ==========================================
  // Load Repair History
  // ==========================================

  useEffect(() => {

    loadRepairs();

  }, [customer.id]);

  async function loadRepairs() {

    try {

      if (!customer.id) {

        setRepairs([]);

        return;

      }

      const data =
        await getRepairsByCustomerId(
          customer.customerId
        );

      setRepairs(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingRepairs(false);

    }

  }

  // ==========================================
  // Generate Customer QR
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
  // Customer QR URL
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

  return (

    <div className="space-y-8">

      {/* ==========================
          Customer Card
      ========================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white">
              {customer.name}
            </h1>

            <p className="mt-2 text-gray-400">
              Customer ID : {customer.customerId}
            </p>

          </div>

          <div className="rounded-full bg-yellow-400 px-6 py-3 text-center font-bold text-black">

            {customer.totalRepairs} Repairs

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

              {customer.address || "-"}

              {customer.city
                ? `, ${customer.city}`
                : ""}

              {customer.state
                ? `, ${customer.state}`
                : ""}

              {customer.pincode
                ? ` - ${customer.pincode}`
                : ""}

            </span>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-8 flex flex-wrap gap-4">

          <a
            href={`tel:${customer.mobile}`}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
          >

            <Phone size={18} />

            Call

          </a>

          <a
            href={`https://wa.me/91${customer.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
          >

            <MessageCircle size={18} />

            WhatsApp

          </a>

        </div>

      </div>

      {/* ==========================
          Customer QR Code
      ========================== */}

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
              className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {qrLoading
                ? "Generating QR..."
                : "Generate Customer QR"}

            </button>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

            {/* QR */}

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

            {/* QR Details */}

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
                  className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black"
                >

                  <ExternalLink size={18} />

                  Open Profile

                </a>

                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
                >

                  <Download size={18} />

                  Download QR

                </button>

                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="flex items-center gap-2 rounded-xl bg-gray-700 px-5 py-3 font-semibold text-white"
                >

                  <Copy size={18} />

                  {copied
                    ? "Copied"
                    : "Copy URL"}

                </button>

              </div>

              <p className="mt-5 text-xs leading-5 text-gray-500">
                This QR code uses a secure customer token.
                Customer mobile number is not stored inside the QR code.
              </p>

            </div>

          </div>

        )}

        {qrError && (

          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {qrError}
          </div>

        )}

      </div>

      {/* ==========================
          Summary Cards
      ========================== */}

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
            {customer.totalRepairs}
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
            {customer.totalInvoices}
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
            ₹{customer.totalSpent.toLocaleString("en-IN")}
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
            ₹{customer.pendingAmount.toLocaleString("en-IN")}
          </h2>

        </div>

      </div>

      {/* ==========================
          Repair History
      ========================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="mb-6 flex items-center gap-3">

          <Wrench
            size={24}
            className="text-yellow-400"
          />

          <h2 className="text-2xl font-bold text-white">
            Repair History
          </h2>

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
                key={repair.id}
                onClick={() =>
                  handleOpenRepair(repair)
                }
                className="cursor-pointer rounded-xl border border-transparent bg-[#202020] p-5 transition hover:border-yellow-400"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-white">
                      {repair.repairId}
                    </h3>

                    <p className="mt-1 text-gray-400">
                      {repair.device.brand}{" "}
                      {repair.device.model}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {repair.problem.complaint}
                    </p>

                  </div>

                  <div className="text-right">

                    <span className="rounded-full bg-yellow-500/20 px-4 py-1 text-sm font-semibold text-yellow-400">
                      {repair.status}
                    </span>

                    <p className="mt-3 text-sm text-gray-500">
                      ₹
                      {repair.estimate.totalAmount.toLocaleString(
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

      {/* ==========================
          Invoice History
      ========================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <div className="mb-6 flex items-center gap-3">

          <Receipt
            size={24}
            className="text-yellow-400"
          />

          <h2 className="text-2xl font-bold text-white">
            Invoice History
          </h2>

        </div>

        <div className="rounded-xl bg-[#202020] p-6 text-center text-gray-400">
          Invoice Module Coming Soon
        </div>

      </div>

      {/* ==========================
          Customer Notes
      ========================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Notes
        </h2>

        <div className="rounded-xl bg-[#202020] p-5">

          <p className="leading-7 text-gray-300">
            {customer.notes || "No notes available."}
          </p>

        </div>

      </div>

      {/* ==========================
          Activity Timeline
      ========================== */}

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
                ).toLocaleString("en-IN")}
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
                ).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================
          Quick Actions
      ========================== */}

      <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            type="button"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black"
          >
            🧾 Print Invoice
          </button>

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            📄 Print Job Card
          </button>

          <a
            href={`https://wa.me/91${customer.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
          >
            💬 WhatsApp
          </a>

          <a
            href={`tel:${customer.mobile}`}
            className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white"
          >
            📞 Call
          </a>

        </div>

      </div>

      <AddRepairModal
        open={openRepairModal}
        repair={selectedRepair}
        onClose={() => {
          setOpenRepairModal(false);
          setSelectedRepair(null);
        }}
        onSuccess={() => {
          loadRepairs();
          setOpenRepairModal(false);
          setSelectedRepair(null);
        }}
      />

      {/* ==========================
          Customer Statistics
      ========================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-[#181818] p-6 text-center">

          <h3 className="text-lg font-semibold text-gray-400">
            Loyalty Status
          </h3>

          <p className="mt-4 text-3xl font-bold text-yellow-400">

            {customer.totalRepairs >= 10
              ? "Gold"
              : customer.totalRepairs >= 5
              ? "Silver"
              : "Regular"}

          </p>

          <p className="mt-2 text-sm text-gray-500">
            {customer.totalRepairs} Repairs Completed
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

      {/* ==========================
          Footer
      ========================== */}

      <div className="border-t border-yellow-500/20 pt-8 text-center">

        <p className="text-gray-500">
          Lappy Care ERP • Customer Profile
        </p>

      </div>

    </div>

  );
}