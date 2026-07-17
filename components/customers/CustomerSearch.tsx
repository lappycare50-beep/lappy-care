"use client";

import { Search, X } from "lucide-react";

interface CustomerSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function CustomerSearch({
  value,
  onChange,
  onClear,
}: CustomerSearchProps) {
  return (
    <div className="flex w-full items-center gap-3">

      <div className="relative flex-1">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={value}
          placeholder="Search by Customer ID, Name, Mobile, Email or Company..."
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-gray-700
            bg-[#111111]
            py-2.5
            pl-10
            pr-10
            text-white
            placeholder:text-gray-500
            outline-none
            transition
            focus:border-yellow-500
          "
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-red-500
            "
          >
            <X size={18} />
          </button>
        )}
      </div>

    </div>
  );
}