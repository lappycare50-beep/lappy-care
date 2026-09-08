"use client";

import { useMemo } from "react";
import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

/* =========================================================
   HELPERS
========================================================= */

function safe(value: unknown): string {
  if (value === null || value === undefined) {
    return "-";
  }

  const text = String(value).trim();

  return text || "-";
}

function formatDate(value: unknown): string {
  if (!value) return "-";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return safe(value);
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function money(value: unknown): string {
  const amount = Number(value || 0);

  return amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

function getAccessories(repair: Repair): string {
  const accessories = repair.accessories;

  if (!accessories) {
    return "-";
  }

  const result: string[] = [];

  if (accessories.items?.length) {
    result.push(
      ...accessories.items.map((item) => String(item))
    );
  }

  if ("charger" in accessories && accessories.charger) {
    result.push("Charger");
  }

  if ("bag" in accessories && accessories.bag) {
    result.push("Laptop Bag");
  }

  if ("mouse" in accessories && accessories.mouse) {
    result.push("Mouse");
  }

  if ("adapter" in accessories && accessories.adapter) {
    result.push("Adapter");
  }

  if ("hdd" in accessories && accessories.hdd) {
    result.push("HDD");
  }

  if ("ssd" in accessories && accessories.ssd) {
    result.push("SSD");
  }

  if ("ram" in accessories && accessories.ram) {
    result.push("RAM");
  }

  if ("pendrive" in accessories && accessories.pendrive) {
    result.push("Pendrive");
  }

  if (
    "powerCable" in accessories &&
    accessories.powerCable
  ) {
    result.push("Power Cable");
  }

  if (accessories.other) {
    result.push(String(accessories.other));
  }

  return result.length
    ? Array.from(new Set(result)).join(", ")
    : "-";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function JobCardPreview({
  repair,
}: Props) {
  const accessories = useMemo(
    () => getAccessories(repair),
    [repair]
  );

  const customer = repair.customer;
  const device = repair.device;
  const problem = repair.problem;
  const estimate = repair.estimate;

  /* =======================================================
     PRINT
  ======================================================= */

  function handlePrint() {
    const element = document.getElementById(
      "job-card-print"
    );

    if (!element) {
      window.alert(
        "Job Card is not ready for printing."
      );
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=1200"
    );

    if (!printWindow) {
      window.alert(
        "Please allow pop-ups to print the Job Card."
      );
      return;
    }

    const html = element.outerHTML;

    printWindow.document.open();

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <title>
    Job Card - ${safe(repair.repairId)}
  </title>

  <style>

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #000000;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    }

    body {
      width: 100%;
    }

    .print-page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 8mm;
      background: #ffffff;
      color: #000000;
    }

    .print-content {
      width: 100%;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      border-bottom: 2px solid #000;
      padding-bottom: 7px;
    }

    .brand {
      font-size: 23px;
      font-weight: 900;
      line-height: 1;
    }

    .sub-brand {
      margin-top: 3px;
      font-size: 9px;
      color: #444;
    }

    .contact {
      margin-top: 2px;
      font-size: 8px;
      line-height: 1.35;
    }

    .job-info {
      min-width: 190px;
      text-align: right;
    }

    .job-title {
      font-size: 18px;
      font-weight: 900;
      line-height: 1;
    }

    .job-row {
      margin-top: 3px;
      font-size: 8.5px;
      line-height: 1.25;
    }

    .section {
      margin-top: 5px;
    }

    .section-title {
      margin-bottom: 3px;
      padding-bottom: 2px;
      border-bottom: 1px solid #000;
      font-size: 8.5px;
      font-weight: 900;
      text-transform: uppercase;
    }

    .box {
      border: 1px solid #222;
      border-radius: 3px;
      padding: 5px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 15px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px 12px;
    }

    .field-label {
      font-size: 7px;
      font-weight: 700;
      color: #555;
      text-transform: uppercase;
    }

    .field-value {
      margin-top: 1px;
      font-size: 8.5px;
      line-height: 1.25;
      word-break: break-word;
    }

    table {
      page-break-inside: avoid;
    }

    .info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8px;
    }

    .info-table th,
    .info-table td {
      border: 1px solid #222;
      padding: 4px;
      text-align: left;
      vertical-align: top;
    }

    .info-table th {
      background: #eeeeee;
      font-weight: 800;
    }

    .condition-box {
      min-height: 30px;
      font-size: 8.5px;
      line-height: 1.3;
      white-space: pre-wrap;
    }

    .summary-table {
      width: 250px;
      margin-left: auto;
      border-collapse: collapse;
      font-size: 8px;
    }

    .summary-table td {
      border: 1px solid #222;
      padding: 4px;
    }

    .summary-table td:last-child {
      text-align: right;
    }

    .grand-total td {
      background: #eeeeee;
      font-size: 9px;
      font-weight: 900;
    }

    .terms {
      margin-top: 5px;
      font-size: 7px;
      line-height: 1.25;
    }

    .terms ol {
      margin: 2px 0 0 14px;
      padding: 0;
    }

    .declaration {
      margin-top: 5px;
      border: 1px solid #222;
      border-radius: 3px;
      padding: 5px;
      font-size: 7.5px;
      line-height: 1.3;
    }

    .signatures {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin-top: 14px;
    }

    .signature {
      padding-top: 13px;
      border-top: 1px solid #000;
      text-align: center;
      font-size: 7.5px;
      font-weight: 700;
    }

    .footer {
      margin-top: 6px;
      padding-top: 4px;
      border-top: 1px solid #000;
      text-align: center;
      font-size: 7px;
      color: #444;
    }

    .footer strong {
      color: #000;
      font-size: 8px;
    }

    @page {
      size: A4;
      margin: 0;
    }

    @media print {

      html,
      body {
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        padding: 0;
        background: #fff;
      }

      .print-page {
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        padding: 8mm;
      }

    }

  </style>
</head>

<body>

  <div class="print-page">

    ${html}

  </div>

  <script>

    window.onload = function () {

      setTimeout(function () {

        window.focus();
        window.print();

      }, 400);

    };

    window.onafterprint = function () {

      setTimeout(function () {

        window.close();

      }, 300);

    };

  </script>

</body>
</html>
    `);

    printWindow.document.close();
  }

  /* =======================================================
     WHATSAPP
  ======================================================= */
function handleWhatsApp() {
  const mobile = safe(customer.mobile);

  if (mobile === "-") {
    window.alert("Customer mobile number is missing.");
    return;
  }

  const cleanMobile = mobile.replace(/\D/g, "");

  if (!cleanMobile) {
    window.alert("Invalid customer mobile number.");
    return;
  }

  const repairId = safe(repair.repairId);

  const trackingUrl =
    `https://lappycarepune.in/track/${encodeURIComponent(repairId)}`;

  const message = `Hello ${safe(customer.name)},

Thank you for choosing Lappy Care! 💻

This is an update regarding your laptop service request.

📋 Job Card No: ${repairId}
💻 Device: ${safe(device.brand)} ${safe(device.model)}
📌 Current Status: ${safe(repair.status)}

🔗 Track Your Repair:
${trackingUrl}

You can use the above link to check your repair status and service updates.

If you have any questions, please feel free to contact us.

Regards,
Lappy Care
Laptop Repair & Service
📞 +91 9595057006
📧 support@lappycarepune.in

Thank you for choosing Lappy Care. 🙏`;

  const whatsappUrl =
    `https://wa.me/91${cleanMobile}?text=${encodeURIComponent(message)}`;

  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );
}

  /* =======================================================
     EMAIL
  ======================================================= */

  function handleEmail() {
    const email = safe(customer.email);

    if (email === "-") {
      window.alert(
        "Customer email address is missing."
      );
      return;
    }

    const subject = encodeURIComponent(
      `Lappy Care Job Card - ${safe(
        repair.repairId
      )}`
    );

    const body = encodeURIComponent(
      `Hello ${safe(customer.name)},

Your Lappy Care Job Card:

Job Card No: ${safe(repair.repairId)}
Device: ${safe(device.brand)} ${safe(
        device.model
      )}
Status: ${safe(repair.status)}

Thank you for choosing Lappy Care.`
    );

    window.location.href =
      `mailto:${email}?subject=${subject}&body=${body}`;
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="w-full">

      {/* ACTIONS */}

      <div className="mb-5 flex flex-wrap items-center justify-center gap-3 print:hidden">

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
        >
          <span>🖨️</span>
          Print / Save as PDF
        </button>

        <button
          type="button"
          onClick={handleEmail}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500"
        >
          <span>✉️</span>
          Email
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-black text-white transition hover:bg-green-500"
        >
          <span>💬</span>
          WhatsApp
        </button>

      </div>

      {/* JOB CARD */}

      <div
        id="job-card-print"
        className="mx-auto w-full max-w-[794px] bg-white p-6 text-black shadow-2xl print:max-w-none print:shadow-none"
      >

        {/* HEADER */}

        <div className="border-b-2 border-black pb-2">

          <div className="flex items-start justify-between gap-6">

            <div className="min-w-0">

              <h1 className="text-[25px] font-black leading-none">
                LAPPY CARE
              </h1>

              <p className="mt-1 text-[10px] font-semibold text-gray-700">
                Laptop Repair &amp; Service
              </p>

              <p className="mt-1 text-[9px]">
                Wakad, Pune
              </p>

              <p className="text-[9px]">
                Mobile : +91 9595057006
              </p>

              <p className="text-[9px]">
                Email : support@lappycare.in
              </p>

            </div>

            <div className="min-w-[190px] text-right">

              <h2 className="text-[19px] font-black">
                JOB CARD
              </h2>

              <p className="mt-1 text-[9px]">
                <strong>Job Card No:</strong>{" "}
                {safe(repair.repairId)}
              </p>

              <p className="text-[9px]">
                <strong>Date:</strong>{" "}
                {formatDate(repair.createdAt)}
              </p>

              <p className="text-[9px]">
                <strong>Status:</strong>{" "}
                {safe(repair.status)}
              </p>

            </div>

          </div>

        </div>

        {/* CUSTOMER */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Customer Details
          </h3>

          <div className="rounded border border-black p-2">

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[9px]">

              <Field
                label="Customer Name"
                value={customer.name}
              />

              <Field
                label="Mobile"
                value={customer.mobile}
              />

              <Field
                label="Alternate Mobile"
                value={customer.alternateMobile}
              />

              <Field
                label="Email"
                value={customer.email}
              />

              <div className="col-span-2">

                <Field
                  label="Address"
                  value={[
                    customer.address,
                    customer.city,
                    customer.state,
                    customer.pincode
                      ? `- ${customer.pincode}`
                      : "",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />

              </div>

            </div>

          </div>

        </div>

        {/* DEVICE */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Device Details
          </h3>

          <table className="w-full border-collapse border border-black text-[9px]">

            <tbody>

              <tr>

                <td className="w-1/6 border border-black bg-gray-100 px-2 py-1 font-bold">
                  Type
                </td>

                <td className="w-1/3 border border-black px-2 py-1">
                  {safe(device.type)}
                </td>

                <td className="w-1/6 border border-black bg-gray-100 px-2 py-1 font-bold">
                  Brand
                </td>

                <td className="w-1/3 border border-black px-2 py-1">
                  {safe(device.brand)}
                </td>

              </tr>

              <tr>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Model
                </td>

                <td className="border border-black px-2 py-1">
                  {safe(device.model)}
                </td>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Serial No
                </td>

                <td className="border border-black px-2 py-1">
                  {safe(device.serialNo)}
                </td>

              </tr>

              <tr>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Processor
                </td>

                <td className="border border-black px-2 py-1">
                  {safe(device.processor)}
                </td>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  RAM
                </td>

                <td className="border border-black px-2 py-1">
                  {safe(device.ram)}
                </td>

              </tr>

              <tr>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Storage
                </td>

                <td className="border border-black px-2 py-1">
                  {safe(device.storage)}
                </td>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Color
                </td>

                <td className="border border-black px-2 py-1">
                  {safe(device.color)}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* ACCESSORIES */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Accessories Received
          </h3>

          <div className="rounded border border-black p-2 text-[9px]">
            {accessories}
          </div>

        </div>

        {/* PROBLEM */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Problem / Complaint
          </h3>

          <div className="rounded border border-black p-2 text-[9px]">

            <strong>Customer Complaint:</strong>

            <div className="mt-1 whitespace-pre-wrap">
              {safe(problem?.complaint)}
            </div>

            {problem?.diagnosis && (
              <div className="mt-2">

                <strong>Diagnosis:</strong>

                <div className="mt-1 whitespace-pre-wrap">
                  {safe(problem.diagnosis)}
                </div>

              </div>
            )}

          </div>

        </div>

        {/* PHYSICAL CONDITION */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Physical Condition
          </h3>

          <div className="min-h-[42px] rounded border border-black p-2 text-[9px]">
            {safe(problem?.physicalCondition)}
          </div>

        </div>

        {/* SERVICE ESTIMATE */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Service Estimate
          </h3>

          <table className="w-full border-collapse border border-black text-[9px]">

            <tbody>

              <tr>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Labour Charge
                </td>

                <td className="border border-black px-2 py-1 text-right">
                  ₹{money(estimate?.labourCharge)}
                </td>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Parts Charge
                </td>

                <td className="border border-black px-2 py-1 text-right">
                  ₹{money(estimate?.partsCharge)}
                </td>

              </tr>

              <tr>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Discount
                </td>

                <td className="border border-black px-2 py-1 text-right">
                  ₹{money(estimate?.discount)}
                </td>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Total
                </td>

                <td className="border border-black px-2 py-1 text-right font-black">
                  ₹{money(estimate?.totalAmount)}
                </td>

              </tr>

              <tr>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Advance Paid
                </td>

                <td className="border border-black px-2 py-1 text-right">
                  ₹{money(estimate?.advancePaid)}
                </td>

                <td className="border border-black bg-gray-100 px-2 py-1 font-bold">
                  Balance
                </td>

                <td className="border border-black px-2 py-1 text-right font-black">
                  ₹{money(estimate?.balanceAmount)}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* SERVICE INFORMATION */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Service Information
          </h3>

          <div className="rounded border border-black p-2">

            <div className="grid grid-cols-3 gap-4 text-[9px]">

              <Field
                label="Technician"
                value={estimate?.technician}
              />

              <Field
                label="Priority"
                value={estimate?.priority}
              />

              <Field
                label="Warranty"
                value={repair.warranty}
              />

              <Field
                label="Payment Status"
                value={repair.paymentStatus}
              />

              <Field
                label="Expected Delivery"
                value={estimate?.expectedDelivery}
              />

              <Field
                label="Delivered At"
                value={repair.deliveredAt}
              />

            </div>

          </div>

        </div>

        {/* REMARKS */}

        <div className="mt-2">

          <h3 className="mb-1 border-b border-black pb-1 text-[10px] font-black uppercase">
            Remarks
          </h3>

          <div className="min-h-[35px] whitespace-pre-wrap rounded border border-black p-2 text-[9px]">
            {safe(repair.remarks)}
          </div>

        </div>

        {/* TERMS */}

        <div className="mt-2">

          <h3 className="mb-1 text-[9px] font-black uppercase">
            Terms &amp; Conditions
          </h3>

          <ol className="list-decimal pl-4 text-[7.5px] leading-tight">

            <li>
              Customer is responsible for taking a backup
              of all personal data before submitting the device.
            </li>

            <li>
              Lappy Care is not responsible for any loss of
              data during diagnosis or repair.
            </li>

            <li>
              Repair charges may change after detailed
              diagnosis. Customer approval will be taken
              before additional work.
            </li>

            <li>
              Warranty is applicable only on repaired/replaced
              parts and does not cover physical or liquid damage.
            </li>

            <li>
              Warranty becomes void if the device is opened
              or repaired by any third party.
            </li>

            <li>
              Devices not collected within 90 days may attract
              storage charges or may be disposed of as per
              company policy.
            </li>

            <li>
              Accessories not mentioned on this Job Card will
              not be the responsibility of Lappy Care.
            </li>

          </ol>

        </div>

        {/* DECLARATION */}

        <div className="mt-2 rounded border border-black p-2 text-[8px]">

          <strong>Customer Declaration:</strong>

          <span className="ml-1">
            I hereby confirm that the above device and
            accessories have been handed over to Lappy Care
            for diagnosis and repair. I have verified all
            information mentioned in this Job Card and agree
            to the above Terms &amp; Conditions.
          </span>

        </div>

        {/* SIGNATURES */}

        <div className="mt-8 grid grid-cols-3 gap-8">

          <div className="border-t border-black pt-1 text-center text-[8px] font-semibold">
            Customer Signature
          </div>

          <div className="border-t border-black pt-1 text-center text-[8px] font-semibold">
            Technician Signature
          </div>

          <div className="border-t border-black pt-1 text-center text-[8px] font-semibold">
            Delivery Signature
          </div>

        </div>

        {/* FOOTER */}

        <div className="mt-3 border-t border-black pt-2 text-center">

          <p className="text-[10px] font-black">
            Thank You for Choosing Lappy Care!
          </p>

          <p className="mt-0.5 text-[7px] text-gray-600">
            Lappy Care, Wakad, Pune
            {" | "}
            +91 9595057006
            {" | "}
            support@lappycare.in
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
}: {
  label: string;
  value: unknown;
}) {
  return (
    <div>

      <div className="text-[8px] font-bold uppercase text-gray-500">
        {label}
      </div>

      <div className="mt-0.5 break-words text-[9px] font-semibold text-black">
        {safe(value)}
      </div>

    </div>
  );
}