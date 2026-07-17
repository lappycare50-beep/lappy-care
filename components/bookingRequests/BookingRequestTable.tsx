"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Eye,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { BookingRequest } from "@/types/bookingRequest";

import {
  getBookingRequests,
} from "@/services/bookingRequestService";

type Props = {
  search: string;
  onView: (request: BookingRequest) => void;
};

export default function BookingRequestTable({
  search,
  onView,
}: Props) {

  const [requests, setRequests] =
    useState<BookingRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Load Requests
  // ==========================================

  async function loadRequests() {

    try {

      const data =
        await getBookingRequests();

      setRequests(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    loadRequests();
  }, []);

  // ==========================================
  // Search
  // ==========================================

  const keyword =
    search.toLowerCase().trim();

  const filtered =
    requests.filter((request) =>

      request.requestId
        .toLowerCase()
        .includes(keyword)

      ||

      request.customerName
        .toLowerCase()
        .includes(keyword)

      ||

      request.mobile
        .toLowerCase()
        .includes(keyword)

      ||

      request.brand
        .toLowerCase()
        .includes(keyword)

    );

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (
      <div className="rounded-2xl bg-[#181818] p-10 text-center text-white">
        Loading Booking Requests...
      </div>
    );

  }

  return (

    <div className="overflow-x-auto rounded-2xl border border-yellow-500/20 bg-[#181818]">

      <table className="min-w-full">

        <thead className="bg-[#202020]">

          <tr>

            <th className="px-4 py-4 text-left text-yellow-400">
              Request ID
            </th>

            <th className="px-4 py-4 text-left text-yellow-400">
              Customer
            </th>

            <th className="px-4 py-4 text-left text-yellow-400">
              Mobile
            </th>

            <th className="px-4 py-4 text-left text-yellow-400">
              Device
            </th>

            <th className="px-4 py-4 text-left text-yellow-400">
              Pickup
            </th>

            <th className="px-4 py-4 text-left text-yellow-400">
              Status
            </th>

            <th className="px-4 py-4 text-left text-yellow-400">
              Date
            </th>

            <th className="px-4 py-4 text-center text-yellow-400">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((request) => (

            <tr
              key={request.id}
              className="border-t border-gray-800 hover:bg-[#202020]"
            >

              <td className="px-4 py-4 font-semibold text-yellow-400">
                {request.requestId}
              </td>

              <td className="px-4 py-4">

                <div>

                  <h3 className="font-semibold text-white">
                    {request.customerName}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {request.email || "-"}
                  </p>

                </div>

              </td>

              <td className="px-4 py-4 text-gray-300">
                {request.mobile}
              </td>

              <td className="px-4 py-4 text-gray-300">
                {request.brand} {request.model}
              </td>

              <td className="px-4 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    request.pickupRequired
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {request.pickupRequired
                    ? "Yes"
                    : "No"}
                </span>

              </td>

              <td className="px-4 py-4">

                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">

                  {request.status}

                </span>

              </td>

              <td className="px-4 py-4 text-gray-400">
                {new Date(request.createdAt).toLocaleDateString("en-IN")}
              </td>

              <td className="px-4 py-4">

                <div className="flex items-center justify-center gap-3">

                  <button
                    type="button"
                    onClick={() => onView(request)}
                    className="text-blue-400 hover:text-blue-300"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>

                  <a
                    href={`tel:${request.mobile}`}
                    className="text-green-400 hover:text-green-300"
                    title="Call"
                  >
                    <Phone size={18} />
                  </a>

                  <a
                    href={`https://wa.me/91${request.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300"
                    title="WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>

                  <button
                    type="button"
                    className="text-green-400 hover:text-green-300"
                    title="Approve"
                  >
                    <CheckCircle size={18} />
                  </button>

                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300"
                    title="Reject"
                  >
                    <XCircle size={18} />
                  </button>

                  <button
                    type="button"
                    className="text-yellow-400 hover:text-yellow-300"
                    title="Convert To Repair"
                  >
                    <RefreshCw size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

          {filtered.length === 0 && (

            <tr>

              <td
                colSpan={8}
                className="px-6 py-12 text-center text-gray-400"
              >
                No Booking Requests Found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}