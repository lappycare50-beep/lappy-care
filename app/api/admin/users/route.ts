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

function normalizeEmail(
  value: unknown
): string {
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
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value.trim();
}

// =====================================================
// DATE
// =====================================================

function firebaseDateToISOString(
  value: unknown
): string {
  if (!value) {
    return "";
  }

  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    value instanceof Date
  ) {
    return value.toISOString();
  }

  if (
    typeof value === "object" &&
    value !== null &&
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

  return "";
}

// =====================================================
// ERROR STATUS
// =====================================================

function getErrorStatus(
  error: unknown
): number {
  const message =
    error instanceof Error
      ? error.message
      : "";

  const lower =
    message.toLowerCase();

  if (
    lower.includes(
      "authentication"
    ) ||
    lower.includes(
      "token"
    ) ||
    lower.includes(
      "unauthorized"
    )
  ) {
    return 401;
  }

  if (
    lower.includes(
      "permission"
    ) ||
    lower.includes(
      "do not have permission"
    ) ||
    lower.includes(
      "admin only"
    )
  ) {
    return 403;
  }

  return 500;
}

// =====================================================
// GET STAFF
// =====================================================

export async function GET(
  request: NextRequest
) {
  try {
    // =================================================
    // VERIFY ADMIN
    // =================================================

    const {
      appUser,
    } =
      await verifyAdminRequest(
        request.headers.get(
          "authorization"
        )
      );

    requireAdmin(
      appUser
    );

    // =================================================
    // FIREBASE ADMIN
    // =================================================

    const db =
      getAdminDb();

    const auth =
      getAdminAuth();

    // =================================================
    // FIRESTORE USERS
    // =================================================

    const snapshot =
      await db
        .collection("users")
        .get();

    // =================================================
    // LOAD USERS
    // =================================================

    const users = [];

    for (
      const document of snapshot.docs
    ) {
      const data =
        document.data();

      const role =
        normalizeRole(
          data.role
        );

      // Staff management page only.
      if (
        ![
          "admin",
          "manager",
          "technician",
        ].includes(role)
      ) {
        continue;
      }

      let authUser:
        | UserRecord
        | null = null;

      try {
        authUser =
          await auth.getUser(
            document.id
          );
      } catch (authError) {
        console.warn(
          `Could not load Firebase Auth user ${document.id}:`,
          authError
        );
      }

      users.push({
        id:
          document.id,

        email:
          typeof data.email ===
          "string"
            ? data.email
            : authUser?.email ||
              "",

        name:
          typeof data.name ===
          "string"
            ? data.name
            : authUser?.displayName ||
              "User",

        role,

        active:
          data.active !== false &&
          authUser?.disabled !== true,

        firebaseDisabled:
          authUser?.disabled ??
          false,

        createdAt:
          firebaseDateToISOString(
            data.createdAt
          ) ||
          authUser?.metadata
            ?.creationTime ||
          "",

        updatedAt:
          firebaseDateToISOString(
            data.updatedAt
          ) ||
          "",

        lastSignIn:
          authUser?.metadata
            ?.lastSignInTime ||
          "",
      });
    }

    // =================================================
    // SORT
    // =================================================

    users.sort(
      (a, b) =>
        a.name
          .toLowerCase()
          .localeCompare(
            b.name.toLowerCase()
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
        : "Failed to load staff.";

    return NextResponse.json(
      {
        success: false,

        error:
          message,
      },
      {
        status:
          getErrorStatus(
            error
          ),
      }
    );
  }
}

// =====================================================
// CREATE STAFF
// =====================================================

export async function POST(
  request: NextRequest
) {
  try {
    // =================================================
    // VERIFY ADMIN
    // =================================================

    const {
      appUser,
    } =
      await verifyAdminRequest(
        request.headers.get(
          "authorization"
        )
      );

    requireAdmin(
      appUser
    );

    // =================================================
    // BODY
    // =================================================

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
    // ADMIN SERVICES
    // =================================================

    const auth =
      getAdminAuth();

    const db =
      getAdminDb();

    // =================================================
    // CREATE AUTH USER
    // =================================================

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

      if (
        code ===
        "auth/invalid-email"
      ) {
        return NextResponse.json(
          {
            success: false,

            error:
              "Invalid email address.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        code ===
        "auth/invalid-password"
      ) {
        return NextResponse.json(
          {
            success: false,

            error:
              "Invalid password.",
          },
          {
            status: 400,
          }
        );
      }

      throw authError;
    }

    // =================================================
    // FIRESTORE PROFILE
    // =================================================

    const now =
      new Date().toISOString();

    try {
      await db
        .collection("users")
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
            merge: true,
          }
        );
    } catch (
      firestoreError
    ) {
      // ===============================================
      // ROLLBACK AUTH
      // ===============================================

      try {
        await auth.deleteUser(
          createdUser.uid
        );
      } catch (
        rollbackError
      ) {
        console.error(
          "Firebase Auth rollback failed:",
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

          firebaseDisabled:
            false,

          createdAt:
            now,

          updatedAt:
            now,

          lastSignIn:
            "",
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

    return NextResponse.json(
      {
        success: false,

        error:
          message,
      },
      {
        status:
          getErrorStatus(
            error
          ),
      }
    );
  }
}