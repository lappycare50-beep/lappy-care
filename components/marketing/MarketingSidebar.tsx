"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";

import {
  LayoutDashboard,
  Sparkles,
  FileText,
  CalendarDays,
  Megaphone,
  Share2,
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
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-yellow-400">
          Marketing Hub
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
          AI Marketing Suite
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                active
                  ? "bg-yellow-500 text-black font-semibold"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}