import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

/* =========================================================
   TYPES
========================================================= */

export interface MarketingSettings {
  brandName: string;
  website: string;
  defaultLanguage: string;

  aiEnabled: boolean;
  aiModel: string;
  contentTone: string;

  reviewAiEnabled: boolean;
  reviewAutoGenerate: boolean;
  reviewRequireApproval: boolean;

  publishingApproval: boolean;

  notifyNewReview: boolean;
  notifyPublishingFailure: boolean;
}

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

export const DEFAULT_MARKETING_SETTINGS: MarketingSettings = {
  brandName: "Lappy Care",
  website: "",
  defaultLanguage: "English",

  aiEnabled: true,
  aiModel: "gpt-5",
  contentTone: "Professional",

  reviewAiEnabled: true,
  reviewAutoGenerate: false,
  reviewRequireApproval: true,

  publishingApproval: true,

  notifyNewReview: true,
  notifyPublishingFailure: true,
};

/* =========================================================
   FIRESTORE
========================================================= */

const COLLECTION =
  "marketingSettings";

const DOCUMENT_ID =
  "default";

/* =========================================================
   GET SETTINGS
========================================================= */

export async function getMarketingSettings(): Promise<MarketingSettings> {
  const ref = doc(
    db,
    COLLECTION,
    DOCUMENT_ID
  );

  const snapshot =
    await getDoc(ref);

  if (!snapshot.exists()) {
    return {
      ...DEFAULT_MARKETING_SETTINGS,
    };
  }

  const data =
    snapshot.data();

  return {
    ...DEFAULT_MARKETING_SETTINGS,
    ...data,
  };
}

/* =========================================================
   SAVE SETTINGS
========================================================= */

export async function saveMarketingSettings(
  settings: MarketingSettings
): Promise<void> {
  const ref = doc(
    db,
    COLLECTION,
    DOCUMENT_ID
  );

  await setDoc(
    ref,
    {
      ...settings,
      updatedAt:
        new Date().toISOString(),
    },
    {
      merge: true,
    }
  );
}

/* =========================================================
   RESET SETTINGS
========================================================= */

export async function resetMarketingSettings(): Promise<void> {
  const ref = doc(
    db,
    COLLECTION,
    DOCUMENT_ID
  );

  await setDoc(
    ref,
    {
      ...DEFAULT_MARKETING_SETTINGS,
      updatedAt:
        new Date().toISOString(),
    },
    {
      merge: true,
    }
  );
}