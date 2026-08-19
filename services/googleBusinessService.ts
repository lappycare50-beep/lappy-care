import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  GoogleBusinessAccount,
  GoogleBusinessLocation,
  GoogleBusinessPost,
} from "@/types/googleBusiness";

const ACCOUNT_COLLECTION =
  "google_business_accounts";

const LOCATION_COLLECTION =
  "google_business_locations";

const POST_COLLECTION =
  "google_business_posts";

/* ------------------------------
   Accounts
-------------------------------- */

export async function getGoogleAccounts(): Promise<
  GoogleBusinessAccount[]
> {
  const snapshot = await getDocs(
    query(
      collection(db, ACCOUNT_COLLECTION),
      orderBy("createdAt", "desc")
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      GoogleBusinessAccount,
      "id"
    >),
  }));
}

export async function createGoogleAccount(
  account: Omit<
    GoogleBusinessAccount,
    "id" | "createdAt" | "updatedAt"
  >
) {
  await addDoc(
    collection(db, ACCOUNT_COLLECTION),
    {
      ...account,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );
}

export async function updateGoogleAccount(
  id: string,
  data: Partial<GoogleBusinessAccount>
) {
  await updateDoc(
    doc(db, ACCOUNT_COLLECTION, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    }
  );
}

export async function deleteGoogleAccount(
  id: string
) {
  await deleteDoc(
    doc(db, ACCOUNT_COLLECTION, id)
  );
}

/* ------------------------------
   Locations
-------------------------------- */

export async function getGoogleLocations(): Promise<
  GoogleBusinessLocation[]
> {
  const snapshot = await getDocs(
    query(
      collection(db, LOCATION_COLLECTION),
      orderBy("title")
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      GoogleBusinessLocation,
      "id"
    >),
  }));
}

/* ------------------------------
   Posts
-------------------------------- */

export async function getGooglePosts(): Promise<
  GoogleBusinessPost[]
> {
  const snapshot = await getDocs(
    query(
      collection(db, POST_COLLECTION),
      orderBy("createdAt", "desc")
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      GoogleBusinessPost,
      "id"
    >),
  }));
}

export async function createGooglePost(
  post: Omit<
    GoogleBusinessPost,
    "id" | "createdAt" | "updatedAt"
  >
) {
  await addDoc(
    collection(db, POST_COLLECTION),
    {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );
}

export async function updateGooglePost(
  id: string,
  data: Partial<GoogleBusinessPost>
) {
  await updateDoc(
    doc(db, POST_COLLECTION, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    }
  );
}