"use client";

import { useState } from "react";

import {
  X,
  Save,
  Loader2,
} from "lucide-react";

import CustomerSearch from "@/components/customers/CustomerSearch";
import CustomerTable from "@/components/customers/CustomerTable";

import {
  updateCustomer,
} from "@/services/customerService";

import type {
  Customer,
} from "@/types/customer";

export default function CustomersPage() {
  const [search, setSearch] =
    useState("");

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState<Customer | null>(
    null
  );

  const [saving, setSaving] =
    useState(false);

  // =====================================================
  // EDIT CUSTOMER
  // =====================================================

  function handleEdit(
    customer: Customer
  ) {
    setSelectedCustomer({
      ...customer,
    });
  }

  // =====================================================
  // CLOSE
  // =====================================================

  function closeEdit() {
    if (saving) return;

    setSelectedCustomer(null);
  }

  // =====================================================
  // UPDATE FIELD
  // =====================================================

  function updateField<
    K extends keyof Customer
  >(
    field: K,
    value: Customer[K]
  ) {
    setSelectedCustomer(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          [field]: value,
        };
      }
    );
  }

  // =====================================================
  // SAVE CUSTOMER
  // =====================================================

  async function handleSave() {
    if (!selectedCustomer?.id) {
      alert(
        "Customer ID is missing."
      );

      return;
    }

    if (
      !selectedCustomer.name.trim()
    ) {
      alert(
        "Please enter customer name."
      );

      return;
    }

    if (
      !selectedCustomer.mobile.trim()
    ) {
      alert(
        "Please enter mobile number."
      );

      return;
    }

    try {
      setSaving(true);

      const customerToSave:
        Omit<Customer, "id"> = {
        customerId:
          selectedCustomer.customerId,

        name:
          selectedCustomer.name.trim(),

        mobile:
          selectedCustomer.mobile.replace(
            /\D/g,
            ""
          ),

        alternateMobile:
          selectedCustomer.alternateMobile
            ?.trim() || "",

        email:
          selectedCustomer.email
            ?.trim() || "",

        address:
          selectedCustomer.address
            ?.trim() || "",

        city:
          selectedCustomer.city
            ?.trim() || "",

        state:
          selectedCustomer.state
            ?.trim() || "",

        pincode:
          selectedCustomer.pincode
            ?.trim() || "",

        gstNumber:
          selectedCustomer.gstNumber
            ?.trim() || "",

        companyName:
          selectedCustomer.companyName
            ?.trim() || "",

        // ==========================================
        // KEEP SYSTEM STATISTICS
        // ==========================================

        totalRepairs:
          selectedCustomer.totalRepairs,

        totalInvoices:
          selectedCustomer.totalInvoices,

        totalSpent:
          selectedCustomer.totalSpent,

        pendingAmount:
          selectedCustomer.pendingAmount,

        // ==========================================
        // KEEP REFERENCES
        // ==========================================

        lastRepairId:
          selectedCustomer.lastRepairId,

        lastInvoiceId:
          selectedCustomer.lastInvoiceId,

        lastVisit:
          selectedCustomer.lastVisit,

        // ==========================================
        // KEEP PROFILE
        // ==========================================

        qrToken:
          selectedCustomer.qrToken,

        notes:
          selectedCustomer.notes
            ?.trim() || "",

        isActive:
          selectedCustomer.isActive,

        createdAt:
          selectedCustomer.createdAt,

        updatedAt:
          new Date().toISOString(),
      };

      await updateCustomer(
        selectedCustomer.id,
        customerToSave
      );

      alert(
        "✅ Customer updated successfully."
      );

      setSelectedCustomer(null);

      // Refresh page/table
      window.location.reload();
    } catch (error) {
      console.error(
        "Customer Update Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update customer."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen space-y-6 bg-black p-5 text-white sm:p-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Customers
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage and track all customer records.
          </p>
        </div>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <CustomerSearch
        value={search}
        onChange={setSearch}
        onClear={() =>
          setSearch("")
        }
      />

      {/* =================================================
          TABLE
      ================================================= */}

      <CustomerTable
        search={search}
        onEdit={handleEdit}
      />

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">

          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818] shadow-2xl">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Customer
                </p>

                <h2 className="mt-1 text-2xl font-black text-white">
                  Edit Customer
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Update customer profile details.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeEdit
                }
                disabled={saving}
                className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"
                title="Close"
              >
                <X
                  size={24}
                />
              </button>

            </div>

            {/* ==========================================
                FORM
            ========================================== */}

            <div className="overflow-y-auto p-6">

              {/* Customer ID */}

              <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-black/40 p-4">

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                      Customer ID
                    </p>

                    <p className="mt-1 text-lg font-black text-yellow-400">
                      {
                        selectedCustomer.customerId
                      }
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                      Account Status
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "isActive",
                          !selectedCustomer.isActive
                        )
                      }
                      disabled={
                        saving
                      }
                      className={`mt-1 rounded-full px-4 py-1.5 text-xs font-bold ${
                        selectedCustomer.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {
                        selectedCustomer.isActive
                          ? "Active"
                          : "Inactive"
                      }
                    </button>

                  </div>

                </div>

              </div>

              {/* ========================================
                  BASIC DETAILS
              ======================================== */}

              <section className="rounded-2xl border border-zinc-800 bg-[#101010] p-5">

                <h3 className="mb-5 text-lg font-black text-white">
                  Basic Details
                </h3>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* Name */}

                  <Field
                    label="Customer Name *"
                    value={
                      selectedCustomer.name
                    }
                    onChange={(value) =>
                      updateField(
                        "name",
                        value
                      )
                    }
                    disabled={saving}
                  />

                  {/* Mobile */}

                  <Field
                    label="Mobile Number *"
                    value={
                      selectedCustomer.mobile
                    }
                    onChange={(value) =>
                      updateField(
                        "mobile",
                        value
                      )
                    }
                    disabled={saving}
                    inputMode="numeric"
                  />

                  {/* Alternate Mobile */}

                  <Field
                    label="Alternate Mobile"
                    value={
                      selectedCustomer.alternateMobile ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "alternateMobile",
                        value
                      )
                    }
                    disabled={saving}
                    inputMode="numeric"
                  />

                  {/* Email */}

                  <Field
                    label="Email Address"
                    value={
                      selectedCustomer.email ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "email",
                        value
                      )
                    }
                    disabled={saving}
                    type="email"
                  />

                  {/* Company */}

                  <Field
                    label="Company Name"
                    value={
                      selectedCustomer.companyName ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "companyName",
                        value
                      )
                    }
                    disabled={saving}
                  />

                  {/* GST */}

                  <Field
                    label="GST Number"
                    value={
                      selectedCustomer.gstNumber ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "gstNumber",
                        value
                      )
                    }
                    disabled={saving}
                  />

                </div>

              </section>

              {/* ========================================
                  ADDRESS
              ======================================== */}

              <section className="mt-5 rounded-2xl border border-zinc-800 bg-[#101010] p-5">

                <h3 className="mb-5 text-lg font-black text-white">
                  Address Details
                </h3>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* Address */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-zinc-400">
                      Address
                    </label>

                    <textarea
                      value={
                        selectedCustomer.address ||
                        ""
                      }
                      onChange={(e) =>
                        updateField(
                          "address",
                          e.target.value
                        )
                      }
                      disabled={
                        saving
                      }
                      rows={3}
                      className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400 disabled:opacity-50"
                      placeholder="Customer address"
                    />

                  </div>

                  <Field
                    label="City"
                    value={
                      selectedCustomer.city ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "city",
                        value
                      )
                    }
                    disabled={saving}
                  />

                  <Field
                    label="State"
                    value={
                      selectedCustomer.state ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "state",
                        value
                      )
                    }
                    disabled={saving}
                  />

                  <Field
                    label="Pincode"
                    value={
                      selectedCustomer.pincode ||
                      ""
                    }
                    onChange={(value) =>
                      updateField(
                        "pincode",
                        value
                      )
                    }
                    disabled={saving}
                    inputMode="numeric"
                  />

                </div>

              </section>

              {/* ========================================
                  NOTES
              ======================================== */}

              <section className="mt-5 rounded-2xl border border-zinc-800 bg-[#101010] p-5">

                <h3 className="mb-5 text-lg font-black text-white">
                  Notes
                </h3>

                <textarea
                  value={
                    selectedCustomer.notes ||
                    ""
                  }
                  onChange={(e) =>
                    updateField(
                      "notes",
                      e.target.value
                    )
                  }
                  disabled={saving}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400 disabled:opacity-50"
                  placeholder="Internal customer notes"
                />

              </section>

            </div>

            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-zinc-800 px-6 py-5">

              <button
                type="button"
                onClick={
                  closeEdit
                }
                disabled={saving}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSave
                }
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save
                      size={17}
                    />

                    Save Changes
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

// =====================================================
// FIELD
// =====================================================

function Field({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  disabled?: boolean;
  type?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "email"
    | "url"
    | "search"
    | "none"
    | undefined;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        disabled={disabled}
        className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
      />

    </div>
  );
}