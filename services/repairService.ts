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
  startAfter,
  updateDoc,
  where,
  DocumentReference,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Repair } from "@/types/repair";

// ==========================================
// Collection
// ==========================================

const COLLECTION = "repairs";

const repairsCollection =
  collection(db, COLLECTION);

// ==========================================
// Cache
// ==========================================

let repairsCache: Repair[] | null = null;
let repairsCacheTime = 0;

const REPAIRS_CACHE_TTL =
  60 * 1000;

const mobileRepairsCache =
  new Map<string, Repair[]>();

const customerRepairsCache =
  new Map<string, Repair[]>();

// ==========================================
// Pagination
// ==========================================

export const REPAIRS_PAGE_SIZE = 20;

export type RepairsPage = {
  repairs: Repair[];
  lastDoc:
    | QueryDocumentSnapshot<DocumentData>
    | null;
  hasMore: boolean;
};

// ==========================================
// Helpers
// ==========================================

function normalizeMobile(
  mobile: string
): string {
  return mobile.replace(/\D/g, "");
}

function mapRepair(
  document: {
    id: string;
    data: () => Record<string, unknown>;
  }
): Repair {
  return {
    id: document.id,

    ...(document.data() as Omit<
      Repair,
      "id"
    >),
  };
}

function invalidateRepairsCache() {
  repairsCache = null;
  repairsCacheTime = 0;

  mobileRepairsCache.clear();
  customerRepairsCache.clear();
}

// ==========================================
// Get First 20 Repairs
// ==========================================

export async function getRepairsPage(
  pageSize = REPAIRS_PAGE_SIZE
): Promise<RepairsPage> {
  try {
    const safePageSize =
      Math.min(
        Math.max(pageSize, 1),
        100
      );

    const q = query(
      repairsCollection,
      orderBy(
        "createdAt",
        "desc"
      ),
      limit(safePageSize)
    );

    const snapshot =
      await getDocs(q);

    const repairs =
      snapshot.docs.map(
        (document) =>
          mapRepair({
            id: document.id,
            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          })
      );

    const lastDoc =
      snapshot.docs.length > 0
        ? snapshot.docs[
            snapshot.docs.length - 1
          ]
        : null;

    return {
      repairs,
      lastDoc,
      hasMore:
        snapshot.docs.length ===
        safePageSize,
    };
  } catch (error) {
    console.error(
      "Error getting repairs page:",
      error
    );

    return {
      repairs: [],
      lastDoc: null,
      hasMore: false,
    };
  }
}

// ==========================================
// Get Next 20 Repairs
// ==========================================

export async function getMoreRepairs(
  lastDoc:
    | QueryDocumentSnapshot<DocumentData>
    | null,
  pageSize = REPAIRS_PAGE_SIZE
): Promise<RepairsPage> {
  try {
    if (!lastDoc) {
      return {
        repairs: [],
        lastDoc: null,
        hasMore: false,
      };
    }

    const safePageSize =
      Math.min(
        Math.max(pageSize, 1),
        100
      );

    const q = query(
      repairsCollection,
      orderBy(
        "createdAt",
        "desc"
      ),
      startAfter(lastDoc),
      limit(safePageSize)
    );

    const snapshot =
      await getDocs(q);

    const repairs =
      snapshot.docs.map(
        (document) =>
          mapRepair({
            id: document.id,
            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          })
      );

    const nextLastDoc =
      snapshot.docs.length > 0
        ? snapshot.docs[
            snapshot.docs.length - 1
          ]
        : null;

    return {
      repairs,
      lastDoc: nextLastDoc,
      hasMore:
        snapshot.docs.length ===
        safePageSize,
    };
  } catch (error) {
    console.error(
      "Error getting more repairs:",
      error
    );

    return {
      repairs: [],
      lastDoc: null,
      hasMore: false,
    };
  }
}

// ==========================================
// Search Repairs
//
// Searches Firestore directly so older repairs
// can also be found without loading everything.
// ==========================================

