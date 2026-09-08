
import "server-only";

/* =========================================================
   GOOGLE API OPTIONS
========================================================= */

export interface GoogleApiOptions {
  accessToken: string;
}

/* =========================================================
   GOOGLE API ERROR
========================================================= */

export interface GoogleApiErrorResponse {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

/* =========================================================
   GOOGLE BUSINESS PROFILE TYPES
========================================================= */

export interface GoogleBusinessAccount {
  name: string;
  accountName?: string;
  type?: string;
  role?: string;
  accountNumber?: string;
  permissionLevel?: string;
}

export interface GoogleBusinessLocation {
  name: string;
  title?: string;
  storeCode?: string;

  storefrontAddress?: {
    addressLines?: string[];
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
    regionCode?: string;
  };

  websiteUri?: string;

  phoneNumbers?: {
    primaryPhone?: string;
    additionalPhones?: string[];
  };
}

/* =========================================================
   GOOGLE LOCAL POST TYPES
========================================================= */

export type GoogleLocalPostActionType =
  | "BOOK"
  | "ORDER"
  | "SHOP"
  | "LEARN_MORE"
  | "SIGN_UP"
  | "CALL";

export interface GoogleLocalPostCallToAction {
  actionType: GoogleLocalPostActionType;
  url?: string;
}

export interface GoogleLocalPostMedia {
  sourceUrl: string;
}

export interface GoogleLocalPost {
  name?: string;

  languageCode?: string;

  summary: string;

  callToAction?: GoogleLocalPostCallToAction;

  media?: GoogleLocalPostMedia[];

  topicType: "STANDARD";

  state?: string;

  searchUrl?: string;

  createTime?: string;

  updateTime?: string;
}

/* =========================================================
   GOOGLE REVIEW REPLY TYPES
========================================================= */

export interface GoogleReviewReply {
  comment?: string;

  updateTime?: string;

  reviewReplyState?: string;

  policyViolation?: string;
}

/* =========================================================
   GENERIC GOOGLE REQUEST
========================================================= */

async function googleRequest<T>(
  url: string,
  accessToken: string,
  init?: RequestInit
): Promise<T> {
  if (!accessToken) {
    throw new Error(
      "Google access token is missing."
    );
  }

  const response =
    await fetch(
      url,
      {
        ...init,

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          Accept:
            "application/json",

          "Content-Type":
            "application/json",

          ...(init?.headers ?? {}),
        },

        cache: "no-store",
      }
    );

  const text =
    await response.text();

  let data:
    | (T & GoogleApiErrorResponse)
    | null = null;

  try {
    data = text
      ? JSON.parse(text)
      : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.error?.message ||
      `Google API request failed with status ${response.status}.`;

    throw new Error(
      message
    );
  }

  return data as T;
}

/* =========================================================
   GOOGLE PROFILE
========================================================= */

export async function getGoogleProfile(
  options: GoogleApiOptions
) {
  return googleRequest(
    "https://openidconnect.googleapis.com/v1/userinfo",
    options.accessToken
  );
}

/* =========================================================
   GENERIC BUSINESS API GET
========================================================= */

export async function getBusinessResource<T>(
  url: string,
  options: GoogleApiOptions
): Promise<T> {
  return googleRequest<T>(
    url,
    options.accessToken
  );
}

/* =========================================================
   GENERIC BUSINESS API POST
========================================================= */

export async function postBusinessResource<T>(
  url: string,
  body: unknown,
  options: GoogleApiOptions
): Promise<T> {
  return googleRequest<T>(
    url,
    options.accessToken,
    {
      method: "POST",

      body:
        JSON.stringify(body),
    }
  );
}

/* =========================================================
   GOOGLE BUSINESS ACCOUNTS
========================================================= */

export async function getGoogleBusinessAccounts(
  options: GoogleApiOptions
): Promise<GoogleBusinessAccount[]> {
  const url =
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts";

  const data =
    await googleRequest<{
      accounts?: GoogleBusinessAccount[];

      nextPageToken?: string;
    }>(
      url,
      options.accessToken
    );

  return data.accounts ?? [];
}

/* =========================================================
   GOOGLE BUSINESS LOCATIONS
========================================================= */

