"use client";

import { useEffect, useRef, useState } from "react";

import { Repair, RepairStatus } from "@/types/repair";

import CustomerSection from "./CustomerSection";
import DeviceSection from "./DeviceSection";
import AccessoriesSection from "./AccessoriesSection";
import ProblemSection from "./ProblemSection";
import ConditionSection from "./ConditionSection";
import EstimateSection from "./EstimateSection";
import StatusSection from "./StatusSection";
import NotesSection from "./NotesSection";

import { addRepair, updateRepair } from "@/services/repairService";
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
  createdAt: new Date().toISOString().split("T")[0],
  updatedAt: "",
  deliveredAt: "",
  timeline: [],
};

function createFreshRepair(): Repair {
  return {
    ...defaultRepair,
    customer: { ...defaultRepair.customer },
    device: { ...defaultRepair.device, devicePhotos: [] },
    accessories: { ...defaultRepair.accessories, items: [] },
    problem: { ...defaultRepair.problem },
    estimate: { ...defaultRepair.estimate },
    timeline: [],
  };
}

export default function RepairForm({
  editRepair,
  onSuccess,
}: Props) {
  const [repair, setRepair] = useState<Repair>(createFreshRepair());
  const [loading, setLoading] = useState(false);

  const originalStatusRef = useRef<RepairStatus | null>(null);
  const statusChangedRef = useRef(false);

  useEffect(() => {
    if (editRepair) {
      setRepair({
        ...createFreshRepair(),
        ...editRepair,
        customer: {
          ...createFreshRepair().customer,
          ...editRepair.customer,
        },
        device: {
          ...createFreshRepair().device,
          ...editRepair.device,
          devicePhotos: editRepair.device?.devicePhotos || [],
        },
        accessories: {
          ...createFreshRepair().accessories,
          ...editRepair.accessories,
        },
        problem: {
          ...createFreshRepair().problem,
          ...editRepair.problem,
        },
        estimate: {
          ...createFreshRepair().estimate,
          ...editRepair.estimate,
        },
        timeline: editRepair.timeline || [],
      });

      originalStatusRef.current = editRepair.status;
      statusChangedRef.current = false;
      return;
    }

    setRepair(createFreshRepair());
    originalStatusRef.current = null;
    statusChangedRef.current = false;
  }, [editRepair]);

  function validateRepair() {
    if (!repair.customer.name.trim()) {
      alert("Customer Name is required.");
      return false;
    }

    const mobile = repair.customer.mobile.trim();

    if (!mobile) {
      alert("Mobile Number is required.");
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
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
      alert("Customer Complaint is required.");
      return false;
    }

    return true;
  }

  // ===================================================
  // WHATSAPP MESSAGE
  //
  // Tracking ID + Tracking URL are added ONLY for
  // the "Received" status.
  // ===================================================

  function buildStatusWhatsAppMessage(
    repairData: Repair,
    newStatus: RepairStatus
  ) {
    const customerName =
      repairData.customer.name?.trim() || "Customer";

    const repairId =
      repairData.repairId?.trim() || "-";

    const deviceName = [
      repairData.device.brand?.trim(),
      repairData.device.model?.trim(),
    ]
      .filter(Boolean)
      .join(" ");

    const trackingUrl =
      repairId !== "-"
        ? `https://lappycarepune.in/track/${encodeURIComponent(repairId)}`
        : "";

    switch (newStatus) {
      case "Received":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

We have received your laptop for repair.

🔹 Repair ID: ${repairId}
🔹 Tracking ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Repair Received

Our technician will diagnose the device and keep you informed about the next update.

🔗 Track Your Repair:
${trackingUrl}

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Diagnosing":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop is currently under diagnosis.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Diagnosis in Progress

Our technician is checking the device to identify the issue. We will update you once the diagnosis is completed.

Thank you for your patience.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Waiting Approval":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop diagnosis has been completed and the repair is awaiting your approval.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Waiting for Approval

Please confirm your approval so that we can proceed with the repair work.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Waiting Parts":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop repair is currently waiting for the required parts.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Waiting for Parts

We are arranging the required parts and will continue the repair as soon as they are available.

Thank you for your patience and understanding.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Repairing":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Repair work on your laptop is currently in progress.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Repair in Progress

Our technician is working on the required repairs. We will keep you updated on further progress.

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Testing":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

The repair work on your laptop has been completed and the device is now undergoing final testing.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Final Testing

We are checking the device to ensure everything is functioning properly before delivery.

Thank you for your patience.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Ready":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your laptop repair has been completed successfully.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

✅ Status: Ready for Pickup

Your repaired laptop is now ready for collection from Lappy Care.

Thank you for trusting us with your device.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Delivered":
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Your repaired laptop has been successfully delivered.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

✅ Status: Delivered

Thank you for choosing Lappy Care. We truly appreciate your trust in our service.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      case "Cancelled":
        return `Hello ${customerName},

Greetings from Lappy Care.

Your laptop repair request has been cancelled.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: Repair Cancelled

For any clarification or assistance, please contact us.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;

      default:
        return `Hello ${customerName},

Greetings from Lappy Care! 👋

Here is an update regarding your laptop repair.

🔹 Repair ID: ${repairId}
🔹 Device: ${deviceName || "Laptop"}

📌 Status: ${newStatus}

Thank you for choosing Lappy Care.

📞 95950 57006

Regards,
Lappy Care
Laptop Repair & Service`;
    }
  }

  async function sendStatusWhatsApp(
    repairData: Repair,
    newStatus: RepairStatus
  ) {
    const mobile =
      repairData.customer.mobile?.replace(/\D/g, "");

    if (!mobile) {
      return {
        sent: false,
        error: "Customer mobile number is missing.",
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
      const response = await fetch(
        "/api/whatsapp/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: whatsappNumber,
            message,
          }),
        }
      );

      let data: unknown = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      const result = data as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.success) {
        return {
          sent: false,
          error:
            result?.error ||
            "WhatsApp message failed.",
        };
      }

      return { sent: true };
    } catch (error) {
      console.error("WhatsApp error:", error);

      return {
        sent: false,
        error:
          error instanceof Error
            ? error.message
            : "WhatsApp message failed.",
      };
    }
  }

  async function handleSave() {
    if (!validateRepair()) {
      return;
    }

    try {
      setLoading(true);

      const labourCharge = Math.max(
        Number(
          repair.estimate.labourCharge || 0
        ),
        0
      );

      const partsCharge = Math.max(
        Number(
          repair.estimate.partsCharge || 0
        ),
        0
      );

      const discount = Math.max(
        Number(
          repair.estimate.discount || 0
        ),
        0
      );

      const advancePaid = Math.max(
        Number(
          repair.estimate.advancePaid || 0
        ),
        0
      );

      const totalAmount = Math.max(
        labourCharge +
          partsCharge -
          discount,
        0
      );

      const balanceAmount = Math.max(
        totalAmount -
          advancePaid,
        0
      );

      const repairData: Repair = {
        ...repair,
        estimate: {
          ...repair.estimate,
          labourCharge,
          partsCharge,
          discount,
          advancePaid,
          totalAmount,
          balanceAmount,
        },
        updatedAt:
          new Date().toISOString(),
      };

      // =================================================
      // EDIT
      // =================================================

      if (editRepair?.id) {
        const oldStatus =
          editRepair.status;

        const newStatus =
          repairData.status;

        const shouldSendWhatsApp =
          statusChangedRef.current &&
          oldStatus !== newStatus;

        await updateRepair(
          editRepair.id,
          repairData
        );

        if (shouldSendWhatsApp) {
          const whatsappResult =
            await sendStatusWhatsApp(
              repairData,
              newStatus
            );

          if (whatsappResult.sent) {
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

      // =================================================
      // NEW REPAIR
      // =================================================

      const repairId =
        await generateId("repair");

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
            note: "Repair Created",
            createdAt:
              new Date().toISOString(),
          },
        ],
      };

      // =================================================
      // CUSTOMER SYNC
      // =================================================

      const customerDocId =
        await syncCustomer({
          name: newRepair.customer.name,
          mobile: newRepair.customer.mobile,
          alternateMobile:
            newRepair.customer.alternateMobile,
          email: newRepair.customer.email,
          address: newRepair.customer.address,
          city: newRepair.customer.city,
          state: newRepair.customer.state,
          pincode: newRepair.customer.pincode,
          repairId: newRepair.repairId,
        });

      newRepair.customer.customerId =
        customerDocId;

      // =================================================
      // SAVE REPAIR
      // =================================================

      await addRepair(newRepair);

      // =================================================
      // WHATSAPP
      // =================================================

      const whatsappResult =
        await sendStatusWhatsApp(
          newRepair,
          "Received"
        );

      if (whatsappResult.sent) {
        alert(
          "Repair Saved Successfully.\n\nWhatsApp status message sent successfully."
        );
      } else {
        console.error(
          "WhatsApp failed:",
          whatsappResult.error
        );

        alert(
          "Repair Saved Successfully.\n\nWhatsApp status message could not be sent."
        );
      }

      setRepair(
        createFreshRepair()
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
        error instanceof Error
          ? error.message
          : "Failed to save repair."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void handleSave();
      }}
      className="space-y-6"
    >
      <CustomerSection
        customer={
          repair.customer
        }
        setCustomer={(customer) =>
          setRepair(
            (previous) => ({
              ...previous,
              customer,
            })
          )
        }
      />

      <DeviceSection
        device={
          repair.device
        }
        setDevice={(device) =>
          setRepair(
            (previous) => ({
              ...previous,
              device,
            })
          )
        }
      />

      <AccessoriesSection
        accessories={
          repair.accessories
        }
        setAccessories={(accessories) =>
          setRepair(
            (previous) => ({
              ...previous,
              accessories,
            })
          )
        }
      />

      <ProblemSection
        problem={
          repair.problem
        }
        setProblem={(problem) =>
          setRepair(
            (previous) => ({
              ...previous,
              problem,
            })
          )
        }
      />

      <ConditionSection
        problem={
          repair.problem
        }
        setProblem={(problem) =>
          setRepair(
            (previous) => ({
              ...previous,
              problem,
            })
          )
        }
      />

      <EstimateSection
        estimate={
          repair.estimate
        }
        setEstimate={(estimate) =>
          setRepair(
            (previous) => ({
              ...previous,
              estimate,
            })
          )
        }
      />

      <StatusSection
        status={
          repair.status
        }
        setStatus={(status) => {
          statusChangedRef.current =
            true;

          setRepair(
            (previous) => ({
              ...previous,
              status,
            })
          );
        }}
        warranty={
          repair.warranty
        }
        setWarranty={(warranty) =>
          setRepair(
            (previous) => ({
              ...previous,
              warranty,
            })
          )
        }
        createdAt={
          repair.createdAt
        }
        setCreatedAt={(createdAt) =>
          setRepair(
            (previous) => ({
              ...previous,
              createdAt,
            })
          )
        }
        deliveredAt={
          repair.deliveredAt || ""
        }
        setDeliveredAt={(
          deliveredAt
        ) =>
          setRepair(
            (previous) => ({
              ...previous,
              deliveredAt,
            })
          )
        }
      />

      <NotesSection
        remarks={
          repair.remarks
        }
        setRemarks={(remarks) =>
          setRepair(
            (previous) => ({
              ...previous,
              remarks,
            })
          )
        }
      />

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setRepair(
              createFreshRepair()
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
