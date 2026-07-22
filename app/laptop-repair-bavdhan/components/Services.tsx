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
    icon: Monitor,
    title: "Laptop Screen Replacement",
    description:
      "Professional LCD and LED screen replacement for all major laptop brands using high-quality compatible parts.",
  },
  {
    icon: Cpu,
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnosis and repair for power, display and charging issues.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Replacement",
    description:
      "Replace old or swollen laptop batteries with reliable, high-quality replacements for longer backup.",
  },
  {
    icon: HardDrive,
    title: "SSD & RAM Upgrade",
    description:
      "Upgrade your laptop with faster SSD storage and additional RAM for improved speed and performance.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    description:
      "Repair or replace damaged laptop keyboards, touchpads and palm rests for smooth everyday use.",
  },
  {
    icon: Database,
    title: "Data Recovery",
    description:
      "Recover important files from damaged HDDs, SSDs and laptops whenever recovery is technically possible.",
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
            Professional Laptop Repair Services in Bavdhan
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care provides complete laptop repair solutions for students,
            professionals, businesses and home users across Bavdhan with
            experienced technicians, genuine quality parts and transparent
            pricing.
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Need Fast Laptop Repair in Bavdhan?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Book your laptop repair today and let our experienced technicians
            diagnose and repair your device quickly using quality parts,
            professional tools and industry best practices.
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