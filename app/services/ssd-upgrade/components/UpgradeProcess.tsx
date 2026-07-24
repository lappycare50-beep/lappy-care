import {
  SearchCheck,
  HardDrive,
  Database,
  LaptopMinimalCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: SearchCheck,
    title: "Laptop Inspection",
    description:
      "We inspect your laptop to check SSD compatibility, storage interface (NVMe or SATA), available capacity and overall system health.",
  },
  {
    icon: HardDrive,
    title: "SSD Selection & Installation",
    description:
      "Our technicians recommend the right SSD based on your laptop and performance needs, then install it professionally.",
  },
  {
    icon: Database,
    title: "Data Migration & Windows Setup",
    description:
      "We securely migrate your operating system, software and personal files to the new SSD or perform a clean Windows installation if required.",
  },
  {
    icon: LaptopMinimalCheck,
    title: "Performance Testing",
    description:
      "Finally, we test boot speed, SSD health, system stability and overall laptop performance before delivery.",
  },
];

export default function UpgradeProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Our Process
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            SSD Upgrade Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We follow a professional step-by-step process to ensure your SSD
            upgrade is safe, reliable and delivers the maximum performance
            improvement for your laptop.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-black" />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-yellow-400">
                    {index + 1}
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-8 w-8 text-yellow-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Every SSD Upgrade Includes
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Every laptop undergoes compatibility verification,
                professional SSD installation, performance optimization and
                complete testing before it is returned to the customer.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "✔ NVMe & SATA Compatibility Check",
                "✔ Professional SSD Installation",
                "✔ Data Migration Support",
                "✔ Windows Installation",
                "✔ SSD Health & Speed Testing",
                "✔ Final Quality Inspection",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}