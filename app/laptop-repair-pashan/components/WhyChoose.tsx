import {
  Award,
  Clock3,
  ShieldCheck,
  Cpu,
  Truck,
  BadgeIndianRupee,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "14+ Years Experience",
    description:
      "Experienced laptop repair technicians handling hardware and chip-level repairs across all major laptop brands.",
  },
  {
    icon: Clock3,
    title: "Same-Day Repairs",
    description:
      "Many laptop repairs including SSD upgrades, RAM upgrades and software issues are completed on the same day.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Support",
    description:
      "Warranty available on eligible repairs and replacement parts for complete peace of mind.",
  },
  {
    icon: Cpu,
    title: "Genuine Quality Parts",
    description:
      "We use high-quality compatible parts to ensure reliable performance and long-lasting repairs.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and drop service available for customers across Pashan and nearby Pune locations.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    description:
      "Receive a clear repair estimate before work begins with no hidden charges.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Trusted Laptop Repair Experts in Pashan
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thousands of customers trust Lappy Care for reliable laptop repair,
            experienced technicians, genuine quality parts and professional
            customer support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-yellow-400 p-4">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-yellow-600">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Professional Laptop Repair You Can Trust
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Whether you need a motherboard repair, screen replacement, battery
            replacement, SSD upgrade, RAM upgrade or data recovery, Lappy Care
            delivers reliable repair solutions with transparent pricing and
            expert workmanship.
          </p>
        </div>
      </div>
    </section>
  );
}