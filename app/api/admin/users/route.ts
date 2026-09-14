import {
  NextRequest,
  NextResponse,
} from "next/server";

import type {
  UserRecord,
} from "firebase-admin/auth";

import {
  getAdminAuth,
  getAdminDb,
} from "@/lib/firebase-admin";

import {
  requireAdmin,
  verifyAdminRequest,
} from "@/services/server/authAdminService";

import type {
  UserRole,
} from "@/types/user";

// =====================================================
// HELPERS
// =====================================================

function normalizeRole(
  value: unknown
): UserRole {
  switch (value) {
    case "manager":
      return "manager";

    case "technician":
      return "technician";

    case "admin":
      return "admin";

    default:
      return "admin";
  }
}

function normalizeStoredRole(
  value: unknown
): UserRole {
  switch (value) {
    case "manager":
      return "manager";

    case "technician":
      return "technician";

    case "admin":
      return "admin";

    default:
      return "admin";
  }
}

function normalizeEmail(
  value: unknown
): string {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }

  return value
    .trim()
    .toLowerCase();
}

function normalizeName(
  value: unknown
): string {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }

  return value.trim();
}

// =====================================================
// GET USERS
//
// IMPORTANT:
// We intentionally do NOT use:
// auth.listUsers(1000)
//
// Staff profiles are loaded from Firestore.
// This avoids Firebase Auth listUsers quota usage.
// =====================================================

export async function GET(
  request: NextRequest
) {
  try {
    const {
      appUser,
    } =
      await verifyAdminRequest(
        request.headers.get(
          "authorization"
        )
      );

    // Staff management is Admin only.
    requireAdmin(
      appUser
    );

    const db =
      getAdminDb();

    const snapshot =
      await db
        .collection(
          "users"
        )
        .get();

    const users =
      snapshot.docs
        .map(
          (
            document
          ) => {
            const data =
              document.data();

            return {
              id:
                document.id,

              email:
                typeof data?.email ===
                "string"
                  ? data.email
                  : "",

              name:
                typeof data?.name ===
                "string"
                  ? data.name
                  : "User",

              role:
                normalizeStoredRole(
                  data?.role
                ),

              active:
                data?.active !==
                false,

              createdAt:
                typeof data?.createdAt ===
                "string"
                  ? data.createdAt
                  : "",

              updatedAt:
                typeof data?.updatedAt ===
                "string"
                  ? data.updatedAt
                  : "",
            };
          }
        )
        .sort(
          (
            a,
            b
          ) =>
            a.name
              .toLowerCase()
              .localeCompare(
                b.name
                  .toLowerCase()
              )
        );

    return NextResponse.json(
      {
        success: true,

        users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Admin users GET error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to load users.";

    const lowerMessage =
      message.toLowerCase();

    const status =
      lowerMessage.includes(
        "permission"
      ) ||
      lowerMessage.includes(
        "authentication"
      ) ||
      lowerMessage.includes(
        "token"
      ) ||
      lowerMessage.includes(
        "unauthorized"
      )
        ? 403
        : 500;

    return NextResponse.json(
      {
        success: false,

        error:
          message,
      },
      {
        status,
      }
    );
  }
}

// =====================================================
// CREATE USER
//
// POST still uses Firebase Admin Auth because we need
// to create the actual Firebase login account.
// =====================================================

export async function POST(
  request: NextRequest
) {
  try {
    const {
      appUser,
    } =
      await verifyAdminRequest(
        request.headers.get(
          "authorization"
        )
      );

    // Admin only.
    requireAdmin(
      appUser
    );

    const body =
      await request.json();

    const name =
      normalizeName(
        body?.name
      );

    const email =
      normalizeEmail(
        body?.email
      );

    const password =
      typeof body?.password ===
      "string"
        ? body.password
        : "";

    const role =
      normalizeRole(
        body?.role
      );

    // =================================================
    // VALIDATION
    // =================================================

    if (!name) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !password ||
      password.length < 6
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Password must be at least 6 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // CREATE FIREBASE AUTH USER
    // =================================================

    const auth =
      getAdminAuth();

    const db =
      getAdminDb();

    let createdUser:
      UserRecord;

    try {
      createdUser =
        await auth.createUser({
          email,

          password,

          displayName:
            name,

          disabled:
            false,
        });
    } catch (
      authError
    ) {
      console.error(
        "Firebase create user error:",
        authError
      );

      const code =
        (
          authError as {
            code?: string;
          }
        )?.code;

      if (
        code ===
        "auth/email-already-exists"
      ) {
        return NextResponse.json(
          {
            success: false,

            error:
              "A user with this email already exists.",
          },
          {
            status: 409,
          }
        );
      }

      throw authError;
    }

    // =================================================
    // CREATE FIRESTORE PROFILE
    // =================================================

    const now =
      new Date().toISOString();

    try {
      await db
        .collection(
          "users"
        )
        .doc(
          createdUser.uid
        )
        .set(
          {
            id:
              createdUser.uid,

            email,

            name,

            role,

            active:
              true,

            createdAt:
              now,

            updatedAt:
              now,
          },
          {
            merge:
              true,
          }
        );
    } catch (
      firestoreError
    ) {
      // =================================================
      // ROLLBACK AUTH USER
      // =================================================

      try {
        await auth.deleteUser(
          createdUser.uid
        );
      } catch (
        rollbackError
      ) {
        console.error(
          "User rollback failed:",
          rollbackError
        );
      }

      throw firestoreError;
    }

    // =================================================
    // SUCCESS
    // =================================================

    return NextResponse.json(
      {
        success:
          true,

        message:
          "Staff user created successfully.",

        user: {
          id:
            createdUser.uid,

          email,

          name,

          role,

          active:
            true,

          createdAt:
            now,

          updatedAt:
            now,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Admin users POST error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create staff user.";

    const lowerMessage =
      message.toLowerCase();

    const status =
      lowerMessage.includes(
        "permission"
      ) ||
      lowerMessage.includes(
        "authentication"
      ) ||
      lowerMessage.includes(
        "token"
      ) ||
      lowerMessage.includes(
        "unauthorized"
      )
        ? 403
        : 500;

    return NextResponse.json(
      {
        success:
          false,

        error:
          message,
      },
      {
        status,
      }
    );
  }
}