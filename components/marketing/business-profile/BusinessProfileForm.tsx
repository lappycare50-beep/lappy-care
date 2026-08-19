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

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      const data =
        await getBusinessProfile();

      if (data) {
        setProfile(data);
      } else {
        setProfile(defaultProfile);
      }

      setHasChanges(false);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  function updateProfile(
    updated: BusinessProfile
  ) {
    setProfile(updated);
    setHasChanges(true);
  }

  async function handleSave() {
    try {
      setSaving(true);

      await saveBusinessProfile(profile);

      setHasChanges(false);

      alert(
        "Business Profile Saved Successfully."
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to save Business Profile."
      );

    } finally {

      setSaving(false);

    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-white">
        Loading Business Profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">

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
        onReset={loadProfile}
      />

    </div>
  );
}