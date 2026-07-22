import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-black to-black">
          <div className="grid items-center gap-12 px-8 py-14 lg:grid-cols-2 lg:px-14">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
                Trusted Laptop Repair in Aundh
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
                Need Fast & Reliable Laptop Repair in Aundh?
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Whether your laptop has a broken screen, motherboard issue,
                battery problem, charging fault, keyboard damage or requires an
                SSD/RAM upgrade, Lappy Care is here to help with professional
                diagnostics, experienced technicians and transparent pricing.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full border border-yellow-400/20 bg-white/5 px-4 py-2 text-sm text-gray-200">
                  <ShieldCheck className="h-4 w-4 text-yellow-400" />
                  Warranty on Eligible Repairs
                </div>

                <div className="flex items-center gap-2 rounded-full border border-yellow-400/20 bg-white/5 px-4 py-2 text-sm text-gray-200">
                  <ShieldCheck className="h-4 w-4 text-yellow-400" />
                  Genuine Quality Parts
                </div>

                <div className="flex items-center gap-2 rounded-full border border-yellow-400/20 bg-white/5 px-4 py-2 text-sm text-gray-200">
                  <ShieldCheck className="h-4 w-4 text-yellow-400" />
                  Pickup & Drop Available
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-900">
                Book Your Laptop Repair Today
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Get a quick diagnosis, transparent repair estimate and
                professional repair service from experienced technicians.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href="/#booking"
                  className="flex w-full items-center justify-center rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
                >
                  Book Laptop Repair
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="flex w-full items-center justify-center rounded-xl border border-gray-300 px-6 py-4 font-semibold text-gray-900 transition hover:border-yellow-400 hover:bg-yellow-50"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 95950 57006
                </Link>

                <Link
                  href="https://wa.me/919595057006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-xl border border-green-500 px-6 py-4 font-semibold text-green-700 transition hover:bg-green-50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Link>
              </div>

              <div className="mt-8 rounded-2xl bg-gray-50 p-5">
                <p className="text-sm leading-6 text-gray-600">
                  <strong className="text-gray-900">
                    Serving:
                  </strong>{" "}
                  Aundh, Baner, Balewadi, Pashan, Bavdhan, Sangvi,
                  Pimple Nilakh, Pimple Saudagar, Wakad, Hinjawadi,
                  Tathawade and nearby Pune locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}