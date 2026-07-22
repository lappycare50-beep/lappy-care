import Link from "next/link";
import {
  BadgeIndianRupee,
  BatteryCharging,
  CheckCircle2,
  ShieldCheck,
  Phone,
  CalendarCheck,
} from "lucide-react";

const pricingFactors = [
  {
    title: "Laptop Brand & Model",
    description:
      "Battery prices vary depending on the laptop brand, model and battery specification.",
    icon: BatteryCharging,
  },
  {
    title: "Battery Type",
    description:
      "Pricing depends on whether a genuine battery or a premium-quality compatible battery is selected.",
    icon: ShieldCheck,
  },
  {
    title: "Availability",
    description:
      "Some batteries are readily available while others may require ordering, which can affect the final quotation.",
    icon: BadgeIndianRupee,
  },
];

const includes = [
  "Professional Battery Health Check",
  "Complete Charging System Inspection",
  "Safe Battery Installation",
  "Charging & Performance Testing",
  "Transparent Repair Estimate",
  "Warranty on Eligible Replacements",
];

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Transparent Pricing
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Laptop Battery Replacement Cost
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            The cost of replacing a laptop battery depends on your laptop
            brand, battery type and availability. We inspect your device
            first and provide a clear quotation before starting any work.
          </p>
        </div>

        {/* Pricing Factors */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingFactors.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h3 className="text-2xl font-bold">
                What's Included?
              </h3>

              <div className="mt-8 space-y-4">
                {includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 leading-8 text-gray-300">
                Every laptop receives a professional diagnosis before
                recommending a battery replacement. This ensures that
                charging problems caused by the charger, charging port or
                motherboard are identified correctly before replacing the
                battery.
              </p>
            </div>

            {/* Right */}
            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <BadgeIndianRupee className="h-12 w-12" />

              <h3 className="mt-5 text-2xl font-bold">
                Request a Free Battery Inspection
              </h3>

              <p className="mt-4 leading-7">
                Bring your laptop to Lappy Care for a professional battery
                health check. We'll inspect the battery and charging system,
                explain the issue and provide a transparent quotation before
                any replacement is carried out.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Inspection
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="inline-flex items-center gap-2 rounded-xl border border-black px-6 py-3 font-semibold transition hover:bg-black hover:text-white"
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