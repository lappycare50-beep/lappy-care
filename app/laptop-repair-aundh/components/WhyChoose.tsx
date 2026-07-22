import {
  Award,
  Clock3,
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
    icon: Clock3,
    title: "Same-Day Repairs",
    description:
      "Many laptop issues including SSD upgrades, RAM upgrades and software problems are completed on the same day.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Support",
    description:
      "Eligible repairs and replacement parts include warranty for complete peace of mind.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Parts",
    description:
      "We use high-quality replacement parts to ensure reliable performance and long-lasting repairs.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and delivery service available across Aundh and nearby Pune locations.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden charges. We always provide a clear repair estimate before starting any repair work.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Why Customers in Aundh Trust Lappy Care
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Thousands of customers across Aundh and nearby Pune areas choose
            Lappy Care for reliable repairs, genuine parts, experienced
            technicians and excellent customer support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 to-transparent p-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Trusted Laptop Repair Experts in Aundh
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Whether it's a broken screen, motherboard issue, battery problem,
            keyboard replacement, charging issue or data recovery, our
            experienced technicians provide dependable laptop repair
            solutions with fast turnaround and professional service.
          </p>
        </div>
      </div>
    </section>
  );
}