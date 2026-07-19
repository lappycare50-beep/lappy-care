import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

// ==========================================
// Counter Collection
// ==========================================

const COLLECTION = "counters";

// ==========================================
// Helper Functions
// ==========================================

export function generateRepairId() {
  return generateId("repair");
}

export function generateCustomerId() {
  return generateId("customer");
}

export function generateBookingId() {
  return generateId("booking");
}

export function generateContactId() {
  return generateId("contact");
}

export function generateInvoiceId() {
  return generateId("invoice", "WKD", true);
}

export function generatePurchaseId() {
  return generateId("purchase", "WKD", true);
}

export function generateVendorId() {
  return generateId("vendor");
}

export function generateProductId() {
  return generateId("product");
}

// ==========================================
// Configuration
// ==========================================

const CONFIG = {

  repair: {
    prefix: "LC",
    digits: 6,
  },

  customer: {
    prefix: "CU",
    digits: 6,
  },

  booking: {
    prefix: "BR",
    digits: 6,
  },

  contact: {
  prefix: "CT",
  digits: 6,
},

  invoice: {
    prefix: "INV",
    digits: 6,
  },

  purchase: {
    prefix: "PO",
    digits: 6,
  },

  vendor: {
    prefix: "VE",
    digits: 6,
  },

  product: {
    prefix: "PR",
    digits: 6,
  },

} as const;

export type CounterType =
  keyof typeof CONFIG;

// ==========================================
// Financial Year
// ==========================================

function getFinancialYear() {

  const today = new Date();

  const year = today.getFullYear();

  const month = today.getMonth() + 1;

  if (month >= 4) {

    return `${String(year).slice(-2)}-${String(
      year + 1
    ).slice(-2)}`;

  }

  return `${String(year - 1).slice(-2)}-${String(
    year
  ).slice(-2)}`;

}

// ==========================================
// Generate Generic ID
// ==========================================

export async function generateId(
  type: CounterType,
  branch = "WKD",
  useFinancialYear = false
): Promise<string> {

  const config = CONFIG[type];

  const documentName =
    useFinancialYear
      ? `${type}_${getFinancialYear()}`
      : type;

  const counterRef = doc(
    db,
    COLLECTION,
    documentName
  );

  const nextNumber =
    await runTransaction(
      db,
      async (transaction) => {

        const snapshot =
          await transaction.get(counterRef);

        let current = 0;

        if (snapshot.exists()) {

          current =
            snapshot.data().current ?? 0;

        }

        const next = current + 1;

        transaction.set(
          counterRef,
          {
            current: next,
            updatedAt:
              new Date().toISOString(),
          },
          {
            merge: true,
          }
        );

        return next;

      }
    );

  const number =
    nextNumber
      .toString()
      .padStart(
        config.digits,
        "0"
      );

  if (useFinancialYear) {

    return `${branch}-${config.prefix}-${getFinancialYear()}-${number}`;

  }

  return `${branch}-${config.prefix}${number}`;

}