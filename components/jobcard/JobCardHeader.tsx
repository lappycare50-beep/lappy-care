"use client";

import { Repair } from "@/types/repair";
import JobCardQRCode from "./JobCardQRCode";

type Props = {
  repair: Repair;
};

export default function JobCardHeader({
  repair,
}: Props) {
  return (
    <div className="mb-8 border-b-2 border-gray-300 pb-8">

      {/* Top Header */}

      <div className="flex items-start justify-between">

        {/* Company */}

        <div>

          <h1 className="text-4xl font-extrabold tracking-wide">
            LAPPY CARE
          </h1>

          <p className="mt-2 text-lg font-medium">
            Laptop Repair & Service
          </p>

          <p className="text-gray-600">
            Wakad, Pune
          </p>

          <p className="text-gray-600">
            📞 +91 9595057006
          </p>

          <p className="text-gray-600">
            ✉ support@lappycare.in
          </p>

        </div>

        {/* QR */}

        <JobCardQRCode
          repairId={repair.repairId}
        />

      </div>

      {/* Title */}

      <div className="mt-8 rounded-lg bg-black py-3">

        <h2 className="text-center text-2xl font-bold tracking-widest text-white">
          JOB CARD
        </h2>

      </div>

      {/* Details */}

      <div className="mt-8 grid grid-cols-2 gap-6">

        <InfoRow
          label="Job Card No"
          value={repair.repairId}
        />

        <InfoRow
          label="Status"
          value={repair.status}
        />

        <InfoRow
          label="Created Date"
          value={repair.createdAt}
        />

        <InfoRow
          label="Technician"
          value={
            repair.estimate?.technician ??
            "-"
          }
        />

      </div>

    </div>
  );
}

type RowProps = {
  label: string;
  value?: string;
};

function InfoRow({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex">

      <div className="w-40 font-semibold">
        {label}
      </div>

      <div className="font-medium">
        : {value || "-"}
      </div>

    </div>
  );
}