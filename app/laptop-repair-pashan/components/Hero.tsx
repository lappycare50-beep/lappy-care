import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";

const stats = [
  {
    value: "5000+",
    label: "Laptops Repaired",
  },
  {
    value: "14+",
    label: "Years Experience",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    value: "Warranty",
    label: "On Eligible Repairs",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#facc15_0%,transparent_30%)] opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              Trusted Laptop Repair Service in Pashan
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
              Laptop Repair in{" "}
              <span className="text-yellow-400">Pashan</span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-300">
              Looking for professional laptop repair in Pashan? Lappy Care
              provides expert motherboard repair, screen replacement, battery
              replacement, keyboard repair, SSD & RAM upgrades and data recovery
              for Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and other leading
              laptop brands.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#booking"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
              >
                Book Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="tel:+919595057006"
                className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-yellow-400" />
                Genuine Quality Parts
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-yellow-400" />
                Pickup & Drop Available
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-yellow-400" />
                Transparent Pricing
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-3xl border border-yellow-400/20 bg-white/5 p-8 backdrop-blur">
              <h2 className="text-3xl font-bold text-white">
                Why Customers Choose Lappy Care
              </h2>

              <p className="mt-4 text-gray-300">
                Trusted by thousands of customers across Pashan and nearby Pune
                locations for fast, reliable and professional laptop repair
                services.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-yellow-400/20 bg-black/30 p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-yellow-400">
                      {item.value}
                    </div>

                    <div className="mt-2 text-sm text-gray-300">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-3 text-center text-gray-300">
                Rated <span className="font-semibold text-white">4.9★</span> by
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}