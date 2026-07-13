"use client";

import { useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AddRepairModal from "@/components/admin/AddRepairModal";
import RepairTable from "@/components/admin/RepairTable";

import { Repair } from "@/types/repair";

import {
  Plus,
  Search,
} from "lucide-react";

export default function RepairsPage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedRepair, setSelectedRepair] =
    useState<Repair | null>(null);

  return (
    <>
      <AdminLayout>

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Repairs
            </h2>

            <p className="text-gray-400">
              Manage Laptop Repair Jobs
            </p>

          </div>

          <button
            onClick={() => {
              setSelectedRepair(null);
              setOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105"
          >
            <Plus size={18} />
            New Repair
          </button>

        </div>

        {/* Search */}

        <div className="relative mb-8">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Repair ID, Customer or Mobile..."
            className="w-full rounded-xl border border-yellow-500/20 bg-[#181818] py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Repair Table */}

        <RepairTable
          search={search}
          onEdit={(repair) => {
            setSelectedRepair(repair);
            setOpen(true);
          }}
        />

      </AdminLayout>

      {/* Modal */}

      <AddRepairModal
        open={open}
        repair={selectedRepair}
        onClose={() => {
          setOpen(false);
          setSelectedRepair(null);
        }}
        onSuccess={() => {
          setOpen(false);
          setSelectedRepair(null);
        }}
      />

    </>
  );
}