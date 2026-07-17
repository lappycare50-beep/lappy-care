import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Customer } from "@/types/customer";

import { generateId } from "@/services/idGenerator";

const COLLECTION = "customers";

// ==========================================
// Get All Customers
// ==========================================

export async function getCustomers(): Promise<Customer[]> {

  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Customer, "id">),
  }));

}

// ==========================================
// Get Customer By ID
// ==========================================

export async function getCustomerById(
  id: string
): Promise<Customer | null> {

  const snapshot = await getDoc(
    doc(db, COLLECTION, id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Customer, "id">),
  };

}

// ==========================================
// Add Customer
// ==========================================

export async function addCustomer(
  customer: Omit<Customer, "id">
) {

  return await addDoc(
    collection(db, COLLECTION),
    customer
  );

}

// ==========================================
// Update Customer
// ==========================================

export async function updateCustomer(
  id: string,
  customer: Omit<Customer, "id">
) {

  await updateDoc(
    doc(db, COLLECTION, id),
    customer
  );

}

// ==========================================
// Delete Customer
// ==========================================

export async function deleteCustomer(
  id: string
) {

  await deleteDoc(
    doc(db, COLLECTION, id)
  );

}
// ==========================================
// Find Customer By Mobile
// ==========================================

export async function findCustomerByMobile(
  mobile: string
): Promise<Customer | null> {

  // Normalize Mobile Number
  const normalizedMobile = mobile.replace(/\D/g, "");

  const q = query(
    collection(db, COLLECTION),
    where("mobile", "==", normalizedMobile),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...(snapshot.docs[0].data() as Omit<Customer, "id">),
  };

}

// ==========================================
// Get Customer By Mobile (Alias)
// ==========================================

export const getCustomerByMobile =
  findCustomerByMobile;

// ==========================================
// Search Customers
// ==========================================

export async function searchCustomers(
  keyword: string
): Promise<Customer[]> {

  const customers =
    await getCustomers();

  const search =
    keyword.toLowerCase().trim();

  return customers.filter((customer) =>

    customer.customerId
      .toLowerCase()
      .includes(search)

    ||

    customer.name
      .toLowerCase()
      .includes(search)

    ||

    customer.mobile
      .toLowerCase()
      .includes(search)

    ||

    (customer.email ?? "")
      .toLowerCase()
      .includes(search)

    ||

    (customer.companyName ?? "")
      .toLowerCase()
      .includes(search)

  );

}
// ==========================================
// Sync Customer
// ==========================================

export async function syncCustomer(data: {
  name: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  repairId?: string;
}) {

  // Normalize Mobile
  const mobile =
    data.mobile.replace(/\D/g, "");

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const now =
    new Date().toISOString();

  // ==========================================
  // Existing Customer
  // ==========================================

  const existing =
    await findCustomerByMobile(
      mobile
    );

  if (existing) {

    const updatedCustomer: Omit<Customer, "id"> = {

      ...existing,

      name: data.name,

      mobile,

      alternateMobile:
        data.alternateMobile ??
        existing.alternateMobile,

      email:
        data.email ??
        existing.email,

      address:
        data.address ??
        existing.address,

      city:
        data.city ??
        existing.city,

      state:
        data.state ??
        existing.state,

      pincode:
        data.pincode ??
        existing.pincode,

      lastRepairId:
        data.repairId ??
        existing.lastRepairId,

      lastVisit: today,

      updatedAt: now,

    };

    await updateCustomer(
  existing.id!,
  updatedCustomer
);

return existing.customerId;

  }

  // ==========================================
  // New Customer
  // ==========================================

  const customerId =
    await generateId("customer");

  
    await addCustomer({

      customerId,

      name: data.name,

      mobile,

      alternateMobile:
        data.alternateMobile ?? "",

      email:
        data.email ?? "",

      address:
        data.address ?? "",

      city:
        data.city ?? "",

      state:
        data.state ?? "",

      pincode:
        data.pincode ?? "",

      gstNumber: "",

      companyName: "",

      totalRepairs: 1,

      totalInvoices: 0,

      totalSpent: 0,

      pendingAmount: 0,

      lastRepairId:
        data.repairId ?? "",

      lastInvoiceId: "",

      lastVisit: today,

      notes: "",

      isActive: true,

      createdAt: now,

      updatedAt: now,

    });

  return customerId;

}
// ==========================================
// Update Customer Invoice
// ==========================================

export async function updateCustomerInvoice(
  mobile: string,
  grandTotal: number,
  pendingAmount: number,
  invoiceId?: string
) {

  const customer =
    await findCustomerByMobile(
      mobile.replace(/\D/g, "")
    );

  if (!customer) return;

  await updateCustomer(
    customer.id!,
    {

      ...customer,

      totalInvoices:
        customer.totalInvoices + 1,

      totalSpent:
        customer.totalSpent +
        grandTotal,

      pendingAmount:
        customer.pendingAmount +
        pendingAmount,

      lastInvoiceId:
        invoiceId ??
        customer.lastInvoiceId,

      lastVisit:
        new Date()
          .toISOString()
          .split("T")[0],

      updatedAt:
        new Date().toISOString(),

    }
  );

}

// ==========================================
// Update Customer Repair
// ==========================================

export async function updateCustomerRepair(
  mobile: string,
  repairId: string
) {

  const customer =
    await findCustomerByMobile(
      mobile.replace(/\D/g, "")
    );

  if (!customer) return;

  await updateCustomer(
    customer.id!,
    {

      ...customer,

      totalRepairs:
        customer.totalRepairs + 1,

      lastRepairId:
        repairId,

      lastVisit:
        new Date()
          .toISOString()
          .split("T")[0],

      updatedAt:
        new Date().toISOString(),

    }
  );

}
