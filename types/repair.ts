// ==========================================
// Repair Status
// ==========================================

export type RepairStatus =
  | "Received"
  | "Diagnosing"
  | "Waiting Approval"
  | "Waiting Parts"
  | "Repairing"
  | "Testing"
  | "Ready"
  | "Delivered"
  | "Cancelled";

// ==========================================
// Payment Status
// ==========================================

export type PaymentStatus =
  | "Pending"
  | "Partial"
  | "Paid";

// ==========================================
// Priority
// ==========================================

export type Priority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

// ==========================================
// Customer
// ==========================================

export interface RepairCustomer {
  customerId?: string;

  name: string;

  mobile: string;

  alternateMobile?: string;

  email?: string;

  address?: string;

  city?: string;

  state?: string;

  pincode?: string;
}

// ==========================================
// Device
// ==========================================

export interface RepairDevice {
  type: string;

  brand: string;

  model: string;

  serialNo: string;

  processor?: string;

  ram?: string;

  storage?: string;

  color?: string;

  image?: string;

  devicePhotos?: string[];
}

// ==========================================
// Accessories
// ==========================================

export interface RepairAccessories {
  items: string[];
  other: string;
}

// ==========================================
// Problem
// ==========================================

export interface RepairProblem {
  complaint: string;

  physicalCondition: string;

  diagnosis?: string;

  password?: string;

  biosPassword?: string;
}

// ==========================================
// Estimate
// ==========================================

export interface RepairEstimate {
  labourCharge: number;

  partsCharge: number;

  discount: number;

  totalAmount: number;

  advancePaid: number;

  balanceAmount: number;

  expectedDelivery: string;

  technician: string;

  priority: Priority;
}

// ==========================================
// Assignment
// ==========================================

export interface RepairAssignment {
  technician: string;

  priority: Priority;
}

// ==========================================
// Timeline
// ==========================================

export interface RepairTimeline {
  status: RepairStatus;

  note?: string;

  updatedBy?: string;

  createdAt: string;
}

// ==========================================
// Main Repair Model
// ==========================================

export interface Repair {

  id?: string;

  repairId: string;

  customer: RepairCustomer;

  device: RepairDevice;

  accessories: RepairAccessories;

  problem: RepairProblem;

  estimate: RepairEstimate;

  paymentStatus: PaymentStatus;

  status: RepairStatus;

  warranty: string;

  remarks: string;

  createdAt: string;

  updatedAt: string;

  deliveredAt?: string;

  timeline: RepairTimeline[];

}