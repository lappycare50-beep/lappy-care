"use client";

import Link from "next/link";

import {
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { COMPANY } from "@/lib/config/company";

export default function TrackingFooter() {
  return (
    <footer className="mt-10 overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#0B0B0B] text-white shadow-xl">
      <div className="grid gap-10 p-8 md:grid-cols-3">
        {/* ==========================================
            Company
        ========================================== */}

        <div>
          <h2 className="text-2xl font-black text-yellow-400">
            {COMPANY.name}
          </h2>

          <p className="mt-2 text-gray-300">
            {COMPANY.tagline}
          </p>

          <p className="mt-5 leading-7 text-sm text-gray-400">
            {COMPANY.description}
          </p>
        </div>

        {/* ==========================================
            Contact
        ========================================== */}

        <div>
          <h3 className="mb-4 text-lg font-bold text-yellow-400">
            Contact
          </h3>

          <div className="space-y-4">
            <Link
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-gray-300 transition hover:text-yellow-400"
            >
              <Phone size={18} />

              <span>{COMPANY.phone}</span>
            </Link>

            <Link
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-3 text-gray-300 transition hover:text-yellow-400"
            >
              <Mail size={18} />

              <span>{COMPANY.email}</span>
            </Link>

            <Link
              href={COMPANY.website}
              target="_blank"
              className="flex items-center gap-3 break-all text-gray-300 transition hover:text-yellow-400"
            >
              <Globe size={18} />

              <span>{COMPANY.website}</span>
            </Link>

            <Link
              href={COMPANY.maps}
              target="_blank"
              className="flex items-center gap-3 text-gray-300 transition hover:text-yellow-400"
            >
              <MapPin size={18} />

              <span>Open in Google Maps</span>
            </Link>
          </div>
        </div>

        {/* ==========================================
            Address
        ========================================== */}

        <div>
          <h3 className="mb-4 text-lg font-bold text-yellow-400">
            Address
          </h3>

          <div className="space-y-1 text-gray-300">
            <p>{COMPANY.address.shop}</p>

            <p>{COMPANY.address.building}</p>

            <p>{COMPANY.address.landmark}</p>

            <p>{COMPANY.address.area}</p>

            <p>{COMPANY.address.road}</p>

            <p>
              {COMPANY.address.city},{" "}
              {COMPANY.address.district}
            </p>

            <p>
              {COMPANY.address.state} -{" "}
              {COMPANY.address.pincode}
            </p>

            <p>{COMPANY.address.country}</p>
          </div>

          {/* ==========================================
              Working Hours
          ========================================== */}

          <div className="mt-6">
            <h4 className="mb-3 font-semibold text-yellow-400">
              Working Hours
            </h4>

            <p className="text-sm text-gray-400">
              Monday - Sunday
            </p>

            <p className="font-medium text-white">
              {COMPANY.workingHours.monday}
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          Bottom
      ========================================== */}

      <div className="border-t border-yellow-500/20 px-8 py-5 text-center text-sm text-gray-400">
        {COMPANY.copyright}
      </div>
    </footer>
  );
}