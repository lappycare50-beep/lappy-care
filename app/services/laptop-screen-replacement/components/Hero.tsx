"use client";

import Link from "next/link";
import { Monitor, ShieldCheck, Clock3, CheckCircle2, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_45%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:px-8">
        {/* Left Content */}
        <div className="flex-1">
          <span className="inline-flex rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-sm font-semibold text-yellow-400">
            Professional Laptop Screen Replacement
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Laptop Screen Replacement
            <span className="block text-yellow-400">in Pune</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Cracked, broken, flickering or dead laptop display?
            Lappy Care provides professional laptop screen replacement
            services for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook,
            MSI and all major laptop brands using premium quality
            compatible and genuine display panels.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Genuine & Compatible Displays",
              "Experienced Repair Engineers",
              "Quick Turnaround Time",
              "Warranty on Replacement",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#booking"
              className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
            >
              Book Screen Replacement
            </Link>

            <Link
              href="tel:+919595057006"
              className="flex items-center gap-2 rounded-xl border border-yellow-400 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </Link>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex w-full max-w-md justify-center">
          <div className="w-full rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8 shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-black">
              <Monitor size={42} />
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold">
              Why Choose Lappy Care?
            </h2>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">
                    Quality Display Panels
                  </h3>
                  <p className="text-sm text-gray-400">
                    High-quality compatible and genuine replacement
                    screens for all major laptop brands.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock3 className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">
                    Fast Service
                  </h3>
                  <p className="text-sm text-gray-400">
                    Most laptop screen replacements are completed as
                    quickly as possible, subject to model and parts
                    availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">
                    Warranty Support
                  </h3>
                  <p className="text-sm text-gray-400">
                    Replacement screens are backed by warranty according
                    to the specific display model and supplier terms.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-yellow-400 p-4 text-center text-black">
              <p className="text-lg font-bold">
                Serving Customers Across Pune
              </p>
              <p className="text-sm">
                Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                Tathawade • Ravet • Aundh • Bavdhan • Pashan •
                Chinchwad • Pimple Saudagar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}