"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  hashtags: string[];
}

export default function HashtagsCard({
  hashtags,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        hashtags.join(" ")
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          Hashtags
        </h2>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-yellow-500 hover:text-yellow-400"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy All
            </>
          )}
        </button>

      </div>

      {hashtags.length === 0 ? (
        <p className="text-zinc-500">
          No hashtags available.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">

          {hashtags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-yellow-400"
            >
              {tag}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}