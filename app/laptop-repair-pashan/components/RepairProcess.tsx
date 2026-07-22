import {
  Search,
  FileText,
  Wrench,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Device Inspection",
    description:
      "Our technicians carefully inspect your laptop to identify hardware and software issues before starting the repair.",
  },
  {
    icon: FileText,
    title: "Repair Estimate",
    description:
      "You receive a transparent repair estimate with complete details before any repair work begins.",
  },
  {
    icon: Wrench,
    title: "Professional Repair",
    description:
      "Experienced technicians repair your laptop using genuine quality parts and professional repair equipment.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Testing & Delivery",
    description:
      "Every repaired laptop undergoes complete quality testing before being delivered to ensure reliable performance.",
  },
];

const stats = [
  {
    value: "5000+",
    label: "Laptops Repaired",
  },
  {
    value: "14+",
    label: "Years Experience",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
  },
];

export default function RepairProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Repair Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Our Laptop Repair Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We follow a professional repair process to ensure accurate
            diagnosis, transparent pricing and reliable repair quality for every
            laptop.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 text-5xl font-extrabold text-gray-100">
                  0{index + 1}
                </div>

                <div className="inline-flex rounded-2xl bg-yellow-400 p-4">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-yellow-400">
                  {stat.value}
                </div>

                <div className="mt-2 text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}