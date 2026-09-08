"use client";

import { useState } from "react";

import {
  addCustomer,
  getCustomers,
} from "@/services/customerService";

import {
  CustomerImportRow,
  CustomerImportValidation,
  createCustomerData,
  parseCustomerImportFile,
  validateCustomerImportRows,
} from "@/services/customerImportService";

import { generateId } from "@/services/idGenerator";

export default function CustomerImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<CustomerImportRow[]>([]);
  const [results, setResults] = useState<CustomerImportValidation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = event.target.files?.[0] ?? null;

    setFile(selected);
    setRows([]);
    setResults([]);
    setMessage("");
    setError("");
  }

  function handleDownloadTemplate() {
    const headers = [
      "Name",
      "Mobile",
      "Alternate Mobile",
      "Email",
      "Address",
      "City",
      "State",
      "Pincode",
      "GST",
      "Company Name",
      "Notes",
    ];

    const sample = [
      "Sample Customer",
      "9876543210",
      "9123456780",
      "customer@example.com",
      "Shop No 1, Main Road",
      "Pune",
      "Maharashtra",
      "411001",
      "",
      "",
      "Optional notes",
    ];

    const csvEscape = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const csv = [
      headers.map(csvEscape).join(","),
      sample.map(csvEscape).join(","),
    ].join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "lappy-care-customer-import-template.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function handlePreview() {
    if (!file) {
      setError("Please select an Excel or CSV file.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");
    setResults([]);

    try {
      const importedRows = await parseCustomerImportFile(file);
      const customers = await getCustomers();

      const validation = validateCustomerImportRows(
        importedRows,
        customers
      );

      setRows(importedRows);
      setResults([validation]);

      const duplicateCount =
        validation.duplicateMobiles?.length ?? 0;

      const readyCount = validation.validRows.filter(
        (row) =>
          row.mobile &&
          !validation.duplicateMobiles?.includes(row.mobile)
      ).length;

      if (validation.errors.length > 0) {
        setMessage(
          `Preview complete: ${readyCount} customer(s) are ready to import. ${validation.errors.length} issue(s) will be skipped.`
        );
      } else {
        setMessage(
          `${validation.validCount} customer(s) are ready to import.`
        );
      }

      if (duplicateCount > 0) {
        console.info(
          `Customer import duplicates detected: ${duplicateCount}`
        );
      }
    } catch (err) {
      console.error("Customer import preview failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to process the import file."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImport() {
    const validation = results[0];

    if (!validation) {
      setError("Please preview the file before importing.");
      return;
    }

    const duplicateMobiles = new Set(
      validation.duplicateMobiles ?? []
    );

    const importableRows = validation.validRows.filter(
      (row) =>
        row.mobile &&
        !duplicateMobiles.has(row.mobile)
    );

    if (importableRows.length === 0) {
      setError(
        "There are no new valid customers available for import."
      );
      return;
    }

    setIsImporting(true);
    setMessage("");
    setError("");

    try {
      const now = new Date().toISOString();

      /*
       * Re-check Firestore immediately before writing.
       * This prevents a customer added after Preview from
       * being inserted twice.
       */
      const currentCustomers = await getCustomers();

      const existingMobiles = new Set(
        currentCustomers
          .map((customer) =>
            customer.mobile?.replace(/\D/g, "")
          )
          .filter(Boolean)
      );

      const processedMobiles = new Set<string>();

      let importedCount = 0;
      let skippedCount = 0;
      let failedCount = 0;

      const failedRows: string[] = [];

      for (const row of importableRows) {
        const mobile = row.mobile.replace(/\D/g, "");

        if (
          !mobile ||
          existingMobiles.has(mobile) ||
          processedMobiles.has(mobile)
        ) {
          skippedCount++;
          continue;
        }

        try {
          const customerId = await generateId("customer");

          const customerData = createCustomerData(
            row,
            customerId,
            now
          );

          await addCustomer(customerData);

          processedMobiles.add(mobile);
          existingMobiles.add(mobile);
          importedCount++;
        } catch (rowError) {
          failedCount++;

          failedRows.push(
            row.name
              ? `${row.name} (${mobile})`
              : mobile
          );

          console.error(
            "Customer import row failed:",
            rowError
          );
        }
      }

      /*
       * Rows excluded during validation are also skipped.
       * Keep this separate from Firestore write failures.
       */
      const validationSkipped =
        validation.totalRows -
        validation.validRows.length;

      const totalSkipped =
        skippedCount + validationSkipped;

      setMessage(
        `Import completed: ${importedCount} imported, ${totalSkipped} skipped, ${failedCount} failed.`
      );

      if (failedCount > 0) {
        setError(
          `Failed rows: ${failedRows.join(", ")}`
        );
      }

      /*
       * Keep the summary visible so the admin can verify
       * the result instead of clearing the screen.
       */
      setRows(validation.rows);
    } catch (err) {
      console.error("Customer import failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Customer import failed."
      );
    } finally {
      setIsImporting(false);
    }
  }

  const validation = results[0] ?? null;

  const duplicateMobiles = new Set(
    validation?.duplicateMobiles ?? []
  );

  const importableCount = validation
    ? validation.validRows.filter(
        (row) =>
          row.mobile &&
          !duplicateMobiles.has(row.mobile)
      ).length
    : 0;

  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Bulk Customer Import
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Import customers from Excel or CSV.
          </p>
        </div>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="customer-import-file"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Select Customer File
              </label>

              <input
                id="customer-import-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
              />

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>
                  Supported: Excel (.xlsx, .xls) and CSV (.csv)
                </span>

                {file && (
                  <>
                    <span>•</span>

                    <span className="font-medium text-gray-700">
                      {file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setRows([]);
                        setResults([]);
                        setMessage("");
                        setError("");
                      }}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Download Template
              </button>

              <button
                type="button"
                onClick={handlePreview}
                disabled={!file || isLoading}
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Preview Import"}
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-700">
              Supported columns
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Name, Mobile, Alternate Mobile, Email, Address, City,
              State, Pincode, GST, Company Name and Notes.
            </p>

            <p className="mt-2 text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                Tip:
              </span>{" "}
              Keep one customer per row and use Mobile as the primary
              identifier for duplicate checking.
            </p>
          </div>
        </section>

        {message && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {validation && (
          <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Import Summary
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              <SummaryCard
                label="Total"
                value={validation.totalRows}
              />

              <SummaryCard
                label="Valid"
                value={validation.validCount}
              />

              <SummaryCard
                label="Invalid"
                value={validation.invalidCount}
              />

              <SummaryCard
                label="Duplicates"
                value={validation.duplicateCount}
              />

              <SummaryCard
                label="Ready to Import"
                value={importableCount}
              />
            </div>

            {validation.errors.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-red-700">
                  Validation Issues
                </h3>

                <div className="mt-2 max-h-60 overflow-auto rounded-lg border bg-red-50 p-3">
                  <ul className="space-y-1 text-sm text-red-700">
                    {validation.errors.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

            {validation.errors.length > 0 && (
              <div className="mt-5 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <p className="font-semibold text-gray-900">
                  Some rows will be skipped.
                </p>

                <p className="mt-1">
                  Invalid rows and duplicate mobile numbers will not
                  be imported.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleImport}
                disabled={
                  isImporting ||
                  importableCount === 0
                }
                className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isImporting
                  ? "Importing..."
                  : `Import ${importableCount} Customers`}
              </button>
            </div>
          </section>
        )}

        {rows.length > 0 && (
          <section className="mt-6 rounded-xl border bg-white shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-lg font-semibold">
                Customer Preview
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left">
                      City
                    </th>
                    <th className="px-4 py-3 text-left">
                      State
                    </th>
                    <th className="px-4 py-3 text-left">
                      Pincode
                    </th>
                    <th className="px-4 py-3 text-left">
                      Company
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-3">
                        {row.name}
                      </td>
                      <td className="px-4 py-3">
                        {row.mobile}
                      </td>
                      <td className="px-4 py-3">
                        {row.email}
                      </td>
                      <td className="px-4 py-3">
                        {row.city}
                      </td>
                      <td className="px-4 py-3">
                        {row.state}
                      </td>
                      <td className="px-4 py-3">
                        {row.pincode}
                      </td>
                      <td className="px-4 py-3">
                        {row.companyName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-900">
      <div className="text-xs text-gray-700">
        {label}
      </div>

      <div className="mt-1 text-2xl font-semibold text-gray-900">
        {value}
      </div>
    </div>
  );
}