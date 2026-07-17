"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";

import CustomerCard from "@/components/admin/website-request/CustomerCard";
import DeviceCard from "@/components/admin/website-request/DeviceCard";
import ServiceCard from "@/components/admin/website-request/ServiceCard";
import AdminCard from "@/components/admin/website-request/AdminCard";
import TimelineCard from "@/components/admin/website-request/TimelineCard";
import QuickActionsCard from "@/components/admin/website-request/QuickActionsCard";
import ConvertCard from "@/components/admin/website-request/ConvertCard";

import {
  getBookingRequestById,
  updateBookingRequest,
} from "@/services/bookingRequestService";

import {
  addRepair,
} from "@/services/repairService";

import {
  syncCustomer,
} from "@/services/customerService";

import {
  generateId,
} from "@/services/idGenerator";

import type { BookingRequest } from "@/types/bookingRequest";
import type { Repair } from "@/types/repair";

export default function WebsiteRequestDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const [request, setRequest] =
    useState<BookingRequest | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [converting, setConverting] =
    useState(false);

  const [status, setStatus] =
    useState<BookingRequest["status"]>("Pending");

  const [technician, setTechnician] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [pickupDate, setPickupDate] =
    useState("");

  const [pickupTime, setPickupTime] =
    useState("");

  // ==========================================
  // Load Booking Request
  // ==========================================

  async function loadRequest() {

    try {

      const data =
        await getBookingRequestById(id);

      if (!data) {

        setLoading(false);

        return;

      }

      setRequest(data);

      setStatus(data.status);

      setTechnician(
        data.assignedTo ?? ""
      );

      setRemarks(
        data.remarks ?? ""
      );

      setPickupDate(
        data.pickupDate ?? ""
      );

      setPickupTime(
        data.pickupTime ?? ""
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  // ==========================================
  // Save Changes
  // ==========================================

  async function saveChanges() {

    if (!request) return;

    try {

      setSaving(true);

      let timeline =
        request.timeline ?? [];

      if (status !== request.status) {

        timeline = [

          ...timeline,

          {

            status,

            date:
              new Date().toISOString(),

            updatedBy:
              technician || "Admin",

          },

        ];

      }

      await updateBookingRequest(
        request.id!,
        {

          status,

          assignedTo:
            technician,

          remarks,

          pickupDate,

          pickupTime,

          timeline,

        }
      );

      setRequest({

        ...request,

        status,

        assignedTo:
          technician,

        remarks,

        pickupDate,

        pickupTime,

        timeline,

      });

      alert(
        "Booking updated successfully."
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update booking."
      );

    } finally {

      setSaving(false);

    }

  }

  // ==========================================
  // Convert To Repair
  // ==========================================

  async function convertToRepair() {
      

    if (!request) return;

    try {

      setConverting(true);

      const repairId =
        await generateId("repair");

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

          repairId,

        });

      const now =
        new Date().toISOString();

      const repair: Repair = {

        repairId,

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

        },

        device: {

          type: "Laptop",

          brand:
            request.brand,

          model:
            request.model,

          serialNo: "",

        },

        accessories: {

          items: [],

          other: "",

        },

        problem: {

          complaint:
            request.problem,

          physicalCondition: "",

        },

        estimate: {

          labourCharge: 0,

          partsCharge: 0,

          discount: 0,

          totalAmount: 0,

          advancePaid: 0,

          balanceAmount: 0,

          expectedDelivery: "",

          technician,

          priority: "Medium",

        },

        paymentStatus:
          "Pending",

        status:
          "Received",

        warranty:
          "No Warranty",

        remarks,

        createdAt:
          now,

        updatedAt:
          now,

        timeline: [

          {

            status:
              "Received",

            createdAt:
              now,

            updatedBy:
              technician || "Website",

            note:
              "Converted from Website Booking",

          },

        ],

      };

      const repairDoc =
        await addRepair(repair);

      const convertedAt =
        new Date().toISOString();

      await updateBookingRequest(
        request.id!,
        {

          status:
            "Converted",

          assignedTo:
            technician,

          remarks,

          pickupTime,

convertedRepairId: repairId,
convertedRepairDocId: repairDoc.id,

convertedAt,

timeline: [
  ...(request.timeline ?? []),
  {
    status: "Converted",
    date: convertedAt,
    updatedBy: technician || "Admin",
  },
],

        }
      );

      alert(
        "Booking converted successfully."
      );

      router.push(
        `/admin/repairs/${repairDoc.id}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to convert booking."
      );

    } finally {

      setConverting(false);

    }

  }
    // ==========================================
  // Load Data
  // ==========================================

  useEffect(() => {
    if (id) {
      loadRequest();
    }
  }, [id]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-gray-800 bg-[#111111] p-10 text-center text-white">
          Loading Booking Request...
        </div>
      </AdminLayout>
    );
  }

  // ==========================================
  // Not Found
  // ==========================================

  if (!request) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-gray-800 bg-[#111111] p-10 text-center text-red-400">
          Booking Request Not Found
        </div>
      </AdminLayout>
    );
  }

  // ==========================================
  // Page
  // ==========================================

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {request.requestId}
              </h1>

              <p className="mt-2 text-gray-400">
                Website Booking Request
              </p>
            </div>

            <span className="rounded-xl bg-yellow-400 px-5 py-2 font-bold text-black">
              {status}
            </span>
          </div>
        </div>

        {/* Customer */}

        <CustomerCard request={request} />

        {/* Device */}

        <DeviceCard request={request} />

        {/* Pickup */}

        <ServiceCard
          pickupRequired={request.pickupRequired}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          onPickupDateChange={setPickupDate}
          onPickupTimeChange={setPickupTime}
        />

        {/* Admin */}

        <AdminCard
          status={status}
          technician={technician}
          remarks={remarks}
          saving={saving}
          onStatusChange={setStatus}
          onTechnicianChange={setTechnician}
          onRemarksChange={setRemarks}
          onSave={saveChanges}
        />

        {/* Timeline */}

        <TimelineCard
          timeline={request.timeline ?? []}
        />

        {/* Quick Actions */}

        <QuickActionsCard
          request={request}
          onPrint={() => window.print()}
        />

        {/* Convert To Repair */}

        <ConvertCard
          converted={request.status === "Converted"}
          repairId={request.convertedRepairId}
          repairDocId={request.convertedRepairDocId}
          converting={converting}
          onConvert={convertToRepair}
        />

      </div>
    </AdminLayout>
  );
}