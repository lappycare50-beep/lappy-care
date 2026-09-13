import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  AppUser,
  UserRole,
} from "@/types/user";

// ==========================================
// Collection
// ==========================================

const COLLECTION =
  "users";

// ==========================================
// Get User By Firebase UID
// ==========================================

export async function getAppUser(
  uid: string
): Promise<AppUser | null> {
  if (!uid) {
    return null;
  }

  try {
    const ref = doc(
      db,
      COLLECTION,
      uid
    );

    const snapshot =
      await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    const data =
      snapshot.data();

    return {
      id: snapshot.id,

      email:
        String(
          data.email || ""
        ),

      name:
        String(
          data.name || ""
        ),

      role:
        normalizeRole(
          data.role
        ),

      active:
        data.active !== false,

      createdAt:
        data.createdAt
          ? String(
              data.createdAt
            )
          : undefined,

      updatedAt:
        data.updatedAt
          ? String(
              data.updatedAt
            )
          : undefined,
    };
  } catch (error) {
    console.error(
      "Get app user error:",
      error
    );

    throw error;
  }
}

// ==========================================
// Create / Update User
// ==========================================

export async function saveAppUser(
  user: AppUser
): Promise<void> {
  if (!user.id) {
    throw new Error(
      "User ID is required."
    );
  }

  await setDoc(
    doc(
      db,
      COLLECTION,
      user.id
    ),
    user,
    {
      merge: true,
    }
  );
}

// ==========================================
// Role Normalizer
// ==========================================

function normalizeRole(
  value: unknown
): UserRole {
  switch (value) {
    case "manager":
      return "manager";

    case "technician":
      return "technician";

    case "admin":
    default:
      return "admin";
  }
}