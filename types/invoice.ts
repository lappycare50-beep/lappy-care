// ==========================================
// Invoice Types
// ==========================================

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Card"
  | "Bank Transfer";

// ==========================================
// Invoice Item
// ==========================================

export interface InvoiceItem {
  id: string;

  name: string;

  qty: number;

  price: number;

  total: number;
}

// ==========================================
// Invoice
// ==========================================

export interface Invoice {
  // Firestore Document ID
  id?: string;

  // Invoice Number
  invoiceNo: string;

  // ==========================================
  // Customer Reference
  // ==========================================

  customerId?: string;

  customerName: string;

  mobile: string;

  email?: string;

  // ==========================================
  // Repair Reference
  // ==========================================

  repairId?: string;

  // ==========================================
  // Invoice Items
  // ==========================================

  items: InvoiceItem[];

  // ==========================================
  // Amounts
  // ==========================================

  subTotal: number;

  discount: number;

  gst: number;

  grandTotal: number;

  // ==========================================
  // Payment
  // ==========================================

  paymentMethod: PaymentMethod;

  // ==========================================
  // Date
  // ==========================================

  createdAt: string;

  // ==========================================
  // Other
  // ==========================================

  remarks?: string;
}