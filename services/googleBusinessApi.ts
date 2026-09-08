// src/services/server/googleBusinessApi.ts

import {
  getGoogleToken,
} from "@/services/server/oauthAdminService";

import {
  getGoogleBusinessProfile,
} from "@/services/server/googleBusinessProfileService";

/* =========================================================
   TYPES
========================================================= */

export interface GoogleBusinessAccount {
  name: string;
  accountName?: string;
  type?: string;
  role?: string;
}

export interface GoogleBusinessLocation {
  name: string;
  title?: string;
  storeCode?: string;
  websiteUri?: string;
}

export interface GoogleLocalPost {
  name?: string;
  languageCode?: string;
  summary?: string;

  callToAction?: {
    actionType: string;
    url?: string;
  };

  topicType?: string;

  media?: Array<{
    mediaFormat: "PHOTO";
    sourceUrl: string;
  }>;

  state?: string;
  searchUrl?: string;
  createTime?: string;
  updateTime?: string;
}

export interface CreateGoogleLocalPostInput {
  accountName: string;
  locationName: string;

  summary: string;

  languageCode?: string;

  callToAction?: {
    actionType:
      | "BOOK"
      | "ORDER"
      | "SHOP"
      | "LEARN_MORE"
      | "SIGN_UP"
      | "CALL";

    url?: string;
  };

  imageUrl?: string;

  topicType?:
    | "STANDARD"
    | "EVENT"
    | "OFFER";
}

/* =========================================================
   CONSTANTS
========================================================= */

const GOOGLE_BUSINESS_API =
  "https://mybusiness.googleapis.com/v4";

/* =========================================================
   GOOGLE REQUEST
========================================================= */

