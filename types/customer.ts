// ==========================================
// Customer Type
// ==========================================

export interface Customer {
  id?: string;

  customerId: string;

  // Basic Details
  name: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstNumber?: string;
  companyName?: string;

  // Statistics
  totalRepairs: number;
  totalInvoices: number;
  totalSpent: number;
  pendingAmount: number;

  // References
  lastRepairId?: string;
  lastInvoiceId?: string;
  lastVisit?: string;

  // Other
  notes?: string;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}