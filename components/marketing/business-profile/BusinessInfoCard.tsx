"use client";

import { BusinessProfile } from "@/types/businessProfile";

interface Props {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
}

export default function BusinessInfoCard({
  profile,
  onChange,
}: Props) {
  function update<K extends keyof BusinessProfile>(
    key: K,
    value: BusinessProfile[K]
  ) {
    onChange({
      ...profile,
      [key]: value,
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Business Information
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Basic details about your business.
      </p>

      <div className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Business Name
          </label>

          <input
            type="text"
            value={profile.businessName}
            onChange={(e) =>
              update("businessName", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Lappy Care"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Tagline
          </label>

          <input
            type="text"
            value={profile.tagline}
            onChange={(e) =>
              update("tagline", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Laptop Repair & Refurbished Laptop Experts"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Description
          </label>

          <textarea
            rows={5}
            value={profile.description}
            onChange={(e) =>
              update("description", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Describe your business..."
          />
        </div>

      </div>

    </div>
  );
}