"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardWhatsAppButton({
  repair,
}: Props) {

  function sendWhatsApp() {

    const mobile =
      repair.customer.mobile.replace(/\D/g, "");

    const message =
encodeURIComponent(
`Hello ${repair.customer.name},

Your Laptop Repair Job Card has been created.

Repair ID : ${repair.repairId}

Device :
${repair.device.brand} ${repair.device.model}

Current Status :
${repair.status}

Thank you for choosing Lappy Care.

📞 9595057006`
);

    window.open(
      `https://wa.me/91${mobile}?text=${message}`,
      "_blank"
    );

  }

  return (

    <button
      type="button"
      onClick={sendWhatsApp}
      className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500"
    >

      💬 WhatsApp

    </button>

  );

}