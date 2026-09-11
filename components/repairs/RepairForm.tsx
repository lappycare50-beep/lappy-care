"use client";

import { useEffect, useRef, useState } from "react";

import {
  Repair,
  RepairStatus,
} from "@/types/repair";

import CustomerSection from "./CustomerSection";
import DeviceSection from "./DeviceSection";
import AccessoriesSection from "./AccessoriesSection";
import ProblemSection from "./ProblemSection";
import ConditionSection from "./ConditionSection";
import EstimateSection from "./EstimateSection";
import StatusSection from "./StatusSection";
import NotesSection from "./NotesSection";

import {
  addRepair,
  updateRepair,
} from "@/services/repairService";

import { generateId } from "@/services/idGenerator";

import { syncCustomer } from "@/services/customerService";

type Props = {
  editRepair?: Repair | null;
  onSuccess?: () => void;
};

const defaultRepair: Repair = {
  repairId: "",

  customer: {
    customerId: "",
    name: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  },

  device: {
    type: "Laptop",
    brand: "",
    model: "",
    serialNo: "",
    processor: "",
    ram: "",
    storage: "",
    color: "",
    image: "",
    devicePhotos: [],
  },

  accessories: {
    items: [],
    other: "",
  },

  problem: {
    complaint: "",
    physicalCondition: "",
    diagnosis: "",
    password: "",
    biosPassword: "",
  },

  estimate: {
    labourCharge: 0,
    partsCharge: 0,
    discount: 0,
    totalAmount: 0,
    advancePaid: 0,
    balanceAmount: 0,
    expectedDelivery: "",
    technician: "",
    priority: "Medium",
  },

  paymentStatus: "Pending",

  status: "Received",

  warranty: "No Warranty",

  remarks: "",

  createdAt: new Date()
    .toISOString()
    .split("T")[0],

  updatedAt: "",

  deliveredAt: "",

  timeline: [],
};

