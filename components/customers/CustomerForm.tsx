"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";

import {
  addCustomer,
  updateCustomer,
} from "@/services/customerService";

import { generateId } from "@/services/idGenerator";

type Props = {
  customer?: Customer | null;
  onSuccess?: () => void;
};

export default function CustomerForm({
  customer,
  onSuccess,
}: Props) {

  // ==========================================
  // Form State
  // ==========================================

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");

  const [email, setEmail] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [notes, setNotes] = useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Edit Mode
  // ==========================================

  useEffect(() => {

    if (!customer) return;

    setName(customer.name);

    setMobile(customer.mobile);

    setAlternateMobile(
      customer.alternateMobile ?? ""
    );

    setEmail(
      customer.email ?? ""
    );

    setCompanyName(
      customer.companyName ?? ""
    );

    setGstNumber(
      customer.gstNumber ?? ""
    );

    setAddress(
      customer.address ?? ""
    );

    setCity(
      customer.city ?? ""
    );

    setState(
      customer.state ?? ""
    );

    setPincode(
      customer.pincode ?? ""
    );

    setNotes(
      customer.notes ?? ""
    );

  }, [customer]);

  // ==========================================
  // Save Customer
  // ==========================================

  async function handleSubmit() {

    if (!name.trim()) {

      alert("Please enter customer name.");

      return;

    }

    const mobileNo =
      mobile.replace(/\D/g, "");

    if (mobileNo.length !== 10) {

      alert("Please enter valid 10 digit mobile number.");

      return;

    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

      alert("Please enter valid email address.");

      return;

    }

    try {

      setLoading(true);

      const now =
        new Date().toISOString();

      const customerId =

        customer?.customerId ??

        await generateId("customer");

      const customerData: Omit<Customer, "id"> = {

        customerId,

        name: name.trim(),

        mobile: mobileNo,

        alternateMobile:
          alternateMobile.replace(/\D/g, ""),

        email: email.trim(),

        companyName:
          companyName.trim(),

        gstNumber:
          gstNumber.trim(),

        address:
          address.trim(),

        city:
          city.trim(),

        state:
          state.trim(),

        pincode:
          pincode.trim(),

        totalRepairs:
          customer?.totalRepairs ?? 0,

        totalInvoices:
          customer?.totalInvoices ?? 0,

        totalSpent:
          customer?.totalSpent ?? 0,

        pendingAmount:
          customer?.pendingAmount ?? 0,

        lastRepairId:
          customer?.lastRepairId ?? "",

        lastInvoiceId:
          customer?.lastInvoiceId ?? "",

        lastVisit:
          customer?.lastVisit ??
          now.split("T")[0],

        isActive:
          customer?.isActive ?? true,

        createdAt:
          customer?.createdAt ?? now,

        updatedAt:
          now,

        notes:
          notes.trim(),

      };

      if (customer?.id) {

        await updateCustomer(
          customer.id,
          customerData
        );

        alert("Customer updated successfully.");

      } else {

        await addCustomer(
          customerData
        );

        alert("Customer added successfully.");

      }

      onSuccess?.();

    } catch (error) {

      console.error(error);

      alert("Failed to save customer.");

    } finally {

      setLoading(false);

    }

  }

  // ==========================================
  // JSX (Part 2)
  // ==========================================

  return (
    <>
          <div className="space-y-8">

        {/* ==========================================
            Customer Details
        ========================================== */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Customer Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer Name *"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number *"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              value={alternateMobile}
              onChange={(e) => setAlternateMobile(e.target.value)}
              placeholder="Alternate Mobile"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

        </div>

        {/* ==========================================
            Company Details
        ========================================== */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Company Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              placeholder="GST Number"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

        </div>

        {/* ==========================================
            Address
        ========================================== */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Address Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Address"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400 md:col-span-2"
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400 md:col-span-2"
            />

          </div>

        </div>

        {/* ==========================================
            Notes
        ========================================== */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Additional Notes
          </h2>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Customer Notes..."
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* ==========================================
            Customer Summary
        ========================================== */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Customer Summary
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-black p-4">
              <p className="text-sm text-gray-400">
                Total Repairs
              </p>

              <h3 className="mt-2 text-3xl font-bold text-yellow-400">
                {customer?.totalRepairs ?? 0}
              </h3>
            </div>

            <div className="rounded-xl bg-black p-4">
              <p className="text-sm text-gray-400">
                Total Invoices
              </p>

              <h3 className="mt-2 text-3xl font-bold text-yellow-400">
                {customer?.totalInvoices ?? 0}
              </h3>
            </div>

            <div className="rounded-xl bg-black p-4">
              <p className="text-sm text-gray-400">
                Total Spent
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-400">
                ₹{(customer?.totalSpent ?? 0).toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="rounded-xl bg-black p-4">
              <p className="text-sm text-gray-400">
                Pending Amount
              </p>

              <h3 className="mt-2 text-3xl font-bold text-red-400">
                ₹{(customer?.pendingAmount ?? 0).toLocaleString("en-IN")}
              </h3>
            </div>

          </div>

        </div>

        {/* ==========================================
            Save Button
        ========================================== */}

        <div className="flex justify-end">

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-yellow-400 px-10 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? customer
                ? "Updating..."
                : "Saving..."
              : customer
              ? "Update Customer"
              : "Save Customer"}
          </button>

        </div>

      </div>

    </>
  );

}