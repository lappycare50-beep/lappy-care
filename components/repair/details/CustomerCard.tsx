"use client";

import {
  Mail,
  MapPin,
  Phone,
  Smartphone,
  User,
} from "lucide-react";

import { RepairCustomer } from "@/types/repair";

interface CustomerCardProps {
  customer: RepairCustomer;
}

export default function CustomerCard({
  customer,
}: CustomerCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      {/* ==========================
          Header
      ========================== */}

      <div className="mb-6 flex items-center gap-3">
        <User
          size={22}
          className="text-yellow-400"
        />

        <h2 className="text-xl font-bold text-yellow-400">
          Customer Information
        </h2>
      </div>

      {/* ==========================
          Body
      ========================== */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Customer Name */}

        <InfoItem
          icon={<User size={18} />}
          label="Customer Name"
          value={customer.name}
        />

        {/* Mobile */}

        <InfoItem
          icon={<Phone size={18} />}
          label="Mobile Number"
          value={customer.mobile}
        />

        {/* Alternate Mobile */}

        <InfoItem
          icon={<Smartphone size={18} />}
          label="Alternate Mobile"
          value={
            customer.alternateMobile ||
            "-"
          }
        />

        {/* Email */}

        <InfoItem
          icon={<Mail size={18} />}
          label="Email"
          value={customer.email || "-"}
        />

        {/* Address */}

        <div className="md:col-span-2">
          <InfoItem
            icon={<MapPin size={18} />}
            label="Address"
            value={
              customer.address || "-"
            }
          />
        </div>

        {/* City */}

        <InfoItem
          label="City"
          value={customer.city || "-"}
        />

        {/* State */}

        <InfoItem
          label="State"
          value={customer.state || "-"}
        />

        {/* Pincode */}

        <InfoItem
          label="Pincode"
          value={customer.pincode || "-"}
        />
      </div>
    </div>
  );
}

// ==========================================
// Info Item
// ==========================================

interface InfoItemProps {
  icon?: React.ReactNode;

  label: string;

  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
        {icon}

        <span>{label}</span>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 font-medium text-white">
        {value}
      </div>
    </div>
  );
}