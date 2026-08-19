"use client";

import { Platform } from "@/types/marketing";

interface Props {
  value: Platform;
  onChange: (value: Platform) => void;
}

const platforms: Platform[] = [
  "Google Business",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "X",
];

export default function PlatformSelector({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value as Platform)
      }
      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
    >
      {platforms.map((platform) => (
        <option key={platform} value={platform}>
          {platform}
        </option>
      ))}
    </select>
  );
}