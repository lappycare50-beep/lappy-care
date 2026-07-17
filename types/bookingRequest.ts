// ==========================================
// Booking Status
// ==========================================

export type BookingStatus =
  | "Pending"
  | "Contacted"
  | "Scheduled"
  | "Pickup Assigned"
  | "Received"
  | "Cancelled"
  | "Converted";

// ==========================================
// Booking Source
// ==========================================

export type BookingSource =
  | "Website"
  | "WhatsApp"
  | "Phone"
  | "Walk In"
  | "Facebook"
  | "Instagram"
  | "Google";

// ==========================================
// Booking Timeline
// ==========================================

export interface BookingTimeline {

  status: BookingStatus;

  date: string;

  updatedBy: string;

}

// ==========================================
// Booking Request
// ==========================================

export interface BookingRequest {

  // ==========================================
  // Firestore
  // ==========================================

  id: string;

  requestId: string;

  // ==========================================
  // Customer
  // ==========================================

  customerName: string;

  mobile: string;

  alternateMobile: string;

  email: string;

  // ==========================================
  // Device
  // ==========================================

  brand: string;

  model: string;

  // ==========================================
  // Complaint
  // ==========================================

  problem: string;

  // ==========================================
  // Service
  // ==========================================

  pickupRequired: boolean;

  pickupDate: string;

  pickupTime: string;

  // ==========================================
  // Workflow
  // ==========================================

  status: BookingStatus;

  source: BookingSource;

  // ==========================================
  // Admin
  // ==========================================

  assignedTo: string;

  remarks: string;

  // ==========================================
  // ERP Conversion
  // ==========================================

  convertedRepairId: string;
  convertedRepairDocId?: string;

  convertedAt: string;

  // ==========================================
  // Timeline
  // ==========================================

  timeline: BookingTimeline[];

  // ==========================================
  // Audit
  // ==========================================

  createdAt: string;

  updatedAt: string;

}