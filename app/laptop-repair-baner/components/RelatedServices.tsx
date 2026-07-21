import Link from "next/link";
import {
  Laptop,
  Monitor,
  HardDrive,
  Cpu,
  BatteryCharging,
  Database,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional screen replacement for cracked, flickering and damaged laptop displays.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnostics and repair for all major laptop brands.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "SSD & RAM Upgrade",
    description:
      "Upgrade your laptop with faster SSD storage and additional RAM for better performance.",
    href: "/services/ssd-ram-upgrade",
    icon: HardDrive,
  },
  {
    title: "Battery Replacement",
    description:
      "Replace weak or damaged laptop batteries with quality compatible replacements.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important files from damaged, corrupted or failed storage devices whenever possible.",
    href: "/services/data-recovery",
    icon: Database,
  },
  {
    title: "General Laptop Repair",
    description:
      "Complete laptop repair services for hardware and software issues across Baner.",
    href: "/services/laptop-repair",
    icon: Laptop,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Our Laptop Repair Services in Baner
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            From motherboard repair to SSD upgrades and screen replacement,
            Lappy Care offers complete laptop repair solutions for customers in
            Baner and nearby Pune locations.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 transition group-hover:scale-110">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <span className="mt-6 inline-block font-semibold text-yellow-600 transition group-hover:translate-x-1">
                  Learn More →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Complete Laptop Repair Solutions
          </h3>

          <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-gray-300">
            Whether you need laptop screen replacement, motherboard repair,
            battery replacement, SSD upgrades or data recovery, Lappy Care
            provides professional repair services across Baner, Balewadi,
            Pashan, Aundh, Sus and nearby Pune areas.
          </p>
        </div>
      </div>
    </section>
  );
}