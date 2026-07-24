import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Keyboard,
  MapPin,
  Phone,
} from "lucide-react";

const highlights = [
  "Same Day Service*",
  "Genuine & Compatible Keyboards",
  "Experienced Technicians",
  "Warranty Supported",
];

export default function FinalCTA() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 p-10 text-black shadow-2xl lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-yellow-400">
                <Keyboard className="h-10 w-10" />
              </div>

              <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">
                Need Laptop Keyboard
                <span className="block">
                  Replacement in Pune?
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8">
                Get your laptop keyboard replaced by experienced technicians
                using high-quality replacement parts. We support HP, Dell,
                Lenovo, ASUS, Acer, Apple, MSI, Samsung, LG and Microsoft
                Surface laptops.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-900"
                >
                  Book Keyboard Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="inline-flex items-center rounded-xl border-2 border-black px-6 py-4 font-semibold transition hover:bg-black hover:text-white"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-3xl bg-black p-10 text-white">
              <h3 className="text-3xl font-bold">
                Why Choose Lappy Care?
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                We provide professional keyboard replacement services with
                transparent pricing, quality-tested spare parts and careful
                installation for every laptop.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span>Professional diagnosis before replacement</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span>Compatible & genuine replacement keyboards</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span>Complete keyboard functionality testing</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span>Friendly support & transparent pricing</span>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-yellow-400 p-6 text-black">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6" />

                  <h4 className="text-xl font-bold">
                    Serving Pune & PCMC
                  </h4>
                </div>

                <p className="mt-4 leading-7">
                  Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                  Tathawade • Ravet • Pimple Saudagar • Pimpri •
                  Chinchwad • Aundh • Pashan
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          *Same-day keyboard replacement depends on laptop model and spare part
          availability.
        </p>
      </div>
    </section>
  );
}