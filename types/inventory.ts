// ==========================================
// Inventory Types
// ==========================================

export type InventoryCategory =
  | "Laptop"
  | "SSD"
  | "RAM"
  | "HDD"
  | "Battery"
  | "Charger"
  | "Display"
  | "Keyboard"
  | "Adapter"
  | "Other";

// ==========================================
// Inventory Status
// ==========================================

export type InventoryStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

// ==========================================
// Stock Transaction Type
// ==========================================

export type StockTransactionType =
  | "Initial Stock"
  | "Stock In"
  | "Stock Out"
  | "Adjustment";

// ==========================================
// Inventory Item
// ==========================================

export interface InventoryItem {
  id?: string;

  sku: string;

  name: string;

  category: InventoryCategory;

  brand?: string;

  model?: string;

  purchasePrice: number;

  sellingPrice: number;

  stockQty: number;

  minimumStock: number;

  supplier?: string;

  location?: string;

  status: InventoryStatus;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}

// ==========================================
// Stock History
// ==========================================

export interface StockTransaction {
  id?: string;

  inventoryId: string;

  sku: string;

  itemName: string;

  type: StockTransactionType;

  quantity: number;

  previousStock: number;

  newStock: number;

  reason?: string;

  reference?: string;

  createdAt: string;
}