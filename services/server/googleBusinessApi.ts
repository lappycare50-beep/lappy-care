import "server-only";

export interface GoogleApiOptions {
  accessToken: string;
}

export interface GoogleApiErrorResponse {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

/* =========================================================
   Google Business Profile Types
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
   Google API Request Helper
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

  const response = await fetch(url, {
    ...init,

    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },

    cache: "no-store",
  });

  const data =
    (await response.json()) as T &
      GoogleApiErrorResponse;

  if (!response.ok) {
    throw new Error(
      data?.error?.message ??
        "Google API request failed."
    );
  }

  return data;
}

/* =========================================================
   Google Profile
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
   Generic Business API GET
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
   Generic Business API POST
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
      body: JSON.stringify(body),
    }
  );
}

/* =========================================================
   Google Business Profile Accounts
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
   Google Business Profile Locations
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
   Find First Available Business Location
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

  for (const account of accounts) {
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
        location: locations[0],
      };
    }
  }

  return null;
}

/* =========================================================
   Business Manage OAuth Scope
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