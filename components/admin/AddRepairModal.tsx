"use client";

import { useEffect } from "react";

import RepairForm from "@/components/repairs/RepairForm";
import { Repair } from "@/types/repair";

type Props = {
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
}: Props) {

  // ==========================================
  // ESC Close
  // ==========================================

  useEffect(() => {

    function handleKeyDown(
      e: KeyboardEvent
    ) {

      if (e.key === "Escape") {
        onClose();
      }

    }

    if (open) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, [open, onClose]);

  if (!open) return null;

  return (

    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >

      <div
        className="relative flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ==========================
            Header
        ========================== */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-800 bg-[#181818] px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">

              {repair
                ? "Edit Repair"
                : "New Repair"}

            </h2>

            <p className="mt-2 text-gray-400">

              {repair
                ? "Update repair details."
                : "Create a new repair job."}

            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white transition hover:bg-red-600"
          >
            ×
          </button>

        </div>

        {/* ==========================
            Body
        ========================== */}

        <div className="flex-1 overflow-y-auto p-8">

          <RepairForm
            key={repair?.id ?? "new"}
            editRepair={repair ?? null}
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