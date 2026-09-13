import {
  App,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import {
  getAuth,
} from "firebase-admin/auth";

import {
  getFirestore,
} from "firebase-admin/firestore";

// =====================================================
// Firebase Admin App
// =====================================================

function getFirebaseAdminApp(): App {
  const existingApps =
    getApps();

  if (existingApps.length > 0) {
    return existingApps[0];
  }

  // ===================================================
  // Environment Variables
  // ===================================================

  const projectId =
    process.env.FIREBASE_PROJECT_ID;

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL;

  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY;

  if (
    !projectId ||
    !clientEmail ||
    !privateKey
  ) {
    throw new Error(
      "Firebase Admin environment variables are missing."
    );
  }

  // ===================================================
  // Initialize Firebase Admin
  // ===================================================

  return initializeApp({
    credential:
      cert({
        projectId,

        clientEmail,

        privateKey:
          privateKey.replace(
            /\\n/g,
            "\n"
          ),
      }),
  });
}

// =====================================================
// Firebase Admin Firestore
// =====================================================

export function getAdminDb() {
  return getFirestore(
    getFirebaseAdminApp()
  );
}

// =====================================================
// Firebase Admin Authentication
// =====================================================

export function getAdminAuth() {
  return getAuth(
    getFirebaseAdminApp()
  );
}