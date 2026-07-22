import Link from "next/link";
import {
  BatteryCharging,
  ArrowRight,
  Phone,
  CalendarCheck,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.12),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-10 backdrop-blur-sm lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
                Ready to Replace Your Laptop Battery?
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Get Your Laptop Battery Replaced by Professionals
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                If your laptop battery drains quickly, doesn't charge properly,
                or has become swollen, our technicians can diagnose the problem
                and recommend the right replacement. We provide genuine and
                premium compatible batteries for all major laptop brands.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Quality Batteries
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Genuine & premium compatible options available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 className="mt-1 h-6 w-6 text-yellow-400" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Fast Turnaround
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Quick diagnosis and professional installation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right CTA Card */}
            <div className="rounded-3xl bg-yellow-400 p-8 text-black shadow-2xl">
              <BatteryCharging className="h-14 w-14" />

              <h3 className="mt-5 text-3xl font-bold">
                Book Your Battery Inspection Today
              </h3>

              <p className="mt-4 leading-7">
                Visit Lappy Care for a professional battery health check.
                We'll inspect your laptop, explain the issue clearly and
                provide a transparent quotation before starting any work.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href="/#booking"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-900"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Battery Replacement
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black px-6 py-4 font-semibold transition hover:bg-black hover:text-white"
                >
                  <Phone className="h-5 w-5" />
                  Call +91 95950 57006
                </Link>
              </div>

              <div className="mt-8 rounded-xl bg-black/10 p-4">
                <p className="text-center text-sm font-medium">
                  ✓ Battery Health Check
                  <br />
                  ✓ Professional Installation
                  <br />
                  ✓ Complete Charging System Testing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}