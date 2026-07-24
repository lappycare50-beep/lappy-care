import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Keyboard,
  Phone,
  ShieldCheck,
} from "lucide-react";

const pricingPlans = [
  {
    title: "Free Diagnosis",
    icon: Keyboard,
    price: "FREE",
    description:
      "Complete keyboard inspection to identify keyboard faults, ribbon cable issues, connector damage and liquid spills before recommending the best solution.",
    features: [
      "Keyboard Health Check",
      "Connector Inspection",
      "Ribbon Cable Testing",
      "Backlight Testing",
      "Repair Recommendation",
    ],
  },
  {
    title: "Keyboard Replacement",
    icon: ShieldCheck,
    price: "Get Quote",
    featured: true,
    description:
      "Pricing depends on your laptop brand, model, keyboard type (standard/backlit) and spare part availability.",
    features: [
      "Professional Installation",
      "Quality Tested",
      "Compatible / Genuine Parts",
      "Warranty Support",
      "Same Day Service*",
    ],
  },
  {
    title: "Business & Bulk Service",
    icon: Briefcase,
    price: "Custom Quote",
    description:
      "Corporate keyboard replacement solutions for offices, schools, colleges and IT companies with GST billing.",
    features: [
      "Bulk Pricing",
      "Priority Service",
      "Pickup & Drop",
      "GST Invoice",
      "Dedicated Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-yellow-700">
            Transparent Pricing
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Laptop Keyboard
            <span className="block text-yellow-500">
              Replacement Pricing
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Honest pricing with no hidden charges. The final quotation depends
            on your laptop model, keyboard type, layout and spare part
            availability.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.title}
                className={`relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.featured
                    ? "border-yellow-400 bg-black text-white"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.featured && (
                  <div className="bg-yellow-400 py-3 text-center font-bold text-black">
                    ★ Most Popular
                  </div>
                )}

                <div className="flex flex-1 flex-col p-8">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                      plan.featured
                        ? "bg-yellow-400 text-black"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3
                    className={`mt-6 text-2xl font-bold ${
                      plan.featured
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {plan.title}
                  </h3>

                  <p
                    className={`mt-4 text-4xl font-extrabold ${
                      plan.featured
                        ? "text-yellow-400"
                        : "text-yellow-600"
                    }`}
                  >
                    {plan.price}
                  </p>

                  <p
                    className={`mt-5 leading-7 ${
                      plan.featured
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3"
                      >
                        <BadgeCheck
                          className={`h-5 w-5 flex-shrink-0 ${
                            plan.featured
                              ? "text-yellow-400"
                              : "text-yellow-500"
                          }`}
                        />

                        <span
                          className={
                            plan.featured
                              ? "text-white"
                              : "text-gray-700"
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                                    <Link
                    href="/#contact"
                    className={`mt-auto inline-flex w-full items-center justify-center rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
                      plan.featured
                        ? "bg-yellow-400 text-black hover:bg-yellow-300"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 overflow-hidden rounded-3xl bg-black">
          <div className="grid gap-10 p-10 lg:grid-cols-2 lg:items-center lg:p-14">
            <div>
              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
                Free Quote
              </span>

              <h3 className="mt-6 text-4xl font-bold text-white">
                Need an Exact
                <span className="block text-yellow-400">
                  Keyboard Replacement Price?
                </span>
              </h3>

              <p className="mt-6 max-w-xl leading-8 text-gray-300">
                Share your laptop brand and model number with our technicians.
                We'll check spare availability and provide an accurate quotation
                before starting the repair.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="tel:+919595057006"
                  className="inline-flex items-center rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-yellow-400 p-8 text-black">
              <h4 className="text-2xl font-bold">
                What's Included?
              </h4>

              <div className="mt-8 space-y-4">
                {[
                  "Free Keyboard Diagnosis",
                  "Compatible / Genuine Keyboard",
                  "Professional Installation",
                  "Keyboard Function Testing",
                  "Transparent Pricing",
                  "Warranty Supported",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <BadgeCheck className="h-5 w-5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-black p-5 text-sm leading-7 text-gray-300">
                <strong className="text-yellow-400">Note:</strong>{" "}
                Final pricing depends on the laptop brand, model, keyboard
                layout, keyboard type (standard/backlit), availability of spare
                parts and any additional damage found during inspection.
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          *Same-day keyboard replacement depends on the laptop model and spare
          part availability.
        </p>
      </div>
    </section>
  );
}