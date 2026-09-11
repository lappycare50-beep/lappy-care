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

export function getFinancialYear(): string {
  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    today.getMonth() + 1;

  if (month >= 4) {
    return `${String(
      year
    ).slice(-2)}-${String(
      year + 1
    ).slice(-2)}`;
  }

  return `${String(
    year - 1
  ).slice(-2)}-${String(
    year
  ).slice(-2)}`;
}

// ==========================================
// Generic Counter ID
// ==========================================

export async function generateId(
  type: CounterType,
  branch = "WKD"
): Promise<string> {
  const config =
    CONFIG[type];

  const counterRef =
    doc(
      db,
      COLLECTION,
      type
    );

  const nextNumber =
    await runTransaction(
      db,
      async (transaction) => {
        const snapshot =
          await transaction.get(
            counterRef
          );

        const current =
          snapshot.exists()
            ? Number(
                snapshot.data()
                  .current || 0
              )
            : 0;

        const next =
          current + 1;

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

  return `${branch}-${config.prefix}${number}`;
}

// ==========================================
// Generic IDs
// ==========================================

export function generateRepairId() {
  return generateId(
    "repair"
  );
}

export function generateCustomerId() {
  return generateId(
    "customer"
  );
}

export function generateBookingId() {
  return generateId(
    "booking"
  );
}

export function generateContactId() {
  return generateId(
    "contact"
  );
}

export function generatePurchaseId() {
  return generateId(
    "purchase"
  );
}

export function generateVendorId() {
  return generateId(
    "vendor"
  );
}

export function generateProductId() {
  return generateId(
    "product"
  );
}