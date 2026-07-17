"use client";

import { RepairProblem } from "@/types/repair";

type Props = {
  problem: RepairProblem;
  setProblem: (problem: RepairProblem) => void;
};

export default function ProblemSection({
  problem,
  setProblem,
}: Props) {

  function update<K extends keyof RepairProblem>(
    key: K,
    value: RepairProblem[K]
  ) {
    setProblem({
      ...problem,
      [key]: value,
    });
  }

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Problem Details
      </h2>

      <div className="space-y-6">

        {/* Complaint */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Customer Complaint
          </label>

          <textarea
            rows={4}
            value={problem.complaint}
            onChange={(e) =>
              update("complaint", e.target.value)
            }
            placeholder="Enter customer complaint..."
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none resize-none focus:border-yellow-400"
          />

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Windows Password / PIN
          </label>

          <input
            type="text"
            value={problem.password ?? ""}
            onChange={(e) =>
              update("password", e.target.value)
            }
            placeholder="Windows Password"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* BIOS Password */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            BIOS Password
          </label>

          <input
            type="text"
            value={problem.biosPassword ?? ""}
            onChange={(e) =>
              update("biosPassword", e.target.value)
            }
            placeholder="BIOS Password"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Initial Diagnosis */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Initial Diagnosis
          </label>

          <textarea
            rows={4}
            value={problem.diagnosis ?? ""}
            onChange={(e) =>
              update("diagnosis", e.target.value)
            }
            placeholder="Technician initial diagnosis..."
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none resize-none focus:border-yellow-400"
          />

        </div>

      </div>

    </div>
  );
}