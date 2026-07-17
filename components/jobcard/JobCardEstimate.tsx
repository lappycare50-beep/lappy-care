"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardEstimate({
  repair,
}: Props) {

  const estimate = repair.estimate;

  const labour =
    estimate.labourCharge || 0;

  const parts =
    estimate.partsCharge || 0;

  const discount =
    estimate.discount || 0;

  const total =
    estimate.totalAmount || 0;

  const advance =
    estimate.advancePaid || 0;

  const balance =
    estimate.balanceAmount || 0;

  return (

    <div className="mb-8">

      {/* ==========================
          Section Title
      ========================== */}

      <div className="mb-4 border-b-2 border-black pb-2">

        <h2 className="text-xl font-bold uppercase tracking-wide">

          Estimate & Payment

        </h2>

      </div>

      {/* ==========================
          Estimate Table
      ========================== */}

      <table className="w-full border border-black">

        <thead>

          <tr className="bg-gray-100">

            <th className="border border-black px-4 py-3 text-left">

              Description

            </th>

            <th className="border border-black px-4 py-3 text-right">

              Amount (₹)

            </th>

          </tr>

        </thead>

        <tbody>

          <Row
            title="Labour Charge"
            amount={labour}
          />

          <Row
            title="Parts Charge"
            amount={parts}
          />

          <Row
            title="Discount"
            amount={discount}
            negative
          />

          <tr className="bg-gray-50 font-bold">

            <td className="border border-black px-4 py-3">

              Total Estimate

            </td>

            <td className="border border-black px-4 py-3 text-right">

              ₹{total.toLocaleString("en-IN")}

            </td>

          </tr>

          <Row
            title="Advance Paid"
            amount={advance}
          />

          <tr className="bg-yellow-100 font-bold">

            <td className="border border-black px-4 py-3">

              Balance Amount

            </td>

            <td className="border border-black px-4 py-3 text-right">

              ₹{balance.toLocaleString("en-IN")}

            </td>

          </tr>

        </tbody>

      </table>

      {/* ==========================
          Additional Details
      ========================== */}

      <div className="mt-6 grid grid-cols-2 gap-6">

        <InfoRow
          label="Payment Status"
          value={repair.paymentStatus}
        />

        <InfoRow
          label="Warranty"
          value={repair.warranty}
        />

        <InfoRow
          label="Priority"
          value={estimate.priority}
        />

        <InfoRow
          label="Expected Delivery"
          value={
            estimate.expectedDelivery || "-"
          }
        />

      </div>

    </div>

  );

}

// ==========================================
// Table Row
// ==========================================

type RowProps = {
  title: string;
  amount: number;
  negative?: boolean;
};

function Row({
  title,
  amount,
  negative = false,
}: RowProps) {

  return (

    <tr>

      <td className="border border-black px-4 py-3">

        {title}

      </td>

      <td className="border border-black px-4 py-3 text-right">

        {negative ? "-" : ""}
        ₹{amount.toLocaleString("en-IN")}

      </td>

    </tr>

  );

}

// ==========================================
// Info Row
// ==========================================

type InfoProps = {
  label: string;
  value?: string;
};

function InfoRow({
  label,
  value,
}: InfoProps) {

  return (

    <div className="flex border-b border-gray-300 pb-2">

      <div className="w-44 font-bold">

        {label}

      </div>

      <div className="flex-1">

        {value || "-"}

      </div>

    </div>

  );

}