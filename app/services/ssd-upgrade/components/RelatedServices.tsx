import Link from "next/link";
import {
  Cpu,
  Monitor,
  BatteryCharging,
  Microchip,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "RAM Upgrade",
    description:
      "Upgrade your laptop RAM for smoother multitasking and better overall performance.",
    href: "/services/ram-upgrade",
    icon: Cpu,
  },
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional laptop screen replacement for cracked, flickering and damaged displays.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Laptop Battery Replacement",
    description:
      "Replace old or damaged laptop batteries with high-quality compatible batteries.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "Motherboard Repair",
    description:
      "Chip-level motherboard diagnosis and repair for laptops that won't power on or have hardware faults.",
    href: "/services/motherboard-repair",
    icon: Microchip,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Explore More Laptop Upgrade & Repair Services
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Looking for more than an SSD upgrade? Lappy Care offers complete
            laptop repair and upgrade services including RAM upgrades, screen
            replacement, battery replacement and motherboard repair across
            Pune & PCMC.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-yellow-600">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600">
                  Learn More
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Complete Laptop Solutions Under One Roof
          </h3>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-300">
            From SSD upgrades and RAM upgrades to motherboard repairs, battery
            replacements and screen replacements, Lappy Care provides reliable
            laptop repair services for students, professionals, gamers and
            businesses across Pune.
          </p>
        </div>
      </div>
    </section>
  );
}