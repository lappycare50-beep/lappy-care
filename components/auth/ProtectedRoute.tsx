"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {
  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  // =====================================================
  // AUTH REDIRECT
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
    loading,
    user,
    router,
  ]);

  // =====================================================
  // AUTH LOADING
  // =====================================================

  if (loading) {
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

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!user) {
    return null;
  }

  // =====================================================
  // AUTHORIZED
  // =====================================================

  return (
    <>
      {children}
    </>
  );
}