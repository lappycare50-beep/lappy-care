"use client";

import { X } from "lucide-react";

import QuickActions from "./QuickActions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WhatsAppBubble({
  isOpen,
  onClose,
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        absolute

        bottom-[68px]
        right-0

        w-[340px]
        max-w-[calc(100vw-24px)]

        overflow-hidden
        rounded-2xl

        border
        border-green-200

        bg-white

        shadow-[0_12px_40px_rgba(0,0,0,0.18)]

        animate-in
        fade-in
        slide-in-from-bottom-2
        duration-200

        max-sm:right-0
        max-sm:w-[calc(100vw-24px)]
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between

          bg-[#25D366]

          px-4
          py-3
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-white
                shadow-sm
              "
            />

            <h2 className="text-sm font-bold text-white">
              Lappy Care Support
            </h2>
          </div>

          <p className="mt-0.5 text-[11px] text-white/90">
            Usually replies in 2 minutes
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close WhatsApp popup"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center

            rounded-full

            text-white

            transition

            hover:bg-white/20
            active:scale-95
          "
        >
          <X size={19} />
        </button>
      </div>

      {/* Quick Actions */}

      <div className="p-3">
        <QuickActions />
      </div>
    </div>
  );
}