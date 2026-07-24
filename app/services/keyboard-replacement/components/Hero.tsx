import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Keyboard,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const highlights = [
  "Same Day Service*",
  "Genuine & Compatible Keyboards",
  "Warranty Supported",
  "Free Keyboard Diagnosis",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
              Laptop Keyboard Replacement Experts
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Laptop Keyboard
              <span className="block text-yellow-400">
                Replacement in Pune
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Fast and professional laptop keyboard replacement for HP, Dell,
              Lenovo, ASUS, Acer, Apple and all major brands. We replace broken,
              non-working, backlit and liquid-damaged keyboards using
              high-quality replacement parts.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
              >
                Book Keyboard Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="tel:+919595057006"
                className="inline-flex items-center rounded-xl border border-gray-600 px-6 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Service Areas
              </p>

              <p className="mt-3 leading-7 text-gray-300">
                Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                Tathawade • Ravet • Pimple Saudagar • Pune • PCMC
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl bg-white p-10 text-black shadow-2xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400">
              <Keyboard className="h-10 w-10" />
            </div>

            <h2 className="mt-8 text-3xl font-bold">
              Why Choose Lappy Care?
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">
                    Professional Service
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Experienced technicians replace laptop keyboards with
                    precision and care.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Keyboard className="mt-1 h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">
                    Genuine & Compatible Parts
                  </h3>
                  <p className="mt-1 text-gray-600">
                    High-quality replacement keyboards for all leading laptop
                    brands and models.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Wrench className="mt-1 h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">
                    Fast Turnaround
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Most keyboard replacements are completed the same day,
                    subject to spare availability.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-yellow-400 p-6">
              <h3 className="text-xl font-bold">
                Supported Brands
              </h3>

              <p className="mt-3 leading-7">
                HP • Dell • Lenovo • ASUS • Acer • Apple • MSI • Samsung • LG •
                Microsoft Surface
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}