import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  Invoice,
} from "@/types/invoice";

const COLLECTION =
  "invoices";

const COUNTER_COLLECTION =
  "counters";

const invoiceCollection =
  collection(
    db,
    COLLECTION
  );

// =====================================================
// CACHE
// =====================================================

let invoicesCache:
  Invoice[] | null = null;

let invoicesCacheTime = 0;

const INVOICE_CACHE_TTL =
  30 * 1000;

// =====================================================
// INVALIDATE
// =====================================================

function invalidateInvoiceCache() {
  invoicesCache = null;
  invoicesCacheTime = 0;
}

// =====================================================
// FINANCIAL YEAR
// =====================================================

function getFinancialYear(): string {
  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    today.getMonth() + 1;

  if (
    month >= 4
  ) {
    return `${String(
      year
    ).slice(-2)}-${String(
      year + 1
    ).slice(-2)}`;
  }

  return `${String(
    year - 1
  ).slice(-2)}-${String(
    year
  ).slice(-2)}`;
}

// =====================================================
// INVOICE SEQUENCE
// =====================================================

function getInvoiceSequence(
  invoiceNo?: string
): number {
  if (
    !invoiceNo
  ) {
    return 0;
  }

  const parts =
    invoiceNo.split("-");

  const lastPart =
    parts[
      parts.length - 1
    ];

  const value =
    Number(lastPart);

  return Number.isFinite(
    value
  )
    ? value
    : 0;
}

// =====================================================
// GET ALL INVOICES
// =====================================================

export async function getInvoices(
  forceRefresh = false
): Promise<Invoice[]> {
  const now =
    Date.now();

  if (
    !forceRefresh &&
    invoicesCache &&
    now -
      invoicesCacheTime <
      INVOICE_CACHE_TTL
  ) {
    return invoicesCache;
  }

  const snapshot =
    await getDocs(
      invoiceCollection
    );

  const invoices =
    snapshot.docs.map(
      (document) => ({
        id:
          document.id,

        ...(document.data() as Omit<
          Invoice,
          "id"
        >),
      })
    );

  invoices.sort(
    (a, b) =>
      getInvoiceSequence(
        b.invoiceNo
      ) -
      getInvoiceSequence(
        a.invoiceNo
      )
  );

  invoicesCache =
    invoices;

  invoicesCacheTime =
    now;

  return invoices;
}

// =====================================================
// GET SINGLE INVOICE
// =====================================================

export async function getInvoiceById(
  id: string
): Promise<Invoice | null> {
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
        Invoice,
        "id"
      >),
    };
  } catch (error) {
    console.error(
      "Error getting invoice:",
      error
    );

    return null;
  }
}

// =====================================================
// GET INVOICES BY MOBILE
// =====================================================

export async function getInvoicesByMobile(
  mobile: string
): Promise<Invoice[]> {
  try {
    const normalizedMobile =
      mobile.replace(
        /\D/g,
        ""
      );

    if (
      !normalizedMobile
    ) {
      return [];
    }

    const q =
      query(
        invoiceCollection,

        where(
          "mobile",
          "==",
          normalizedMobile
        ),

        limit(50)
      );

    const snapshot =
      await getDocs(q);

    const invoices =
      snapshot.docs.map(
        (document) => ({
          id:
            document.id,

          ...(document.data() as Omit<
            Invoice,
            "id"
          >),
        })
      );

    return invoices.sort(
      (a, b) =>
        getInvoiceSequence(
          b.invoiceNo
        ) -
        getInvoiceSequence(
          a.invoiceNo
        )
    );
  } catch (error) {
    console.error(
      "Error getting invoices by mobile:",
      error
    );

    return [];
  }
}

// =====================================================
// GET INVOICES BY REPAIR ID
// =====================================================

export async function getInvoicesByRepairId(
  repairId: string
): Promise<Invoice[]> {
  try {
    if (
      !repairId
    ) {
      return [];
    }

    const q =
      query(
        invoiceCollection,

        where(
          "repairId",
          "==",
          repairId
        ),

        limit(50)
      );

    const snapshot =
      await getDocs(q);

    const invoices =
      snapshot.docs.map(
        (document) => ({
          id:
            document.id,

          ...(document.data() as Omit<
            Invoice,
            "id"
          >),
        })
      );

    return invoices.sort(
      (a, b) =>
        getInvoiceSequence(
          b.invoiceNo
        ) -
        getInvoiceSequence(
          a.invoiceNo
        )
    );
  } catch (error) {
    console.error(
      "Error getting invoices by repair ID:",
      error
    );

    return [];
  }
}

// =====================================================
// ADD INVOICE
// =====================================================

export async function addInvoice(
  invoice: Omit<
    Invoice,
    "id"
  >
): Promise<{
  id: string;
  invoiceNo: string;
}> {
  const invoiceRef =
    doc(
      invoiceCollection
    );

  const financialYear =
    getFinancialYear();

  const counterRef =
    doc(
      db,
      COUNTER_COLLECTION,
      `invoice_${financialYear}`
    );

  const invoiceNo =
    await runTransaction(
      db,
      async (
        transaction
      ) => {
        const counterSnapshot =
          await transaction.get(
            counterRef
          );

        const current =
          counterSnapshot.exists()
            ? Number(
                counterSnapshot
                  .data()
                  .current || 0
              )
            : 0;

        const next =
          current + 1;

        const generatedInvoiceNo =
          `WKD-INV-${financialYear}-${String(
            next
          ).padStart(
            6,
            "0"
          )}`;

        transaction.set(
          counterRef,
          {
            current:
              next,

            updatedAt:
              new Date().toISOString(),
          },
          {
            merge:
              true,
          }
        );

        transaction.set(
          invoiceRef,
          {
            ...invoice,

            invoiceNo:
              generatedInvoiceNo,
          }
        );

        return generatedInvoiceNo;
      }
    );

  invalidateInvoiceCache();

  return {
    id:
      invoiceRef.id,

    invoiceNo,
  };
}

// =====================================================
// UPDATE INVOICE
// =====================================================

export async function updateInvoice(
  id: string,
  invoice: Omit<
    Invoice,
    "id"
  >
) {
  await updateDoc(
    doc(
      db,
      COLLECTION,
      id
    ),
    invoice
  );

  invalidateInvoiceCache();
}

// =====================================================
// DELETE INVOICE
// =====================================================

export async function deleteInvoice(
  id: string
) {
  await deleteDoc(
    doc(
      db,
      COLLECTION,
      id
    )
  );

  invalidateInvoiceCache();
}