export default function RepairForm({
  editRepair,
  onSuccess,
}: Props) {
  const [repair, setRepair] =
    useState<Repair>(defaultRepair);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Original Status Tracking
  // ==========================================

  const originalStatusRef =
    useRef<RepairStatus | null>(null);

  const statusChangedRef =
    useRef(false);

  // ==========================================
  // Load Edit Repair
  // ==========================================

  useEffect(() => {
    if (editRepair) {
      setRepair({
        ...defaultRepair,
        ...editRepair,

        customer: {
          ...defaultRepair.customer,
          ...editRepair.customer,
        },

        device: {
          ...defaultRepair.device,
          ...editRepair.device,
        },

        accessories: {
          ...defaultRepair.accessories,
          ...editRepair.accessories,
        },

        problem: {
          ...defaultRepair.problem,
          ...editRepair.problem,
        },

        estimate: {
          ...defaultRepair.estimate,
          ...editRepair.estimate,
        },
      });

      originalStatusRef.current =
        editRepair.status;

      statusChangedRef.current =
        false;
    } else {
      setRepair(defaultRepair);

      originalStatusRef.current =
        null;

      statusChangedRef.current =
        false;
    }
  }, [editRepair]);

  // ==========================================
  // Validation
  // ==========================================

  function validateRepair() {
    if (!repair.customer.name.trim()) {
      alert("Customer Name is required.");
      return false;
    }

    const mobile =
      repair.customer.mobile.trim();

    if (!mobile) {
      alert("Mobile Number is required.");
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return false;
    }

    if (!repair.device.brand.trim()) {
      alert("Device Brand is required.");
      return false;
    }

    if (!repair.device.model.trim()) {
      alert("Device Model is required.");
      return false;
    }

    if (!repair.problem.complaint.trim()) {
      alert(
        "Customer Complaint is required."
      );
      return false;
    }

    return true;
  }

  // ==========================================
  // Professional WhatsApp Message
  // ==========================================

  function buildStatusWhatsAppMessage(
    repairData: Repair,
    newStatus: RepairStatus
  ) {
    const customerName =
      repairData.customer.name?.trim() ||
      "Customer";

    const repairId =
      repairData.repairId?.trim() ||
      "-";

    const deviceName = [
      repairData.device.brand?.trim(),
      repairData.device.model?.trim(),
    ]
      .filter(Boolean)
      .join(" ");

    switch (newStatus) {
      // ========================================
      // RECEIVED
      // ========================================

      case "Received":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

We have received your laptop for repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Repair Received

Our technician will diagnose the device and keep you informed about the next update.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // DIAGNOSING
      // ========================================

      case "Diagnosing":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop is currently under diagnosis.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Diagnosis in Progress

Our technician is checking the device to identify the issue. We will update you once the diagnosis is completed.

Thank you for your patience.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // WAITING APPROVAL
      // ========================================

      case "Waiting Approval":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop diagnosis has been completed and the repair is awaiting your approval.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Waiting for Approval

Please confirm your approval so that we can proceed with the repair work.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // WAITING PARTS
      // ========================================

      case "Waiting Parts":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop repair is currently waiting for the required parts.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Waiting for Parts

We are arranging the required parts and will continue the repair as soon as they are available.

Thank you for your patience and understanding.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // REPAIRING
      // ========================================

      case "Repairing":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Repair work on your laptop is currently in progress.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Repair in Progress

Our technician is working on the required repairs. We will keep you updated on further progress.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // TESTING
      // ========================================

      case "Testing":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

The repair work on your laptop has been completed and the device is now undergoing final testing.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Final Testing

We are checking the device to ensure everything is functioning properly before delivery.

Thank you for your patience.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // READY
      // ========================================

      case "Ready":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop repair has been completed successfully.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

✅ Status: Ready for Pickup

Your repaired laptop is now ready for collection from Lappy Care.

Thank you for trusting us with your device.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // DELIVERED
      // ========================================

      case "Delivered":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your repaired laptop has been successfully delivered.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

✅ Status: Delivered

Thank you for choosing Lappy Care. We truly appreciate your trust in our service.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // CANCELLED
      // ========================================

      case "Cancelled":
        return `Hello ${customerName},

Greetings from Lappy Care.

Your laptop repair request has been cancelled.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: Repair Cancelled

For any clarification or assistance, please contact us.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      // ========================================
      // DEFAULT
      // ========================================

      default:
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Here is an update regarding your laptop repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${
          deviceName || "Laptop"
        }

📌 Status: ${newStatus}

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;
    }
  }

  // ==========================================
  // Send WhatsApp Status Message
  // ==========================================

  async function sendStatusWhatsApp(
    repairData: Repair,
    newStatus: RepairStatus
  ) {
    const mobile =
      repairData.customer.mobile
        ?.replace(/\D/g, "");

    if (!mobile) {
      console.warn(
        "WhatsApp skipped: customer mobile number is missing."
      );

      return {
        sent: false,
        error:
          "Customer mobile number is missing.",
      };
    }

    const whatsappNumber =
      mobile.length === 10
        ? `91${mobile}`
        : mobile;

    const message =
      buildStatusWhatsAppMessage(
        repairData,
        newStatus
      );

    try {
      console.log(
        "SENDING REPAIR STATUS WHATSAPP",
        {
          to: whatsappNumber,
          repairId:
            repairData.repairId,
          newStatus,
        }
      );

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
        "REPAIR STATUS WHATSAPP RESPONSE",
        {
          httpStatus:
            response.status,

          ok:
            response.ok,

          data,
        }
      );

      if (
        !response.ok ||
        !data?.success
      ) {
        console.error(
          "WhatsApp message failed:",
          data
        );

        return {
          sent: false,
          error:
            data?.error ||
            "WhatsApp message failed.",
        };
      }

      return {
        sent: true,
      };
    } catch (error) {
      console.error(
        "WhatsApp message error:",
        error
      );

      return {
        sent: false,
        error:
          error instanceof Error
            ? error.message
            : "WhatsApp message failed.",
      };
    }
  }

  // ==========================================
  // Save Repair
  // ==========================================

  async function handleSave() {
    if (!validateRepair()) {
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // Recalculate Estimate
      // ==========================================

      const totalAmount =
        Number(
          repair.estimate.labourCharge || 0
        ) +
        Number(
          repair.estimate.partsCharge || 0
        ) -
        Number(
          repair.estimate.discount || 0
        );

      const balanceAmount =
        Math.max(
          totalAmount -
            Number(
              repair.estimate.advancePaid ||
                0
            ),
          0
        );

      const repairData: Repair = {
        ...repair,

        estimate: {
          ...repair.estimate,

          totalAmount,

          balanceAmount,
        },

        updatedAt:
          new Date().toISOString(),
      };

      // ==========================================
      // UPDATE EXISTING REPAIR
      // ==========================================

      if (editRepair?.id) {
        const oldStatus =
          editRepair.status;

        const newStatus =
          repairData.status;

        const statusWasChanged =
          statusChangedRef.current;

        const shouldSendWhatsApp =
          statusWasChanged &&
          oldStatus !== newStatus;

        console.log(
          "REPAIR UPDATE STATUS CHECK",
          {
            oldStatus,
            newStatus,
            statusWasChanged,
            shouldSendWhatsApp,
          }
        );

        // ------------------------------------------
        // Save Repair
        // ------------------------------------------

        await updateRepair(
          editRepair.id,
          repairData
        );

        // ------------------------------------------
        // Send WhatsApp
        // ------------------------------------------

        if (
          shouldSendWhatsApp
        ) {
          const whatsappResult =
            await sendStatusWhatsApp(
              repairData,
              newStatus
            );

          if (
            whatsappResult.sent
          ) {
            alert(
              "Repair Updated Successfully.\n\nWhatsApp status message sent successfully."
            );
          } else {
            console.error(
              "WhatsApp failed:",
              whatsappResult.error
            );

            alert(
              "Repair Updated Successfully.\n\nWhatsApp status message could not be sent."
            );
          }
        } else {
          alert(
            "Repair Updated Successfully."
          );
        }

        originalStatusRef.current =
          newStatus;

        statusChangedRef.current =
          false;

        onSuccess?.();

        return;
      }

      // ==========================================
      // NEW REPAIR
      // ==========================================

      const repairId =
        await generateId(
          "repair"
        );

      const newRepair: Repair = {
        ...repairData,

        repairId,

        createdAt:
          new Date()
            .toISOString()
            .split("T")[0],

        timeline: [
          {
            status: "Received",

            note:
              "Repair Created",

            createdAt:
              new Date().toISOString(),
          },
        ],
      };

      // ==========================================
      // Sync Customer
      // ==========================================

      const customerDocId =
        await syncCustomer({
          name:
            repair.customer.name,

          mobile:
            repair.customer.mobile,

          alternateMobile:
            repair.customer
              .alternateMobile,

          email:
            repair.customer.email,

          address:
            repair.customer.address,

          city:
            repair.customer.city,

          state:
            repair.customer.state,

          pincode:
            repair.customer.pincode,

          repairId,
        });

      // ==========================================
      // Save Customer Firestore ID
      // ==========================================

      newRepair.customer.customerId =
        customerDocId;

      // ==========================================
      // Save New Repair
      // ==========================================

      await addRepair(
        newRepair
      );

      // ==========================================
      // WhatsApp - New Repair
      // ==========================================

      const whatsappResult =
        await sendStatusWhatsApp(
          newRepair,
          "Received"
        );

      // ==========================================
      // Feedback
      // ==========================================

      if (
        whatsappResult.sent
      ) {
        alert(
          "Repair Saved Successfully.\n\nWhatsApp status message sent successfully."
        );
      } else {
        console.error(
          "New repair WhatsApp failed:",
          whatsappResult.error
        );

        alert(
          "Repair Saved Successfully.\n\nWhatsApp status message could not be sent."
        );
      }

      // ==========================================
      // Reset Form
      // ==========================================

      setRepair(
        defaultRepair
      );

      originalStatusRef.current =
        null;

      statusChangedRef.current =
        false;

      onSuccess?.();
    } catch (error) {
      console.error(
        "Repair save error:",
        error
      );

      alert(
        "Failed to save repair."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="space-y-6"
    >

      {/* Customer */}

      <CustomerSection
        customer={repair.customer}
        setCustomer={(customer) =>
          setRepair((prev) => ({
            ...prev,
            customer,
          }))
        }
      />

      {/* Device */}

      <DeviceSection
        device={repair.device}
        setDevice={(device) =>
          setRepair((prev) => ({
            ...prev,
            device,
          }))
        }
      />

      {/* Accessories */}

      <AccessoriesSection
        accessories={
          repair.accessories
        }
        setAccessories={(
          accessories
        ) =>
          setRepair((prev) => ({
            ...prev,
            accessories,
          }))
        }
      />

      {/* Problem */}

      <ProblemSection
        problem={repair.problem}
        setProblem={(problem) =>
          setRepair((prev) => ({
            ...prev,
            problem,
          }))
        }
      />

      {/* Physical Condition */}

      <ConditionSection
        problem={repair.problem}
        setProblem={(problem) =>
          setRepair((prev) => ({
            ...prev,
            problem,
          }))
        }
      />

      {/* Estimate */}

      <EstimateSection
        estimate={repair.estimate}
        setEstimate={(estimate) =>
          setRepair((prev) => ({
            ...prev,
            estimate,
          }))
        }
      />

      {/* Status */}

      <StatusSection
        status={repair.status}
        setStatus={(status) => {
          statusChangedRef.current =
            true;

          setRepair((prev) => ({
            ...prev,
            status,
          }));
        }}
        warranty={repair.warranty}
        setWarranty={(warranty) =>
          setRepair((prev) => ({
            ...prev,
            warranty,
          }))
        }
        createdAt={repair.createdAt}
        setCreatedAt={(createdAt) =>
          setRepair((prev) => ({
            ...prev,
            createdAt,
          }))
        }
        deliveredAt={
          repair.deliveredAt ?? ""
        }
        setDeliveredAt={
          (deliveredAt) =>
            setRepair((prev) => ({
              ...prev,
              deliveredAt,
            }))
        }
      />

      {/* Notes */}

      <NotesSection
        remarks={repair.remarks}
        setRemarks={(remarks) =>
          setRepair((prev) => ({
            ...prev,
            remarks,
          }))
        }
      />

      {/* Action Buttons */}

      <div className="flex justify-end gap-4 pt-4">

        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setRepair(
              defaultRepair
            );

            originalStatusRef.current =
              null;

            statusChangedRef.current =
              false;
          }}
          className="rounded-xl border border-gray-600 px-6 py-3 font-semibold text-gray-300 transition hover:border-gray-500 hover:bg-[#202020] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : editRepair
            ? "Update Repair"
            : "Save Repair"}
        </button>

      </div>

    </form>
  );
}