export async function getGoogleBusinessLocations(
  accountName: string,
  options: GoogleApiOptions
): Promise<GoogleBusinessLocation[]> {
  if (!accountName) {
    throw new Error(
      "Google Business account name is required."
    );
  }

  const readMask = [
    "name",
    "title",
    "storeCode",
    "storefrontAddress",
    "websiteUri",
    "phoneNumbers",
  ].join(",");

  const url =
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations` +
    `?readMask=${encodeURIComponent(
      readMask
    )}&pageSize=100`;

  const data =
    await googleRequest<{
      locations?: GoogleBusinessLocation[];

      nextPageToken?: string;

      totalSize?: number;
    }>(
      url,
      options.accessToken
    );

  return data.locations ?? [];
}

/* =========================================================
   FIND FIRST GOOGLE BUSINESS LOCATION
========================================================= */

export async function findGoogleBusinessLocation(
  options: GoogleApiOptions
): Promise<{
  account: GoogleBusinessAccount;

  location: GoogleBusinessLocation;
} | null> {
  const accounts =
    await getGoogleBusinessAccounts(
      options
    );

  for (
    const account of accounts
  ) {
    if (!account.name) {
      continue;
    }

    const locations =
      await getGoogleBusinessLocations(
        account.name,
        options
      );

    if (locations.length > 0) {
      return {
        account,

        location:
          locations[0],
      };
    }
  }

  return null;
}

/* =========================================================
   BUSINESS MANAGE SCOPE
========================================================= */

export function hasBusinessManageScope(
  scope?: string
): boolean {
  if (!scope) {
    return false;
  }

  return scope
    .split(" ")
    .includes(
      "https://www.googleapis.com/auth/business.manage"
    );
}

/* =========================================================
   BUILD GOOGLE CALL TO ACTION
========================================================= */

function buildGoogleCallToAction(
  callToAction?: string
):
  | GoogleLocalPostCallToAction
  | undefined {
  if (!callToAction) {
    return undefined;
  }

  const value =
    callToAction.trim();

  if (!value) {
    return undefined;
  }

  /* -------------------------------------------------------
     CALL ACTION
  ------------------------------------------------------- */

  if (
    value
      .toLowerCase()
      .includes("call")
  ) {
    return {
      actionType:
        "CALL",
    };
  }

  /* -------------------------------------------------------
     URL ACTION
  ------------------------------------------------------- */

  const urlMatch =
    value.match(
      /https?:\/\/[^\s]+/i
    );

  if (urlMatch?.[0]) {
    return {
      actionType:
        "LEARN_MORE",

      url:
        urlMatch[0],
    };
  }

  return undefined;
}

/* =========================================================
   PUBLISH GOOGLE BUSINESS POST
========================================================= */

export interface PublishGoogleBusinessPostInput {
  locationName: string;

  summary: string;

  languageCode?: string;

  callToAction?: string;

  imageUrl?: string;
}

export async function publishGoogleBusinessPost(
  input: PublishGoogleBusinessPostInput,
  options: GoogleApiOptions
): Promise<GoogleLocalPost> {
  if (!input.locationName) {
    throw new Error(
      "Google Business location name is required."
    );
  }

  if (!input.summary?.trim()) {
    throw new Error(
      "Google Business post content is required."
    );
  }

  if (!options.accessToken) {
    throw new Error(
      "Google access token is missing."
    );
  }

  /* -------------------------------------------------------
     GOOGLE LOCAL POST ENDPOINT
  ------------------------------------------------------- */

  const parent =
    input.locationName;

  const url =
    `https://mybusiness.googleapis.com/v4/${parent}/localPosts`;

  /* -------------------------------------------------------
     BUILD REQUEST BODY
  ------------------------------------------------------- */

  const body:
    GoogleLocalPost = {
    languageCode:
      input.languageCode ||
      "en-US",

    summary:
      input.summary.trim(),

    topicType:
      "STANDARD",
  };

  /* -------------------------------------------------------
     CTA
  ------------------------------------------------------- */

  const cta =
    buildGoogleCallToAction(
      input.callToAction
    );

  if (cta) {
    body.callToAction =
      cta;
  }

  /* -------------------------------------------------------
     IMAGE
  ------------------------------------------------------- */

  if (input.imageUrl) {
    body.media = [
      {
        sourceUrl:
          input.imageUrl,
      },
    ];
  }

  /* -------------------------------------------------------
     CREATE GOOGLE BUSINESS POST
  ------------------------------------------------------- */

  return postBusinessResource<GoogleLocalPost>(
    url,
    body,
    options
  );
}

/* =========================================================
   REPLY TO GOOGLE REVIEW
========================================================= */

export interface ReplyToGoogleReviewInput {
  reviewName: string;

  comment: string;
}

export async function replyToGoogleReview(
  input: ReplyToGoogleReviewInput,
  options: GoogleApiOptions
): Promise<GoogleReviewReply> {
  if (!input.reviewName?.trim()) {
    throw new Error(
      "Google review name is required."
    );
  }

  if (!input.comment?.trim()) {
    throw new Error(
      "Review reply cannot be empty."
    );
  }

  if (!options.accessToken) {
    throw new Error(
      "Google access token is missing."
    );
  }

  /*
   * Google Review resource:
   *
   * accounts/{accountId}/locations/{locationId}/reviews/{reviewId}
   *
   * Reply endpoint:
   *
   * PUT
   * /v4/{reviewName}/reply
   */

  const url =
    `https://mybusiness.googleapis.com/v4/${input.reviewName}/reply`;

  return googleRequest<GoogleReviewReply>(
    url,
    options.accessToken,
    {
      method: "PUT",

      body:
        JSON.stringify({
          comment:
            input.comment.trim(),
        }),
    }
  );
}

