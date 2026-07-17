"use client";

import { useRef } from "react";

import { Repair } from "@/types/repair";
import { COMPANY } from "@/lib/config/company";

import JobCard from "./JobCard";
import JobCardPrintButton from "./JobCardPrintButton";
import PrintStyles from "./PrintStyles";

type Props = {
  repair: Repair;
};

export default function JobCardPreview({
  repair,
}: Props) {

  const contentRef =
    useRef<HTMLDivElement>(null);

  // ==========================================
  // Common
  // ==========================================

  const trackingUrl =
    `${COMPANY.website}/track/${repair.repairId}`;

  // ==========================================
  // Email
  // ==========================================

  function sendEmail() {

    const email =
      repair.customer.email?.trim() ?? "";

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      alert(
        "Customer email address is invalid."
      );

      return;

    }

    const subject =
      `Laptop Repair Job Card - ${repair.repairId}`;

    const body = `Hello ${repair.customer.name},

Your Laptop Repair Job Card has been created successfully.

━━━━━━━━━━━━━━━━━━

📄 Job Card No : ${repair.repairId}

💻 Device : ${repair.device.brand} ${repair.device.model}

🔧 Complaint : ${repair.problem.complaint}

📌 Status : ${repair.status}

👨‍🔧 Technician : ${repair.estimate.technician || "-"}

📅 Expected Delivery : ${repair.estimate.expectedDelivery || "-"}

━━━━━━━━━━━━━━━━━━

Track Your Repair

${trackingUrl}

Need help?

📞 ${COMPANY.phone}

Thank you for choosing
${COMPANY.name}

Regards,
${COMPANY.name}
`;

    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  }

  // ==========================================
  // WhatsApp
  // ==========================================

  function sendWhatsApp() {

    const mobile =
      repair.customer.mobile
        ?.replace(/\D/g, "") ?? "";

    if (
      mobile.length !== 10 &&
      mobile.length !== 12
    ) {

      alert(
        "Customer mobile number is invalid."
      );

      return;

    }

    const whatsapp =
      mobile.startsWith("91")
        ? mobile
        : `91${mobile}`;

    const message = `Hello ${repair.customer.name},

👋 Greetings from ${COMPANY.name}!

Your Laptop Repair Job Card has been created successfully.

━━━━━━━━━━━━━━━━━━

📄 Job Card No : ${repair.repairId}

💻 Device : ${repair.device.brand} ${repair.device.model}

🔧 Complaint : ${repair.problem.complaint}

📌 Status : ${repair.status}

👨‍🔧 Technician : ${repair.estimate.technician || "-"}

📅 Expected Delivery : ${repair.estimate.expectedDelivery || "-"}

━━━━━━━━━━━━━━━━━━

Track Repair

${trackingUrl}

Need Help?

📞 ${COMPANY.phone}

Thank you for choosing
${COMPANY.name}. 🙏`;

    const url =
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(
      url,
      "_blank"
    );

  }

  return (
        <div className="min-h-screen bg-gray-200 p-8">

      {/* ==========================================
          Print Styles
      ========================================== */}

      <PrintStyles />

      {/* ==========================================
          Action Buttons
      ========================================== */}

      <div className="mb-8 flex flex-wrap justify-center gap-4">

        <JobCardPrintButton
          contentRef={contentRef}
        />

        {/* ==========================================
            Email
        ========================================== */}

        <button
          type="button"
          onClick={sendEmail}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          📧 Email
        </button>

        {/* ==========================================
            WhatsApp
        ========================================== */}

        <button
          type="button"
          onClick={sendWhatsApp}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          💬 WhatsApp
        </button>

      </div>

      {/* ==========================================
          Printable Area
      ========================================== */}

      <div
        ref={contentRef}
        className="print-area mx-auto w-[210mm] min-h-[297mm] overflow-hidden rounded-xl bg-white shadow-2xl print:w-full print:min-h-0 print:rounded-none print:shadow-none"
      >

        <JobCard
          repair={repair}
        />

      </div>

    </div>

  );

}