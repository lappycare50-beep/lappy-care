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

      <div className="grid gap-6 md:grid-cols-2">

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
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
            <option>Google Business</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>X</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Category
          </label>

          <input
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            placeholder="Battery Replacement"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Location
          </label>

          <input
            value={form.location}
            onChange={(e) =>
              updateField("location", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            placeholder="Wakad"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Offer
          </label>

          <input
            value={form.offer}
            onChange={(e) =>
              updateField("offer", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            placeholder="Starting ₹1499"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm text-zinc-400">
          Keywords
        </label>

        <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
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

      <div className="mt-8">

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate AI Content"}
        </button>

      </div>

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