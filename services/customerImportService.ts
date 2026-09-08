import * as XLSX from "xlsx";

import { Customer } from "@/types/customer";

/* =========================================================
   TYPES
========================================================= */

export type CustomerImportRow = {
  name: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  companyName: string;
  notes: string;
};

export type CustomerImportValidation = {
  valid: boolean;

  rows: CustomerImportRow[];

  validRows: CustomerImportRow[];

  invalidRows: CustomerImportRow[];

  errors: string[];

  duplicates: string[];

  duplicateMobiles: string[];

  totalRows: number;

  validCount: number;

  invalidCount: number;

  duplicateCount: number;
};

/* =========================================================
   HEADER MAP
========================================================= */

const HEADER_MAP: Record<
  string,
  keyof CustomerImportRow
> = {
  name: "name",
  customername: "name",
  customer: "name",
  fullname: "name",

  mobile: "mobile",
  mobilenumber: "mobile",
  phone: "mobile",
  phonenumber: "mobile",
  contact: "mobile",
  contactnumber: "mobile",

  alternatemobile: "alternateMobile",
  alternatenumber: "alternateMobile",
  alternatephone: "alternateMobile",
  secondarymobile: "alternateMobile",

  email: "email",
  emailid: "email",

  address: "address",
  fulladdress: "address",

  city: "city",
  town: "city",

  state: "state",

  pincode: "pincode",
  pin: "pincode",
  zipcode: "pincode",

  gst: "gstNumber",
  gstnumber: "gstNumber",
  gstin: "gstNumber",

  company: "companyName",
  companyname: "companyName",
  businessname: "companyName",

  notes: "notes",
  note: "notes",
  remark: "notes",
  remarks: "notes",
};

/* =========================================================
   NORMALIZE HEADER
========================================================= */

export function normalizeHeader(
  value: unknown
): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/* =========================================================
   STRING VALUE
========================================================= */

export function stringValue(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   NORMALIZE MOBILE
========================================================= */

export function normalizeMobile(
  value: unknown
): string {
  let mobile =
    String(value ?? "")
      .replace(/\D/g, "");

  /*
   * Indian country code:
   *
   * 919876543210
   * ->
   * 9876543210
   */

  if (
    mobile.length === 12 &&
    mobile.startsWith("91")
  ) {
    mobile =
      mobile.substring(2);
  }

  return mobile;
}

/* =========================================================
   NORMALIZE PINCODE
========================================================= */

export function normalizePincode(
  value: unknown
): string {
  return String(value ?? "")
    .replace(/\D/g, "")
    .substring(0, 6);
}

/* =========================================================
   EMPTY ROW
========================================================= */

function createEmptyRow(): CustomerImportRow {
  return {
    name: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    companyName: "",
    notes: "",
  };
}

/* =========================================================
   MAP RAW ROW
========================================================= */

export function mapImportRow(
  rawRow: Record<string, unknown>
): CustomerImportRow {

  const row: CustomerImportRow =
    createEmptyRow();

  for (
    const [rawHeader, value]
    of Object.entries(rawRow)
  ) {

    const normalizedHeader =
      normalizeHeader(
        rawHeader
      );

    const field =
      HEADER_MAP[
        normalizedHeader
      ];

    if (!field) {
      continue;
    }

    row[field] =
      stringValue(value);
  }

  row.mobile =
    normalizeMobile(
      row.mobile
    );

  row.alternateMobile =
    normalizeMobile(
      row.alternateMobile
    );

  row.pincode =
    normalizePincode(
      row.pincode
    );

  row.name =
    row.name.trim();

  row.email =
    row.email
      .trim()
      .toLowerCase();

  row.gstNumber =
    row.gstNumber
      .trim()
      .toUpperCase();

  return row;
}

/* =========================================================
   PARSE CUSTOMER IMPORT FILE
========================================================= */

export async function parseCustomerImportFile(
  file: File
): Promise<CustomerImportRow[]> {

  if (!file) {
    throw new Error(
      "Please select an Excel or CSV file."
    );
  }

  const fileName =
    file.name.toLowerCase();

  const isExcel =
    fileName.endsWith(".xlsx") ||
    fileName.endsWith(".xls");

  const isCsv =
    fileName.endsWith(".csv");

  if (!isExcel && !isCsv) {
    throw new Error(
      "Only Excel (.xlsx, .xls) or CSV files are supported."
    );
  }

  const buffer =
    await file.arrayBuffer();

  const workbook =
    XLSX.read(
      buffer,
      {
        type: "array",
        cellDates: true,
      }
    );

  if (
    !workbook.SheetNames.length
  ) {
    throw new Error(
      "The uploaded file does not contain any sheet."
    );
  }

  const firstSheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  if (!firstSheet) {
    throw new Error(
      "Unable to read the first sheet."
    );
  }

  const rawRows =
    XLSX.utils.sheet_to_json<
      Record<string, unknown>
    >(
      firstSheet,
      {
        defval: "",
        raw: false,
      }
    );

  if (!rawRows.length) {
    return [];
  }

  return rawRows.map(
    (rawRow) =>
      mapImportRow(
        rawRow
      )
  );
}

/* =========================================================
   VALIDATE SINGLE ROW
========================================================= */

export function validateCustomerImportRow(
  row: CustomerImportRow,
  rowNumber: number
): string[] {

  const errors: string[] = [];

  if (!row.name.trim()) {
    errors.push(
      `Row ${rowNumber}: Customer name is required.`
    );
  }

  if (!row.mobile) {
    errors.push(
      `Row ${rowNumber}: Mobile number is required.`
    );
  } else if (
    !/^\d{10}$/.test(
      row.mobile
    )
  ) {
    errors.push(
      `Row ${rowNumber}: Mobile number must contain 10 digits.`
    );
  }

  if (
    row.alternateMobile &&
    !/^\d{10}$/.test(
      row.alternateMobile
    )
  ) {
    errors.push(
      `Row ${rowNumber}: Alternate mobile number must contain 10 digits.`
    );
  }

  if (
    row.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      row.email
    )
  ) {
    errors.push(
      `Row ${rowNumber}: Invalid email address.`
    );
  }

  if (
    row.pincode &&
    !/^\d{6}$/.test(
      row.pincode
    )
  ) {
    errors.push(
      `Row ${rowNumber}: Pincode must contain 6 digits.`
    );
  }

  return errors;
}