export async function searchRepairs(
  keyword: string
): Promise<Repair[]> {
  try {
    const search =
      keyword
        .trim()
        .toLowerCase();

    if (!search) {
      return [];
    }

    // --------------------------------------
    // First check cached/latest repairs
    // --------------------------------------

    const latestPage =
      await getRepairsPage(20);

    const localMatches =
      latestPage.repairs.filter(
        (repair) =>
          (repair.repairId ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.customer?.name ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.customer?.mobile ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.device?.brand ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.device?.model ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.problem?.complaint ?? "")
            .toLowerCase()
            .includes(search)
      );

    // --------------------------------------
    // Firestore cannot do general
    // contains search across multiple fields.
    //
    // To preserve existing behaviour for
    // all older records, we fetch the full
    // collection only when searching.
    // --------------------------------------

    const q = query(
      repairsCollection,
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    const repairs =
      snapshot.docs.map(
        (document) =>
          mapRepair({
            id: document.id,
            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          })
      );

    const unique =
      new Map<string, Repair>();

    for (const repair of [
      ...localMatches,
      ...repairs,
    ]) {
      if (repair.id) {
        unique.set(
          repair.id,
          repair
        );
      }
    }

    return Array.from(
      unique.values()
    )
      .filter(
        (repair) =>
          (repair.repairId ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.customer?.name ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.customer?.mobile ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.device?.brand ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.device?.model ?? "")
            .toLowerCase()
            .includes(search) ||
          (repair.problem?.complaint ?? "")
            .toLowerCase()
            .includes(search)
      );
  } catch (error) {
    console.error(
      "Error searching repairs:",
      error
    );

    return [];
  }
}

// ==========================================
// Get All Repairs
//
// Kept for backward compatibility.
//
// NOTE:
// This still loads all repairs.
// New RepairTable should use
// getRepairsPage() + getMoreRepairs().
// ==========================================

export async function getRepairs(
  forceRefresh = false
): Promise<Repair[]> {
  try {
    const now =
      Date.now();

    if (
      !forceRefresh &&
      repairsCache &&
      now -
        repairsCacheTime <
        REPAIRS_CACHE_TTL
    ) {
      return repairsCache;
    }

    const q =
      query(
        repairsCollection,
        orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await getDocs(q);

    const repairs =
      snapshot.docs.map(
        (document) =>
          mapRepair({
            id: document.id,
            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          })
      );

    repairsCache =
      repairs;

    repairsCacheTime =
      now;

    return repairs;
  } catch (error) {
    console.error(
      "Error getting repairs:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Repair By Firestore ID
// ==========================================

export async function getRepairById(
  id: string
): Promise<Repair | null> {
  try {
    if (!id) {
      return null;
    }

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
      id: snapshot.id,

      ...(snapshot.data() as Omit<
        Repair,
        "id"
      >),
    };
  } catch (error) {
    console.error(
      "Error getting repair:",
      error
    );

    return null;
  }
}

// ==========================================
// Add Repair
// ==========================================

export async function addRepair(
  repair: Repair
): Promise<DocumentReference> {
  try {
    const {
      id,
      ...data
    } = repair;

    const repairRef =
      await addDoc(
        repairsCollection,
        data
      );

    invalidateRepairsCache();

    return repairRef;
  } catch (error) {
    console.error(
      "Error adding repair:",
      error
    );

    throw error;
  }
}

// ==========================================
// Update Repair
// ==========================================

export async function updateRepair(
  id: string,
  repair: Repair
): Promise<void> {
  try {
    const {
      id: _,
      ...data
    } = repair;

    await updateDoc(
      doc(
        db,
        COLLECTION,
        id
      ),
      data
    );

    invalidateRepairsCache();
  } catch (error) {
    console.error(
      "Error updating repair:",
      error
    );

    throw error;
  }
}

// ==========================================
// Delete Repair
// ==========================================

export async function deleteRepair(
  id: string
): Promise<void> {
  try {
    await deleteDoc(
      doc(
        db,
        COLLECTION,
        id
      )
    );

    invalidateRepairsCache();
  } catch (error) {
    console.error(
      "Error deleting repair:",
      error
    );

    throw error;
  }
}

// ==========================================
// Get Repairs By Mobile
// ==========================================

export async function getRepairsByMobile(
  mobile: string
): Promise<Repair[]> {
  try {
    const normalizedMobile =
      normalizeMobile(
        mobile
      );

    if (
      normalizedMobile.length !==
      10
    ) {
      return [];
    }

    const cacheKey =
      normalizedMobile;

    const cached =
      mobileRepairsCache.get(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const q =
      query(
        repairsCollection,
        where(
          "customer.mobile",
          "==",
          normalizedMobile
        ),
        orderBy(
          "createdAt",
          "desc"
        ),
        limit(20)
      );

    const snapshot =
      await getDocs(q);

    const repairs =
      snapshot.docs.map(
        (document) =>
          mapRepair({
            id: document.id,
            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          })
      );

    mobileRepairsCache.set(
      cacheKey,
      repairs
    );

    return repairs;
  } catch (error) {
    console.error(
      "Error getting repairs by mobile:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Repairs By Status
// ==========================================

export async function getRepairsByStatus(
  status: Repair["status"]
): Promise<Repair[]> {
  try {
    const q =
      query(
        repairsCollection,
        where(
          "status",
          "==",
          status
        ),
        orderBy(
          "createdAt",
          "desc"
        ),
        limit(100)
      );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (document) =>
        mapRepair({
          id: document.id,
          data: () =>
            document.data() as Record<
              string,
              unknown
            >,
        })
    );
  } catch (error) {
    console.error(
      "Error getting repairs by status:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Repairs By Customer
// ==========================================

export async function getRepairsByCustomerId(
  customerId: string,
  customerDocId?: string,
  mobile?: string
): Promise<Repair[]> {
  try {
    const businessCustomerId =
      customerId?.trim() || "";

    const normalizedMobile =
      mobile
        ? normalizeMobile(
            mobile
          )
        : "";

    const cacheKey =
      [
        businessCustomerId,
        customerDocId?.trim() || "",
        normalizedMobile,
      ].join("|");

    const cached =
      customerRepairsCache.get(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const queries:
      Promise<Repair[]>[] = [];

    if (
      businessCustomerId
    ) {
      queries.push(
        getDocs(
          query(
            repairsCollection,
            where(
              "customer.customerId",
              "==",
              businessCustomerId
            ),
            orderBy(
              "createdAt",
              "desc"
            ),
            limit(50)
          )
        ).then(
          (snapshot) =>
            snapshot.docs.map(
              (document) =>
                mapRepair({
                  id: document.id,
                  data: () =>
                    document.data() as Record<
                      string,
                      unknown
                    >,
                })
            )
        )
      );
    }

    if (
      normalizedMobile.length ===
      10
    ) {
      queries.push(
        getDocs(
          query(
            repairsCollection,
            where(
              "customer.mobile",
              "==",
              normalizedMobile
            ),
            orderBy(
              "createdAt",
              "desc"
            ),
            limit(50)
          )
        ).then(
          (snapshot) =>
            snapshot.docs.map(
              (document) =>
                mapRepair({
                  id: document.id,
                  data: () =>
                    document.data() as Record<
                      string,
                      unknown
                    >,
                })
            )
        )
      );
    }

    if (
      queries.length ===
      0
    ) {
      return [];
    }

    const resultSets =
      await Promise.all(
        queries
      );

    const unique =
      new Map<
        string,
        Repair
      >();

    for (
      const repairs of resultSets
    ) {
      for (
        const repair of repairs
      ) {
        if (repair.id) {
          unique.set(
            repair.id,
            repair
          );
        }
      }
    }

    const result =
      Array.from(
        unique.values()
      )
        .sort(
          (a, b) =>
            String(
              b.createdAt || ""
            ).localeCompare(
              String(
                a.createdAt || ""
              )
            )
        )
        .slice(0, 50);

    customerRepairsCache.set(
      cacheKey,
      result
    );

    return result;
  } catch (error) {
    console.error(
      "Error getting customer repairs:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Repair By Repair ID
// ==========================================

export async function getRepairByRepairId(
  repairId: string
): Promise<Repair | null> {
  try {
    const normalized =
      repairId?.trim();

    if (!normalized) {
      return null;
    }

    const q =
      query(
        repairsCollection,
        where(
          "repairId",
          "==",
          normalized
        ),
        limit(1)
      );

    const snapshot =
      await getDocs(q);

    if (
      snapshot.empty
    ) {
      return null;
    }

    const document =
      snapshot.docs[0];

    return {
      id: document.id,

      ...(document.data() as Omit<
        Repair,
        "id"
      >),
    };
  } catch (error) {
    console.error(
      "Error getting repair by Repair ID:",
      error
    );

    return null;
  }
}