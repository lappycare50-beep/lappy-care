"use client";

import Link from "next/link";

import Greeting from "./Greeting";
import BusinessStatus from "./BusinessStatus";
import SupportCard from "./SupportCard";
import QuickActions from "./QuickActions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PHONE = "919595057006";

const MESSAGE =
  "Hello Lappy Care, I need help regarding my laptop.";

export default function WhatsAppBubble({
  isOpen,
  onClose,
}: Props) {

  const whatsappUrl =
    `https://wa.me/${PHONE}?text=${encodeURIComponent(
      MESSAGE
    )}`;

  return (

    <div
      className="
        absolute
        bottom-20
        right-0
        w-[360px]
        max-w-[calc(100vw-32px)]
        overflow-hidden
        rounded-3xl
        border
        border-green-200
        bg-white
        shadow-2xl
      "
      style={{
        animation: "fadeInUp .4s ease",
      }}
    >

      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex items-center justify-between bg-[#25D366] px-6 py-4 text-white">

        <div>

          <h2 className="text-lg font-bold">

            Lappy Care

          </h2>

          <p className="text-xs opacity-90">

            Laptop Repair & Service

          </p>

        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-xl transition hover:scale-125"
        >

          ✕

        </button>

      </div>

      {/* ==========================================
          Body
      ========================================== */}

      <div className="space-y-5 p-5">

        <Greeting />

        <BusinessStatus />

        <SupportCard
          isOpen={isOpen}
        />

        <QuickActions />

      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <div className="border-t bg-gray-50 p-5">

        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#25D366]
            px-5
            py-3
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-[#1EBE5D]
          "
        >

          💬 Chat on WhatsApp

        </Link>

      </div>

    </div>

  );

}