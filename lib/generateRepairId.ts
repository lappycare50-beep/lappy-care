/**
 * Generate Repair ID
 * Example:
 * LC-2026-000001
 * LC-2026-000002
 */

export function generateRepairId(lastNumber: number): string {
  const year = new Date().getFullYear();

  const nextNumber = lastNumber + 1;

  return `LC-${year}-${nextNumber
    .toString()
    .padStart(6, "0")}`;
}