import {
  Search,
  MemoryStick,
  Wrench,
  Gauge,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Laptop Inspection",
    description:
      "We inspect your laptop configuration, motherboard, processor and current RAM to determine supported upgrade options.",
  },
  {
    icon: MemoryStick,
    title: "RAM Compatibility Check",
    description:
      "Our technicians verify DDR generation, RAM frequency, maximum capacity and slot availability before recommending an upgrade.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Compatible RAM modules are installed using professional tools while following proper anti-static safety procedures.",
  },
  {
    icon: Gauge,
    title: "Performance Testing",
    description:
      "The laptop is tested for stability, memory detection, performance improvements and overall system reliability.",
  },
];

const checks = [
  "Motherboard compatibility verification",
  "Processor supported memory check",
  "DDR3 / DDR4 / DDR5 confirmation",
  "Maximum RAM capacity verification",
  "Memory speed compatibility",
  "BIOS recognition testing",
  "Complete hardware diagnostics",
  "Performance benchmarking",
];

export default function UpgradeProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            RAM Upgrade Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Our Professional RAM Upgrade Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every laptop undergoes a structured inspection and compatibility
            check before installing new memory. This ensures reliable
            performance, maximum stability and long-term durability after the
            RAM upgrade.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 text-5xl font-bold text-gray-100">
                  0{index + 1}
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

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-yellow-400" />

                <h3 className="text-3xl font-bold text-yellow-400">
                  Every Upgrade Includes
                </h3>
              </div>

              <p className="mt-6 leading-8 text-gray-300">
                Our RAM upgrade service includes complete hardware verification,
                compatibility testing and post-installation diagnostics so your
                laptop performs at its best without stability issues.
              </p>
            </div>

            <div className="grid gap-4">
              {checks.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white/10 p-4"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />

                  <span className="text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6">
            <h4 className="text-xl font-bold text-white">
              Why Our Process Matters
            </h4>

            <p className="mt-4 text-gray-300">
              Installing incompatible RAM can lead to boot failures, crashes or
              unstable performance. Our step-by-step upgrade process ensures
              your laptop receives the correct memory configuration for maximum
              speed, reliability and long-term performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}