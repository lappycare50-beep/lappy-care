import {
  App,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../firebase-service-account.json";

function getFirebaseAdminApp(): App {
  const existingApps = getApps();

  if (existingApps.length > 0) {
    return existingApps[0];
  }

  return initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export function getAdminDb() {
  return getFirestore(
    getFirebaseAdminApp()
  );
}