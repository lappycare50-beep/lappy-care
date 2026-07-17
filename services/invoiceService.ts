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

import { Invoice } from "@/types/invoice";

const COLLECTION = "invoices";

// ==========================
// Get Invoices
// ==========================

export async function getInvoices(): Promise<Invoice[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Invoice, "id">),
  }));
}

// ==========================
// Get Single Invoice
// ==========================

export async function getInvoiceById(
  id: string
): Promise<Invoice | null> {
  const invoices = await getInvoices();

  return invoices.find((invoice) => invoice.id === id) ?? null;
}

// ==========================
// Add Invoice
// ==========================

export async function addInvoice(
  invoice: Omit<Invoice, "id">
) {
  return await addDoc(
    collection(db, COLLECTION),
    invoice
  );
}

// ==========================
// Update Invoice
// ==========================

export async function updateInvoice(
  id: string,
  invoice: Omit<Invoice, "id">
) {
  await updateDoc(
    doc(db, COLLECTION, id),
    invoice
  );
}

// ==========================
// Delete Invoice
// ==========================

export async function deleteInvoice(
  id: string
) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}