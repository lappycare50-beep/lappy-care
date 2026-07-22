import {
  Cpu,
  HardDrive,
  BatteryCharging,
  Keyboard,
  Monitor,
  Database,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Monitor,
    title: "Laptop Screen Replacement",
    description:
      "Professional LCD & LED screen replacement for cracked, flickering or damaged laptop displays.",
  },
  {
    icon: Cpu,
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnosis and repair for power, charging and display issues.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Replacement",
    description:
      "Replace weak or damaged laptop batteries with high-quality compatible replacements.",
  },
  {
    icon: HardDrive,
    title: "SSD & RAM Upgrade",
    description:
      "Boost laptop speed and multitasking performance with SSD and memory upgrades.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    description:
      "Repair or replace damaged laptop keyboards, touchpads and palm rest assemblies.",
  },
  {
    icon: Database,
    title: "Data Recovery",
    description:
      "Professional recovery of important files from HDDs, SSDs and damaged laptops.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Complete Laptop Repair Services in Pashan
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides reliable laptop repair services for students,
            professionals, businesses and home users across Pashan and nearby
            Pune locations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-yellow-400 p-4">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 transition-colors group-hover:text-yellow-600">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Need Fast Laptop Repair in Pashan?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Book your laptop repair today and let our experienced technicians
            diagnose and repair your device using genuine quality parts and
            professional tools.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}