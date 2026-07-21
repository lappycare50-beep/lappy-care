import {
  Monitor,
  Cpu,
  HardDrive,
  BatteryCharging,
  Keyboard,
  Database,
} from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional replacement of cracked, damaged, flickering and display-related laptop screens for all major brands.",
    icon: Monitor,
  },
  {
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnostics and repair performed by experienced laptop technicians.",
    icon: Cpu,
  },
  {
    title: "SSD & RAM Upgrade",
    description:
      "Boost laptop speed and multitasking performance with professional SSD and RAM upgrades.",
    icon: HardDrive,
  },
  {
    title: "Battery Replacement",
    description:
      "Replace weak, swollen or faulty laptop batteries using high-quality compatible replacement batteries.",
    icon: BatteryCharging,
  },
  {
    title: "Keyboard Repair & Replacement",
    description:
      "Repair or replace damaged laptop keyboards, touchpads and input components for smooth daily use.",
    icon: Keyboard,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important files from damaged hard drives, SSDs and laptops whenever recovery is technically possible.",
    icon: Database,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Professional Laptop Repair Services in Punawale
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care offers complete laptop repair services in Punawale,
            including motherboard repair, laptop screen replacement,
            battery replacement, SSD upgrades, RAM upgrades, keyboard
            replacement, software troubleshooting and professional data
            recovery for all major laptop brands.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Need Fast Laptop Repair in Punawale?
          </h3>

          <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-gray-300">
            Whether your laptop needs motherboard repair, screen replacement,
            SSD upgrades, battery replacement, keyboard repair or data
            recovery, Lappy Care provides reliable laptop repair services
            across Punawale and nearby Pune locations with transparent
            pricing and experienced technicians.
          </p>
        </div>
      </div>
    </section>
  );
}