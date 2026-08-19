"use client";

import Link from "next/link";

import {
  CalendarPlus,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";

const PHONE = "919595057006";

const MESSAGE =
  "Hello Lappy Care, I need help regarding my laptop.";

const actions = [
  {
    title: "WhatsApp",
    href: `https://wa.me/${PHONE}?text=${encodeURIComponent(
      MESSAGE
    )}`,
    icon: MessageCircle,
    className:
      "bg-[#25D366] hover:bg-[#1EBE5D] text-white",
    target: "_blank",
  },
  {
    title: "Call",
    href: `tel:+${PHONE}`,
    icon: Phone,
    className:
      "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    title: "Book Repair",
    href: "/book-repair",
    icon: CalendarPlus,
    className:
      "bg-yellow-400 hover:bg-yellow-500 text-black",
  },
  {
    title: "Track Repair",
    href: "/track",
    icon: Search,
    className:
      "bg-zinc-800 hover:bg-black text-white",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            href={action.href}
            target={action.target}
            rel={
              action.target === "_blank"
                ? "noopener noreferrer"
                : undefined
            }
            className={`
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-3
              text-sm
              font-semibold
              transition-all
              duration-200
              hover:scale-[1.02]
              active:scale-95
              ${action.className}
            `}
          >
            <Icon size={18} />

            <span>{action.title}</span>
          </Link>
        );
      })}
    </div>
  );
}