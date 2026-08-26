// ==========================================
// Laptop Health Types
// ==========================================

export type HealthStatus =
  | "Excellent"
  | "Good"
  | "Fair"
  | "Needs Attention"
  | "Critical";

export type ComponentStatus =
  | "Good"
  | "Fair"
  | "Needs Attention"
  | "Not Tested"
  | "Not Applicable";

export interface LaptopHealth {
  id?: string;

  // Customer Reference
  customerId: string;

  // Laptop Details
  brand?: string;
  model?: string;
  serialNumber?: string;

  // System Information
  processor?: string;
  ram?: string;
  storage?: string;
  operatingSystem?: string;

  // Overall Health
  overallScore?: number;
  overallStatus?: HealthStatus;

  // Hardware Checks
  display?: ComponentStatus;
  keyboard?: ComponentStatus;
  touchpad?: ComponentStatus;
  webcam?: ComponentStatus;
  microphone?: ComponentStatus;
  speakers?: ComponentStatus;
  wifi?: ComponentStatus;
  bluetooth?: ComponentStatus;
  usbPorts?: ComponentStatus;
  hdmiPort?: ComponentStatus;
  chargingPort?: ComponentStatus;

  // Cooling
  temperature?: number;
  fanStatus?: ComponentStatus;

  // Battery
  batteryHealth?: number;
  batteryStatus?: ComponentStatus;
  batteryDesignCapacity?: number;
  batteryFullChargeCapacity?: number;
  batteryCycleCount?: number;

  // Storage Health
  storageHealth?: number;
  storageStatus?: ComponentStatus;
  storageTemperature?: number;
  smartStatus?: string;

  // Security / Software
  antivirusStatus?: ComponentStatus;
  windowsUpdateStatus?: ComponentStatus;

  // Technician Information
  technicianNotes?: string;

  // Service Recommendation
  nextServiceDate?: string;
  nextServiceRecommendation?: string;

  // Report
  checkedAt: string;
  createdAt: string;
  updatedAt: string;
}