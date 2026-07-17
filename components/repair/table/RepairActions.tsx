"use client";

import {
  Eye,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react";

interface RepairActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onPrint?: () => void;
  onDelete?: () => void;
}

export default function RepairActions({
  onView,
  onEdit,
  onPrint,
  onDelete,
}: RepairActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={onView}
        title="View"
        className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10"
      >
        <Eye size={18} />
      </button>

      <button
        type="button"
        onClick={onEdit}
        title="Edit"
        className="rounded-lg p-2 text-yellow-400 transition hover:bg-yellow-500/10"
      >
        <Pencil size={18} />
      </button>

      <button
        type="button"
        onClick={onPrint}
        title="Print"
        className="rounded-lg p-2 text-green-400 transition hover:bg-green-500/10"
      >
        <Printer size={18} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Delete"
        className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}