// ==========================================
// Repair Constants
// Lappy Care ERP
// ==========================================

// ==========================================
// Repair Status
// ==========================================

export const REPAIR_STATUS = [
  "Received",
  "Diagnosing",
  "Waiting Approval",
  "Waiting Parts",
  "Repairing",
  "Testing",
  "Ready",
  "Delivered",
  "Cancelled",
] as const;

export type RepairStatus = (typeof REPAIR_STATUS)[number];

// ==========================================
// Payment Status
// ==========================================

export const PAYMENT_STATUS = [
  "Pending",
  "Partial",
  "Paid",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[number];

// ==========================================
// Priority
// ==========================================

export const PRIORITY = [
  "Low",
  "Medium",
  "High",
  "Urgent",
] as const;

export type Priority = (typeof PRIORITY)[number];

// ==========================================
// Warranty
// ==========================================

export const WARRANTY = [
  "No Warranty",
  "7 Days",
  "15 Days",
  "30 Days",
  "90 Days",
  "6 Months",
  "1 Year",
] as const;

export type Warranty = (typeof WARRANTY)[number];

// ==========================================
// Device Types
// ==========================================

export const DEVICE_TYPES = [
  "Laptop",
  "Desktop",
  "MacBook",
  "All-in-One",
  "Mini PC",
  "Printer",
  "Monitor",
] as const;

export type DeviceType = (typeof DEVICE_TYPES)[number];

// ==========================================
// Laptop Brands
// ==========================================

export const DEVICE_BRANDS = [
  "Acer",
  "Apple",
  "ASUS",
  "Avita",
  "Dell",
  "Fujitsu",
  "HP",
  "Honor",
  "Huawei",
  "IBM",
  "Infinix",
  "Lenovo",
  "LG",
  "MSI",
  "Microsoft",
  "Razer",
  "Realme",
  "Samsung",
  "Sony",
  "Toshiba",
  "Vaio",
  "Zebronics",
  "Other",
] as const;

export type DeviceBrand = (typeof DEVICE_BRANDS)[number];

// ==========================================
// Accessories
// ==========================================

export const ACCESSORIES = [
  "Laptop Bag",
  "Laptop Charger",
  "Power Cable",
  "Battery",
  "Mouse",
  "Keyboard",
  "USB Receiver",
  "Hard Disk",
  "SSD",
  "RAM",
  "Pendrive",
  "Memory Card",
  "External HDD",
  "Adapter",
  "Docking Station",
  "Stylus",
  "CD/DVD",
  "Other",
] as const;

export type Accessory = (typeof ACCESSORIES)[number];

// ==========================================
// Complaint Categories
// ==========================================

export const COMPLAINTS = [
  "No Power",
  "No Display",
  "Slow Performance",
  "Hanging",
  "Heating",
  "Fan Noise",
  "Battery Issue",
  "Charging Issue",
  "Keyboard Issue",
  "Touchpad Issue",
  "Screen Broken",
  "Display Flickering",
  "Hinge Broken",
  "Water Damage",
  "Motherboard Issue",
  "BIOS Issue",
  "OS Installation",
  "Virus Removal",
  "Data Recovery",
  "SSD Upgrade",
  "RAM Upgrade",
  "Software Issue",
  "Printer Issue",
  "Other",
] as const;

export type Complaint = (typeof COMPLAINTS)[number];

// ==========================================
// Repair Timeline Events
// ==========================================

export const TIMELINE_EVENTS = [
  "Received",
  "Diagnosis Started",
  "Diagnosis Completed",
  "Estimate Sent",
  "Customer Approved",
  "Parts Ordered",
  "Repair Started",
  "Repair Completed",
  "Testing",
  "Ready For Delivery",
  "Delivered",
  "Cancelled",
] as const;

export type TimelineEvent = (typeof TIMELINE_EVENTS)[number];