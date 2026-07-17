"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export default function BookingRequestSearch({
  value,
  onChange,
  onClear,
}: Props) {

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
          placeholder="Search by Request ID, Customer Name, Mobile, Brand..."
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-700
            bg-[#111111]
            py-3
            pl-10
            pr-10
            text-white
            placeholder:text-gray-500
            outline-none
            transition
            focus:border-yellow-400
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
              hover:text-red-400
            "
          >
            <X size={18} />
          </button>
        )}

      </div>

    </div>

  );

}