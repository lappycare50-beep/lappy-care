import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { OAuthToken } from "@/types/oauth";

const COLLECTION = "oauth_tokens";

export async function getOAuthTokens(): Promise<
  OAuthToken[]
> {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc")
    )
  );

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<
      OAuthToken,
      "id"
    >),
  }));
}

export async function getGoogleToken(): Promise<
  OAuthToken | null
> {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc"),
      limit(1)
    )
  );

  if (snapshot.empty) {
    return null;
  }

  const document = snapshot.docs[0];

  return {
    id: document.id,
    ...(document.data() as Omit<
      OAuthToken,
      "id"
    >),
  };
}

export async function saveGoogleToken(
  token: Omit<
    OAuthToken,
    "id" | "createdAt" | "updatedAt"
  >
) {
  await addDoc(
    collection(db, COLLECTION),
    {
      ...token,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );
}

export async function updateGoogleToken(
  id: string,
  data: Partial<OAuthToken>
) {
  await updateDoc(
    doc(db, COLLECTION, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    }
  );
}

export async function deleteGoogleToken(
  id: string
) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}

export function isTokenExpired(
  token: OAuthToken
) {
  return Date.now() >= token.expiresAt;
}

export function getRemainingTokenTime(
  token: OAuthToken
) {
  return Math.max(
    0,
    token.expiresAt - Date.now()
  );
}