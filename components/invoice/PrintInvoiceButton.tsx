"use client";

import { Printer } from "lucide-react";
import { Invoice } from "@/types/invoice";

type Props = {
  invoice: Invoice;
  label?: string;
};

export default function PrintInvoiceButton({
  invoice,
  label = "Print Invoice",
}: Props) {
  function handlePrint() {
    if (!invoice.id) {
      window.alert("Invoice ID is missing.");
      return;
    }

    const printUrl = `/admin/invoices/${invoice.id}/print`;

    window.open(
      printUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center justify-center gap-2 text-green-400 transition hover:text-green-300"
      title="Print Invoice"
      aria-label="Print Invoice"
    >
      <Printer size={18} />

      {label && (
        <span>{label}</span>
      )}
    </button>
  );
}