"use client";

import {
  useState,
} from "react";

import type {
  Repair,
} from "@/types/repair";

import {
  generateJobCardPdfBase64,
} from "@/services/jobCardPdfService";

type Props = {
  repair: Repair;
};

export default function JobCardWhatsAppButton({
  repair,
}: Props) {
  const [
    sending,
    setSending,
  ] = useState(false);

  async function sendWhatsApp() {
    const mobile =
      repair.customer.mobile
        ?.replace(
          /\D/g,
          ""
        );

    if (!mobile) {
      window.alert(
        "Customer mobile number is missing."
      );

      return;
    }

    if (!repair.repairId) {
      window.alert(
        "Repair ID is missing."
      );

      return;
    }

    try {
      setSending(true);

      // ===============================================
      // GENERATE SAME JOB CARD PDF
      // ===============================================

      const pdfBase64 =
        await generateJobCardPdfBase64(
          repair
        );

      // ===============================================
      // SEND TO SERVER
      // ===============================================

      const response =
        await fetch(
          "/api/whatsapp/send-job-card",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                to: mobile,

                pdfBase64,

                filename:
                  `Lappy-Care-Job-Card-${repair.repairId}.pdf`,

                caption:
                  `Hello ${repair.customer.name || "Customer"}, your Lappy Care Job Card ${repair.repairId} is attached.`,
              }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.error ||
            "Failed to send Job Card PDF."
        );
      }

      window.alert(
        "✅ Job Card PDF sent successfully on WhatsApp."
      );
    } catch (error) {
      console.error(
        "Job Card WhatsApp PDF error:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to send Job Card PDF."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={
        sendWhatsApp
      }
      disabled={
        sending
      }
      className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {sending
        ? "Sending PDF..."
        : "💬 WhatsApp Job Card"}
    </button>
  );
}