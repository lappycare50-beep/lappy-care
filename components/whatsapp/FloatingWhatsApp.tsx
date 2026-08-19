"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import WhatsAppBubble from "./WhatsAppBubble";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        fixed
        bottom-4
        right-4
        z-[999]

        sm:bottom-5
        sm:right-5
      "
    >
      <WhatsAppBubble
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <button
        type="button"
        aria-label={
          isOpen
            ? "Close WhatsApp"
            : "Open WhatsApp"
        }
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
        className="
          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-full

          bg-[#25D366]
          text-white

          shadow-[0_8px_30px_rgba(37,211,102,0.35)]

          transition-all
          duration-200

          hover:scale-105
          hover:bg-[#1EBE5D]

          active:scale-95

          sm:h-auto
          sm:w-auto
          sm:gap-2
          sm:px-5
          sm:py-3
        "
      >
        {isOpen ? (
          <X
            size={23}
            strokeWidth={2.5}
          />
        ) : (
          <MessageCircle
            size={25}
            strokeWidth={2.4}
            className="animate-pulse"
          />
        )}

        <div className="hidden text-left sm:block">
          <p className="text-sm font-bold leading-4">
            Chat with Expert
          </p>

          <p className="mt-0.5 text-[10px] leading-3 text-white/90">
            Lappy Care Support
          </p>
        </div>
      </button>
    </div>
  );
}