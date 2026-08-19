"use client";

import { BusinessProfile } from "@/types/businessProfile";

interface Props {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
}

export default function ContactCard({
  profile,
  onChange,
}: Props) {
  function updateContact(
    key: keyof BusinessProfile["contact"],
    value: string
  ) {
    onChange({
      ...profile,
      contact: {
        ...profile.contact,
        [key]: value,
      },
    });
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Contact Information
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Contact details used by AI-generated content.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Phone Number
          </label>

          <input
            type="text"
            value={profile.contact.phone}
            onChange={(e) =>
              updateContact("phone", e.target.value)
            }
            placeholder="9595057006"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            WhatsApp Number
          </label>

          <input
            type="text"
            value={profile.contact.whatsapp}
            onChange={(e) =>
              updateContact("whatsapp", e.target.value)
            }
            placeholder="9595057006"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Email Address
          </label>

          <input
            type="email"
            value={profile.contact.email}
            onChange={(e) =>
              updateContact("email", e.target.value)
            }
            placeholder="info@lappycarepune.in"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Website
          </label>

          <input
            type="url"
            value={profile.contact.website}
            onChange={(e) =>
              updateContact("website", e.target.value)
            }
            placeholder="https://lappycarepune.in"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

      </div>

    </div>
  );
}