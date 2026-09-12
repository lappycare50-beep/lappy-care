"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  UserCheck,
  X,
} from "lucide-react";

import type { Customer } from "@/types/customer";

import {
  getCustomers,
} from "@/services/customerService";

type Props = {
  customerName: string;
  mobile: string;
  email: string;

  onChange: (data: {
    customerId?: string;
    customerName: string;
    mobile: string;
    email: string;
  }) => void;
};

export default function SalesCustomerSelector({
  customerName,
  mobile,
  email,
  onChange,
}: Props) {
  const [
    customers,
    setCustomers,
  ] = useState<Customer[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selected,
    setSelected,
  ] = useState<Customer | null>(
    null
  );

  const [
    open,
    setOpen,
  ] = useState(false);

  // ===================================================
  // LOAD CUSTOMERS
  // ===================================================

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data =
          await getCustomers();

        setCustomers(data);
      } catch (error) {
        console.error(
          "Failed to load customers:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  // ===================================================
  // FILTER
  // ===================================================

  const filtered =
    useMemo(() => {
      const keyword =
        search
          .toLowerCase()
          .trim();

      if (!keyword) {
        return customers.slice(
          0,
          10
        );
      }

      return customers
        .filter(
          (customer) =>
            customer.customerId
              ?.toLowerCase()
              .includes(keyword) ||
            customer.name
              ?.toLowerCase()
              .includes(keyword) ||
            customer.mobile
              ?.toLowerCase()
              .includes(keyword) ||
            customer.email
              ?.toLowerCase()
              .includes(keyword) ||
            customer.companyName
              ?.toLowerCase()
              .includes(keyword)
        )
        .slice(0, 10);
    }, [
      customers,
      search,
    ]);

  // ===================================================
  // SELECT
  // ===================================================

  function selectCustomer(
    customer: Customer
  ) {
    setSelected(customer);

    setSearch("");

    setOpen(false);

    onChange({
      customerId:
        customer.id,

      customerName:
        customer.name || "",

      mobile:
        customer.mobile || "",

      email:
        customer.email || "",
    });
  }

  // ===================================================
  // CLEAR
  // ===================================================

  function clearCustomer() {
    setSelected(null);

    onChange({
      customerId:
        undefined,

      customerName:
        "",

      mobile:
        "",

      email:
        "",
    });
  }

  return (
    <div className="relative">

      {/* Existing customer search */}

      <label className="mb-2 block text-sm font-semibold text-zinc-400">
        Existing Customer
      </label>

      {selected ? (
        <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/5 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-green-500/10 p-2">
              <UserCheck
                size={20}
                className="text-green-400"
              />
            </div>

            <div>

              <p className="font-bold text-white">
                {selected.name}
              </p>

              <p className="text-xs text-zinc-500">
                {selected.customerId}{" "}
                •{" "}
                {selected.mobile}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={
              clearCustomer
            }
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X size={18} />
          </button>

        </div>
      ) : (
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setOpen(true);
            }}
            onFocus={() =>
              setOpen(true)
            }
            placeholder="Search Customer ID, Name, Mobile or Email..."
            className="w-full rounded-xl border border-zinc-700 bg-black py-4 pl-11 pr-4 text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
          />

          {open && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-zinc-700 bg-[#181818] shadow-2xl">

              {loading ? (
                <div className="p-5 text-center text-sm text-zinc-500">
                  Loading customers...
                </div>
              ) : filtered.length ===
                0 ? (
                <div className="p-5 text-center text-sm text-zinc-500">
                  No customer found.
                </div>
              ) : (
                filtered.map(
                  (
                    customer
                  ) => (
                    <button
                      key={
                        customer.id
                      }
                      type="button"
                      onClick={() =>
                        selectCustomer(
                          customer
                        )
                      }
                      className="w-full border-b border-zinc-800 px-4 py-4 text-left transition hover:bg-zinc-900"
                    >

                      <p className="font-semibold text-white">
                        {
                          customer.name
                        }
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {
                          customer.customerId
                        }{" "}
                        •{" "}
                        {
                          customer.mobile
                        }
                      </p>

                      {customer.email && (
                        <p className="mt-1 text-xs text-zinc-600">
                          {
                            customer.email
                          }
                        </p>
                      )}

                    </button>
                  )
                )
              )}

            </div>
          )}

        </div>
      )}

      {/* Manual customer fields */}

      <div className="mt-5 grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-zinc-400">
            Customer Name *
          </label>

          <input
            value={
              customerName
            }
            onChange={(e) =>
              onChange({
                customerName:
                  e.target.value,

                mobile,

                email,

              })
            }
            placeholder="Customer Name"
            className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold text-zinc-400">
            Mobile *
          </label>

          <input
            value={
              mobile
            }
            onChange={(e) =>
              onChange({
                customerName,

                mobile:
                  e.target.value,

                email,
              })
            }
            maxLength={10}
            inputMode="numeric"
            placeholder="10-digit mobile"
            className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-semibold text-zinc-400">
            Email
          </label>

          <input
            type="email"
            value={
              email
            }
            onChange={(e) =>
              onChange({
                customerName,

                mobile,

                email:
                  e.target.value,
              })
            }
            placeholder="Customer Email"
            className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

      </div>

    </div>
  );
}