import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Customer } from "@/types/customer";

const COLLECTION = "customers";

// ==========================================
// Generate Unique Customer QR Token
// ==========================================

export function generateCustomerQrToken(): string {
  const uuid =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 14)}`;

  return uuid.replace(/-/g, "");
}

// ==========================================
// Build Customer Public QR URL
// ==========================================

export function getCustomerQrUrl(
  qrToken: string
): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/customer/${encodeURIComponent(
      qrToken
    )}`;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "";

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is not configured."
    );
  }

  return `${baseUrl.replace(/\/$/, "")}/customer/${encodeURIComponent(
    qrToken
  )}`;
}

// ==========================================
// Get Customer By QR Token
// ==========================================

export async function getCustomerByQrToken(
  qrToken: string
): Promise<Customer | null> {
  const normalizedToken = qrToken.trim();

  if (!normalizedToken) {
    return null;
  }

  const q = query(
    collection(db, COLLECTION),
    where("qrToken", "==", normalizedToken),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const document = snapshot.docs[0];

  return {
    id: document.id,
    ...(document.data() as Omit<Customer, "id">),
  };
}

// ==========================================
// Ensure QR Token For One Customer
// ==========================================

export async function ensureCustomerQrToken(
  customer: Customer
): Promise<string> {
  if (customer.qrToken?.trim()) {
    return customer.qrToken;
  }

  if (!customer.id) {
    throw new Error(
      "Customer ID is required to generate a QR token."
    );
  }

  const qrToken = generateCustomerQrToken();

  await updateDoc(
    doc(db, COLLECTION, customer.id),
    {
      qrToken,
      updatedAt: new Date().toISOString(),
    }
  );

  return qrToken;
}

// ==========================================
// Generate Missing QR Tokens For All Customers
// ==========================================

export async function generateMissingCustomerQrTokens(): Promise<{
  scanned: number;
  generated: number;
  alreadyHadQr: number;
}> {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

  let generated = 0;
  let alreadyHadQr = 0;

  let batch = writeBatch(db);
  let batchWrites = 0;

  const commitBatch = async () => {
    if (batchWrites === 0) {
      return;
    }

    await batch.commit();

    batch = writeBatch(db);
    batchWrites = 0;
  };

  for (const document of snapshot.docs) {
    const data =
      document.data() as Omit<Customer, "id">;

    // Never replace an existing QR token.
    if (data.qrToken?.trim()) {
      alreadyHadQr++;
      continue;
    }

    const qrToken = generateCustomerQrToken();

    batch.update(
      doc(db, COLLECTION, document.id),
      {
        qrToken,
        updatedAt: new Date().toISOString(),
      }
    );

    generated++;
    batchWrites++;

    // Stay safely below Firestore's 500-operation batch limit.
    if (batchWrites === 450) {
      await commitBatch();
    }
  }

  await commitBatch();

  return {
    scanned: snapshot.size,
    generated,
    alreadyHadQr,
  };
}