"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";

import { Customer } from "@/types/customer";
import {
  ComponentStatus,
  HealthStatus,
  LaptopHealth,
} from "@/types/laptopHealth";

import { getCustomerById } from "@/services/customerService";

import {
  getLatestLaptopHealth,
  saveLaptopHealth,
} from "@/services/laptopHealthService";

/* ==========================================
   Page
========================================== */

export default function LaptopHealthPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [report, setReport] =
    useState<LaptopHealth | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* ==========================================
     Load Customer + Latest Report
  ========================================== */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const customerData =
          await getCustomerById(id);

        if (!customerData) {
          setError("Customer not found.");
          return;
        }

        setCustomer(customerData);

        const latest =
          await getLatestLaptopHealth(id);

        if (latest) {
          setReport(latest);
        } else {
          setReport(createEmptyReport(id));
        }

      } catch (err) {
        console.error(err);
        setError(
          "Unable to load laptop health report."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  /* ==========================================
     Loading
  ========================================== */

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-white">
          Loading Laptop Health Report...
        </div>
      </AdminLayout>
    );
  }

  /* ==========================================
     Error
  ========================================== */

  if (error || !customer || !report) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error || "Unable to load report."}
          </div>
        </div>
      </AdminLayout>
    );
  }

  /* ==========================================
     Update Field
  ========================================== */

  function updateField<K extends keyof LaptopHealth>(
    field: K,
    value: LaptopHealth[K]
  ) {
    setReport((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]: value,
      };
    });
  }

  /* ==========================================
     Number Field
  ========================================== */

  function updateNumberField(
    field: keyof LaptopHealth,
    value: string
  ) {
    const numberValue =
      value === ""
        ? undefined
        : Number(value);

    updateField(
      field as never,
      numberValue as never
    );
  }

  /* ==========================================
     Save Report
  ========================================== */

  async function handleSave() {
    if (!report) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const now =
        new Date().toISOString();

      const payload: Omit<
        LaptopHealth,
        "id"
      > = {
        ...report,

        customerId: id,

        checkedAt:
          report.checkedAt || now,

        createdAt:
          report.createdAt || now,

        updatedAt: now,
      };

      delete (
        payload as Partial<LaptopHealth>
      ).id;

      await saveLaptopHealth(
        id,
        payload
      );

      const latest =
        await getLatestLaptopHealth(id);

      if (latest) {
        setReport(latest);
      }

      setMessage(
        "Laptop health report saved successfully."
      );

    } catch (err) {
      console.error(err);

      setError(
        "Unable to save laptop health report."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>

      <div className="p-6">

        {/* ==========================================
            Header
        ========================================== */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/admin/customers/${id}`
                )
              }
              className="mb-3 text-sm text-gray-400 hover:text-white"
            >
              ← Back to Customer
            </button>

            <h1 className="text-2xl font-bold text-white">
              Laptop Health Report
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Create and maintain the customer's
              laptop health report.
            </p>

          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Health Report"}
          </button>

        </div>

        {/* ==========================================
            Messages
        ========================================== */}

        {message && (
          <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* ==========================================
            Customer
        ========================================== */}

        <section className="mb-5 rounded-2xl border border-gray-800 bg-[#151515] p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs uppercase tracking-wide text-gray-500">
                Customer
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                {customer.name}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Customer ID: {id}
              </p>

            </div>

            <div className="rounded-xl bg-black px-4 py-3">

              <p className="text-xs text-gray-500">
                Report Status
              </p>

              <p className="mt-1 text-sm font-semibold text-green-400">
                {report.id
                  ? "Existing Report"
                  : "New Report"}
              </p>

            </div>

          </div>

        </section>

        {/* ==========================================
            Laptop Details
        ========================================== */}

        <Section
          title="💻 Laptop Details"
          description="Basic laptop identification information."
        >

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <TextField
              label="Brand"
              value={report.brand}
              placeholder="Dell / HP / Lenovo..."
              onChange={(value) =>
                updateField("brand", value)
              }
            />

            <TextField
              label="Model"
              value={report.model}
              placeholder="Laptop model"
              onChange={(value) =>
                updateField("model", value)
              }
            />

            <TextField
              label="Serial Number"
              value={report.serialNumber}
              placeholder="Serial number"
              onChange={(value) =>
                updateField(
                  "serialNumber",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            System Information
        ========================================== */}

        <Section
          title="⚙️ System Information"
          description="Current system configuration."
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <TextField
              label="Processor"
              value={report.processor}
              placeholder="Intel Core i5 / Ryzen 5..."
              onChange={(value) =>
                updateField(
                  "processor",
                  value
                )
              }
            />

            <TextField
              label="RAM"
              value={report.ram}
              placeholder="8 GB / 16 GB..."
              onChange={(value) =>
                updateField(
                  "ram",
                  value
                )
              }
            />

            <TextField
              label="Storage"
              value={report.storage}
              placeholder="512 GB SSD..."
              onChange={(value) =>
                updateField(
                  "storage",
                  value
                )
              }
            />

            <TextField
              label="Operating System"
              value={
                report.operatingSystem
              }
              placeholder="Windows 11..."
              onChange={(value) =>
                updateField(
                  "operatingSystem",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Overall Health
        ========================================== */}

        <Section
          title="❤️ Overall Health"
          description="Final technician assessment."
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <NumberField
              label="Overall Health Score (%)"
              value={
                report.overallScore
              }
              min={0}
              max={100}
              onChange={(value) =>
                updateNumberField(
                  "overallScore",
                  value
                )
              }
            />

            <HealthStatusField
              label="Overall Status"
              value={
                report.overallStatus
              }
              onChange={(value) =>
                updateField(
                  "overallStatus",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Hardware Checks
        ========================================== */}

        <Section
          title="🔧 Hardware Checks"
          description="Test each major laptop component."
        >

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <ComponentField
              label="Display"
              value={report.display}
              onChange={(value) =>
                updateField(
                  "display",
                  value
                )
              }
            />

            <ComponentField
              label="Keyboard"
              value={report.keyboard}
              onChange={(value) =>
                updateField(
                  "keyboard",
                  value
                )
              }
            />

            <ComponentField
              label="Touchpad"
              value={report.touchpad}
              onChange={(value) =>
                updateField(
                  "touchpad",
                  value
                )
              }
            />

            <ComponentField
              label="Webcam"
              value={report.webcam}
              onChange={(value) =>
                updateField(
                  "webcam",
                  value
                )
              }
            />

            <ComponentField
              label="Microphone"
              value={report.microphone}
              onChange={(value) =>
                updateField(
                  "microphone",
                  value
                )
              }
            />

            <ComponentField
              label="Speakers"
              value={report.speakers}
              onChange={(value) =>
                updateField(
                  "speakers",
                  value
                )
              }
            />

            <ComponentField
              label="Wi-Fi"
              value={report.wifi}
              onChange={(value) =>
                updateField(
                  "wifi",
                  value
                )
              }
            />

            <ComponentField
              label="Bluetooth"
              value={report.bluetooth}
              onChange={(value) =>
                updateField(
                  "bluetooth",
                  value
                )
              }
            />

            <ComponentField
              label="USB Ports"
              value={report.usbPorts}
              onChange={(value) =>
                updateField(
                  "usbPorts",
                  value
                )
              }
            />

            <ComponentField
              label="HDMI Port"
              value={report.hdmiPort}
              onChange={(value) =>
                updateField(
                  "hdmiPort",
                  value
                )
              }
            />

            <ComponentField
              label="Charging Port"
              value={report.chargingPort}
              onChange={(value) =>
                updateField(
                  "chargingPort",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Cooling
        ========================================== */}

        <Section
          title="🌡️ Cooling"
          description="Temperature and cooling system."
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <NumberField
              label="Temperature (°C)"
              value={
                report.temperature
              }
              min={0}
              max={150}
              onChange={(value) =>
                updateNumberField(
                  "temperature",
                  value
                )
              }
            />

            <ComponentField
              label="Fan Status"
              value={
                report.fanStatus
              }
              onChange={(value) =>
                updateField(
                  "fanStatus",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Battery
        ========================================== */}

        <Section
          title="🔋 Battery Health"
          description="Battery condition and capacity."
        >

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <NumberField
              label="Battery Health (%)"
              value={
                report.batteryHealth
              }
              min={0}
              max={100}
              onChange={(value) =>
                updateNumberField(
                  "batteryHealth",
                  value
                )
              }
            />

            <ComponentField
              label="Battery Status"
              value={
                report.batteryStatus
              }
              onChange={(value) =>
                updateField(
                  "batteryStatus",
                  value
                )
              }
            />

            <NumberField
              label="Design Capacity"
              value={
                report.batteryDesignCapacity
              }
              min={0}
              onChange={(value) =>
                updateNumberField(
                  "batteryDesignCapacity",
                  value
                )
              }
            />

            <NumberField
              label="Full Charge Capacity"
              value={
                report.batteryFullChargeCapacity
              }
              min={0}
              onChange={(value) =>
                updateNumberField(
                  "batteryFullChargeCapacity",
                  value
                )
              }
            />

            <NumberField
              label="Battery Cycle Count"
              value={
                report.batteryCycleCount
              }
              min={0}
              onChange={(value) =>
                updateNumberField(
                  "batteryCycleCount",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Storage Health
        ========================================== */}

        <Section
          title="💾 SSD / HDD Health"
          description="Storage health and SMART information."
        >

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <NumberField
              label="Storage Health (%)"
              value={
                report.storageHealth
              }
              min={0}
              max={100}
              onChange={(value) =>
                updateNumberField(
                  "storageHealth",
                  value
                )
              }
            />

            <ComponentField
              label="Storage Status"
              value={
                report.storageStatus
              }
              onChange={(value) =>
                updateField(
                  "storageStatus",
                  value
                )
              }
            />

            <NumberField
              label="Storage Temperature (°C)"
              value={
                report.storageTemperature
              }
              min={0}
              max={150}
              onChange={(value) =>
                updateNumberField(
                  "storageTemperature",
                  value
                )
              }
            />

            <TextField
              label="SMART Status"
              value={
                report.smartStatus
              }
              placeholder="Healthy / Warning..."
              onChange={(value) =>
                updateField(
                  "smartStatus",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Security / Software
        ========================================== */}

        <Section
          title="🛡️ Security & Software"
          description="Basic software and security checks."
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <ComponentField
              label="Antivirus Status"
              value={
                report.antivirusStatus
              }
              onChange={(value) =>
                updateField(
                  "antivirusStatus",
                  value
                )
              }
            />

            <ComponentField
              label="Windows Update"
              value={
                report.windowsUpdateStatus
              }
              onChange={(value) =>
                updateField(
                  "windowsUpdateStatus",
                  value
                )
              }
            />

          </div>

        </Section>

        {/* ==========================================
            Service Recommendation
        ========================================== */}

        <Section
          title="📅 Next Service Recommendation"
          description="Tell the customer what should be done next."
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <TextField
              label="Next Service Date"
              type="date"
              value={
                report.nextServiceDate
              }
              onChange={(value) =>
                updateField(
                  "nextServiceDate",
                  value
                )
              }
            />

            <div className="sm:col-span-2">

              <TextAreaField
                label="Next Service Recommendation"
                value={
                  report.nextServiceRecommendation
                }
                placeholder="Example: Battery replacement recommended within 3 months."
                onChange={(value) =>
                  updateField(
                    "nextServiceRecommendation",
                    value
                  )
                }
              />

            </div>

          </div>

        </Section>

        {/* ==========================================
            Technician Notes
        ========================================== */}

        <Section
          title="📝 Technician Notes"
          description="Internal notes for Lappy Care staff."
        >

          <TextAreaField
            label="Technician Notes"
            value={
              report.technicianNotes
            }
            placeholder="Enter internal technician observations..."
            onChange={(value) =>
              updateField(
                "technicianNotes",
                value
              )
            }
          />

        </Section>

        {/* ==========================================
            Bottom Save
        ========================================== */}

        <div className="mt-6 flex justify-end">

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Health Report"}
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}

/* ==========================================
   Empty Report
========================================== */

function createEmptyReport(
  customerId: string
): LaptopHealth {

  const now =
    new Date().toISOString();

  return {
    customerId,
    overallScore: undefined,
    overallStatus: undefined,

    checkedAt: now,
    createdAt: now,
    updatedAt: now,
  };
}

/* ==========================================
   Section
========================================== */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5 rounded-2xl border border-gray-800 bg-[#151515] p-6">

      <div className="mb-5">

        <h2 className="text-lg font-bold text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {description}
        </p>

      </div>

      {children}

    </section>
  );
}

/* ==========================================
   Text Field
========================================== */

function TextField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>

      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500"
      />

    </label>
  );
}

/* ==========================================
   Number Field
========================================== */

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>

      <input
        type="number"
        value={
          value === undefined
            ? ""
            : value
        }
        min={min}
        max={max}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500"
      />

    </label>
  );
}

/* ==========================================
   Text Area
========================================== */

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>

      <textarea
        value={value ?? ""}
        placeholder={placeholder}
        rows={4}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full resize-y rounded-lg border border-gray-700 bg-black px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500"
      />

    </label>
  );
}

/* ==========================================
   Health Status Field
========================================== */

function HealthStatusField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: HealthStatus;
  onChange: (value: HealthStatus) => void;
}) {
  const options: HealthStatus[] = [
    "Excellent",
    "Good",
    "Fair",
    "Needs Attention",
    "Critical",
  ];

  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>

      <select
        value={value ?? ""}
        onChange={(event) => {

          const selected =
            event.target.value as HealthStatus;

          if (selected) {
            onChange(selected);
          }

        }}
        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-yellow-500"
      >

        <option value="">
          Not Tested
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </label>
  );
}

/* ==========================================
   Component Status Field
========================================== */

function ComponentField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: ComponentStatus;
  onChange: (value: ComponentStatus) => void;
}) {
  const options: ComponentStatus[] = [
    "Good",
    "Fair",
    "Needs Attention",
    "Not Tested",
    "Not Applicable",
  ];

  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>

      <select
        value={value ?? "Not Tested"}
        onChange={(event) =>
          onChange(
            event.target.value as ComponentStatus
          )
        }
        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-yellow-500"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </label>
  );
}