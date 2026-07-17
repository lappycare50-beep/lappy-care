"use client";

import { useState } from "react";

import {
  X,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

import {
  BookingRequest,
} from "@/types/bookingRequest";

import {
  Repair,
} from "@/types/repair";

import {
  generateId,
} from "@/services/idGenerator";

import {
  syncCustomer,
} from "@/services/customerService";

import {
  addRepair,
} from "@/services/repairService";

import {
  updateBookingRequest,
} from "@/services/bookingRequestService";

type Props = {

  open: boolean;

  request: BookingRequest;

  onClose: () => void;

  onSuccess?: (
    repairId: string
  ) => void;

};

export default function ConvertToRepairModal({

  open,

  request,

  onClose,

  onSuccess,

}: Props) {

  // ==========================================
  // State
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [repairId, setRepairId] =
    useState("");

  // ==========================================
  // Convert To Repair
  // ==========================================

  async function handleConvert() {
    try {

      setLoading(true);

      // ==========================================
      // Generate Repair ID
      // ==========================================

      const newRepairId =
        await generateId("repair");

      // ==========================================
      // Sync Customer
      // ==========================================

      const customerId =
        await syncCustomer({

          name:
            request.customerName,

          mobile:
            request.mobile,

          alternateMobile:
            request.alternateMobile,

          email:
            request.email,

          repairId:
            newRepairId,

        });

      // ==========================================
      // Current Time
      // ==========================================

      const now =
        new Date().toISOString();

      // ==========================================
      // Create Repair Object
      // ==========================================

      const repair: Repair = {

        repairId:
          newRepairId,

        customer: {

          customerId,

          name:
            request.customerName,

          mobile:
            request.mobile,

          alternateMobile:
            request.alternateMobile,

          email:
            request.email,

          address: "",

          city: "",

          state: "",

          pincode: "",

        },

        device: {

          type: "Laptop",

          brand:
            request.brand,

          model:
            request.model,

          serialNo: "",

          processor: "",

          ram: "",

          storage: "",

          color: "",

          image: "",

          devicePhotos: [],

        },

        accessories: {

          items: [],

          other: "",

        },

        problem: {

          complaint:
            request.problem,

          physicalCondition: "",

          diagnosis: "",

          password: "",

          biosPassword: "",

        },

        estimate: {

          labourCharge: 0,

          partsCharge: 0,

          discount: 0,

          totalAmount: 0,

          advancePaid: 0,

          balanceAmount: 0,

          expectedDelivery: "",

          technician: "",

          priority: "Medium",

        },

        paymentStatus:
          "Pending",

        status:
          "Received",

        warranty:
          "No Warranty",

        remarks:
          `Converted from Website Booking ${request.requestId}`,

        createdAt:
          now,

        updatedAt:
          now,

        timeline: [

          {

            status:
              "Received",

            note:
              `Converted from Website Booking ${request.requestId}`,

            updatedBy:
              "System",

            createdAt:
              now,

          },

        ],

      };

      // ==========================================
      // Save Repair
      // ==========================================

      await addRepair(
        repair
      );

      // ==========================================
      // Update Booking
      // ==========================================

      await updateBookingRequest(

        request.id!,

        {

          ...request,

          status:
            "Converted",

        }

      );

      // ==========================================
      // Success
      // ==========================================

      setRepairId(
        newRepairId
      );

      setSuccess(true);

      onSuccess?.(
        newRepairId
      );

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Failed to convert booking."
      );

    } finally {

      setLoading(false);

    }

  }

  // ==========================================
  // Close Modal
  // ==========================================

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-[#181818] shadow-2xl">
                {/* ==========================================
            Header
        ========================================== */}

        <div className="flex items-center justify-between border-b border-gray-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">

              Convert To Repair

            </h2>

            <p className="mt-2 text-gray-400">

              Convert Website Booking into Repair Job.

            </p>

          </div>

          {!success && (

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-gray-400 transition hover:text-red-400"
            >

              <X size={24} />

            </button>

          )}

        </div>

        {/* ==========================================
            Body
        ========================================== */}

        <div className="p-6">

          {success ? (

            <div className="space-y-6 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">

                <span className="text-5xl">

                  ✅

                </span>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-green-400">

                  Repair Created Successfully

                </h2>

                <p className="mt-3 text-gray-400">

                  Website Booking has been converted successfully.

                </p>

              </div>

              <div className="rounded-2xl bg-[#111111] p-6">

                <p className="text-sm text-gray-400">

                  Repair ID

                </p>

                <h3 className="mt-3 text-3xl font-bold text-yellow-400">

                  {repairId}

                </h3>

              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300"
              >

                Close

              </button>

            </div>

          ) : (

            <>

              <div className="rounded-2xl bg-[#111111] p-5">

                <h3 className="mb-5 text-lg font-bold text-yellow-400">

                  Booking Details

                </h3>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>

                    <p className="text-sm text-gray-400">

                      Request ID

                    </p>

                    <h4 className="font-semibold text-white">

                      {request.requestId}

                    </h4>

                  </div>

                  <div>

                    <p className="text-sm text-gray-400">

                      Customer

                    </p>

                    <h4 className="font-semibold text-white">

                      {request.customerName}

                    </h4>

                  </div>

                  <div>

                    <p className="text-sm text-gray-400">

                      Mobile

                    </p>

                    <h4 className="font-semibold text-white">

                      {request.mobile}

                    </h4>

                  </div>

                  <div>

                    <p className="text-sm text-gray-400">

                      Device

                    </p>

                    <h4 className="font-semibold text-white">

                      {request.brand} {request.model}

                    </h4>

                  </div>

                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

                <div className="flex items-start gap-3">

                  <AlertTriangle
                    size={22}
                    className="mt-1 text-yellow-400"
                  />

                  <div>

                    <h3 className="font-semibold text-yellow-400">

                      Confirmation

                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-300">

                      This action will create a Repair Job,
                      sync customer information,
                      and mark this booking as
                      <span className="ml-1 font-semibold text-green-400">

                        Converted

                      </span>.

                    </p>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>

        {/* ==========================================
            Footer
        ========================================== */}

        {!success && (

          <div className="flex justify-end gap-3 border-t border-gray-800 p-6">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-700 px-6 py-3 text-white transition hover:bg-[#222222]"
            >

              Cancel

            </button>

            <button
              type="button"
              onClick={handleConvert}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
            >

              <RefreshCw size={18} />

              {loading
                ? "Converting..."
                : "Convert To Repair"}

            </button>

          </div>

        )}

      </div>

    </div>

  );

}