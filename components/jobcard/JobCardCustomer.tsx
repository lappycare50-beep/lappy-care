"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardCustomer({
  repair,
}: Props) {

  const customer = repair.customer;

  return (

    <div className="mb-8">

      {/* ==========================
          Section Title
      ========================== */}

      <div className="mb-4 border-b-2 border-black pb-2">

        <h2 className="text-xl font-bold uppercase tracking-wide">

          Customer Details

        </h2>

      </div>

      {/* ==========================
          Customer Info
      ========================== */}

      <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-300 p-4">

        <InfoRow
          label="Customer Name"
          value={customer.name}
        />

        <InfoRow
          label="Mobile"
          value={customer.mobile}
        />

        <InfoRow
          label="Alternate Mobile"
          value={customer.alternateMobile}
        />

        <InfoRow
          label="Email"
          value={customer.email}
        />

      </div>

      {/* ==========================
          Address
      ========================== */}

      <div className="mt-5 rounded-lg border border-gray-300 bg-gray-50 p-4">

        <p className="mb-2 font-bold">

          Address

        </p>

        <p className="leading-7">

          {customer.address || "-"}

          {customer.city
            ? `, ${customer.city}`
            : ""}

          {customer.state
            ? `, ${customer.state}`
            : ""}

          {customer.pincode
            ? ` - ${customer.pincode}`
            : ""}

        </p>

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