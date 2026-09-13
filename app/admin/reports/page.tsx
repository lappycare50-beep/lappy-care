"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  IndianRupee,
  PackageCheck,
  RefreshCw,
  Search,
  UserRound,
  WalletCards,
  Wrench,
  XCircle,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";

import {
  getReportsData,
  ReportDateFilter,
  ReportsData,
} from "@/services/reportService";

import {
  RepairStatus,
} from "@/types/repair";

// ==========================================
// CONSTANTS
// ==========================================

const STATUS_ORDER: RepairStatus[] = [
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
// PAGE
// ==========================================

export default function ReportsPage() {
  const [
    filter,
    setFilter,
  ] =
    useState<ReportDateFilter>(
      "all"
    );

  const [
    data,
    setData,
  ] =
    useState<ReportsData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getReportsData(
          filter
        );

      setData(result);
    } catch (loadError) {
      console.error(
        "Reports loading error:",
        loadError
      );

      setError(
        "Unable to load reports."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadReports();
  }, [filter]);

  const dateLabel =
    useMemo(() => {
      switch (filter) {
        case "today":
          return "Today";

        case "7days":
          return "Last 7 Days";

        case "30days":
          return "Last 30 Days";

        default:
          return "All Time";
      }
    }, [filter]);

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <BarChart3
                  size={24}
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Reports
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Repair, payment and service performance overview.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              void loadReports()
            }
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#222] disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>

        {/* ========================================
            FILTER
        ======================================== */}

        <section className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Report Period
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {dateLabel}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

              <FilterButton
                active={
                  filter ===
                  "today"
                }
                onClick={() =>
                  setFilter(
                    "today"
                  )
                }
              >
                Today
              </FilterButton>

              <FilterButton
                active={
                  filter ===
                  "7days"
                }
                onClick={() =>
                  setFilter(
                    "7days"
                  )
                }
              >
                7 Days
              </FilterButton>

              <FilterButton
                active={
                  filter ===
                  "30days"
                }
                onClick={() =>
                  setFilter(
                    "30days"
                  )
                }
              >
                30 Days
              </FilterButton>

              <FilterButton
                active={
                  filter ===
                  "all"
                }
                onClick={() =>
                  setFilter(
                    "all"
                  )
                }
              >
                All Time
              </FilterButton>

            </div>

          </div>

        </section>

        {/* ========================================
            ERROR
        ======================================== */}

        {error && (
          <section className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <AlertCircle
              size={18}
            />

            {error}
          </section>
        )}

        {/* ========================================
            LOADING
        ======================================== */}

        {loading && (
          <LoadingState />
        )}

        {/* ========================================
            REPORT CONTENT
        ======================================== */}

        {!loading &&
          data && (
            <>
              {/* Overview */}

              <section>
                <SectionTitle
                  title="Repair Overview"
                  description="Current repair workload for the selected period."
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

                  <SummaryCard
                    icon={
                      <Wrench
                        size={20}
                      />
                    }
                    label="Total Repairs"
                    value={
                      data.totalRepairs
                    }
                    accent="yellow"
                  />

                  <SummaryCard
                    icon={
                      <Clock3
                        size={20}
                      />
                    }
                    label="Active Repairs"
                    value={
                      data.activeRepairs
                    }
                    accent="blue"
                  />

                  <SummaryCard
                    icon={
                      <PackageCheck
                        size={20}
                      />
                    }
                    label="Ready"
                    value={
                      data.readyRepairs
                    }
                    accent="green"
                  />

                  <SummaryCard
                    icon={
                      <CheckCircle2
                        size={20}
                      />
                    }
                    label="Delivered"
                    value={
                      data.deliveredRepairs
                    }
                    accent="emerald"
                  />

                  <SummaryCard
                    icon={
                      <XCircle
                        size={20}
                      />
                    }
                    label="Cancelled"
                    value={
                      data.cancelledRepairs
                    }
                    accent="red"
                  />

                </div>
              </section>

              {/* Financial */}

              <section>
                <SectionTitle
                  title="Financial Summary"
                  description="Service value and collection position."
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                  <MoneyCard
                    icon={
                      <IndianRupee
                        size={20}
                      />
                    }
                    label="Total Service Value"
                    value={
                      data.totalServiceValue
                    }
                  />

                  <MoneyCard
                    icon={
                      <WalletCards
                        size={20}
                      />
                    }
                    label="Advance Collected"
                    value={
                      data.advanceCollected
                    }
                  />

                  <MoneyCard
                    icon={
                      <Clock3
                        size={20}
                      />
                    }
                    label="Balance Pending"
                    value={
                      data.balancePending
                    }
                  />

                  <MoneyCard
                    icon={
                      <ArrowUpRight
                        size={20}
                      />
                    }
                    label="Discount Given"
                    value={
                      data.discountGiven
                    }
                  />

                </div>
              </section>

              {/* Status + Payment */}

              <section className="grid gap-5 xl:grid-cols-2">

                <ReportPanel
                  title="Repair Status"
                  description="Status-wise repair distribution."
                >
                  <div className="space-y-3">

                    {STATUS_ORDER.map(
                      (
                        status
                      ) => (
                        <ProgressRow
                          key={
                            status
                          }
                          label={
                            status
                          }
                          value={
                            data
                              .statusCounts[
                              status
                            ]
                          }
                          total={
                            data.totalRepairs
                          }
                        />
                      )
                    )}

                  </div>
                </ReportPanel>

                <ReportPanel
                  title="Payment Status"
                  description="Payment collection position."
                >
                  <div className="space-y-4">

                    <LargeStatRow
                      label="Paid"
                      value={
                        data
                          .paymentCounts
                          .Paid
                      }
                      total={
                        data.totalRepairs
                      }
                      className="text-green-400"
                    />

                    <LargeStatRow
                      label="Partial"
                      value={
                        data
                          .paymentCounts
                          .Partial
                      }
                      total={
                        data.totalRepairs
                      }
                      className="text-yellow-400"
                    />

                    <LargeStatRow
                      label="Pending"
                      value={
                        data
                          .paymentCounts
                          .Pending
                      }
                      total={
                        data.totalRepairs
                      }
                      className="text-red-400"
                    />

                  </div>
                </ReportPanel>

              </section>

              {/* Priority + Technician */}

              <section className="grid gap-5 xl:grid-cols-2">

                <ReportPanel
                  title="Priority"
                  description="Repair priority distribution."
                >
                  <div className="grid grid-cols-2 gap-3">

                    <PriorityCard
                      label="Low"
                      value={
                        data
                          .priorityCounts
                          .Low
                      }
                    />

                    <PriorityCard
                      label="Medium"
                      value={
                        data
                          .priorityCounts
                          .Medium
                      }
                    />

                    <PriorityCard
                      label="High"
                      value={
                        data
                          .priorityCounts
                          .High
                      }
                    />

                    <PriorityCard
                      label="Urgent"
                      value={
                        data
                          .priorityCounts
                          .Urgent
                      }
                    />

                  </div>
                </ReportPanel>

                <ReportPanel
                  title="Technician Performance"
                  description="Jobs and service value by technician."
                >
                  {data.technicianReports
                    .length ===
                  0 ? (
                    <EmptyState text="No technician data available." />
                  ) : (
                    <div className="space-y-3">

                      {data.technicianReports.map(
                        (
                          technician
                        ) => (
                          <div
                            key={
                              technician.technician
                            }
                            className="rounded-xl border border-gray-800 bg-black/50 p-4"
                          >

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                                <UserRound
                                  size={18}
                                />
                              </div>

                              <div className="min-w-0 flex-1">

                                <div className="font-semibold text-white">
                                  {
                                    technician.technician
                                  }
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  {
                                    technician.totalJobs
                                  }{" "}
                                  jobs
                                </div>

                              </div>

                              <div className="text-right">

                                <div className="font-bold text-green-400">
                                  {formatMoney(
                                    technician.serviceValue
                                  )}
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  {
                                    technician.completed
                                  }{" "}
                                  completed •{" "}
                                  {
                                    technician.active
                                  }{" "}
                                  active
                                </div>

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}
                </ReportPanel>

              </section>

              {/* Recent Repairs */}

              <section>

                <SectionTitle
                  title="Recent Repairs"
                  description="Latest repair jobs in the selected report period."
                />

                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

                  {data.recentRepairs.length ===
                  0 ? (
                    <div className="p-10">
                      <EmptyState text="No repairs found for this period." />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">

                      <table className="min-w-full">

                        <thead className="bg-black">

                          <tr>

                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                              Repair
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                              Customer
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                              Device
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                              Status
                            </th>

                            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-yellow-400">
                              Amount
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {data.recentRepairs.map(
                            (
                              repair
                            ) => (
                              <tr
                                key={
                                  repair.id ||
                                  repair.repairId
                                }
                                className="border-t border-gray-800"
                              >

                                <td className="px-5 py-4">

                                  <div className="font-semibold text-yellow-400">
                                    {
                                      repair.repairId
                                    }
                                  </div>

                                  <div className="mt-1 text-xs text-gray-500">
                                    {
                                      repair.createdAt
                                    }
                                  </div>

                                </td>

                                <td className="px-5 py-4">

                                  <div className="font-medium text-white">
                                    {
                                      repair.customer
                                        ?.name ||
                                      "-"
                                    }
                                  </div>

                                  <div className="mt-1 text-xs text-gray-500">
                                    {
                                      repair.customer
                                        ?.mobile ||
                                      "-"
                                    }
                                  </div>

                                </td>

                                <td className="px-5 py-4">

                                  <div className="font-medium text-white">
                                    {
                                      repair.device
                                        ?.brand ||
                                      "-"
                                    }
                                  </div>

                                  <div className="mt-1 text-xs text-gray-500">
                                    {
                                      repair.device
                                        ?.model ||
                                      "-"
                                    }
                                  </div>

                                </td>

                                <td className="px-5 py-4">

                                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                                    {
                                      repair.status
                                    }
                                  </span>

                                </td>

                                <td className="px-5 py-4 text-right">

                                  <div className="font-bold text-green-400">
                                    {formatMoney(
                                      Number(
                                        repair
                                          .estimate
                                          ?.totalAmount ||
                                          0
                                      )
                                    )}
                                  </div>

                                </td>

                              </tr>
                            )
                          )}

                        </tbody>

                      </table>

                    </div>
                  )}

                </div>

              </section>

              {/* Quick Links */}

              <section className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-[#181818] to-[#111111] p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h2 className="text-lg font-bold text-white">
                      Need more details?
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Open Repairs or Invoices to inspect individual records.
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <Link
                      href="/admin/repairs"
                      className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-300"
                    >
                      <Wrench
                        size={16}
                      />
                      Repairs
                    </Link>

                    <Link
                      href="/admin/invoices"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-900"
                    >
                      <WalletCards
                        size={16}
                      />
                      Invoices
                    </Link>

                  </div>

                </div>

              </section>

            </>
          )}

      </div>
    </AdminLayout>
  );
}

// ========================================================
// FILTER BUTTON
// ========================================================

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-xl
        px-4
        py-2.5
        text-sm
        font-semibold
        transition
        ${
          active
            ? "bg-yellow-400 text-black"
            : "border border-gray-700 bg-black text-gray-300 hover:bg-gray-900"
        }
      `}
    >
      {children}
    </button>
  );
}

// ========================================================
// SECTION TITLE
// ========================================================

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3">

      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}

// ========================================================
// SUMMARY CARD
// ========================================================

function SummaryCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent:
    | "yellow"
    | "blue"
    | "green"
    | "emerald"
    | "red";
}) {
  const accentClasses = {
    yellow:
      "bg-yellow-400/10 text-yellow-400",
    blue:
      "bg-blue-400/10 text-blue-400",
    green:
      "bg-green-400/10 text-green-400",
    emerald:
      "bg-emerald-400/10 text-emerald-400",
    red:
      "bg-red-400/10 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClasses[accent]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

// ========================================================
// MONEY CARD
// ========================================================

function MoneyCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <p className="mt-1 break-words text-xl font-bold text-white">
            {formatMoney(value)}
          </p>

        </div>

      </div>

    </div>
  );
}

// ========================================================
// REPORT PANEL
// ========================================================

function ReportPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="mb-5">

        <h2 className="text-lg font-bold text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>

      </div>

      {children}

    </section>
  );
}

// ========================================================
// PROGRESS ROW
// ========================================================

function ProgressRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage =
    total > 0
      ? Math.round(
          (value / total) *
            100
        )
      : 0;

  return (
    <div>

      <div className="flex items-center justify-between gap-4">

        <span className="text-sm text-gray-300">
          {label}
        </span>

        <span className="text-sm font-bold text-white">
          {value}
        </span>

      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-800">

        <div
          className="h-full rounded-full bg-yellow-400 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-1 text-right text-[10px] text-gray-600">
        {percentage}%
      </div>

    </div>
  );
}

// ========================================================
// LARGE STAT ROW
// ========================================================

function LargeStatRow({
  label,
  value,
  total,
  className,
}: {
  label: string;
  value: number;
  total: number;
  className: string;
}) {
  const percentage =
    total > 0
      ? Math.round(
          (value / total) *
            100
        )
      : 0;

  return (
    <div className="rounded-xl border border-gray-800 bg-black/40 p-4">

      <div className="flex items-center justify-between">

        <span className="font-medium text-white">
          {label}
        </span>

        <span
          className={`text-xl font-bold ${className}`}
        >
          {value}
        </span>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-800">

        <div
          className="h-full rounded-full bg-current opacity-80"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-2 text-right text-[10px] text-gray-600">
        {percentage}% of repairs
      </p>

    </div>
  );
}

// ========================================================
// PRIORITY CARD
// ========================================================

function PriorityCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-black/40 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}

// ========================================================
// EMPTY STATE
// ========================================================

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">

      <Search
        size={32}
        className="text-gray-700"
      />

      <p className="mt-3 text-sm text-gray-500">
        {text}
      </p>

    </div>
  );
}

// ========================================================
// LOADING
// ========================================================

function LoadingState() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-12">

      <div className="flex flex-col items-center justify-center text-center">

        <RefreshCw
          size={34}
          className="animate-spin text-yellow-400"
        />

        <p className="mt-4 text-sm font-semibold text-white">
          Loading Reports...
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Calculating repair and financial statistics.
        </p>

      </div>

    </div>
  );
}

// ========================================================
// MONEY FORMAT
// ========================================================

function formatMoney(
  value: number
) {
  return `₹${Number(
    value || 0
  ).toLocaleString(
    "en-IN"
  )}`;
}