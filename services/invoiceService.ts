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
  startAfter,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  Invoice,
} from "@/types/invoice";

// =====================================================
// COLLECTIONS
// =====================================================

const COLLECTION = "invoices";

const COUNTER_COLLECTION = "counters";

// =====================================================
// FIRESTORE COLLECTION
// =====================================================

const invoiceCollection =
  collection(
    db,
    COLLECTION
  );

// =====================================================
// CONSTANTS
// =====================================================

export const INVOICE_PAGE_SIZE = 10;

// =====================================================
// INVOICE SEQUENCE
// =====================================================
//
// Example:
// WKD-INV-26-27-000086
//                         ↑
//                         86
//
// Used only where we need to sort
// invoices returned from a query
// that does not already have ordering.
// =====================================================

function getInvoiceSequence(
  invoiceNo?: string
): number {
  if (!invoiceNo) {
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
// FINANCIAL YEAR
// =====================================================
//
// Example:
// April 2026 → 26-27
// March 2027 → 26-27
// =====================================================

function getFinancialYear(): string {
  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    today.getMonth() + 1;

  if (month >= 4) {
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
// FIRESTORE DOC → INVOICE
// =====================================================

function mapInvoiceDoc(
  document: QueryDocumentSnapshot<DocumentData>
): Invoice {
  return {
    id: document.id,

    ...(document.data() as Omit<
      Invoice,
      "id"
    >),
  };
}

// =====================================================
// GET INVOICES - PAGINATED
// =====================================================
//
// IMPORTANT
//
// This is the main function for InvoiceTable.
//
// First request:
//   latest 10 invoices
//
// Next request:
//   next 10 invoices using cursor
//
// We request pageSize + 1 documents.
// The extra document tells us whether
// more invoices exist.
//
// Example:
// pageSize = 10
//
// Firestore reads max 11 docs.
// UI displays max 10 docs.
// =====================================================

export async function getInvoicesPage(
  pageSize: number = INVOICE_PAGE_SIZE,
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{
  invoices: Invoice[];
  lastDoc:
    | QueryDocumentSnapshot<DocumentData>
    | null;
  hasMore: boolean;
}> {
  try {
    const safePageSize =
      Math.max(
        1,
        Math.min(
          pageSize,
          50
        )
      );

    // =================================================
    // FIRST PAGE
    // =================================================

    if (!lastDoc) {
      const q =
        query(
          invoiceCollection,

          orderBy(
            "invoiceNo",
            "desc"
          ),

          limit(
            safePageSize + 1
          )
        );

      const snapshot =
        await getDocs(q);

      const documents =
        snapshot.docs;

      const hasMore =
        documents.length >
        safePageSize;

      const visibleDocuments =
        documents.slice(
          0,
          safePageSize
        );

      const invoices =
        visibleDocuments.map(
          mapInvoiceDoc
        );

      const newLastDoc =
        visibleDocuments.length >
        0
          ? visibleDocuments[
              visibleDocuments.length -
                1
            ]
          : null;

      return {
        invoices,

        lastDoc:
          newLastDoc,

        hasMore,
      };
    }

    // =================================================
    // NEXT PAGE
    // =================================================

    const q =
      query(
        invoiceCollection,

        orderBy(
          "invoiceNo",
          "desc"
        ),

        startAfter(
          lastDoc
        ),

        limit(
          safePageSize + 1
        )
      );

    const snapshot =
      await getDocs(q);

    const documents =
      snapshot.docs;

    const hasMore =
      documents.length >
      safePageSize;

    const visibleDocuments =
      documents.slice(
        0,
        safePageSize
      );

    const invoices =
      visibleDocuments.map(
        mapInvoiceDoc
      );

    const newLastDoc =
      visibleDocuments.length >
      0
        ? visibleDocuments[
            visibleDocuments.length -
              1
          ]
        : null;

    return {
      invoices,

      lastDoc:
        newLastDoc,

      hasMore,
    };
  } catch (error) {
    console.error(
      "Error getting paginated invoices:",
      error
    );

    throw error;
  }
}

// =====================================================
// GET ALL INVOICES
// =====================================================
//
// LEGACY / COMPATIBILITY FUNCTION
//
// ⚠️ This function reads the entire collection.
//
// Do NOT use this function inside InvoiceTable.
//
// It is kept because other existing ERP pages
// may still depend on getInvoices().
// =====================================================

export async function getInvoices(
  forceRefresh = false
): Promise<Invoice[]> {
  try {
    void forceRefresh;

    const snapshot =
      await getDocs(
        query(
          invoiceCollection,

          orderBy(
            "invoiceNo",
            "desc"
          )
        )
      );

    return snapshot.docs.map(
      mapInvoiceDoc
    );
  } catch (error) {
    console.error(
      "Error getting invoices:",
      error
    );

    return [];
  }
}

// =====================================================
// GET SINGLE INVOICE
// =====================================================

export async function getInvoiceById(
  id: string
): Promise<Invoice | null> {
  try {
    if (!id) {
      return null;
    }

    const invoiceRef =
      doc(
        db,
        COLLECTION,
        id
      );

    const snapshot =
      await getDoc(
        invoiceRef
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
        mapInvoiceDoc
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
    if (!repairId) {
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
        mapInvoiceDoc
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
//
// Uses Firestore transaction for
// safe invoice number generation.
//
// Example:
// WKD-INV-26-27-000087
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
        // =============================================
        // READ COUNTER
        // =============================================

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

        // =============================================
        // NEXT NUMBER
        // =============================================

        const next =
          current + 1;

        const generatedInvoiceNo =
          `WKD-INV-${financialYear}-${String(
            next
          ).padStart(
            6,
            "0"
          )}`;

        // =============================================
        // UPDATE COUNTER
        // =============================================

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

        // =============================================
        // CREATE INVOICE
        // =============================================

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
): Promise<void> {
  if (!id) {
    throw new Error(
      "Invoice ID is missing."
    );
  }

  await updateDoc(
    doc(
      db,
      COLLECTION,
      id
    ),
    invoice
  );
}

// =====================================================
// DELETE INVOICE
// =====================================================

export async function deleteInvoice(
  id: string
): Promise<void> {
  if (!id) {
    throw new Error(
      "Invoice ID is missing."
    );
  }

  await deleteDoc(
    doc(
      db,
      COLLECTION,
      id
    )
  );
}