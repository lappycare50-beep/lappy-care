export type RepairStatus =
  | "Received"
  | "Diagnosing"
  | "Waiting Parts"
  | "Repairing"
  | "Testing"
  | "Ready"
  | "Delivered";

export type PaymentStatus =
  | "Pending"
  | "Partial"
  | "Paid";

export type Priority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export interface Repair {
  id?: string;

  // ==========================
  // Auto Generated
  // ==========================

  repairId: string;

  // ==========================
  // Customer
  // ==========================

  customerName: string;
  mobile: string;
  email?: string;

  // ==========================
  // Device
  // ==========================

  brand: string;
  model: string;
  serialNo: string;
  image?: string;

  // ==========================
  // Repair Details
  // ==========================

  problem: string;
  accessories: string;

  technician: string;

  priority: Priority;

  // ==========================
  // Cost
  // ==========================

  estimatedCost: number;
  finalCost: number;

  advancePaid: number;
  balanceAmount: number;

  // ==========================
  // Status
  // ==========================

  status: RepairStatus;

  // ==========================
  // Payment
  // ==========================

  paymentStatus: PaymentStatus;

  // ==========================
  // Dates
  // ==========================

  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;

  // ==========================
  // Warranty
  // ==========================

  warranty?: string;

  // ==========================
  // Notes
  // ==========================

  remarks?: string;
}