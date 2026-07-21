import Link from "next/link";
import {
  Monitor,
  Cpu,
  BatteryCharging,
  HardDrive,
  Keyboard,
  Database,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description: "Fast replacement for cracked, damaged or flickering laptop displays.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Motherboard Repair",
    description: "Professional chip-level motherboard diagnosis and repair.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "Battery Replacement",
    description: "Replace weak or swollen laptop batteries with quality replacements.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "SSD & RAM Upgrade",
    description: "Boost laptop speed with SSD installation and RAM upgrades.",
    href: "/services/ssd-ram-upgrade",
    icon: HardDrive,
  },
  {
    title: "Keyboard Repair",
    description: "Repair or replace faulty keyboards, touchpads and power buttons.",
    href: "/services/laptop-keyboard-repair",
    icon: Keyboard,
  },
  {
    title: "Data Recovery",
    description: "Recover important files from damaged HDDs and SSDs whenever possible.",
    href: "/services/data-recovery",
    icon: Database,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Complete Laptop Repair Services in Tathawade
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            From hardware repairs to software troubleshooting, Lappy Care
            provides complete laptop repair solutions for customers across
            Tathawade and nearby areas.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
              >
                <div className="mb-6 inline-flex rounded-xl bg-yellow-100 p-4">
                  <Icon className="h-8 w-8 text-yellow-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Complete Laptop Solutions Under One Roof
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Whether you need a motherboard repair, screen replacement, battery
            replacement, SSD upgrade, RAM upgrade or professional data recovery,
            Lappy Care is your trusted laptop repair partner in Tathawade.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
          </Link>
        </div>
      </div>
    </section>
  );
}