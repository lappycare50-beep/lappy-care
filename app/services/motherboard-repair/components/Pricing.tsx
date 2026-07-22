import {
  BadgeIndianRupee,
  CheckCircle2,
  Wrench,
  Cpu,
  Phone,
} from "lucide-react";
import Link from "next/link";

const pricingFactors = [
  {
    icon: Cpu,
    title: "Motherboard Fault",
    description:
      "Repair cost depends on whether the issue is related to the power section, charging circuit, BIOS, display circuit, GPU or other motherboard components.",
  },
  {
    icon: Wrench,
    title: "Component-Level Repair",
    description:
      "The estimate varies based on the number of damaged ICs, MOSFETs, capacitors, resistors or other components that require repair or replacement.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Laptop Brand & Model",
    description:
      "Repair complexity differs between HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and other laptop models, which may affect the final estimate.",
  },
];

const includes = [
  "Professional Motherboard Diagnosis",
  "Chip-Level Fault Detection",
  "Transparent Repair Estimate",
  "Quality Component Replacement (if required)",
  "Complete Functional Testing",
  "Warranty on Eligible Repairs",
];

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Pricing & Estimate
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Transparent Laptop Motherboard Repair Pricing
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every motherboard fault is different. After a complete diagnosis,
            our engineers provide a transparent repair estimate based on the
            actual fault, required components and repair complexity. No repair
            is started without your approval.
          </p>
        </div>

        {/* Pricing Factors */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingFactors.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
                Free Diagnosis Guidance
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Get an Accurate Motherboard Repair Estimate
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                The final repair cost depends on the motherboard fault,
                component availability and the complexity of the repair.
                Once our diagnosis is complete, we explain the issue,
                recommend the best solution and provide a detailed estimate
                before starting any work.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#booking"
                  className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
                >
                  Request Diagnosis
                </Link>

                <Link
                  href="tel:+919595057006"
                  className="flex items-center gap-2 rounded-xl border border-yellow-400 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-8">
              <h4 className="text-2xl font-bold">
                Our Repair Service Includes
              </h4>

              <div className="mt-6 space-y-4">
                {includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />

                    <span className="text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-yellow-400 p-5 text-center text-black">
                <p className="text-lg font-bold">
                  Honest Diagnosis • Transparent Pricing • Quality Repairs
                </p>

                <p className="mt-2 text-sm">
                  Serving Wakad, Hinjawadi, Baner, Balewadi, Punawale,
                  Tathawade, Ravet, Pimpri, Chinchwad, Aundh, Pashan and
                  nearby areas across Pune & PCMC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}