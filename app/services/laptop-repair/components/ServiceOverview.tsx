import {
  Cpu,
  HardDrive,
  Keyboard,
  Monitor,
  BatteryCharging,
  ShieldCheck,
  Wrench,
  Fan,
  Database,
  Bug,
  Laptop,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Laptop Screen Replacement",
    description:
      "Broken, flickering or damaged laptop screen replacement using high-quality compatible displays.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Replacement",
    description:
      "Replace weak, swollen or non-charging laptop batteries with reliable replacements.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    description:
      "Fix non-working keys, liquid damage and complete keyboard replacement.",
  },
  {
    icon: Cpu,
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnosis and repair by experienced technicians.",
  },
  {
    icon: HardDrive,
    title: "SSD & RAM Upgrade",
    description:
      "Upgrade your laptop for faster boot time, improved performance and multitasking.",
  },
  {
    icon: Database,
    title: "Data Recovery",
    description:
      "Recover important files from damaged or formatted hard drives and SSDs.",
  },
  {
    icon: Fan,
    title: "Cleaning & Overheating Fix",
    description:
      "Internal cleaning, thermal paste replacement and cooling system optimization.",
  },
  {
    icon: Bug,
    title: "Software & Virus Removal",
    description:
      "Windows installation, driver setup, malware removal and software troubleshooting.",
  },
];

const highlights = [
  "Same Day Repair Available",
  "Experienced Technicians",
  "Warranty on Repairs",
  "Genuine Spare Parts",
  "Affordable Pricing",
  "All Laptop Brands Supported",
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Complete Laptop Repair Solutions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Professional Laptop Repair Services in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides reliable laptop repair services for students,
            professionals, businesses and gamers. Our certified engineers repair
            hardware and software issues for all major laptop brands using
            quality spare parts and professional diagnostic tools.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl bg-black">
          <div className="grid items-center gap-10 p-10 lg:grid-cols-2">

            <div>
              <div className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">
                <Laptop className="mr-2" size={18} />
                Why Customers Choose Lappy Care
              </div>

              <h3 className="mt-6 text-3xl font-bold text-white">
                Fast, Reliable & Affordable Laptop Repair
              </h3>

              <p className="mt-5 text-gray-300 leading-8">
                From minor hardware issues to advanced motherboard repair,
                our team delivers dependable repair services with transparent
                pricing, genuine components and quick turnaround time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center rounded-xl border border-yellow-400/20 bg-white/5 p-4 text-white"
                >
                  <CheckCircle2
                    className="mr-3 text-yellow-400"
                    size={20}
                  />
                  {item}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}