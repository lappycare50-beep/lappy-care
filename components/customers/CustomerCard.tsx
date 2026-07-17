"use client";

import Link from "next/link";

import { Customer } from "@/types/customer";

import {
  Phone,
  Mail,
  Wrench,
  FileText,
  IndianRupee,
  Wallet,
  Eye,
} from "lucide-react";

type Props = {
  customer: Customer;
  onLoad?: () => void;
};

export default function CustomerCard({
  customer,
  onLoad,
}: Props) {
  return (
    <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold text-green-400">
            Existing Customer
          </h3>

          <p className="text-sm text-gray-400">
            Customer Found
          </p>

        </div>

        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
          ACTIVE
        </span>

      </div>

      {/* Details */}

      <div className="space-y-3">

        <div className="flex items-center gap-3">

          <Phone
            size={18}
            className="text-yellow-400"
          />

          <span className="text-white">
            {customer.mobile}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Mail
            size={18}
            className="text-yellow-400"
          />

          <span className="text-white">
            {customer.email || "-"}
          </span>

        </div>

      </div>

      {/* Name */}

      <h2 className="mt-6 text-3xl font-bold text-white">
        {customer.name}
      </h2>

      {/* Summary */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-[#202020] p-4">

          <div className="flex items-center gap-2">

            <Wrench
              size={18}
              className="text-blue-400"
            />

            <span className="text-sm text-gray-400">
              Repairs
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {customer.totalRepairs}
          </h3>

        </div>

        <div className="rounded-xl bg-[#202020] p-4">

          <div className="flex items-center gap-2">

            <FileText
              size={18}
              className="text-yellow-400"
            />

            <span className="text-sm text-gray-400">
              Invoices
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {customer.totalInvoices}
          </h3>

        </div>

        <div className="rounded-xl bg-[#202020] p-4">

          <div className="flex items-center gap-2">

            <IndianRupee
              size={18}
              className="text-green-400"
            />

            <span className="text-sm text-gray-400">
              Total Spent
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-green-400">
            ₹{customer.totalSpent.toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-xl bg-[#202020] p-4">

          <div className="flex items-center gap-2">

            <Wallet
              size={18}
              className="text-red-400"
            />

            <span className="text-sm text-gray-400">
              Pending
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-red-400">
            ₹{customer.pendingAmount.toLocaleString("en-IN")}
          </h3>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-6 flex gap-3">

        <button
          type="button"
          onClick={onLoad}
          className="flex-1 rounded-xl bg-yellow-400 px-4 py-3 font-bold text-black transition hover:bg-yellow-300"
        >
          Load Customer
        </button>

        <Link
          href={`/admin/customers/${customer.id}`}
          className="flex items-center justify-center rounded-xl bg-blue-500 px-5 text-white transition hover:bg-blue-600"
        >
          <Eye size={20} />
        </Link>

      </div>

    </div>
  );
}