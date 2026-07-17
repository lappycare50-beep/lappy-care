"use client";

import {
  RepairStatus,
} from "@/types/repair";

type Props = {
  status: RepairStatus;
  setStatus: (status: RepairStatus) => void;

  warranty: string;
  setWarranty: (value: string) => void;

  createdAt: string;
  setCreatedAt: (value: string) => void;

  deliveredAt: string;
  setDeliveredAt: (value: string) => void;
};

export default function StatusSection({
  status,
  setStatus,

  warranty,
  setWarranty,

  createdAt,
  setCreatedAt,

  deliveredAt,
  setDeliveredAt,
}: Props) {

  return (

    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Repair Status
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Repair Status */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Repair Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as RepairStatus
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >

            <option value="Received">
              📥 Received
            </option>

            <option value="Diagnosing">
              🔍 Diagnosing
            </option>

            <option value="Waiting Approval">
              ⏳ Waiting Approval
            </option>

            <option value="Waiting Parts">
              📦 Waiting Parts
            </option>

            <option value="Repairing">
              🛠 Repairing
            </option>

            <option value="Testing">
              🧪 Testing
            </option>

            <option value="Ready">
              ✅ Ready
            </option>

            <option value="Delivered">
              🚚 Delivered
            </option>

            <option value="Cancelled">
              ❌ Cancelled
            </option>

          </select>

        </div>

        {/* Warranty */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Warranty
          </label>

          <select
            value={warranty}
            onChange={(e) =>
              setWarranty(e.target.value)
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >

            <option value="No Warranty">
              No Warranty
            </option>

            <option value="7 Days">
              7 Days
            </option>

            <option value="15 Days">
              15 Days
            </option>

            <option value="30 Days">
              30 Days
            </option>

            <option value="90 Days">
              90 Days
            </option>

            <option value="180 Days">
              180 Days
            </option>

            <option value="1 Year">
              1 Year
            </option>

          </select>

        </div>

        {/* Received Date */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Received Date
          </label>

          <input
            type="date"
            value={createdAt}
            onChange={(e) =>
              setCreatedAt(e.target.value)
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Delivery Date */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Delivery Date
          </label>

          <input
            type="date"
            value={deliveredAt}
            onChange={(e) =>
              setDeliveredAt(e.target.value)
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

      </div>

      {/* Status Info */}

      <div className="mt-6 rounded-xl border border-yellow-500/20 bg-black p-4">

        <h3 className="mb-3 text-lg font-semibold text-yellow-400">
          Current Status
        </h3>

        <p className="text-sm text-gray-300">

          <span className="font-semibold text-white">
            {status}
          </span>

          {" "}is the current repair stage.

          This status will appear on the Repair Table,
          Job Card, Customer History and WhatsApp updates.

        </p>

      </div>

    </div>

  );

}