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
      "Experienced technicians providing professional laptop repair services for all major laptop brands.",
  },
  {
    icon: Clock,
    title: "Same-Day Repair",
    description:
      "Many software issues, SSD upgrades and screen replacements are completed on the same day whenever possible.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on Repairs",
    description:
      "Eligible repairs and replacement parts are covered with a service warranty for added peace of mind.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Spare Parts",
    description:
      "We use high-quality compatible and genuine spare parts whenever available for reliable repairs.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and drop service is available across Pimple Saudagar and nearby locations.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Receive a clear repair estimate after diagnosis with no hidden charges.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Customers in Pimple Saudagar Trust Lappy Care
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care is trusted by students, working professionals,
            businesses and home users across Pimple Saudagar for reliable
            laptop repair services, experienced technicians and transparent
            pricing.
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
            Trusted Laptop Repair in Pimple Saudagar
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Whether you need motherboard repair, laptop screen replacement,
            battery replacement, SSD upgrade, RAM upgrade, keyboard repair or
            data recovery, Lappy Care provides dependable repair solutions with
            quality workmanship, experienced technicians and excellent customer
            support.
          </p>
        </div>
      </div>
    </section>
  );
}