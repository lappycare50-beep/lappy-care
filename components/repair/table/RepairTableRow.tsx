"use client";

import { Repair } from "@/types/repair";

import RepairActions from "./RepairActions";
import RepairPaymentBadge from "./RepairPaymentBadge";
import RepairPriorityBadge from "./RepairPriorityBadge";
import RepairStatusBadge from "./RepairStatusBadge";

interface RepairTableRowProps {
  repair: Repair;

  onView?: (repair: Repair) => void;

  onEdit?: (repair: Repair) => void;

  onPrint?: (repair: Repair) => void;

  onDelete?: (repair: Repair) => void;
}

export default function RepairTableRow({
  repair,
  onView,
  onEdit,
  onPrint,
  onDelete,
}: RepairTableRowProps) {
  return (
    <tr className="border-b border-white/10 transition hover:bg-white/5">
      {/* Repair ID */}

      <td className="px-4 py-4 font-semibold text-yellow-400">
        {repair.repairId}
      </td>

      {/* Customer */}

      <td className="px-4 py-4">
        <div className="font-medium text-white">
          {repair.customer.name}
        </div>

        <div className="text-sm text-gray-400">
          {repair.customer.mobile}
        </div>
      </td>

      {/* Device */}

      <td className="px-4 py-4">
        <div className="font-medium text-white">
          {repair.device.brand}
        </div>

        <div className="text-sm text-gray-400">
          {repair.device.model}
        </div>
      </td>

      {/* Complaint */}

      <td className="max-w-xs truncate px-4 py-4 text-gray-300">
        {repair.problem.complaint}
      </td>

      {/* Status */}

      <td className="px-4 py-4">
        <RepairStatusBadge
          status={repair.status}
        />
      </td>

      {/* Payment */}

      <td className="px-4 py-4">
        <RepairPaymentBadge
          status={repair.paymentStatus}
        />
      </td>

      {/* Priority */}

      <td className="px-4 py-4">
        <RepairPriorityBadge
          priority={repair.estimate.priority}
        />
      </td>

      {/* Created */}

      <td className="whitespace-nowrap px-4 py-4 text-gray-400">
        {repair.createdAt}
      </td>

      {/* Actions */}

      <td className="px-4 py-4">
        <RepairActions
          onView={() => onView?.(repair)}
          onEdit={() => onEdit?.(repair)}
          onPrint={() => onPrint?.(repair)}
          onDelete={() => onDelete?.(repair)}
        />
      </td>
    </tr>
  );
}