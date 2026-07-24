import Link from "next/link";
import { BadgeCheck, HardDrive, ArrowRight, Phone } from "lucide-react";

const includes = [
  "Laptop Compatibility Check",
  "Professional SSD Installation",
  "NVMe & SATA SSD Support",
  "Windows Installation (Optional)",
  "Secure Data Migration",
  "SSD Health & Performance Testing",
];

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Transparent Pricing
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop SSD Upgrade Pricing
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every laptop requires a different SSD depending on its compatibility,
            storage capacity and performance requirements. We inspect your
            laptop and recommend the best upgrade option before providing a
            transparent quotation.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Left Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
              <HardDrive className="h-8 w-8 text-black" />
            </div>

            <h3 className="mt-6 text-3xl font-bold text-gray-900">
              What Affects the Cost?
            </h3>

            <div className="mt-8 space-y-4 text-gray-600">
              <p>• SSD Capacity (256GB, 512GB, 1TB & above)</p>
              <p>• SSD Type (NVMe or SATA)</p>
              <p>• SSD Brand & Availability</p>
              <p>• Laptop Compatibility</p>
              <p>• Data Migration Requirement</p>
              <p>• Windows Installation (Optional)</p>
            </div>

            <div className="mt-8 rounded-2xl bg-yellow-50 p-5">
              <p className="font-semibold text-gray-900">
                ✔ Free Compatibility Inspection
              </p>

              <p className="mt-2 text-gray-600">
                Our technicians first inspect your laptop and recommend the
                right SSD before providing a quotation.
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl bg-black p-10 text-white shadow-xl">
            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
              Included with Every SSD Upgrade
            </span>

            <div className="mt-8 space-y-4">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-yellow-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-white/10 p-6">
              <h4 className="text-xl font-semibold text-yellow-400">
                Need a Quote?
              </h4>

              <p className="mt-3 text-gray-300">
                Contact Lappy Care for a free laptop inspection and receive the
                best SSD upgrade recommendation based on your budget and
                performance requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
                >
                  Book SSD Upgrade
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-6 py-3 font-semibold text-white transition hover:bg-yellow-400 hover:text-black"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}