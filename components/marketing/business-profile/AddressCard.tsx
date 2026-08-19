"use client";

import { BusinessProfile } from "@/types/businessProfile";

interface Props {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
}

export default function AddressCard({
  profile,
  onChange,
}: Props) {
  function updateAddress(
    key: keyof BusinessProfile["address"],
    value: string
  ) {
    onChange({
      ...profile,
      address: {
        ...profile.address,
        [key]: value,
      },
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-bold text-white">
        Business Address
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Address used by AI-generated content.
      </p>

      <div className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Address Line 1
          </label>

          <textarea
            rows={2}
            value={profile.address.addressLine1}
            onChange={(e) =>
              updateAddress("addressLine1", e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Address Line 2
          </label>

          <input
            type="text"
            value={profile.address.addressLine2 ?? ""}
            onChange={(e) =>
              updateAddress("addressLine2", e.target.value)
            }
            placeholder="Near Croma"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              City
            </label>

            <input
              type="text"
              value={profile.address.city}
              onChange={(e) =>
                updateAddress("city", e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              State
            </label>

            <input
              type="text"
              value={profile.address.state}
              onChange={(e) =>
                updateAddress("state", e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Country
            </label>

            <input
              type="text"
              value={profile.address.country}
              onChange={(e) =>
                updateAddress("country", e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Pincode
            </label>

            <input
              type="text"
              value={profile.address.pincode}
              onChange={(e) =>
                updateAddress("pincode", e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

        </div>

      </div>
    </div>
  );
}