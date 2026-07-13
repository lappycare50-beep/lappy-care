"use client";

import { useEffect } from "react";

import {
  PaymentStatus,
} from "@/types/repair";

type Props = {
  estimatedCost: number;
  setEstimatedCost: (value: number) => void;

  finalCost: number;
  setFinalCost: (value: number) => void;

  advancePaid: number;
  setAdvancePaid: (value: number) => void;

  balanceAmount: number;
  setBalanceAmount: (value: number) => void;

  paymentStatus: PaymentStatus;
  setPaymentStatus: (value: PaymentStatus) => void;
};

export default function PaymentSection({
  estimatedCost,
  setEstimatedCost,

  finalCost,
  setFinalCost,

  advancePaid,
  setAdvancePaid,

  balanceAmount,
  setBalanceAmount,

  paymentStatus,
  setPaymentStatus,
}: Props) {

  // Auto Balance Calculation
  useEffect(() => {
    const balance = Math.max(finalCost - advancePaid, 0);

    setBalanceAmount(balance);

  }, [
    finalCost,
    advancePaid,
    setBalanceAmount,
  ]);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Payment Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Estimated Cost */}

        <input
          type="number"
          value={estimatedCost}
          onChange={(e) =>
            setEstimatedCost(Number(e.target.value))
          }
          placeholder="Estimated Cost"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Final Cost */}

        <input
          type="number"
          value={finalCost}
          onChange={(e) =>
            setFinalCost(Number(e.target.value))
          }
          placeholder="Final Cost"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Advance */}

        <input
          type="number"
          value={advancePaid}
          onChange={(e) =>
            setAdvancePaid(Number(e.target.value))
          }
          placeholder="Advance Paid"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Balance */}

        <input
          type="number"
          value={balanceAmount}
          readOnly
          className="rounded-xl border border-green-500 bg-[#111] p-4 font-bold text-green-400 outline-none"
        />

        {/* Payment Status */}

        <select
          value={paymentStatus}
          onChange={(e) =>
            setPaymentStatus(
              e.target.value as PaymentStatus
            )
          }
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400 md:col-span-2"
        >
          <option value="Pending">
            🟠 Pending
          </option>

          <option value="Partial">
            🟡 Partial
          </option>

          <option value="Paid">
            🟢 Paid
          </option>

        </select>

      </div>

    </div>
  );
}