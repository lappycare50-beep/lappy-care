"use client";

import { useState } from "react";

import { Repair, RepairStatus } from "@/types/repair";

import RepairActions from "./RepairActions";
import RepairPaymentBadge from "./RepairPaymentBadge";
import RepairPriorityBadge from "./RepairPriorityBadge";

import { updateRepair } from "@/services/repairService";

interface RepairTableRowProps {
  repair: Repair;

  onView?: (repair: Repair) => void;

  onEdit?: (repair: Repair) => void;

  onPrint?: (repair: Repair) => void;

  onDelete?: (repair: Repair) => void;

  onStatusChange?: (
    repair: Repair
  ) => void;
}

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
    "TABLE STATUS WHATSAPP RESPONSE:",
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
// Component
// ==========================================

export default function RepairTableRow({
  repair,
  onView,
  onEdit,
  onPrint,
  onDelete,
  onStatusChange,
}: RepairTableRowProps) {
  const [currentStatus, setCurrentStatus] =
    useState<RepairStatus>(
      repair.status
    );

  const [
    updating,
    setUpdating,
  ] = useState(false);

  // ==========================================
  // Change Status
  // ==========================================

  async function handleStatusChange(
    newStatus: RepairStatus
  ) {
    if (!repair.id) {
      alert(
        "Invalid Repair ID."
      );

      return;
    }

    if (
      currentStatus ===
      newStatus
    ) {
      return;
    }

    const oldStatus =
      currentStatus;

    try {
      setUpdating(true);

      // ==========================================
      // Updated Repair
      // ==========================================

      const updatedRepair:
        Repair = {
        ...repair,

        status:
          newStatus,

        updatedAt:
          new Date().toISOString(),
      };

      // ==========================================
      // Save Firestore
      // ==========================================

      await updateRepair(
        repair.id,
        updatedRepair
      );

      // ==========================================
      // Update UI
      // ==========================================

      setCurrentStatus(
        newStatus
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

        whatsappSent =
          true;
      } catch (whatsappError) {
        console.error(
          "WhatsApp status send failed:",
          whatsappError
        );
      }

      // ==========================================
      // Notify Parent
      // ==========================================

      onStatusChange?.(
        updatedRepair
      );

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
      setUpdating(false);
    }
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <tr className="border-b border-white/10 transition hover:bg-white/5">

      {/* =====================================
          Repair ID
      ===================================== */}

      <td className="px-4 py-4 font-semibold text-yellow-400">
        {repair.repairId}
      </td>

      {/* =====================================
          Customer
      ===================================== */}

      <td className="px-4 py-4">

        <div className="font-medium text-white">
          {repair.customer.name}
        </div>

        <div className="text-sm text-gray-400">
          {repair.customer.mobile}
        </div>

      </td>

      {/* =====================================
          Device
      ===================================== */}

      <td className="px-4 py-4">

        <div className="font-medium text-white">
          {repair.device.brand}
        </div>

        <div className="text-sm text-gray-400">
          {repair.device.model}
        </div>

      </td>

      {/* =====================================
          Complaint
      ===================================== */}

      <td className="max-w-xs truncate px-4 py-4 text-gray-300">
        {repair.problem.complaint}
      </td>

      {/* =====================================
          STATUS
      ===================================== */}

      <td className="px-4 py-4">

        <select
          value={currentStatus}
          disabled={updating}
          onChange={(e) =>
            handleStatusChange(
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
              currentStatus
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

        {updating && (
          <div className="mt-1 text-xs text-gray-500">
            Updating...
          </div>
        )}

      </td>

      {/* =====================================
          Payment
      ===================================== */}

      <td className="px-4 py-4">

        <RepairPaymentBadge
          status={
            repair.paymentStatus
          }
        />

      </td>

      {/* =====================================
          Priority
      ===================================== */}

      <td className="px-4 py-4">

        <RepairPriorityBadge
          priority={
            repair.estimate
              .priority
          }
        />

      </td>

      {/* =====================================
          Created
      ===================================== */}

      <td className="whitespace-nowrap px-4 py-4 text-gray-400">
        {repair.createdAt}
      </td>

      {/* =====================================
          Actions
      ===================================== */}

      <td className="px-4 py-4">

        <RepairActions
          onView={() =>
            onView?.(repair)
          }

          onEdit={() =>
            onEdit?.(repair)
          }

          onPrint={() =>
            onPrint?.(repair)
          }

          onDelete={() =>
            onDelete?.(repair)
          }
        />

      </td>

    </tr>
  );
}