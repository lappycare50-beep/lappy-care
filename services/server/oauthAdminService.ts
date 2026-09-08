import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

import { OAuthToken } from "@/types/oauth";

const COLLECTION = "oauth_tokens";

const GOOGLE_TOKEN_URL =
  "https://oauth2.googleapis.com/token";

/* =========================================================
   SAVE GOOGLE TOKEN
========================================================= */

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

/* =========================================================
   UPDATE GOOGLE TOKEN
========================================================= */

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

/* =========================================================
   GET LATEST GOOGLE TOKEN
========================================================= */

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

  const document =
    snapshot.docs[0];

  return {
    id: document.id,

    ...(document.data() as Omit<
      OAuthToken,
      "id"
    >),
  };
}

/* =========================================================
   DELETE GOOGLE TOKEN
========================================================= */

export async function deleteGoogleToken(
  id: string
): Promise<void> {
  const adminDb = getAdminDb();

  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .delete();
}

/* =========================================================
   TOKEN EXPIRY CHECK
========================================================= */

export function isTokenExpired(
  token: OAuthToken
): boolean {
  /*
   * Refresh a little before actual expiry.
   *
   * This avoids sending an access token to Google
   * when it is about to expire during the request.
   */

  const safetyWindow =
    60 * 1000;

  return (
    Date.now() >=
    token.expiresAt -
      safetyWindow
  );
}

/* =========================================================
   REFRESH GOOGLE ACCESS TOKEN
========================================================= */

async function refreshGoogleAccessToken(
  token: OAuthToken
): Promise<string> {
  if (!token.refreshToken) {
    throw new Error(
      "Google refresh token is missing. Please reconnect Google Business Profile."
    );
  }

  const clientId =
    process.env.GOOGLE_CLIENT_ID;

  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET;

  if (
    !clientId ||
    !clientSecret
  ) {
    throw new Error(
      "Google OAuth client configuration is missing."
    );
  }

  const response =
    await fetch(
      GOOGLE_TOKEN_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body:
          new URLSearchParams({
            client_id:
              clientId,

            client_secret:
              clientSecret,

            refresh_token:
              token.refreshToken,

            grant_type:
              "refresh_token",
          }),

        cache: "no-store",
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Google token refresh failed:",
      data
    );

    const message =
      data?.error_description ??
      data?.error ??
      "Unable to refresh Google access token.";

    throw new Error(
      `${message} Please reconnect Google Business Profile.`
    );
  }

  if (!data.access_token) {
    throw new Error(
      "Google did not return a new access token."
    );
  }

  const expiresIn =
    Number(
      data.expires_in ??
        3600
    );

  const newExpiresAt =
    Date.now() +
    expiresIn * 1000;

  /*
   * Google may not return a refresh token
   * during refresh. Keep the existing one.
   */

  await updateGoogleToken(
    token.id,
    {
      accessToken:
        data.access_token,

      tokenType:
        data.token_type ??
        token.tokenType ??
        "Bearer",

      expiresIn,

      expiresAt:
        newExpiresAt,

      refreshToken:
        data.refresh_token ??
        token.refreshToken,

      connected: true,
    }
  );

  console.log(
    "Google access token refreshed successfully."
  );

  return data.access_token;
}

/* =========================================================
   GET VALID GOOGLE ACCESS TOKEN
========================================================= */

export async function getValidGoogleAccessToken(): Promise<{
  accessToken: string;
  token: OAuthToken;
}> {
  const token =
    await getGoogleToken();

  if (!token) {
    throw new Error(
      "Google Business Profile is not connected."
    );
  }

  if (!token.connected) {
    throw new Error(
      "Google Business Profile is not connected."
    );
  }

  if (!token.accessToken) {
    throw new Error(
      "Google access token is missing. Please reconnect Google Business Profile."
    );
  }

  /*
   * Current access token is still valid.
   */

  if (!isTokenExpired(token)) {
    return {
      accessToken:
        token.accessToken,

      token,
    };
  }

  /*
   * Access token expired.
   * Try refresh token.
   */

  console.log(
    "Google access token expired. Refreshing..."
  );

  const accessToken =
    await refreshGoogleAccessToken(
      token
    );

  const refreshedToken =
    await getGoogleToken();

  if (!refreshedToken) {
    throw new Error(
      "Google token could not be reloaded after refresh."
    );
  }

  return {
    accessToken,
    token:
      refreshedToken,
  };
}