"use client";

import {
  AlertTriangle,
  ArrowUp,
  ArrowUpCircle,
  Minus,
} from "lucide-react";

import { Priority } from "@/types/repair";

interface RepairPriorityBadgeProps {
  priority: Priority;
}

const PRIORITY_CONFIG: Record<
  Priority,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  Low: {
    label: "Low",
    className:
      "border border-green-500/30 bg-green-500/15 text-green-400",
    icon: Minus,
  },

  Medium: {
    label: "Medium",
    className:
      "border border-blue-500/30 bg-blue-500/15 text-blue-400",
    icon: ArrowUp,
  },

  High: {
    label: "High",
    className:
      "border border-orange-500/30 bg-orange-500/15 text-orange-400",
    icon: ArrowUpCircle,
  },

  Urgent: {
    label: "Urgent",
    className:
      "border border-red-500/30 bg-red-500/15 text-red-400",
    icon: AlertTriangle,
  },
};

export default function RepairPriorityBadge({
  priority,
}: RepairPriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];

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