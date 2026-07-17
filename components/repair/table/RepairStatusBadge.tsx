"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Cpu,
  Package,
  Wrench,
  XCircle,
} from "lucide-react";

import { RepairStatus } from "@/types/repair";

interface RepairStatusBadgeProps {
  status: RepairStatus;
}

const STATUS_CONFIG: Record<
  RepairStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  Received: {
    label: "Received",
    className:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    icon: Package,
  },

  Diagnosing: {
    label: "Diagnosing",
    className:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    icon: Cpu,
  },

  "Waiting Approval": {
    label: "Waiting Approval",
    className:
      "bg-orange-500/15 text-orange-400 border border-orange-500/30",
    icon: Clock3,
  },

  "Waiting Parts": {
    label: "Waiting Parts",
    className:
      "bg-purple-500/15 text-purple-400 border border-purple-500/30",
    icon: Clock3,
  },

  Repairing: {
    label: "Repairing",
    className:
      "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
    icon: Wrench,
  },

  Testing: {
    label: "Testing",
    className:
      "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
    icon: AlertCircle,
  },

  Ready: {
    label: "Ready",
    className:
      "bg-green-500/15 text-green-400 border border-green-500/30",
    icon: CheckCircle2,
  },

  Delivered: {
    label: "Delivered",
    className:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    icon: CheckCircle2,
  },

  Cancelled: {
    label: "Cancelled",
    className:
      "bg-red-500/15 text-red-400 border border-red-500/30",
    icon: XCircle,
  },
};

export default function RepairStatusBadge({
  status,
}: RepairStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={14} />

      {config.label}
    </span>
  );
}