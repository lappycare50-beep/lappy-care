"use client";

import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Truck,
  Clock3,
  Award,
  Wrench,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">
              <Star size={16} fill="currentColor" />
              Trusted Laptop Repair in Wakad
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
              Laptop Repair
              <span className="block text-yellow-400">in Wakad</span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-300">
              Lappy Care provides professional laptop repair services in
              Wakad for Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and
              other major brands. We specialize in motherboard repair,
              screen replacement, SSD upgrades, RAM upgrades, battery
              replacement, keyboard repair and data recovery.
            </p>

            <div className="mt-8 flex items-center gap-2 font-medium text-yellow-400">
              <MapPin size={18} />
              Datta Mandir Road • Wakad • Pune
            </div>

            {/* Trust Points */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-yellow-400" />
                <span>Genuine Parts</span>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="text-yellow-400" />
                <span>Pickup & Drop</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="text-yellow-400" />
                <span>Same Day Repair</span>
              </div>

              <div className="flex items-center gap-3">
                <Award className="text-yellow-400" />
                <span>Repair Warranty</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+919595057006"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
              >
                <Phone size={20} />
                Call Now
              </a>

              <a
                href="https://wa.me/919595057006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>

              <Link
                href="/book-repair"
                className="inline-flex items-center rounded-xl border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-black"
              >
                Book Repair
              </Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl bg-black p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400">
                    5000+
                  </div>
                  <p className="mt-2 text-gray-400">
                    Repairs Completed
                  </p>
                </div>

                <div className="rounded-2xl bg-black p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400">
                    4.9★
                  </div>
                  <p className="mt-2 text-gray-400">
                    Google Rating
                  </p>
                </div>

                <div className="rounded-2xl bg-black p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400">
                    14+
                  </div>
                  <p className="mt-2 text-gray-400">
                    Years Experience
                  </p>
                </div>

                <div className="rounded-2xl bg-black p-6 text-center">
                  <Wrench
                    size={40}
                    className="mx-auto text-yellow-400"
                  />
                  <p className="mt-4 text-gray-400">
                    Chip Level Repair
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "Free Diagnosis for Most Repairs",
                  "Certified Technicians",
                  "Original Quality Spare Parts",
                  "Fast Turnaround Time",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-green-500"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}