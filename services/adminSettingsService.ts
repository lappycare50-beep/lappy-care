import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  AdminSettings,
  DEFAULT_ADMIN_SETTINGS,
} from "@/types/adminSettings";

// ==========================================
// Firestore
// ==========================================

const COLLECTION =
  "admin_settings";

const DOCUMENT_ID =
  "default";

// ==========================================
// GET
// ==========================================

export async function getAdminSettings(): Promise<AdminSettings> {
  try {
    const ref = doc(
      db,
      COLLECTION,
      DOCUMENT_ID
    );

    const snapshot =
      await getDoc(ref);

    if (!snapshot.exists()) {
      return {
        ...DEFAULT_ADMIN_SETTINGS,

        repair: {
          ...DEFAULT_ADMIN_SETTINGS.repair,
        },

        invoice: {
          ...DEFAULT_ADMIN_SETTINGS.invoice,
        },

        whatsapp: {
          ...DEFAULT_ADMIN_SETTINGS.whatsapp,
        },
      };
    }

    const data =
      snapshot.data() as Partial<AdminSettings>;

    return {
      ...DEFAULT_ADMIN_SETTINGS,
      ...data,

      id: snapshot.id,

      repair: {
        ...DEFAULT_ADMIN_SETTINGS.repair,
        ...(data.repair || {}),
      },

      invoice: {
        ...DEFAULT_ADMIN_SETTINGS.invoice,
        ...(data.invoice || {}),
      },

      whatsapp: {
        ...DEFAULT_ADMIN_SETTINGS.whatsapp,
        ...(data.whatsapp || {}),
      },

      updatedAt:
        data.updatedAt instanceof Date
          ? data.updatedAt
          : new Date(),
    };
  } catch (error) {
    console.error(
      "Admin settings load error:",
      error
    );

    throw error;
  }
}

// ==========================================
// SAVE
// ==========================================

export async function saveAdminSettings(
  settings: AdminSettings
): Promise<void> {
  try {
    const ref = doc(
      db,
      COLLECTION,
      DOCUMENT_ID
    );

    await setDoc(
      ref,
      {
        ...settings,

        id: DOCUMENT_ID,

        updatedAt:
          serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.error(
      "Admin settings save error:",
      error
    );

    throw error;
  }
}