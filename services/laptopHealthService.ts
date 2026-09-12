// ==========================================
// Laptop Health Service
// ==========================================

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

import {
  LaptopHealth,
} from "@/types/laptopHealth";

const COLLECTION = "laptopHealth";

const healthCollection =
  collection(
    db,
    COLLECTION
  );

// ==========================================
// Cache
// ==========================================

const HEALTH_CACHE_TTL =
  60 * 1000;

const reportsCache =
  new Map<
    string,
    {
      data: LaptopHealth[];
      time: number;
    }
  >();

const latestCache =
  new Map<
    string,
    {
      data: LaptopHealth | null;
      time: number;
    }
  >();

// ==========================================
// Helpers
// ==========================================

function isFresh(
  time: number
): boolean {
  return (
    Date.now() - time <
    HEALTH_CACHE_TTL
  );
}

function mapHealthDocument(
  document: {
    id: string;
    data: () => Record<string, unknown>;
  }
): LaptopHealth {
  return {
    id:
      document.id,

    ...(document.data() as Omit<
      LaptopHealth,
      "id"
    >),
  };
}

function invalidateCustomerCache(
  customerId?: string
) {
  if (!customerId) {
    reportsCache.clear();
    latestCache.clear();
    return;
  }

  reportsCache.delete(
    customerId
  );

  latestCache.delete(
    customerId
  );
}

// ==========================================
// Get Health Reports For Customer
// ==========================================

export async function getLaptopHealthReports(
  customerId: string,
  forceRefresh = false
): Promise<LaptopHealth[]> {
  const normalized =
    customerId.trim();

  if (!normalized) {
    return [];
  }

  const cached =
    reportsCache.get(
      normalized
    );

  if (
    !forceRefresh &&
    cached &&
    isFresh(cached.time)
  ) {
    return cached.data;
  }

  try {
    const q = query(
      healthCollection,
      where(
        "customerId",
        "==",
        normalized
      ),
      orderBy(
        "checkedAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    const reports =
      snapshot.docs.map(
        (document) =>
          mapHealthDocument({
            id:
              document.id,
            data: () =>
              document.data() as Record<
                string,
                unknown
              >,
          })
      );

    reportsCache.set(
      normalized,
      {
        data: reports,
        time: Date.now(),
      }
    );

    if (
      reports.length > 0
    ) {
      latestCache.set(
        normalized,
        {
          data: reports[0],
          time: Date.now(),
        }
      );
    } else {
      latestCache.set(
        normalized,
        {
          data: null,
          time: Date.now(),
        }
      );
    }

    return reports;
  } catch (error) {
    console.error(
      "Error getting laptop health reports:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Latest Health Report
// ==========================================

export async function getLatestLaptopHealth(
  customerId: string,
  forceRefresh = false
): Promise<LaptopHealth | null> {
  const normalized =
    customerId.trim();

  if (!normalized) {
    return null;
  }

  const cached =
    latestCache.get(
      normalized
    );

  if (
    !forceRefresh &&
    cached &&
    isFresh(cached.time)
  ) {
    return cached.data;
  }

  try {
    const q = query(
      healthCollection,
      where(
        "customerId",
        "==",
        normalized
      ),
      orderBy(
        "checkedAt",
        "desc"
      ),
      limit(1)
    );

    const snapshot =
      await getDocs(q);

    if (
      snapshot.empty
    ) {
      latestCache.set(
        normalized,
        {
          data: null,
          time: Date.now(),
        }
      );

      return null;
    }

    const document =
      snapshot.docs[0];

    const result =
      mapHealthDocument({
        id:
          document.id,
        data: () =>
          document.data() as Record<
            string,
            unknown
          >,
      });

    latestCache.set(
      normalized,
      {
        data: result,
        time: Date.now(),
      }
    );

    return result;
  } catch (error) {
    console.error(
      "Error getting latest laptop health:",
      error
    );

    return null;
  }
}

// ==========================================
// Get Health Report By ID
// ==========================================

export async function getLaptopHealthById(
  id: string
): Promise<LaptopHealth | null> {
  if (!id) {
    return null;
  }

  try {
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
        LaptopHealth,
        "id"
      >),
    };
  } catch (error) {
    console.error(
      "Error getting laptop health by ID:",
      error
    );

    return null;
  }
}

// ==========================================
// Create Health Report
// ==========================================

export async function addLaptopHealth(
  health: Omit<
    LaptopHealth,
    "id"
  >
) {
  const result =
    await addDoc(
      healthCollection,
      health
    );

  invalidateCustomerCache(
    health.customerId
  );

  return result;
}

// ==========================================
// Update Health Report
// ==========================================

export async function updateLaptopHealth(
  id: string,
  health: Omit<
    LaptopHealth,
    "id"
  >
) {
  await updateDoc(
    doc(
      db,
      COLLECTION,
      id
    ),
    health
  );

  invalidateCustomerCache(
    health.customerId
  );
}

// ==========================================
// Delete Health Report
// ==========================================

export async function deleteLaptopHealth(
  id: string
) {
  const health =
    await getLaptopHealthById(
      id
    );

  await deleteDoc(
    doc(
      db,
      COLLECTION,
      id
    )
  );

  invalidateCustomerCache(
    health?.customerId
  );
}

// ==========================================
// Create Or Update Latest Health Report
// ==========================================

export async function saveLaptopHealth(
  customerId: string,
  health: Omit<
    LaptopHealth,
    "id"
  >
) {
  const existing =
    await getLatestLaptopHealth(
      customerId
    );

  if (
    existing?.id
  ) {
    await updateLaptopHealth(
      existing.id,
      health
    );

    return existing.id;
  }

  const result =
    await addLaptopHealth(
      health
    );

  return result.id;
}
