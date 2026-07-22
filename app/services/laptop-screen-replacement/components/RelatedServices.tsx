import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  HardDrive,
  BatteryCharging,
  Database,
  Monitor,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "Motherboard Repair",
    description:
      "Professional chip-level motherboard diagnostics and repair for laptops with power, display and hardware issues.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "Laptop Battery Replacement",
    description:
      "Replace old or faulty laptop batteries with high-quality compatible or genuine battery options.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop to a faster SSD for improved boot time and overall system performance.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "RAM Upgrade",
    description:
      "Increase your laptop's memory to improve multitasking and application performance.",
    href: "/services/ram-upgrade",
    icon: Monitor,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important files from supported storage devices using professional recovery procedures.",
    href: "/services/data-recovery",
    icon: Database,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Explore More Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Related Laptop Repair Services
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Looking for more than a screen replacement? Lappy Care also
            provides a wide range of professional laptop repair and
            upgrade services across Pune and PCMC.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 font-semibold text-yellow-600 transition group-hover:gap-3">
                  Learn More
                  <ArrowRight size={18} />
                </div>
              </Link>
            );
          })}

          {/* Current Service Card */}
          <div className="rounded-3xl border-2 border-yellow-400 bg-yellow-50 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <Wrench size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              Laptop Screen Replacement
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              You're currently viewing our professional laptop screen
              replacement service page. We repair cracked, flickering,
              damaged and non-functional laptop displays for many major
              laptop brands.
            </p>

            <div className="mt-8 inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
              Current Service
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Complete Laptop Repair Solutions
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Whether your laptop needs a screen replacement,
                motherboard repair, SSD upgrade, RAM upgrade, battery
                replacement or data recovery, Lappy Care provides
                professional repair solutions tailored to your device.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <Link
                href="/#booking"
                className="rounded-xl bg-yellow-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-300"
              >
                Book Laptop Repair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}