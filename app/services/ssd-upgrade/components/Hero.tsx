import Link from "next/link";
import {
  HardDrive,
  Zap,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
              Professional SSD Upgrade Service
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl xl:text-6xl">
              Laptop SSD Upgrade
              <span className="block text-yellow-400">
                in Pune
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Upgrade your laptop with a high-speed NVMe or SATA SSD for
              faster boot times, improved performance and smoother
              multitasking. Lappy Care provides professional SSD
              installation, data migration and performance optimization
              for all major laptop brands.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Zap className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    Faster Performance
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Significantly faster boot and application loading.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HardDrive className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    NVMe & SATA SSDs
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Compatible SSD upgrades for supported laptop models.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    Safe Data Migration
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Move Windows, software and files to your new SSD.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    Quick Installation
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Fast professional installation and testing.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
              >
                Book SSD Upgrade
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="tel:+919595057006"
                className="inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-white transition hover:bg-yellow-400 hover:text-black"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <HardDrive className="h-10 w-10" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Why Upgrade to an SSD?
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Replacing an old HDD with a modern SSD is one of the best
              upgrades for improving laptop speed, reliability and overall
              user experience.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Faster Windows Boot Time",
                "Quicker Software Loading",
                "Improved Multitasking",
                "Lower Power Consumption",
                "Better Reliability than HDD",
                "Professional Installation & Testing",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-black p-5 text-center text-white">
              <p className="font-semibold text-yellow-400">
                Serving Pune & PCMC
              </p>

              <p className="mt-2 text-sm text-gray-300">
                Wakad • Hinjawadi • Baner • Balewadi • Punawale • Tathawade
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}