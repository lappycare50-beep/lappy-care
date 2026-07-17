"use client";

import { useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import RepairTable from "@/components/admin/RepairTable";
import AddRepairModal from "@/components/admin/AddRepairModal";

import { Repair } from "@/types/repair";

export default function RepairsPage() {
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedRepair, setSelectedRepair] =
    useState<Repair | null>(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  // ==============================
  // New Repair
  // ==============================

  function handleAddRepair() {
    setSelectedRepair(null);
    setOpenModal(true);
  }

  // ==============================
  // Edit Repair
  // ==============================

  function handleEditRepair(
    repair: Repair
  ) {
    setSelectedRepair(repair);
    setOpenModal(true);
  }

  // ==============================
  // Close Modal
  // ==============================

  function handleClose() {
    setOpenModal(false);
    setSelectedRepair(null);
  }

  // ==============================
  // Refresh Table
  // ==============================

  function handleSuccess() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Repair Management
            </h1>

            <p className="mt-2 text-gray-400">
              Manage all repair jobs.
            </p>

          </div>

          <button
            onClick={handleAddRepair}
            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            + New Repair
          </button>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search Repair..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-gray-700 bg-[#181818] px-5 py-3 text-white outline-none focus:border-yellow-500"
        />

        {/* Repair Table */}

        <RepairTable
          key={refreshKey}
          search={search}
          onEdit={handleEditRepair}
        />

      </div>

      {/* Modal */}

      <AddRepairModal
        open={openModal}
        onClose={handleClose}
        repair={selectedRepair}
        onSuccess={handleSuccess}
      />

    </AdminLayout>
  );
}