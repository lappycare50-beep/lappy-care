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
  DocumentReference,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Repair } from "@/types/repair";

// ==========================================
// Collection
// ==========================================

const COLLECTION = "repairs";

// ==========================================
// Get All Repairs
// ==========================================

export async function getRepairs(): Promise<Repair[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<Repair, "id">),
    }));
  } catch (error) {
    console.error("Error getting repairs:", error);
    return [];
  }
}

// ==========================================
// Get Repair By Firestore ID
// ==========================================

export async function getRepairById(
  id: string
): Promise<Repair | null> {
  try {
    const snapshot = await getDoc(
      doc(db, COLLECTION, id)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<Repair, "id">),
    };
  } catch (error) {
    console.error("Error getting repair:", error);
    return null;
  }
}

// ==========================================
// Add Repair
// ==========================================

export async function addRepair(
  repair: Repair
): Promise<DocumentReference> {
  try {
    const { id, ...data } = repair;

    return await addDoc(
      collection(db, COLLECTION),
      data
    );
  } catch (error) {
    console.error("Error adding repair:", error);
    throw error;
  }
}

// ==========================================
// Update Repair
// ==========================================

export async function updateRepair(
  id: string,
  repair: Repair
): Promise<void> {
  try {
    const { id: _, ...data } = repair;

    await updateDoc(
      doc(db, COLLECTION, id),
      data
    );
  } catch (error) {
    console.error("Error updating repair:", error);
    throw error;
  }
}

// ==========================================
// Delete Repair
// ==========================================

export async function deleteRepair(
  id: string
): Promise<void> {
  try {
    await deleteDoc(
      doc(db, COLLECTION, id)
    );
  } catch (error) {
    console.error("Error deleting repair:", error);
    throw error;
  }
}

// ==========================================
// Get Repairs By Mobile
// ==========================================

export async function getRepairsByMobile(
  mobile: string
): Promise<Repair[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("customer.mobile", "==", mobile),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<Repair, "id">),
    }));
  } catch (error) {
    console.error(
      "Error getting repairs by mobile:",
      error
    );
    return [];
  }
}

// ==========================================
// Get Repairs By Status
// ==========================================

export async function getRepairsByStatus(
  status: Repair["status"]
): Promise<Repair[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<Repair, "id">),
    }));
  } catch (error) {
    console.error(
      "Error getting repairs by status:",
      error
    );
    return [];
  }
}
// ==========================================
// Search Repairs
// ==========================================

export async function searchRepairs(
  keyword: string
): Promise<Repair[]> {
  try {
    const repairs = await getRepairs();

    const search = keyword
      .trim()
      .toLowerCase();

    if (!search) {
      return repairs;
    }

    return repairs.filter((repair) =>

      (repair.repairId ?? "")
        .toLowerCase()
        .includes(search)

      ||

      (repair.customer?.name ?? "")
        .toLowerCase()
        .includes(search)

      ||

      (repair.customer?.mobile ?? "")
        .toLowerCase()
        .includes(search)

      ||

      (repair.device?.brand ?? "")
        .toLowerCase()
        .includes(search)

      ||

      (repair.device?.model ?? "")
        .toLowerCase()
        .includes(search)

    );

  } catch (error) {

    console.error(
      "Error searching repairs:",
      error
    );

    return [];

  }
}

// ==========================================
// Get Repairs By Customer ID
// ==========================================

export async function getRepairsByCustomerId(
  customerId: string
): Promise<Repair[]> {

  try {

    const q = query(
      collection(db, COLLECTION),
      where(
        "customer.customerId",
        "==",
        customerId
      ),
      orderBy(
        "createdAt",
        "desc"
      ),
      limit(50)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (document) => ({

        id: document.id,

        ...(document.data() as Omit<
          Repair,
          "id"
        >),

      })
    );

  } catch (error) {

    console.error(
      "Error getting customer repairs:",
      error
    );

    return [];

  }

}

// ==========================================
// Get Repair By Repair ID
// ==========================================

export async function getRepairByRepairId(
  repairId: string
): Promise<Repair | null> {

  try {

    const q = query(
      collection(db, COLLECTION),
      where(
        "repairId",
        "==",
        repairId
      ),
      limit(1)
    );

    const snapshot =
      await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const document =
      snapshot.docs[0];

    return {

      id: document.id,

      ...(document.data() as Omit<
        Repair,
        "id"
      >),

    };

  } catch (error) {

    console.error(
      "Error getting repair by Repair ID:",
      error
    );

    return null;

  }

}