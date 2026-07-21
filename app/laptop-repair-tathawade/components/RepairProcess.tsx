import {
  Search,
  FileCheck,
  Wrench,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Device Inspection",
    description:
      "We carefully inspect your laptop and identify the exact hardware or software issue.",
  },
  {
    icon: FileCheck,
    title: "Repair Estimate",
    description:
      "After diagnosis, we provide a transparent repair estimate before any work begins.",
  },
  {
    icon: Wrench,
    title: "Professional Repair",
    description:
      "Our technicians repair your laptop using quality replacement parts and professional tools.",
  },
  {
    icon: CheckCircle,
    title: "Quality Testing & Delivery",
    description:
      "Every repaired laptop is thoroughly tested before being returned to the customer.",
  },
];

const stats = [
  {
    value: "5000+",
    label: "Laptops Repaired",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    value: "14+",
    label: "Years Experience",
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
          <h2 className="text-4xl font-bold text-gray-900">
            Our Laptop Repair Process in Tathawade
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            We follow a simple, transparent and professional repair process to
            ensure every customer receives reliable service with complete peace
            of mind.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
              >
                <div className="absolute right-6 top-6 text-5xl font-bold text-gray-100">
                  {index + 1}
                </div>

                <div className="mb-6 inline-flex rounded-xl bg-yellow-100 p-4">
                  <Icon className="h-8 w-8 text-yellow-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-gray-600">
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
              className="rounded-2xl bg-black p-8 text-center text-white"
            >
              <h3 className="text-4xl font-bold text-yellow-400">
                {stat.value}
              </h3>

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