"use client";

import {
  Calendar,
  CircleDollarSign,
  Coins,
  CreditCard,
  Receipt,
  UserCog,
} from "lucide-react";

import { RepairEstimate } from "@/types/repair";

import RepairPriorityBadge from "../table/RepairPriorityBadge";

interface EstimateCardProps {
  estimate: RepairEstimate;
}

export default function EstimateCard({
  estimate,
}: EstimateCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-6 flex items-center gap-3">
        <Receipt
          size={22}
          className="text-yellow-400"
        />

        <h2 className="text-xl font-bold text-yellow-400">
          Estimate Information
        </h2>
      </div>

      {/* ==========================================
          Charges
      ========================================== */}

      <div className="grid gap-5 md:grid-cols-2">
        <InfoItem
          icon={<CircleDollarSign size={18} />}
          label="Labour Charge"
          value={`₹ ${estimate.labourCharge.toFixed(2)}`}
        />

        <InfoItem
          icon={<CircleDollarSign size={18} />}
          label="Parts Charge"
          value={`₹ ${estimate.partsCharge.toFixed(2)}`}
        />

        <InfoItem
          icon={<Coins size={18} />}
          label="Discount"
          value={`₹ ${estimate.discount.toFixed(2)}`}
        />

        <InfoItem
          icon={<Receipt size={18} />}
          label="Total Amount"
          value={`₹ ${estimate.totalAmount.toFixed(2)}`}
        />

        <InfoItem
          icon={<CreditCard size={18} />}
          label="Advance Paid"
          value={`₹ ${estimate.advancePaid.toFixed(2)}`}
        />

        <InfoItem
          icon={<CircleDollarSign size={18} />}
          label="Balance Amount"
          value={`₹ ${estimate.balanceAmount.toFixed(2)}`}
        />

        <InfoItem
          icon={<Calendar size={18} />}
          label="Expected Delivery"
          value={estimate.expectedDelivery || "-"}
        />

        <InfoItem
          icon={<UserCog size={18} />}
          label="Technician"
          value={estimate.technician || "-"}
        />
      </div>

      {/* ==========================================
          Priority
      ========================================== */}

      <div className="mt-6">
        <div className="mb-2 text-sm text-gray-400">
          Priority
        </div>

        <RepairPriorityBadge
          priority={estimate.priority}
        />
      </div>
    </div>
  );
}

// ==========================================
// Info Item
// ==========================================

interface InfoItemProps {
  icon?: React.ReactNode;

  label: string;

  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
        {icon}

        <span>{label}</span>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 font-medium text-white">
        {value}
      </div>
    </div>
  );
}