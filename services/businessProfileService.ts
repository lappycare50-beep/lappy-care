// src/services/businessProfileService.ts

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { BusinessProfile } from "@/types/businessProfile";

const COLLECTION = "business_profile";
const DOCUMENT_ID = "default";

export async function getBusinessProfile(): Promise<BusinessProfile | null> {
  try {
    const ref = doc(db, COLLECTION, DOCUMENT_ID);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<BusinessProfile, "id">),
    };
  } catch (error) {
    console.error("Failed to fetch Business Profile", error);
    throw error;
  }
}

export async function saveBusinessProfile(
  profile: BusinessProfile
): Promise<void> {
  try {
    const ref = doc(db, COLLECTION, DOCUMENT_ID);

    await setDoc(
      ref,
      {
        ...profile,
        updatedAt: serverTimestamp(),
        createdAt: profile.createdAt ?? serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Failed to save Business Profile", error);
    throw error;
  }
}

export async function updateBusinessProfile(
  data: Partial<BusinessProfile>
): Promise<void> {
  try {
    const ref = doc(db, COLLECTION, DOCUMENT_ID);

    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to update Business Profile", error);
    throw error;
  }
}