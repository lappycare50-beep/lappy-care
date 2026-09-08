"use client";

import { useEffect, useState } from "react";

import {
  Bot,
  Bell,
  Globe,
  MessageSquare,
  Save,
  Settings as SettingsIcon,
  Shield,
  RotateCcw,
  Send,
} from "lucide-react";


import {
  getMarketingSettings,
  saveMarketingSettings,
  resetMarketingSettings,
  DEFAULT_MARKETING_SETTINGS,
  type MarketingSettings,
} from "@/services/marketingSettingsService";

export default function MarketingSettingsPage() {
  const [settings, setSettings] =
    useState<MarketingSettings>({
      ...DEFAULT_MARKETING_SETTINGS,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data =
          await getMarketingSettings();

        if (!active) return;

        setSettings({
          ...DEFAULT_MARKETING_SETTINGS,
          ...data,
        });
      } catch (err) {
        console.error(
          "Marketing settings load error:",
          err
        );

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load saved settings."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  function updateSetting<
    K extends keyof MarketingSettings
  >(
    key: K,
    value: MarketingSettings[K]
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  }

  async function handleSave() {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      await saveMarketingSettings(settings);

      setSaved(true);
    } catch (err) {
      console.error(
        "Marketing settings save error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    const confirmed = window.confirm(
      "Reset all Marketing Hub settings to default?"
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      await resetMarketingSettings();

      setSettings({
        ...DEFAULT_MARKETING_SETTINGS,
      });

      setSaved(true);
    } catch (err) {
      console.error(
        "Marketing settings reset error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset settings."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <SettingsIcon
                  size={22}
                  className="text-green-400"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Marketing Settings
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                  Configure your Marketing Hub
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-bold text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
              >
                <RotateCcw size={16} />
                Reset
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving || loading}
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-black hover:bg-green-400 disabled:opacity-50"
              >
                <Save size={17} />

                {saving
                  ? "Saving..."
                  : saved
                    ? "Saved"
                    : "Save Settings"}
              </button>
            </div>
          </div>

          {/* STATUS */}
          {loading && (
            <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">
                Loading Marketing Settings...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm font-semibold text-red-400">
                {error}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Default settings are still available below.
              </p>
            </div>
          )}

          {saved && (
            <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
              <p className="text-sm font-semibold text-green-400">
                Marketing settings saved successfully.
              </p>
            </div>
          )}

          {/* GRID */}
          <div className="grid gap-6 xl:grid-cols-2">

            {/* GENERAL */}
            <SettingsCard
              icon={<Globe size={20} />}
              title="General"
              description="Basic marketing information"
            >
              <Field
                label="Brand Name"
                value={settings.brandName}
                onChange={(value) =>
                  updateSetting("brandName", value)
                }
              />

              <Field
                label="Website"
                value={settings.website}
                placeholder="https://example.com"
                onChange={(value) =>
                  updateSetting("website", value)
                }
              />

              <SelectField
                label="Default Language"
                value={settings.defaultLanguage}
                options={[
                  "English",
                  "Marathi",
                  "Hindi",
                ]}
                onChange={(value) =>
                  updateSetting(
                    "defaultLanguage",
                    value
                  )
                }
              />
            </SettingsCard>

            {/* AI */}
            <SettingsCard
              icon={<Bot size={20} />}
              title="AI Settings"
              description="Configure AI content generation"
            >
              <ToggleRow
                label="AI Enabled"
                description="Enable AI-powered marketing features"
                checked={settings.aiEnabled}
                onChange={(value) =>
                  updateSetting("aiEnabled", value)
                }
              />

              <SelectField
                label="AI Model"
                value={settings.aiModel}
                options={[
                  "gpt-5",
                  "gpt-5-mini",
                ]}
                onChange={(value) =>
                  updateSetting("aiModel", value)
                }
              />

              <SelectField
                label="Content Tone"
                value={settings.contentTone}
                options={[
                  "Professional",
                  "Friendly",
                  "Casual",
                  "Premium",
                ]}
                onChange={(value) =>
                  updateSetting(
                    "contentTone",
                    value
                  )
                }
              />
            </SettingsCard>

            {/* REVIEWS */}
            <SettingsCard
              icon={<MessageSquare size={20} />}
              title="Review Automation"
              description="Configure Google review AI workflow"
            >
              <ToggleRow
                label="Review AI Enabled"
                description="Enable AI assistance for customer reviews"
                checked={settings.reviewAiEnabled}
                onChange={(value) =>
                  updateSetting(
                    "reviewAiEnabled",
                    value
                  )
                }
              />

              <ToggleRow
                label="Auto Generate Replies"
                description="Automatically generate AI replies for new reviews"
                checked={settings.reviewAutoGenerate}
                onChange={(value) =>
                  updateSetting(
                    "reviewAutoGenerate",
                    value
                  )
                }
              />

              <ToggleRow
                label="Require Approval"
                description="Admin approval is required before publishing replies"
                checked={
                  settings.reviewRequireApproval
                }
                onChange={(value) =>
                  updateSetting(
                    "reviewRequireApproval",
                    value
                  )
                }
              />
            </SettingsCard>

            {/* PUBLISHING */}
            <SettingsCard
              icon={<Send size={20} />}
              title="Publishing"
              description="Control content publishing workflow"
            >
              <ToggleRow
                label="Publishing Approval"
                description="Require admin approval before publishing marketing content"
                checked={
                  settings.publishingApproval
                }
                onChange={(value) =>
                  updateSetting(
                    "publishingApproval",
                    value
                  )
                }
              />

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm font-bold text-white">
                  Safe Publishing
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Recommended: keep approval enabled until the publishing workflow is fully verified.
                </p>
              </div>
            </SettingsCard>

            {/* NOTIFICATIONS */}
            <SettingsCard
              icon={<Bell size={20} />}
              title="Notifications"
              description="Marketing Hub notification controls"
            >
              <ToggleRow
                label="New Review Notification"
                description="Notify admin when a new customer review is available"
                checked={
                  settings.notifyNewReview
                }
                onChange={(value) =>
                  updateSetting(
                    "notifyNewReview",
                    value
                  )
                }
              />

              <ToggleRow
                label="Publishing Failure"
                description="Notify admin when publishing fails"
                checked={
                  settings.notifyPublishingFailure
                }
                onChange={(value) =>
                  updateSetting(
                    "notifyPublishingFailure",
                    value
                  )
                }
              />
            </SettingsCard>

            {/* SECURITY */}
            <SettingsCard
              icon={<Shield size={20} />}
              title="Security"
              description="Marketing Hub safety controls"
            >
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm font-bold text-white">
                  Admin Approval
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Sensitive marketing actions should be reviewed by an administrator before publishing.
                </p>
              </div>
            </SettingsCard>

          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
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
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-green-400">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-bold text-white">
            {title}
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-zinc-400">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-green-500"
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-zinc-400">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-green-500"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
