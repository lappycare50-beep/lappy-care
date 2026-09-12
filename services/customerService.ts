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

const COLLECTION =
  "customers";

const customersCollection =
  collection(
    db,
    COLLECTION
  );

// =====================================================
// CACHE
// =====================================================

let customersCache:
  Customer[] | null = null;

let customersCacheTime = 0;

const CUSTOMERS_CACHE_TTL =
  60 * 1000;

const customerMobileCache =
  new Map<
    string,
    Customer | null
  >();

// =====================================================
// INVALIDATE CACHE
// =====================================================

function invalidateCustomerCache() {
  customersCache = null;
  customersCacheTime = 0;

  customerMobileCache.clear();
}

// =====================================================
// GET ALL CUSTOMERS
// =====================================================

export async function getCustomers(
  forceRefresh = false
): Promise<Customer[]> {
  const now =
    Date.now();

  if (
    !forceRefresh &&
    customersCache &&
    now -
      customersCacheTime <
      CUSTOMERS_CACHE_TTL
  ) {
    return customersCache;
  }

  const q =
    query(
      customersCollection,

      orderBy(
        "createdAt",
        "desc"
      )
    );

  const snapshot =
    await getDocs(q);

  const result =
    snapshot.docs.map(
      (document) => ({
        id:
          document.id,

        ...(document.data() as Omit<
          Customer,
          "id"
        >),
      })
    );

  customersCache =
    result;

  customersCacheTime =
    now;

  return result;
}

// =====================================================
// GET CUSTOMER BY ID
// =====================================================

export async function getCustomerById(
  id: string
): Promise<Customer | null> {
  const snapshot =
    await getDoc(
      doc(
        db,
        COLLECTION,
        id
      )
    );

  if (
    !snapshot.exists()
  ) {
    return null;
  }

  return {
    id:
      snapshot.id,

    ...(snapshot.data() as Omit<
      Customer,
      "id"
    >),
  };
}

// =====================================================
// ADD CUSTOMER
// =====================================================

export async function addCustomer(
  customer: Omit<
    Customer,
    "id"
  >
) {
  const result =
    await addDoc(
      customersCollection,
      customer
    );

  invalidateCustomerCache();

  return result;
}

// =====================================================
// UPDATE CUSTOMER
// =====================================================

export async function updateCustomer(
  id: string,
  customer: Omit<
    Customer,
    "id"
  >
) {
  await updateDoc(
    doc(
      db,
      COLLECTION,
      id
    ),
    customer
  );

  invalidateCustomerCache();
}

// =====================================================
// DELETE CUSTOMER
// =====================================================

export async function deleteCustomer(
  id: string
) {
  await deleteDoc(
    doc(
      db,
      COLLECTION,
      id
    )
  );

  invalidateCustomerCache();
}

// =====================================================
// FIND CUSTOMER BY MOBILE
// =====================================================

export async function findCustomerByMobile(
  mobile: string,
  forceRefresh = false
): Promise<Customer | null> {
  const normalizedMobile =
    mobile.replace(
      /\D/g,
      ""
    );

  if (
    normalizedMobile.length !==
    10
  ) {
    return null;
  }

  if (
    !forceRefresh &&
    customerMobileCache.has(
      normalizedMobile
    )
  ) {
    return (
      customerMobileCache.get(
        normalizedMobile
      ) || null
    );
  }

  const q =
    query(
      customersCollection,

      where(
        "mobile",
        "==",
        normalizedMobile
      ),

      limit(1)
    );

  const snapshot =
    await getDocs(q);

  if (
    snapshot.empty
  ) {
    customerMobileCache.set(
      normalizedMobile,
      null
    );

    return null;
  }

  const customer:
    Customer = {
    id:
      snapshot.docs[0].id,

    ...(snapshot.docs[0]
      .data() as Omit<
      Customer,
      "id"
    >),
  };

  customerMobileCache.set(
    normalizedMobile,
    customer
  );

  return customer;
}

// =====================================================
// ALIAS
// =====================================================

export const getCustomerByMobile =
  findCustomerByMobile;

// =====================================================
// SEARCH CUSTOMERS
// =====================================================

export async function searchCustomers(
  keyword: string
): Promise<Customer[]> {
  const search =
    keyword
      .toLowerCase()
      .trim();

  if (
    !search
  ) {
    return getCustomers();
  }

  const customers =
    await getCustomers();

  return customers.filter(
    (customer) =>
      customer.customerId
        .toLowerCase()
        .includes(search) ||

      customer.name
        .toLowerCase()
        .includes(search) ||

      customer.mobile
        .toLowerCase()
        .includes(search) ||

      (
        customer.email ??
        ""
      )
        .toLowerCase()
        .includes(search) ||

      (
        customer.companyName ??
        ""
      )
        .toLowerCase()
        .includes(search)
  );
}

// =====================================================
// SYNC CUSTOMER
// =====================================================

export async function syncCustomer(
  data: {
    name: string;
    mobile: string;
    alternateMobile?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    repairId?: string;
  }
) {
  const mobile =
    data.mobile.replace(
      /\D/g,
      ""
    );

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const now =
    new Date().toISOString();

  const existing =
    await findCustomerByMobile(
      mobile
    );

  if (
    existing
  ) {
    const updatedCustomer:
      Omit<
        Customer,
        "id"
      > = {
      ...existing,

      name:
        data.name,

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

      lastVisit:
        today,

      updatedAt:
        now,
    };

    await updateCustomer(
      existing.id!,
      updatedCustomer
    );

    return existing.customerId;
  }

  const customerId =
    await generateId(
      "customer"
    );

  await addCustomer({
    customerId,

    name:
      data.name,

    mobile,

    alternateMobile:
      data.alternateMobile ??
      "",

    email:
      data.email ??
      "",

    address:
      data.address ??
      "",

    city:
      data.city ??
      "",

    state:
      data.state ??
      "",

    pincode:
      data.pincode ??
      "",

    gstNumber:
      "",

    companyName:
      "",

    totalRepairs:
      1,

    totalInvoices:
      0,

    totalSpent:
      0,

    pendingAmount:
      0,

    lastRepairId:
      data.repairId ??
      "",

    lastInvoiceId:
      "",

    lastVisit:
      today,

    notes:
      "",

    isActive:
      true,

    createdAt:
      now,

    updatedAt:
      now,
  });

  return customerId;
}

// =====================================================
// UPDATE CUSTOMER INVOICE
// =====================================================

export async function updateCustomerInvoice(
  mobile: string,
  grandTotal: number,
  pendingAmount: number,
  invoiceId?: string
) {
  const customer =
    await findCustomerByMobile(
      mobile.replace(
        /\D/g,
        ""
      )
    );

  if (
    !customer
  ) {
    return;
  }

  await updateCustomer(
    customer.id!,
    {
      ...customer,

      totalInvoices:
        customer.totalInvoices +
        1,

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

// =====================================================
// UPDATE CUSTOMER REPAIR
// =====================================================

export async function updateCustomerRepair(
  mobile: string,
  repairId: string
) {
  const customer =
    await findCustomerByMobile(
      mobile.replace(
        /\D/g,
        ""
      )
    );

  if (
    !customer
  ) {
    return;
  }

  await updateCustomer(
    customer.id!,
    {
      ...customer,

      totalRepairs:
        customer.totalRepairs +
        1,

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