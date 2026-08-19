// src/services/campaignService.ts

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  Campaign,
  CampaignPlatform,
  CampaignStatus,
} from "@/types/campaign";

const COLLECTION = "campaigns";

/* ===========================
   Get All Campaigns
=========================== */

export async function getCampaigns(): Promise<
  Campaign[]
> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      Campaign,
      "id"
    >),
  }));
}

/* ===========================
   Get Campaign
=========================== */

export async function getCampaign(
  id: string
): Promise<Campaign | null> {
  const ref = doc(db, COLLECTION, id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Campaign,
      "id"
    >),
  };
}

/* ===========================
   Create Campaign
=========================== */

export async function createCampaign(
  campaign: Omit<
    Campaign,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<string> {
  const ref = await addDoc(
    collection(db, COLLECTION),
    {
      ...campaign,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return ref.id;
}

/* ===========================
   Update Campaign
=========================== */

export async function updateCampaign(
  id: string,
  data: Partial<Campaign>
): Promise<void> {
  await updateDoc(
    doc(db, COLLECTION, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    }
  );
}

/* ===========================
   Delete Campaign
=========================== */

export async function deleteCampaign(
  id: string
): Promise<void> {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}

/* ===========================
   Duplicate Campaign
=========================== */

export async function duplicateCampaign(
  id: string
): Promise<string> {
  const source =
    await getCampaign(id);

  if (!source) {
    throw new Error(
      "Campaign not found."
    );
  }

  const {
    id: _,
    createdAt,
    updatedAt,
    ...campaignData
  } = source;

  const newRef = doc(
    collection(db, COLLECTION)
  );

  await setDoc(newRef, {
    ...campaignData,

    name: `${campaignData.name} Copy`,

    status: "Draft",

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newRef.id;
}

/* ===========================
   Filter by Status
=========================== */

export async function getCampaignsByStatus(
  status: CampaignStatus
): Promise<Campaign[]> {
  const q = query(
    collection(db, COLLECTION),
    where("status", "==", status),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      Campaign,
      "id"
    >),
  }));
}

/* ===========================
   Filter by Platform
=========================== */

export async function getCampaignsByPlatform(
  platform: CampaignPlatform
): Promise<Campaign[]> {
  const q = query(
    collection(db, COLLECTION),
    where(
      "platform",
      "==",
      platform
    ),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      Campaign,
      "id"
    >),
  }));
}