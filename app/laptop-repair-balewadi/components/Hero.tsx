import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              Laptop Repair in Balewadi
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Professional Laptop Repair Services in{" "}
              <span className="text-yellow-400">Balewadi, Pune</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Lappy Care provides trusted laptop repair services in Balewadi,
              including motherboard repair, screen replacement, SSD upgrades,
              battery replacement, keyboard repair and data recovery for all
              major laptop brands.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/book-repair"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-7 py-4 font-bold text-black transition hover:bg-yellow-300"
              >
                Book Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="tel:+919876543210"
                className="inline-flex items-center rounded-xl border border-yellow-400 px-7 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-300">Same Day Repair*</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-300">Pickup & Drop Available</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-300">All Major Brands</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-300">Warranty on Eligible Repairs</span>
              </div>
            </div>

            <div className="mt-10 inline-flex items-center rounded-xl bg-zinc-900 px-5 py-4 text-gray-300">
              <MapPin className="mr-3 h-5 w-5 text-yellow-400" />
              Serving Balewadi, Baner, Mahalunge, Sus, Aundh & Nearby Areas
            </div>
          </div>

          {/* Right Stats Card */}
          <div className="rounded-3xl border border-yellow-400/20 bg-zinc-900 p-10">
            <h2 className="text-3xl font-bold text-yellow-400">
              Why Choose Lappy Care?
            </h2>

            <div className="mt-10 space-y-8">
              <div>
                <div className="text-5xl font-extrabold text-white">
                  5000+
                </div>
                <p className="mt-2 text-gray-400">
                  Laptops Successfully Repaired
                </p>
              </div>

              <div>
                <div className="text-5xl font-extrabold text-white">
                  4.9★
                </div>
                <p className="mt-2 text-gray-400">
                  Google Customer Rating
                </p>
              </div>

              <div>
                <div className="text-5xl font-extrabold text-white">
                  14+
                </div>
                <p className="mt-2 text-gray-400">
                  Years of Repair Experience
                </p>
              </div>

              <div>
                <div className="text-5xl font-extrabold text-white">
                  98%
                </div>
                <p className="mt-2 text-gray-400">
                  Customer Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}