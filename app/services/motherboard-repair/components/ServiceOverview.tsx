import {
  Cpu,
  Zap,
  Droplets,
  MonitorX,
  BatteryCharging,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Chip-Level Motherboard Repair",
    description:
      "Professional component-level motherboard diagnosis and repair using advanced equipment. We repair faulty ICs, MOSFETs, capacitors, resistors and power circuits whenever technically feasible.",
  },
  {
    icon: Zap,
    title: "No Power & Dead Laptop Repair",
    description:
      "If your laptop is completely dead or not turning on, we identify the root cause and repair motherboard power section faults to restore normal operation.",
  },
  {
    icon: MonitorX,
    title: "No Display & Display Circuit Repair",
    description:
      "We repair motherboard display output issues, backlight circuits, GPU-related faults and display signal problems that cause blank or distorted screens.",
  },
  {
    icon: Droplets,
    title: "Liquid Damage Motherboard Repair",
    description:
      "Motherboards damaged by water, tea, coffee or other liquids are professionally cleaned, diagnosed and repaired to minimize further damage.",
  },
  {
    icon: BatteryCharging,
    title: "Charging Circuit & DC Jack Repair",
    description:
      "We repair charging IC faults, DC jack issues, battery charging problems and damaged power input circuits for reliable charging performance.",
  },
  {
    icon: Wrench,
    title: "BIOS & Firmware Repair",
    description:
      "BIOS corruption, firmware failures and boot-related motherboard issues are diagnosed and repaired using professional programming tools.",
  },
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Motherboard Repair Services
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Complete Laptop Motherboard Repair Solutions
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop motherboard repair
            services in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple
            MacBook, MSI and other leading brands. From chip-level
            repairs and no-power issues to liquid damage recovery and
            BIOS programming, our experienced technicians diagnose the
            exact fault and recommend the most suitable repair solution.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
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
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Expert Chip-Level Motherboard Repair in Pune
          </h3>

          <p className="mx-auto mt-4 max-w-4xl text-gray-300 leading-8">
            Our motherboard repair process begins with a detailed
            diagnosis to identify the exact hardware fault. Whether your
            laptop has no power, no display, charging issues, liquid
            damage, BIOS corruption or motherboard component failure, we
            use professional chip-level repair techniques to restore your
            device whenever technically possible. We proudly serve
            customers across Wakad, Hinjawadi, Baner, Balewadi,
            Punawale, Tathawade, Ravet, Pimpri-Chinchwad and nearby
            areas.
          </p>
        </div>
      </div>
    </section>
  );
}