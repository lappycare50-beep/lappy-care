"use client";

import { useState } from "react";

import { addBookingRequest } from "@/services/bookingRequestService";

// ==========================================
// Brands
// ==========================================

const BRANDS = [
  "HP",
  "Dell",
  "Lenovo",
  "ASUS",
  "Acer",
  "Apple",
  "MSI",
  "Samsung",
  "LG",
  "Microsoft",
  "Other",
];

export default function BookingForm() {

  // ==========================================
  // Form State
  // ==========================================

  const [customerName, setCustomerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [alternateMobile, setAlternateMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [model, setModel] =
    useState("");

  const [problem, setProblem] =
    useState("");

  const [pickupRequired, setPickupRequired] =
    useState(false);

  // ==========================================
  // UI State
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [requestId, setRequestId] =
    useState("");

  // ==========================================
  // Submit
  // ==========================================

  async function handleSubmit() {

    if (!customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    const mobileNo =
      mobile.replace(/\D/g, "");

    if (mobileNo.length !== 10) {
      alert("Please enter valid mobile number.");
      return;
    }

    if (!brand) {
      alert("Please select laptop brand.");
      return;
    }

    if (!model.trim()) {
      alert("Please enter laptop model.");
      return;
    }

    if (!problem.trim()) {
      alert("Please describe the problem.");
      return;
    }

    try {

      setLoading(true);

      const booking = {

        customerName:
          customerName.trim(),

        mobile: mobileNo,

        alternateMobile:
          alternateMobile.replace(/\D/g, ""),

        email:
          email.trim(),

        brand,

        model:
          model.trim(),

        problem:
          problem.trim(),

        pickupRequired,

      };

      const generatedRequestId =
        await addBookingRequest(booking);

      setRequestId(generatedRequestId);

      setSuccess(true);

      // Reset Form

      setCustomerName("");
      setMobile("");
      setAlternateMobile("");
      setEmail("");
      setBrand("");
      setModel("");
      setProblem("");
      setPickupRequired(false);

    } catch (error) {

      console.error(error);

      alert("Failed to submit booking request.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <>
          {success ? (

        <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8 text-center">

          <div className="text-6xl">
            ✅
          </div>

          <h2 className="mt-5 text-3xl font-bold text-green-400">
            Booking Request Submitted
          </h2>

          <p className="mt-4 text-gray-300">
            Thank you for contacting <strong>Lappy Care</strong>.
            <br />
            Our team will contact you shortly.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <p className="text-sm text-gray-400">
              Your Booking Request ID
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-wider text-yellow-400">
              {requestId}
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Please save this Request ID for future communication.
            </p>

          </div>

          <div className="mt-8 space-y-3 text-left text-gray-300">

            <p>
              ✅ Booking request received successfully.
            </p>

            <p>
              📞 Our support team will call you soon.
            </p>

            <p>
              🚚 If Pickup &amp; Drop was selected, our executive will schedule the pickup.
            </p>

          </div>

          <button
            type="button"
            onClick={() => {

              setSuccess(false);

              setRequestId("");

            }}
            className="mt-10 rounded-xl bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Submit Another Request
          </button>

        </div>

      ) : (
                <div className="space-y-8">

          {/* ========================================== */}
          {/* Customer Details */}
          {/* ========================================== */}

          <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Customer Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full Name *"
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

          {/* ========================================== */}
          {/* Device Details */}
          {/* ========================================== */}

          <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Device Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              >
                <option value="">
                  Select Brand
                </option>

                {BRANDS.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Laptop Model *"
                className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

          </div>

          {/* ========================================== */}
          {/* Problem Description */}
          {/* ========================================== */}

          <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Problem Description
            </h2>

            <textarea
              rows={5}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe your laptop problem..."
              className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

          {/* ========================================== */}
          {/* Pickup */}
          {/* ========================================== */}

          <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

            <label className="flex cursor-pointer items-center gap-4">

              <input
                type="checkbox"
                checked={pickupRequired}
                onChange={(e) =>
                  setPickupRequired(e.target.checked)
                }
                className="h-5 w-5"
              />

              <span className="text-white">
                I need Pickup &amp; Drop Service
              </span>

            </label>

          </div>

          {/* ========================================== */}
          {/* Submit */}
          {/* ========================================== */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Book Repair"}
          </button>

        </div>

      )}

    </>

  );

}