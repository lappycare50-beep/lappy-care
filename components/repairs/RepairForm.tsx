"use client";

import { useEffect, useState } from "react";

import CustomerSection from "./CustomerSection";
import DeviceSection from "./DeviceSection";
import RepairSection from "./RepairSection";
import PaymentSection from "./PaymentSection";
import StatusSection from "./StatusSection";
import NotesSection from "./NotesSection";

import {
  addRepair,
  updateRepair,
} from "@/services/repairService";

import {
  PaymentStatus,
  Priority,
  Repair,
  RepairStatus,
} from "@/types/repair";

type RepairFormProps = {
  repair?: Repair | null;
  onSuccess?: () => void;
};

export default function RepairForm({
  repair,
  onSuccess,
}: RepairFormProps) {

  // ==========================
  // Customer
  // ==========================

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // ==========================
  // Device
  // ==========================

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [image, setImage] = useState("");

  // ==========================
  // Repair
  // ==========================

  const [problem, setProblem] = useState("");
  const [accessories, setAccessories] = useState("");

  const [technician, setTechnician] =
    useState("");

  const [priority, setPriority] =
    useState<Priority>("Medium");

  // ==========================
  // Payment
  // ==========================

  const [estimatedCost, setEstimatedCost] =
    useState(0);

  const [finalCost, setFinalCost] =
    useState(0);

  const [advancePaid, setAdvancePaid] =
    useState(0);

  const [balanceAmount, setBalanceAmount] =
    useState(0);

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("Pending");

  // ==========================
  // Status
  // ==========================

  const [status, setStatus] =
    useState<RepairStatus>("Received");

  const today =
    new Date().toISOString().split("T")[0];

  const [createdAt, setCreatedAt] =
    useState(today);

  const [deliveredAt, setDeliveredAt] =
    useState("");

  const [warranty, setWarranty] =
    useState("No Warranty");

  // ==========================
  // Notes
  // ==========================

  const [remarks, setRemarks] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // Edit Mode
  // ==========================

  useEffect(() => {
    if (!repair) return;

    setCustomerName(repair.customerName);
    setMobile(repair.mobile);
    setEmail(repair.email ?? "");

    setBrand(repair.brand);
    setModel(repair.model);
    setSerialNo(repair.serialNo);

    setProblem(repair.problem);
    setAccessories(repair.accessories);

    setTechnician(repair.technician);

    setEstimatedCost(repair.estimatedCost);
    setFinalCost(repair.finalCost);

    setAdvancePaid(repair.advancePaid);
    setBalanceAmount(repair.balanceAmount);

    setPaymentStatus(repair.paymentStatus);

    setStatus(repair.status);

    setCreatedAt(repair.createdAt);
    setDeliveredAt(repair.deliveredAt ?? "");

    setWarranty(repair.warranty ?? "No Warranty");

    setRemarks(repair.remarks ?? "");
    setImage(repair.image ?? "");

  }, [repair]);

    // ==========================
  // Save Repair
  // ==========================

  async function handleSubmit() {
    if (
      !customerName ||
      !mobile ||
      !brand ||
      !model ||
      !problem
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Auto Repair ID
      const repairId =
        repair?.repairId ??
        `LC${Date.now().toString().slice(-8)}`;

      const repairData: Omit<Repair, "id"> = {
        repairId,

        // Customer
        customerName,
        mobile,
        email,

        // Device
        brand,
        model,
        serialNo,
        image,

        // Repair
        problem,
        accessories,
        technician,
        priority,

        // Payment
        estimatedCost,
        finalCost,
        advancePaid,
        balanceAmount,
        paymentStatus,

        // Status
        status,

        // Dates
        createdAt,
        updatedAt: new Date().toISOString(),
        deliveredAt,

        // Extra
        warranty,
        remarks,
      };

      if (repair?.id) {
        await updateRepair(repair.id, repairData);

        alert("✅ Repair Updated Successfully");
      } else {
        await addRepair(repairData);

        alert("✅ Repair Added Successfully");
      }

      // ==========================
      // Reset Form
      // ==========================

      setCustomerName("");
      setMobile("");
      setEmail("");

      setBrand("");
      setModel("");
      setSerialNo("");
      setImage("");

      setProblem("");
      setAccessories("");

      setTechnician("");
      setPriority("Medium");

      setEstimatedCost(0);
      setFinalCost(0);
      setAdvancePaid(0);
      setBalanceAmount(0);

      setPaymentStatus("Pending");

      setStatus("Received");

      setCreatedAt(today);
      setDeliveredAt("");

      setWarranty("No Warranty");

      setRemarks("");

      onSuccess?.();

    } catch (error) {
      console.error(error);

      alert("Failed to save repair.");
    } finally {
      setLoading(false);
    }
  }
    return (
    <div className="space-y-8">

      {/* Customer Details */}

      <CustomerSection
        customerName={customerName}
        setCustomerName={setCustomerName}

        mobile={mobile}
        setMobile={setMobile}

        email={email}
        setEmail={setEmail}
      />

      {/* Device Details */}

      <DeviceSection
        brand={brand}
        setBrand={setBrand}

        model={model}
        setModel={setModel}

        serialNo={serialNo}
        setSerialNo={setSerialNo}

        image={image}
        setImage={setImage}
      />
            {/* Repair Details */}

      <RepairSection
        problem={problem}
        setProblem={setProblem}

        accessories={accessories}
        setAccessories={setAccessories}

        technician={technician}
        setTechnician={setTechnician}

        priority={priority}
        setPriority={setPriority}
      />

      {/* Payment */}

      <PaymentSection
        estimatedCost={estimatedCost}
        setEstimatedCost={setEstimatedCost}

        finalCost={finalCost}
        setFinalCost={setFinalCost}

        advancePaid={advancePaid}
        setAdvancePaid={setAdvancePaid}

        balanceAmount={balanceAmount}
        setBalanceAmount={setBalanceAmount}

        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
      />

      {/* Status */}

      <StatusSection
        status={status}
        setStatus={setStatus}

        warranty={warranty}
        setWarranty={setWarranty}

        createdAt={createdAt}
        setCreatedAt={setCreatedAt}

        deliveredAt={deliveredAt}
        setDeliveredAt={setDeliveredAt}
      />

      {/* Notes */}

      <NotesSection
        remarks={remarks}
        setRemarks={setRemarks}
      />
            {/* Save Button */}

      <div className="flex justify-end">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-yellow-400 px-10 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? repair
              ? "Updating..."
              : "Saving..."
            : repair
            ? "Update Repair"
            : "Save Repair"}
        </button>

      </div>

    </div>
  );
}