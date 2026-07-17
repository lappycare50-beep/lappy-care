"use client";

import { RepairEstimate, Priority } from "@/types/repair";

type Props = {
  estimate: RepairEstimate;
  setEstimate: (estimate: RepairEstimate) => void;
};

export default function EstimateSection({
  estimate,
  setEstimate,
}: Props) {

  function update<K extends keyof RepairEstimate>(
    key: K,
    value: RepairEstimate[K]
  ) {

    let updated = {
      ...estimate,
      [key]: value,
    };

    updated.totalAmount =
      updated.labourCharge +
      updated.partsCharge -
      updated.discount;

    updated.balanceAmount =
      Math.max(
        updated.totalAmount -
        updated.advancePaid,
        0
      );

    setEstimate(updated);

  }

  return (

    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Estimate & Assignment
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Labour */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Labour Charge
          </label>

          <input
            type="number"
            value={estimate.labourCharge}
            onChange={(e)=>
              update(
                "labourCharge",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Parts */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Parts Charge
          </label>

          <input
            type="number"
            value={estimate.partsCharge}
            onChange={(e)=>
              update(
                "partsCharge",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Discount */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Discount
          </label>

          <input
            type="number"
            value={estimate.discount}
            onChange={(e)=>
              update(
                "discount",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Advance */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Advance Paid
          </label>

          <input
            type="number"
            value={estimate.advancePaid}
            onChange={(e)=>
              update(
                "advancePaid",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Delivery */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Expected Delivery
          </label>

          <input
            type="date"
            value={estimate.expectedDelivery}
            onChange={(e)=>
              update(
                "expectedDelivery",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Technician */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Technician
          </label>

          <input
            type="text"
            value={estimate.technician}
            onChange={(e)=>
              update(
                "technician",
                e.target.value
              )
            }
            placeholder="Assign Technician"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Priority */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Priority
          </label>

          <select
            value={estimate.priority}
            onChange={(e)=>
              update(
                "priority",
                e.target.value as Priority
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >

            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>

            <option value="Urgent">Urgent</option>

          </select>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-xl border border-yellow-500/20 bg-black p-6">

        <h3 className="mb-4 text-xl font-semibold text-yellow-400">
          Estimate Summary
        </h3>

        <div className="space-y-3 text-white">

          <div className="flex justify-between">
            <span>Total Amount</span>
            <span>₹ {estimate.totalAmount}</span>
          </div>

          <div className="flex justify-between">
            <span>Advance Paid</span>
            <span>₹ {estimate.advancePaid}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-yellow-400">
            <span>Balance</span>
            <span>₹ {estimate.balanceAmount}</span>
          </div>

        </div>

      </div>

    </div>

  );

}