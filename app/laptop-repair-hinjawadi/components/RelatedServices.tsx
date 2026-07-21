import Link from "next/link";
import {
  Cpu,
  Monitor,
  HardDrive,
  Keyboard,
  BatteryCharging,
  Database,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Motherboard Repair",
    description:
      "Professional motherboard diagnosis and chip-level laptop repair.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "Laptop Screen Replacement",
    description:
      "Replacement of cracked, flickering and damaged laptop displays.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop with a faster SSD for improved performance.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "Keyboard Replacement",
    description:
      "Repair or replace faulty laptop keyboards with quality parts.",
    href: "/services/keyboard-replacement",
    icon: Keyboard,
  },
  {
    title: "Battery Replacement",
    description:
      "Replace weak or damaged laptop batteries with reliable replacements.",
    href: "/services/battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important files from damaged or inaccessible SSDs and HDDs.",
    href: "/services/data-recovery",
    icon: Database,
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
            Explore Our Laptop Repair Services
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care offers complete laptop repair solutions for customers in
            Hinjawadi, including motherboard repair, display replacement, SSD
            upgrades, battery replacement and professional data recovery.
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition group-hover:bg-yellow-400">
                  <Icon className="h-8 w-8 text-yellow-600 group-hover:text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600">
                  Learn More
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-yellow-400 p-10 text-center">
          <h3 className="text-3xl font-bold text-black">
            Complete Laptop Repair Solutions
          </h3>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-black/80">
            Whether you need motherboard repair, laptop screen replacement,
            SSD upgrade, RAM upgrade, battery replacement, keyboard repair or
            data recovery, Lappy Care provides reliable repair services for all
            major laptop brands across Hinjawadi and nearby areas.
          </p>
        </div>
      </div>
    </section>
  );
}