"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Pencil,
  Trash2,
  Eye,
  Phone,
  MessageCircle,
} from "lucide-react";

import {
  Customer,
} from "@/types/customer";

import {
  getCustomers,
  deleteCustomer,
} from "@/services/customerService";

// =====================================================
// PROPS
// =====================================================

type Props = {
  search: string;
  onEdit: (
    customer: Customer
  ) => void;
};

// =====================================================
// COMPONENT
// =====================================================

export default function CustomerTable({
  search,
  onEdit,
}: Props) {
  const [
    customers,
    setCustomers,
  ] = useState<Customer[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ===================================================
  // LOAD CUSTOMERS
  // ===================================================

  async function loadCustomers() {
    try {
      setLoading(true);

      const data =
        await getCustomers();

      /*
       * getCustomers() already returns customers
       * ordered by createdAt descending.
       *
       * We keep that order here.
       */

      setCustomers(
        data
      );
    } catch (error) {
      console.error(
        "Customer loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    void loadCustomers();
  }, []);

  // ===================================================
  // DELETE CUSTOMER
  // ===================================================

  async function handleDelete(
    id: string
  ) {
    const ok =
      confirm(
        "Delete this customer?"
      );

    if (!ok) {
      return;
    }

    try {
      await deleteCustomer(
        id
      );

      await loadCustomers();
    } catch (error) {
      console.error(
        "Customer delete error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete customer."
      );
    }
  }

  // ===================================================
  // SEARCH
  // ===================================================

  const keyword =
    search
      .trim()
      .toLowerCase();

  const searchResults =
    customers.filter(
      (customer) => {
        return (
          customer.name
            .toLowerCase()
            .includes(keyword) ||

          customer.mobile
            .toLowerCase()
            .includes(keyword) ||

          customer.customerId
            .toLowerCase()
            .includes(keyword)
        );
      }
    );

  // ===================================================
  // DISPLAY CUSTOMERS
  //
  // No search = latest 10 only
  // Search = all matching results
  // ===================================================

  const visibleCustomers =
    keyword
      ? searchResults
      : customers.slice(
          0,
          10
        );

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#181818] p-10 text-center text-white">
        Loading Customers...
      </div>
    );
  }

  // ===================================================
  // TABLE
  // ===================================================

  return (
    <div className="overflow-x-auto rounded-2xl border border-yellow-500/20 bg-[#181818]">

      {/* =================================================
          TOP INFO
      ================================================= */}

      <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            {keyword
              ? "Search Results"
              : "Latest Customers"}
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {visibleCustomers.length}{" "}
            {visibleCustomers.length ===
            1
              ? "customer"
              : "customers"}
          </p>

        </div>

        {!keyword &&
          customers.length >
            10 && (
            <p className="text-xs text-gray-500">
              Showing latest 10
            </p>
          )}

      </div>

      <table className="min-w-full">

        {/* =================================================
            HEADER
        ================================================= */}

        <thead className="bg-[#202020]">

          <tr>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Customer ID
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Customer
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Mobile
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              City
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Repairs
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Total Spent
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Pending
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">
              Date
            </th>

            <th className="px-4 py-4 text-center text-sm font-semibold text-yellow-400">
              Actions
            </th>

          </tr>

        </thead>

        {/* =================================================
            BODY
        ================================================= */}

        <tbody>

          {visibleCustomers.map(
            (
              customer
            ) => (
              <tr
                key={
                  customer.id
                }
                className="border-t border-gray-800 hover:bg-[#202020]"
              >

                {/* Customer ID */}

                <td className="px-4 py-4 font-semibold text-yellow-400">
                  {
                    customer.customerId
                  }
                </td>

                {/* Customer */}

                <td className="px-4 py-4">

                  <div>

                    <h3 className="font-semibold text-white">
                      {
                        customer.name
                      }
                    </h3>

                    <p className="text-sm text-gray-400">
                      {
                        customer.email ||
                        "-"
                      }
                    </p>

                  </div>

                </td>

                {/* Mobile */}

                <td className="px-4 py-4 text-gray-300">
                  {
                    customer.mobile
                  }
                </td>

                {/* City */}

                <td className="px-4 py-4 text-gray-300">
                  {
                    customer.city ||
                    "-"
                  }
                </td>

                {/* Repairs */}

                <td className="px-4 py-4">

                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                    {
                      customer.totalRepairs
                    }
                  </span>

                </td>

                {/* Total Spent */}

                <td className="px-4 py-4 font-semibold text-green-400">
                  ₹
                  {Number(
                    customer.totalSpent ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </td>

                {/* Pending */}

                <td className="px-4 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      Number(
                        customer.pendingAmount ||
                          0
                      ) > 0
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    ₹
                    {Number(
                      customer.pendingAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </td>

                {/* Date */}

                <td className="px-4 py-4 text-gray-400">
                  {formatDate(
                    customer.createdAt
                  )}
                </td>

                {/* Actions */}

                <td className="px-4 py-4">

                  <div className="flex items-center justify-center gap-3">

                    {/* View */}

                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="text-yellow-400 transition hover:text-yellow-300"
                      title="View Profile"
                    >
                      <Eye
                        size={18}
                      />
                    </Link>

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(
                          customer
                        )
                      }
                      className="text-blue-400 transition hover:text-blue-300"
                      title="Edit Customer"
                    >
                      <Pencil
                        size={18}
                      />
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          customer.id!
                        )
                      }
                      className="text-red-400 transition hover:text-red-300"
                      title="Delete Customer"
                    >
                      <Trash2
                        size={18}
                      />
                    </button>

                    {/* Call */}

                    <a
                      href={`tel:${customer.mobile}`}
                      className="text-green-400 transition hover:text-green-300"
                      title="Call Customer"
                    >
                      <Phone
                        size={18}
                      />
                    </a>

                    {/* WhatsApp */}

                    <a
                      href={`https://wa.me/91${customer.mobile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 transition hover:text-emerald-300"
                      title="WhatsApp Customer"
                    >
                      <MessageCircle
                        size={18}
                      />
                    </a>

                  </div>

                </td>

              </tr>
            )
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {visibleCustomers.length ===
            0 && (
            <tr>

              <td
                colSpan={
                  9
                }
                className="px-6 py-12 text-center text-gray-400"
              >

                {keyword
                  ? `No customers found for "${search}".`
                  : "No customers found."}

              </td>

            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(
  value?: string
) {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}