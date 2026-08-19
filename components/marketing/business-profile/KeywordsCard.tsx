"use client";

import { useState } from "react";

import { BusinessProfile } from "@/types/businessProfile";

interface Props {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
}

export default function KeywordsCard({
  profile,
  onChange,
}: Props) {
  const [keyword, setKeyword] = useState("");

  function addKeyword() {
    const value = keyword.trim();

    if (!value) return;

    if (profile.keywords.includes(value)) {
      setKeyword("");
      return;
    }

    onChange({
      ...profile,
      keywords: [...profile.keywords, value],
    });

    setKeyword("");
  }

  function removeKeyword(index: number) {
    onChange({
      ...profile,
      keywords: profile.keywords.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-bold text-white">
        SEO Keywords
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        These keywords will be used by AI while generating SEO-friendly content.
      </p>

      <div className="mt-6 flex gap-3">

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Laptop Repair Wakad"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addKeyword();
            }
          }}
        />

        <button
          type="button"
          onClick={addKeyword}
          className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Add
        </button>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        {profile.keywords.length === 0 && (
          <p className="text-sm text-zinc-500">
            No keywords added yet.
          </p>
        )}

        {profile.keywords.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2"
          >
            <span className="text-white">
              {item}
            </span>

            <button
              type="button"
              onClick={() => removeKeyword(index)}
              className="text-red-400 transition hover:text-red-300"
              aria-label={`Remove ${item}`}
            >
              ✕
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}