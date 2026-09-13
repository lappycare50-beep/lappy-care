"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  Plus,
  ShieldCheck,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/context/AuthContext";

import type { UserRole } from "@/types/user";

// =====================================================
// TYPES
// =====================================================

type StaffUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  firebaseDisabled?: boolean;
  createdAt?: string;
  lastSignIn?: string;
};

// =====================================================
// PAGE
// =====================================================

export default function StaffPage() {
  const {
    user,
    role: currentRole,
  } = useAuth();

  const [
    staff,
    setStaff,
  ] = useState<StaffUser[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    role,
    setRole,
  ] = useState<UserRole>(
    "technician"
  );

  const [
    pageError,
    setPageError,
  ] = useState("");

  const [
    formError,
    setFormError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  // =====================================================
  // TOKEN DEBUG
  //
  // IMPORTANT:
  // Actual token value is NEVER logged.
  // =====================================================

  function logTokenDebug(
    token: string
  ) {
    const parts =
      token.split(".");

    console.table({
      tokenType:
        typeof token,

      tokenLength:
        token.length,

      jwtParts:
        parts.length,

      startsLikeJwt:
        token.startsWith("eyJ"),

      part1Length:
        parts[0]?.length || 0,

      part2Length:
        parts[1]?.length || 0,

      part3Length:
        parts[2]?.length || 0,
    });
  }

  // =====================================================
  // GET FRESH TOKEN
  // =====================================================

  async function getFreshToken() {
    if (!user) {
      throw new Error(
        "You are not logged in."
      );
    }

    const token =
      await user.getIdToken(
        true
      );

    logTokenDebug(
      token
    );

    return token;
  }

  // =====================================================
  // LOAD STAFF
  // =====================================================

  async function loadStaff() {
    try {
      setLoading(true);
      setPageError("");

      const token =
        await getFreshToken();

      const response =
        await fetch(
          "/api/admin/users",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            cache: "no-store",
          }
        );

      const rawResponse =
        await response.text();

      let data:
        | {
            success?: boolean;
            error?: string;
            users?: StaffUser[];
          }
        | null = null;

      try {
        data =
          rawResponse
            ? JSON.parse(
                rawResponse
              )
            : null;
      } catch {
        data = null;
      }

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.error ||
            `Failed to load staff. (${response.status})`
        );
      }

      setStaff(
        Array.isArray(
          data.users
        )
          ? data.users
          : []
      );
    } catch (error) {
      console.error(
        "Staff load error:",
        error
      );

      setPageError(
        error instanceof Error
          ? error.message
          : "Failed to load staff."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (user) {
      void loadStaff();
    }
  }, [user]);

  // =====================================================
  // RESET FORM
  // =====================================================

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setRole("technician");
    setFormError("");
  }

  // =====================================================
  // OPEN MODAL
  // =====================================================

  function openCreateModal() {
    resetForm();

    setPageError("");
    setSuccess("");

    setModalOpen(
      true
    );
  }

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  function closeCreateModal() {
    if (saving) {
      return;
    }

    setModalOpen(
      false
    );

    resetForm();
  }

  // =====================================================
  // CREATE STAFF
  // =====================================================

  async function handleCreate(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFormError("");
    setPageError("");
    setSuccess("");

    if (!user) {
      setFormError(
        "You are not logged in."
      );

      return;
    }

    const cleanName =
      name.trim();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    if (!cleanName) {
      setFormError(
        "Name is required."
      );

      return;
    }

    if (!cleanEmail) {
      setFormError(
        "Email is required."
      );

      return;
    }

    if (
      password.length < 6
    ) {
      setFormError(
        "Password must be at least 6 characters."
      );

      return;
    }

    try {
      setSaving(true);

      const token =
        await getFreshToken();

      const response =
        await fetch(
          "/api/admin/users",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },

            cache: "no-store",

            body: JSON.stringify({
              name:
                cleanName,

              email:
                cleanEmail,

              password,

              role,
            }),
          }
        );

      const rawResponse =
        await response.text();

      let data:
        | {
            success?: boolean;
            error?: string;
          }
        | null = null;

      try {
        data =
          rawResponse
            ? JSON.parse(
                rawResponse
              )
            : null;
      } catch {
        data = null;
      }

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.error ||
            `Failed to create staff user. (${response.status})`
        );
      }

      setModalOpen(
        false
      );

      resetForm();

      setSuccess(
        `${roleLabel(
          role
        )} account created successfully.`
      );

      await loadStaff();
    } catch (error) {
      console.error(
        "Create staff error:",
        error
      );

      setFormError(
        error instanceof Error
          ? error.message
          : "Failed to create staff user."
      );
    } finally {
      setSaving(false);
    }
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <Users
                size={24}
              />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Staff Management
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Manage Admin, Manager and Technician accounts.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={
              openCreateModal
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            <Plus
              size={18}
            />

            Add Staff
          </button>

        </div>

        {/* =================================================
            CURRENT ROLE
        ================================================= */}

        <div className="rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-sm text-gray-400">

          Current role:

          <span className="ml-2 font-bold text-white">
            {currentRole
              ? roleLabel(
                  currentRole
                )
              : "Loading"}
          </span>

        </div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* =================================================
            PAGE ERROR
        ================================================= */}

        {pageError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {pageError}
          </div>
        )}

        {/* =================================================
            STAFF TABLE
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#181818]">

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">

              <div className="flex items-center gap-3 text-gray-400">

                <Loader2
                  size={20}
                  className="animate-spin text-yellow-400"
                />

                Loading Staff...

              </div>

            </div>
          ) : staff.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">

              <Users
                size={46}
                className="text-gray-700"
              />

              <h2 className="mt-4 text-lg font-semibold text-white">
                No Staff Users
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Create a Manager or Technician account to start using role-based access.
              </p>

              <button
                type="button"
                onClick={
                  openCreateModal
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
              >
                <Plus
                  size={17}
                />

                Add Staff
              </button>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-black">

                  <tr>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                      Staff
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                      Role
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-yellow-400">
                      Last Sign In
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {staff.map(
                    (
                      item
                    ) => (
                      <tr
                        key={
                          item.id
                        }
                        className="border-t border-gray-800 transition hover:bg-white/[0.03]"
                      >

                        {/* Staff */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-gray-400">

                              {item.role ===
                              "technician" ? (
                                <Wrench
                                  size={18}
                                />
                              ) : item.role ===
                                "manager" ? (
                                <UserRound
                                  size={18}
                                />
                              ) : (
                                <ShieldCheck
                                  size={18}
                                />
                              )}

                            </div>

                            <div className="min-w-0">

                              <div className="truncate font-semibold text-white">
                                {
                                  item.name
                                }
                              </div>

                              <div className="mt-1 truncate text-xs text-gray-500">
                                {
                                  item.email
                                }
                              </div>

                            </div>

                          </div>

                        </td>

                        {/* Role */}

                        <td className="px-5 py-4">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-bold
                              ${
                                item.role ===
                                "admin"
                                  ? "bg-red-500/10 text-red-400"
                                  : item.role ===
                                    "manager"
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-blue-500/10 text-blue-400"
                              }
                            `}
                          >
                            {roleLabel(
                              item.role
                            )}
                          </span>

                        </td>

                        {/* Status */}

                        <td className="px-5 py-4">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-bold
                              ${
                                item.active
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-gray-500/10 text-gray-500"
                              }
                            `}
                          >
                            {item.active
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </td>

                        {/* Last Sign In */}

                        <td className="px-5 py-4 text-sm text-gray-500">

                          {formatDate(
                            item.lastSignIn
                          )}

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* =================================================
            ROLE INFORMATION
        ================================================= */}

        <section className="grid gap-4 md:grid-cols-3">

          <RoleInfo
            icon={
              <ShieldCheck
                size={20}
              />
            }
            title="Admin"
            description="Full access to the ERP and configuration."
          />

          <RoleInfo
            icon={
              <UserRound
                size={20}
              />
            }
            title="Manager"
            description="Operations, customers, inventory, sales, invoices and reports."
          />

          <RoleInfo
            icon={
              <Wrench
                size={20}
              />
            }
            title="Technician"
            description="Repair jobs, job cards and technician-related work."
          />

        </section>

      </div>

      {/* ===================================================
          CREATE MODAL
      =================================================== */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(
            event
          ) => {
            if (
              event.currentTarget ===
              event.target
            ) {
              closeCreateModal();
            }
          }}
        >

          <div className="w-full max-w-lg rounded-3xl border border-yellow-500/20 bg-[#181818] p-6 shadow-2xl sm:p-8">

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Add Staff
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a new Firebase login account.
                </p>

              </div>

              <button
                type="button"
                onClick={
                  closeCreateModal
                }
                disabled={
                  saving
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
                aria-label="Close"
              >
                <X
                  size={18}
                />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={
                handleCreate
              }
              className="mt-6 space-y-5"
            >

              <Field
                label="Full Name"
                value={
                  name
                }
                onChange={
                  setName
                }
                placeholder="Rahul Patil"
                required
              />

              <Field
                label="Email"
                type="email"
                value={
                  email
                }
                onChange={
                  setEmail
                }
                placeholder="rahul@example.com"
                required
              />

              <Field
                label="Temporary Password"
                type="password"
                value={
                  password
                }
                onChange={
                  setPassword
                }
                placeholder="Minimum 6 characters"
                required
              />

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Role
                </label>

                <select
                  value={
                    role
                  }
                  onChange={(
                    event
                  ) =>
                    setRole(
                      event.target.value as UserRole
                    )
                  }
                  className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                >

                  <option value="technician">
                    Technician
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

              {formError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    closeCreateModal
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-black disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-60"
                >

                  {saving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Plus
                      size={17}
                    />
                  )}

                  {saving
                    ? "Creating..."
                    : "Create Staff"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </AdminLayout>
  );
}

// =====================================================
// FIELD
// =====================================================

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}

      </label>

      <input
        type={
          type
        }
        value={
          value
        }
        required={
          required
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        placeholder={
          placeholder
        }
        className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400"
      />

    </div>
  );
}

// =====================================================
// ROLE INFO
// =====================================================

function RoleInfo({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#181818] p-5">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

// =====================================================
// ROLE LABEL
// =====================================================

function roleLabel(
  role: UserRole
) {
  switch (role) {
    case "admin":
      return "Admin";

    case "manager":
      return "Manager";

    case "technician":
      return "Technician";

    default:
      return role;
  }
}

// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(
  value?: string
) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}