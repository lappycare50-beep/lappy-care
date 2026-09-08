"use client";

import { useState } from "react";

import {
  AIContentRequest,
  AIContentResponse,
} from "@/types/aiContent";

import GeneratedContent from "./GeneratedContent";

const initialForm: AIContentRequest = {
  platform: "Google Business",
  category: "",
  language: "English",
  tone: "Professional",
  location: "",
  keywords: [],
  offer: "",
};

const LANGUAGES = [
  { value: "English", label: "🇬🇧 English" },
  { value: "Marathi", label: "🇮🇳 Marathi (मराठी)" },
  { value: "Hindi", label: "🇮🇳 Hindi (हिंदी)" },
  { value: "Gujarati", label: "🇮🇳 Gujarati (ગુજરાતી)" },
  { value: "Kannada", label: "🇮🇳 Kannada (ಕನ್ನಡ)" },
  { value: "Telugu", label: "🇮🇳 Telugu (తెలుగు)" },
  { value: "Tamil", label: "🇮🇳 Tamil (தமிழ்)" },
  { value: "Bengali", label: "🇮🇳 Bengali (বাংলা)" },
  { value: "Punjabi", label: "🇮🇳 Punjabi (ਪੰਜਾਬੀ)" },
] as const;

export default function AIContentForm() {
  const [form, setForm] =
    useState<AIContentRequest>(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<AIContentResponse | null>(null);

  function updateField<K extends keyof AIContentRequest>(
    key: K,
    value: AIContentRequest[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleGenerate() {
    console.log("Generate Button Clicked");
    console.log("Selected Language:", form.language);

    try {
      setLoading(true);

      const response = await fetch("/api/ai/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const text = await response.text();

      console.log(text);

      if (!response.ok) {
        throw new Error(text);
      }

      const data = JSON.parse(text);

      setResult(data.data);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unknown Error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl rounded-xl border border-zinc-800 bg-zinc-900 p-8">

      {/* FORM */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Platform */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Platform
          </label>

          <select
            value={form.platform}
            onChange={(e) =>
              updateField(
                "platform",
                e.target.value as AIContentRequest["platform"]
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="Google Business">
              Google Business
            </option>

            <option value="Facebook">
              Facebook
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

            <option value="X">
              X
            </option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Category
          </label>

          <input
            value={form.category}
            onChange={(e) =>
              updateField(
                "category",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Battery Replacement"
          />
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Language
          </label>

          <select
            value={form.language}
            onChange={(e) =>
              updateField(
                "language",
                e.target.value as AIContentRequest["language"]
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            {LANGUAGES.map((language) => (
              <option
                key={language.value}
                value={language.value}
              >
                {language.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Location
          </label>

          <input
            value={form.location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Wakad"
          />
        </div>

        {/* Offer */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Offer
          </label>

          <input
            value={form.offer}
            onChange={(e) =>
              updateField(
                "offer",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Starting ₹1499"
          />
        </div>

      </div>

      {/* Keywords */}
      <div className="mt-6">

        <label className="mb-2 block text-sm text-zinc-400">
          Keywords
        </label>

        <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          placeholder="Laptop Repair Wakad, Battery Replacement Pune"
          onChange={(e) =>
            updateField(
              "keywords",
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
        />

      </div>

      {/* Generate Button */}
      <div className="mt-8">

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate AI Content"}
        </button>

      </div>

      {/* Generated Result */}
      {result && (
        <div className="mt-10">

          <GeneratedContent
            data={result}
          />

        </div>
      )}

    </div>
  );
}