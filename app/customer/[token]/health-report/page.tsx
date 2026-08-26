import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getCustomerByQrToken } from "@/services/customerQrService";
import { getLatestLaptopHealth } from "@/services/laptopHealthService";

import {
  LaptopHealth,
  ComponentStatus,
} from "@/types/laptopHealth";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function CustomerLaptopHealthPage({
  params,
}: Props) {
  const { token } = await params;

  const decodedToken = decodeURIComponent(token);

  const customer = await getCustomerByQrToken(decodedToken);

  if (!customer || customer.isActive === false) {
    notFound();
  }

  /*
   * Health records may be stored using either:
   * 1. Firestore customer document ID
   * 2. Public customerId
   *
   * Try the document ID first and keep customerId
   * as a compatibility fallback.
   */
  let health = await getLatestLaptopHealth(
    customer.id || customer.customerId
  );

  if (!health && customer.id && customer.customerId) {
    health = await getLatestLaptopHealth(
      customer.customerId
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-5 text-slate-900 sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-2xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <section className="rounded-3xl bg-black p-6 text-white shadow-lg sm:p-7">

          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-400">
            LAPPY CARE
          </p>

          <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Laptop Health Certificate
          </h1>

          <p className="mt-1 text-xs text-white/70">
            Verified laptop health assessment prepared by Lappy Care.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">

            <HeaderStat
              label="Customer ID"
              value={customer.customerId}
            />

            <HeaderStat
              label="Report Type"
              value="Health Assessment"
            />

            <HeaderStat
              label="Report Status"
              value="Verified"
              success
            />

          </div>

        </section>


        {/* ==================================================
            REPORT
        ================================================== */}

        {!health ? (
          <NoHealthReport />
        ) : (
          <div className="mt-4 space-y-4">

            {/* Overall */}
            <OverallHealthCard health={health} />


            {/* Laptop Information */}
            <InfoSection
              icon="💻"
              title="Laptop Information"
              description="System and device information"
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                <InfoValue
                  label="Brand"
                  value={health.brand}
                />

                <InfoValue
                  label="Model"
                  value={health.model}
                />

                <InfoValue
                  label="Serial Number"
                  value={health.serialNumber}
                />

                <InfoValue
                  label="Processor"
                  value={health.processor}
                />

                <InfoValue
                  label="RAM"
                  value={health.ram}
                />

                <InfoValue
                  label="Storage"
                  value={health.storage}
                />

                <InfoValue
                  label="Operating System"
                  value={health.operatingSystem}
                />

              </div>
            </InfoSection>


            {/* Quick Overview */}
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              <MiniHealthCard
                icon="🔋"
                label="Battery"
                value={
                  health.batteryHealth !== undefined
                    ? `${health.batteryHealth}%`
                    : "Not Tested"
                }
                status={health.batteryStatus}
              />

              <MiniHealthCard
                icon="💾"
                label="Storage"
                value={
                  health.storageHealth !== undefined
                    ? `${health.storageHealth}%`
                    : "Not Tested"
                }
                status={health.storageStatus}
              />

              <MiniHealthCard
                icon="🌡️"
                label="Temperature"
                value={
                  health.temperature !== undefined
                    ? `${health.temperature}°C`
                    : "Not Tested"
                }
                status={health.fanStatus}
              />

              <MiniHealthCard
                icon="🛡️"
                label="Security"
                value={
                  health.antivirusStatus || "Not Tested"
                }
                status={health.antivirusStatus}
              />

            </section>


            {/* Battery */}
            <InfoSection
              icon="🔋"
              title="Battery Health"
              description="Battery condition and capacity"
            >

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                <HealthMetric
                  label="Battery Health"
                  value={
                    health.batteryHealth !== undefined
                      ? `${health.batteryHealth}%`
                      : "Not Tested"
                  }
                  score={health.batteryHealth}
                />

                <StatusMetric
                  label="Battery Status"
                  status={health.batteryStatus}
                />

                <SimpleMetric
                  label="Cycle Count"
                  value={
                    health.batteryCycleCount !== undefined
                      ? String(health.batteryCycleCount)
                      : "Not Tested"
                  }
                />

              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">

                <SimpleMetric
                  label="Design Capacity"
                  value={
                    health.batteryDesignCapacity !== undefined
                      ? `${health.batteryDesignCapacity} mWh`
                      : "Not Tested"
                  }
                />

                <SimpleMetric
                  label="Full Charge Capacity"
                  value={
                    health.batteryFullChargeCapacity !== undefined
                      ? `${health.batteryFullChargeCapacity} mWh`
                      : "Not Tested"
                  }
                />

              </div>

            </InfoSection>


            {/* Storage */}
            <InfoSection
              icon="💾"
              title="SSD / HDD Health"
              description="Storage health and performance"
            >

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                <HealthMetric
                  label="Storage Health"
                  value={
                    health.storageHealth !== undefined
                      ? `${health.storageHealth}%`
                      : "Not Tested"
                  }
                  score={health.storageHealth}
                />

                <StatusMetric
                  label="Storage Status"
                  status={health.storageStatus}
                />

                <SimpleMetric
                  label="Temperature"
                  value={
                    health.storageTemperature !== undefined
                      ? `${health.storageTemperature}°C`
                      : "Not Tested"
                  }
                />

              </div>

              <div className="mt-3">

                <SimpleMetric
                  label="SMART Status"
                  value={health.smartStatus || "Not Tested"}
                  fullWidth
                />

              </div>

            </InfoSection>


            {/* Hardware */}
            <InfoSection
              icon="🔧"
              title="Hardware Health"
              description="Component-by-component inspection"
            >

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

                <StatusMetric
                  label="Display"
                  status={health.display}
                />

                <StatusMetric
                  label="Keyboard"
                  status={health.keyboard}
                />

                <StatusMetric
                  label="Touchpad"
                  status={health.touchpad}
                />

                <StatusMetric
                  label="Webcam"
                  status={health.webcam}
                />

                <StatusMetric
                  label="Microphone"
                  status={health.microphone}
                />

                <StatusMetric
                  label="Speakers"
                  status={health.speakers}
                />

                <StatusMetric
                  label="Wi-Fi"
                  status={health.wifi}
                />

                <StatusMetric
                  label="Bluetooth"
                  status={health.bluetooth}
                />

                <StatusMetric
                  label="USB Ports"
                  status={health.usbPorts}
                />

                <StatusMetric
                  label="HDMI Port"
                  status={health.hdmiPort}
                />

                <StatusMetric
                  label="Charging Port"
                  status={health.chargingPort}
                />

                <StatusMetric
                  label="Fan"
                  status={health.fanStatus}
                />

              </div>

            </InfoSection>


            {/* Cooling */}
            <InfoSection
              icon="🌡️"
              title="Cooling & Temperature"
              description="Thermal condition of the laptop"
            >

              <div className="grid grid-cols-2 gap-3">

                <SimpleMetric
                  label="Temperature"
                  value={
                    health.temperature !== undefined
                      ? `${health.temperature}°C`
                      : "Not Tested"
                  }
                />

                <StatusMetric
                  label="Fan Status"
                  status={health.fanStatus}
                />

              </div>

            </InfoSection>


            {/* Security */}
            <InfoSection
              icon="🛡️"
              title="Software & Security"
              description="System protection and update status"
            >

              <div className="grid grid-cols-2 gap-3">

                <StatusMetric
                  label="Antivirus"
                  status={health.antivirusStatus}
                />

                <StatusMetric
                  label="Windows Update"
                  status={health.windowsUpdateStatus}
                />

              </div>

            </InfoSection>


            {/* Technician Notes */}
            {health.technicianNotes && (
              <InfoSection
                icon="📝"
                title="Technician Notes"
                description="Additional observations from Lappy Care"
              >
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {health.technicianNotes}
                </p>
              </InfoSection>
            )}


            {/* Recommendation */}
            {(health.nextServiceDate ||
              health.nextServiceRecommendation) && (
              <RecommendationCard health={health} />
            )}


            {/* Privacy */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  🔒
                </div>

                <div>

                  <h2 className="text-sm font-black text-slate-900">
                    Customer Privacy
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Personal mobile number, email address and
                    residential address are not displayed in this
                    public health report.
                  </p>

                </div>

              </div>

            </section>

          </div>
        )}


        {/* ==================================================
            BACK
        ================================================== */}

        <div className="mt-5 flex justify-center">

          <a
            href={`/customer/${encodeURIComponent(decodedToken)}`}
            className="rounded-xl bg-black px-6 py-3 text-xs font-black text-white transition hover:bg-slate-800"
          >
            ← Back to Customer Portal
          </a>

        </div>


        <footer className="px-2 py-7 text-center">

          <p className="text-[10px] text-slate-500">
            Lappy Care • Laptop Health Certificate
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            Professional laptop care & maintenance
          </p>

        </footer>

      </div>
    </main>
  );
}


/* ==================================================
   HEADER STAT
================================================== */

function HeaderStat({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-3">

      <p className="text-[8px] font-bold uppercase tracking-wide text-white/50">
        {label}
      </p>

      <p
        className={`mt-1 break-words text-[10px] font-black ${
          success
            ? "text-green-400"
            : "text-white"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


/* ==================================================
   OVERALL HEALTH
================================================== */

function OverallHealthCard({
  health,
}: {
  health: LaptopHealth;
}) {
  const score = Math.min(
    100,
    Math.max(0, health.overallScore ?? 0)
  );

  const status =
    health.overallStatus || "Not Tested";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="bg-black p-5 text-white sm:p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
              Overall Health
            </p>

            <h2 className="mt-1 text-2xl font-black">
              {status}
            </h2>

            <p className="mt-1 text-xs text-white/60">
              Latest technician assessment
            </p>

          </div>


          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/20 bg-white/10">

            <div className="text-center">

              <p className="text-xl font-black">
                {score}%
              </p>

              <p className="text-[8px] text-white/60">
                HEALTH
              </p>

            </div>

          </div>

        </div>


        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-white"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>


      <div className="grid grid-cols-2 divide-x divide-slate-100">

        <div className="p-4 text-center">

          <p className="text-[10px] uppercase tracking-wide text-slate-500">
            Report Status
          </p>

          <p className="mt-1 text-sm font-black text-green-600">
            Verified
          </p>

        </div>


        <div className="p-4 text-center">

          <p className="text-[10px] uppercase tracking-wide text-slate-500">
            Checked On
          </p>

          <p className="mt-1 text-sm font-black text-slate-900">
            {health.checkedAt
              ? formatDate(health.checkedAt)
              : "—"}
          </p>

        </div>

      </div>

    </section>
  );
}


/* ==================================================
   INFO SECTION
================================================== */

function InfoSection({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </div>

        <div>

          <h2 className="text-sm font-black text-slate-900">
            {title}
          </h2>

          <p className="mt-0.5 text-[10px] text-slate-500">
            {description}
          </p>

        </div>

      </div>


      <div className="mt-4">
        {children}
      </div>

    </section>
  );
}


/* ==================================================
   INFO VALUE
================================================== */

function InfoValue({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-bold text-slate-900">
        {value || "Not Tested"}
      </p>

    </div>
  );
}


/* ==================================================
   HEALTH METRIC
================================================== */

function HealthMetric({
  label,
  value,
  score,
}: {
  label: string;
  value: string;
  score?: number;
}) {
  const percentage =
    score !== undefined
      ? Math.min(100, Math.max(0, score))
      : 0;

  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-900">
        {value}
      </p>

      {score !== undefined && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-black"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>
      )}

    </div>
  );
}


/* ==================================================
   SIMPLE METRIC
================================================== */

function SimpleMetric({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`rounded-xl bg-slate-50 p-3 ${
        fullWidth ? "w-full" : ""
      }`}
    >

      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* ==================================================
   STATUS METRIC
================================================== */

function StatusMetric({
  label,
  status,
}: {
  label: string;
  status?: ComponentStatus;
}) {
  const value = status || "Not Tested";

  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <div className="flex items-center justify-between gap-2">

        <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <span
          className={`h-2 w-2 shrink-0 rounded-full ${getStatusDot(
            value
          )}`}
        />

      </div>

      <p
        className={`mt-1 text-xs font-black ${getStatusClass(
          value
        )}`}
      >
        {value}
      </p>

    </div>
  );
}


/* ==================================================
   MINI HEALTH CARD
================================================== */

function MiniHealthCard({
  icon,
  label,
  value,
  status,
}: {
  icon: string;
  label: string;
  value: string;
  status?: ComponentStatus;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

      <div className="flex items-center gap-2">

        <span className="text-sm">
          {icon}
        </span>

        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>

      </div>

      <p className="mt-2 break-words text-sm font-black text-slate-900">
        {value}
      </p>

      {status && (
        <p
          className={`mt-1 text-[9px] font-semibold ${getStatusClass(
            status
          )}`}
        >
          {status}
        </p>
      )}

    </div>
  );
}


/* ==================================================
   RECOMMENDATION
================================================== */

function RecommendationCard({
  health,
}: {
  health: LaptopHealth;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

      <div className="border-b border-blue-100 bg-blue-50 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            📅
          </div>

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">
              Lappy Care Recommendation
            </p>

            <h2 className="mt-1 text-base font-black text-blue-950">
              Next Service
            </h2>

          </div>

        </div>

      </div>


      <div className="p-5">

        {health.nextServiceDate && (
          <div>

            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Recommended Date
            </p>

            <p className="mt-1 text-lg font-black text-slate-900">
              {formatDate(health.nextServiceDate)}
            </p>

          </div>
        )}


        {health.nextServiceRecommendation && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4">

            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Technician Recommendation
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-700">
              {health.nextServiceRecommendation}
            </p>

          </div>
        )}

      </div>

    </section>
  );
}


/* ==================================================
   NO REPORT
================================================== */

function NoHealthReport() {
  return (
    <section className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="p-7 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
          💻
        </div>

        <h2 className="mt-4 text-base font-black text-slate-900">
          Health Report Not Available Yet
        </h2>

        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-600">
          A laptop health report has not been added to your
          customer profile yet.
        </p>

      </div>

    </section>
  );
}


/* ==================================================
   STATUS COLORS
================================================== */

function getStatusClass(status: string) {
  switch (status) {

    case "Excellent":
    case "Good":
      return "text-green-600";

    case "Fair":
      return "text-yellow-600";

    case "Needs Attention":
      return "text-orange-600";

    case "Critical":
      return "text-red-600";

    case "Not Applicable":
    case "Not Tested":
    default:
      return "text-slate-500";
  }
}


/* ==================================================
   STATUS DOT
================================================== */

function getStatusDot(status: string) {
  switch (status) {

    case "Excellent":
    case "Good":
      return "bg-green-500";

    case "Fair":
      return "bg-yellow-500";

    case "Needs Attention":
      return "bg-orange-500";

    case "Critical":
      return "bg-red-500";

    case "Not Applicable":
    case "Not Tested":
    default:
      return "bg-slate-300";
  }
}


/* ==================================================
   DATE
================================================== */

function formatDate(value: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}