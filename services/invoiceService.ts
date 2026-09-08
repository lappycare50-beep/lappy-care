import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  limit,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Invoice } from "@/types/invoice";

const COLLECTION = "invoices";

// ==========================================
// Get All Invoices
// ==========================================

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<Invoice, "id">),
    }));
  } catch (error) {
    console.error("Error getting invoices:", error);
    return [];
  }
}

// ==========================================
// Get Single Invoice
// ==========================================

export async function getInvoiceById(
  id: string
): Promise<Invoice | null> {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, COLLECTION),
        where("__name__", "==", id),
        limit(1)
      )
    );

    if (snapshot.empty) {
      return null;
    }

    const document = snapshot.docs[0];

    return {
      id: document.id,
      ...(document.data() as Omit<Invoice, "id">),
    };
  } catch (error) {
    console.error("Error getting invoice:", error);
    return null;
  }
}

// ==========================================
// Get Invoices By Mobile
// ==========================================

export async function getInvoicesByMobile(
  mobile: string
): Promise<Invoice[]> {
  try {
    const normalizedMobile = mobile.replace(/\D/g, "");

    if (!normalizedMobile) {
      return [];
    }

    const q = query(
      collection(db, COLLECTION),
      where("mobile", "==", normalizedMobile),
      limit(50)
    );

    const snapshot = await getDocs(q);

    const invoices = snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<Invoice, "id">),
    }));

    return invoices.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error(
      "Error getting invoices by mobile:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Invoices By Repair ID
// ==========================================

export async function getInvoicesByRepairId(
  repairId: string
): Promise<Invoice[]> {
  try {
    if (!repairId) {
      return [];
    }

    const q = query(
      collection(db, COLLECTION),
      where("repairId", "==", repairId),
      limit(50)
    );

    const snapshot = await getDocs(q);

    const invoices = snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<Invoice, "id">),
    }));

    return invoices.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error(
      "Error getting invoices by repair ID:",
      error
    );

    return [];
  }
}

// ==========================================
// Add Invoice
// ==========================================

export async function addInvoice(
  invoice: Omit<Invoice, "id">
) {
  try {
    return await addDoc(
      collection(db, COLLECTION),
      invoice
    );
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
}

// ==========================================
// Update Invoice
// ==========================================

export async function updateInvoice(
  id: string,
  invoice: Omit<Invoice, "id">
) {
  try {
    await updateDoc(
      doc(db, COLLECTION, id),
      invoice
    );
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw error;
  }
}

// ==========================================
// Delete Invoice
// ==========================================

export async function deleteInvoice(
  id: string
) {
  try {
    await deleteDoc(
      doc(db, COLLECTION, id)
    );
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
}