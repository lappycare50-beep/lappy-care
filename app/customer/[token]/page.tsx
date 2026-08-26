import { notFound } from "next/navigation";

import { getCustomerByQrToken } from "@/services/customerQrService";
import { getLatestLaptopHealth } from "@/services/laptopHealthService";

import type {
  LaptopHealth,
  ComponentStatus,
} from "@/types/laptopHealth";

export const dynamic = "force-dynamic";

type CustomerPublicPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function CustomerPublicPage({
  params,
}: CustomerPublicPageProps) {
  const { token } = await params;

  const decodedToken = decodeURIComponent(token);

  const customer = await getCustomerByQrToken(decodedToken);

  if (!customer || customer.isActive === false) {
    notFound();
  }

  /*
   * Existing health records may use either:
   * 1. Firestore customer document ID
   * 2. Public customerId
   *
   * Keep both lookups for compatibility.
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
    <main className="min-h-screen bg-slate-950 px-3 py-4 text-slate-900 sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-2xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <section className="overflow-hidden rounded-[28px] bg-black p-5 shadow-2xl sm:p-7">

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
                LAPPY CARE
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Customer Care Profile
              </h1>

              <p className="mt-2 text-xs leading-5 text-white/60 sm:text-sm">
                Your laptop care information in one place.
              </p>

            </div>

            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl sm:flex">
              💻
            </div>

          </div>

        </section>


        {/* ==================================================
            CUSTOMER PROFILE
        ================================================== */}

        <section className="mt-4 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:mt-5 sm:p-6">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                Customer Profile
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-900">
                Lappy Care Customer
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Personal information is kept private.
              </p>

            </div>

            <div className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-right">

              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Customer ID
              </p>

              <p className="mt-1 max-w-[110px] break-all text-[11px] font-black text-slate-900">
                {customer.customerId}
              </p>

            </div>

          </div>

        </section>


        {/* ==================================================
            LAPTOP HEALTH
        ================================================== */}

        <section className="mt-5">

          <div className="mb-3 px-1">

            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-blue-600">
              LAPTOP HEALTH
            </p>

            <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
              Latest Health Assessment
            </h2>

            <p className="mt-1 text-xs leading-5 text-white/60">
              View the latest technician health report for this laptop.
            </p>

          </div>


          {!health ? (
            <NoHealthReport />
          ) : (
            <div className="space-y-3">

              <OverallHealthCard health={health} />

              <QuickHealthOverview health={health} />

              <div className="flex justify-center pt-1">

                <a
                  href={`/customer/${encodeURIComponent(
                    decodedToken
                  )}/health-report`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-xs font-black text-black shadow-sm transition hover:bg-green-400 sm:w-auto"
                >
                  View Full Health Report
                  <span aria-hidden="true">
                    →
                  </span>
                </a>

              </div>

            </div>
          )}

        </section>


        {/* ==================================================
            SERVICE SUMMARY
        ================================================== */}

        <section className="mt-5 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
              📋
            </div>

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                SERVICE HISTORY
              </p>

              <h2 className="mt-0.5 text-lg font-black text-slate-900">
                Service Summary
              </h2>

            </div>

          </div>


          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">

            <StatCard
              label="Total Repairs"
              value={customer.totalRepairs}
            />

            <StatCard
              label="Total Invoices"
              value={customer.totalInvoices}
            />

            <StatCard
              label="Last Visit"
              value={customer.lastVisit || "—"}
            />

          </div>

        </section>


        {/* ==================================================
            PRIVACY
        ================================================== */}

        <section className="mt-4 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
              🔒
            </div>

            <div>

              <h2 className="text-sm font-black text-slate-900">
                Your Information is Private
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Personal contact information is not displayed
                on this public customer portal.
              </p>

            </div>

          </div>

        </section>


        {/* ==================================================
            BOOK SERVICE
        ================================================== */}

        <section className="mt-4 rounded-[26px] border border-slate-200 bg-white p-6 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl">
            🔧
          </div>

          <h2 className="mt-3 text-lg font-black text-slate-900">
            Need Laptop Service?
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Contact Lappy Care for laptop repair and maintenance.
          </p>

          <div className="mt-4 flex justify-center">

            <a
              href="/book-repair"
              className="rounded-xl bg-black px-6 py-3 text-xs font-black text-white transition hover:bg-slate-800"
            >
              Book Laptop Service
            </a>

          </div>

        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="px-2 py-7 text-center">

          <p className="text-[10px] font-bold text-white/40">
            Lappy Care • Customer Care Portal
          </p>

          <p className="mt-1 text-[9px] text-white/25">
            Professional laptop care & maintenance
          </p>

        </footer>

      </div>
    </main>
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
    <section className="overflow-hidden rounded-[26px] border border-slate-700 bg-white shadow-xl">

      <div className="bg-black p-5 sm:p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/40">
              OVERALL HEALTH
            </p>

            <h3 className="mt-1 text-2xl font-black text-white">
              {status}
            </h3>

            <p className="mt-1 text-xs text-white/50">
              Latest technician assessment
            </p>

          </div>


          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/20 bg-white/10">

            <div className="text-center">

              <p className="text-xl font-black text-white">
                {score}%
              </p>

              <p className="text-[8px] font-bold tracking-widest text-white/40">
                HEALTH
              </p>

            </div>

          </div>

        </div>


        <div className="mt-5">

          <div className="flex items-center justify-between">

            <p className="text-[8px] font-bold uppercase tracking-widest text-white/35">
              Health Score
            </p>

            <p className="text-[8px] font-bold text-white/50">
              {score}/100
            </p>

          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-white"
              style={{
                width: `${score}%`,
              }}
            />

          </div>

        </div>

      </div>


      <div className="grid grid-cols-2 divide-x divide-slate-100">

        <div className="p-4 text-center">

          <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
            Report Status
          </p>

          <p className="mt-1 text-sm font-black text-green-600">
            Verified
          </p>

        </div>


        <div className="p-4 text-center">

          <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
            Checked On
          </p>

          <p className="mt-1 text-xs font-black text-slate-900">
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
   QUICK HEALTH OVERVIEW
================================================== */

function QuickHealthOverview({
  health,
}: {
  health: LaptopHealth;
}) {
  return (
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
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex min-w-0 items-center gap-2">

        <span className="shrink-0 text-base">
          {icon}
        </span>

        <p className="min-w-0 truncate text-[9px] font-black uppercase tracking-wide text-slate-500">
          {label}
        </p>

      </div>


      <p className="mt-3 break-words text-lg font-black text-slate-900">
        {value}
      </p>


      {status && (
        <div className="mt-1 flex items-center gap-1.5">

          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${getStatusDot(
              status
            )}`}
          />

          <p
            className={`truncate text-[9px] font-black ${getStatusClass(
              status
            )}`}
          >
            {status}
          </p>

        </div>
      )}

    </div>
  );
}


/* ==================================================
   NO HEALTH REPORT
================================================== */

function NoHealthReport() {
  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">

      <div className="p-7 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
          💻
        </div>

        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          LAPPY CARE
        </p>

        <h3 className="mt-2 text-base font-black text-slate-900">
          Health Report Not Available Yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
          A laptop health report has not been added to
          your customer profile yet.
        </p>

      </div>

    </section>
  );
}


/* ==================================================
   STAT CARD
================================================== */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">

      <p className="truncate text-[8px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* ==================================================
   STATUS CLASS
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
      return "text-slate-400";

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
   DATE FORMAT
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