"use client";

import {
  useEffect,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthContext";

import type {
  UserRole,
} from "@/types/user";

type Props = {
  children: React.ReactNode;

  allowedRoles?: UserRole[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
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

  // =====================================================
  // AUTH CHECK
  // =====================================================

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.replace(
        "/login"
      );
    }
  }, [
    user,
    loading,
    router,
  ]);

  // =====================================================
  // ROLE CHECK
  // =====================================================

  useEffect(() => {
    if (
      loading ||
      roleLoading ||
      !user
    ) {
      return;
    }

    // No role restriction on this route.
    if (
      !allowedRoles ||
      allowedRoles.length === 0
    ) {
      return;
    }

    // Role not available.
    if (!role) {
      router.replace(
        "/admin"
      );

      return;
    }

    // Role allowed.
    if (
      allowedRoles.includes(
        role
      )
    ) {
      return;
    }

    // =================================================
    // UNAUTHORIZED
    // =================================================

    console.warn(
      "Unauthorized route access:",
      {
        pathname,
        role,
        allowedRoles,
      }
    );

    router.replace(
      "/admin"
    );
  }, [
    allowedRoles,
    loading,
    roleLoading,
    role,
    user,
    router,
    pathname,
  ]);

  // =====================================================
  // LOADING
  // =====================================================

  if (
    loading ||
    roleLoading
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-yellow-400" />

          <p className="mt-4 text-lg text-yellow-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!user) {
    return null;
  }

  // =====================================================
  // ROLE RESTRICTED BUT ROLE NOT READY
  // =====================================================

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !role
  ) {
    return null;
  }

  // =====================================================
  // ROLE CHECK
  // =====================================================

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    role &&
    !allowedRoles.includes(
      role
    )
  ) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}