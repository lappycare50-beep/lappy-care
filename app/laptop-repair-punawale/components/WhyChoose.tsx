import {
  Award,
  Clock3,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Wallet,
} from "lucide-react";

const features = [
  {
    title: "14+ Years Experience",
    description:
      "Experienced laptop repair technicians handling hardware and software issues across all major laptop brands.",
    icon: Award,
  },
  {
    title: "Same Day Repair",
    description:
      "Many common repairs like SSD upgrades, RAM upgrades and screen replacement can be completed on the same day.",
    icon: Clock3,
  },
  {
    title: "Warranty on Eligible Repairs",
    description:
      "Eligible repairs and replacement parts include warranty for added peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Genuine Quality Parts",
    description:
      "We use reliable replacement parts and professional repair procedures for long-lasting performance.",
    icon: BadgeCheck,
  },
  {
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and delivery service available across Punawale and nearby Pune locations.",
    icon: Truck,
  },
  {
    title: "Transparent Pricing",
    description:
      "Complete diagnosis and clear repair estimates before any repair work begins.",
    icon: Wallet,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Why Customers in Punawale Trust Lappy Care
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care is trusted by customers in Punawale for professional
            laptop repair, experienced technicians, transparent pricing,
            reliable diagnostics and quality customer support.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Trusted Across Punawale & Nearby Areas
          </h3>

          <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-gray-300">
            We proudly provide professional laptop repair services across
            Punawale, Wakad, Tathawade, Ravet, Kiwale, Akurdi, Nigdi,
            Thergaon and nearby Pune locations with fast turnaround,
            transparent pricing and dependable customer support.
          </p>
        </div>
      </div>
    </section>
  );
}