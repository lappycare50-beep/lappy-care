"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

import {
  deleteRepair,
  getRepairs,
  updateRepair,
} from "@/services/repairService";

import {
  Repair,
  RepairStatus,
} from "@/types/repair";

type Props = {
  search: string;
  onEdit: (repair: Repair) => void;
};

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

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CRCGvIT5hA6VEAE/review";

// ==========================================
// Status Color
// ==========================================

function getStatusColor(
  status: RepairStatus
) {
  switch (status) {
    case "Received":
      return "bg-blue-500 text-white";

    case "Diagnosing":
      return "bg-purple-500 text-white";

    case "Waiting Approval":
      return "bg-yellow-500 text-black";

    case "Waiting Parts":
      return "bg-orange-500 text-white";

    case "Repairing":
      return "bg-indigo-500 text-white";

    case "Testing":
      return "bg-cyan-500 text-black";

    case "Ready":
      return "bg-green-500 text-white";

    case "Delivered":
      return "bg-gray-500 text-white";

    case "Cancelled":
      return "bg-red-500 text-white";

    default:
      return "bg-gray-500 text-white";
  }
}

// ==========================================
// Professional WhatsApp Message
// ==========================================

function buildStatusWhatsAppMessage(
  repair: Repair,
  newStatus: RepairStatus
) {
  const customerName =
    repair.customer?.name?.trim() ||
    "Customer";

  const repairId =
    repair.repairId?.trim() ||
    "-";

  const deviceName = [
    repair.device?.brand?.trim(),
    repair.device?.model?.trim(),
  ]
    .filter(Boolean)
    .join(" ");

  switch (newStatus) {
    case "Received":
      return `Hello ${customerName},

Greetings from Lappy Care.

We have received your device for service.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Your device has been received successfully and is now in our service process.

Our technician will inspect the device and we will keep you informed about the next update.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Diagnosing":
      return `Hello ${customerName},

Greetings from Lappy Care.

This is an update regarding your device repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Your device is currently being inspected by our technician.

We are identifying the issue carefully and will keep you informed once the diagnosis is completed.

Thank you for your patience.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Waiting Approval":
      return `Hello ${customerName},

Greetings from Lappy Care.

This is an update regarding your device repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
The diagnosis of your device has been completed and your approval is required before we proceed.

Please confirm your approval so that we can continue with the repair.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Waiting Parts":
      return `Hello ${customerName},

Greetings from Lappy Care.

This is an update regarding your device repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Your device is currently awaiting the required replacement part.

Our team is arranging the necessary part and the repair will proceed as soon as it is available.

We will keep you informed of the next update.

Thank you for your patience and understanding.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Repairing":
      return `Hello ${customerName},

Greetings from Lappy Care.

This is an update regarding your device repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Repair work on your device is currently in progress.

Our technician is working on the required repairs and we will keep you informed about further progress.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Testing":
      return `Hello ${customerName},

Greetings from Lappy Care.

Good news! The repair work on your device has been completed and it is now undergoing final testing.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Our team is checking the device to ensure everything is functioning properly before handover.

Thank you for your patience.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Ready":
      return `Hello ${customerName},

Greetings from Lappy Care.

Good news! Your device repair has been completed successfully.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

✅ Current Update:
Your device is ready for pickup.

You may collect your device from Lappy Care at your convenience.

Thank you for trusting Lappy Care with your device.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Delivered":
      return `Hello ${customerName},

Greetings from Lappy Care.

Your device has been successfully delivered.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

✅ Current Update:
Repair completed and device delivered successfully.

We hope you are happy with our service and the experience you had with Lappy Care.

If you have a moment, we would truly appreciate your feedback on Google. Your review helps us improve our service and helps other customers discover Lappy Care.

⭐ Share your experience:
${GOOGLE_REVIEW_URL}

Thank you for trusting Lappy Care with your device.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    case "Cancelled":
      return `Hello ${customerName},

Greetings from Lappy Care.

This is an update regarding your device repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Your repair request has been cancelled.

For any clarification or further assistance, please contact our team.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

    default:
      return `Hello ${customerName},

Greetings from Lappy Care.

This is an update regarding your device repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📍 Current Update:
Your device status has been updated to ${newStatus}.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;
  }
}

// ==========================================
// Send WhatsApp
// ==========================================

async function sendStatusWhatsApp(
  repair: Repair,
  newStatus: RepairStatus
) {
  const mobile =
    repair.customer?.mobile?.replace(
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

  const message =
    buildStatusWhatsAppMessage(
      repair,
      newStatus
    );

  const response = await fetch(
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
    data = await response.json();
  } catch {
    data = null;
  }

  console.log(
    "Repair Status WhatsApp Response:",
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
// Repair Table
// ==========================================

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
  ] = useState<string | null>(
    null
  );

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
      console.error(
        "Load Repairs Error:",
        error
      );

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
  // Search
  // ==========================================

  const filteredRepairs =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword) {
        return repairs;
      }

      return repairs.filter(
        (repair) =>
          (repair.repairId ?? "")
            .toLowerCase()
            .includes(keyword) ||

          (repair.customer?.name ?? "")
            .toLowerCase()
            .includes(keyword) ||

          (repair.customer?.mobile ?? "")
            .toLowerCase()
            .includes(keyword) ||

          (repair.device?.brand ?? "")
            .toLowerCase()
            .includes(keyword) ||

          (repair.device?.model ?? "")
            .toLowerCase()
            .includes(keyword)
      );
    }, [repairs, search]);

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

      const updatedRepair:
        Repair = {
        ...repair,

        status:
          newStatus,

        updatedAt:
          new Date().toISOString(),
      };

      // ==========================================
      // Save
      // ==========================================

      await updateRepair(
        repair.id,
        updatedRepair
      );

      // ==========================================
      // Immediate UI Update
      // ==========================================

      setRepairs((current) =>
        current.map((item) =>
          item.id === repair.id
            ? updatedRepair
            : item
        )
      );

      // ==========================================
      // WhatsApp
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
          "Status WhatsApp Error:",
          whatsappError
        );
      }

      // ==========================================
      // Refresh
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
        "Repair Status Update Error:",
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
  // Delete
  // ==========================================

  async function handleDelete(
    repair: Repair
  ) {
    if (!repair.id) {
      alert(
        "Invalid Repair ID."
      );

      return;
    }

    const confirmDelete =
      window.confirm(
        `Delete Repair ${repair.repairId}?`
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteRepair(
        repair.id
      );

      alert(
        "Repair Deleted Successfully."
      );

      await loadRepairs();
    } catch (error) {
      console.error(
        "Delete Repair Error:",
        error
      );

      alert(
        "Failed to delete repair."
      );
    }
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#181818]">

      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="text-lg text-white">
            Loading Repairs...
          </div>
        </div>
      )}

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
                            Advance: ₹
                            {Number(
                              repair.estimate
                                ?.advancePaid ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </div>

                        </td>

                        {/* Status */}

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

                        {/* Actions */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-center gap-2">

                            <Link
                              href={`/admin/repairs/${repair.id}/job-card`}
                              title="Job Card Preview"
                              className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-500"
                            >
                              <Eye size={18} />
                            </Link>

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