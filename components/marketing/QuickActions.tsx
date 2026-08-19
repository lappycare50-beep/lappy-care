"use client";

import { Sparkles, CalendarPlus, ImagePlus } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-3 font-medium text-black">
          <Sparkles size={18} />
          Generate AI Post
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-3 text-white">
          <CalendarPlus size={18} />
          Schedule Post
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-3 text-white">
          <ImagePlus size={18} />
          Upload Media
        </button>
      </div>
    </div>
  );
}