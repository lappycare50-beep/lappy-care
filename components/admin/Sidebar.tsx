"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Laptop,
  Wrench,
  Receipt,
  Users,
  Package,
  ShoppingCart,
  Globe,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

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
    title: "Repairs",
    href: "/admin/repairs",
    icon: Wrench,
  },
  {
    title: "Invoices",
    href: "/admin/invoices",
    icon: Receipt,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Sales",
    href: "/admin/sales",
    icon: ShoppingCart,
  },
  {
    title: "Website Requests",
    href: "/admin/website-requests",
    icon: Globe,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const router = useRouter();

  const { logoutUser } =
    useAuth();

  async function handleLogout() {
    try {
      await logoutUser();

      router.replace(
        "/login"
      );
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      alert(
        "Logout failed. Please try again."
      );
    }
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-yellow-500/20 bg-[#111111]">

      {/* Header */}

      <div className="border-b border-yellow-500/20 p-6">

        <h1 className="text-3xl font-bold text-white">
          Lappy
          <span className="text-yellow-400">
            Care
          </span>
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Admin Panel
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-5">

        {menus.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <Link
                key={
                  item.title
                }
                href={
                  item.href
                }
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 transition hover:bg-yellow-400 hover:text-black"
              >

                <Icon
                  size={20}
                />

                <span>
                  {
                    item.title
                  }
                </span>

              </Link>
            );
          }
        )}

      </nav>

      {/* Logout */}

      <div className="border-t border-yellow-500/20 p-5">

        <button
          type="button"
          onClick={
            handleLogout
          }
          className="flex w-full items-center gap-4 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >

          <LogOut
            size={20}
          />

          Logout

        </button>

      </div>

    </aside>
  );
}