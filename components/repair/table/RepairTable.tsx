"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useRepairs } from "@/hooks/useRepairs";
import { deleteRepair } from "@/services/repairService";

import {
  PaymentStatus,
  Priority,
  Repair,
  RepairStatus,
} from "@/types/repair";

import RepairEmpty from "./RepairEmpty";
import RepairLoading from "./RepairLoading";
import RepairTableRow from "./RepairTableRow";
import RepairToolbar from "./RepairToolbar";

export default function RepairTable() {
  const router = useRouter();

  const {
    repairs,
    loading,
    error,
    refresh,
  } = useRepairs();

  // ==========================================
  // Filters
  // ==========================================

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<RepairStatus | "">("");

  const [payment, setPayment] =
    useState<PaymentStatus | "">("");

  const [priority, setPriority] =
    useState<Priority | "">("");

  // ==========================================
  // Filter Repairs
  // ==========================================

  const filteredRepairs = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return repairs.filter((repair) => {
      const matchesSearch =
        repair.repairId
          .toLowerCase()
          .includes(keyword) ||

        repair.customer.name
          .toLowerCase()
          .includes(keyword) ||

        repair.customer.mobile
          .toLowerCase()
          .includes(keyword) ||

        repair.device.brand
          .toLowerCase()
          .includes(keyword) ||

        repair.device.model
          .toLowerCase()
          .includes(keyword) ||

        repair.problem.complaint
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        !status ||
        repair.status === status;

      const matchesPayment =
        !payment ||
        repair.paymentStatus ===
          payment;

      const matchesPriority =
        !priority ||
        repair.estimate.priority ===
          priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesPriority
      );
    });
  }, [
    repairs,
    search,
    status,
    payment,
    priority,
  ]);
    // ==========================================
  // Delete Repair
  // ==========================================

  async function handleDelete(
    repair: Repair
  ) {
    if (!repair.id) return;

    const ok = window.confirm(
      `Are you sure you want to delete ${repair.repairId}?`
    );

    if (!ok) return;

    try {
      await deleteRepair(repair.id);

      await refresh();
    } catch (error) {
      console.error(
        "Delete Repair Error:",
        error
      );

      alert(
        "Failed to delete repair. Please try again."
      );
    }
  }

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return <RepairLoading />;
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
        <h2 className="text-lg font-semibold text-red-400">
          Failed to Load Repairs
        </h2>

        <p className="mt-2 text-sm text-red-300">
          {error}
        </p>

        <button
          onClick={refresh}
          className="mt-5 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <>
      <RepairToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        payment={payment}
        onPaymentChange={setPayment}
        priority={priority}
        onPriorityChange={setPriority}
        onRefresh={refresh}
        onAddRepair={() =>
          router.push("/admin/repairs/new")
        }
      />
            {filteredRepairs.length === 0 ? (
        <RepairEmpty
          title="No Repairs Found"
          description="Try changing your search or filters."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-lg">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 z-10 bg-[#1A1A1A]">
                <tr className="border-b border-white/10 text-left text-sm font-semibold text-gray-300">
                  <th className="whitespace-nowrap px-4 py-4">
                    Repair ID
                  </th>

                  <th className="whitespace-nowrap px-4 py-4">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-4 py-4">
                    Device
                  </th>

                  <th className="px-4 py-4">
                    Complaint
                  </th>

                  <th className="whitespace-nowrap px-4 py-4">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-4">
                    Payment
                  </th>

                  <th className="whitespace-nowrap px-4 py-4">
                    Priority
                  </th>

                  <th className="whitespace-nowrap px-4 py-4">
                    Created
                  </th>

                  <th className="px-4 py-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                                {filteredRepairs.map((repair) => (
                  <RepairTableRow
                    key={repair.id}
                    repair={repair}
                    onView={() =>
                      router.push(
                        `/admin/repairs/${repair.id}`
                      )
                    }
                    onEdit={() =>
                      router.push(
                        `/admin/repairs/${repair.id}/edit`
                      )
                    }
                    onPrint={() => {
                      // TODO:
                      // Replace with Job Card Print
                      window.print();
                    }}
                    onDelete={() =>
                      handleDelete(repair)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
 