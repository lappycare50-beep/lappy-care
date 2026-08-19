import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

import {
  GoogleBusinessAccount,
  GoogleBusinessLocation,
} from "@/services/server/googleBusinessApi";

const COLLECTION =
  "google_business_profiles";

export interface GoogleBusinessProfile {
  id: string;

  provider: "google";

  oauthTokenId: string;

  accountEmail: string;

  accountName: string;

  accountId: string;

  locationName: string;

  locationId: string;

  businessName: string;

  address?: string;

  phone?: string;

  website?: string;

  connected: boolean;

  createdAt?: any;

  updatedAt?: any;
}

function getAccountId(
  account: GoogleBusinessAccount
): string {
  return account.name
    .split("/")
    .pop() ?? "";
}

function getLocationId(
  location: GoogleBusinessLocation
): string {
  return location.name
    .split("/")
    .pop() ?? "";
}

function formatAddress(
  location: GoogleBusinessLocation
): string {
  const address =
    location.storefrontAddress;

  if (!address) {
    return "";
  }

  return [
    ...(address.addressLines ?? []),
    address.locality,
    address.administrativeArea,
    address.postalCode,
    address.regionCode,
  ]
    .filter(Boolean)
    .join(", ");
}

export async function saveGoogleBusinessProfile(
  data: {
    oauthTokenId: string;
    accountEmail: string;
    account: GoogleBusinessAccount;
    location: GoogleBusinessLocation;
  }
): Promise<string> {
  const adminDb = getAdminDb();

  const accountId =
    getAccountId(data.account);

  const locationId =
    getLocationId(data.location);

  const profile = {
    provider: "google" as const,

    oauthTokenId:
      data.oauthTokenId,

    accountEmail:
      data.accountEmail,

    accountName:
      data.account.name,

    accountId,

    locationName:
      data.location.name,

    locationId,

    businessName:
      data.location.title ?? "",

    address:
      formatAddress(
        data.location
      ),

    phone:
      data.location.phoneNumbers
        ?.primaryPhone ?? "",

    website:
      data.location.websiteUri ?? "",

    connected: true,

    createdAt:
      FieldValue.serverTimestamp(),

    updatedAt:
      FieldValue.serverTimestamp(),
  };

  const existingSnapshot =
    await adminDb
      .collection(COLLECTION)
      .where(
        "provider",
        "==",
        "google"
      )
      .where(
        "accountEmail",
        "==",
        data.accountEmail
      )
      .where(
        "locationId",
        "==",
        locationId
      )
      .limit(1)
      .get();

  if (!existingSnapshot.empty) {
    const document =
      existingSnapshot.docs[0];

    await document.ref.update({
      ...profile,
      updatedAt:
        FieldValue.serverTimestamp(),
    });

    return document.id;
  }

  const document =
    await adminDb
      .collection(COLLECTION)
      .add(profile);

  return document.id;
}

export async function getGoogleBusinessProfile() {
  const adminDb = getAdminDb();

  const snapshot =
    await adminDb
      .collection(COLLECTION)
      .where(
        "provider",
        "==",
        "google"
      )
      .where(
        "connected",
        "==",
        true
      )
      .limit(1)
      .get();

  if (snapshot.empty) {
    return null;
  }

  const document =
    snapshot.docs[0];

  return {
    id: document.id,
    ...(document.data() as Omit<
      GoogleBusinessProfile,
      "id"
    >),
  };
}

export async function disconnectGoogleBusinessProfile(
  id: string
): Promise<void> {
  const adminDb = getAdminDb();

  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .update({
      connected: false,

      updatedAt:
        FieldValue.serverTimestamp(),
    });
}