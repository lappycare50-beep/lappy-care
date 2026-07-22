import {
  Search,
  Cpu,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Advanced Diagnosis",
    description:
      "Our engineers perform a complete motherboard diagnosis using professional testing equipment to identify power faults, short circuits, BIOS issues, display problems and damaged components.",
  },
  {
    icon: Cpu,
    title: "2. Chip-Level Repair",
    description:
      "Faulty ICs, MOSFETs, capacitors, charging circuits, display circuits and other motherboard components are repaired or replaced whenever technically feasible.",
  },
  {
    icon: Wrench,
    title: "3. Testing & Quality Check",
    description:
      "After repair, the motherboard is tested for power stability, charging, display output, USB ports, keyboard, Wi-Fi, audio and overall system performance.",
  },
  {
    icon: CheckCircle2,
    title: "4. Delivery with Warranty",
    description:
      "Once all quality checks are successfully completed, the laptop is cleaned, verified and delivered with warranty on eligible motherboard repairs.",
  },
];

export default function RepairProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Repair Process
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Our Professional Motherboard Repair Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every laptop motherboard undergoes a structured repair process.
            From detailed diagnosis to final quality testing, we follow
            industry-standard procedures to ensure reliable and long-lasting
            repairs.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-6 top-16 hidden lg:block">
                    <ArrowRight className="h-6 w-6 text-yellow-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Reliable Chip-Level Motherboard Repair in Pune
          </h3>

          <p className="mx-auto mt-4 max-w-4xl leading-8 text-gray-300">
            Whether your laptop has a dead motherboard, charging issue,
            no display, BIOS corruption or liquid damage, our experienced
            technicians diagnose the exact problem and recommend the most
            appropriate repair solution. We proudly serve customers across
            Wakad, Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet,
            Pimpri, Chinchwad, Aundh, Pashan and nearby areas across Pune
            and PCMC.
          </p>

          <div className="mt-8 inline-flex rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black">
            Professional Diagnosis • Transparent Pricing • Quality Repairs
          </div>
        </div>
      </div>
    </section>
  );
}