"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  IndianRupee,
  RefreshCw,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";

import {
  getReportsData,
  type ReportDateFilter,
  type ReportsData,
} from "@/services/reportService";

import type {
  RepairStatus,
} from "@/types/repair";

// =====================================================
// INITIAL REPORT DATA
// =====================================================

const initialReportData: ReportsData = {
  totalRepairs: 0,
  activeRepairs: 0,
  readyRepairs: 0,
  deliveredRepairs: 0,
  cancelledRepairs: 0,

  totalServiceValue: 0,
  advanceCollected: 0,
  balancePending: 0,
  discountGiven: 0,

  statusCounts: {
    Received: 0,
    Diagnosing: 0,
    "Waiting Approval": 0,
    "Waiting Parts": 0,
    Repairing: 0,
    Testing: 0,
    Ready: 0,
    Delivered: 0,
    Cancelled: 0,
  },

  paymentCounts: {
    Pending: 0,
    Partial: 0,
    Paid: 0,
  },

  priorityCounts: {
    Low: 0,
    Medium: 0,
    High: 0,
    Urgent: 0,
  },

  technicianReports: [],
  recentRepairs: [],
};

// =====================================================
// REPORTS PAGE
// =====================================================

export default function ReportsPage() {
  const [
    filter,
    setFilter,
  ] = useState<ReportDateFilter>(
    "all"
  );

  const [
    data,
    setData,
  ] = useState<ReportsData>(
    initialReportData
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ===================================================
  // LOAD REPORTS
  // ===================================================

  async function loadReport(
    selectedFilter: ReportDateFilter
  ) {
    try {
      setLoading(true);
      setError("");

      const result =
        await getReportsData(
          selectedFilter
        );

      setData(
        result
      );
    } catch (reportError) {
      console.error(
        "Reports load error:",
        reportError
      );

      setError(
        reportError instanceof Error
          ? reportError.message
          : "Unable to load reports."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===================================================
  // FILTER LOAD
  // ===================================================

  useEffect(() => {
    void loadReport(
      filter
    );
  }, [filter]);

  // ===================================================
  // REFRESH
  // ===================================================

  async function handleRefresh() {
    await loadReport(
      filter
    );
  }

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <AdminLayout>
      <div className="space-y-8 p-4 sm:p-6 lg:p-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <BarChart3
                size={24}
              />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Reports
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Repair performance, financial and technician reports.
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Date Filter */}

            <select
              value={
                filter
              }
              onChange={(event) =>
                setFilter(
                  event.target
                    .value as ReportDateFilter
                )
              }
              className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-yellow-400"
            >
              <option value="all">
                All Time
              </option>

              <option value="today">
                Today
              </option>

              <option value="7days">
                Last 7 Days
              </option>

              <option value="30days">
                Last 30 Days
              </option>
            </select>

            {/* Export */}

            <button
              type="button"
              onClick={() =>
                exportReportsCsv(
                  data,
                  filter
                )
              }
              disabled={
                loading
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download
                size={17}
              />

              Export CSV
            </button>

            {/* Refresh */}

            <button
              type="button"
              onClick={
                handleRefresh
              }
              disabled={
                loading
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-wait disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

          </div>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-gray-800 bg-[#181818]">

            <div className="text-center">

              <Activity
                size={34}
                className="mx-auto animate-pulse text-yellow-400"
              />

              <p className="mt-4 text-sm text-gray-400">
                Loading Reports...
              </p>

            </div>

          </div>
        ) : (
          <>
            {/* =================================================
                REPAIR OVERVIEW
            ================================================= */}

            <section>

              <SectionTitle
                icon={
                  <Activity
                    size={19}
                  />
                }
                title="Repair Overview"
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

                <ReportCard
                  title="Total Repairs"
                  value={
                    data.totalRepairs
                  }
                  icon={
                    <Wrench
                      size={20}
                    />
                  }
                  iconClass="text-yellow-400"
                />

                <ReportCard
                  title="Active Repairs"
                  value={
                    data.activeRepairs
                  }
                  icon={
                    <Activity
                      size={20}
                    />
                  }
                  iconClass="text-blue-400"
                />

                <ReportCard
                  title="Ready"
                  value={
                    data.readyRepairs
                  }
                  icon={
                    <CheckCircle2
                      size={20}
                    />
                  }
                  iconClass="text-green-400"
                />

                <ReportCard
                  title="Delivered"
                  value={
                    data.deliveredRepairs
                  }
                  icon={
                    <CheckCircle2
                      size={20}
                    />
                  }
                  iconClass="text-gray-400"
                />

                <ReportCard
                  title="Cancelled"
                  value={
                    data.cancelledRepairs
                  }
                  icon={
                    <XCircle
                      size={20}
                    />
                  }
                  iconClass="text-red-400"
                />

              </div>

            </section>

            {/* =================================================
                FINANCIAL
            ================================================= */}

            <section>

              <SectionTitle
                icon={
                  <IndianRupee
                    size={19}
                  />
                }
                title="Financial Summary"
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <ReportCard
                  title="Service Value"
                  value={formatCurrency(
                    data.totalServiceValue
                  )}
                  icon={
                    <IndianRupee
                      size={20}
                    />
                  }
                  iconClass="text-yellow-400"
                />

                <ReportCard
                  title="Advance Collected"
                  value={formatCurrency(
                    data.advanceCollected
                  )}
                  icon={
                    <CheckCircle2
                      size={20}
                    />
                  }
                  iconClass="text-green-400"
                />

                <ReportCard
                  title="Balance Pending"
                  value={formatCurrency(
                    data.balancePending
                  )}
                  icon={
                    <Clock3
                      size={20}
                    />
                  }
                  iconClass="text-orange-400"
                />

                <ReportCard
                  title="Discount Given"
                  value={formatCurrency(
                    data.discountGiven
                  )}
                  icon={
                    <IndianRupee
                      size={20}
                    />
                  }
                  iconClass="text-purple-400"
                />

              </div>

            </section>

            {/* =================================================
                BREAKDOWNS
            ================================================= */}

            <section className="grid gap-6 lg:grid-cols-3">

              {/* Status */}

              <BreakdownCard
                title="Status Breakdown"
                icon={
                  <Activity
                    size={18}
                  />
                }
              >
                {Object.entries(
                  data.statusCounts
                ).map(
                  ([
                    status,
                    count,
                  ]) => (
                    <BreakdownRow
                      key={
                        status
                      }
                      label={
                        status
                      }
                      value={
                        count
                      }
                    />
                  )
                )}
              </BreakdownCard>

              {/* Payment */}

              <BreakdownCard
                title="Payment Status"
                icon={
                  <IndianRupee
                    size={18}
                  />
                }
              >
                {Object.entries(
                  data.paymentCounts
                ).map(
                  ([
                    status,
                    count,
                  ]) => (
                    <BreakdownRow
                      key={
                        status
                      }
                      label={
                        status
                      }
                      value={
                        count
                      }
                    />
                  )
                )}
              </BreakdownCard>

              {/* Priority */}

              <BreakdownCard
                title="Priority"
                icon={
                  <AlertTriangle
                    size={18}
                  />
                }
              >
                {Object.entries(
                  data.priorityCounts
                ).map(
                  ([
                    priority,
                    count,
                  ]) => (
                    <BreakdownRow
                      key={
                        priority
                      }
                      label={
                        priority
                      }
                      value={
                        count
                      }
                    />
                  )
                )}
              </BreakdownCard>

            </section>

            {/* =================================================
                TECHNICIAN PERFORMANCE
            ================================================= */}

            <section>

              <SectionTitle
                icon={
                  <Users
                    size={19}
                  />
                }
                title="Technician Performance"
              />

              <div className="mt-4 overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

                {data.technicianReports
                  .length ===
                0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    No technician data available.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="min-w-full">

                      <thead className="bg-black">

                        <tr>

                          <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Technician
                          </th>

                          <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Total Jobs
                          </th>

                          <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Completed
                          </th>

                          <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Active
                          </th>

                          <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Service Value
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {data.technicianReports.map(
                          (
                            item
                          ) => (
                            <tr
                              key={
                                item.technician
                              }
                              className="border-t border-gray-800 transition hover:bg-white/[0.03]"
                            >

                              <td className="px-5 py-4">

                                <div className="flex items-center gap-3">

                                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                                    <Wrench
                                      size={17}
                                    />
                                  </div>

                                  <span className="font-semibold text-white">
                                    {
                                      item.technician
                                    }
                                  </span>

                                </div>

                              </td>

                              <td className="px-5 py-4 text-center font-semibold text-white">
                                {
                                  item.totalJobs
                                }
                              </td>

                              <td className="px-5 py-4 text-center font-semibold text-green-400">
                                {
                                  item.completed
                                }
                              </td>

                              <td className="px-5 py-4 text-center font-semibold text-blue-400">
                                {
                                  item.active
                                }
                              </td>

                              <td className="px-5 py-4 text-right font-bold text-green-400">
                                {formatCurrency(
                                  item.serviceValue
                                )}
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

            {/* =================================================
                RECENT REPAIRS
            ================================================= */}

            <section>

              <SectionTitle
                icon={
                  <Clock3
                    size={19}
                  />
                }
                title="Recent Repairs"
              />

              <div className="mt-4 overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

                {data.recentRepairs
                  .length ===
                0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    No repairs found for the selected period.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="min-w-full">

                      <thead className="bg-black">

                        <tr>

                          <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Repair ID
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Customer
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Device
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Technician
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Status
                          </th>

                          <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Amount
                          </th>

                          <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-yellow-400">
                            Date
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
                                repair.id
                              }
                              className="border-t border-gray-800 transition hover:bg-white/[0.03]"
                            >

                              <td className="px-5 py-4 font-bold text-yellow-400">
                                {
                                  repair.repairId
                                }
                              </td>

                              <td className="px-5 py-4">

                                <div className="font-semibold text-white">
                                  {
                                    repair.customer?.name ||
                                    "-"
                                  }
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  {
                                    repair.customer?.mobile ||
                                    "-"
                                  }
                                </div>

                              </td>

                              <td className="px-5 py-4">

                                <div className="text-white">
                                  {
                                    repair.device?.brand ||
                                    "-"
                                  }
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  {
                                    repair.device?.model ||
                                    "-"
                                  }
                                </div>

                              </td>

                              <td className="px-5 py-4 text-sm text-gray-300">
                                {
                                  repair
                                    .estimate
                                    ?.technician ||
                                  "Unassigned"
                                }
                              </td>

                              <td className="px-5 py-4">

                                <StatusBadge
                                  status={
                                    repair.status
                                  }
                                />

                              </td>

                              <td className="px-5 py-4 text-right font-bold text-green-400">
                                {formatCurrency(
                                  Number(
                                    repair
                                      .estimate
                                      ?.totalAmount ||
                                      0
                                  )
                                )}
                              </td>

                              <td className="px-5 py-4 text-right text-xs text-gray-500">
                                {formatDate(
                                  repair.createdAt
                                )}
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

          </>
        )}

      </div>
    </AdminLayout>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <div className="text-yellow-400">
        {icon}
      </div>

      <h2 className="text-lg font-bold text-white">
        {title}
      </h2>

    </div>
  );
}

// =====================================================
// REPORT CARD
// =====================================================

function ReportCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

// =====================================================
// BREAKDOWN CARD
// =====================================================

function BreakdownCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="flex items-center gap-2">

        <div className="text-yellow-400">
          {icon}
        </div>

        <h2 className="font-bold text-white">
          {title}
        </h2>

      </div>

      <div className="mt-4 divide-y divide-gray-800">
        {children}
      </div>

    </div>
  );
}

// =====================================================
// BREAKDOWN ROW
// =====================================================

function BreakdownRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between py-3">

      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="text-sm font-bold text-white">
        {value}
      </span>

    </div>
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({
  status,
}: {
  status: RepairStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
        status
      )}`}
    >
      {status}
    </span>
  );
}

function getStatusClass(
  status: RepairStatus
) {
  switch (status) {
    case "Received":
      return "bg-blue-500/10 text-blue-400";

    case "Diagnosing":
      return "bg-purple-500/10 text-purple-400";

    case "Waiting Approval":
      return "bg-yellow-500/10 text-yellow-400";

    case "Waiting Parts":
      return "bg-orange-500/10 text-orange-400";

    case "Repairing":
      return "bg-indigo-500/10 text-indigo-400";

    case "Testing":
      return "bg-cyan-500/10 text-cyan-400";

    case "Ready":
      return "bg-green-500/10 text-green-400";

    case "Delivered":
      return "bg-gray-500/10 text-gray-400";

    case "Cancelled":
      return "bg-red-500/10 text-red-400";

    default:
      return "bg-gray-500/10 text-gray-400";
  }
}

// =====================================================
// CURRENCY
// =====================================================

function formatCurrency(
  value: number
) {
  return `₹${Number(
    value || 0
  ).toLocaleString(
    "en-IN"
  )}`;
}

// =====================================================
// DATE
// =====================================================

function formatDate(
  value?: string
) {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
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

// =====================================================
// FILTER LABEL
// =====================================================

function filterLabel(
  filter: ReportDateFilter
) {
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
}

// =====================================================
// CSV ESCAPE
// =====================================================

function csvEscape(
  value: unknown
) {
  const text =
    String(
      value ?? ""
    );

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n") ||
    text.includes("\r")
  ) {
    return `"${text.replace(
      /"/g,
      '""'
    )}"`;
  }

  return text;
}

// =====================================================
// EXPORT REPORTS CSV
// =====================================================

function exportReportsCsv(
  data: ReportsData,
  filter: ReportDateFilter
) {
  const rows: string[][] = [];

  // ===================================================
  // TITLE
  // ===================================================

  rows.push([
    "Lappy Care Reports",
  ]);

  rows.push([
    "Filter",
    filterLabel(
      filter
    ),
  ]);

  rows.push([
    "Generated",
    new Date().toLocaleString(
      "en-IN"
    ),
  ]);

  rows.push([]);

  // ===================================================
  // REPAIR OVERVIEW
  // ===================================================

  rows.push([
    "Repair Overview",
  ]);

  rows.push([
    "Metric",
    "Value",
  ]);

  rows.push([
    "Total Repairs",
    String(
      data.totalRepairs
    ),
  ]);

  rows.push([
    "Active Repairs",
    String(
      data.activeRepairs
    ),
  ]);

  rows.push([
    "Ready Repairs",
    String(
      data.readyRepairs
    ),
  ]);

  rows.push([
    "Delivered Repairs",
    String(
      data.deliveredRepairs
    ),
  ]);

  rows.push([
    "Cancelled Repairs",
    String(
      data.cancelledRepairs
    ),
  ]);

  rows.push([]);

  // ===================================================
  // FINANCIAL
  // ===================================================

  rows.push([
    "Financial Summary",
  ]);

  rows.push([
    "Metric",
    "Amount",
  ]);

  rows.push([
    "Service Value",
    String(
      data.totalServiceValue
    ),
  ]);

  rows.push([
    "Advance Collected",
    String(
      data.advanceCollected
    ),
  ]);

  rows.push([
    "Balance Pending",
    String(
      data.balancePending
    ),
  ]);

  rows.push([
    "Discount Given",
    String(
      data.discountGiven
    ),
  ]);

  rows.push([]);

  // ===================================================
  // STATUS
  // ===================================================

  rows.push([
    "Status Breakdown",
  ]);

  rows.push([
    "Status",
    "Count",
  ]);

  Object.entries(
    data.statusCounts
  ).forEach(
    ([
      status,
      count,
    ]) => {
      rows.push([
        status,
        String(
          count
        ),
      ]);
    }
  );

  rows.push([]);

  // ===================================================
  // PAYMENT
  // ===================================================

  rows.push([
    "Payment Status",
  ]);

  rows.push([
    "Status",
    "Count",
  ]);

  Object.entries(
    data.paymentCounts
  ).forEach(
    ([
      status,
      count,
    ]) => {
      rows.push([
        status,
        String(
          count
        ),
      ]);
    }
  );

  rows.push([]);

  // ===================================================
  // PRIORITY
  // ===================================================

  rows.push([
    "Priority",
  ]);

  rows.push([
    "Priority",
    "Count",
  ]);

  Object.entries(
    data.priorityCounts
  ).forEach(
    ([
      priority,
      count,
    ]) => {
      rows.push([
        priority,
        String(
          count
        ),
      ]);
    }
  );

  rows.push([]);

  // ===================================================
  // TECHNICIAN PERFORMANCE
  // ===================================================

  rows.push([
    "Technician Performance",
  ]);

  rows.push([
    "Technician",
    "Total Jobs",
    "Completed",
    "Active",
    "Service Value",
  ]);

  data.technicianReports.forEach(
    (technician) => {
      rows.push([
        technician.technician,
        String(
          technician.totalJobs
        ),
        String(
          technician.completed
        ),
        String(
          technician.active
        ),
        String(
          technician.serviceValue
        ),
      ]);
    }
  );

  rows.push([]);

  // ===================================================
  // RECENT REPAIRS
  // ===================================================

  rows.push([
    "Recent Repairs",
  ]);

  rows.push([
    "Repair ID",
    "Customer",
    "Mobile",
    "Device",
    "Technician",
    "Status",
    "Amount",
    "Date",
  ]);

  data.recentRepairs.forEach(
    (repair) => {
      rows.push([
        repair.repairId ||
          "",

        repair.customer?.name ||
          "",

        repair.customer?.mobile ||
          "",

        [
          repair.device?.brand,
          repair.device?.model,
        ]
          .filter(Boolean)
          .join(" "),

        repair.estimate?.technician ||
          "Unassigned",

        repair.status ||
          "",

        String(
          Number(
            repair.estimate
              ?.totalAmount ||
              0
          )
        ),

        formatDate(
          repair.createdAt
        ),
      ]);
    }
  );

  // ===================================================
  // BUILD CSV
  // ===================================================

  const csv =
    rows
      .map(
        (row) =>
          row
            .map(
              (value) =>
                csvEscape(
                  value
                )
            )
            .join(",")
      )
      .join("\r\n");

  // ===================================================
  // DOWNLOAD
  // ===================================================

  const blob =
    new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    `lappy-care-report-${filter}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(
    url
  );
}