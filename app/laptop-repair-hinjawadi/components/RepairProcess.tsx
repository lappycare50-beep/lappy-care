import {
  ClipboardCheck,
  Search,
  Wrench,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Book Your Repair",
    description:
      "Call us, WhatsApp us or submit an online repair request. We also offer pickup & drop service in eligible areas across Hinjawadi.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Laptop Diagnosis",
    description:
      "Our technicians carefully inspect your laptop, identify the issue and provide a transparent repair estimate before any work begins.",
    icon: Search,
  },
  {
    step: "03",
    title: "Professional Repair",
    description:
      "After your approval, we repair your laptop using quality replacement parts and professional repair equipment.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Testing & Delivery",
    description:
      "Every repaired laptop goes through quality testing before it is delivered to ensure reliable performance.",
    icon: BadgeCheck,
  },
];

const stats = [
  {
    value: "5000+",
    label: "Repairs Completed",
  },
  {
    value: "4.9★",
    label: "Google Rating",
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
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Repair Process
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Our Laptop Repair Process
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care follows a simple, transparent and professional repair
            process to ensure every customer receives reliable laptop repair
            service in Hinjawadi.
          </p>
        </div>

        {/* Process Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 text-5xl font-extrabold text-yellow-100">
                  {step.step}
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}

        <div className="mt-20 rounded-3xl bg-black p-10">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <h3 className="text-4xl font-extrabold text-yellow-400">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <p className="text-lg leading-8 text-gray-300">
              From laptop diagnosis to final quality testing, every repair is
              handled with care by experienced technicians. We proudly serve
              customers across Hinjawadi Phase 1, Phase 2, Phase 3, Blue Ridge,
              Megapolis, Marunji, Maan and nearby Pune locations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}