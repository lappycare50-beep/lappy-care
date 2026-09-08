"use client";

import { useEffect, useState } from "react";

interface GoogleAccount {
  name: string;
  accountName?: string;
  type?: string;
  role?: string;
  accountNumber?: string;
  permissionLevel?: string;
}

interface GoogleLocation {
  name: string;
  title?: string;
  storeCode?: string;
  websiteUri?: string;

  storefrontAddress?: {
    addressLines?: string[];
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
    regionCode?: string;
  };

  phoneNumbers?: {
    primaryPhone?: string;
    additionalPhones?: string[];
  };
}

interface GoogleBusinessProfile {
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

const socialAccounts = [
  {
    name: "Google Business Profile",
    description:
      "Connect your Google Business Profile for AI-powered posting.",
    available: true,
  },
  {
    name: "Facebook Page",
    description:
      "Connect your Facebook Business Page to publish campaigns.",
    available: false,
  },
  {
    name: "Instagram Business",
    description:
      "Publish AI generated posts directly to Instagram.",
    available: false,
  },
  {
    name: "LinkedIn Company",
    description:
      "Share business updates to your LinkedIn company page.",
    available: false,
  },
  {
    name: "X (Twitter)",
    description:
      "Publish quick updates and announcements.",
    available: false,
  },
];

export default function SocialAccountsClient() {
  const [profile, setProfile] =
    useState<GoogleBusinessProfile | null>(null);

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [showManager, setShowManager] =
    useState(false);

  const [accounts, setAccounts] =
    useState<GoogleAccount[]>([]);

  const [selectedAccount, setSelectedAccount] =
    useState<GoogleAccount | null>(null);

  const [locations, setLocations] =
    useState<GoogleLocation[]>([]);

  const [loadingAccounts, setLoadingAccounts] =
    useState(false);

  const [loadingLocations, setLoadingLocations] =
    useState(false);

  const [savingLocation, setSavingLocation] =
    useState(false);

  const [disconnecting, setDisconnecting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =====================================================
     LOAD SAVED GOOGLE BUSINESS PROFILE
  ===================================================== */

  async function loadProfile() {
    setLoadingProfile(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/marketing/google/profile",
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Failed to load Google Business Profile."
        );
      }

      setProfile(
        data.profile ?? null
      );
    } catch (error) {
      console.error(
        "Load Google Business Profile Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load Google Business Profile."
      );
    } finally {
      setLoadingProfile(false);
    }
  }

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadProfile();

    const params =
      new URLSearchParams(
        window.location.search
      );

    const google =
      params.get("google");

    if (
      google === "profile-saved"
    ) {
      setSuccess(
        "Google Business Profile connected successfully."
      );
    }