/* =========================================================
   VALIDATE CUSTOMER IMPORT ROWS
========================================================= */

export function validateCustomerImportRows(
  rows: CustomerImportRow[],
  customers: Customer[] = []
): CustomerImportValidation {

  const errors: string[] = [];

  const validRows: CustomerImportRow[] = [];

  const invalidRows: CustomerImportRow[] = [];

  const mobileMap =
    new Map<string, number>();

  const duplicateSet =
    new Set<string>();

  const existingCustomerMobiles =
    new Set(
      customers
        .map((customer) =>
          normalizeMobile(customer.mobile)
        )
        .filter(Boolean)
    );

  /* =======================================================
     ROW VALIDATION
  ======================================================= */

  rows.forEach(
    (row, index) => {

      const rowNumber =
        index + 2;

      const rowErrors =
        validateCustomerImportRow(
          row,
          rowNumber
        );

      if (
        rowErrors.length > 0
      ) {

        errors.push(
          ...rowErrors
        );

        invalidRows.push(
          row
        );

      } else {

        validRows.push(
          row
        );
      }

      /* =====================================================
         DUPLICATE MOBILE CHECK
      ===================================================== */

      if (row.mobile) {

        const previous =
          mobileMap.get(
            row.mobile
          );

        if (
          previous !== undefined
        ) {

          duplicateSet.add(
            row.mobile
          );

          errors.push(
            `Duplicate mobile number ${row.mobile} found in rows ${previous} and ${rowNumber}.`
          );

        } else {

          mobileMap.set(
            row.mobile,
            rowNumber
          );
        }

        if (
          existingCustomerMobiles.has(
            row.mobile
          )
        ) {

          duplicateSet.add(
            row.mobile
          );

          errors.push(
            `Customer with mobile number ${row.mobile} already exists.`
          );
        }
      }
    }
  );

  const duplicates =
    Array.from(
      duplicateSet
    );

  return {
    valid:
      errors.length === 0,

    rows,

    validRows,

    invalidRows,

    errors,

    duplicates,

    duplicateMobiles:
      duplicates,

    totalRows:
      rows.length,

    validCount:
      validRows.length,

    invalidCount:
      invalidRows.length,

    duplicateCount:
      duplicates.length,
  };
}

/* =========================================================
   FIND DUPLICATE MOBILES
========================================================= */

export function findDuplicateMobiles(
  rows: CustomerImportRow[]
): Set<string> {

  const seen =
    new Set<string>();

  const duplicates =
    new Set<string>();

  for (
    const row of rows
  ) {

    if (!row.mobile) {
      continue;
    }

    if (
      seen.has(
        row.mobile
      )
    ) {
      duplicates.add(
        row.mobile
      );
    }

    seen.add(
      row.mobile
    );
  }

  return duplicates;
}

/* =========================================================
   PREPARE IMPORT DATA
========================================================= */

export function prepareCustomerImport(
  rawRows: Record<string, unknown>[]
): CustomerImportValidation {

  const rows =
    rawRows.map(
      (rawRow) =>
        mapImportRow(
          rawRow
        )
    );

  return validateCustomerImportRows(
    rows
  );
}

/* =========================================================
   CREATE CUSTOMER DATA
========================================================= */

export function createCustomerData(
  row: CustomerImportRow,
  customerId: string,
  now: string
): Omit<Customer, "id"> {

  return {

    customerId,

    name:
      row.name.trim(),

    mobile:
      normalizeMobile(
        row.mobile
      ),

    alternateMobile:
      normalizeMobile(
        row.alternateMobile
      ),

    email:
      row.email
        .trim()
        .toLowerCase(),

    address:
      row.address.trim(),

    city:
      row.city.trim(),

    state:
      row.state.trim(),

    pincode:
      normalizePincode(
        row.pincode
      ),

    gstNumber:
      row.gstNumber
        .trim()
        .toUpperCase(),

    companyName:
      row.companyName.trim(),

    totalRepairs: 0,

    totalInvoices: 0,

    totalSpent: 0,

    pendingAmount: 0,

    lastRepairId: "",

    lastInvoiceId: "",

    lastVisit: "",

    notes:
      row.notes.trim(),

    isActive: true,

    createdAt:
      now,

    updatedAt:
      now,
  };
}