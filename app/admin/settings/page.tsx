"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Building2,
  CheckCircle2,
  FileText,
  Globe,
  Loader2,
  MessageCircle,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";

import {
  getBusinessProfile,
  saveBusinessProfile,
} from "@/services/businessProfileService";

import {
  getAdminSettings,
  saveAdminSettings,
} from "@/services/adminSettingsService";

import type {
  BusinessProfile,
} from "@/types/businessProfile";

import {
  AdminSettings,
  DEFAULT_ADMIN_SETTINGS,
} from "@/types/adminSettings";

// ==========================================
// DEFAULT BUSINESS PROFILE
// ==========================================

const DEFAULT_PROFILE: BusinessProfile = {
  id: "default",

  businessName:
    "Lappy Care",

  tagline:
    "",

  description:
    "",

  logoUrl:
    "",

  contact: {
    phone:
      "9595057006",

    whatsapp:
      "9595057006",

    email:
      "",

    website:
      "https://lappycarepune.in",
  },

  address: {
    addressLine1:
      "",

    addressLine2:
      "",

    city:
      "Pune",

    state:
      "Maharashtra",

    country:
      "India",

    pincode:
      "",
  },

  social: {},

  services: [],

  keywords: [],

  serviceAreas: [],

  workingHours: {
    monday:
      "10:00 AM - 8:00 PM",

    tuesday:
      "10:00 AM - 8:00 PM",

    wednesday:
      "10:00 AM - 8:00 PM",

    thursday:
      "10:00 AM - 8:00 PM",

    friday:
      "10:00 AM - 8:00 PM",

    saturday:
      "10:00 AM - 8:00 PM",

    sunday:
      "Closed",
  },

  primaryCTA:
    "Book Laptop Service",

  createdAt:
    new Date(),

  updatedAt:
    new Date(),
};

// ==========================================
// PAGE
// ==========================================

