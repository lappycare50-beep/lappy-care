import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

import { OAuthToken } from "@/types/oauth";

const COLLECTION = "oauth_tokens";

export async function saveGoogleToken(
  token: Omit<
    OAuthToken,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<string> {
  const adminDb = getAdminDb();

  const docRef = await adminDb
    .collection(COLLECTION)
    .add({
      ...token,
      createdAt:
        FieldValue.serverTimestamp(),
      updatedAt:
        FieldValue.serverTimestamp(),
    });

  return docRef.id;
}

export async function updateGoogleToken(
  id: string,
  data: Partial<OAuthToken>
): Promise<void> {
  const adminDb = getAdminDb();

  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .update({
      ...data,
      updatedAt:
        FieldValue.serverTimestamp(),
    });
}

export async function getGoogleToken(): Promise<
  OAuthToken | null
> {
  const adminDb = getAdminDb();

  const snapshot = await adminDb
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

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

export async function deleteGoogleToken(
  id: string
): Promise<void> {
  const adminDb = getAdminDb();

  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .delete();
}

export function isTokenExpired(
  token: OAuthToken
): boolean {
  return Date.now() >= token.expiresAt;
}