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
    title: "Genuine Quality Parts",
    description:
      "We use high-quality replacement parts to ensure reliable performance and long-lasting repairs.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and delivery service is available across Bavdhan and nearby Pune locations.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden charges. Every repair begins only after providing a clear diagnosis and repair estimate.",
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
            Why Customers in Bavdhan Trust Lappy Care
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Lappy Care is trusted by students, professionals, home users and
            businesses across Bavdhan for reliable repairs, experienced
            technicians, genuine quality parts and excellent customer support.
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
            Professional Laptop Repair Experts in Bavdhan
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Whether your laptop requires a motherboard repair, screen
            replacement, battery replacement, keyboard repair, SSD upgrade,
            RAM upgrade or data recovery, our experienced technicians deliver
            dependable repair solutions with quality workmanship and fast
            turnaround.
          </p>
        </div>
      </div>
    </section>
  );
}