"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WhatsAppBubble from "./WhatsAppBubble";

const PHONE = "919595057006";

const MESSAGE =
  "Hello Lappy Care, I need help regarding my laptop.";

export default function FloatingWhatsApp() {

  const [showBubble, setShowBubble] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  useEffect(() => {

    // ==========================
    // Show / Hide Bubble
    // ==========================

    const showTimer = setTimeout(() => {

      setShowBubble(true);

    }, 1000);

    const hideTimer = setTimeout(() => {

      setShowBubble(false);

    }, 8000);

    // ==========================
    // Business Hours
    // Monday - Saturday
    // 10 AM - 8 PM
    // ==========================

    const now = new Date();

    const day = now.getDay();

    const hour = now.getHours();

    const open =
      day >= 1 &&
      day <= 6 &&
      hour >= 10 &&
      hour < 20;

    setIsOpen(open);

    return () => {

      clearTimeout(showTimer);

      clearTimeout(hideTimer);

    };

  }, []);

  const whatsappUrl =
    `https://wa.me/${PHONE}?text=${encodeURIComponent(
      MESSAGE
    )}`;

  return (

    <div
      className="fixed bottom-6 right-6"
      style={{
        zIndex: 999999,
      }}
    >

      {/* ==========================
          Welcome Bubble
      ========================== */}

      {showBubble && (

        <WhatsAppBubble
          isOpen={isOpen}
          onClose={() =>
            setShowBubble(false)
          }
        />

      )}

      {/* ==========================
          Pulse Ring
      ========================== */}

      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />

      {/* ==========================
          Floating Button
      ========================== */}

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-3xl
          shadow-2xl
          transition
          duration-300
          hover:scale-110
          active:scale-95
        "
      >

        💬

      </Link>

    </div>

  );

}