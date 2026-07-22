"use client";

import Link from "next/link";
import {
  Phone,
  CalendarCheck,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const highlights = [
  "Professional Chip-Level Diagnosis",
  "Experienced Motherboard Engineers",
  "Transparent Repair Estimate",
  "Warranty on Eligible Repairs",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-zinc-900 shadow-2xl">
          <div className="grid gap-12 p-10 lg:grid-cols-2 lg:p-14">
            {/* Left Content */}
            <div>
              <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm font-semibold text-yellow-400">
                Laptop Motherboard Repair in Pune
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                Get Your Laptop Repaired by
                <span className="block text-yellow-400">
                  Experienced Chip-Level Engineers
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Whether your laptop is not turning on, has a motherboard
                failure, charging issue, no display, BIOS problem or liquid
                damage, Lappy Care provides professional motherboard repair
                services for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook,
                MSI and other leading laptop brands.
              </p>

              <div className="mt-8 space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-400" />

                    <span className="text-gray-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/#booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Repair
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
            <div className="rounded-3xl bg-black/40 p-8 backdrop-blur-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <Cpu className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Why Choose Lappy Care?
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />

                  <div>
                    <h4 className="font-semibold">
                      Professional Diagnosis
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      Every laptop is carefully inspected before repair to
                      identify the exact motherboard fault and recommend the
                      most suitable solution.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />

                  <div>
                    <h4 className="font-semibold">
                      Quality Repair Process
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      We follow a structured chip-level repair process,
                      professional testing and quality checks before every
                      laptop is delivered.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />

                  <div>
                    <h4 className="font-semibold">
                      Serving Pune & PCMC
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      We proudly provide motherboard repair services for
                      customers from Wakad, Hinjawadi, Baner, Balewadi,
                      Punawale, Tathawade, Ravet, Pimpri, Chinchwad,
                      Aundh, Pashan and nearby areas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-yellow-400 p-5 text-center text-black">
                <p className="text-xl font-bold">
                  Professional • Reliable • Trusted
                </p>

                <p className="mt-2 text-sm">
                  Laptop Motherboard Repair by Experienced Technicians
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}