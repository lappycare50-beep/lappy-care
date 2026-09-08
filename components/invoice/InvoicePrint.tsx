import { Invoice } from "@/types/invoice";

type Props = {
  invoice: Invoice;
};

function formatInvoiceDate(value: unknown) {
  if (!value) return "-";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function money(value: unknown) {
  return Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

export default function InvoicePrint({ invoice }: Props) {
  const invoiceDate = formatInvoiceDate(invoice.createdAt);

  const subTotal = Number(invoice.subTotal || 0);
  const discount = Number(invoice.discount || 0);
  const gst = Number(invoice.gst || 0);

  const gstAmount = (subTotal * gst) / 100;

  const grandTotal = Number(invoice.grandTotal || 0);

  return (
    <div
      id="invoice-print"
      className="mx-auto w-full max-w-[794px] bg-white px-6 py-5 text-black"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b-2 border-black pb-2">
        <div className="flex items-start justify-between gap-8">

          {/* LEFT */}

          <div className="min-w-0">
            <h1 className="text-[20px] font-black leading-none">
              LAPPY CARE
            </h1>

            <p className="mt-1 text-[8px] leading-tight text-gray-700">
              Laptop Repair &amp; Services
            </p>

            <p className="text-[10px] leading-tight">
              Wakad, Pune
            </p>

            <p className="text-[10px] leading-tight">
              Mobile : +91 9595057006
            </p>
          </div>

          {/* RIGHT */}

          <div className="w-[255px] shrink-0 text-right">
            <h2 className="text-[18px] font-black leading-none">
              TAX INVOICE
            </h2>

            <div className="mt-1.5 space-y-0.5 text-[10px] leading-tight">
              <p>
                <strong>Invoice No:</strong>{" "}
                {invoice.invoiceNo || "-"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {invoiceDate}
              </p>

              <p>
                <strong>Repair ID:</strong>{" "}
                {invoice.repairId || "-"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          CUSTOMER
      ===================================================== */}

      <div className="mt-2 rounded border border-black px-3 py-2">
        <h3 className="mb-1 text-[9px] font-black uppercase">
          Bill To
        </h3>

        <div className="grid grid-cols-2 gap-x-10 gap-y-1 text-[10px] leading-tight">

          <div>
            <strong>Customer Name</strong>
            <p>{invoice.customerName || "-"}</p>
          </div>

          <div>
            <strong>Mobile</strong>
            <p>{invoice.mobile || "-"}</p>
          </div>

          <div className="col-span-2">
            <strong>Email</strong>
            <p>{invoice.email || "-"}</p>
          </div>

        </div>
      </div>

      {/* =====================================================
          ITEMS
      ===================================================== */}

      <div className="mt-2">
        <h3 className="mb-1 text-[9px] font-black uppercase">
          Invoice Items
        </h3>

        <table className="w-full border-collapse border border-black text-[10px]">
          <thead>
            <tr className="bg-gray-200">

              <th className="w-[30px] border border-black px-2 py-1 text-left">
                #
              </th>

              <th className="border border-black px-2 py-1 text-left">
                Item Description
              </th>

              <th className="w-[55px] border border-black px-2 py-1 text-center">
                Qty
              </th>

              <th className="w-[100px] border border-black px-2 py-1 text-right">
                Price
              </th>

              <th className="w-[110px] border border-black px-2 py-1 text-right">
                Amount
              </th>

            </tr>
          </thead>

          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={item.id || index}>

                <td className="border border-black px-2 py-1">
                  {index + 1}
                </td>

                <td className="border border-black px-2 py-1">
                  {item.name || "-"}
                </td>

                <td className="border border-black px-2 py-1 text-center">
                  {item.qty}
                </td>

                <td className="border border-black px-2 py-1 text-right">
                  ₹{money(item.price)}
                </td>

                <td className="border border-black px-2 py-1 text-right font-bold">
                  ₹{money(item.total)}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="mt-2 flex justify-end">
        <table className="w-[260px] border-collapse border border-black text-[10px]">

          <tbody>

            <tr>
              <td className="border border-black px-2 py-1 font-semibold">
                Sub Total
              </td>

              <td className="border border-black px-2 py-1 text-right">
                ₹{money(subTotal)}
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 font-semibold">
                Discount
              </td>

              <td className="border border-black px-2 py-1 text-right">
                ₹{money(discount)}
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 font-semibold">
                GST ({gst}%)
              </td>

              <td className="border border-black px-2 py-1 text-right">
                ₹{money(gstAmount)}
              </td>
            </tr>

            <tr className="bg-gray-200">
              <td className="border border-black px-2 py-1 font-black">
                Grand Total
              </td>

              <td className="border border-black px-2 py-1 text-right font-black">
                ₹{money(grandTotal)}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* =====================================================
          PAYMENT DETAILS
      ===================================================== */}

      <div className="mt-2 rounded border border-black px-3 py-1.5">

        <h3 className="mb-0.5 text-[8px] font-black uppercase">
          Payment Details
        </h3>

        <div className="grid grid-cols-2 gap-x-10 text-[9px] leading-tight">

          <div>
            <strong>Payment Method</strong>
            <p>{invoice.paymentMethod || "-"}</p>
          </div>

          <div>
            <strong>Invoice Date</strong>
            <p>{invoiceDate}</p>
          </div>

          <div className="col-span-2 mt-0.5">
            <strong>Remarks</strong>
            <p>{invoice.remarks || "-"}</p>
          </div>

        </div>
      </div>

      {/* =====================================================
          TERMS
      ===================================================== */}

      <div className="mt-2">

        <h3 className="mb-0.5 text-[8px] font-black uppercase">
          Terms &amp; Conditions
        </h3>

        <ul className="list-disc space-y-0 pl-4 text-[8px] leading-tight">

          <li>
            Goods once sold will not be taken back or exchanged.
          </li>

          <li>
            Warranty is applicable only on specified repaired/replaced parts.
          </li>

          <li>
            Lappy Care is not responsible for any data loss during repair.
          </li>

          <li>
            Please keep this invoice safely for warranty claims.
          </li>

          <li>
            Subject to Pune Jurisdiction only.
          </li>

        </ul>
      </div>

      {/* =====================================================
          SIGNATURES
      ===================================================== */}

      <div className="mt-5 grid grid-cols-2 gap-12">

        <div className="text-center">
          <div className="border-t border-black pt-1 text-[9px] font-semibold">
            Customer Signature
          </div>
        </div>

        <div className="text-center">
          <div className="border-t border-black pt-1 text-[9px] font-semibold">
            Authorized Signature
          </div>
        </div>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-2 border-t border-black pt-1.5 text-center">

        <h2 className="text-[10px] font-black">
          Thank You for Choosing Lappy Care!
        </h2>

        <p className="mt-0.5 text-[8px] text-gray-700">
          We appreciate your business and look forward to serving you again.
        </p>

        <div className="mt-1 space-y-0 text-[7px] text-gray-600">

          <p>📍 Lappy Care, Wakad, Pune</p>
          <p>📞 +91 9595057006</p>
          <p>✉️ lappycarepune@gmail.com</p>
          <p>🌐 www.lappycarepune.in</p>

        </div>
      </div>

    </div>
  );
}