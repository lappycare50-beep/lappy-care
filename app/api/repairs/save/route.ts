import { NextRequest, NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebase-admin";

type UsedPart = {
  inventoryId: string;
  sku?: string;
  name?: string;
  quantity: number;
  unitPrice?: number;
  total?: number;
};

type RepairPayload = {
  id?: string;

  repairId: string;

  customer: Record<string, unknown>;

  device: Record<string, unknown>;

  accessories: Record<string, unknown>;

  problem: Record<string, unknown>;

  estimate: {
    labourCharge?: number;
    partsCharge?: number;
    discount?: number;
    totalAmount?: number;
    advancePaid?: number;
    balanceAmount?: number;
    expectedDelivery?: string;
    technician?: string;
    priority?: string;
    usedParts?: UsedPart[];
  };

  paymentStatus: string;

  status: string;

  warranty: string;

  remarks: string;

  createdAt: string;

  updatedAt: string;

  deliveredAt?: string;

  timeline: Array<Record<string, unknown>>;
};

// =====================================================
// NORMALIZE USED PARTS
// =====================================================

function normalizeUsedParts(
  parts: unknown
): UsedPart[] {
  if (!Array.isArray(parts)) {
    return [];
  }

  return parts
    .filter(
      (part) =>
        part &&
        typeof part === "object"
    )
    .map((part) => {
      const value =
        part as Record<
          string,
          unknown
        >;

      return {
        inventoryId:
          String(
            value.inventoryId ||
              ""
          ).trim(),

        sku:
          String(
            value.sku || ""
          ).trim(),

        name:
          String(
            value.name || ""
          ).trim(),

        quantity: Math.max(
          Math.floor(
            Number(
              value.quantity || 0
            )
          ),
          0
        ),

        unitPrice: Math.max(
          Number(
            value.unitPrice ||
              0
          ),
          0
        ),

        total: Math.max(
          Number(
            value.total || 0
          ),
          0
        ),
      };
    })
    .filter(
      (part) =>
        part.inventoryId &&
        part.quantity > 0
    );
}

// =====================================================
// POST
// =====================================================

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as {
        repair?: RepairPayload;
        previousRepair?: RepairPayload | null;
      };

    const repair =
      body?.repair;

    const previousRepair =
      body?.previousRepair ||
      null;

    if (!repair) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Repair data is required.",
        },
        { status: 400 }
      );
    }

    if (
      !repair.repairId?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Repair ID is required.",
        },
        { status: 400 }
      );
    }

    const db =
      getAdminDb();

    const repairs =
      db.collection(
        "repairs"
      );

    const inventory =
      db.collection(
        "inventory"
      );

    const history =
      db.collection(
        "inventoryStockHistory"
      );

    // =================================================
    // CURRENT PARTS
    // =================================================

    const currentParts =
      normalizeUsedParts(
        repair.estimate
          ?.usedParts
      );

    // =================================================
    // PREVIOUS PARTS
    // =================================================

    const previousParts =
      normalizeUsedParts(
        previousRepair
          ?.estimate?.usedParts
      );

    // =================================================
    // EDIT / NEW
    // =================================================

    const oldQuantities =
      new Map<
        string,
        number
      >();

    const newQuantities =
      new Map<
        string,
        number
      >();

    // Previous quantities
    for (
      const part of previousParts
    ) {
      oldQuantities.set(
        part.inventoryId,
        (
          oldQuantities.get(
            part.inventoryId
          ) || 0
        ) +
          part.quantity
      );
    }

    // New quantities
    for (
      const part of currentParts
    ) {
      newQuantities.set(
        part.inventoryId,
        (
          newQuantities.get(
            part.inventoryId
          ) || 0
        ) +
          part.quantity
      );
    }

    // =================================================
    // STOCK CHANGES
    // =================================================

    const changes =
      new Map<
        string,
        number
      >();

    const allInventoryIds =
      new Set<string>([
        ...oldQuantities.keys(),
        ...newQuantities.keys(),
      ]);

    for (
      const inventoryId of
        allInventoryIds
    ) {
      const oldQty =
        oldQuantities.get(
          inventoryId
        ) || 0;

      const newQty =
        newQuantities.get(
          inventoryId
        ) || 0;

      const difference =
        newQty - oldQty;

      if (
        difference !== 0
      ) {
        changes.set(
          inventoryId,
          difference
        );
      }
    }

    // =================================================
    // NEW DOCUMENT / EXISTING DOCUMENT
    // =================================================

    const repairRef =
      repair.id
        ? repairs.doc(
            repair.id
          )
        : repairs.doc();

    const now =
      new Date().toISOString();

    // =================================================
    // TRANSACTION
    // =================================================

    await db.runTransaction(
      async (
        transaction
      ) => {
        const inventorySnapshots =
          new Map<
            string,
            FirebaseFirestore.DocumentSnapshot
          >();

        // =============================================
        // READ ALL INVENTORY DOCUMENTS FIRST
        // =============================================

        for (
          const [
            inventoryId,
            difference,
          ] of changes
        ) {
          if (
            difference === 0
          ) {
            continue;
          }

          const inventoryRef =
            inventory.doc(
              inventoryId
            );

          const snapshot =
            await transaction.get(
              inventoryRef
            );

          if (
            !snapshot.exists
          ) {
            throw new Error(
              `Inventory item not found: ${inventoryId}`
            );
          }

          inventorySnapshots.set(
            inventoryId,
            snapshot
          );
        }

        // =============================================
        // VALIDATE STOCK OUT
        // =============================================

        for (
          const [
            inventoryId,
            difference,
          ] of changes
        ) {
          if (
            difference <= 0
          ) {
            continue;
          }

          const snapshot =
            inventorySnapshots.get(
              inventoryId
            );

          if (!snapshot) {
            throw new Error(
              "Inventory item snapshot missing."
            );
          }

          const data =
            snapshot.data() ||
            {};

          const availableStock =
            Number(
              data.stockQty ||
                0
            );

          if (
            difference >
            availableStock
          ) {
            throw new Error(
              `Insufficient stock for "${data.name || "Inventory item"}". Available: ${availableStock}, Required: ${difference}.`
            );
          }
        }

        // =============================================
        // APPLY INVENTORY
        // =============================================

        for (
          const [
            inventoryId,
            difference,
          ] of changes
        ) {
          const inventoryRef =
            inventory.doc(
              inventoryId
            );

          const snapshot =
            inventorySnapshots.get(
              inventoryId
            );

          if (!snapshot) {
            throw new Error(
              "Inventory item not found."
            );
          }

          const data =
            snapshot.data() ||
            {};

          const previousStock =
            Number(
              data.stockQty ||
                0
            );

          const newStock =
            previousStock +
            difference;

          const minimumStock =
            Number(
              data.minimumStock ||
                0
            );

          const status =
            newStock <= 0
              ? "Out of Stock"
              : newStock <=
                  minimumStock
                ? "Low Stock"
                : "In Stock";

          // -------------------------------------------
          // UPDATE INVENTORY
          // -------------------------------------------

          transaction.update(
            inventoryRef,
            {
              stockQty:
                newStock,

              status,

              updatedAt:
                now,
            }
          );

          // -------------------------------------------
          // HISTORY
          // -------------------------------------------

          const historyRef =
            history.doc();

          const historyType =
            difference > 0
              ? "Stock Out"
              : "Stock In";

          const reason =
            difference > 0
              ? "Repair Usage"
              : "Repair Part Removed / Quantity Reduced";

          transaction.set(
            historyRef,
            {
              inventoryId,

              sku:
                data.sku ||
                "",

              itemName:
                data.name ||
                "Inventory Item",

              type:
                historyType,

              quantity:
                Math.abs(
                  difference
                ),

              previousStock,

              newStock,

              reason,

              reference:
                repair.repairId,

              createdAt:
                now,
            }
          );
        }

        // =============================================
        // SAVE REPAIR
        // =============================================

        const repairData: Record<
          string,
          unknown
        > = {
          ...repair,

          estimate: {
            ...repair.estimate,

            usedParts:
              currentParts,
          },

          updatedAt:
            now,
        };

        delete repairData.id;

        transaction.set(
          repairRef,
          repairData,
          {
            merge:
              Boolean(
                repair.id
              ),
          }
        );
      }
    );

    // =================================================
    // RESPONSE
    // =================================================

    const stockChanges =
      Array.from(
        changes.entries()
      ).map(
        ([
          inventoryId,
          difference,
        ]) => ({
          inventoryId,
          quantity:
            Math.abs(
              difference
            ),
          direction:
            difference > 0
              ? "Stock Out"
              : "Stock In",
        })
      );

    return NextResponse.json({
      success: true,

      repairId:
        repairRef.id,

      stockUpdated:
        stockChanges.length >
        0,

      stockChanges,
    });
  } catch (error) {
    console.error(
      "Repair save API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to save repair.",
      },
      {
        status: 500,
      }
    );
  }
}