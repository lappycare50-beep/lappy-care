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

export interface Repair {
  id?: string;

  // Auto Generated
  repairId: string;

  // Customer
  customerName: string;
  mobile: string;
  email?: string;

  // Device
  brand: string;
  model: string;
  serialNo: string;

  // Repair Details
  problem: string;
  accessories: string;

  // Cost
  estimatedCost: number;
  finalCost: number;

  // Assignment
  technician: string;

  // Status
  status: RepairStatus;

  // Payment
  paymentStatus: PaymentStatus;

  // Dates
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;

  // Notes
  remarks?: string;
}