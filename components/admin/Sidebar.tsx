"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  Laptop,
  Wrench,
  Receipt,
  Users,
  UserCog,
  Package,
  ShoppingCart,
  Globe,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import type { ComponentType } from "react";

import { useAuth } from "@/context/AuthContext";

import type {
  UserRole,
} from "@/types/user";

// =====================================================
// MENU TYPE
// =====================================================

type MenuItem = {
  title: string;
  href: string;
  icon: ComponentType<{
    size?: number;
    className?: string;
  }>;
  roles: UserRole[];
};

// =====================================================
// MENU
// =====================================================

const menus: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    title: "Products",
    href: "/admin/products",
    icon: Laptop,
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    title: "Repairs",
    href: "/admin/repairs",
    icon: Wrench,
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    title: "Invoices",
    href: "/admin/invoices",
    icon: Receipt,
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Package,
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    title: "Sales",
    href: "/admin/sales",
    icon: ShoppingCart,
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    title: "Website Requests",
    href: "/admin/website-requests",
    icon: Globe,
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    title: "Staff",
    href: "/admin/staff",
    icon: UserCog,
    roles: [
      "admin",
    ],
  },

  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: [
      "admin",
    ],
  },
];

// =====================================================
// SIDEBAR
// =====================================================

export default function Sidebar() {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const {
    logoutUser,
    role,
    appUser,
  } = useAuth();

  // ===================================================
  // LOGOUT
  // ===================================================

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

  // ===================================================
  // ACTIVE MENU
  // ===================================================

  function isActive(
    href: string
  ) {
    if (
      href ===
      "/admin/dashboard"
    ) {
      return (
        pathname ===
        href
      );
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  }

  // ===================================================
  // ROLE LABEL
  // ===================================================

  function getRoleLabel() {
    switch (role) {
      case "admin":
        return "Admin";

      case "manager":
        return "Manager";

      case "technician":
        return "Technician";

      default:
        return "Loading";
    }
  }

  // ===================================================
  // VISIBLE MENUS
  // ===================================================

  const visibleMenus =
    role
      ? menus.filter(
          (item) =>
            item.roles.includes(
              role
            )
        )
      : [];

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-yellow-500/20 bg-[#111111]">

      {/* =================================================
          HEADER
      ================================================= */}

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

        {/* User Info */}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-800 bg-black/50 px-3 py-2">

          <div className="min-w-0">

            <p className="truncate text-xs text-gray-500">
              Signed in as
            </p>

            <p className="truncate text-sm font-semibold text-white">
              {appUser?.name ||
                "User"}
            </p>

          </div>

          <span
            className={`
              rounded-full
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              ${
                role ===
                "admin"
                  ? "bg-red-500/10 text-red-400"
                  : role ===
                    "manager"
                  ? "bg-purple-500/10 text-purple-400"
                  : role ===
                    "technician"
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-gray-500/10 text-gray-500"
              }
            `}
          >
            {getRoleLabel()}
          </span>

        </div>

      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-5">

        {visibleMenus.map(
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
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition
                  ${
                    isActive(
                      item.href
                    )
                      ? "bg-yellow-400 font-semibold text-black"
                      : "text-gray-300 hover:bg-yellow-400 hover:text-black"
                  }
                `}
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

      {/* =================================================
          LOGOUT
      ================================================= */}

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