"use client";

import { Repair } from "@/types/repair";

import TrackingStatus from "./TrackingStatus";

type Props = {
  repair: Repair;
};

export default function TrackingHeader({
  repair,
}: Props) {

  return (

    <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B0B0B] via-[#1A1A1A] to-[#FACC15] shadow-xl">

      <div className="flex flex-col justify-between gap-8 p-8 md:flex-row md:items-center">

        {/* ==========================
            Left Section
        ========================== */}

        <div>

          <p className="text-sm uppercase tracking-[4px] text-yellow-300">

            Lappy Care

          </p>

          <h1 className="mt-2 text-4xl font-black text-white">

            Laptop Repair

          </h1>

          <p className="mt-2 text-gray-300">

            Customer Tracking Portal

          </p>

          <div className="mt-6">

            <p className="text-sm text-gray-400">

              Repair ID

            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-wide text-yellow-300">

              {repair.repairId}

            </h2>

          </div>

        </div>

        {/* ==========================
            Right Section
        ========================== */}

        <div className="flex flex-col items-start gap-3 md:items-end">

          <p className="text-sm uppercase tracking-widest text-gray-300">

            Current Status

          </p>

          <TrackingStatus
            status={repair.status}
          />

          <div className="mt-2 rounded-lg border border-yellow-400/30 bg-white/10 px-5 py-3 backdrop-blur-sm">

            <p className="text-sm text-gray-300">

              Customer

            </p>

            <p className="text-lg font-semibold text-white">

              {repair.customer.name}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}