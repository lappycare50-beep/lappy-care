"use client";

import {
  useEffect,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";

import {
  useAuth,
} from "@/context/AuthContext";

import type {
  UserRole,
} from "@/types/user";

// =====================================================
// ROLE ROUTE PERMISSIONS
// =====================================================

const routePermissions: Array<{
  prefix: string;
  roles: UserRole[];
}> = [
  {
    prefix: "/admin/dashboard",
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    prefix: "/admin/products",
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    prefix: "/admin/repairs",
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    prefix: "/admin/invoices",
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    prefix: "/admin/customers",
    roles: [
      "admin",
      "manager",
      "technician",
    ],
  },

  {
    prefix: "/admin/inventory",
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    prefix: "/admin/sales",
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    prefix: "/admin/website-requests",
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    prefix: "/admin/reports",
    roles: [
      "admin",
      "manager",
    ],
  },

  {
    prefix: "/admin/staff",
    roles: [
      "admin",
    ],
  },

  {
    prefix: "/admin/settings",
    roles: [
      "admin",
    ],
  },

  {
    prefix: "/admin/marketing",
    roles: [
      "admin",
      "manager",
    ],
  },
];

// =====================================================
// FIND PERMISSION
// =====================================================

function getRoutePermission(
  pathname: string
) {
  return routePermissions
    .filter(
      (item) =>
        pathname === item.prefix ||
        pathname.startsWith(
          `${item.prefix}/`
        )
    )
    .sort(
      (a, b) =>
        b.prefix.length -
        a.prefix.length
    )[0];
}

// =====================================================
// ADMIN LAYOUT
// =====================================================

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const {
    user,
    role,
    loading,
    roleLoading,
  } = useAuth();

  // ===================================================
  // REDIRECT /admin
  // ===================================================

  useEffect(() => {
    if (
      loading
    ) {
      return;
    }

    if (
      !user
    ) {
      router.replace(
        "/login"
      );

      return;
    }

    if (
      pathname === "/admin"
    ) {
      router.replace(
        "/admin/dashboard"
      );
    }
  }, [
    loading,
    user,
    pathname,
    router,
  ]);

  // ===================================================
  // ROLE PROTECTION
  // ===================================================

  useEffect(() => {
    if (
      loading ||
      roleLoading ||
      !user ||
      !role
    ) {
      return;
    }

    const permission =
      getRoutePermission(
        pathname
      );

    if (!permission) {
      return;
    }

    if (
      permission.roles.includes(
        role
      )
    ) {
      return;
    }

    console.warn(
      "Unauthorized admin route:",
      {
        pathname,
        role,
        allowedRoles:
          permission.roles,
      }
    );

    router.replace(
      "/admin/dashboard"
    );
  }, [
    loading,
    roleLoading,
    user,
    role,
    pathname,
    router,
  ]);

  // ===================================================
  // AUTH LOADING
  // ===================================================

  if (
    loading
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-yellow-400" />

          <p className="mt-4 text-sm text-zinc-400">
            Loading Admin Panel...
          </p>

        </div>
      </div>
    );
  }

  // ===================================================
  // NOT AUTHENTICATED
  //
  // Do not render a permanent blank screen.
  // Redirect is handled by the effect above.
  // ===================================================

  if (
    !user
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-yellow-400" />

          <p className="mt-4 text-sm text-zinc-400">
            Redirecting to login...
          </p>

        </div>
      </div>
    );
  }

  // ===================================================
  // MAIN ADMIN APP
  // ===================================================

  return (
    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <main className="min-h-screen flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}