import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

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
    label: "Google Rating",
  },
  {
    value: "Warranty",
    label: "On Eligible Repairs",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#facc1530,transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            <Wrench className="mr-2 h-4 w-4" />
            Trusted Laptop Repair Service in Bavdhan
          </span>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Laptop Repair in{" "}
            <span className="text-yellow-400">Bavdhan</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            Looking for professional laptop repair in Bavdhan? Lappy Care
            provides expert motherboard repair, screen replacement, battery
            replacement, keyboard repair, SSD & RAM upgrades and data recovery
            with experienced technicians, genuine quality parts and transparent
            pricing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#booking"
              className="inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              Book Laptop Repair
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

          <div className="mt-8 flex items-center justify-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="h-5 w-5 fill-current"
              />
            ))}

            <span className="ml-2 text-sm text-gray-300">
              Rated 4.9★ by Happy Customers
            </span>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <div className="text-4xl font-bold text-yellow-400">
                {stat.value}
              </div>

              <p className="mt-3 text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm text-gray-300">
            <ShieldCheck className="h-4 w-4 text-yellow-400" />
            Genuine Quality Parts
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm text-gray-300">
            <ShieldCheck className="h-4 w-4 text-yellow-400" />
            Pickup & Drop Available
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm text-gray-300">
            <ShieldCheck className="h-4 w-4 text-yellow-400" />
            Transparent Pricing
          </div>
        </div>
      </div>
    </section>
  );
}