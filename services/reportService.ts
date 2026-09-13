import { getRepairs } from "@/services/repairService";
import {
  Repair,
  RepairStatus,
  PaymentStatus,
  Priority,
} from "@/types/repair";

// ==========================================
// REPORT TYPES
// ==========================================

export type ReportDateFilter =
  | "all"
  | "today"
  | "7days"
  | "30days";

export type TechnicianReport = {
  technician: string;
  totalJobs: number;
  completed: number;
  active: number;
  serviceValue: number;
};

export type ReportsData = {
  totalRepairs: number;
  activeRepairs: number;
  readyRepairs: number;
  deliveredRepairs: number;
  cancelledRepairs: number;

  totalServiceValue: number;
  advanceCollected: number;
  balancePending: number;
  discountGiven: number;

  statusCounts: Record<
    RepairStatus,
    number
  >;

  paymentCounts: Record<
    PaymentStatus,
    number
  >;

  priorityCounts: Record<
    Priority,
    number
  >;

  technicianReports: TechnicianReport[];

  recentRepairs: Repair[];
};

// ==========================================
// DEFAULT COUNTS
// ==========================================

function createStatusCounts(): Record<
  RepairStatus,
  number
> {
  return {
    Received: 0,
    Diagnosing: 0,
    "Waiting Approval": 0,
    "Waiting Parts": 0,
    Repairing: 0,
    Testing: 0,
    Ready: 0,
    Delivered: 0,
    Cancelled: 0,
  };
}

function createPaymentCounts(): Record<
  PaymentStatus,
  number
> {
  return {
    Pending: 0,
    Partial: 0,
    Paid: 0,
  };
}

function createPriorityCounts(): Record<
  Priority,
  number
> {
  return {
    Low: 0,
    Medium: 0,
    High: 0,
    Urgent: 0,
  };
}

// ==========================================
// DATE FILTER
// ==========================================

function startOfDay(
  date: Date
) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function matchesDateFilter(
  createdAt: string,
  filter: ReportDateFilter
) {
  if (filter === "all") {
    return true;
  }

  if (!createdAt) {
    return false;
  }

  const created =
    new Date(createdAt);

  if (
    Number.isNaN(
      created.getTime()
    )
  ) {
    return false;
  }

  const today =
    startOfDay(
      new Date()
    );

  const createdDay =
    startOfDay(created);

  if (filter === "today") {
    return (
      createdDay.getTime() ===
      today.getTime()
    );
  }

  const days =
    filter === "7days"
      ? 7
      : 30;

  const start =
    new Date(today);

  start.setDate(
    start.getDate() -
      (days - 1)
  );

  return (
    createdDay >= start &&
    createdDay <= today
  );
}

// ==========================================
// GET REPORT DATA
// ==========================================

export async function getReportsData(
  filter: ReportDateFilter = "all"
): Promise<ReportsData> {
  const repairs =
    await getRepairs();

  const filteredRepairs =
    repairs.filter(
      (repair) =>
        matchesDateFilter(
          repair.createdAt,
          filter
        )
    );

  const statusCounts =
    createStatusCounts();

  const paymentCounts =
    createPaymentCounts();

  const priorityCounts =
    createPriorityCounts();

  let totalServiceValue = 0;
  let advanceCollected = 0;
  let balancePending = 0;
  let discountGiven = 0;

  let readyRepairs = 0;
  let deliveredRepairs = 0;
  let cancelledRepairs = 0;

  const technicianMap =
    new Map<
      string,
      TechnicianReport
    >();

  for (const repair of filteredRepairs) {
    // ========================================
    // STATUS
    // ========================================

    statusCounts[
      repair.status
    ] += 1;

    if (
      repair.status ===
      "Ready"
    ) {
      readyRepairs += 1;
    }

    if (
      repair.status ===
      "Delivered"
    ) {
      deliveredRepairs += 1;
    }

    if (
      repair.status ===
      "Cancelled"
    ) {
      cancelledRepairs += 1;
    }

    // ========================================
    // PAYMENT
    // ========================================

    paymentCounts[
      repair.paymentStatus
    ] += 1;

    // ========================================
    // PRIORITY
    // ========================================

    priorityCounts[
      repair.estimate.priority
    ] += 1;

    // ========================================
    // FINANCIALS
    // ========================================

    totalServiceValue +=
      Number(
        repair.estimate
          ?.totalAmount || 0
      );

    advanceCollected +=
      Number(
        repair.estimate
          ?.advancePaid || 0
      );

    balancePending +=
      Number(
        repair.estimate
          ?.balanceAmount || 0
      );

    discountGiven +=
      Number(
        repair.estimate
          ?.discount || 0
      );

    // ========================================
    // TECHNICIAN
    // ========================================

    const technician =
      repair.estimate
        ?.technician?.trim() ||
      "Unassigned";

    const existing =
      technicianMap.get(
        technician
      );

    if (!existing) {
      technicianMap.set(
        technician,
        {
          technician,
          totalJobs: 1,
          completed:
            repair.status ===
            "Delivered"
              ? 1
              : 0,
          active:
            repair.status !==
              "Delivered" &&
            repair.status !==
              "Cancelled"
              ? 1
              : 0,
          serviceValue:
            Number(
              repair.estimate
                ?.totalAmount || 0
            ),
        }
      );
    } else {
      existing.totalJobs += 1;

      if (
        repair.status ===
        "Delivered"
      ) {
        existing.completed +=
          1;
      }

      if (
        repair.status !==
          "Delivered" &&
        repair.status !==
          "Cancelled"
      ) {
        existing.active +=
          1;
      }

      existing.serviceValue +=
        Number(
          repair.estimate
            ?.totalAmount || 0
        );
    }
  }

  const technicianReports =
    Array.from(
      technicianMap.values()
    ).sort(
      (a, b) =>
        b.serviceValue -
        a.serviceValue
    );

  // ========================================
  // RECENT
  // ========================================

  const recentRepairs =
    [...filteredRepairs]
      .sort(
        (a, b) =>
          extractRepairNumber(
            b.repairId
          ) -
          extractRepairNumber(
            a.repairId
          )
      )
      .slice(0, 10);

  const totalRepairs =
    filteredRepairs.length;

  const activeRepairs =
    totalRepairs -
    deliveredRepairs -
    cancelledRepairs;

  return {
    totalRepairs,
    activeRepairs,
    readyRepairs,
    deliveredRepairs,
    cancelledRepairs,

    totalServiceValue,
    advanceCollected,
    balancePending,
    discountGiven,

    statusCounts,
    paymentCounts,
    priorityCounts,

    technicianReports,

    recentRepairs,
  };
}

// ==========================================
// Repair Number
// ==========================================

function extractRepairNumber(
  repairId?: string
) {
  if (!repairId) {
    return 0;
  }

  const match =
    repairId.match(
      /(\d+)$/
    );

  if (!match) {
    return 0;
  }

  return Number(
    match[1]
  );
}