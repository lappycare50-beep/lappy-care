import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MemoryStick,
  Phone,
  MessageCircle,
} from "lucide-react";

const highlights = [
  "Free RAM Compatibility Check",
  "DDR3, DDR4 & DDR5 Support",
  "Professional Installation",
  "Performance Testing Included",
  "Transparent Pricing",
  "Same-Day Service Available",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.08),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-zinc-900 to-black p-10 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <MemoryStick className="h-10 w-10" />
              </div>

              <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                Upgrade Your Laptop
                <span className="block text-yellow-400">
                  RAM Today
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Improve laptop speed, multitasking and overall performance with
                a professional RAM upgrade from Lappy Care. We provide DDR3,
                DDR4 and DDR5 RAM upgrades with complete compatibility checks,
                expert installation and performance testing across Pune & PCMC.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                    <span className="text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-900">
                Book Your RAM Upgrade
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Get a free compatibility inspection and receive the best RAM
                upgrade recommendation for your laptop. Our technicians will
                help you choose the correct memory for maximum performance.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href="/#booking"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
                >
                  Book RAM Upgrade
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black px-6 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </Link>

                <Link
                  href="https://wa.me/919595057006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </Link>
              </div>

              <div className="mt-8 rounded-2xl bg-gray-100 p-5">
                <p className="text-sm font-medium text-gray-700">
                  📍 Serving:
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                  Tathawade • Ravet • Pimple Saudagar • Pune • PCMC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}