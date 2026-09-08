import { notFound } from "next/navigation";

import InvoicePrint from "@/components/invoice/InvoicePrint";
import { getInvoiceById } from "@/services/invoiceService";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InvoicePrintPage({
  params,
}: Props) {
  const { id } = await params;

  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  return (
    <main
      id="invoice-print-container"
      className="min-h-screen bg-white"
    >
      <InvoicePrint invoice={invoice} />
    </main>
  );
}