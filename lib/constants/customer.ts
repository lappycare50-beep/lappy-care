// ==========================================
// Customer Constants
// Lappy Care ERP
// ==========================================

// ==========================================
// Customer Type
// ==========================================

export const CUSTOMER_TYPES = [
  "Individual",
  "Business",
  "Corporate",
  "Government",
  "Educational Institute",
] as const;

export type CustomerType = (typeof CUSTOMER_TYPES)[number];

// ==========================================
// Customer Status
// ==========================================

export const CUSTOMER_STATUS = [
  "Active",
  "Inactive",
  "Blocked",
] as const;

export type CustomerStatus = (typeof CUSTOMER_STATUS)[number];

// ==========================================
// Customer Source
// ==========================================

export const CUSTOMER_SOURCES = [
  "Walk-In",
  "Google Search",
  "Google Maps",
  "Google Review",
  "Facebook",
  "Instagram",
  "WhatsApp",
  "YouTube",
  "LinkedIn",
  "Referral",
  "JustDial",
  "IndiaMART",
  "Website",
  "Existing Customer",
  "Advertisement",
  "Other",
] as const;

export type CustomerSource = (typeof CUSTOMER_SOURCES)[number];

// ==========================================
// ID Proof
// ==========================================

export const ID_PROOF_TYPES = [
  "Aadhaar Card",
  "PAN Card",
  "Driving License",
  "Passport",
  "Voter ID",
  "Company ID",
  "Student ID",
  "Other",
] as const;

export type IdProofType = (typeof ID_PROOF_TYPES)[number];

// ==========================================
// GST Type
// ==========================================

export const GST_TYPES = [
  "Registered",
  "Unregistered",
  "Composition",
] as const;

export type GstType = (typeof GST_TYPES)[number];

// ==========================================
// Customer Tags
// ==========================================

export const CUSTOMER_TAGS = [
  "New",
  "Regular",
  "VIP",
  "AMC",
  "Corporate",
  "Wholesale",
  "Retail",
] as const;

export type CustomerTag = (typeof CUSTOMER_TAGS)[number];

// ==========================================
// Communication Preference
// ==========================================

export const CONTACT_PREFERENCES = [
  "Call",
  "WhatsApp",
  "SMS",
  "Email",
] as const;

export type ContactPreference =
  (typeof CONTACT_PREFERENCES)[number];