"use client";

import { useRef, useState } from "react";

import { MessageCircle } from "lucide-react";

import type { Invoice } from "@/types/invoice";

import InvoicePrint from "./InvoicePrint";

import { generateInvoicePdfBase64 } from "@/services/invoicePdfService";

type Props = {
  invoice: Invoice;
};

export default function WhatsAppInvoiceButton({
  invoice,
}: Props) {
  const invoiceRef =
    useRef<HTMLDivElement | null>(null);

  const [sending, setSending] =
    useState(false);

  async function handleSendWhatsApp() {
    if (sending) return;

    if (!invoice.mobile) {
      window.alert(
        "Customer mobile number is missing."
      );
      return;
    }

    if (!invoice.invoiceNo) {
      window.alert(
        "Invoice number is missing."
      );
      return;
    }

    const element =
      invoiceRef.current?.querySelector(
        "#invoice-print"
      ) as HTMLElement | null;

    if (!element) {
      window.alert(
        "Invoice PDF area was not found."
      );
      return;
    }

    try {
      setSending(true);

      console.log(
        "========================================"
      );

      console.log(
        "WHATSAPP INVOICE BUTTON"
      );

      console.log({
        invoiceNo:
          invoice.invoiceNo,

        mobile:
          invoice.mobile,
      });

      // =============================================
      // GENERATE PDF
      // =============================================

      const pdfBase64 =
        await generateInvoicePdfBase64(
          element,
          invoice
        );

      if (!pdfBase64) {
        throw new Error(
          "Invoice PDF generation failed."
        );
      }

      const filename =
        `${invoice.invoiceNo}.pdf`;

      console.log(
        "Sending generated invoice PDF to API..."
      );

      // =============================================
      // SEND TO WHATSAPP API
      // =============================================

      const response =
        await fetch(
          "/api/invoice/send-whatsapp",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              to:
                invoice.mobile,

              pdfBase64,

              filename,

              caption:
                `Hello ${invoice.customerName || "Customer"},\n\n` +
                `Your Lappy Care invoice ${invoice.invoiceNo} is attached.\n\n` +
                `Thank you for choosing Lappy Care.\n\n` +
                `📞 95950 57006`,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Failed to send invoice on WhatsApp."
        );
      }

      console.log(
        "WhatsApp invoice sent successfully:",
        data
      );

      console.log(
        "========================================"
      );

      window.alert(
        `Invoice ${invoice.invoiceNo} sent successfully on WhatsApp.`
      );
    } catch (error) {
      console.error(
        "WhatsApp invoice send failed:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to send invoice on WhatsApp."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* =================================================
          WHATSAPP BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={
          handleSendWhatsApp
        }
        disabled={sending}
        className={`
          rounded-lg
          p-2
          transition
          ${
            sending
              ? "cursor-not-allowed text-zinc-600"
              : "text-green-400 hover:bg-green-500/10 hover:text-green-300"
          }
        `}
        title={
          sending
            ? "Sending invoice..."
            : "Send Invoice on WhatsApp"
        }
        aria-label="Send Invoice on WhatsApp"
      >
        <MessageCircle
          size={18}
          className={
            sending
              ? "animate-pulse"
              : ""
          }
        />
      </button>

      {/* =================================================
          HIDDEN INVOICE DOM
          
          Used only for PDF generation.
          No Firestore request.
      ================================================= */}

      <div
        ref={invoiceRef}
        className="pointer-events-none fixed left-[-10000px] top-0 z-[-1] w-[794px] bg-white"
        aria-hidden="true"
      >
        <InvoicePrint
          invoice={invoice}
        />
      </div>
    </>
  );
}