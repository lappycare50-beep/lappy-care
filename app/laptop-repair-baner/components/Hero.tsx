import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";

const highlights = [
  "Same Day Repair Available*",
  "Pickup & Drop Service",
  "Experienced Technicians",
  "Warranty on Eligible Repairs",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* Left Content */}

        <div>
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            Laptop Repair in Baner
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Professional Laptop Repair
            <span className="block text-yellow-400">
              Services in Baner, Pune
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Lappy Care provides expert laptop repair services in Baner including
            motherboard repair, screen replacement, SSD upgrades, battery
            replacement, keyboard repair, charging issue repair and data
            recovery for all major laptop brands.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:+919595057006"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>

            <Link
              href="/book-repair"
              className="inline-flex items-center justify-center rounded-xl border border-yellow-400 px-8 py-4 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              Book Repair
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
            <span>⭐ 4.9 Google Rating</span>
            <span>5000+ Repairs</span>
            <span>14+ Years Experience</span>
          </div>
        </div>

        {/* Right Content */}

        <div className="relative">
          <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white">
              Why Baner Chooses Lappy Care
            </h2>

            <p className="mt-4 leading-8 text-gray-300">
              We serve customers across Baner with fast turnaround, transparent
              pricing, quality replacement parts and experienced technicians.
              Whether your laptop has a hardware or software issue, we provide
              reliable repair solutions with pickup & drop service available in
              eligible locations.
            </p>

            <div className="mt-8 rounded-2xl bg-yellow-400 p-6">
              <p className="text-lg font-bold text-black">
                ✔ Dell • HP • Lenovo • ASUS • Acer • Apple MacBook
              </p>

              <p className="mt-3 text-black/80">
                Screen Replacement • Motherboard Repair • SSD Upgrade • Battery
                Replacement • Keyboard Repair • Data Recovery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}