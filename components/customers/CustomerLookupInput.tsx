"use client";

import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { Customer } from "@/types/customer";

import { findCustomerByMobile } from "@/services/customerService";

import CustomerCard from "./CustomerCard";

type Props = {

  value: string;

  onChange: (value: string) => void;

  onCustomerFound?: (customer: Customer) => void;

};

export default function CustomerLookupInput({

  value,

  onChange,

  onCustomerFound,

}: Props) {

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (value.length !== 10) {

      setCustomer(null);

      return;

    }

    const timer = setTimeout(async () => {

      try {

        setLoading(true);

        const data =
          await findCustomerByMobile(value);

        setCustomer(data);

        if (data) {

          onCustomerFound?.(data);

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }, 500);

    return () => clearTimeout(timer);

  }, [value, onCustomerFound]);
    return (

    <div className="space-y-3">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          type="text"
          value={value}
          maxLength={10}
          placeholder="Mobile Number"
          onChange={(e) =>
            onChange(
              e.target.value.replace(/\D/g, "")
            )
          }
          className="w-full rounded-xl border border-gray-700 bg-black py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-400"
        />

      </div>

      {loading && (

        <div className="rounded-xl bg-[#222] p-4 text-sm text-gray-400">

          Searching customer...

        </div>

      )}

      {!loading && customer && (

        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">

          <h3 className="font-bold text-green-400">

            Existing Customer

          </h3>

          <p className="mt-2 text-white">

            {customer.name}

          </p>

          <p className="text-gray-300">

            {customer.mobile}

          </p>

        </div>

      )}

     

      {!loading &&
        value.length === 10 &&
        !customer && (

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">

          <h3 className="font-bold text-red-400">

            New Customer

          </h3>

          <p className="text-gray-400">

            No previous customer found.

          </p>

        </div>

      )}

    </div>

  );

}