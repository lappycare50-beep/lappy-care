import Link from "next/link";
import {
  Monitor,
  Cpu,
  BatteryCharging,
  HardDrive,
  Keyboard,
  Database,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional LCD & LED screen replacement for all major laptop brands.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Motherboard Repair",
    description:
      "Chip-level motherboard diagnosis and repair by experienced technicians.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "Laptop Battery Replacement",
    description:
      "Replace weak or damaged laptop batteries with quality replacements.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "SSD & RAM Upgrade",
    description:
      "Boost laptop speed and performance with SSD and RAM upgrades.",
    href: "/services/ssd-ram-upgrade",
    icon: HardDrive,
  },
  {
    title: "Keyboard Repair",
    description:
      "Repair or replace faulty laptop keyboards and touchpads.",
    href: "/services/laptop-keyboard-repair",
    icon: Keyboard,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important data from damaged HDDs, SSDs and laptops.",
    href: "/services/data-recovery",
    icon: Database,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Explore Our Laptop Repair Services
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Along with laptop repair in Chinchwad, Lappy Care offers complete
            hardware and software solutions for home users, students,
            professionals and businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900 group-hover:text-yellow-600">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-6 inline-flex items-center font-semibold text-yellow-600">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Complete Laptop Solutions Under One Roof
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            From motherboard repair and screen replacement to SSD upgrades,
            keyboard repair and data recovery, Lappy Care provides dependable
            laptop repair services across Chinchwad and nearby PCMC areas.
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