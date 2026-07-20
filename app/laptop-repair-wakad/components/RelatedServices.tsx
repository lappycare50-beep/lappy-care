import Link from "next/link";
import {
  ArrowRight,
  Monitor,
  Cpu,
  HardDrive,
  Keyboard,
  BatteryCharging,
  Database,
  Fan,
  Wifi,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional LCD and LED screen replacement for all major laptop brands.",
    href: "/laptop-screen-replacement-pune",
    icon: Monitor,
  },
  {
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard repair using professional diagnostic equipment.",
    href: "/motherboard-repair-pune",
    icon: Cpu,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop with a high-speed SSD for faster boot and better performance.",
    href: "/ssd-upgrade-pune",
    icon: HardDrive,
  },
  {
    title: "Keyboard Replacement",
    description:
      "Replacement and repair for damaged, broken or non-working laptop keyboards.",
    href: "/keyboard-repair-pune",
    icon: Keyboard,
  },
  {
    title: "Battery Replacement",
    description:
      "Original quality laptop battery replacement for longer backup and reliability.",
    href: "/battery-replacement-pune",
    icon: BatteryCharging,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important data from damaged HDDs, SSDs and external storage devices.",
    href: "/data-recovery-pune",
    icon: Database,
  },
  {
    title: "Laptop Cleaning",
    description:
      "Complete internal cleaning, thermal paste replacement and overheating solutions.",
    href: "/laptop-servicing-pune",
    icon: Fan,
  },
  {
    title: "Wi-Fi & Network Repair",
    description:
      "Resolve Wi-Fi connectivity, network adapter and internet-related laptop issues.",
    href: "/wifi-repair-pune",
    icon: Wifi,
  },
];

export default function RelatedServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Explore Our Laptop Repair Services
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides complete laptop repair solutions including
            motherboard repair, screen replacement, SSD upgrades, battery
            replacement, keyboard repair, laptop servicing and professional
            data recovery across Pune.
          </p>

        </div>

        {/* Services Grid */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => {

            const Icon = service.icon;

            return (

              <Link
                key={service.title}
                href={service.href}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition-transform duration-300 group-hover:scale-110">

                  <Icon
                    size={30}
                    className="text-yellow-600"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center gap-2 font-semibold text-yellow-600">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />

                </div>

              </Link>

            );

          })}

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-3xl bg-gradient-to-r from-black to-zinc-900 p-10 text-center text-white">

          <h3 className="text-3xl font-bold">
            Can't Find Your Laptop Problem?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-300">
            Our technicians repair hardware, software and chip-level issues
            for all major laptop brands. Contact us today for a professional
            diagnosis and transparent repair estimate.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair

            <ArrowRight size={20} />
          </Link>

        </div>

      </div>
    </section>
  );
}