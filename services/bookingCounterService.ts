import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

// ==========================================
// Collection
// ==========================================

const COLLECTION = "counters";

// ==========================================
// Booking Counter Configuration
// ==========================================

const CONFIG = {
  prefix: "BR",
  digits: 6,
};

// ==========================================
// Generate Booking Request ID
// Example:
// BR000001
// BR000002
// BR000003
// ==========================================

export async function generateBookingRequestId() {

  const counterRef = doc(
    db,
    COLLECTION,
    "bookingRequest"
  );

  const bookingId =
    await runTransaction(
      db,
      async (transaction) => {

        const snapshot =
          await transaction.get(counterRef);

        let current = 0;

        if (snapshot.exists()) {

          current =
            snapshot.data().current || 0;

        }

        current++;

        transaction.set(
          counterRef,
          {
            current,
            updatedAt:
              new Date().toISOString(),
          },
          { merge: true }
        );

        return (
          CONFIG.prefix +
          current
            .toString()
            .padStart(
              CONFIG.digits,
              "0"
            )
        );

      }
    );

  return bookingId;

}