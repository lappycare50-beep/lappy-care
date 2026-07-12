import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Repair } from "@/types/repair";

const repairsCollection = collection(db, "repairs");

// Get All Repairs
export async function getRepairs(): Promise<Repair[]> {
  const snapshot = await getDocs(repairsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Repair, "id">),
  }));
}

// Live Listener
export function subscribeRepairs(
  callback: (repairs: Repair[]) => void
) {
  return onSnapshot(repairsCollection, (snapshot) => {
    const repairs: Repair[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Repair, "id">),
    }));

    callback(repairs);
  });
}

// Add Repair
export async function addRepair(
  repair: Omit<Repair, "id">
) {
  return await addDoc(repairsCollection, repair);
}

// Update Repair
export async function updateRepair(
  id: string,
  repair: Partial<Repair>
) {
  const repairRef = doc(db, "repairs", id);

  await updateDoc(repairRef, repair);
}

// Delete Repair
export async function deleteRepair(id: string) {
  const repairRef = doc(db, "repairs", id);

  await deleteDoc(repairRef);
}