"use client";

import {
  Star,
  ShieldCheck,
  Truck,
  Clock3,
  Award,
  Wrench,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import TrackCallButton from "@/components/analytics/TrackCallButton";
import TrackWhatsappButton from "@/components/analytics/TrackWhatsappButton";
import TrackBookRepairButton from "@/components/analytics/TrackBookRepairButton";

export default function Hero() {
  return (
    <section className="bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 text-black px-4 py-2 font-semibold">

              <Star
                size={16}
                fill="currentColor"
              />

              Trusted Laptop Repair in Wakad

            </div>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight">

              Laptop Repair

              <span className="block text-yellow-400">
                in Wakad
              </span>

            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-300">

              Lappy Care provides professional laptop repair services in
              Wakad for Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and
              other major brands. From motherboard repair and screen
              replacement to SSD upgrades, battery replacement and data
              recovery, our experienced technicians deliver reliable
              repairs with genuine parts and warranty.

            </p>

            <div className="mt-8 flex items-center gap-2 text-yellow-400 font-medium">

              <MapPin size={18} />

              Datta Mandir Road • Wakad • Pune

            </div>

            {/* Trust Points */}

            <div className="grid grid-cols-2 gap-4 mt-10">

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

            {/* CTA */}

            <div className="mt-10 flex flex-wrap gap-4">

              <TrackCallButton
                className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black hover:bg-yellow-300 transition"
              />

              <TrackWhatsappButton
                className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-500 transition"
              />

              <TrackBookRepairButton
                className="rounded-xl border border-white px-8 py-4 font-bold hover:bg-white hover:text-black transition"
              />

            </div>

          </div>

          {/* RIGHT */}

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

              {/* Highlights */}

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