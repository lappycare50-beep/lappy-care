import {
  Monitor,
  Cpu,
  BatteryCharging,
  HardDrive,
  Keyboard,
  Database,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Laptop Screen Replacement",
    description:
      "Professional replacement for cracked, damaged, flickering and broken laptop screens using quality replacement displays.",
  },
  {
    icon: Cpu,
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnosis and repair for power issues, no display, liquid damage and dead laptops.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Replacement",
    description:
      "Replace weak, damaged or swollen laptop batteries to restore reliable backup and charging performance.",
  },
  {
    icon: HardDrive,
    title: "SSD & RAM Upgrade",
    description:
      "Upgrade your laptop with faster SSD storage and additional RAM for improved speed and multitasking.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    description:
      "Repair or replace damaged laptop keyboards, touchpads, hinges and power buttons.",
  },
  {
    icon: Database,
    title: "Data Recovery",
    description:
      "Recover important files from damaged HDDs, SSDs and laptops affected by hardware or software failures.",
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Professional Laptop Repair Services in Pimple Saudagar
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care provides complete laptop repair solutions in Pimple
            Saudagar including hardware repair, software troubleshooting,
            motherboard repair, upgrades and professional data recovery for all
            major laptop brands.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
              >
                <div className="mb-6 inline-flex rounded-xl bg-yellow-100 p-4">
                  <Icon className="h-8 w-8 text-yellow-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Need Fast Laptop Repair in Pimple Saudagar?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Whether your laptop needs motherboard repair, screen replacement,
            battery replacement, SSD upgrade, RAM upgrade, keyboard repair or
            data recovery, Lappy Care delivers reliable repair solutions with
            experienced technicians and transparent pricing.
          </p>
        </div>
      </div>
    </section>
  );
}