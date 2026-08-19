"use client";

import { Phone } from "lucide-react";

export default function SupportCard() {
  return (
    <div
      className="
        rounded-xl
        border
        border-green-100
        bg-green-50
        p-3
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            text-white
            text-lg
          "
        >
          👨‍💻
        </div>

        <div className="flex-1">

          <h3 className="text-sm font-semibold text-gray-900">
            Laptop Support
          </h3>

          <p className="mt-1 text-xs text-gray-600">
            Repairs • Upgrades • Refurbished Laptops
          </p>

        </div>

      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-700">

        <Phone
          size={14}
          className="text-[#25D366]"
        />

        <span>
          +91 95950 57006
        </span>

      </div>

    </div>
  );
}