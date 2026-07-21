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
      "Our certified technicians repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and all major laptop brands using professional tools.",
  },
  {
    icon: Clock3,
    title: "Same Day Repair*",
    description:
      "Many software repairs, SSD upgrades, RAM upgrades and screen replacements can be completed on the same day for eligible devices.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on Eligible Repairs",
    description:
      "Eligible repairs and replacement parts include warranty for complete peace of mind.",
  },
  {
    icon: Wrench,
    title: "Professional Diagnostics",
    description:
      "Every laptop undergoes detailed diagnosis before repair so you receive the right solution at the right price.",
  },
  {
    icon: Truck,
    title: "Pickup & Drop Service",
    description:
      "Convenient pickup and drop service is available across Balewadi and nearby areas, subject to availability.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description:
      "No hidden charges. We always provide a repair estimate before starting any work.",
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
            Why Customers in Balewadi Trust Lappy Care
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-300">
            We provide trusted laptop repair services for students, working
            professionals, businesses and home users across Balewadi with
            quality workmanship, transparent pricing and reliable support.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
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
          <div className="grid gap-10 text-center md:grid-cols-4">
            <div>
              <h3 className="text-4xl font-extrabold text-black">4.9★</h3>
              <p className="mt-2 font-medium text-black/80">
                Google Rating
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-black">5000+</h3>
              <p className="mt-2 font-medium text-black/80">
                Repairs Completed
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-black">14+</h3>
              <p className="mt-2 font-medium text-black/80">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-black">98%</h3>
              <p className="mt-2 font-medium text-black/80">
                Customer Satisfaction
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <p className="text-lg leading-8 text-black/80">
              Lappy Care proudly serves customers across Balewadi, Baner,
              Mahalunge, Sus, Aundh, Pashan and nearby Pune areas. Whether you
              need motherboard repair, screen replacement, SSD upgrade,
              battery replacement, keyboard repair or data recovery, our
              experienced technicians are ready to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}