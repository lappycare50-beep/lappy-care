"use client";

import {
  Package,
  Tag,
} from "lucide-react";

import { RepairAccessories } from "@/types/repair";

interface AccessoriesCardProps {
  accessories: RepairAccessories;
}

export default function AccessoriesCard({
  accessories,
}: AccessoriesCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-6 flex items-center gap-3">
        <Package
          size={22}
          className="text-yellow-400"
        />

        <h2 className="text-xl font-bold text-yellow-400">
          Accessories
        </h2>
      </div>

      {/* ==========================================
          Accessories List
      ========================================== */}

      {accessories.items.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {accessories.items.map(
            (item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400"
              >
                <Tag size={14} />

                {item}
              </div>
            )
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/10 bg-[#1A1A1A] px-4 py-6 text-center text-gray-500">
          No accessories received.
        </div>
      )}

      {/* ==========================================
          Other Accessories
      ========================================== */}

      {accessories.other.trim() !== "" && (
        <div className="mt-6">
          <div className="mb-2 text-sm text-gray-400">
            Other Accessories
          </div>

          <div className="rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white">
            {accessories.other}
          </div>
        </div>
      )}
    </div>
  );
}