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
      throw new Error(
        "Invalid user role."
      );
  }
}

function normalizeEmail(
  value: unknown
) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .trim()
    .toLowerCase();
}

function normalizeName(
  value: unknown
) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value.trim();
}

// =====================================================
// GET USERS
// =====================================================

export async function GET(
  request: NextRequest
) {
  try {
    const {
      appUser,
    } = await verifyAdminRequest(
      request.headers.get(
        "authorization"
      )
    );

    requireAdmin(
      appUser
    );

    const auth =
      getAdminAuth();

    const db =
      getAdminDb();

    const list =
      await auth.listUsers(
        1000
      );

    const firestoreUsers =
      await Promise.all(
        list.users.map(
          async (
            user
          ) => {
            const snapshot =
              await db
                .collection(
                  "users"
                )
                .doc(
                  user.uid
                )
                .get();

            const data =
              snapshot.exists
                ? snapshot.data()
                : null;

            return {
              id:
                user.uid,

              email:
                user.email ||
                data?.email ||
                "",

              name:
                data?.name ||
                user.displayName ||
                "User",

              role:
                normalizeStoredRole(
                  data?.role
                ),

              active:
                data?.active !== false &&
                !user.disabled,

              firebaseDisabled:
                user.disabled,

              createdAt:
                data?.createdAt ||
                user.metadata
                  .creationTime ||
                "",

              lastSignIn:
                user.metadata
                  .lastSignInTime ||
                "",
            };
          }
        )
      );

    firestoreUsers.sort(
      (a, b) =>
        a.name
          .toLowerCase()
          .localeCompare(
            b.name
              .toLowerCase()
          )
    );

    return NextResponse.json({
      success: true,
      users: firestoreUsers,
    });
  } catch (error) {
    console.error(
      "Admin users GET error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to load users.";

    const status =
      message.includes(
        "permission"
      ) ||
      message.includes(
        "Authentication"
      ) ||
      message.includes(
        "token"
      )
        ? 403
        : 500;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status,
      }
    );
  }
}

// =====================================================
// CREATE USER
// =====================================================

export async function POST(
  request: NextRequest
) {
  try {
    const {
      appUser,
    } = await verifyAdminRequest(
      request.headers.get(
        "authorization"
      )
    );

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
    } catch (authError) {
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
              new Date()
                .toISOString(),

            updatedAt:
              new Date()
                .toISOString(),
          },
          {
            merge: true,
          }
        );
    } catch (firestoreError) {
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

    return NextResponse.json(
      {
        success: true,

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

    const status =
      message.includes(
        "permission"
      ) ||
      message.includes(
        "Authentication"
      ) ||
      message.includes(
        "token"
      )
        ? 403
        : 500;

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status,
      }
    );
  }
}

// =====================================================
// NORMALIZE STORED ROLE
// =====================================================

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