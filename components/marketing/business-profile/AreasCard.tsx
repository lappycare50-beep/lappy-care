"use client";

import { useState } from "react";

import { BusinessProfile } from "@/types/businessProfile";

interface Props {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
}

export default function AreasCard({
  profile,
  onChange,
}: Props) {
  const [area, setArea] = useState("");

  function addArea() {
    const value = area.trim();

    if (!value) return;

    if (profile.serviceAreas.includes(value)) {
      setArea("");
      return;
    }

    onChange({
      ...profile,
      serviceAreas: [...profile.serviceAreas, value],
    });

    setArea("");
  }

  function removeArea(index: number) {
    onChange({
      ...profile,
      serviceAreas: profile.serviceAreas.filter(
        (_, i) => i !== index
      ),
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Service Areas
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Areas where your business provides services.
      </p>

      <div className="mt-6 flex gap-3">

        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Wakad"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addArea();
            }
          }}
        />

        <button
          type="button"
          onClick={addArea}
          className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Add
        </button>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        {profile.serviceAreas.length === 0 && (
          <p className="text-sm text-zinc-500">
            No service areas added yet.
          </p>
        )}

        {profile.serviceAreas.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2"
          >
            <span className="text-white">
              {item}
            </span>

            <button
              type="button"
              onClick={() => removeArea(index)}
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