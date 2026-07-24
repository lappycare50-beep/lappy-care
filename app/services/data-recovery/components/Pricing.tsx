import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  IndianRupee,
  MemoryStick,
  ShieldCheck,
} from "lucide-react";

const plans = [
  {
    title: "RAM Compatibility Check",
    price: "FREE",
    icon: ShieldCheck,
    features: [
      "Laptop inspection",
      "Maximum RAM capacity check",
      "DDR generation verification",
      "Upgrade recommendation",
    ],
  },
  {
    title: "Laptop RAM Upgrade",
    price: "Starting From ₹1,499*",
    icon: MemoryStick,
    features: [
      "Professional RAM installation",
      "Compatible memory selection",
      "Performance testing",
      "Hardware diagnostics",
    ],
    popular: true,
  },
  {
    title: "RAM + SSD Upgrade",
    price: "Best Value",
    icon: IndianRupee,
    features: [
      "Complete performance upgrade",
      "RAM + SSD installation",
      "Windows optimization",
      "Health & stability testing",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Affordable Pricing
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop RAM Upgrade Pricing
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            RAM upgrade cost depends on your laptop model, supported memory
            type, RAM capacity and memory brand. We always perform a free
            compatibility check before recommending the right upgrade.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.title}
                className={`relative rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl ${
                  plan.popular
                    ? "border-yellow-400 ring-2 ring-yellow-400"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
                    MOST POPULAR
                  </span>
                )}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {plan.title}
                </h3>

                <p className="mt-4 text-4xl font-extrabold text-black">
                  {plan.price}
                </p>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                      <span className="text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/#booking"
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
                >
                  Book Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Transparent Pricing
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                We recommend only compatible RAM upgrades based on your
                laptop's specifications. There are no hidden charges, and
                every quotation is explained before installation begins.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Free RAM compatibility inspection",
                "Original quality memory modules",
                "Professional installation",
                "Performance & stability testing",
                "Transparent quotation",
                "No hidden charges",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <BadgeCheck className="mt-1 h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            *Starting price may vary depending on laptop model, RAM type
            (DDR3/DDR4/DDR5), capacity, speed and brand availability.
          </p>
        </div>
      </div>
    </section>
  );
}