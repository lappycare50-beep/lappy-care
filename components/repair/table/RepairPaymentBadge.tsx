"use client";

import {
  AlertCircle,
  CheckCircle2,
  Wallet,
} from "lucide-react";

import { PaymentStatus } from "@/types/repair";

interface RepairPaymentBadgeProps {
  status: PaymentStatus;
}

const PAYMENT_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  Pending: {
    label: "Pending",
    className:
      "border border-red-500/30 bg-red-500/15 text-red-400",
    icon: AlertCircle,
  },

  Partial: {
    label: "Partial",
    className:
      "border border-yellow-500/30 bg-yellow-500/15 text-yellow-400",
    icon: Wallet,
  },

  Paid: {
    label: "Paid",
    className:
      "border border-green-500/30 bg-green-500/15 text-green-400",
    icon: CheckCircle2,
  },
};

export default function RepairPaymentBadge({
  status,
}: RepairPaymentBadgeProps) {
  const config = PAYMENT_CONFIG[status];

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