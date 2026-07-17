"use client";

import { useState } from "react";

import CustomerSearch from "@/components/customers/CustomerSearch";
import CustomerTable from "@/components/customers/CustomerTable";

import { Customer } from "@/types/customer";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  function handleEdit(customer: Customer) {
    setSelectedCustomer(customer);

    // पुढे Edit Drawer / Modal इथे open करू.
    console.log("Edit Customer:", customer);
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Customers
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage and track all customer records.
          </p>
        </div>

      </div>

      {/* Search */}

      <CustomerSearch
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
      />

      {/* Table */}

      <CustomerTable
        search={search}
        onEdit={handleEdit}
      />

      {/* Future Edit Modal */}

      {selectedCustomer && (
        <></>
      )}

    </div>
  );
}