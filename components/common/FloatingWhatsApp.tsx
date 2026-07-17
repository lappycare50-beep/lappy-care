"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PHONE = "919595057006";

const MESSAGE =
  "Hello Lappy Care, I need help regarding my laptop.";

export default function FloatingWhatsApp() {

  const [showBubble, setShowBubble] =
    useState(false);

  useEffect(() => {

    const showTimer = setTimeout(() => {
      setShowBubble(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setShowBubble(false);
    }, 8000);

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

    <div className="fixed bottom-6 right-6 z-[9999]">

      {/* ==========================================
          Welcome Bubble
      ========================================== */}

      {showBubble && (

        <div
          className="absolute bottom-20 right-0 w-80 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-2xl"
          style={{
            animation:
              "fadeInUp .45s ease",
          }}
        >

          {/* Header */}

          <div className="flex items-center justify-between bg-[#25D366] px-5 py-4 text-white">

            <div>

              <h3 className="text-lg font-bold">

                👋 Welcome

              </h3>

              <p className="text-xs opacity-90">

                Lappy Care Support

              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowBubble(false)
              }
              className="text-xl transition hover:rotate-90"
            >

              ✕

            </button>

          </div>

          {/* Body */}

          <div className="space-y-4 p-5">

            <p className="text-sm font-semibold text-gray-800">

              Need help with your laptop?

            </p>

            <div className="space-y-2 text-sm text-gray-600">

              <div>
                🔧 Laptop Repair
              </div>

              <div>
                💻 Refurbished Laptops
              </div>

              <div>
                ⚡ Same Day Service
              </div>

              <div>
                💾 Data Recovery
              </div>

            </div>

            {/* Online */}

            <div className="rounded-xl bg-green-50 p-3">

              <div className="flex items-center gap-2">

                <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

                <span className="font-semibold text-green-700">

                  Online Now

                </span>

              </div>

              <p className="mt-1 text-xs text-green-600">

                Usually replies in 2 minutes

              </p>

            </div>

            {/* Chat Button */}

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#1fb858]"
            >

              💬 Chat on WhatsApp

            </Link>

          </div>

        </div>

      )}

      {/* ==========================================
          Pulse Ring
      ========================================== */}

      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />

      {/* ==========================================
          Floating Button
      ========================================== */}

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-3xl shadow-2xl transition duration-300 hover:scale-110 active:scale-95"
      >

        💬

      </Link>

    </div>

  );

}