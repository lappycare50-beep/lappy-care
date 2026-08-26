"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";

import AdminLayout from "@/components/admin/AdminLayout";
import CustomerProfile from "@/components/customers/CustomerProfile";

import { Customer } from "@/types/customer";

import {
  getCustomerById,
} from "@/services/customerService";

import {
  getLatestLaptopHealth,
} from "@/services/laptopHealthService";

import { LaptopHealth } from "@/types/laptopHealth";

export default function CustomerProfilePage() {

  const params = useParams();

  const id = params.id as string;

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [health, setHealth] =
    useState<LaptopHealth | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadCustomer() {

      try {

        setLoading(true);

        const data =
          await getCustomerById(id);

        setCustomer(data);

        if (data) {

          try {

            const healthData =
              await getLatestLaptopHealth(id);

            setHealth(healthData);

          } catch (healthError) {

            console.error(
              "Unable to load laptop health:",
              healthError
            );

            setHealth(null);

          }

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (id) {
      loadCustomer();
    }

  }, [id]);

  if (loading) {

    return (

      <AdminLayout>

        <div className="p-10 text-white">
          Loading Customer...
        </div>

      </AdminLayout>

    );

  }

  if (!customer) {

    return (

      <AdminLayout>

        <div className="p-10 text-red-400">
          Customer Not Found
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="space-y-6">

        {/* ==========================================
            Existing Customer Profile
        ========================================== */}

        <CustomerProfile
          customer={customer}
        />

        {/* ==========================================
            Laptop Health Summary
        ========================================== */}

        <LaptopHealthSummary
          customerId={id}
          health={health}
        />

      </div>

    </AdminLayout>

  );
}

// ==========================================
// Laptop Health Summary
// ==========================================

function LaptopHealthSummary({
  customerId,
  health,
}: {
  customerId: string;
  health: LaptopHealth | null;
}) {

  if (!health) {

    return (

      <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-lg font-bold">
              💻 Laptop Health
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              No laptop health report has been created yet.
            </p>

          </div>

          <Link
            href={`/admin/customers/${customerId}/laptop-health`}
            className="rounded-lg bg-white px-5 py-2.5 text-center text-sm font-semibold text-black hover:bg-gray-200"
          >
            + Add Health Report
          </Link>

        </div>

      </section>

    );

  }

  return (

    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">

      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-lg font-bold">
            💻 Laptop Health
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Latest laptop health assessment
          </p>

        </div>

        <Link
          href={`/admin/customers/${customerId}/laptop-health`}
          className="rounded-lg border border-gray-700 bg-gray-950 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-gray-800"
        >
          View / Update Report
        </Link>

      </div>

      {/* ==========================================
          Laptop
      ========================================== */}

      <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-4">

        <div className="flex flex-col gap-1">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Laptop
          </p>

          <p className="text-base font-semibold text-white">
            {health.brand || "Unknown Brand"}
            {health.model
              ? ` ${health.model}`
              : ""}
          </p>

          {health.serialNumber && (
            <p className="text-xs text-gray-500">
              S/N: {health.serialNumber}
            </p>
          )}

        </div>

      </div>

      {/* ==========================================
          Health Cards
      ========================================== */}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <HealthCard
          icon="❤️"
          label="Overall Health"
          value={
            health.overallScore !== undefined &&
            health.overallScore !== null
              ? `${health.overallScore}%`
              : "—"
          }
          status={
            health.overallStatus ||
            "Not Available"
          }
        />

        <HealthCard
          icon="🔋"
          label="Battery Health"
          value={
            health.batteryHealth !== undefined &&
            health.batteryHealth !== null
              ? `${health.batteryHealth}%`
              : "—"
          }
          status={
            health.batteryStatus ||
            "Not Available"
          }
        />

        <HealthCard
          icon="💾"
          label="SSD / HDD Health"
          value={
            health.storageHealth !== undefined &&
            health.storageHealth !== null
              ? `${health.storageHealth}%`
              : "—"
          }
          status={
            health.storageStatus ||
            "Not Available"
          }
        />

        <HealthCard
          icon="🌡️"
          label="Temperature"
          value={
            health.temperature
              ? `${health.temperature}°C`
              : "—"
          }
          status={
            health.fanStatus ||
            "Not Available"
          }
        />

      </div>

      {/* ==========================================
          System Information
      ========================================== */}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <InfoCard
          label="Processor"
          value={
            health.processor || "Not Available"
          }
        />

        <InfoCard
          label="RAM"
          value={
            health.ram || "Not Available"
          }
        />

        <InfoCard
          label="Storage"
          value={
            health.storage || "Not Available"
          }
        />

        <InfoCard
          label="Operating System"
          value={
            health.operatingSystem ||
            "Not Available"
          }
        />

      </div>

      {/* ==========================================
          Next Service
      ========================================== */}

      <div className="mt-5 rounded-xl border border-gray-800 bg-gray-950 p-4">

        <div className="grid gap-4 sm:grid-cols-2">

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Next Service
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {health.nextServiceDate ||
                "Not scheduled"}
            </p>

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Recommendation
            </p>

            <p className="mt-1 text-sm text-gray-300">
              {health.nextServiceRecommendation ||
                "No recommendation added."}
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          Last Checked
      ========================================== */}

      <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:justify-between">

        <span>
          Last checked:{" "}
          {formatDate(health.checkedAt)}
        </span>

        <span>
          Report ID:{" "}
          {health.id || "—"}
        </span>

      </div>

    </section>

  );
}

// ==========================================
// Health Card
// ==========================================

function HealthCard({
  icon,
  label,
  value,
  status,
}: {
  icon: string;
  label: string;
  value: string;
  status: string;
}) {

  return (

    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-lg">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs text-gray-500">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 truncate text-xs text-gray-400">
            {status}
          </p>

        </div>

      </div>

    </div>

  );
}

// ==========================================
// Info Card
// ==========================================

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-white">
        {value}
      </p>

    </div>

  );
}

// ==========================================
// Date Formatter
// ==========================================

function formatDate(
  value?: string
) {

  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}