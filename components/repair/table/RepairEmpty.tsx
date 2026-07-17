"use client";

import { PackageSearch } from "lucide-react";

interface RepairEmptyProps {
  title?: string;
  description?: string;
}

export default function RepairEmpty({
  title = "No Repairs Found",
  description = "There are no repair records available.",
}: RepairEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#111111] px-6 py-16 text-center">
      <PackageSearch
        size={60}
        className="mb-4 text-yellow-400"
      />

      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-gray-400">
        {description}
      </p>
    </div>
  );
}