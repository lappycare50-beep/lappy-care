import Link from "next/link";
import { ArrowRight, Phone, HardDrive, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* Left Content */}
            <div>
              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
                Laptop SSD Upgrade Experts
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
                Ready to Upgrade
                <span className="block text-yellow-400">
                  Your Laptop with an SSD?
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Give your laptop a new life with a professional SSD upgrade.
                Whether you need a high-speed NVMe SSD, SATA SSD installation,
                secure data migration or Windows installation, Lappy Care is
                here to help.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Professional NVMe & SATA SSD Installation",
                  "Secure Data Migration",
                  "Windows Installation Available",
                  "Performance Optimization",
                  "Final Quality Testing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-yellow-400" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
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

            {/* Right Card */}
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400">
                <HardDrive className="h-10 w-10 text-black" />
              </div>

              <h3 className="mt-6 text-3xl font-bold text-gray-900">
                Why Upgrade Today?
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Replacing an old HDD with a modern SSD is one of the most
                effective ways to improve laptop performance without replacing
                the entire device.
              </p>

              <div className="mt-8 rounded-2xl bg-yellow-50 p-6">
                <h4 className="font-semibold text-gray-900">
                  Included with Every Upgrade
                </h4>

                <ul className="mt-4 space-y-3 text-gray-700">
                  <li>✔ SSD Compatibility Check</li>
                  <li>✔ Professional Installation</li>
                  <li>✔ Data Migration Support</li>
                  <li>✔ Windows Installation (Optional)</li>
                  <li>✔ SSD Health & Performance Testing</li>
                </ul>
              </div>

              <div className="mt-8 rounded-2xl bg-black p-5 text-center">
                <p className="font-semibold text-yellow-400">
                  Serving Pune & PCMC
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                  Tathawade • Ravet • Pimple Saudagar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}