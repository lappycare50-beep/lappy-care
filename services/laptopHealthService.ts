// ==========================================
// Laptop Health Service
// ==========================================

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  LaptopHealth,
} from "@/types/laptopHealth";

const COLLECTION = "laptopHealth";

// ==========================================
// Get Health Reports For Customer
// ==========================================

export async function getLaptopHealthReports(
  customerId: string
): Promise<LaptopHealth[]> {

  const q = query(
    collection(db, COLLECTION),
    where("customerId", "==", customerId),
    orderBy("checkedAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<LaptopHealth, "id">),
  }));
}

// ==========================================
// Get Latest Health Report
// ==========================================

export async function getLatestLaptopHealth(
  customerId: string
): Promise<LaptopHealth | null> {

  const q = query(
    collection(db, COLLECTION),
    where("customerId", "==", customerId),
    orderBy("checkedAt", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const document = snapshot.docs[0];

  return {
    id: document.id,
    ...(document.data() as Omit<LaptopHealth, "id">),
  };
}

// ==========================================
// Get Health Report By ID
// ==========================================

export async function getLaptopHealthById(
  id: string
): Promise<LaptopHealth | null> {

  const snapshot = await getDoc(
    doc(db, COLLECTION, id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<LaptopHealth, "id">),
  };
}

// ==========================================
// Create Health Report
// ==========================================

export async function addLaptopHealth(
  health: Omit<LaptopHealth, "id">
) {

  return await addDoc(
    collection(db, COLLECTION),
    health
  );
}

// ==========================================
// Update Health Report
// ==========================================

export async function updateLaptopHealth(
  id: string,
  health: Omit<LaptopHealth, "id">
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    health
  );
}

// ==========================================
// Delete Health Report
// ==========================================

export async function deleteLaptopHealth(
  id: string
) {

  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}

// ==========================================
// Create Or Update Latest Health Report
// ==========================================

export async function saveLaptopHealth(
  customerId: string,
  health: Omit<LaptopHealth, "id">
) {

  const existing =
    await getLatestLaptopHealth(customerId);

  if (existing?.id) {

    await updateLaptopHealth(
      existing.id,
      health
    );

    return existing.id;
  }

  const result =
    await addLaptopHealth(health);

  return result.id;
}