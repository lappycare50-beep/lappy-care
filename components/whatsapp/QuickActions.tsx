"use client";

import Link from "next/link";

const PHONE = "919595057006";

export default function QuickActions() {
  const whatsappUrl = `https://wa.me/${PHONE}`;

  return (
    <div className="space-y-3">
      {/* ==========================================
          Section Title
      ========================================== */}

      <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">
        Quick Actions
      </h3>

      {/* ==========================================
          Buttons
      ========================================== */}

      <div className="grid grid-cols-2 gap-3">

        {/* Book Repair */}

        <Link
          href="/#booking"
          className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
        >
          <span className="text-3xl">
            🔧
          </span>

          <span className="mt-2 text-sm font-semibold text-gray-800">
            Book Repair
          </span>
        </Link>

        {/* Track Repair */}

        <Link
          href="/track"
          className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
        >
          <span className="text-3xl">
            📦
          </span>

          <span className="mt-2 text-sm font-semibold text-gray-800">
            Track Repair
          </span>
        </Link>

        {/* Call */}

        <a
          href="tel:+919595057006"
          className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-yellow-500 hover:shadow-lg"
        >
          <span className="text-3xl">
            📞
          </span>

          <span className="mt-2 text-sm font-semibold text-gray-800">
            Call Now
          </span>
        </a>

        {/* WhatsApp */}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
        >
          <span className="text-3xl">
            💬
          </span>

          <span className="mt-2 text-sm font-semibold text-gray-800">
            WhatsApp
          </span>
        </a>

      </div>
    </div>
  );
}