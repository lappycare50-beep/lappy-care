import {
  Search,
  BatteryCharging,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Battery Health Diagnosis",
    description:
      "We inspect the battery, charger, charging port and charging system to identify the exact cause of the problem before recommending a replacement.",
    icon: Search,
  },
  {
    title: "Battery Selection",
    description:
      "Based on your laptop model, we recommend a genuine battery whenever available or a premium-quality compatible battery for reliable performance.",
    icon: BatteryCharging,
  },
  {
    title: "Professional Installation",
    description:
      "Our technicians carefully replace the battery, inspect connectors, verify charging performance and ensure safe installation.",
    icon: PackageCheck,
  },
  {
    title: "Testing & Delivery",
    description:
      "We perform charging verification, battery health checks and functional testing before delivering your laptop.",
    icon: CheckCircle2,
  },
];

export default function RepairProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Our Battery Replacement Process
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Professional Laptop Battery Replacement in 4 Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every laptop battery replacement follows a structured process
            to ensure accurate diagnosis, proper installation and reliable
            long-term performance.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-yellow-400">
                      {index + 1}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-4 leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-8 w-8 text-yellow-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Reliable Battery Replacement with Quality Assurance
          </h3>

          <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-300">
            Our battery replacement process focuses on accurate diagnosis,
            safe installation and complete testing. Whether your laptop has
            poor battery backup, charging issues or a swollen battery, we
            ensure every replacement is completed with attention to quality,
            safety and long-term reliability.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-6 py-3 text-yellow-400 font-semibold">
            Professional Diagnosis • Quality Batteries • Safe Installation
          </div>
        </div>
      </div>
    </section>
  );
}