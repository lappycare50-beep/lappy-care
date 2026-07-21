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
      "Broken, flickering or damaged laptop screen replacement using quality compatible displays.",
  },
  {
    icon: Cpu,
    title: "Motherboard Repair",
    description:
      "Professional chip-level motherboard diagnosis and repair for supported laptop models.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Replacement",
    description:
      "Replace weak, swollen or fast-draining laptop batteries with reliable replacements.",
  },
  {
    icon: HardDrive,
    title: "SSD & RAM Upgrade",
    description:
      "Upgrade your laptop with faster SSD storage and additional RAM for improved performance.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    description:
      "Repair or replace faulty laptop keyboards, touchpads and power buttons.",
  },
  {
    icon: Database,
    title: "Data Recovery",
    description:
      "Recover important files from damaged, corrupted or inaccessible storage devices whenever possible.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Professional Laptop Repair Services in Tathawade
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care offers reliable laptop repair solutions for students,
            professionals, businesses and home users across Tathawade and nearby
            areas. Our experienced technicians repair all major laptop brands
            using quality parts and professional tools.
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
            Need Fast Laptop Repair in Tathawade?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Book your laptop repair today for expert diagnostics, transparent
            pricing, genuine spare parts, and pickup & drop service for eligible
            locations.
          </p>

          <a
            href="/#booking"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
          </a>
        </div>
      </div>
    </section>
  );
}