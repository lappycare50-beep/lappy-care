"use client";

import { Repair } from "@/types/repair";

import JobCard from "./JobCard";
import PrintButton from "./PrintButton";

type Props = {
  open: boolean;
  repair: Repair | null;
  onClose: () => void;
};

export default function JobCardModal({
  open,
  repair,
  onClose,
}: Props) {
  if (!open || !repair) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-6 py-4">

          <h2 className="text-2xl font-bold text-black">
            Repair Job Card
          </h2>

          <div className="flex items-center gap-3">

            <PrintButton />

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-red-500 px-5 py-3 font-bold text-white hover:bg-red-600"
            >
              Close
            </button>

          </div>

        </div>

        {/* Job Card */}

        <div className="bg-gray-100 p-8">

          <JobCard repair={repair} />

        </div>

      </div>

    </div>
  );
}