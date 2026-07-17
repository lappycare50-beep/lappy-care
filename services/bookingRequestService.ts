import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { BookingRequest } from "@/types/bookingRequest";

import { generateBookingRequestId } from "./bookingCounterService";

// ==========================================
// Collection
// ==========================================

const COLLECTION = "bookingRequests";

// ==========================================
// Add Booking Request
// ==========================================

export async function addBookingRequest(
  data: Omit<
    BookingRequest,
    | "id"
    | "requestId"
    | "status"
    | "source"
    | "assignedTo"
    | "remarks"
    | "pickupDate"
    | "pickupTime"
    | "convertedRepairId"
    | "convertedAt"
    | "timeline"
    | "createdAt"
    | "updatedAt"
  >
): Promise<string> {

  const now = new Date().toISOString();

  const requestId =
    await generateBookingRequestId();

  const booking: Omit<BookingRequest, "id"> = {

    ...data,

    requestId,

    status: "Pending",

    source: "Website",

    assignedTo: "",

    remarks: "",

    pickupDate: "",

    pickupTime: "",

    convertedRepairId: "",

    convertedAt: "",

    timeline: [
      {
        status: "Pending",
        date: now,
        updatedBy: "Website",
      },
    ],

    createdAt: now,

    updatedAt: now,

  };

  const docRef = await addDoc(
    collection(db, COLLECTION),
    booking
  );

  await updateDoc(docRef, {
    id: docRef.id,
  });

  // Return Business Booking ID
  return requestId;

}

// ==========================================
// Get All Booking Requests
// ==========================================

export async function getBookingRequests(): Promise<BookingRequest[]> {

  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    ...(document.data() as Omit<BookingRequest, "id">),
    id: document.id,
  }));

}

// ==========================================
// Get Booking Request By ID
// ==========================================

export async function getBookingRequestById(
  id: string
): Promise<BookingRequest | null> {

  const snapshot = await getDoc(
    doc(db, COLLECTION, id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    ...(snapshot.data() as Omit<BookingRequest, "id">),
    id: snapshot.id,
  };

}

// ==========================================
// Update Booking
// ==========================================

export async function updateBookingRequest(
  id: string,
  data: Partial<BookingRequest>
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    {
      ...data,
      updatedAt: new Date().toISOString(),
    }
  );

}

// ==========================================
// Update Booking Status
// ==========================================

export async function updateBookingStatus(
  booking: BookingRequest,
  status: BookingRequest["status"],
  updatedBy = "Admin"
) {

  const timeline = [
    ...(booking.timeline ?? []),
    {
      status,
      date: new Date().toISOString(),
      updatedBy,
    },
  ];

  await updateDoc(
    doc(db, COLLECTION, booking.id!),
    {
      status,
      timeline,
      updatedAt: new Date().toISOString(),
    }
  );

}

// ==========================================
// Update Remarks
// ==========================================

export async function updateBookingRemarks(
  id: string,
  remarks: string
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    {
      remarks,
      updatedAt: new Date().toISOString(),
    }
  );

}

// ==========================================
// Assign Technician
// ==========================================

export async function assignBookingTechnician(
  id: string,
  assignedTo: string
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    {
      assignedTo,
      updatedAt: new Date().toISOString(),
    }
  );

}

// ==========================================
// Schedule Pickup
// ==========================================

export async function schedulePickup(
  id: string,
  pickupDate: string,
  pickupTime: string
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    {
      pickupDate,
      pickupTime,
      updatedAt: new Date().toISOString(),
    }
  );

}

// ==========================================
// Mark As Converted
// ==========================================

export async function markBookingConverted(
  id: string,
  repairId: string
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    {
      status: "Converted",
      convertedRepairId: repairId,
      convertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

}

// ==========================================
// Delete Booking
// ==========================================

export async function deleteBookingRequest(
  id: string
) {

  await deleteDoc(
    doc(db, COLLECTION, id)
  );

}