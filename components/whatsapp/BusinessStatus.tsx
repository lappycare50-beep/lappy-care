"use client";

import { Clock3 } from "lucide-react";

export default function BusinessStatus() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-green-100
        bg-green-50
        px-3
        py-2
      "
    >
      <div className="flex items-center gap-2">

        <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

        <div>

          <p className="text-sm font-semibold text-gray-900">
            Online
          </p>

          <p className="text-[11px] text-gray-500">
            Usually replies in 2 min
          </p>

        </div>

      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500">

        <Clock3 size={14} />

        <span>9 AM - 9 PM</span>

      </div>

    </div>
  );
}