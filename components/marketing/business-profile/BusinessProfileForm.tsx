"use client";

import { useEffect, useState } from "react";

import BusinessInfoCard from "./BusinessInfoCard";
import ContactCard from "./ContactCard";
import AddressCard from "./AddressCard";
import ServicesCard from "./ServicesCard";
import KeywordsCard from "./KeywordsCard";
import AreasCard from "./AreasCard";
import SaveBar from "./SaveBar";

import {
  getBusinessProfile,
  saveBusinessProfile,
} from "@/services/businessProfileService";

import { BusinessProfile } from "@/types/businessProfile";

interface GoogleBusinessAccount {
  name: string;
  accountName?: string;
  type?: string;
  role?: string;
  accountNumber?: string;
  permissionLevel?: string;
}

interface GoogleBusinessLocation {
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
}

const defaultProfile: BusinessProfile = {
  id: "default",

  businessName: "",
  tagline: "",
  description: "",

  logoUrl: "",

  contact: {
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
  },

  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  },

  social: {
    facebook: "",
    instagram: "",
    googleBusiness: "",
    linkedin: "",
    youtube: "",
    x: "",
  },

  services: [],
  keywords: [],
  serviceAreas: [],

  workingHours: {
    monday: "09:00 AM - 08:00 PM",
    tuesday: "09:00 AM - 08:00 PM",
    wednesday: "09:00 AM - 08:00 PM",
    thursday: "09:00 AM - 08:00 PM",
    friday: "09:00 AM - 08:00 PM",
    saturday: "09:00 AM - 08:00 PM",
    sunday: "Closed",
  },

  primaryCTA: "Call Now",

  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function BusinessProfileForm() {
  const [profile, setProfile] =
    useState<BusinessProfile>(defaultProfile);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  /* =====================================================
     GOOGLE BUSINESS PROFILE STATE
  ===================================================== */

  const [googleProfile, setGoogleProfile] =
    useState<GoogleBusinessProfile | null>(null);

  const [googleAccounts, setGoogleAccounts] =
    useState<GoogleBusinessAccount[]>([]);

  const [googleLocations, setGoogleLocations] =
    useState<GoogleBusinessLocation[]>([]);

  const [selectedAccount, setSelectedAccount] =
    useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [locationsLoading, setLocationsLoading] =
    useState(false);

  const [googleSaving, setGoogleSaving] =
    useState(false);

  const [googleError, setGoogleError] =
    useState("");

  const [googleMessage, setGoogleMessage] =
    useState("");

  /* =====================================================
     LOAD BUSINESS PROFILE
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        setLoading(true);

        await Promise.all([
          loadProfile(mounted),
          loadSavedGoogleProfile(mounted),
        ]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  async function loadProfile(
    mounted = true
  ) {
    try {
      const data =
        await getBusinessProfile();

      if (!mounted) {
        return;
      }

      if (data) {
        setProfile(data);
      } else {
        setProfile({
          ...defaultProfile,
        });
      }

      setHasChanges(false);
    } catch (error) {
      console.error(
        "Failed to load Business Profile:",
        error
      );
    }
  }

  /* =====================================================
     LOAD SAVED GOOGLE PROFILE

     IMPORTANT:
     This endpoint only reads our saved profile.
     It does NOT request Google Business accounts.
  ===================================================== */

  async function loadSavedGoogleProfile(
    mounted = true
  ) {
    try {
      const response =
        await fetch(
          "/api/marketing/google/profile",
          {
            method: "GET",
            cache: "no-store",
          }
        );

      if (!response.ok) {
        return;
      }

      const result =
        await response.json();

      if (!mounted) {
        return;
      }

      if (
        result?.connected &&
        result?.profile
      ) {
        const saved =
          result.profile as GoogleBusinessProfile;

        setGoogleProfile(saved);

        setSelectedAccount(
          saved.accountName ?? ""
        );

        setSelectedLocation(
          saved.locationName ?? ""
        );
      }
    } catch (error) {
      /*
       * Do not show an error for this background
       * Firestore/profile lookup.
       */
      console.warn(
        "Unable to load saved Google Business Profile.",
        error
      );
    }
  }

  /* =====================================================
     LOAD GOOGLE ACCOUNTS

     IMPORTANT:
     This is ONLY called by the user's button.

     Added protection:
     - prevent duplicate simultaneous calls
     - friendly 429 handling
     - no console.error for expected quota errors
  ===================================================== */

  async function loadGoogleAccounts() {
  try {
    setGoogleLoading(true);
    setGoogleError("");
    setGoogleMessage("");

    const response = await fetch(
      "/api/marketing/google/accounts",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    let result: any = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    /* =====================================================
       GOOGLE API QUOTA
    ===================================================== */

    if (response.status === 429) {
      setGoogleAccounts([]);
      setGoogleError(
        "Google Business API quota is temporarily exceeded. Please wait a few minutes and try again."
      );

      return;
    }

    /* =====================================================
       OTHER API ERRORS
    ===================================================== */

    if (!response.ok) {
      setGoogleAccounts([]);

      setGoogleError(
        result?.error ??
          "Failed to load Google Business Accounts."
      );

      return;
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    const accounts =
      Array.isArray(result?.accounts)
        ? result.accounts
        : [];

    setGoogleAccounts(accounts);

    if (accounts.length === 0) {
      setGoogleMessage(
        "No Google Business accounts were found."
      );
    } else {
      setGoogleMessage(
        `${accounts.length} Google Business account${
          accounts.length === 1 ? "" : "s"
        } found.`
      );
    }
  } catch (error) {
    console.error(
      "Failed to load Google Business Accounts:",
      error
    );

    setGoogleAccounts([]);

    setGoogleError(
      error instanceof Error
        ? error.message
        : "Failed to load Google Business Accounts."
    );
  } finally {
    setGoogleLoading(false);
  }
}

  /* =====================================================
     LOAD GOOGLE LOCATIONS
  ===================================================== */

  async function loadGoogleLocations(
    accountName: string
  ) {
    if (!accountName) {
      setGoogleLocations([]);
      setSelectedLocation("");
      return;
    }

    if (locationsLoading) {
      return;
    }

    try {
      setLocationsLoading(true);
      setGoogleError("");
      setGoogleMessage("");

      const response =
        await fetch(
          `/api/marketing/google/locations?account=${encodeURIComponent(
            accountName
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.status === 429) {
        setGoogleError(
          "Google Business API limit has been reached. Please wait a few minutes before loading locations."
        );

        return;
      }

      if (!response.ok) {
        setGoogleError(
          result?.error ??
            "Failed to load Google Business Locations."
        );

        return;
      }

      const locations =
        Array.isArray(result?.locations)
          ? result.locations
          : [];

      setGoogleLocations(locations);

      if (locations.length === 0) {
        setGoogleMessage(
          "No Business Profile locations were found for this account."
        );
      } else {
        setGoogleMessage(
          `${locations.length} location${
            locations.length === 1
              ? ""
              : "s"
          } found.`
        );
      }
    } catch (error) {
      console.warn(
        "Google Business Locations request failed.",
        error
      );

      setGoogleError(
        "Unable to load Google Business Locations right now."
      );
    } finally {
      setLocationsLoading(false);
    }
  }

  /* =====================================================
     ACCOUNT CHANGE
  ===================================================== */

  function handleAccountChange(
    accountName: string
  ) {
    setSelectedAccount(accountName);

    setSelectedLocation("");

    setGoogleLocations([]);

    setGoogleError("");
    setGoogleMessage("");

    if (accountName) {
      loadGoogleLocations(
        accountName
      );
    }
  }

  /* =====================================================
     SAVE GOOGLE BUSINESS PROFILE
  ===================================================== */

  async function saveGoogleProfile() {
    if (!selectedAccount) {
      setGoogleError(
        "Please select a Google Business account."
      );

      return;
    }

    if (!selectedLocation) {
      setGoogleError(
        "Please select a Google Business location."
      );

      return;
    }

    const account =
      googleAccounts.find(
        (item) =>
          item.name === selectedAccount
      );

    const location =
      googleLocations.find(
        (item) =>
          item.name === selectedLocation
      );

    if (!account) {
      setGoogleError(
        "Selected Google Business account was not found."
      );

      return;
    }

    if (!location) {
      setGoogleError(
        "Selected Google Business location was not found."
      );

      return;
    }

    try {
      setGoogleSaving(true);
      setGoogleError("");
      setGoogleMessage("");

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
              account,
              location,
            }),
          }
        );

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.status === 429) {
        setGoogleError(
          "Google Business API limit has been reached. Please wait a few minutes before trying again."
        );

        return;
      }

      if (!response.ok) {
        setGoogleError(
          result?.error ??
            "Failed to save Google Business Profile."
        );

        return;
      }

      await loadSavedGoogleProfile();

      setGoogleMessage(
        "Google Business Profile saved successfully."
      );
    } catch (error) {
      console.warn(
        "Failed to save Google Business Profile.",
        error
      );

      setGoogleError(
        "Unable to save Google Business Profile right now."
      );
    } finally {
      setGoogleSaving(false);
    }
  }

  /* =====================================================
     DISCONNECT GOOGLE BUSINESS PROFILE
  ===================================================== */

  async function disconnectGoogleProfile() {
    if (!googleProfile?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to disconnect this Google Business Profile?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setGoogleSaving(true);
      setGoogleError("");
      setGoogleMessage("");

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
              id: googleProfile.id,
            }),
          }
        );

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        setGoogleError(
          result?.error ??
            "Failed to disconnect Google Business Profile."
        );

        return;
      }

      setGoogleProfile(null);
      setSelectedAccount("");
      setSelectedLocation("");

      setGoogleAccounts([]);
      setGoogleLocations([]);

      setGoogleMessage(
        "Google Business Profile disconnected."
      );
    } catch (error) {
      console.warn(
        "Failed to disconnect Google Business Profile.",
        error
      );

      setGoogleError(
        "Unable to disconnect Google Business Profile right now."
      );
    } finally {
      setGoogleSaving(false);
    }
  }

  /* =====================================================
     BUSINESS PROFILE UPDATE
  ===================================================== */

  function updateProfile(
    updated: BusinessProfile
  ) {
    setProfile(updated);
    setHasChanges(true);
  }

  /* =====================================================
     SAVE BUSINESS PROFILE
  ===================================================== */

  async function handleSave() {
    try {
      setSaving(true);

      await saveBusinessProfile(
        profile
      );

      setHasChanges(false);

      alert(
        "Business Profile Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Failed to save Business Profile:",
        error
      );

      alert(
        "Unable to save Business Profile."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-white">
        Loading Business Profile...
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="space-y-6">

      {/* =================================================
          GOOGLE BUSINESS PROFILE
      ================================================= */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Google Business Profile
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Select the Google Business Profile that
              should be used for publishing posts.
            </p>
          </div>

          {googleProfile?.connected && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Connected
            </div>
          )}

        </div>

        {/* =================================================
            CONNECTED PROFILE
        ================================================= */}

        {googleProfile?.connected ? (
          <div className="mb-6 rounded-xl border border-zinc-700 bg-zinc-950 p-5">

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Business
                </p>

                <p className="mt-1 font-medium text-white">
                  {googleProfile.businessName ||
                    "Google Business Profile"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Account
                </p>

                <p className="mt-1 break-all font-medium text-white">
                  {googleProfile.accountEmail}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Address
                </p>

                <p className="mt-1 text-sm text-zinc-300">
                  {googleProfile.address ||
                    "Address not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Phone
                </p>

                <p className="mt-1 text-sm text-zinc-300">
                  {googleProfile.phone ||
                    "Phone not available"}
                </p>
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() => {
                  setGoogleProfile(null);
                  setGoogleAccounts([]);
                  setGoogleLocations([]);
                  setSelectedAccount("");
                  setSelectedLocation("");
                  setGoogleMessage("");
                  setGoogleError("");
                }}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
              >
                Change Profile
              </button>

              <button
                type="button"
                onClick={
                  disconnectGoogleProfile
                }
                disabled={googleSaving}
                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {googleSaving
                  ? "Disconnecting..."
                  : "Disconnect"}
              </button>

            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                LOAD ACCOUNTS
            ================================================= */}

            <div className="mb-5 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={
                  loadGoogleAccounts
                }
                disabled={googleLoading}
                className="rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {googleLoading
                  ? "Loading Accounts..."
                  : "Load Google Business Accounts"}
              </button>

            </div>

            {/* =================================================
                ACCOUNT SELECT
            ================================================= */}

            {googleAccounts.length > 0 && (
              <div className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Google Business Account
                  </label>

                  <select
                    value={selectedAccount}
                    onChange={(event) =>
                      handleAccountChange(
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
                  >
                    <option value="">
                      Select Google Business Account
                    </option>

                    {googleAccounts.map(
                      (account) => (
                        <option
                          key={account.name}
                          value={account.name}
                        >
                          {account.accountName ||
                            account.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* =================================================
                    LOCATION SELECT
                ================================================= */}

                {selectedAccount && (
                  <div>

                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Business Location
                    </label>

                    {locationsLoading ? (
                      <div className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
                        Loading Business Locations...
                      </div>
                    ) : (
                      <select
                        value={
                          selectedLocation
                        }
                        onChange={(event) =>
                          setSelectedLocation(
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
                      >
                        <option value="">
                          Select Business Location
                        </option>

                        {googleLocations.map(
                          (location) => (
                            <option
                              key={
                                location.name
                              }
                              value={
                                location.name
                              }
                            >
                              {location.title ||
                                location.name}
                            </option>
                          )
                        )}
                      </select>
                    )}

                  </div>
                )}

                {/* =================================================
                    SAVE BUTTON
                ================================================= */}

                {selectedLocation && (
                  <button
                    type="button"
                    onClick={
                      saveGoogleProfile
                    }
                    disabled={
                      googleSaving ||
                      locationsLoading
                    }
                    className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {googleSaving
                      ? "Saving..."
                      : "Save Google Business Profile"}
                  </button>
                )}

              </div>
            )}
          </>
        )}

        {/* =================================================
            MESSAGES
        ================================================= */}

        {googleMessage && (
          <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {googleMessage}
          </div>
        )}

        {googleError && (
          <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {googleError}
          </div>
        )}

      </section>

      {/* =================================================
          EXISTING BUSINESS PROFILE SECTIONS
      ================================================= */}

      <BusinessInfoCard
        profile={profile}
        onChange={updateProfile}
      />

      <ContactCard
        profile={profile}
        onChange={updateProfile}
      />

      <AddressCard
        profile={profile}
        onChange={updateProfile}
      />

      <ServicesCard
        profile={profile}
        onChange={updateProfile}
      />

      <KeywordsCard
        profile={profile}
        onChange={updateProfile}
      />

      <AreasCard
        profile={profile}
        onChange={updateProfile}
      />

      <SaveBar
        saving={saving}
        hasChanges={hasChanges}
        onSave={handleSave}
        onReset={() => loadProfile()}
      />

    </div>
  );
}