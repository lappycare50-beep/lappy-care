// ==========================================
// Sale Payment Method
// ==========================================

export type SalePaymentMethod =
  | "Cash"
  | "UPI"
  | "Card"
  | "Bank Transfer";

// ==========================================
// Sale Status
// ==========================================

export type SaleStatus =
  | "Draft"
  | "Completed"
  | "Cancelled";

// ==========================================
// Sale Item
// ==========================================

export interface SaleItem {
  id: string;

  inventoryId: string;

  sku: string;

  name: string;

  category: string;

  quantity: number;

  unitPrice: number;

  total: number;
}

// ==========================================
// Main Sale
// ==========================================

export interface Sale {
  id?: string;

  saleNo: string;

  customerId?: string;

  customerName: string;

  mobile: string;

  email?: string;

  items: SaleItem[];

  subTotal: number;

  discount: number;

  gst: number;

  grandTotal: number;

  paymentMethod: SalePaymentMethod;

  paymentStatus: "Pending" | "Paid" | "Partial";

  status: SaleStatus;

  remarks?: string;

  createdAt: string;

  updatedAt: string;
}