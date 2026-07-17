// ==========================================
// Feature Configuration
// Lappy Care ERP
// ==========================================

export const FEATURES = {
  // ==========================================
  // Core Modules
  // ==========================================

  dashboard: true,

  repair: true,

  customers: true,

  inventory: true,

  billing: true,

  quotations: true,

  payments: true,

  reports: true,

  // ==========================================
  // Sales & Purchase
  // ==========================================

  sales: true,

  purchase: true,

  suppliers: true,

  refurbishedStore: true,

  // ==========================================
  // CRM
  // ==========================================

  crm: true,

  followUps: true,

  notifications: true,

  sms: false,

  email: true,

  whatsapp: true,

  // ==========================================
  // Services
  // ==========================================

  pickupAndDrop: true,

  onsiteService: false,

  onlineBooking: true,

  warranty: true,

  amc: false,

  // ==========================================
  // Staff Management
  // ==========================================

  employees: false,

  attendance: false,

  payroll: false,

  leaveManagement: false,

  // ==========================================
  // Multi Branch
  // ==========================================

  branches: false,

  // ==========================================
  // Security
  // ==========================================

  roles: true,

  permissions: true,

  activityLogs: true,

  // ==========================================
  // Integrations
  // ==========================================

  api: false,

  googleDrive: false,

  razorpay: false,

  cashfree: false,

  firebaseStorage: true,

  // ==========================================
  // AI
  // ==========================================

  aiDiagnosis: false,

  aiReports: false,

  aiChatbot: false,
} as const;

export type Features = typeof FEATURES;