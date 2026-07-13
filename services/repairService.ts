import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Repair } from "@/types/repair";

const COLLECTION = "repairs";
// ==========================
// Get Repairs
// ==========================

export async function getRepairs(): Promise<Repair[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Repair, "id">),
  }));
}
// ==========================
// Add Repair
// ==========================

export async function addRepair(
  repair: Omit<Repair, "id">
) {
  return await addDoc(
    collection(db, COLLECTION),
    repair
  );
}

// ==========================
// Update Repair
// ==========================

export async function updateRepair(
  id: string,
  repair: Omit<Repair, "id">
) {
  await updateDoc(
    doc(db, COLLECTION, id),
    repair
  );
}

export async function deleteRepair(
  id: string
) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}