"use client";

import {
  AlertTriangle,
  ClipboardList,
  KeyRound,
  Shield,
  Stethoscope,
} from "lucide-react";

import { RepairProblem } from "@/types/repair";

interface ProblemCardProps {
  problem: RepairProblem;
}

export default function ProblemCard({
  problem,
}: ProblemCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-6 flex items-center gap-3">
        <AlertTriangle
          size={22}
          className="text-yellow-400"
        />

        <h2 className="text-xl font-bold text-yellow-400">
          Problem Information
        </h2>
      </div>

      {/* ==========================================
          Complaint
      ========================================== */}

      <InfoItem
        icon={<ClipboardList size={18} />}
        label="Customer Complaint"
        value={problem.complaint}
        multiline
      />

      {/* ==========================================
          Physical Condition
      ========================================== */}

      <div className="mt-5">
        <InfoItem
          label="Physical Condition"
          value={
            problem.physicalCondition || "-"
          }
          multiline
        />
      </div>

      {/* ==========================================
          Diagnosis
      ========================================== */}

      <div className="mt-5">
        <InfoItem
          icon={<Stethoscope size={18} />}
          label="Diagnosis"
          value={problem.diagnosis || "-"}
          multiline
        />
      </div>

      {/* ==========================================
          Passwords
      ========================================== */}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <InfoItem
          icon={<KeyRound size={18} />}
          label="Windows Password"
          value={problem.password || "-"}
        />

        <InfoItem
          icon={<Shield size={18} />}
          label="BIOS Password"
          value={
            problem.biosPassword || "-"
          }
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

  multiline?: boolean;
}

function InfoItem({
  icon,
  label,
  value,
  multiline = false,
}: InfoItemProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
        {icon}

        <span>{label}</span>
      </div>

      <div
        className={`rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white ${
          multiline
            ? "min-h-[90px] whitespace-pre-wrap"
            : "font-medium"
        }`}
      >
        {value}
      </div>
    </div>
  );
}