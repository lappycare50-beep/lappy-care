"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

import { User } from "firebase/auth";

import {
  subscribeAuth,
  logout,
} from "@/services/authService";

import {
  getAppUser,
} from "@/services/userService";

import type {
  AppUser,
  UserRole,
} from "@/types/user";

// =====================================================
// AUTH CONTEXT TYPE
// =====================================================

type AuthContextType = {
  user: User | null;
  appUser: AppUser | null;
  role: UserRole | null;

  loading: boolean;
  roleLoading: boolean;

  logoutUser: () => Promise<void>;
};

// =====================================================
// CONTEXT
// =====================================================

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

// =====================================================
// PROVIDER
// =====================================================

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [
    user,
    setUser,
  ] = useState<User | null>(null);

  const [
    appUser,
    setAppUser,
  ] = useState<AppUser | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    roleLoading,
    setRoleLoading,
  ] = useState(false);

  // ===================================================
  // AUTH STATE
  // ===================================================

  useEffect(() => {
    let mounted = true;

    const unsubscribe =
      subscribeAuth(
        async (
          currentUser
        ) => {
          if (!mounted) {
            return;
          }

          setUser(
            currentUser
          );

          // ==============================================
          // LOGGED OUT
          // ==============================================

          if (!currentUser) {
            setAppUser(null);
            setRoleLoading(false);
            setLoading(false);

            return;
          }

          // ==============================================
          // LOGGED IN
          // ==============================================

          setRoleLoading(true);

          try {
            const profile =
              await getAppUser(
                currentUser.uid
              );

            if (!mounted) {
              return;
            }

            // ============================================
            // PROFILE EXISTS
            // ============================================

            if (profile) {
              setAppUser(
                profile
              );
            } else {
              // ==========================================
              // BACKWARD COMPATIBILITY
              //
              // Existing Firebase account without
              // users/{uid} document = Admin.
              // ==========================================

              const fallbackAdmin:
                AppUser = {
                id:
                  currentUser.uid,

                email:
                  currentUser.email ||
                  "",

                name:
                  currentUser.displayName ||
                  "Admin",

                role:
                  "admin",

                active:
                  true,
              };

              setAppUser(
                fallbackAdmin
              );
            }
          } catch (error) {
            console.error(
              "App user profile loading error:",
              error
            );

            if (!mounted) {
              return;
            }

            // ==========================================
            // SAFE ADMIN FALLBACK
            //
            // Keeps existing Admin account working.
            // ==========================================

            const fallbackAdmin:
              AppUser = {
              id:
                currentUser.uid,

              email:
                currentUser.email ||
                "",

              name:
                currentUser.displayName ||
                "Admin",

              role:
                "admin",

              active:
                true,
            };

            setAppUser(
              fallbackAdmin
            );
          } finally {
            if (mounted) {
              setRoleLoading(
                false
              );

              setLoading(
                false
              );
            }
          }
        }
      );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // ===================================================
  // LOGOUT
  // ===================================================

  const logoutUser =
    useCallback(
      async () => {
        setAppUser(null);

        await logout();
      },
      []
    );

  // ===================================================
  // ROLE
  // ===================================================

  const role =
    appUser?.role ||
    null;

  // ===================================================
  // PROVIDER
  // ===================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        appUser,
        role,
        loading,
        roleLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =====================================================
// HOOK
// =====================================================

export function useAuth() {
  const context =
    useContext(
      AuthContext
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}