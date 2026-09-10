"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Building2,
  LayoutDashboard,
  Sparkles,
  FileText,
  CalendarDays,
  Megaphone,
  Share2,
  MessageSquare,
  MessageCircle,
  BarChart3,
  Settings,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const menu: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin/marketing",
    icon: LayoutDashboard,
  },
  {
    title: "AI Content",
    href: "/admin/marketing/ai-content",
    icon: Sparkles,
  },
  {
    title: "Posts",
    href: "/admin/marketing/posts",
    icon: FileText,
  },
  {
    title: "Calendar",
    href: "/admin/marketing/calendar",
    icon: CalendarDays,
  },
  {
    title: "Campaigns",
    href: "/admin/marketing/campaigns",
    icon: Megaphone,
  },
  {
    title: "Social Accounts",
    href: "/admin/marketing/social-accounts",
    icon: Share2,
  },
  {
    title: "Reviews",
    href: "/admin/marketing/reviews",
    icon: MessageSquare,
  },
  {
    title: "WhatsApp",
    href: "/admin/marketing/whatsapp",
    icon: MessageCircle,
  },
  {
    title: "Analytics",
    href: "/admin/marketing/analytics",
    icon: BarChart3,
  },
  {
    title: "Business Profile",
    href: "/admin/marketing/business-profile",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/admin/marketing/settings",
    icon: Settings,
  },
];

export default function MarketingSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* BRAND */}
      <div className="border-b border-zinc-800 px-5 py-5">
        <h2 className="text-xl font-bold text-yellow-400">
          Marketing Hub
        </h2>

        <p className="mt-1 text-xs text-zinc-400">
          AI Marketing Suite
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all",
                active
                  ? "bg-yellow-500 font-semibold text-black"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white",
              ].join(" ")}
            >
              <Icon size={19} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-zinc-800 px-4 py-4">
        <p className="text-xs text-zinc-600">
          Lappy Care Marketing Hub
        </p>
      </div>
    </aside>
  );
}