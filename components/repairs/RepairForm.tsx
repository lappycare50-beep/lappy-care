"use client";

import { useEffect, useState } from "react";

import {
  Repair,
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

    } else {

      setRepair(defaultRepair);

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

  // ==========================================
  // Save Repair
  // ==========================================

  async function handleSave() {

    if (!validateRepair()) return;

    try {

      setLoading(true);

      // Recalculate Estimate

      const totalAmount =
        repair.estimate.labourCharge +
        repair.estimate.partsCharge -
        repair.estimate.discount;

      const balanceAmount =
        Math.max(
          totalAmount -
          repair.estimate.advancePaid,
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

      // ==========================
      // Update
      // ==========================

      if (editRepair?.id) {

        await updateRepair(
          editRepair.id,
          repairData
        );

        alert(
          "Repair Updated Successfully."
        );

        onSuccess?.();

        return;

      }

      // ==========================
      // Generate Repair ID
      // ==========================

      const repairId = await generateId("repair");

      // ==========================
      // New Repair
      // ==========================

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

const customerDocId = await syncCustomer({
  name: repair.customer.name,
  mobile: repair.customer.mobile,
  alternateMobile: repair.customer.alternateMobile,
  email: repair.customer.email,
  address: repair.customer.address,
  city: repair.customer.city,
  state: repair.customer.state,
  pincode: repair.customer.pincode,
  repairId,
});

// Save Customer Firestore Document ID in Repair
newRepair.customer.customerId = customerDocId;

      await addRepair(newRepair);

      alert(
        "Repair Saved Successfully."
      );

      setRepair(defaultRepair);

      onSuccess?.();

    } catch (error) {

      console.error(error);

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

      {/* ==========================
          Customer
      ========================== */}

      <CustomerSection
        customer={repair.customer}
        setCustomer={(customer) =>
          setRepair((prev) => ({
            ...prev,
            customer,
          }))
        }
      />

      {/* ==========================
          Device
      ========================== */}

      <DeviceSection
        device={repair.device}
        setDevice={(device) =>
          setRepair((prev) => ({
            ...prev,
            device,
          }))
        }
      />

      {/* ==========================
          Accessories
      ========================== */}

      <AccessoriesSection
        accessories={repair.accessories}
        setAccessories={(accessories) =>
          setRepair((prev) => ({
            ...prev,
            accessories,
          }))
        }
      />

      {/* ==========================
          Problem
      ========================== */}

      <ProblemSection
        problem={repair.problem}
        setProblem={(problem) =>
          setRepair((prev) => ({
            ...prev,
            problem,
          }))
        }
      />

      {/* ==========================
          Physical Condition
      ========================== */}

      <ConditionSection
        problem={repair.problem}
        setProblem={(problem) =>
          setRepair((prev) => ({
            ...prev,
            problem,
          }))
        }
      />

      {/* ==========================
          Estimate
      ========================== */}

      <EstimateSection
        estimate={repair.estimate}
        setEstimate={(estimate) =>
          setRepair((prev) => ({
            ...prev,
            estimate,
          }))
        }
      />
            {/* ==========================
          Status
      ========================== */}

      <StatusSection
        status={repair.status}
        setStatus={(status) =>
          setRepair((prev) => ({
            ...prev,
            status,
          }))
        }
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
        deliveredAt={repair.deliveredAt ?? ""}
        setDeliveredAt={(deliveredAt) =>
          setRepair((prev) => ({
            ...prev,
            deliveredAt,
          }))
        }
      />

      {/* ==========================
          Notes
      ========================== */}

      <NotesSection
        remarks={repair.remarks}
        setRemarks={(remarks) =>
          setRepair((prev) => ({
            ...prev,
            remarks,
          }))
        }
      />

      {/* ==========================
          Action Buttons
      ========================== */}

      <div className="flex justify-end gap-4 pt-4">

        <button
          type="button"
          disabled={loading}
          onClick={() => setRepair(defaultRepair)}
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
