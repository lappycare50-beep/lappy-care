import {
  Power,
  MonitorX,
  BatteryWarning,
  Droplets,
  Cpu,
  AlertTriangle,
} from "lucide-react";

const problems = [
  {
    icon: Power,
    title: "Laptop Not Turning On",
    description:
      "A completely dead laptop is often caused by motherboard power section faults, damaged ICs, blown components or short circuits that require professional diagnosis.",
  },
  {
    icon: MonitorX,
    title: "No Display or Blank Screen",
    description:
      "If your laptop powers on but shows no display, the problem may be related to the motherboard display circuit, GPU section, BIOS or display signal components.",
  },
  {
    icon: BatteryWarning,
    title: "Charging Issues",
    description:
      "Charging IC failures, damaged DC jack circuits or motherboard power management faults can prevent your laptop from charging or powering on properly.",
  },
  {
    icon: Droplets,
    title: "Liquid Damage",
    description:
      "Water, tea or coffee spills can corrode motherboard components and create short circuits. Immediate professional cleaning and repair improves recovery chances.",
  },
  {
    icon: Cpu,
    title: "Random Restart & Freezing",
    description:
      "Unexpected shutdowns, random restarts and system freezing may indicate failing motherboard components, unstable power delivery or chipset-related faults.",
  },
  {
    icon: AlertTriangle,
    title: "Overheating & Burnt Components",
    description:
      "Burnt ICs, damaged MOSFETs, overheating circuits and shorted components can affect overall laptop stability and require chip-level motherboard repair.",
  },
];

export default function CommonProblems() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Common Motherboard Problems
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Signs Your Laptop May Need Motherboard Repair
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Laptop motherboard failures can appear in many different ways.
            Our engineers perform detailed chip-level diagnostics to
            identify the exact fault and recommend the most suitable repair
            solution for your laptop.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
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

        <div className="mt-16 rounded-3xl border border-yellow-200 bg-yellow-50 p-10">
          <h3 className="text-2xl font-bold text-gray-900">
            Professional Chip-Level Diagnosis
          </h3>

          <p className="mt-4 leading-8 text-gray-700">
            At Lappy Care, every laptop undergoes a detailed motherboard
            diagnosis before repair begins. We identify issues such as power
            section failures, damaged ICs, BIOS corruption, charging circuit
            faults, display circuit problems and liquid damage. Our goal is
            to repair the existing motherboard whenever technically feasible,
            helping customers avoid unnecessary replacement costs while
            restoring reliable performance.
          </p>
        </div>
      </div>
    </section>
  );
}