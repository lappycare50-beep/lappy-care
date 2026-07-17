import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { generateId } from "@/services/idGenerator";

import type { ContactMessage } from "@/types/contact";

// ==========================================
// Collection
// ==========================================

const COLLECTION = "contactMessages";

// ==========================================
// Get All Contacts
// ==========================================

export async function getContactMessages() {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ContactMessage, "id">),
  }));
}

// ==========================================
// Get Contact By Id
// ==========================================

export async function getContactMessageById(
  id: string
) {
  const ref = doc(db, COLLECTION, id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<ContactMessage, "id">),
  };
}

// ==========================================
// Add Contact
// ==========================================

export async function addContactMessage(
  data: Omit<
    ContactMessage,
    | "id"
    | "contactId"
    | "createdAt"
    | "updatedAt"
  >
) {
  const now = new Date().toISOString();

  const contactId =
    await generateId("contact");

  return await addDoc(
    collection(db, COLLECTION),
    {
      ...data,

      contactId,

      createdAt: now,

      updatedAt: now,
    }
  );
}

// ==========================================
// Update Contact
// ==========================================

export async function updateContactMessage(
  id: string,
  data: Partial<ContactMessage>
) {
  const ref = doc(db, COLLECTION, id);

  await updateDoc(ref, {
    ...data,
    updatedAt:
      new Date().toISOString(),
  });
}

// ==========================================
// Delete Contact
// ==========================================

export async function deleteContactMessage(
  id: string
) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}