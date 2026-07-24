import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  HardDrive,
  Laptop,
  Monitor,
  Wrench,
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
    title: "Battery Replacement",
    description:
      "Replace old, swollen or fast-draining laptop batteries with quality replacements.",
    href: "/services/battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop with a high-speed SSD for faster boot times and improved performance.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "Motherboard Repair",
    description:
      "Expert motherboard diagnosis and chip-level repair for all major laptop brands.",
    href: "/services/motherboard-repair",
    icon: Wrench,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Laptop Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Explore More
            <span className="block text-yellow-500">
              Laptop Repair Services
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care offers complete laptop repair and upgrade services,
            including screen replacement, motherboard repair, battery
            replacement and SSD upgrades for all major laptop brands.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 transition group-hover:text-yellow-600">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-8 inline-flex items-center font-semibold text-yellow-600">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <Laptop className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-bold">
                Complete Laptop Repair Solutions
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                From keyboard replacement to motherboard repair, SSD upgrades,
                battery replacement and screen replacement, Lappy Care provides
                complete laptop repair services across Pune and PCMC.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h3 className="text-2xl font-bold">
                Why Choose Lappy Care?
              </h3>

              <ul className="mt-6 space-y-3">
                <li>✔ Experienced Laptop Repair Technicians</li>
                <li>✔ Genuine & High-Quality Spare Parts</li>
                <li>✔ Transparent Pricing</li>
                <li>✔ Fast Turnaround Time</li>
                <li>✔ Warranty on Supported Repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}