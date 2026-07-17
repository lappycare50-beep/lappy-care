"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardDevice({
  repair,
}: Props) {

  const device = repair.device;

  return (

    <div className="mb-8">

      {/* ==========================
          Section Title
      ========================== */}

      <div className="mb-4 border-b-2 border-black pb-2">

        <h2 className="text-xl font-bold uppercase tracking-wide">

          Device Details

        </h2>

      </div>

      {/* ==========================
          Device Information
      ========================== */}

      <div className="grid grid-cols-2 gap-x-10 gap-y-3">

        <InfoRow
          label="Device Type"
          value={device.type}
        />

        <InfoRow
          label="Brand"
          value={device.brand}
        />

        <InfoRow
          label="Model"
          value={device.model}
        />

        <InfoRow
          label="Serial Number"
          value={device.serialNo}
        />

        <InfoRow
          label="Processor"
          value={device.processor}
        />

        <InfoRow
          label="RAM"
          value={device.ram}
        />

        <InfoRow
          label="Storage"
          value={device.storage}
        />

        <InfoRow
          label="Color"
          value={device.color}
        />

      </div>

    </div>

  );

}

// ==========================================
// Info Row
// ==========================================

type RowProps = {
  label: string;
  value?: string | number;
};

function InfoRow({
  label,
  value,
}: RowProps) {

  return (

    <div className="flex border-b border-gray-300 pb-2">

      <div className="w-44 font-bold">

        {label}

      </div>

      <div className="flex-1 break-all">

        {value || "-"}

      </div>

    </div>

  );

}