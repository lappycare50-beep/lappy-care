import {
  Search,
  FileCheck2,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Device Inspection",
    description:
      "Our technicians carefully inspect your laptop to identify hardware or software issues and perform a complete diagnosis.",
  },
  {
    step: "02",
    icon: FileCheck2,
    title: "Repair Estimate",
    description:
      "We provide a transparent repair estimate with clear pricing before starting any repair work.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Professional Repair",
    description:
      "Using quality parts and advanced tools, we perform reliable repairs for all major laptop brands.",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Quality Testing & Delivery",
    description:
      "Every repaired laptop undergoes thorough quality testing before it is delivered to the customer.",
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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Repair Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Simple & Transparent Laptop Repair Process
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            We follow a structured repair process to ensure every laptop
            receives accurate diagnosis, professional repair and complete
            quality testing before delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 text-5xl font-bold text-yellow-100">
                  {step.step}
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-black p-8 text-center"
            >
              <div className="text-4xl font-bold text-yellow-400">
                {stat.value}
              </div>

              <p className="mt-3 text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}