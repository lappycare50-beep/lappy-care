import {
  ShieldCheck,
  Wrench,
  Clock3,
  BadgeCheck,
  IndianRupee,
  Cpu,
  Users,
  Star,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Repair Warranty",
    description:
      "Warranty available on eligible repairs for complete peace of mind.",
  },
  {
    icon: Wrench,
    title: "Certified Technicians",
    description:
      "Experienced engineers trained to repair all major laptop brands.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "Most common repairs are completed as quickly as possible, often on the same day.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Quality Parts",
    description:
      "We use genuine or high-quality compatible spare parts for reliable performance.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description:
      "No hidden charges. You receive an estimate before repair work begins.",
  },
  {
    icon: Cpu,
    title: "Advanced Diagnostics",
    description:
      "Professional tools help identify issues accurately before repair.",
  },
];

const stats = [
  {
    icon: Users,
    value: "5000+",
    label: "Happy Customers",
  },
  {
    icon: Wrench,
    value: "10000+",
    label: "Repairs Completed",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Quality Focus",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Trusted Laptop Repair Experts in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            We combine experienced technicians, quality spare parts,
            transparent pricing and professional service to deliver
            reliable laptop repairs for every customer.
          </p>

        </div>

        {/* Features */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-yellow-400/20 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* Stats */}

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-yellow-400 p-8 text-center"
              >
                <Icon
                  className="mx-auto text-black"
                  size={34}
                />

                <h3 className="mt-4 text-4xl font-extrabold text-black">
                  {stat.value}
                </h3>

                <p className="mt-2 font-medium text-gray-800">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}