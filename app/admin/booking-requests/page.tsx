"use client";

import { useState } from "react";

import { BookingRequest } from "@/types/bookingRequest";

import BookingRequestSearch from "@/components/bookingRequests/BookingRequestSearch";
import BookingRequestTable from "@/components/bookingRequests/BookingRequestTable";

export default function BookingRequestsPage() {

  // ==========================================
  // State
  // ==========================================

  const [search, setSearch] =
    useState("");

  const [selectedRequest, setSelectedRequest] =
    useState<BookingRequest | null>(null);

  // ==========================================
  // View
  // ==========================================

  function handleView(
    request: BookingRequest
  ) {

    setSelectedRequest(request);

    console.log(
      "Selected Booking Request:",
      request
    );

  }

  return (

    <div className="space-y-6">

      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">

            Website Booking Requests

          </h1>

          <p className="mt-2 text-gray-400">

            Manage repair requests received from the website.

          </p>

        </div>

      </div>

      {/* ==========================================
          Search
      ========================================== */}

      <BookingRequestSearch
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
      />
            {/* ==========================================
          Table
      ========================================== */}

      <BookingRequestTable
        search={search}
        onView={handleView}
      />

      {/* ==========================================
          Selected Request (Future Use)
      ========================================== */}

      {selectedRequest && (

        <div className="rounded-xl border border-yellow-500/20 bg-[#111] p-5">

          <h2 className="mb-4 text-xl font-semibold text-white">

            Selected Booking Request

          </h2>

          <div className="grid gap-3 md:grid-cols-2">

            <div>

              <p className="text-sm text-gray-400">

                Customer

              </p>

              <p className="text-white">

                {selectedRequest.customerName}

              </p>

            </div>

            <div>

              <p className="text-sm text-gray-400">

                Mobile

              </p>

              <p className="text-white">

                {selectedRequest.mobile}

              </p>

            </div>

            <div>

              <p className="text-sm text-gray-400">

                Brand

              </p>

              <p className="text-white">

                {selectedRequest.brand}

              </p>

            </div>

            <div>

              <p className="text-sm text-gray-400">

                Model

              </p>

              <p className="text-white">

                {selectedRequest.model}

              </p>

            </div>

            <div className="md:col-span-2">

              <p className="text-sm text-gray-400">

                Problem

              </p>

              <p className="text-white whitespace-pre-wrap">

                {selectedRequest.problem}

              </p>

            </div>

          </div>

        </div>

      )}
          </div>

  );

}