"use client";

import { useState } from "react";

import { BusinessProfile } from "@/types/businessProfile";

interface Props {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
}

export default function ServicesCard({
  profile,
  onChange,
}: Props) {
  const [service, setService] = useState("");

  function addService() {
    const value = service.trim();

    if (!value) return;

    if (profile.services.includes(value)) {
      setService("");
      return;
    }

    onChange({
      ...profile,
      services: [...profile.services, value],
    });

    setService("");
  }

  function removeService(index: number) {
    onChange({
      ...profile,
      services: profile.services.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Services
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Services used by the AI while generating marketing content.
      </p>

      <div className="mt-6 flex gap-3">

        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Laptop Repair"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <button
          type="button"
          onClick={addService}
          className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Add
        </button>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        {profile.services.length === 0 && (
          <p className="text-sm text-zinc-500">
            No services added yet.
          </p>
        )}

        {profile.services.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2"
          >
            <span className="text-white">
              {item}
            </span>

            <button
              type="button"
              onClick={() => removeService(index)}
              className="text-red-400 transition hover:text-red-300"
            >
              ✕
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}