import {
  collection,
  deleteDoc,
  doc,
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

// ==========================================
// Financial Year
// ==========================================

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

// ==========================================
// Extract Invoice Number
// ==========================================

function getInvoiceSequence(
  invoiceNo?: string
): number {
  if (!invoiceNo) {
    return 0;
  }

  const parts =
    invoiceNo.split("-");

  const lastPart =
    parts[parts.length - 1];

  const value =
    Number(lastPart);

  return Number.isFinite(
    value
  )
    ? value
    : 0;
}

// ==========================================
// Get All Invoices
// ==========================================

export async function getInvoices(): Promise<
  Invoice[]
> {
  try {
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTION
        )
      );

    const invoices =
      snapshot.docs.map(
        (document) => ({
          id: document.id,

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
      "Error getting invoices:",
      error
    );

    return [];
  }
}

// ==========================================
// Get Single Invoice
// ==========================================

export async function getInvoiceById(
  id: string
): Promise<Invoice | null> {
  try {
    const snapshot =
      await getDocs(
        query(
          collection(
            db,
            COLLECTION
          ),
          where(
            "__name__",
            "==",
            id
          ),
          limit(1)
        )
      );

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

// ==========================================
// Get Invoices By Mobile
// ==========================================

export async function getInvoicesByMobile(
  mobile: string
): Promise<Invoice[]> {
  try {
    const normalizedMobile =
      mobile.replace(
        /\D/g,
        ""
      );

    if (!normalizedMobile) {
      return [];
    }

    const q =
      query(
        collection(
          db,
          COLLECTION
        ),
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
          id: document.id,

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

// ==========================================
// Get Invoices By Repair ID
// ==========================================

export async function getInvoicesByRepairId(
  repairId: string
): Promise<Invoice[]> {
  try {
    if (!repairId) {
      return [];
    }

    const q =
      query(
        collection(
          db,
          COLLECTION
        ),
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
          id: document.id,

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

// ==========================================
// ADD INVOICE
//
// IMPORTANT:
// Invoice number is generated ONLY when
// invoice is actually saved.
// ==========================================

export async function addInvoice(
  invoice: Omit<
    Invoice,
    "id"
  >
): Promise<{
  id: string;
  invoiceNo: string;
}> {
  try {
    const invoiceRef =
      doc(
        collection(
          db,
          COLLECTION
        )
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
          // ========================================
          // READ COUNTER
          // ========================================

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

          // ========================================
          // UPDATE COUNTER
          // ========================================

          transaction.set(
            counterRef,
            {
              current: next,

              updatedAt:
                new Date().toISOString(),
            },
            {
              merge: true,
            }
          );

          // ========================================
          // SAVE INVOICE
          // ========================================

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
  } catch (error) {
    console.error(
      "Error adding invoice:",
      error
    );

    throw error;
  }
}

// ==========================================
// UPDATE INVOICE
// ==========================================

export async function updateInvoice(
  id: string,
  invoice: Omit<
    Invoice,
    "id"
  >
) {
  try {
    await updateDoc(
      doc(
        db,
        COLLECTION,
        id
      ),
      invoice
    );
  } catch (error) {
    console.error(
      "Error updating invoice:",
      error
    );

    throw error;
  }
}

// ==========================================
// DELETE INVOICE
// ==========================================

export async function deleteInvoice(
  id: string
) {
  try {
    await deleteDoc(
      doc(
        db,
        COLLECTION,
        id
      )
    );
  } catch (error) {
    console.error(
      "Error deleting invoice:",
      error
    );

    throw error;
  }
}