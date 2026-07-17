"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function TrackingInfo({
  repair,
}: Props) {

  return (

    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* ==========================
          Section Title
      ========================== */}

      <h2 className="mb-6 text-2xl font-bold text-gray-900">

        Repair Information

      </h2>

      {/* ==========================
          Information Grid
      ========================== */}

      <div className="grid gap-6 md:grid-cols-2">

        <InfoCard
          title="Customer Name"
          value={repair.customer.name}
        />

        <InfoCard
          title="Mobile Number"
          value={repair.customer.mobile}
        />

        <InfoCard
          title="Device"
          value={`${repair.device.brand} ${repair.device.model}`}
        />

        <InfoCard
          title="Device Type"
          value={repair.device.type}
        />

        <InfoCard
          title="Serial Number"
          value={repair.device.serialNo}
        />

        <InfoCard
          title="Expected Delivery"
          value={
            repair.estimate.expectedDelivery || "-"
          }
        />

      </div>

      {/* ==========================
          Complaint
      ========================== */}

      <div className="mt-8">

        <h3 className="mb-3 text-lg font-bold text-gray-900">

          Customer Complaint

        </h3>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 leading-7">

          {repair.problem.complaint || "-"}

        </div>

      </div>

    </div>

  );

}

// ==========================================
// Info Card
// ==========================================

type CardProps = {
  title: string;
  value?: string;
};

function InfoCard({
  title,
  value,
}: CardProps) {

  return (

    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

      <p className="text-sm font-medium text-gray-500">

        {title}

      </p>

      <p className="mt-2 text-lg font-semibold text-gray-900 break-words">

        {value || "-"}

      </p>

    </div>

  );

}