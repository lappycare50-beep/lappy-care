"use client";

import { useState } from "react";

import { BookingRequest } from "@/types/bookingRequest";

import ConvertToRepairModal from "@/components/bookingRequests/ConvertToRepairModal";

import {
  Phone,
  Mail,
  Laptop,
  AlertTriangle,
  Truck,
  Calendar,
  User,
} from "lucide-react";

type Props = {
  request: BookingRequest;
};

export default function BookingRequestProfile({
  request,
}: Props) {

  // ==========================================
  // State
  // ==========================================

  const [
    openConvertModal,
    setOpenConvertModal,
  ] = useState(false);

  return (

    <div className="space-y-6">
              {/* ==========================================
          Quick Actions
      ========================================== */}

      <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">

          Quick Actions

        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

          {/* Call */}

          <a
            href={`tel:${request.mobile}`}
            className="rounded-xl bg-green-500 px-5 py-4 text-center font-bold text-white transition hover:bg-green-600"
          >

            📞 Call Customer

          </a>

          {/* WhatsApp */}

          <a
            href={`https://wa.me/91${request.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-500 px-5 py-4 text-center font-bold text-white transition hover:bg-emerald-600"
          >

            💬 WhatsApp

          </a>

          {/* Approve */}

          <button
            type="button"
            className="rounded-xl bg-blue-500 px-5 py-4 font-bold text-white transition hover:bg-blue-600"
          >

            ✅ Approve

          </button>

          {/* Reject */}

          <button
            type="button"
            className="rounded-xl bg-red-500 px-5 py-4 font-bold text-white transition hover:bg-red-600"
          >

            ❌ Reject

          </button>

          {/* Convert */}

          <button
            type="button"
            onClick={() =>
              setOpenConvertModal(true)
            }
            className="rounded-xl bg-yellow-400 px-5 py-4 font-bold text-black transition hover:bg-yellow-300"
          >

            🔄 Convert To Repair

          </button>

        </div>

      </div>
            {/* ==========================================
          Convert To Repair Modal
      ========================================== */}

      <ConvertToRepairModal
        open={openConvertModal}
        request={request}
        onClose={() =>
          setOpenConvertModal(false)
        }
        onSuccess={(repairId) => {

          setOpenConvertModal(false);

          alert(
            `Repair Created Successfully.\nRepair ID: ${repairId}`
          );

        }}
      />

    </div>

  );

}