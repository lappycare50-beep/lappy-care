"use client";

import { Repair } from "@/types/repair";
import RepairForm from "@/components/repairs/RepairForm";

type AddRepairModalProps = {
  open: boolean;
  onClose: () => void;
  repair?: Repair | null;
  onSuccess?: () => void;
};

export default function AddRepairModal({
  open,
  onClose,
  repair,
  onSuccess,
}: AddRepairModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-yellow-500/20 bg-[#181818] shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-[#181818] px-8 py-6">

          <div>
            <h2 className="text-3xl font-bold text-white">
              {repair ? "Edit Repair" : "New Repair"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Create or update a repair job.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white transition hover:bg-red-600"
          >
            ×
          </button>

        </div>

        {/* Body */}
        <div className="p-8">

          <RepairForm
            repair={repair}
            onSuccess={() => {
              onSuccess?.();
              onClose();
            }}
          />

        </div>

      </div>

    </div>
  );
}