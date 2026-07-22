import {
  Award,
  Cpu,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Experienced Chip-Level Engineers",
    description:
      "Our technicians have extensive experience diagnosing and repairing laptop motherboard faults, including power circuits, charging ICs, BIOS issues, display circuits and component-level failures.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Diagnostic Equipment",
    description:
      "We use professional diagnostic tools to identify the exact motherboard fault before recommending the most appropriate repair solution.",
  },
  {
    icon: Clock3,
    title: "Transparent Repair Process",
    description:
      "Every laptop is inspected, diagnosed and explained before repair begins. You'll receive a clear estimate and repair recommendation with no hidden charges.",
  },
  {
    icon: BadgeCheck,
    title: "Warranty on Eligible Repairs",
    description:
      "Eligible motherboard repairs are backed by warranty depending on the repaired components and replacement parts used.",
  },
  {
    icon: Users,
    title: "Trusted Across Pune & PCMC",
    description:
      "Customers from Wakad, Hinjawadi, Baner, Balewadi, Punawale, Pimpri-Chinchwad and nearby areas trust Lappy Care for reliable motherboard repair services.",
  },
  {
    icon: Award,
    title: "Quality-Focused Repairs",
    description:
      "Every repaired motherboard undergoes extensive testing for power stability, charging, display output, ports and overall performance before delivery.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Trusted Laptop Motherboard Repair Experts in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Motherboard repair requires precision, experience and the right
            diagnostic equipment. At Lappy Care, we combine advanced
            chip-level repair techniques with transparent service to help
            restore your laptop quickly and reliably.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-black to-zinc-900 p-10 text-white">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold">
                Professional Motherboard Repair You Can Trust
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Whether your laptop has a dead motherboard, no display,
                charging problem, liquid damage or BIOS failure, our
                experienced engineers perform detailed diagnostics before
                every repair. We focus on repairing the existing motherboard
                whenever technically feasible, helping customers save both
                time and replacement costs.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h4 className="text-2xl font-bold">
                What You Can Expect
              </h4>

              <ul className="mt-6 space-y-3">
                <li>✓ Detailed Motherboard Diagnosis</li>
                <li>✓ Chip-Level Component Repair</li>
                <li>✓ Transparent Pricing</li>
                <li>✓ Quality Tested Repairs</li>
                <li>✓ Warranty on Eligible Repairs</li>
                <li>✓ Service Across Pune & PCMC</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}