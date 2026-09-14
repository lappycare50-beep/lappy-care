"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileText,
  IndianRupee,
  Laptop,
  Package,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import RecentProducts from "@/components/admin/RecentProducts";

import {
  getDashboardStats,
  type DashboardStats,
} from "@/services/dashboardService";

import {
  getRepairs,
} from "@/services/repairService";

import {
  getSales,
} from "@/services/saleService";

import {
  getCustomers,
} from "@/services/customerService";

import {
  getInventoryItems,
} from "@/services/inventoryService";

import {
  getInvoices,
} from "@/services/invoiceService";

import {
  useAuth,
} from "@/context/AuthContext";

import type {
  Repair,
  RepairStatus,
} from "@/types/repair";

// =====================================================
// ADMIN STATS
// =====================================================

type AdminStats = Pick<
  DashboardStats,
  | "totalProducts"
  | "inStock"
  | "outOfStock"
  | "inventoryValue"
>;

// =====================================================
// MANAGER STATS
// =====================================================

type ManagerStats = {
  salesTotal: number;
  salesCount: number;
  totalRepairs: number;
  activeRepairs: number;
  readyRepairs: number;
  totalCustomers: number;
  inventoryItems: number;
  lowStockItems: number;
};

// =====================================================
// TECHNICIAN STATS
// =====================================================

type TechnicianStats = {
  myRepairs: number;
  pendingRepairs: number;
  readyRepairs: number;
  invoiceCount: number;
};

// =====================================================
// INITIAL
// =====================================================

const initialAdminStats:
  AdminStats = {
  totalProducts: 0,
  inStock: 0,
  outOfStock: 0,
  inventoryValue: 0,
};

const initialManagerStats:
  ManagerStats = {
  salesTotal: 0,
  salesCount: 0,
  totalRepairs: 0,
  activeRepairs: 0,
  readyRepairs: 0,
  totalCustomers: 0,
  inventoryItems: 0,
  lowStockItems: 0,
};

const initialTechnicianStats:
  TechnicianStats = {
  myRepairs: 0,
  pendingRepairs: 0,
  readyRepairs: 0,
  invoiceCount: 0,
};

// =====================================================
// STATUS HELPERS
// =====================================================

const pendingStatuses:
  RepairStatus[] = [
  "Received",
  "Diagnosing",
  "Waiting Approval",
  "Waiting Parts",
  "Repairing",
  "Testing",
];

function isPendingStatus(
  status: RepairStatus
) {
  return pendingStatuses.includes(
    status
  );
}

// =====================================================
// DATE FORMAT
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
// PAGE
// =====================================================