async function googleRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    await getGoogleToken();

  if (!token) {
    throw new Error(
      "Google OAuth token not found."
    );
  }

  const tokenData =
    token as unknown as Record<
      string,
      unknown
    >;

  const accessToken =
    typeof tokenData.accessToken ===
    "string"
      ? tokenData.accessToken
      : typeof tokenData.access_token ===
          "string"
        ? tokenData.access_token
        : null;

  if (!accessToken) {
    throw new Error(
      "Google OAuth access token is missing."
    );
  }

  const response =
    await fetch(
      `${GOOGLE_BUSINESS_API}${path}`,
      {
        ...options,

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${accessToken}`,

          ...(options.headers || {}),
        },

        cache: "no-store",
      }
    );

  const text =
    await response.text();

  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const errorData =
      data as {
        error?: {
          message?: string;
          status?: string;
        };
      };

    throw new Error(
      errorData?.error?.message ||
        `Google Business API request failed (${response.status}).`
    );
  }

  return data as T;
}

/* =========================================================
   GET GOOGLE BUSINESS ACCOUNTS
========================================================= */

/**
 * IMPORTANT:
 *
 * This function is kept for existing OAuth callback
 * compatibility.
 *
 * Publishing does NOT call this function.
 *
 * This endpoint can hit Google's Account Management
 * quota, so publishing uses the saved Business Profile
 * instead.
 */
export async function getGoogleBusinessAccounts(): Promise<
  GoogleBusinessAccount[]
> {
  try {
    const data =
      await googleRequest<{
        accounts?: GoogleBusinessAccount[];
      }>(
        "/accounts"
      );

    return data.accounts || [];
  } catch (error) {
    console.error(
      "Failed to fetch Google Business Accounts:",
      error
    );

    throw error;
  }
}

/* =========================================================
   GET GOOGLE BUSINESS LOCATIONS
========================================================= */

/**
 * Kept for compatibility with existing code.
 *
 * Avoid calling this repeatedly because the account
 * management/business information APIs may be quota
 * limited.
 */
export async function getGoogleBusinessLocations(
  accountName: string
): Promise<
  GoogleBusinessLocation[]
> {
  if (!accountName) {
    throw new Error(
      "Google Business account name is required."
    );
  }

  const encodedAccount =
    encodeURIComponent(
      accountName
    );

  const data =
    await googleRequest<{
      locations?: GoogleBusinessLocation[];
    }>(
      `/accounts/${accountName.replace(
        /^accounts\//,
        ""
      )}/locations`
    );

  return data.locations || [];
}

/* =========================================================
   CREATE GOOGLE BUSINESS LOCAL POST
========================================================= */

export async function createGoogleLocalPost(
  input: CreateGoogleLocalPostInput
): Promise<GoogleLocalPost> {
  try {
    if (!input.accountName) {
      throw new Error(
        "Google Business account name is required."
      );
    }

    if (!input.locationName) {
      throw new Error(
        "Google Business location name is required."
      );
    }

    if (!input.summary?.trim()) {
      throw new Error(
        "Google Business post summary is required."
      );
    }

    /*
     * Convert:
     *
     * accounts/123
     * locations/456
     *
     * into:
     *
     * accounts/123/locations/456
     */

    const accountName =
      input.accountName.replace(
        /^\/+/,
        ""
      );

    const locationName =
      input.locationName.replace(
        /^\/+/,
        ""
      );

    const locationPath =
      locationName.startsWith(
        `${accountName}/`
      )
        ? locationName
        : `${accountName}/${locationName.replace(
            /^accounts\/[^/]+\//,
            ""
          )}`;

    const body: GoogleLocalPost = {
      languageCode:
        input.languageCode ||
        "en-US",

      summary:
        input.summary.trim(),

      topicType:
        input.topicType ||
        "STANDARD",
    };

    /* =====================================================
       CALL TO ACTION
    ===================================================== */

    if (input.callToAction) {
      body.callToAction = {
        actionType:
          input.callToAction.actionType,
      };

      /*
       * CALL CTA does not need a URL.
       *
       * Other CTA types normally use a URL.
       */
      if (
        input.callToAction.url &&
        input.callToAction.actionType !==
          "CALL"
      ) {
        body.callToAction.url =
          input.callToAction.url;
      }
    }

    /* =====================================================
       IMAGE
    ===================================================== */

    if (input.imageUrl) {
      body.media = [
        {
          mediaFormat: "PHOTO",
          sourceUrl:
            input.imageUrl,
        },
      ];
    }

    console.log(
      "Publishing Google Business Local Post..."
    );

    console.log(
      "Google Business Location:",
      locationPath
    );

    const result =
      await googleRequest<GoogleLocalPost>(
        `/${locationPath}/localPosts`,
        {
          method: "POST",

          body: JSON.stringify(
            body
          ),
        }
      );

    console.log(
      "Google Business Local Post published:",
      result?.name
    );

    return result;
  } catch (error) {
    console.error(
      "Google Business Local Post Error:",
      error
    );

    throw error;
  }
}

/* =========================================================
   PUBLISH GENERATED POST
========================================================= */

/**
 * Publishes a Marketing Hub generated post
 * directly to Google Business Profile.
 *
 * This function intentionally uses the saved
 * Business Profile and does NOT discover accounts
 * or locations again.
 */
export async function publishGoogleBusinessPost(
  post: {
    title?: string;
    primaryText?: string;
    caption?: string;
    callToAction?: string;
    imageUrl?: string;
    language?: string;
  }
): Promise<GoogleLocalPost> {
  try {
    const profile =
      await getGoogleBusinessProfile();

    if (!profile) {
      throw new Error(
        "Google Business Profile is not connected."
      );
    }

    const profileData =
      profile as unknown as Record<
        string,
        unknown
      >;

    const account =
      profileData.account as
        | GoogleBusinessAccount
        | undefined;

    const location =
      profileData.location as
        | GoogleBusinessLocation
        | undefined;

    if (!account?.name) {
      throw new Error(
        "Saved Google Business account is missing."
      );
    }

    if (!location?.name) {
      throw new Error(
        "Saved Google Business location is missing."
      );
    }

    /*
     * Prefer primaryText.
     * Fall back to caption.
     * Fall back to title.
     */

    const summary =
      post.primaryText?.trim() ||
      post.caption?.trim() ||
      post.title?.trim();

    if (!summary) {
      throw new Error(
        "Generated post does not contain publishable content."
      );
    }

    /*
     * Parse simple CTA strings generated by
     * Marketing Hub.
     */

    let callToAction:
      | CreateGoogleLocalPostInput["callToAction"]
      | undefined;

    const cta =
      post.callToAction
        ?.trim();

    if (cta) {
      if (
        /^call/i.test(cta)
      ) {
        callToAction = {
          actionType: "CALL",
        };
      } else if (
        /^book/i.test(cta)
      ) {
        callToAction = {
          actionType: "BOOK",
        };
      } else if (
        /^shop/i.test(cta)
      ) {
        callToAction = {
          actionType: "SHOP",
        };
      } else if (
        /^sign/i.test(cta)
      ) {
        callToAction = {
          actionType: "SIGN_UP",
        };
      }
    }

    return await createGoogleLocalPost({
      accountName:
        account.name,

      locationName:
        location.name,

      summary,

      languageCode:
        post.language ===
        "Marathi"
          ? "mr"
          : "en-US",

      callToAction,

      imageUrl:
        post.imageUrl,

      topicType:
        "STANDARD",
    });
  } catch (error) {
    console.error(
      "Publish Google Business Post Error:",
      error
    );

    throw error;
  }
}