// ==========================================
// Contact Status
// ==========================================

export type ContactStatus =
  | "New"
  | "In Progress"
  | "Resolved";

// ==========================================
// Contact Source
// ==========================================

export type ContactSource =
  | "Website"
  | "WhatsApp"
  | "Phone"
  | "Facebook"
  | "Instagram"
  | "Google"
  | "Walk In";

// ==========================================
// Timeline
// ==========================================

export interface ContactTimeline {
  status: ContactStatus;

  date: string;

  updatedBy: string;

  note?: string;
}

// ==========================================
// Contact Message
// ==========================================

export interface ContactMessage {
  id?: string;

  contactId: string;

  name: string;
  mobile: string;
  email?: string;
  subject?: string;
 message: string;

  status: ContactStatus;
  source: ContactSource;
  assignedTo: string;
 remarks?: string;

  timeline?: ContactTimeline[];

  createdAt: string;
  updatedAt: string;
}