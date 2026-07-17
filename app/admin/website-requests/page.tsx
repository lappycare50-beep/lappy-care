"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import WebsiteRequestTable from "@/components/admin/WebsiteRequestTable";

import { getBookingRequests } from "@/services/bookingRequestService";

import type { BookingRequest } from "@/types/bookingRequest";

export default function WebsiteRequestsPage() {

  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadRequests() {

      try {

        const data = await getBookingRequests();

        setRequests(data);

      } catch (error) {

        console.error("Failed to load booking requests:", error);

      } finally {

        setLoading(false);

      }

    }

    loadRequests();

  }, []);

  return (

    <AdminLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Website Booking Requests
          </h1>

          <p className="mt-2 text-gray-400">
            All Book Repair requests submitted from the website.
          </p>

        </div>

        <WebsiteRequestTable
          requests={requests}
          loading={loading}
        />

      </div>

    </AdminLayout>

  );

}