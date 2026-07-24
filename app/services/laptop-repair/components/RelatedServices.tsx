import Link from "next/link";
import {
  Monitor,
  BatteryCharging,
  Keyboard,
  HardDrive,
  Cpu,
  Database,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional screen replacement for cracked, damaged and flickering laptop displays.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Laptop Battery Replacement",
    description:
      "Replace old or swollen batteries with high-quality compatible batteries.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "Keyboard Replacement",
    description:
      "Fix damaged keyboards, missing keys and liquid-damaged keyboards.",
    href: "/services/keyboard-replacement",
    icon: Keyboard,
  },
  {
    title: "SSD Upgrade",
    description:
      "Boost laptop performance with a high-speed SSD upgrade.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard repair by experienced engineers.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important files from damaged hard drives and SSDs.",
    href: "/services/data-recovery",
    icon: Database,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Explore Our Laptop Repair Services
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide complete laptop repair and upgrade solutions for all
            major brands. Explore our specialized services below.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-yellow-600">
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

      </div>
    </section>
  );
}