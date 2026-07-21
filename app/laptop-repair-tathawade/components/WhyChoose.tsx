import {
  Award,
  Clock,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "14+ Years Experience",
    description:
      "Experienced technicians providing reliable laptop repair services for all major brands.",
  },
  {
    icon: Clock,
    title: "Same-Day Repair",
    description:
      "Many software issues, SSD upgrades and screen replacements can be completed the same day.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on Repairs",
    description:
      "Eligible repairs and replacement parts are backed by service warranty for added confidence.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Spare Parts",
    description:
      "We use high-quality compatible and genuine replacement parts whenever available.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and delivery service available for eligible locations around Tathawade.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Get a clear repair estimate after diagnosis with no hidden charges before work begins.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Customers in Tathawade Trust Lappy Care
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            We combine experienced technicians, quality replacement parts,
            transparent pricing and fast turnaround to deliver dependable laptop
            repair services for customers across Tathawade and nearby areas.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
              >
                <div className="mb-6 inline-flex rounded-xl bg-yellow-100 p-4">
                  <Icon className="h-8 w-8 text-yellow-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Trusted Laptop Repair in Tathawade
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Whether your laptop needs a screen replacement, motherboard repair,
            battery replacement, SSD upgrade or data recovery, Lappy Care is
            committed to delivering professional service with quality workmanship.
          </p>
        </div>
      </div>
    </section>
  );
}