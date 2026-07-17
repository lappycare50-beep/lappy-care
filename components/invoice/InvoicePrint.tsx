"use client";

import { Invoice } from "@/types/invoice";

type Props = {
  invoice: Invoice;
};

export default function InvoicePrint({
  invoice,
}: Props) {
  return (
    <div
      id="invoice-print"
      className="mx-auto max-w-5xl bg-white p-10 text-black"
    >

      {/* ==========================
          Header
      ========================== */}

      <div className="mb-8 border-b-2 border-black pb-6">

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              LAPPY CARE
            </h1>

            <p className="mt-1 text-gray-700">
              Laptop Repair & Services
            </p>

            <p className="text-sm text-gray-600">
              Wakad, Pune
            </p>

            <p className="text-sm text-gray-600">
              Mobile : +91 9595057006
            </p>

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-bold">
              TAX INVOICE
            </h2>

            <p className="mt-3">
              <strong>Invoice No :</strong>{" "}
              {invoice.invoiceNo}
            </p>

            <p>
              <strong>Date :</strong>{" "}
              {new Date(
                invoice.createdAt
              ).toLocaleDateString("en-IN")}
            </p>

            <p>
              <strong>Repair ID :</strong>{" "}
              {invoice.repairId || "-"}
            </p>

          </div>

        </div>

      </div>

      {/* ==========================
          Customer Details
      ========================== */}

      <div className="mb-8 rounded border border-black p-5">

        <h3 className="mb-4 text-xl font-bold">
          Bill To
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <strong>Customer Name</strong>

            <p className="mt-1">
              {invoice.customerName}
            </p>

          </div>

          <div>

            <strong>Mobile</strong>

            <p className="mt-1">
              {invoice.mobile}
            </p>

          </div>

          <div className="col-span-2">

            <strong>Email</strong>

            <p className="mt-1">
              {invoice.email || "-"}
            </p>

          </div>

        </div>

      </div>
            {/* ==========================
          Invoice Items
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 text-xl font-bold">
          Invoice Items
        </h3>

        <table className="w-full border border-black border-collapse">

          <thead>

            <tr className="bg-gray-200">

              <th className="border border-black p-3 text-left">
                #
              </th>

              <th className="border border-black p-3 text-left">
                Item Description
              </th>

              <th className="border border-black p-3 text-center">
                Qty
              </th>

              <th className="border border-black p-3 text-right">
                Price
              </th>

              <th className="border border-black p-3 text-right">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map((item, index) => (

              <tr key={item.id}>

                <td className="border border-black p-3">
                  {index + 1}
                </td>

                <td className="border border-black p-3">
                  {item.name}
                </td>

                <td className="border border-black p-3 text-center">
                  {item.qty}
                </td>

                <td className="border border-black p-3 text-right">
                  ₹{item.price.toLocaleString("en-IN")}
                </td>

                <td className="border border-black p-3 text-right font-semibold">
                  ₹{item.total.toLocaleString("en-IN")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {/* ==========================
          Invoice Summary
      ========================== */}

      <div className="mb-8 flex justify-end">

        <div className="w-full max-w-md">

          <table className="w-full border border-black border-collapse">

            <tbody>

              <tr>

                <td className="border border-black p-3 font-medium">
                  Sub Total
                </td>

                <td className="border border-black p-3 text-right">
                  ₹{invoice.subTotal.toLocaleString("en-IN")}
                </td>

              </tr>

              <tr>

                <td className="border border-black p-3 font-medium">
                  Discount
                </td>

                <td className="border border-black p-3 text-right">
                  ₹{invoice.discount.toLocaleString("en-IN")}
                </td>

              </tr>

              <tr>

                <td className="border border-black p-3 font-medium">
                  GST ({invoice.gst}%)
                </td>

                <td className="border border-black p-3 text-right">
                  ₹{(
                    (invoice.subTotal * invoice.gst) / 100
                  ).toLocaleString("en-IN")}
                </td>

              </tr>

              <tr className="bg-gray-200">

                <td className="border border-black p-3 text-lg font-bold">
                  Grand Total
                </td>

                <td className="border border-black p-3 text-right text-lg font-bold">
                  ₹{invoice.grandTotal.toLocaleString("en-IN")}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================
          Payment Details
      ========================== */}

      <div className="mb-8 rounded border border-black p-5">

        <h3 className="mb-4 text-xl font-bold">
          Payment Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <strong>Payment Method</strong>

            <p className="mt-1">
              {invoice.paymentMethod}
            </p>

          </div>

          <div>

            <strong>Invoice Date</strong>

            <p className="mt-1">
              {new Date(
                invoice.createdAt
              ).toLocaleDateString("en-IN")}
            </p>

          </div>

          <div className="col-span-2">

            <strong>Remarks</strong>

            <p className="mt-1">
              {invoice.remarks || "-"}
            </p>

          </div>

        </div>

      </div>
            {/* ==========================
          Terms & Conditions
      ========================== */}

      <div className="mb-10">

        <h3 className="mb-4 text-xl font-bold">
          Terms & Conditions
        </h3>

        <ul className="list-disc space-y-2 pl-6 text-sm">

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

      {/* ==========================
          Signatures
      ========================== */}

      <div className="mt-16 grid grid-cols-2 gap-20">

        <div className="text-center">

          <div className="h-16"></div>

          <div className="border-t border-black pt-2 font-semibold">
            Customer Signature
          </div>

        </div>

        <div className="text-center">

          <div className="h-16"></div>

          <div className="border-t border-black pt-2 font-semibold">
            Authorized Signature
          </div>

        </div>

      </div>

      {/* ==========================
          Footer
      ========================== */}

      <div className="mt-12 border-t-2 border-black pt-6 text-center">

        <h2 className="text-2xl font-bold">
          Thank You for Choosing Lappy Care!
        </h2>

        <p className="mt-2 text-gray-700">
          We appreciate your business and look
          forward to serving you again.
        </p>

        <div className="mt-6 space-y-1 text-sm text-gray-600">

          <p>
            📍 Lappy Care, Wakad, Pune
          </p>

          <p>
            📞 +91 9595057006
          </p>

          <p>
            ✉️ support@lappycarepune.in
          </p>

          <p>
            🌐 www.lappycarepune.in
          </p>

        </div>

      </div>

    </div>
  );
}