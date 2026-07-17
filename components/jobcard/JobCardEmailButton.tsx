"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardEmailButton({
  repair,
}: Props) {

  function sendEmail() {

    const subject =
      encodeURIComponent(
        `Job Card - ${repair.repairId}`
      );

    const body =
      encodeURIComponent(
`Dear ${repair.customer.name},

Your Job Card has been generated successfully.

Repair ID : ${repair.repairId}

Device :
${repair.device.brand} ${repair.device.model}

Status :
${repair.status}

Thank you for choosing Lappy Care.

Regards,
Lappy Care
+91 9595057006`
      );

    window.location.href =
      `mailto:${repair.customer.email || ""}?subject=${subject}&body=${body}`;

  }

  return (

    <button
      type="button"
      onClick={sendEmail}
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
    >

      📧 Email

    </button>

  );

}