"use client";

import Link from "next/link";

import { BookingRequest } from "@/types/bookingRequest";

type Props = {
  requests: BookingRequest[];
  loading: boolean;
};

export default function WebsiteRequestTable({
  requests,
  loading,
}: Props) {

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-[#111111] p-10 text-center text-gray-400">
        Loading booking requests...
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-[#111111] p-10 text-center text-gray-400">
        No booking requests found.
      </div>
    );
  }

  function getStatusColor(status: BookingRequest["status"]) {

    switch (status) {

      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";

      case "Contacted":
        return "bg-blue-500/20 text-blue-400";

      case "Scheduled":
        return "bg-purple-500/20 text-purple-400";

      case "Pickup Assigned":
        return "bg-indigo-500/20 text-indigo-400";

      case "Received":
        return "bg-green-500/20 text-green-400";

      case "Converted":
        return "bg-emerald-500/20 text-emerald-400";

      case "Cancelled":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-gray-700 text-white";

    }

  }

  return (

    <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#111111]">

      <table className="min-w-full">

        <thead className="border-b border-gray-800 bg-[#181818]">

          <tr>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Request ID
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Customer
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Mobile
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Brand
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Model
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Status
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-300">
              Date
            </th>

            <th className="px-5 py-4 text-center text-sm font-semibold text-gray-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {requests.map((request) => (

            <tr
              key={request.id}
              className="border-b border-gray-800 hover:bg-[#1A1A1A]"
            >

              <td className="px-5 py-4 font-semibold text-yellow-400">
                {request.requestId}
              </td>

              <td className="px-5 py-4 text-white">
                {request.customerName}
              </td>

              <td className="px-5 py-4 text-gray-300">
                {request.mobile}
              </td>

              <td className="px-5 py-4 text-gray-300">
                {request.brand}
              </td>

              <td className="px-5 py-4 text-gray-300">
                {request.model}
              </td>

              <td className="px-5 py-4">

                <span
                  className={`rounded-lg px-3 py-1 text-xs font-semibold ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>

              </td>

              <td className="px-5 py-4 text-gray-400">
                {new Date(request.createdAt).toLocaleDateString()}
              </td>

              <td className="px-5 py-4">

                <div className="flex items-center justify-center gap-2">

                  <a
                    href={`tel:${request.mobile}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Call
                  </a>

                  <a
                    href={`https://wa.me/91${request.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
                  >
                    WhatsApp
                  </a>

                  <Link
                    href={`/admin/website-requests/${request.id}`}
                    className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
                  >
                    View
                  </Link>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}