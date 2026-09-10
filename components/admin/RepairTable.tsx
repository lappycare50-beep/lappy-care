"use client";

import { useEffect, useMemo, useState } from "react";

import { Repair, RepairStatus } from "@/types/repair";

import Link from "next/link";

import {
  getRepairs,
  deleteRepair,
  updateRepair,
} from "@/services/repairService";

import {
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

// ==========================================
// Status Options
// ==========================================

const STATUS_OPTIONS: RepairStatus[] = [
  "Received",
  "Diagnosing",
  "Waiting Approval",
  "Waiting Parts",
  "Repairing",
  "Testing",
  "Ready",
  "Delivered",
  "Cancelled",
];

// ==========================================
// Component
// ==========================================

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

  const [
    updatingRepairId,
    setUpdatingRepairId,
  ] = useState<string | null>(null);

  // ==========================================
  // Load Repairs
  // ==========================================

  async function loadRepairs() {
    try {
      setLoading(true);

      const data =
        await getRepairs();

      setRepairs(data);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load repairs."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRepairs();
  }, []);

  // ==========================================
  // Search Filter
  // ==========================================

  const filteredRepairs =
    useMemo(() => {
      if (!search.trim()) {
        return repairs;
      }

      const keyword =
        search
          .toLowerCase()
          .trim();

      return repairs.filter(
        (repair) =>
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
            .includes(keyword)
      );
    }, [repairs, search]);

  // ==========================================
  // Status Color
  // ==========================================

  function getStatusColor(
    status: RepairStatus
  ) {
    switch (status) {
      case "Received":
        return "bg-blue-500";

      case "Diagnosing":
        return "bg-purple-500";

      case "Waiting Approval":
        return "bg-yellow-500 text-black";

      case "Waiting Parts":
        return "bg-orange-500";

      case "Repairing":
        return "bg-indigo-500";

      case "Testing":
        return "bg-cyan-500 text-black";

      case "Ready":
        return "bg-green-500";

      case "Delivered":
        return "bg-gray-500";

      case "Cancelled":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  }

  // ==========================================
  // WhatsApp Status Message
  // ==========================================

  async function sendStatusWhatsApp(
    repair: Repair,
    newStatus: RepairStatus
  ) {
    const mobile =
      repair.customer.mobile?.replace(
        /\D/g,
        ""
      );

    if (!mobile) {
      throw new Error(
        "Customer mobile number is missing."
      );
    }

    const whatsappNumber =
      mobile.length === 10
        ? `91${mobile}`
        : mobile;

    const customerName =
      repair.customer.name?.trim() ||
      "Customer";

    const repairId =
      repair.repairId?.trim() ||
      "-";

    const deviceName = [
      repair.device.brand?.trim(),
      repair.device.model?.trim(),
    ]
      .filter(Boolean)
      .join(" ");

    const message = `Hello ${customerName},

Your Lappy Care repair status has been updated.

🆔 Repair ID: ${repairId}

💻 Device: ${
      deviceName || "Laptop"
    }

🔧 New Status: ${newStatus}

Thank you for choosing Lappy Care.

📞 95950 57006`;

    const response =
      await fetch(
        "/api/whatsapp/send",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            to: whatsappNumber,
            message,
          }),
        }
      );

    let data: any = null;

    try {
      data =
        await response.json();
    } catch {
      data = null;
    }

    console.log(
      "Repair table WhatsApp response:",
      {
        status: response.status,
        data,
      }
    );

    if (
      !response.ok ||
      !data?.success
    ) {
      throw new Error(
        data?.error ||
          "WhatsApp message failed."
      );
    }

    return data;
  }

  // ==========================================
  // Change Status
  // ==========================================

  async function handleStatusChange(
    repair: Repair,
    newStatus: RepairStatus
  ) {
    if (!repair.id) {
      alert(
        "Invalid Repair ID."
      );

      return;
    }

    const oldStatus =
      repair.status;

    if (
      oldStatus === newStatus
    ) {
      return;
    }

    try {
      setUpdatingRepairId(
        repair.id
      );

      // ==========================================
      // Update Firestore
      // ==========================================

      const updatedRepair:
        Repair = {
        ...repair,

        status:
          newStatus,

        updatedAt:
          new Date().toISOString(),
      };

      await updateRepair(
        repair.id,
        updatedRepair
      );

      // ==========================================
      // Update Local Table Immediately
      // ==========================================

      setRepairs((current) =>
        current.map((item) =>
          item.id === repair.id
            ? updatedRepair
            : item
        )
      );

      // ==========================================
      // Send WhatsApp
      // ==========================================

      let whatsappSent =
        false;

      try {
        await sendStatusWhatsApp(
          updatedRepair,
          newStatus
        );

        whatsappSent = true;
      } catch (whatsappError) {
        console.error(
          "WhatsApp status send failed:",
          whatsappError
        );
      }

      // ==========================================
      // Final Refresh
      // ==========================================

      await loadRepairs();

      // ==========================================
      // Feedback
      // ==========================================

      if (whatsappSent) {
        alert(
          `Repair status updated successfully.\n\n${oldStatus} → ${newStatus}\n\nWhatsApp status message sent successfully.`
        );
      } else {
        alert(
          `Repair status updated successfully.\n\n${oldStatus} → ${newStatus}\n\nWhatsApp status message could not be sent.`
        );
      }
    } catch (error) {
      console.error(
        "Repair status update error:",
        error
      );

      alert(
        "Failed to update repair status."
      );
    } finally {
      setUpdatingRepairId(
        null
      );
    }
  }

  // ==========================================
  // Delete Repair
  // ==========================================

  async function handleDelete(
    repair: Repair
  ) {
    const confirmDelete =
      window.confirm(
        `Delete Repair ${repair.repairId}?`
      );

    if (!confirmDelete) {
      return;
    }

    try {
      if (!repair.id) {
        alert(
          "Invalid Repair ID"
        );

        return;
      }

      await deleteRepair(
        repair.id
      );

      alert(
        "Repair Deleted Successfully."
      );

      await loadRepairs();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete repair."
      );
    }
  }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#181818]">

      {/* =====================================
          Loading
      ===================================== */}

      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="text-lg text-white">
            Loading Repairs...
          </div>
        </div>
      )}

      {/* =====================================
          Empty
      ===================================== */}

      {!loading &&
        filteredRepairs.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12">

            <Search
              size={50}
              className="mb-4 text-gray-600"
            />

            <h3 className="text-xl font-semibold text-white">
              No Repairs Found
            </h3>

            <p className="mt-2 text-gray-400">
              Try another search keyword.
            </p>

          </div>
        )}

      {/* =====================================
          Table
      ===================================== */}

      {!loading &&
        filteredRepairs.length > 0 && (
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-black">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400">
                    Repair ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400">
                    Device
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400">
                    Technician
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-400">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredRepairs.map(
                  (repair) => {

                    const isUpdating =
                      updatingRepairId ===
                      repair.id;

                    return (
                      <tr
                        key={repair.id}
                        className="border-t border-gray-800 transition hover:bg-[#202020]"
                      >

                        {/* Repair ID */}

                        <td className="px-6 py-4">

                          <div className="font-semibold text-yellow-400">
                            {repair.repairId}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {repair.createdAt}
                          </div>

                        </td>

                        {/* Customer */}

                        <td className="px-6 py-4">

                          <div className="font-semibold text-white">
                            {repair.customer?.name ||
                              "-"}
                          </div>

                          <div className="mt-1 text-sm text-gray-400">
                            {repair.customer?.mobile ||
                              "-"}
                          </div>

                        </td>

                        {/* Device */}

                        <td className="px-6 py-4">

                          <div className="font-semibold text-white">
                            {repair.device?.brand ||
                              "-"}
                          </div>

                          <div className="mt-1 text-sm text-gray-400">
                            {repair.device?.model ||
                              "-"}
                          </div>

                          <div className="text-xs text-gray-500">
                            {repair.device?.type ||
                              "-"}
                          </div>

                        </td>

                        {/* Technician */}

                        <td className="px-6 py-4">

                          <div className="text-white">
                            {repair.estimate
                              ?.technician ||
                              "-"}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {repair.estimate
                              ?.priority ||
                              ""}
                          </div>

                        </td>

                        {/* Amount */}

                        <td className="px-6 py-4">

                          <div className="font-bold text-green-400">
                            ₹
                            {Number(
                              repair.estimate
                                ?.totalAmount ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">

                            Advance:
                            {" "}
                            ₹
                            {Number(
                              repair.estimate
                                ?.advancePaid ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </div>

                        </td>

                        {/* ==================================
                            CLICKABLE STATUS
                        ================================== */}

                        <td className="px-6 py-4">

                          <select
                            value={
                              repair.status
                            }
                            disabled={
                              isUpdating
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                repair,
                                e.target.value as RepairStatus
                              )
                            }
                            title="Click to change repair status"
                            className={`
                              cursor-pointer
                              rounded-full
                              border-0
                              px-3
                              py-1.5
                              text-sm
                              font-semibold
                              text-white
                              outline-none
                              transition
                              hover:brightness-110
                              disabled:cursor-wait
                              disabled:opacity-60
                              ${getStatusColor(
                                repair.status
                              )}
                            `}
                          >

                            {STATUS_OPTIONS.map(
                              (option) => (
                                <option
                                  key={option}
                                  value={option}
                                  className="bg-[#181818] text-white"
                                >
                                  {option}
                                </option>
                              )
                            )}

                          </select>

                          {isUpdating && (
                            <div className="mt-1 text-xs text-gray-500">
                              Updating...
                            </div>
                          )}

                        </td>

                        {/* ==================================
                            Actions
                        ================================== */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-center gap-2">

                            {/* View Job Card */}

                            <Link
                              href={`/admin/repairs/${repair.id}/job-card`}
                              title="Job Card Preview"
                              className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-500"
                            >
                              <Eye size={18} />
                            </Link>

                            {/* Edit */}

                            <button
                              type="button"
                              title="Edit Repair"
                              onClick={() =>
                                onEdit(
                                  repair
                                )
                              }
                              className="rounded-lg bg-yellow-500 p-2 text-black transition hover:bg-yellow-400"
                            >
                              <Pencil
                                size={18}
                              />
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              title="Delete Repair"
                              onClick={() =>
                                handleDelete(
                                  repair
                                )
                              }
                              className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-500"
                            >
                              <Trash2
                                size={18}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

    </div>
  );
}