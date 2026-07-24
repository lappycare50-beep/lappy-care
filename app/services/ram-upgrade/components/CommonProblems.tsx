import {
  BatteryWarning,
  BatteryCharging,
  Flame,
  Power,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

const problems = [
  {
    title: "Battery Drains Quickly",
    description:
      "Your laptop loses charge much faster than before, even after a full charge. This usually indicates reduced battery health or aging battery cells.",
    icon: BatteryWarning,
  },
  {
    title: "Laptop Not Charging",
    description:
      "If your laptop does not charge properly, the issue may be caused by the battery, charger, charging port, or internal charging circuit. We perform a complete diagnosis before recommending a replacement.",
    icon: BatteryCharging,
  },
  {
    title: "Swollen Laptop Battery",
    description:
      "A swollen battery is a serious safety concern. It can damage the keyboard, touchpad, display, and laptop chassis if not replaced promptly.",
    icon: AlertTriangle,
  },
  {
    title: "Unexpected Shutdowns",
    description:
      "If your laptop suddenly switches off even when the battery indicator shows remaining charge, the battery may no longer deliver stable power.",
    icon: Power,
  },
  {
    title: "Laptop Overheating While Charging",
    description:
      "Excessive heat during charging can indicate battery failure or charging-related issues that require immediate professional inspection.",
    icon: Flame,
  },
  {
    title: "Battery Not Detected",
    description:
      "If Windows or macOS cannot detect the battery, the issue may involve the battery pack, connector, BIOS settings, or charging hardware.",
    icon: ShieldAlert,
  },
];

export default function CommonProblems() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Common Battery Problems
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Signs Your Laptop Battery May Need Replacement
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Laptop batteries naturally wear out over time. If your battery
            no longer provides sufficient backup, charges slowly, or causes
            unexpected shutdowns, it may be time for a professional battery
            inspection or replacement.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {problem.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Content */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <h3 className="text-2xl font-bold">
            Professional Laptop Battery Diagnosis & Replacement
          </h3>

          <p className="mt-5 leading-8 text-gray-300">
            Not every battery issue requires an immediate replacement. Our
            technicians first perform a complete battery health check and
            inspect the charger, charging port, charging circuit and related
            hardware before recommending the most suitable solution. This
            ensures you receive the correct repair while avoiding unnecessary
            replacement costs.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">
            <h4 className="text-lg font-semibold text-yellow-400">
              We Diagnose Before We Replace
            </h4>

            <p className="mt-3 leading-7 text-gray-300">
              Our process includes battery health evaluation, charging system
              testing, connector inspection, BIOS verification (where
              applicable), and post-installation testing to ensure reliable
              performance after replacement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}