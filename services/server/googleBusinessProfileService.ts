import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

import {
  GoogleBusinessAccount,
  GoogleBusinessLocation,
} from "@/services/server/googleBusinessApi";

const COLLECTION = "google_business_profiles";

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

  createdAt?: unknown;

  updatedAt?: unknown;
}

/* =========================================================
   Helpers
========================================================= */

function getAccountId(
  account: GoogleBusinessAccount
): string {
  if (!account.name) {
    return "";
  }

  return (
    account.name.split("/").pop() ?? ""
  );
}

function getLocationId(
  location: GoogleBusinessLocation
): string {
  if (!location.name) {
    return "";
  }

  return (
    location.name.split("/").pop() ?? ""
  );
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

/* =========================================================
   SAVE GOOGLE BUSINESS PROFILE
========================================================= */

export async function saveGoogleBusinessProfile(
  data: {
    oauthTokenId: string;
    accountEmail: string;
    account: GoogleBusinessAccount;
    location: GoogleBusinessLocation;
  }
): Promise<string> {
  const db = getAdminDb();

  const accountId =
    getAccountId(data.account);

  const locationId =
    getLocationId(data.location);

  if (!accountId) {
    throw new Error(
      "Google Business account ID is missing."
    );
  }

  if (!locationId) {
    throw new Error(
      "Google Business location ID is missing."
    );
  }

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

    updatedAt:
      FieldValue.serverTimestamp(),
  };

  /*
   * First search by provider only.
   *
   * This avoids requiring a Firestore composite index.
   */

  const snapshot =
    await db
      .collection(COLLECTION)
      .where(
        "provider",
        "==",
        "google"
      )
      .get();

  /*
   * Find an existing matching location
   * in application code.
   */

  const existing =
    snapshot.docs.find(
      (doc) => {
        const current =
          doc.data();

        return (
          current.accountEmail ===
            data.accountEmail &&
          current.locationId ===
            locationId
        );
      }
    );

  if (existing) {
    await existing.ref.update({
      ...profile,

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    console.log(
      "Google Business Profile updated:",
      existing.id
    );

    return existing.id;
  }

  /*
   * Create new profile.
   */

  const newProfile =
    await db
      .collection(COLLECTION)
      .add({
        ...profile,

        createdAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

  console.log(
    "Google Business Profile created:",
    newProfile.id
  );

  return newProfile.id;
}

/* =========================================================
   GET CONNECTED GOOGLE BUSINESS PROFILE
========================================================= */

export async function getGoogleBusinessProfile(): Promise<
  GoogleBusinessProfile | null
> {
  const db = getAdminDb();

  /*
   * Only query by provider.
   * This avoids composite-index problems.
   */

  const snapshot =
    await db
      .collection(COLLECTION)
      .where(
        "provider",
        "==",
        "google"
      )
      .get();

  if (snapshot.empty) {
    console.log(
      "No Google Business Profile documents found."
    );

    return null;
  }

  /*
   * Find the first connected profile.
   */

  const connectedDoc =
    snapshot.docs.find(
      (doc) =>
        doc.data().connected === true
    );

  if (!connectedDoc) {
    console.log(
      "Google Business Profile documents exist, but none are connected."
    );

    return null;
  }

  const data =
    connectedDoc.data();

  return {
    id: connectedDoc.id,

    ...(data as Omit<
      GoogleBusinessProfile,
      "id"
    >),
  };
}

/* =========================================================
   DISCONNECT GOOGLE BUSINESS PROFILE
========================================================= */

export async function disconnectGoogleBusinessProfile(
  id: string
): Promise<void> {
  if (!id) {
    throw new Error(
      "Google Business Profile ID is required."
    );
  }

  const db = getAdminDb();

  await db
    .collection(COLLECTION)
    .doc(id)
    .update({
      connected: false,

      updatedAt:
        FieldValue.serverTimestamp(),
    });

  console.log(
    "Google Business Profile disconnected:",
    id
  );
}