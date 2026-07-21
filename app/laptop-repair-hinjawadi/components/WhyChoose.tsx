import {
  Award,
  Clock3,
  ShieldCheck,
  Wrench,
  Truck,
  IndianRupee,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Experienced Technicians",
    description:
      "Our certified technicians repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and all major laptop brands.",
  },
  {
    icon: Clock3,
    title: "Same Day Repair*",
    description:
      "Most software repairs, SSD upgrades and screen replacements are completed on the same day for eligible devices.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on Eligible Repairs",
    description:
      "Eligible repairs and replacement parts include warranty for your peace of mind.",
  },
  {
    icon: Wrench,
    title: "Professional Diagnostics",
    description:
      "Every laptop is thoroughly diagnosed before repair to ensure the correct solution.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and drop service is available across Hinjawadi and nearby locations.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description:
      "No hidden charges. We provide a repair estimate before starting any work.",
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

          <h2 className="mt-5 text-4xl font-bold text-white">
            Why Customers in Hinjawadi Choose Us
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-300">
            We provide trusted laptop repair services for students, IT
            professionals, freelancers and businesses across Hinjawadi with
            quality workmanship and transparent pricing.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 transition hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-yellow-400 p-10">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <h3 className="text-4xl font-bold text-black">5000+</h3>
              <p className="mt-2 text-black/80">Repairs Completed</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black">4.9★</h3>
              <p className="mt-2 text-black/80">Google Rating</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black">14+</h3>
              <p className="mt-2 text-black/80">Years Experience</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black">98%</h3>
              <p className="mt-2 text-black/80">Customer Satisfaction</p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <p className="text-lg leading-8 text-black/80">
              We proudly serve customers across Hinjawadi Phase 1, Phase 2,
              Phase 3, Blue Ridge, Megapolis, Marunji and nearby areas with
              motherboard repair, screen replacement, SSD upgrades, battery
              replacement, keyboard repair and data recovery services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}