export default function DashboardPage() {
  const {
    role,
    appUser,
  } = useAuth();

  // ===================================================
  // ADMIN
  // ===================================================

  const [
    adminStats,
    setAdminStats,
  ] = useState<AdminStats>(
    initialAdminStats
  );

  const [
    recentProducts,
    setRecentProducts,
  ] = useState<
    DashboardStats["recentProducts"]
  >([]);

  // ===================================================
  // MANAGER
  // ===================================================

  const [
    managerStats,
    setManagerStats,
  ] = useState<ManagerStats>(
    initialManagerStats
  );

  const [
    recentRepairs,
    setRecentRepairs,
  ] = useState<Repair[]>(
    []
  );

  // ===================================================
  // TECHNICIAN
  // ===================================================

  const [
    technicianStats,
    setTechnicianStats,
  ] = useState<TechnicianStats>(
    initialTechnicianStats
  );

  const [
    technicianRepairs,
    setTechnicianRepairs,
  ] = useState<Repair[]>(
    []
  );

  // ===================================================
  // LOADING
  // ===================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ===================================================
  // LOAD DASHBOARD
  // ===================================================

  useEffect(() => {
    if (!role) {
      return;
    }

    let active =
      true;

    async function loadDashboard() {
      try {
        setLoading(true);

        // =================================================
        // ADMIN
        // =================================================

        if (
          role ===
          "admin"
        ) {
          const data =
            await getDashboardStats();

          if (!active) {
            return;
          }

          setAdminStats({
            totalProducts:
              data.totalProducts,

            inStock:
              data.inStock,

            outOfStock:
              data.outOfStock,

            inventoryValue:
              data.inventoryValue,
          });

          setRecentProducts(
            data.recentProducts
          );

          return;
        }

        // =================================================
        // MANAGER
        // =================================================

        if (
          role ===
          "manager"
        ) {
          const [
            sales,
            repairs,
            customers,
            inventory,
          ] =
            await Promise.all([
              getSales(),
              getRepairs(),
              getCustomers(),
              getInventoryItems(),
            ]);

          if (!active) {
            return;
          }

          const salesTotal =
            sales.reduce(
              (
                total,
                sale
              ) =>
                total +
                Number(
                  sale.grandTotal ||
                    0
                ),
              0
            );

          const activeRepairs =
            repairs.filter(
              (repair) =>
                ![
                  "Delivered",
                  "Cancelled",
                ].includes(
                  repair.status
                )
            ).length;

          const readyRepairs =
            repairs.filter(
              (repair) =>
                repair.status ===
                "Ready"
            ).length;

          const lowStockItems =
            inventory.filter(
              (item) =>
                item.status ===
                "Low Stock" ||
                Number(
                  item.stockQty || 0
                ) <=
                  Number(
                    item.minimumStock ||
                      0
                  )
            ).length;

          setManagerStats({
            salesTotal,

            salesCount:
              sales.length,

            totalRepairs:
              repairs.length,

            activeRepairs,

            readyRepairs,

            totalCustomers:
              customers.length,

            inventoryItems:
              inventory.length,

            lowStockItems,
          });

          setRecentRepairs(
            repairs.slice(
              0,
              8
            )
          );

          return;
        }

        // =================================================
        // TECHNICIAN
        // =================================================

        if (
          role ===
          "technician"
        ) {
          const [
            repairs,
            invoices,
          ] =
            await Promise.all([
              getRepairs(),
              getInvoices(),
            ]);

          if (!active) {
            return;
          }

          const technicianName =
            appUser?.name
              ?.trim()
              .toLowerCase() ||
            "";

          const assignedRepairs =
            repairs.filter(
              (repair) => {
                const assignedTechnician =
                  repair.estimate?.technician
                    ?.trim()
                    .toLowerCase() ||
                  "";

                return (
                  technicianName.length >
                    0 &&
                  assignedTechnician ===
                    technicianName
                );
              }
            );

          const pendingRepairs =
            assignedRepairs.filter(
              (repair) =>
                isPendingStatus(
                  repair.status
                )
            ).length;

          const readyRepairs =
            assignedRepairs.filter(
              (repair) =>
                repair.status ===
                "Ready"
            ).length;

          setTechnicianStats({
            myRepairs:
              assignedRepairs.length,

            pendingRepairs,

            readyRepairs,

            invoiceCount:
              invoices.length,
          });

          setTechnicianRepairs(
            assignedRepairs.slice(
              0,
              8
            )
          );
        }
      } catch (error) {
        console.error(
          "Dashboard Error:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [
    role,
    appUser?.name,
  ]);

  // ===================================================
  // TECHNICIAN REPAIR FILTERS
  // ===================================================

  const pendingTechnicianRepairs =
    useMemo(
      () =>
        technicianRepairs.filter(
          (repair) =>
            isPendingStatus(
              repair.status
            )
        ),
      [technicianRepairs]
    );

  const readyTechnicianRepairs =
    useMemo(
      () =>
        technicianRepairs.filter(
          (repair) =>
            repair.status ===
            "Ready"
        ),
      [technicianRepairs]
    );

  // ===================================================
  // UNKNOWN / LOADING ROLE
  // ===================================================

  if (!role) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-2xl border border-gray-800 bg-[#181818] px-8 py-6 text-center">
            <Activity
              size={28}
              className="mx-auto animate-pulse text-yellow-400"
            />

            <p className="mt-3 text-sm text-gray-400">
              Loading Dashboard...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ===================================================
  // ADMIN DASHBOARD
  // ===================================================

  if (
    role ===
    "admin"
  ) {
    return (
      <AdminLayout>
        <div className="space-y-8">

          {/* Header */}

          <div>
            <h1 className="text-4xl font-bold text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Welcome to Lappy Care ERP
            </p>
          </div>

          {loading ? (
            <LoadingCard />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                  title="Total Products"
                  value={
                    adminStats.totalProducts
                  }
                />

                <StatCard
                  title="Inventory Value"
                  value={formatCurrency(
                    adminStats.inventoryValue
                  )}
                />

                <StatCard
                  title="In Stock"
                  value={
                    adminStats.inStock
                  }
                  color="text-green-400"
                />

                <StatCard
                  title="Out Of Stock"
                  value={
                    adminStats.outOfStock
                  }
                  color="text-red-400"
                />

              </div>

              <RecentProducts
                products={
                  recentProducts
                }
              />
            </>
          )}

        </div>
      </AdminLayout>
    );
  }

  // ===================================================
  // MANAGER DASHBOARD
  // ===================================================

  if (
    role ===
    "manager"
  ) {
    return (
      <AdminLayout>
        <div className="space-y-8">

          {/* Header */}

          <div>
            <h1 className="text-4xl font-bold text-white">
              Manager Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Operations, sales, repairs and inventory overview.
            </p>
          </div>

          {loading ? (
            <LoadingCard />
          ) : (
            <>
              {/* Main Stats */}

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <DashboardCard
                  icon={
                    <IndianRupee
                      size={21}
                    />
                  }
                  title="Total Sales"
                  value={formatCurrency(
                    managerStats.salesTotal
                  )}
                  description={`${managerStats.salesCount} sales`}
                  iconClass="text-green-400"
                />

                <DashboardCard
                  icon={
                    <Wrench
                      size={21}
                    />
                  }
                  title="Total Repairs"
                  value={
                    managerStats.totalRepairs
                  }
                  description={`${managerStats.activeRepairs} active repairs`}
                  iconClass="text-yellow-400"
                />

                <DashboardCard
                  icon={
                    <Users
                      size={21}
                    />
                  }
                  title="Customers"
                  value={
                    managerStats.totalCustomers
                  }
                  description="Registered customers"
                  iconClass="text-blue-400"
                />

                <DashboardCard
                  icon={
                    <Package
                      size={21}
                    />
                  }
                  title="Inventory"
                  value={
                    managerStats.inventoryItems
                  }
                  description={`${managerStats.lowStockItems} low stock`}
                  iconClass="text-purple-400"
                />

              </div>

              {/* Secondary */}

              <div className="grid gap-5 sm:grid-cols-2">

                <DashboardCard
                  icon={
                    <AlertTriangle
                      size={21}
                    />
                  }
                  title="Low Stock"
                  value={
                    managerStats.lowStockItems
                  }
                  description="Items requiring attention"
                  iconClass="text-orange-400"
                />

                <DashboardCard
                  icon={
                    <CheckCircle2
                      size={21}
                    />
                  }
                  title="Ready Repairs"
                  value={
                    managerStats.readyRepairs
                  }
                  description="Ready for customer pickup"
                  iconClass="text-green-400"
                />

              </div>

              {/* Recent Repairs */}

              <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

                <div className="border-b border-gray-800 px-5 py-4">

                  <div className="flex items-center gap-2">

                    <ClipboardList
                      size={19}
                      className="text-yellow-400"
                    />

                    <h2 className="text-lg font-bold text-white">
                      Recent Repairs
                    </h2>

                  </div>

                </div>

                {recentRepairs.length ===
                0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    No repairs found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="min-w-full">

                      <thead className="bg-black">

                        <tr>

                          <th className="px-5 py-3 text-left text-xs font-bold uppercase text-yellow-400">
                            Repair ID
                          </th>

                          <th className="px-5 py-3 text-left text-xs font-bold uppercase text-yellow-400">
                            Customer
                          </th>

                          <th className="px-5 py-3 text-left text-xs font-bold uppercase text-yellow-400">
                            Device
                          </th>

                          <th className="px-5 py-3 text-left text-xs font-bold uppercase text-yellow-400">
                            Status
                          </th>

                          <th className="px-5 py-3 text-right text-xs font-bold uppercase text-yellow-400">
                            Amount
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {recentRepairs.map(
                          (
                            repair
                          ) => (
                            <tr
                              key={
                                repair.id
                              }
                              className="border-t border-gray-800 hover:bg-white/[0.03]"
                            >

                              <td className="px-5 py-4 font-semibold text-yellow-400">
                                {
                                  repair.repairId
                                }
                              </td>

                              <td className="px-5 py-4">

                                <div className="font-medium text-white">
                                  {
                                    repair.customer?.name ||
                                    "-"
                                  }
                                </div>

                                <div className="text-xs text-gray-500">
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

                                <div className="text-xs text-gray-500">
                                  {
                                    repair.device?.model ||
                                    "-"
                                  }
                                </div>

                              </td>

                              <td className="px-5 py-4">

                                <StatusBadge
                                  status={
                                    repair.status
                                  }
                                />

                              </td>

                              <td className="px-5 py-4 text-right font-semibold text-green-400">
                                {formatCurrency(
                                  Number(
                                    repair.estimate?.totalAmount ||
                                      0
                                  )
                                )}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </section>
            </>
          )}

        </div>
      </AdminLayout>
    );
  }

  // ===================================================
  // TECHNICIAN DASHBOARD
  // ===================================================

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-white">
            Technician Dashboard
          </h1>

          <p className="mt-2 text-gray-400">
            Welcome,{" "}
            <span className="text-white">
              {appUser?.name ||
                "Technician"}
            </span>
          </p>

        </div>

        {loading ? (
          <LoadingCard />
        ) : (
          <>
            {/* Main Stats */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <DashboardCard
                icon={
                  <Wrench
                    size={21}
                  />
                }
                title="My Repairs"
                value={
                  technicianStats.myRepairs
                }
                description="Assigned repair jobs"
                iconClass="text-yellow-400"
              />

              <DashboardCard
                icon={
                  <Activity
                    size={21}
                  />
                }
                title="Pending"
                value={
                  technicianStats.pendingRepairs
                }
                description="Repairs in progress"
                iconClass="text-orange-400"
              />

              <DashboardCard
                icon={
                  <CheckCircle2
                    size={21}
                  />
                }
                title="Ready"
                value={
                  technicianStats.readyRepairs
                }
                description="Ready for pickup"
                iconClass="text-green-400"
              />

              <DashboardCard
                icon={
                  <FileText
                    size={21}
                  />
                }
                title="Invoices"
                value={
                  technicianStats.invoiceCount
                }
                description="Invoice records"
                iconClass="text-blue-400"
              />

            </div>

            {/* Pending Jobs */}

            <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

              <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">

                <div className="flex items-center gap-2">

                  <Activity
                    size={19}
                    className="text-orange-400"
                  />

                  <h2 className="text-lg font-bold text-white">
                    Pending Repairs
                  </h2>

                </div>

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                  {
                    pendingTechnicianRepairs.length
                  }
                </span>

              </div>

              {pendingTechnicianRepairs.length ===
              0 ? (
                <div className="p-8 text-center">

                  <CheckCircle2
                    size={35}
                    className="mx-auto text-green-400"
                  />

                  <p className="mt-3 text-sm font-medium text-white">
                    No pending repairs
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Great job! Your assigned queue is clear.
                  </p>

                </div>
              ) : (
                <RepairList
                  repairs={
                    pendingTechnicianRepairs
                  }
                />
              )}

            </section>

            {/* Ready Jobs */}

            <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

              <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={19}
                    className="text-green-400"
                  />

                  <h2 className="text-lg font-bold text-white">
                    Ready for Pickup
                  </h2>

                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                  {
                    readyTechnicianRepairs.length
                  }
                </span>

              </div>

              {readyTechnicianRepairs.length ===
              0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  No ready repairs.
                </div>
              ) : (
                <RepairList
                  repairs={
                    readyTechnicianRepairs
                  }
                />
              )}

            </section>
          </>
        )}

      </div>
    </AdminLayout>
  );
}

// =====================================================
// LOADING
// =====================================================

function LoadingCard() {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-gray-800 bg-[#181818]">

      <div className="text-center">

        <Activity
          size={32}
          className="mx-auto animate-pulse text-yellow-400"
        />

        <p className="mt-3 text-sm text-gray-400">
          Loading Dashboard...
        </p>

      </div>

    </div>
  );
}

// =====================================================
// DASHBOARD CARD
// =====================================================

function DashboardCard({
  icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {description}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black ${iconClass}`}
        >
          {icon}
        </div>

      </div>

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
  const classes =
    getStatusClasses(
      status
    );

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

function getStatusClasses(
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
// REPAIR LIST
// =====================================================

function RepairList({
  repairs,
}: {
  repairs: Repair[];
}) {
  return (
    <div className="divide-y divide-gray-800">

      {repairs.map(
        (repair) => (
          <div
            key={
              repair.id
            }
            className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_auto]"
          >

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <span className="font-bold text-yellow-400">
                  {
                    repair.repairId
                  }
                </span>

                <StatusBadge
                  status={
                    repair.status
                  }
                />

              </div>

              <p className="mt-2 font-semibold text-white">
                {
                  repair.customer?.name ||
                  "-"
                }
              </p>

              <p className="mt-1 text-sm text-gray-400">
                {[
                  repair.device?.brand,
                  repair.device?.model,
                ]
                  .filter(Boolean)
                  .join(" ") ||
                  "Laptop"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Complaint:{" "}
                {
                  repair.problem?.complaint ||
                  "-"
                }
              </p>

            </div>

            <div className="sm:text-right">

              <p className="font-bold text-green-400">
                {formatCurrency(
                  Number(
                    repair.estimate?.totalAmount ||
                      0
                  )
                )}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {formatDate(
                  repair.createdAt
                )}
              </p>

            </div>

          </div>
        )
      )}

    </div>
  );
}