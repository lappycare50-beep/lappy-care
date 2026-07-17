export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Card"
  | "Bank Transfer";

export interface InvoiceItem {
  id: string;

  name: string;

  qty: number;

  price: number;

  total: number;
}

export interface Invoice {

  id?: string;

  invoiceNo: string;

  repairId?: string;

  customerName: string;

  mobile: string;

  email?: string;

  items: InvoiceItem[];

  subTotal: number;

  discount: number;

  gst: number;

  grandTotal: number;

  paymentMethod: PaymentMethod;

  createdAt: string;

  remarks?: string;
}