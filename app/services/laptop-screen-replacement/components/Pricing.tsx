import Link from "next/link";
import {
  BadgeIndianRupee,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

const pricingPlans = [
  {
    title: "Compatible Display",
    price: "Starting from ₹2,499*",
    description:
      "Suitable for many laptop models. Final pricing depends on screen size, resolution and availability.",
    features: [
      "High-quality compatible panel",
      "Professional installation",
      "Display quality testing",
      "Warranty as applicable",
    ],
  },
  {
    title: "Genuine / OEM Display",
    price: "Price on Request",
    description:
      "Original or OEM display options are available for selected laptop models, subject to availability.",
    features: [
      "OEM / Genuine panel (where available)",
      "Professional installation",
      "Complete quality inspection",
      "Warranty as applicable",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Pricing Information
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Screen Replacement Pricing
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Laptop screen replacement cost varies depending on the laptop
            brand, model, display size, screen resolution, touch support,
            and the type of replacement panel required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <BadgeIndianRupee size={32} />
              </div>

              <h3 className="mt-6 text-3xl font-bold text-gray-900">
                {plan.title}
              </h3>

              <p className="mt-3 text-2xl font-semibold text-yellow-600">
                {plan.price}
              </p>

              <p className="mt-5 leading-7 text-gray-600">
                {plan.description}
              </p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#booking"
                className="mt-8 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                Get Exact Quote
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Need an Exact Screen Replacement Quote?
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Share your laptop brand and model number with our team.
                We'll verify the correct display specification and provide
                an estimated quotation based on compatible replacement
                options and current parts availability.
              </p>

              <p className="mt-6 text-sm text-gray-400">
                *Prices shown are indicative starting prices and may vary
                depending on the laptop model, display type, screen size,
                resolution, touch functionality and parts availability.
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-black/30 p-8">
              <h4 className="text-2xl font-bold text-yellow-400">
                Before You Contact Us
              </h4>

              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✓ Laptop Brand</li>
                <li>✓ Laptop Model Number</li>
                <li>✓ Screen Size (if known)</li>
                <li>✓ Touch / Non-Touch Display</li>
                <li>✓ Photo of the Damaged Screen (Optional)</li>
              </ul>

              <Link
                href="tel:+919876543210"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                <PhoneCall size={20} />
                Call for Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}