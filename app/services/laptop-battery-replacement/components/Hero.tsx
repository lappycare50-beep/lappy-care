"use client";

import Link from "next/link";
import {
  BatteryCharging,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  Phone,
} from "lucide-react";

const highlights = [
  "Genuine & High-Quality Compatible Batteries",
  "Professional Installation",
  "Battery Health Check",
  "Warranty on Eligible Replacements",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.15),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm font-semibold text-yellow-400">
              Professional Laptop Battery Replacement
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
              Laptop Battery Replacement
              <span className="block text-yellow-400">
                in Pune
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Looking for a reliable laptop battery replacement service in
              Pune? Lappy Care replaces weak, swollen, damaged, and
              non-charging laptop batteries for HP, Dell, Lenovo, ASUS,
              Acer, Apple MacBook, MSI, Samsung and other leading brands
              using genuine or premium compatible batteries.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                <BatteryCharging className="h-5 w-5" />
                Book Battery Replacement
              </Link>

              <Link
                href="tel:+919595057006"
                className="inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </Link>
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8 shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <BatteryCharging className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Why Replace Your Laptop Battery at Lappy Care?
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />

                <div>
                  <h3 className="font-semibold">
                    Genuine & Compatible Batteries
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    We provide genuine batteries whenever available and
                    premium-quality compatible batteries for a wide range
                    of laptop brands and models.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3 className="mt-1 h-6 w-6 text-yellow-400" />

                <div>
                  <h3 className="font-semibold">
                    Fast Replacement Service
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    Most battery replacements are completed quickly,
                    depending on battery availability and your laptop
                    model.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />

                <div>
                  <h3 className="font-semibold">
                    Trusted Across Pune & PCMC
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    Customers from Wakad, Hinjawadi, Baner, Balewadi,
                    Punawale, Tathawade, Ravet, Pimpri, Chinchwad,
                    Aundh and nearby areas trust Lappy Care for reliable
                    laptop battery replacement services.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-yellow-400 p-5 text-center text-black">
              <p className="text-xl font-bold">
                Better Battery Backup Starts Here
              </p>

              <p className="mt-2 text-sm">
                Professional Battery Replacement with Expert Installation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}