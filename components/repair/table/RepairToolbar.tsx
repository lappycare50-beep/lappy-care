"use client";

import { Search, Plus, RotateCw } from "lucide-react";

import { PaymentStatus, Priority, RepairStatus } from "@/types/repair";

interface RepairToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: RepairStatus | "";
  onStatusChange: (value: RepairStatus | "") => void;

  payment: PaymentStatus | "";
  onPaymentChange: (value: PaymentStatus | "") => void;

  priority: Priority | "";
  onPriorityChange: (value: Priority | "") => void;

  onRefresh: () => void;
  onAddRepair: () => void;
}

export default function RepairToolbar({
  search,
  onSearchChange,

  status,
  onStatusChange,

  payment,
  onPaymentChange,

  priority,
  onPriorityChange,

  onRefresh,
  onAddRepair,
}: RepairToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-[#111111] p-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}

      <div className="flex flex-1 flex-col gap-3 lg:flex-row">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search Repair..."
            className="w-full rounded-lg border border-white/10 bg-[#1A1A1A] py-2 pl-10 pr-4 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as RepairStatus | ""
            )
          }
          className="rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 text-white"
        >
          <option value="">All Status</option>

          <option>Received</option>
          <option>Diagnosing</option>
          <option>Waiting Approval</option>
          <option>Waiting Parts</option>
          <option>Repairing</option>
          <option>Testing</option>
          <option>Ready</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        {/* Payment */}

        <select
          value={payment}
          onChange={(e) =>
            onPaymentChange(
              e.target.value as PaymentStatus | ""
            )
          }
          className="rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 text-white"
        >
          <option value="">All Payments</option>

          <option>Pending</option>
          <option>Partial</option>
          <option>Paid</option>
        </select>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) =>
            onPriorityChange(
              e.target.value as Priority | ""
            )
          }
          className="rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 text-white"
        >
          <option value="">All Priority</option>

          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>

      {/* Right */}

      <div className="flex gap-3">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-white transition hover:bg-white/10"
        >
          <RotateCw size={18} />

          Refresh
        </button>

        <button
          onClick={onAddRepair}
          className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300"
        >
          <Plus size={18} />

          New Repair
        </button>
      </div>
    </div>
  );
}