"use client";

import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

import { Repair } from "@/types/repair";

import RepairStatusBadge from "../table/RepairStatusBadge";

interface HeaderProps {
  repair: Repair;

  onPrint?: () => void;
}

export default function Header({
  repair,
  onPrint,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-5 rounded-xl border border-white/10 bg-[#111111] p-6 lg:flex-row lg:items-center lg:justify-between">
      {/* ==========================
          Left
      ========================== */}

      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-white/10 p-2 text-gray-300 transition hover:bg-white/10"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            {repair.repairId}
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            {repair.customer.name}
          </p>

          <div className="mt-4">
            <RepairStatusBadge
              status={repair.status}
            />
          </div>
        </div>
      </div>

      {/* ==========================
          Right
      ========================== */}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            router.push(
              `/admin/repairs/${repair.id}/edit`
            )
          }
          className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 font-medium text-yellow-400 transition hover:bg-yellow-500/20"
        >
          <Pencil size={18} />

          Edit Repair
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 font-medium text-green-400 transition hover:bg-green-500/20"
        >
          <Printer size={18} />

          Print Job Card
        </button>
      </div>
    </div>
  );
}