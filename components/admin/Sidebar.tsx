"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  BarChart3,
  Globe,
  LayoutDashboard,
  Laptop,
  LogOut,
  Menu,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  Wrench,
  X,
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
  const pathname = usePathname();

  const { logoutUser } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  async function handleLogout() {
    try {
      await logoutUser();

      setMobileOpen(false);

      router.replace("/login");
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

  function isActive(href: string) {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* ==================================================
          DESKTOP / TABLET SIDEBAR
      ================================================== */}

      <aside
        className="
          hidden
          h-screen
          shrink-0
          flex-col
          border-r
          border-yellow-500/20
          bg-[#111111]
          md:flex
          md:w-20
          lg:w-72
        "
      >
        {/* Header */}

        <div
          className="
            border-b
            border-yellow-500/20
            p-4
            lg:p-6
          "
        >
          <h1
            className="
              text-center
              text-2xl
              font-bold
              text-white
              lg:text-left
              lg:text-3xl
            "
          >
            <span className="lg:hidden">
              LC
            </span>

            <span className="hidden lg:inline">
              Lappy
              <span className="text-yellow-400">
                Care
              </span>
            </span>
          </h1>

          <p
            className="
              mt-1
              hidden
              text-sm
              text-gray-400
              lg:block
            "
          >
            Admin Panel
          </p>
        </div>

        {/* Navigation */}

        <nav
          className="
            flex-1
            space-y-2
            overflow-y-auto
            p-3
            lg:p-5
          "
        >
          {menus.map((item) => {
            const Icon = item.icon;
            const active = isActive(
              item.href
            );

            return (
              <Link
                key={item.title}
                href={item.href}
                title={item.title}
                className={`
                  group
                  flex
                  items-center
                  justify-center
                  gap-4
                  rounded-xl
                  px-3
                  py-3
                  transition
                  lg:justify-start
                  lg:px-4

                  ${
                    active
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-yellow-400 hover:text-black"
                  }
                `}
              >
                <Icon
                  size={20}
                  className="shrink-0"
                />

                <span className="hidden lg:inline">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}

        <div
          className="
            border-t
            border-yellow-500/20
            p-3
            lg:p-5
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-4
              rounded-xl
              bg-red-500
              px-3
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-600
              lg:justify-start
              lg:px-4
            "
          >
            <LogOut
              size={20}
              className="shrink-0"
            />

            <span className="hidden lg:inline">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* ==================================================
          MOBILE MENU BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        aria-label="Open admin menu"
        className="
          fixed
          left-4
          top-4
          z-[100]
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-yellow-500/20
          bg-[#111111]
          text-white
          shadow-lg
          transition
          hover:bg-yellow-400
          hover:text-black
          md:hidden
        "
      >
        <Menu size={22} />
      </button>

      {/* ==================================================
          MOBILE BACKDROP
      ================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={closeMobileMenu}
          className="
            fixed
            inset-0
            z-[110]
            bg-black/70
            backdrop-blur-sm
            md:hidden
          "
        />
      )}

      {/* ==================================================
          MOBILE DRAWER
      ================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-[120]
          flex
          w-[280px]
          flex-col
          border-r
          border-yellow-500/20
          bg-[#111111]
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          md:hidden

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile Header */}

        <div className="flex items-center justify-between border-b border-yellow-500/20 p-5">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Lappy
              <span className="text-yellow-400">
                Care
              </span>
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Admin Panel
            </p>
          </div>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close admin menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-red-500
              text-white
              transition
              hover:bg-red-600
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {menus.map((item) => {
            const Icon = item.icon;
            const active = isActive(
              item.href
            );

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={closeMobileMenu}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3.5
                  transition

                  ${
                    active
                      ? "bg-yellow-400 font-semibold text-black"
                      : "text-gray-300 hover:bg-yellow-400 hover:text-black"
                  }
                `}
              >
                <Icon
                  size={20}
                  className="shrink-0"
                />

                <span>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Logout */}

        <div className="border-t border-yellow-500/20 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-xl
              bg-red-500
              px-4
              py-3.5
              font-semibold
              text-white
              transition
              hover:bg-red-600
            "
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}