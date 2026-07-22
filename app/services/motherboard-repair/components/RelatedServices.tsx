import Link from "next/link";
import {
  Monitor,
  BatteryCharging,
  HardDrive,
  MemoryStick,
  Keyboard,
  Database,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional laptop LCD and display replacement for cracked, flickering or damaged screens.",
    href: "/services/laptop-screen-replacement",
    icon: Monitor,
  },
  {
    title: "Laptop Battery Replacement",
    description:
      "Replace weak, swollen or non-charging laptop batteries with quality compatible or genuine batteries.",
    href: "/services/laptop-battery-replacement",
    icon: BatteryCharging,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop to a high-speed SSD for faster boot times and improved performance.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "RAM Upgrade",
    description:
      "Increase laptop memory for smoother multitasking and better overall performance.",
    href: "/services/ram-upgrade",
    icon: MemoryStick,
  },
  {
    title: "Keyboard Replacement",
    description:
      "Professional replacement for damaged, missing or non-working laptop keyboards.",
    href: "/services/keyboard-replacement",
    icon: Keyboard,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important documents, photos and business data from damaged or inaccessible storage devices.",
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
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Explore More Laptop Repair Services
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Along with professional motherboard repair, Lappy Care offers
            complete laptop repair and upgrade services for customers across
            Pune and PCMC. Explore our related services below.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO Content */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Complete Laptop Repair Solutions Under One Roof
          </h3>

          <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-300">
            Whether your laptop requires motherboard repair, screen
            replacement, SSD upgrade, RAM upgrade, battery replacement,
            keyboard replacement or professional data recovery, Lappy Care
            provides reliable repair solutions using experienced technicians.
            We proudly serve customers across Wakad, Hinjawadi, Baner,
            Balewadi, Punawale, Tathawade, Ravet, Pimpri, Chinchwad, Aundh,
            Pashan and nearby areas throughout Pune & PCMC.
          </p>
        </div>
      </div>
    </section>
  );
}