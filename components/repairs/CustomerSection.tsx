"use client";

import { useEffect, useState } from "react";

import { RepairCustomer } from "@/types/repair";
import { Customer } from "@/types/customer";

import {
  findCustomerByMobile,
} from "@/services/customerService";

import {
  getRepairsByCustomerId,
} from "@/services/repairService";

type Props = {
  customer: RepairCustomer;
  setCustomer: (
    customer: RepairCustomer
  ) => void;
};

export default function CustomerSection({
  customer,
  setCustomer,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [
    existingCustomer,
    setExistingCustomer,
  ] = useState<Customer | null>(null);

  const [
    repairCount,
    setRepairCount,
  ] = useState(0);

  // ==========================================
  // Update Customer
  // ==========================================

  function update<
    K extends keyof RepairCustomer
  >(
    key: K,
    value: RepairCustomer[K]
  ) {
    setCustomer({
      ...customer,
      [key]: value,
    });
  }

  // ==========================================
  // Load Actual Repair Count
  // ==========================================

  async function loadActualRepairCount(
    found: Customer
  ) {
    try {
      const repairs =
        await getRepairsByCustomerId(
          found.customerId,
          found.id,
          found.mobile
        );

      setRepairCount(
        repairs.length
      );
    } catch (error) {
      console.error(
        "Unable to load customer repair count:",
        error
      );

      setRepairCount(
        Number(
          found.totalRepairs || 0
        )
      );
    }
  }

  // ==========================================
  // Auto Lookup
  // ==========================================

  useEffect(() => {
    const mobile =
      customer.mobile.replace(
        /\D/g,
        ""
      );

    if (mobile.length !== 10) {
      setExistingCustomer(null);
      setRepairCount(0);
      return;
    }

    const timer =
      setTimeout(async () => {
        try {
          setLoading(true);

          const found =
            await findCustomerByMobile(
              mobile
            );

          if (!found) {
            setExistingCustomer(null);
            setRepairCount(0);
            return;
          }

          setExistingCustomer(found);

          await loadActualRepairCount(
            found
          );

          setCustomer({
            ...customer,

            customerId:
              found.customerId,

            name:
              found.name,

            mobile:
              found.mobile,

            alternateMobile:
              found.alternateMobile,

            email:
              found.email,

            address:
              found.address,

            city:
              found.city,

            state:
              found.state,

            pincode:
              found.pincode,
          });
        } catch (error) {
          console.error(
            "Customer lookup error:",
            error
          );
        } finally {
          setLoading(false);
        }
      }, 500);

    return () =>
      clearTimeout(timer);
  }, [customer.mobile]);

  // ==========================================
  // Refresh Count
  // ==========================================

  useEffect(() => {
    if (!existingCustomer) {
      return;
    }

    loadActualRepairCount(
      existingCustomer
    );
  }, [existingCustomer]);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Customer Details
      </h2>

      {/* Existing Customer */}

      {loading && (
        <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
          <p className="text-sm font-medium text-blue-400">
            🔄 Searching Customer...
          </p>
        </div>
      )}

      {!loading && existingCustomer && (
        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-5">

          <div>

            <h3 className="text-lg font-bold text-green-400">
              ✅ Existing Customer Found
            </h3>

            <p className="mt-1 text-sm text-gray-300">
              Customer ID :{" "}
              <span className="font-semibold text-white">
                {existingCustomer.customerId}
              </span>
            </p>

          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">

            {/* Repairs */}

            <div className="rounded-xl bg-black p-4">

              <p className="text-sm text-gray-400">
                Repairs
              </p>

              <h4 className="mt-2 text-2xl font-bold text-yellow-400">
                {repairCount}
              </h4>

            </div>

            {/* Invoices */}

            <div className="rounded-xl bg-black p-4">

              <p className="text-sm text-gray-400">
                Invoices
              </p>

              <h4 className="mt-2 text-2xl font-bold text-yellow-400">
                {Number(
                  existingCustomer.totalInvoices ||
                    0
                )}
              </h4>

            </div>

            {/* Total Spent */}

            <div className="rounded-xl bg-black p-4">

              <p className="text-sm text-gray-400">
                Total Spent
              </p>

              <h4 className="mt-2 text-2xl font-bold text-green-400">
                ₹{" "}
                {Number(
                  existingCustomer.totalSpent ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </h4>

            </div>

            {/* Pending */}

            <div className="rounded-xl bg-black p-4">

              <p className="text-sm text-gray-400">
                Pending
              </p>

              <h4 className="mt-2 text-2xl font-bold text-red-400">
                ₹{" "}
                {Number(
                  existingCustomer.pendingAmount ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </h4>

            </div>

          </div>

        </div>
      )}

      {/* Customer Fields */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* Customer Name */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Customer Name *
          </label>

          <input
            type="text"
            value={customer.name}
            onChange={(e) =>
              update(
                "name",
                e.target.value
              )
            }
            placeholder="Customer Name"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Mobile */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Mobile Number *
          </label>

          <input
            type="text"
            maxLength={10}
            value={customer.mobile}
            onChange={(e) =>
              update(
                "mobile",
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="9876543210"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Alternate Mobile */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Alternate Mobile
          </label>

          <input
            type="text"
            maxLength={10}
            value={
              customer.alternateMobile ??
              ""
            }
            onChange={(e) =>
              update(
                "alternateMobile",
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="Alternate Mobile"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Email
          </label>

          <input
            type="email"
            value={
              customer.email ?? ""
            }
            onChange={(e) =>
              update(
                "email",
                e.target.value
              )
            }
            placeholder="example@email.com"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Address */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-300">
            Address
          </label>

          <textarea
            rows={3}
            value={
              customer.address ?? ""
            }
            onChange={(e) =>
              update(
                "address",
                e.target.value
              )
            }
            placeholder="Customer Address"
            className="w-full resize-none rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* City */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            City
          </label>

          <input
            type="text"
            value={
              customer.city ?? ""
            }
            onChange={(e) =>
              update(
                "city",
                e.target.value
              )
            }
            placeholder="Pune"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* State */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            State
          </label>

          <input
            type="text"
            value={
              customer.state ?? ""
            }
            onChange={(e) =>
              update(
                "state",
                e.target.value
              )
            }
            placeholder="Maharashtra"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Pincode */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Pincode
          </label>

          <input
            type="text"
            maxLength={6}
            value={
              customer.pincode ?? ""
            }
            onChange={(e) =>
              update(
                "pincode",
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="411057"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

      </div>

      {/* Customer Info Footer */}

      <div className="mt-8 rounded-xl border border-yellow-500/20 bg-black p-5">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>

            <p className="text-sm text-gray-400">
              Customer Type
            </p>

            <h3 className="text-lg font-bold text-white">
              {existingCustomer
                ? "Existing Customer"
                : "New Customer"}
            </h3>

          </div>

          <div>

            <p className="text-sm text-gray-400">
              Status
            </p>

            <h3
              className={`text-lg font-bold ${
                existingCustomer
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {existingCustomer
                ? "Active"
                : "Ready to Create"}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}