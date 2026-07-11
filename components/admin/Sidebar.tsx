"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Laptop,
  Wrench,
  Star,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Laptop,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: Wrench,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Contact",
    href: "/admin/contact",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-yellow-500/20 bg-[#111111]">

      <div className="border-b border-yellow-500/20 p-6">

        <h1 className="text-3xl font-bold text-white">
          Lappy<span className="text-yellow-400">Care</span>
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-5">

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 transition hover:bg-yellow-400 hover:text-black"
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-yellow-500/20 p-5">

        <button className="flex w-full items-center gap-4 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600">
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}