"use client";

import { useEffect, useState } from "react";

import { Repair } from "@/types/repair";

import {
  getRepairs,
  deleteRepair,
} from "@/services/repairService";

import JobCardModal from "@/components/repairs/JobCardModal";

import {
  Pencil,
  Printer,
  Trash2,
  MessageCircle,
} from "lucide-react";

type Props = {
  search: string;
  onEdit: (repair: Repair) => void;
};

export default function RepairTable({
  search,
  onEdit,
}: Props) {

  const [repairs, setRepairs] =
    useState<Repair[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showJobCard, setShowJobCard] =
    useState(false);

  const [selectedRepair, setSelectedRepair] =
    useState<Repair | null>(null);

  // ==========================
  // Load Repairs
  // ==========================

  async function loadRepairs() {
    try {
      const data = await getRepairs();

      setRepairs(data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRepairs();
  }, []);

  // ==========================
  // Delete
  // ==========================

  async function handleDelete(id: string) {

    const ok = confirm(
      "Are you sure you want to delete this repair?"
    );

    if (!ok) return;

    await deleteRepair(id);

    await loadRepairs();
  }

  // ==========================
  // Search
  // ==========================

  const filtered = repairs.filter((repair) => {

    const keyword =
      search.toLowerCase();

    return (

      repair.repairId
        .toLowerCase()
        .includes(keyword)

      ||

      repair.customerName
        .toLowerCase()
        .includes(keyword)

      ||

      repair.mobile
        .toLowerCase()
        .includes(keyword)

    );

  });
    // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#181818] p-10 text-center text-white">
        Loading Repairs...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-yellow-500/20 bg-[#181818]">

        <table className="min-w-full">

          {/* Table Header */}

          <thead className="bg-[#202020]">

            <tr>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Repair ID
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Customer
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Mobile
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Device
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Technician
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Status
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Payment
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Amount
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
                Date
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-yellow-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                      {filtered.map((repair) => (

            <tr
              key={repair.id}
              className="border-t border-gray-800 hover:bg-[#202020]"
            >

              {/* Repair ID */}

              <td className="px-4 py-4 font-semibold text-yellow-400">
                {repair.repairId}
              </td>

              {/* Customer */}

              <td className="px-4 py-4 text-white">
                {repair.customerName}
              </td>

              {/* Mobile */}

              <td className="px-4 py-4 text-gray-300">
                {repair.mobile}
              </td>

              {/* Device */}

              <td className="px-4 py-4 text-gray-300">
                {repair.brand} {repair.model}
              </td>

              {/* Technician */}

              <td className="px-4 py-4 text-gray-300">
                {repair.technician}
              </td>

              {/* Status */}

              <td className="px-4 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    repair.status === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : repair.status === "Ready"
                      ? "bg-blue-500/20 text-blue-400"
                      : repair.status === "Repairing"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {repair.status}
                </span>

              </td>

              {/* Payment */}

              <td className="px-4 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    repair.paymentStatus === "Paid"
                      ? "bg-green-500/20 text-green-400"
                      : repair.paymentStatus === "Partial"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {repair.paymentStatus}
                </span>

              </td>

              {/* Final Cost */}

              <td className="px-4 py-4 font-semibold text-white">
                ₹{repair.finalCost.toLocaleString("en-IN")}
              </td>

              {/* Date */}

              <td className="px-4 py-4 text-gray-400">
                {repair.createdAt}
              </td>

              {/* Actions */}

              <td className="px-4 py-4">

                <div className="flex items-center justify-center gap-3">

                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => onEdit(repair)}
                    className="text-blue-400 transition hover:text-blue-300"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() => handleDelete(repair.id!)}
                    className="text-red-400 transition hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Print */}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRepair(repair);
                      setShowJobCard(true);
                    }}
                    className="text-green-400 transition hover:text-green-300"
                    title="Print Job Card"
                  >
                    <Printer size={18} />
                  </button>

                  {/* WhatsApp */}

                  <button
              
  type="button"
  onClick={() => {
    const message = encodeURIComponent(
`Hello ${repair.customerName},

Your Laptop Repair Status

🆔 Repair ID: ${repair.repairId}
💻 Device: ${repair.brand} ${repair.model}
🔧 Status: ${repair.status}
💳 Payment: ${repair.paymentStatus}

Thank you,
Lappy Care
📞 9595057006`
    );

    window.open(
      `https://wa.me/91${repair.mobile}?text=${message}`,
      "_blank"
    );
  }}
  className="text-emerald-400 transition hover:text-emerald-300"
  title="WhatsApp Customer"
>
  <MessageCircle size={18} />
</button>

                </div>

              </td>

            </tr>

          ))}
                    {/* Empty State */}

          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={10}
                className="px-6 py-12 text-center text-gray-400"
              >
                No repair records found.
              </td>
            </tr>
          )}

          </tbody>

        </table>

      </div>

      {/* Job Card Modal */}

      <JobCardModal
        open={showJobCard}
        repair={selectedRepair}
        onClose={() => {
          setShowJobCard(false);
          setSelectedRepair(null);
        }}
      />

    </>
  );
}