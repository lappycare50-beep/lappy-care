import {
  ShieldCheck,
  Wrench,
  Clock3,
  Truck,
  BadgeCheck,
  Star,
  CheckCircle2,
  Cpu,
} from "lucide-react";

const features = [
  {
    title: "14+ Years Experience",
    description: "Trusted laptop repair experts serving thousands of customers.",
    icon: BadgeCheck,
  },
  {
    title: "5000+ Repairs",
    description: "Successfully repaired laptops from all major brands.",
    icon: Wrench,
  },
  {
    title: "Certified Technicians",
    description: "Experienced engineers for chip-level diagnostics and repairs.",
    icon: Cpu,
  },
  {
    title: "Genuine Spare Parts",
    description: "Only quality replacement parts used for eligible repairs.",
    icon: ShieldCheck,
  },
  {
    title: "Same Day Service",
    description: "Most common repairs are completed on the same day.",
    icon: Clock3,
  },
  {
    title: "Pickup & Drop",
    description: "Convenient doorstep pickup and delivery across nearby areas.",
    icon: Truck,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 lg:text-5xl">
            Trusted Laptop Repair Experts in Wakad
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We combine experienced technicians, professional diagnostics,
            quality spare parts and transparent pricing to deliver reliable
            laptop repair services for every customer.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold">
                Professional Repairs You Can Trust
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Whether your laptop needs a motherboard repair, SSD upgrade,
                screen replacement, battery replacement, keyboard repair or
                complete servicing, our technicians ensure quality workmanship
                with transparent communication throughout the repair process.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Free diagnosis for most repairs",
                "Transparent repair estimate",
                "Quality spare parts",
                "Warranty on eligible repairs",
                "Fast turnaround time",
                "Excellent customer support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={22}
                    className="text-green-400"
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid gap-6 border-t border-zinc-800 pt-10 text-center sm:grid-cols-3">
            <div>
              <div className="flex justify-center">
                <Star
                  size={34}
                  className="fill-yellow-400 text-yellow-400"
                />
              </div>

              <h4 className="mt-3 text-3xl font-bold">4.9★</h4>

              <p className="text-gray-400">Google Rating</p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-yellow-400">
                5000+
              </h4>

              <p className="mt-2 text-gray-400">
                Laptops Repaired
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-yellow-400">
                14+
              </h4>

              <p className="mt-2 text-gray-400">
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}