    if (
      google === "connected"
    ) {
      setSuccess(
        "Google account connected successfully."
      );
    }
  }, []);

  /* =====================================================
     LOAD GOOGLE BUSINESS ACCOUNTS
  ===================================================== */

  async function loadAccounts() {
    setLoadingAccounts(true);
    setError("");
    setSuccess("");

    try {
      const response =
        await fetch(
          "/api/marketing/google/accounts",
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Failed to load Google Business Accounts."
        );
      }

      setAccounts(
        data.accounts ?? []
      );
    } catch (error) {
      console.error(
        "Load Google Accounts Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load Google Business Accounts."
      );
    } finally {
      setLoadingAccounts(false);
    }
  }

  /* =====================================================
     OPEN MANAGE
  ===================================================== */

  function handleManage() {
    setShowManager(true);
    setSelectedAccount(null);
    setLocations([]);
    setError("");
    setSuccess("");

    loadAccounts();
  }

  /* =====================================================
     LOAD LOCATIONS
  ===================================================== */

  async function loadLocations(
    account: GoogleAccount
  ) {
    setSelectedAccount(account);
    setLocations([]);
    setError("");
    setLoadingLocations(true);

    try {
      const response =
        await fetch(
          `/api/marketing/google/locations?account=${encodeURIComponent(
            account.name
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Failed to load Google Business Locations."
        );
      }

      setLocations(
        data.locations ?? []
      );
    } catch (error) {
      console.error(
        "Load Google Locations Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load Google Business Locations."
      );
    } finally {
      setLoadingLocations(false);
    }
  }

  /* =====================================================
     SAVE LOCATION
  ===================================================== */

  async function selectLocation(
    location: GoogleLocation
  ) {
    if (!selectedAccount) {
      setError(
        "Please select a Google Business Account."
      );

      return;
    }

    setSavingLocation(true);
    setError("");
    setSuccess("");

    try {
      const response =
        await fetch(
          "/api/marketing/google/profile",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              account:
                selectedAccount,

              location,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Failed to save Google Business Profile."
        );
      }

      await loadProfile();

      setShowManager(false);
      setSelectedAccount(null);
      setLocations([]);

      setSuccess(
        "Google Business Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Save Google Business Profile Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save Google Business Profile."
      );
    } finally {
      setSavingLocation(false);
    }
  }

  /* =====================================================
     DISCONNECT
  ===================================================== */

  async function disconnectProfile() {
    if (!profile?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to disconnect this Google Business Profile?"
      );

    if (!confirmed) {
      return;
    }

    setDisconnecting(true);
    setError("");
    setSuccess("");

    try {
      const response =
        await fetch(
          "/api/marketing/google/profile",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: profile.id,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Failed to disconnect Google Business Profile."
        );
      }

      setProfile(null);
      setShowManager(false);

      setSuccess(
        "Google Business Profile disconnected."
      );
    } catch (error) {
      console.error(
        "Disconnect Google Business Profile Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to disconnect Google Business Profile."
      );
    } finally {
      setDisconnecting(false);
    }
  }

  /* =====================================================
     FORMAT STATUS
  ===================================================== */

  const connected =
    Boolean(
      profile?.connected
    );

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="space-y-6">

      {/* =================================================
          GLOBAL MESSAGES
      ================================================= */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
          <p className="text-sm font-medium text-green-400">
            {success}
          </p>
        </div>
      )}

      {/* =================================================
          SOCIAL ACCOUNTS
      ================================================= */}

      <div className="space-y-6">
        {socialAccounts.map(
          (account) => (
            <div
              key={account.name}
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
              "
            >

              {/* =================================================
                  HEADER
              ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  gap-6
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                "
              >

                <div className="min-w-0">

                  <h2 className="text-xl font-semibold text-white">
                    {account.name}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    {account.description}
                  </p>

                  {/* GOOGLE STATUS */}

                  {account.name ===
                  "Google Business Profile" ? (

                    loadingProfile ? (
                      <p className="mt-4 text-sm text-zinc-500">
                        Checking connection...
                      </p>
                    ) : connected ? (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                        <span className="font-semibold text-green-400">
                          Connected
                        </span>
                      </div>
                    ) : (
                      <p className="mt-4 font-semibold text-red-400">
                        Not Connected
                      </p>
                    )

                  ) : (
                    <p className="mt-4 font-semibold text-red-400">
                      Not Connected
                    </p>
                  )}

                </div>

                {/* ACTION BUTTON */}

                {account.name ===
                "Google Business Profile" ? (

                  connected ? (

                    <div className="flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={
                          handleManage
                        }
                        className="
                          inline-flex
                          min-w-[110px]
                          items-center
                          justify-center
                          rounded-xl
                          bg-yellow-500
                          px-6
                          py-3
                          font-semibold
                          text-black
                          transition
                          hover:bg-yellow-400
                          active:scale-95
                        "
                      >
                        Manage
                      </button>

                      <button
                        type="button"
                        onClick={
                          disconnectProfile
                        }
                        disabled={
                          disconnecting
                        }
                        className="
                          inline-flex
                          min-w-[110px]
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-red-500/30
                          bg-red-500/10
                          px-6
                          py-3
                          font-semibold
                          text-red-400
                          transition
                          hover:bg-red-500/20
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {disconnecting
                          ? "Disconnecting..."
                          : "Disconnect"}
                      </button>

                    </div>

                  ) : (

                    <a
                      href="/api/auth/google"
                      className="
                        inline-flex
                        min-w-[110px]
                        items-center
                        justify-center
                        rounded-xl
                        bg-yellow-500
                        px-6
                        py-3
                        font-semibold
                        text-black
                        transition
                        hover:bg-yellow-400
                        active:scale-95
                      "
                    >
                      Connect
                    </a>

                  )

                ) : (

                  <button
                    type="button"
                    disabled
                    className="
                      min-w-[110px]
                      cursor-not-allowed
                      rounded-xl
                      bg-zinc-800
                      px-6
                      py-3
                      font-semibold
                      text-zinc-500
                    "
                  >
                    Coming Soon
                  </button>

                )}

              </div>

              {/* =================================================
                  CONNECTED PROFILE DETAILS
              ================================================= */}

              {account.name ===
                "Google Business Profile" &&
                connected &&
                profile && (
                  <div className="mt-8 border-t border-zinc-800 pt-8">

                    <div className="grid gap-4 md:grid-cols-2">

                      {/* BUSINESS NAME */}

                      <div className="rounded-xl bg-zinc-950 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Business Name
                        </p>

                        <p className="mt-2 font-semibold text-white">
                          {profile.businessName ||
                            "Not Available"}
                        </p>
                      </div>

                      {/* GOOGLE ACCOUNT */}

                      <div className="rounded-xl bg-zinc-950 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Google Account
                        </p>

                        <p className="mt-2 break-all font-semibold text-white">
                          {profile.accountEmail ||
                            "Not Available"}
                        </p>
                      </div>

                      {/* ADDRESS */}

                      <div className="rounded-xl bg-zinc-950 p-5 md:col-span-2">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Business Address
                        </p>

                        <p className="mt-2 text-zinc-300">
                          {profile.address ||
                            "Not Available"}
                        </p>
                      </div>

                      {/* PHONE */}

                      <div className="rounded-xl bg-zinc-950 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Phone
                        </p>

                        <p className="mt-2 font-semibold text-white">
                          {profile.phone ||
                            "Not Available"}
                        </p>
                      </div>

                      {/* WEBSITE */}

                      <div className="rounded-xl bg-zinc-950 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Website
                        </p>

                        {profile.website ? (
                          <a
                            href={
                              profile.website
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              mt-2
                              block
                              break-all
                              font-semibold
                              text-yellow-400
                              hover:text-yellow-300
                            "
                          >
                            {profile.website}
                          </a>
                        ) : (
                          <p className="mt-2 text-zinc-500">
                            Not Available
                          </p>
                        )}
                      </div>

                    </div>

                    {/* LOCATION IDS */}

                    <div className="mt-4 rounded-xl bg-zinc-950 p-5">

                      <div className="grid gap-4 md:grid-cols-2">

                        <div>
                          <p className="text-xs uppercase tracking-wider text-zinc-500">
                            Account ID
                          </p>

                          <p className="mt-1 break-all text-sm text-zinc-400">
                            {profile.accountId}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-zinc-500">
                            Location ID
                          </p>

                          <p className="mt-1 break-all text-sm text-zinc-400">
                            {profile.locationId}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>
                )}

              {/* =================================================
                  MANAGE SECTION
              ================================================= */}

              {account.name ===
                "Google Business Profile" &&
                showManager && (

                <div className="mt-8 border-t border-zinc-800 pt-8">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Change Business Location
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        Select another Google Business
                        Profile location.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowManager(
                          false
                        );

                        setSelectedAccount(
                          null
                        );

                        setLocations([]);
                      }}
                      className="
                        rounded-lg
                        border
                        border-zinc-700
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-zinc-300
                        hover:bg-zinc-800
                      "
                    >
                      Close
                    </button>

                  </div>

                  {/* ACCOUNTS */}

                  <div className="mt-6">

                    <h4 className="font-semibold text-white">
                      Google Business Accounts
                    </h4>

                    {loadingAccounts ? (

                      <div className="mt-4 rounded-xl bg-zinc-950 p-5">
                        <p className="text-sm text-zinc-400">
                          Loading accounts...
                        </p>
                      </div>

                    ) : accounts.length ===
                      0 ? (

                      <div className="mt-4 rounded-xl bg-zinc-950 p-5">
                        <p className="text-sm text-zinc-400">
                          No Google Business Accounts
                          found.
                        </p>
                      </div>

                    ) : (

                      <div className="mt-4 space-y-3">

                        {accounts.map(
                          (googleAccount) => {

                            const selected =
                              selectedAccount?.name ===
                              googleAccount.name;

                            return (
                              <button
                                key={
                                  googleAccount.name
                                }
                                type="button"
                                onClick={() =>
                                  loadLocations(
                                    googleAccount
                                  )
                                }
                                className={`
                                  w-full
                                  rounded-xl
                                  border
                                  p-5
                                  text-left
                                  transition
                                  ${
                                    selected
                                      ? "border-yellow-500 bg-yellow-500/10"
                                      : "border-zinc-800 bg-zinc-950 hover:border-yellow-500/50"
                                  }
                                `}
                              >

                                <div className="flex items-center justify-between gap-4">

                                  <div>
                                    <p className="font-semibold text-white">
                                      {googleAccount.accountName ??
                                        googleAccount.name}
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                      {
                                        googleAccount.name
                                      }
                                    </p>
                                  </div>

                                  <span className="text-xl text-yellow-400">
                                    →
                                  </span>

                                </div>

                              </button>
                            );
                          }
                        )}

                      </div>

                    )}

                  </div>

                  {/* LOCATIONS */}

                  {selectedAccount && (

                    <div className="mt-8">

                      <h4 className="font-semibold text-white">
                        Business Locations
                      </h4>

                      <p className="mt-1 text-sm text-zinc-500">
                        {selectedAccount.accountName ??
                          selectedAccount.name}
                      </p>

                      {loadingLocations ? (

                        <div className="mt-4 rounded-xl bg-zinc-950 p-5">
                          <p className="text-sm text-zinc-400">
                            Loading locations...
                          </p>
                        </div>

                      ) : locations.length ===
                        0 ? (

                        <div className="mt-4 rounded-xl bg-zinc-950 p-5">
                          <p className="text-sm text-zinc-400">
                            No business locations
                            found.
                          </p>
                        </div>

                      ) : (

                        <div className="mt-4 space-y-3">

                          {locations.map(
                            (location) => (
                              <button
                                key={
                                  location.name
                                }
                                type="button"
                                disabled={
                                  savingLocation
                                }
                                onClick={() =>
                                  selectLocation(
                                    location
                                  )
                                }
                                className="
                                  w-full
                                  rounded-xl
                                  border
                                  border-zinc-800
                                  bg-zinc-950
                                  p-5
                                  text-left
                                  transition
                                  hover:border-yellow-500/50
                                  hover:bg-zinc-900
                                  disabled:cursor-not-allowed
                                  disabled:opacity-50
                                "
                              >

                                <div className="flex items-start justify-between gap-4">

                                  <div>

                                    <p className="font-semibold text-white">
                                      {location.title ??
                                        "Business Location"}
                                    </p>

                                    {location
                                      .storefrontAddress && (
                                      <p className="mt-2 text-sm text-zinc-400">
                                        {[
                                          location
                                            .storefrontAddress
                                            .addressLines?.join(
                                              ", "
                                            ),

                                          location
                                            .storefrontAddress
                                            .locality,

                                          location
                                            .storefrontAddress
                                            .administrativeArea,

                                          location
                                            .storefrontAddress
                                            .postalCode,

                                          location
                                            .storefrontAddress
                                            .regionCode,
                                        ]
                                          .filter(
                                            Boolean
                                          )
                                          .join(
                                            ", "
                                          )}
                                      </p>
                                    )}

                                    {location
                                      .phoneNumbers
                                      ?.primaryPhone && (
                                      <p className="mt-2 text-sm text-zinc-500">
                                        {
                                          location
                                            .phoneNumbers
                                            .primaryPhone
                                        }
                                      </p>
                                    )}

                                  </div>

                                  <span className="whitespace-nowrap text-sm font-semibold text-yellow-400">
                                    {savingLocation
                                      ? "Saving..."
                                      : "Select →"}
                                  </span>

                                </div>

                              </button>
                            )
                          )}

                        </div>

                      )}

                    </div>

                  )}

                </div>
              )}

            </div>
          )
        )}
      </div>
    </div>
  );
}