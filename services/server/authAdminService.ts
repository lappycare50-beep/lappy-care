import type {
  DecodedIdToken,
} from "firebase-admin/auth";

import {
  getAdminAuth,
  getAdminDb,
} from "@/lib/firebase-admin";

import type {
  AppUser,
  UserRole,
} from "@/types/user";

// =====================================================
// FIRESTORE VALUE → STRING
// =====================================================

function stringifyFirestoreValue(
  value: unknown
): string {
  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (
      value as {
        toDate?: unknown;
      }
    ).toDate === "function"
  ) {
    return (
      value as {
        toDate: () => Date;
      }
    )
      .toDate()
      .toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

// =====================================================
// ROLE NORMALIZER
// =====================================================

function normalizeRole(
  value: unknown
): UserRole {
  switch (value) {
    case "admin":
      return "admin";

    case "manager":
      return "manager";

    case "technician":
      return "technician";

    default:
      return "admin";
  }
}

// =====================================================
// SAFE TOKEN DEBUG
//
// Actual token is NEVER logged.
// =====================================================

function getTokenDebugInfo(
  token: string
) {
  try {
    const parts =
      token.split(".");

    if (parts.length !== 3) {
      return {
        jwtParts: parts.length,
        validShape: false,
      };
    }

    const payload =
      JSON.parse(
        Buffer.from(
          parts[1],
          "base64url"
        ).toString("utf8")
      );

    return {
      jwtParts:
        parts.length,

      validShape:
        true,

      issuer:
        typeof payload?.iss ===
        "string"
          ? payload.iss
          : "",

      audience:
        typeof payload?.aud ===
        "string"
          ? payload.aud
          : "",

      subjectPresent:
        typeof payload?.sub ===
          "string" &&
        payload.sub.length > 0,

      expiresAt:
        typeof payload?.exp ===
        "number"
          ? payload.exp
          : null,

      issuedAt:
        typeof payload?.iat ===
        "number"
          ? payload.iat
          : null,
    };
  } catch {
    return {
      jwtParts:
        token.split(".").length,

      validShape: false,

      decodeError: true,
    };
  }
}

// =====================================================
// VERIFY ADMIN REQUEST
// =====================================================

export async function verifyAdminRequest(
  authorizationHeader: string | null
): Promise<{
  uid: string;
  email: string;
  appUser: AppUser;
  decodedToken: DecodedIdToken;
}> {
  // ===================================================
  // Authorization Header
  // ===================================================

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith(
      "Bearer "
    )
  ) {
    throw new Error(
      "Authentication token is required."
    );
  }

  const idToken =
    authorizationHeader
      .slice(7)
      .trim();

  if (!idToken) {
    throw new Error(
      "Authentication token is missing."
    );
  }

  // ===================================================
  // Firebase Admin Auth
  // ===================================================

  const adminAuth =
    getAdminAuth();

  const adminProjectId =
    adminAuth.app.options
      .projectId ||
    process.env.FIREBASE_PROJECT_ID ||
    "";

  // ===================================================
  // SAFE DEBUG
  // ===================================================

  const tokenDebug =
    getTokenDebugInfo(
      idToken
    );

  console.log(
    "ADMIN AUTH TOKEN DEBUG:",
    {
      ...tokenDebug,

      adminProjectId,

      expectedIssuer:
        adminProjectId
          ? `https://securetoken.google.com/${adminProjectId}`
          : "",

      tokenLength:
        idToken.length,
    }
  );

  // ===================================================
  // Verify Firebase ID Token
  // ===================================================

  let decodedToken:
    DecodedIdToken;

  try {
    decodedToken =
      await adminAuth.verifyIdToken(
        idToken
      );
  } catch (error) {
    const authError =
      error as {
        code?: string;
        message?: string;
      };

    console.error(
      "Firebase verifyIdToken failed:",
      {
        code:
          authError?.code ||
          "unknown",

        message:
          authError?.message ||
          "unknown",

        adminProjectId,

        tokenIssuer:
          tokenDebug.issuer ||
          "unknown",

        tokenAudience:
          tokenDebug.audience ||
          "unknown",

        tokenExpiresAt:
          tokenDebug.expiresAt ??
          null,
      }
    );

    throw new Error(
      [
        "Firebase token verification failed.",

        `code=${
          authError?.code ||
          "unknown"
        }`,

        `message=${
          authError?.message ||
          "unknown"
        }`,
      ].join(" | ")
    );
  }

  // ===================================================
  // UID
  // ===================================================

  if (!decodedToken.uid) {
    throw new Error(
      "Firebase token does not contain a valid user ID."
    );
  }

  // ===================================================
  // Load Application User
  // ===================================================

  const db =
    getAdminDb();

  const userSnapshot =
    await db
      .collection("users")
      .doc(
        decodedToken.uid
      )
      .get();

  // ===================================================
  // Existing Admin Compatibility
  //
  // Existing admin account without Firestore
  // profile is treated as admin.
  // ===================================================

  if (
    !userSnapshot.exists
  ) {
    const fallbackUser:
      AppUser = {
      id:
        decodedToken.uid,

      email:
        decodedToken.email ||
        "",

      name:
        decodedToken.name ||
        "Admin",

      role:
        "admin",

      active:
        true,
    };

    return {
      uid:
        decodedToken.uid,

      email:
        decodedToken.email ||
        "",

      appUser:
        fallbackUser,

      decodedToken,
    };
  }

  // ===================================================
  // Firestore User Profile
  // ===================================================

  const data =
    userSnapshot.data() ||
    {};

  const appUser:
    AppUser = {
    id:
      userSnapshot.id,

    email:
      String(
        data.email ||
          decodedToken.email ||
          ""
      ),

    name:
      String(
        data.name ||
          decodedToken.name ||
          "User"
      ),

    role:
      normalizeRole(
        data.role
      ),

    active:
      data.active !== false,

    createdAt:
      data.createdAt
        ? stringifyFirestoreValue(
            data.createdAt
          )
        : undefined,

    updatedAt:
      data.updatedAt
        ? stringifyFirestoreValue(
            data.updatedAt
          )
        : undefined,
  };

  // ===================================================
  // Active Check
  // ===================================================

  if (!appUser.active) {
    throw new Error(
      "Your account is inactive. Please contact an administrator."
    );
  }

  return {
    uid:
      decodedToken.uid,

    email:
      decodedToken.email ||
      appUser.email,

    appUser,

    decodedToken,
  };
}

// =====================================================
// ROLE CHECK
// =====================================================

export function requireRole(
  appUser: AppUser,
  allowedRoles: UserRole[]
): void {
  if (
    !allowedRoles.includes(
      appUser.role
    )
  ) {
    throw new Error(
      "You do not have permission to perform this action."
    );
  }
}

// =====================================================
// ADMIN ONLY
// =====================================================

export function requireAdmin(
  appUser: AppUser
): void {
  requireRole(
    appUser,
    ["admin"]
  );
}

// =====================================================
// ADMIN + MANAGER
// =====================================================

export function requireManagerAccess(
  appUser: AppUser
): void {
  requireRole(
    appUser,
    [
      "admin",
      "manager",
    ]
  );
}

// =====================================================
// ALL STAFF
// =====================================================

export function requireStaffAccess(
  appUser: AppUser
): void {
  requireRole(
    appUser,
    [
      "admin",
      "manager",
      "technician",
    ]
  );
}