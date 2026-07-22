import Link from "next/link";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional laptop screen replacement for cracked, flickering and damaged displays.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Motherboard Repair",
    description:
      "Chip-level motherboard diagnosis and repair for power, display and boot issues.",
    href: "/services/motherboard-repair",
    icon: Cpu,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop with a high-speed SSD for faster boot time and better performance.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "RAM Upgrade",
    description:
      "Increase your laptop's memory for smoother multitasking and improved productivity.",
    href: "/services/ram-upgrade",
    icon: MemoryStick,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Explore More Laptop Repair Services
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides complete laptop repair and upgrade solutions,
            including screen replacement, motherboard repair, SSD upgrades and
            RAM upgrades for all major laptop brands.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600 transition group-hover:gap-3">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Complete Laptop Repair Solutions Under One Roof
          </h3>

          <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-300">
            Whether you need a battery replacement, screen replacement,
            motherboard repair or a performance upgrade, our technicians provide
            reliable repair services for HP, Dell, Lenovo, ASUS, Acer, Apple
            MacBook and other leading laptop brands.
          </p>
        </div>
      </div>
    </section>
  );
}