export default function SettingsPage() {
  const [
    activeTab,
    setActiveTab,
  ] = useState<
    | "general"
    | "repair"
    | "invoice"
    | "whatsapp"
  >("general");

  const [
    profile,
    setProfile,
  ] =
    useState<BusinessProfile>(
      DEFAULT_PROFILE
    );

  const [
    settings,
    setSettings,
  ] =
    useState<AdminSettings>(
      DEFAULT_ADMIN_SETTINGS
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================
  // LOAD
  // ==========================================

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        setLoading(true);
        setError("");

        const [
          savedProfile,
          savedSettings,
        ] =
          await Promise.all([
            getBusinessProfile(),
            getAdminSettings(),
          ]);

        if (!mounted) {
          return;
        }

        if (savedProfile) {
          setProfile({
            ...DEFAULT_PROFILE,
            ...savedProfile,

            contact: {
              ...DEFAULT_PROFILE.contact,
              ...savedProfile.contact,
            },

            address: {
              ...DEFAULT_PROFILE.address,
              ...savedProfile.address,
            },

            social: {
              ...DEFAULT_PROFILE.social,
              ...savedProfile.social,
            },

            workingHours: {
              ...DEFAULT_PROFILE.workingHours,
              ...savedProfile.workingHours,
            },

            services:
              savedProfile.services ||
              [],

            keywords:
              savedProfile.keywords ||
              [],

            serviceAreas:
              savedProfile.serviceAreas ||
              [],
          });
        }

        setSettings(
          savedSettings
        );
      } catch (loadError) {
        console.error(
          "Settings load error:",
          loadError
        );

        if (mounted) {
          setError(
            "Unable to load settings."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================
  // PROFILE HELPERS
  // ==========================================

  function updateProfile(
    key: keyof BusinessProfile,
    value: BusinessProfile[keyof BusinessProfile]
  ) {
    setProfile(
      (current) => ({
        ...current,
        [key]: value,
      })
    );

    clearStatus();
  }

  function updateContact(
    key:
      | "phone"
      | "whatsapp"
      | "email"
      | "website",
    value: string
  ) {
    setProfile(
      (current) => ({
        ...current,

        contact: {
          ...current.contact,
          [key]: value,
        },
      })
    );

    clearStatus();
  }

  function updateAddress(
    key:
      | "addressLine1"
      | "addressLine2"
      | "city"
      | "state"
      | "country"
      | "pincode",
    value: string
  ) {
    setProfile(
      (current) => ({
        ...current,

        address: {
          ...current.address,
          [key]: value,
        },
      })
    );

    clearStatus();
  }

  function updateHours(
    day:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday",
    value: string
  ) {
    setProfile(
      (current) => ({
        ...current,

        workingHours: {
          ...current.workingHours,
          [day]: value,
        },
      })
    );

    clearStatus();
  }

  function updateArray(
    key:
      | "services"
      | "keywords"
      | "serviceAreas",
    value: string
  ) {
    setProfile(
      (current) => ({
        ...current,
        [key]: value
          .split(",")
          .map(
            (item) =>
              item.trim()
          )
          .filter(Boolean),
      })
    );

    clearStatus();
  }

  // ==========================================
  // ADMIN SETTINGS HELPERS
  // ==========================================

  function updateRepairSettings(
    data: Partial<
      AdminSettings["repair"]
    >
  ) {
    setSettings(
      (current) => ({
        ...current,

        repair: {
          ...current.repair,
          ...data,
        },
      })
    );

    clearStatus();
  }

  function updateInvoiceSettings(
    data: Partial<
      AdminSettings["invoice"]
    >
  ) {
    setSettings(
      (current) => ({
        ...current,

        invoice: {
          ...current.invoice,
          ...data,
        },
      })
    );

    clearStatus();
  }

  function updateWhatsAppSettings(
    data: Partial<
      AdminSettings["whatsapp"]
    >
  ) {
    setSettings(
      (current) => ({
        ...current,

        whatsapp: {
          ...current.whatsapp,
          ...data,
        },
      })
    );

    clearStatus();
  }

  function clearStatus() {
    setSuccess("");
    setError("");
  }

  // ==========================================
  // SAVE
  // ==========================================

  async function handleSave(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setSuccess("");
      setError("");

      const now =
        new Date();

      // ========================================
      // BUSINESS PROFILE
      // ========================================

      const cleanedProfile:
        BusinessProfile = {
        ...profile,

        businessName:
          profile.businessName.trim(),

        tagline:
          profile.tagline.trim(),

        description:
          profile.description.trim(),

        logoUrl:
          profile.logoUrl?.trim() || "",

        contact: {
          phone:
            profile.contact.phone.trim(),

          whatsapp:
            profile.contact.whatsapp.trim(),

          email:
            profile.contact.email.trim(),

          website:
            profile.contact.website?.trim() ||
            "",
        },

        address: {
          addressLine1:
            profile.address.addressLine1.trim(),

          addressLine2:
            profile.address.addressLine2?.trim() ||
            "",

          city:
            profile.address.city.trim(),

          state:
            profile.address.state.trim(),

          country:
            profile.address.country.trim(),

          pincode:
            profile.address.pincode.trim(),
        },

        services:
          profile.services,

        keywords:
          profile.keywords,

        serviceAreas:
          profile.serviceAreas,

        workingHours:
          profile.workingHours,

        primaryCTA:
          profile.primaryCTA.trim(),

        createdAt:
          profile.createdAt ||
          now,

        updatedAt:
          now,
      };

      // ========================================
      // ADMIN SETTINGS
      // ========================================

      const cleanedSettings:
        AdminSettings = {
        ...settings,

        id: "default",

        repair: {
          ...settings.repair,

          defaultWarranty:
            settings.repair.defaultWarranty.trim(),
        },

        invoice: {
          ...settings.invoice,

          invoicePrefix:
            settings.invoice.invoicePrefix.trim(),

          defaultGst:
            Math.max(
              0,
              Number(
                settings.invoice.defaultGst ||
                  0
              )
            ),
        },

        whatsapp: {
          ...settings.whatsapp,

          displayNumber:
            settings.whatsapp.displayNumber.replace(
              /\D/g,
              ""
            ),
        },

        updatedAt:
          now,
      };

      // ========================================
      // SAVE BOTH
      // ========================================

      await Promise.all([
        saveBusinessProfile(
          cleanedProfile
        ),

        saveAdminSettings(
          cleanedSettings
        ),
      ]);

      setProfile(
        cleanedProfile
      );

      setSettings(
        cleanedSettings
      );

      setSuccess(
        "Settings saved successfully."
      );
    } catch (saveError) {
      console.error(
        "Settings save error:",
        saveError
      );

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2
              size={20}
              className="animate-spin text-yellow-400"
            />

            Loading Settings...
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <AdminLayout>
      <form
        onSubmit={
          handleSave
        }
        className="space-y-6 p-4 sm:p-6 lg:p-8"
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <Settings
                size={24}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Manage Lappy Care configuration.
              </p>
            </div>

          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Save
                size={17}
              />
            )}

            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>

        </div>

        {/* ========================================
            STATUS
        ======================================== */}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            <CheckCircle2
              size={17}
            />

            {success}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* ========================================
            TABS
        ======================================== */}

        <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#181818] p-2">

          <div className="flex min-w-max gap-2">

            <TabButton
              active={
                activeTab ===
                "general"
              }
              onClick={() =>
                setActiveTab(
                  "general"
                )
              }
              icon={
                <Building2
                  size={17}
                />
              }
            >
              General
            </TabButton>

            <TabButton
              active={
                activeTab ===
                "repair"
              }
              onClick={() =>
                setActiveTab(
                  "repair"
                )
              }
              icon={
                <Wrench
                  size={17}
                />
              }
            >
              Repair
            </TabButton>

            <TabButton
              active={
                activeTab ===
                "invoice"
              }
              onClick={() =>
                setActiveTab(
                  "invoice"
                )
              }
              icon={
                <FileText
                  size={17}
                />
              }
            >
              Invoice
            </TabButton>

            <TabButton
              active={
                activeTab ===
                "whatsapp"
              }
              onClick={() =>
                setActiveTab(
                  "whatsapp"
                )
              }
              icon={
                <MessageCircle
                  size={17}
                />
              }
            >
              WhatsApp
            </TabButton>

          </div>

        </div>

        {/* ========================================
            GENERAL
        ======================================== */}

        {activeTab ===
          "general" && (
          <div className="space-y-6">

            <SettingsSection
              icon={
                <Building2
                  size={20}
                />
              }
              title="Business Information"
              description="Basic information used throughout Lappy Care."
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Business Name"
                  value={
                    profile.businessName
                  }
                  onChange={(value) =>
                    updateProfile(
                      "businessName",
                      value
                    )
                  }
                  required
                />

                <Field
                  label="Tagline"
                  value={
                    profile.tagline
                  }
                  onChange={(value) =>
                    updateProfile(
                      "tagline",
                      value
                    )
                  }
                />

                <TextArea
                  label="Description"
                  value={
                    profile.description
                  }
                  onChange={(value) =>
                    updateProfile(
                      "description",
                      value
                    )
                  }
                  rows={4}
                  className="md:col-span-2"
                />

                <Field
                  label="Logo URL"
                  value={
                    profile.logoUrl ||
                    ""
                  }
                  onChange={(value) =>
                    updateProfile(
                      "logoUrl",
                      value
                    )
                  }
                />

                <Field
                  label="Primary CTA"
                  value={
                    profile.primaryCTA
                  }
                  onChange={(value) =>
                    updateProfile(
                      "primaryCTA",
                      value
                    )
                  }
                />

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <Phone
                  size={20}
                />
              }
              title="Contact Details"
              description="Customer-facing contact information."
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Phone"
                  value={
                    profile.contact.phone
                  }
                  onChange={(value) =>
                    updateContact(
                      "phone",
                      value
                    )
                  }
                />

                <Field
                  label="WhatsApp"
                  value={
                    profile.contact.whatsapp
                  }
                  onChange={(value) =>
                    updateContact(
                      "whatsapp",
                      value
                    )
                  }
                />

                <Field
                  label="Email"
                  type="email"
                  value={
                    profile.contact.email
                  }
                  onChange={(value) =>
                    updateContact(
                      "email",
                      value
                    )
                  }
                />

                <Field
                  label="Website"
                  value={
                    profile.contact
                      .website ||
                    ""
                  }
                  onChange={(value) =>
                    updateContact(
                      "website",
                      value
                    )
                  }
                />

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <Globe
                  size={20}
                />
              }
              title="Business Address"
              description="Business location information."
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Address Line 1"
                  value={
                    profile.address
                      .addressLine1
                  }
                  onChange={(value) =>
                    updateAddress(
                      "addressLine1",
                      value
                    )
                  }
                />

                <Field
                  label="Address Line 2"
                  value={
                    profile.address
                      .addressLine2 ||
                    ""
                  }
                  onChange={(value) =>
                    updateAddress(
                      "addressLine2",
                      value
                    )
                  }
                />

                <Field
                  label="City"
                  value={
                    profile.address
                      .city
                  }
                  onChange={(value) =>
                    updateAddress(
                      "city",
                      value
                    )
                  }
                />

                <Field
                  label="State"
                  value={
                    profile.address
                      .state
                  }
                  onChange={(value) =>
                    updateAddress(
                      "state",
                      value
                    )
                  }
                />

                <Field
                  label="Country"
                  value={
                    profile.address
                      .country
                  }
                  onChange={(value) =>
                    updateAddress(
                      "country",
                      value
                    )
                  }
                />

                <Field
                  label="Pincode"
                  value={
                    profile.address
                      .pincode
                  }
                  onChange={(value) =>
                    updateAddress(
                      "pincode",
                      value
                    )
                  }
                />

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <ShieldCheck
                  size={20}
                />
              }
              title="Services & SEO"
              description="Comma-separated values used for business information."
            >

              <div className="space-y-5">

                <TextArea
                  label="Services"
                  value={
                    profile.services.join(
                      ", "
                    )
                  }
                  onChange={(value) =>
                    updateArray(
                      "services",
                      value
                    )
                  }
                />

                <TextArea
                  label="Keywords"
                  value={
                    profile.keywords.join(
                      ", "
                    )
                  }
                  onChange={(value) =>
                    updateArray(
                      "keywords",
                      value
                    )
                  }
                />

                <TextArea
                  label="Service Areas"
                  value={
                    profile.serviceAreas.join(
                      ", "
                    )
                  }
                  onChange={(value) =>
                    updateArray(
                      "serviceAreas",
                      value
                    )
                  }
                />

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <Settings
                  size={20}
                />
              }
              title="Working Hours"
              description="Weekly business hours."
            >

              <div className="grid gap-4 sm:grid-cols-2">

                {(
                  Object.keys(
                    profile.workingHours
                  ) as Array<
                    keyof BusinessProfile["workingHours"]
                  >
                ).map(
                  (day) => (
                    <Field
                      key={day}
                      label={
                        day
                          .charAt(0)
                          .toUpperCase() +
                        day.slice(1)
                      }
                      value={
                        profile
                          .workingHours[
                          day
                        ]
                      }
                      onChange={(
                        value
                      ) =>
                        updateHours(
                          day,
                          value
                        )
                      }
                    />
                  )
                )}

              </div>

            </SettingsSection>

          </div>
        )}

        {/* ========================================
            REPAIR SETTINGS
        ======================================== */}

        {activeTab ===
          "repair" && (
          <div className="space-y-6">

            <SettingsSection
              icon={
                <Wrench
                  size={20}
                />
              }
              title="Repair Defaults"
              description="Default values used while creating new repair jobs."
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Default Warranty"
                  value={
                    settings.repair
                      .defaultWarranty
                  }
                  onChange={(value) =>
                    updateRepairSettings({
                      defaultWarranty:
                        value,
                    })
                  }
                />

                <SelectField
                  label="Default Priority"
                  value={
                    settings.repair
                      .defaultPriority
                  }
                  onChange={(value) =>
                    updateRepairSettings({
                      defaultPriority:
                        value as
                          | "Low"
                          | "Medium"
                          | "High"
                          | "Urgent",
                    })
                  }
                  options={[
                    "Low",
                    "Medium",
                    "High",
                    "Urgent",
                  ]}
                />

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <MessageCircle
                  size={20}
                />
              }
              title="Repair WhatsApp Automation"
              description="Control automatic customer status messaging."
            >

              <div className="space-y-3">

                <ToggleRow
                  label="Enable WhatsApp automation"
                  description="Allow repair workflow to send WhatsApp status messages."
                  checked={
                    settings.repair
                      .autoWhatsAppEnabled
                  }
                  onChange={(checked) =>
                    updateRepairSettings({
                      autoWhatsAppEnabled:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Send Repair Received message"
                  description="Send the initial repair-received notification."
                  checked={
                    settings.repair
                      .sendReceivedWhatsApp
                  }
                  onChange={(checked) =>
                    updateRepairSettings({
                      sendReceivedWhatsApp:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Send status updates"
                  description="Send WhatsApp messages when repair status changes."
                  checked={
                    settings.repair
                      .sendStatusWhatsApp
                  }
                  onChange={(checked) =>
                    updateRepairSettings({
                      sendStatusWhatsApp:
                        checked,
                    })
                  }
                />

              </div>

            </SettingsSection>

          </div>
        )}

        {/* ========================================
            INVOICE SETTINGS
        ======================================== */}

        {activeTab ===
          "invoice" && (
          <div className="space-y-6">

            <SettingsSection
              icon={
                <FileText
                  size={20}
                />
              }
              title="Invoice Defaults"
              description="Default values used when creating invoices."
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Invoice Prefix"
                  value={
                    settings.invoice
                      .invoicePrefix
                  }
                  onChange={(value) =>
                    updateInvoiceSettings({
                      invoicePrefix:
                        value,
                    })
                  }
                  placeholder="LC-INV-"
                />

                <Field
                  label="Default GST %"
                  type="number"
                  value={String(
                    settings.invoice
                      .defaultGst
                  )}
                  onChange={(value) =>
                    updateInvoiceSettings({
                      defaultGst:
                        Number(
                          value
                        ) || 0,
                    })
                  }
                />

                <SelectField
                  label="Default Payment Method"
                  value={
                    settings.invoice
                      .defaultPaymentMethod
                  }
                  onChange={(value) =>
                    updateInvoiceSettings({
                      defaultPaymentMethod:
                        value as
                          | "Cash"
                          | "UPI"
                          | "Card"
                          | "Bank Transfer",
                    })
                  }
                  options={[
                    "Cash",
                    "UPI",
                    "Card",
                    "Bank Transfer",
                  ]}
                />

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <Building2
                  size={20}
                />
              }
              title="Invoice Business Details"
              description="Choose which business contact details appear on invoices."
            >

              <div className="space-y-3">

                <ToggleRow
                  label="Show business phone"
                  description="Display business phone number on invoices."
                  checked={
                    settings.invoice
                      .showBusinessPhone
                  }
                  onChange={(checked) =>
                    updateInvoiceSettings({
                      showBusinessPhone:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Show business email"
                  description="Display business email on invoices."
                  checked={
                    settings.invoice
                      .showBusinessEmail
                  }
                  onChange={(checked) =>
                    updateInvoiceSettings({
                      showBusinessEmail:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Show business website"
                  description="Display website on invoices."
                  checked={
                    settings.invoice
                      .showBusinessWebsite
                  }
                  onChange={(checked) =>
                    updateInvoiceSettings({
                      showBusinessWebsite:
                        checked,
                    })
                  }
                />

              </div>

            </SettingsSection>

          </div>
        )}

        {/* ========================================
            WHATSAPP SETTINGS
        ======================================== */}

        {activeTab ===
          "whatsapp" && (
          <div className="space-y-6">

            <SettingsSection
              icon={
                <MessageCircle
                  size={20}
                />
              }
              title="WhatsApp"
              description="Customer communication preferences."
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Display WhatsApp Number"
                  value={
                    settings.whatsapp
                      .displayNumber
                  }
                  onChange={(value) =>
                    updateWhatsAppSettings({
                      displayNumber:
                        value,
                    })
                  }
                  placeholder="9595057006"
                />

                <div className="rounded-xl border border-gray-800 bg-black p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                      <Phone
                        size={18}
                      />
                    </div>

                    <div>

                      <p className="text-xs text-gray-500">
                        API Configuration
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        Environment variables
                      </p>

                    </div>

                  </div>

                  <p className="mt-3 text-xs leading-5 text-gray-600">
                    Meta API credentials remain protected in environment configuration and are not stored in this page.
                  </p>

                </div>

              </div>

            </SettingsSection>

            <SettingsSection
              icon={
                <MessageCircle
                  size={20}
                />
              }
              title="Messaging Behaviour"
              description="Configure customer-facing WhatsApp behaviour."
            >

              <div className="space-y-3">

                <ToggleRow
                  label="Enable WhatsApp"
                  description="Enable WhatsApp customer communication."
                  checked={
                    settings.whatsapp
                      .enabled
                  }
                  onChange={(checked) =>
                    updateWhatsAppSettings({
                      enabled:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Allow manual messaging"
                  description="Allow staff to manually send WhatsApp messages."
                  checked={
                    settings.whatsapp
                      .manualMessagingEnabled
                  }
                  onChange={(checked) =>
                    updateWhatsAppSettings({
                      manualMessagingEnabled:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Preview URLs"
                  description="Allow WhatsApp URL previews when supported."
                  checked={
                    settings.whatsapp
                      .previewUrls
                  }
                  onChange={(checked) =>
                    updateWhatsAppSettings({
                      previewUrls:
                        checked,
                    })
                  }
                />

                <ToggleRow
                  label="Received message tracking link"
                  description="Include Repair Tracking ID and tracking URL in Repair Received messages."
                  checked={
                    settings.whatsapp
                      .receivedTrackingLink
                  }
                  onChange={(checked) =>
                    updateWhatsAppSettings({
                      receivedTrackingLink:
                        checked,
                    })
                  }
                />

              </div>

            </SettingsSection>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">

              <div className="flex items-start gap-3">

                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <div>

                  <h3 className="font-semibold text-white">
                    WhatsApp API Security
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Access tokens and Phone Number ID are kept in server environment variables. They should not be exposed inside the admin UI.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================
            BOTTOM SAVE
        ======================================== */}

        <div className="flex justify-end border-t border-gray-800 pt-6">

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-60"
          >

            {saving ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Save
                size={17}
              />
            )}

            {saving
              ? "Saving..."
              : "Save Settings"}

          </button>

        </div>

      </form>
    </AdminLayout>
  );
}

// ========================================================
// TAB BUTTON
// ========================================================

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-xl
        px-4
        py-3
        text-sm
        font-semibold
        transition
        ${
          active
            ? "bg-yellow-400 text-black"
            : "text-gray-400 hover:bg-black hover:text-white"
        }
      `}
    >
      {icon}
      {children}
    </button>
  );
}

// ========================================================
// SETTINGS SECTION
// ========================================================

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-800 bg-[#181818] p-5 sm:p-6">

      <div className="mb-5 flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
          {icon}
        </div>

        <div>

          <h2 className="text-lg font-bold text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>

        </div>

      </div>

      {children}

    </section>
  );
}

// ========================================================
// FIELD
// ========================================================

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={
          placeholder
        }
        className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400"
      />

    </div>
  );
}

// ========================================================
// SELECT
// ========================================================

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-400"
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
              className="bg-[#181818] text-white"
            >
              {option}
            </option>
          )
        )}

      </select>

    </div>
  );
}

// ========================================================
// TEXT AREA
// ========================================================

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className}>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <textarea
        value={value}
        rows={rows}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={
          placeholder
        }
        className="w-full resize-y rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400"
      />

    </div>
  );
}

// ========================================================
// TOGGLE
// ========================================================

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-800 bg-black/50 p-4">

      <div className="min-w-0">

        <p className="font-semibold text-white">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange(
            !checked
          )
        }
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          transition
          ${
            checked
              ? "bg-green-500"
              : "bg-gray-700"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transition
            ${
              checked
                ? "left-6"
                : "left-1"
            }
          `}
        />

      </button>

    </div>
  );
}