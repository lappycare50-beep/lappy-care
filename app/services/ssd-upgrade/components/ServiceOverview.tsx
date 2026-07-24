import {
  HardDrive,
  Cpu,
  Database,
  Laptop,
  ShieldCheck,
  Settings,
} from "lucide-react";

const services = [
  {
    icon: HardDrive,
    title: "NVMe SSD Upgrade",
    description:
      "Upgrade compatible laptops with ultra-fast NVMe SSDs for exceptional speed, quick boot times and improved productivity.",
  },
  {
    icon: Database,
    title: "SATA SSD Upgrade",
    description:
      "Replace slow hard drives with reliable SATA SSDs to improve everyday performance and responsiveness.",
  },
  {
    icon: Laptop,
    title: "SSD Installation",
    description:
      "Professional SSD installation with complete compatibility checks and secure hardware fitting.",
  },
  {
    icon: Cpu,
    title: "Data Migration",
    description:
      "Transfer Windows, applications and personal files from your existing drive to the new SSD safely.",
  },
  {
    icon: Settings,
    title: "Performance Optimization",
    description:
      "Configure BIOS, optimize Windows settings and ensure your SSD performs at its maximum potential.",
  },
  {
    icon: ShieldCheck,
    title: "Health Check & Testing",
    description:
      "Complete testing after installation to verify SSD health, speed, stability and overall laptop performance.",
  },
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            SSD Upgrade Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Professional Laptop SSD Upgrade in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your laptop feels slow or still uses a traditional hard
            drive (HDD), upgrading to a high-speed SSD is one of the most
            effective ways to improve overall performance. At Lappy Care, we
            provide expert SSD installation, secure data migration and complete
            performance optimization for home users, students, professionals and
            businesses across Pune & PCMC.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Compatible with All Major Laptop Brands
          </h3>

          <p className="mt-5 leading-8 text-gray-300">
            We provide SSD upgrades for HP, Dell, Lenovo, ASUS, Acer, Apple
            MacBook, MSI, Samsung, LG, Microsoft Surface and many other laptop
            brands. Our technicians recommend the right NVMe or SATA SSD based
            on your laptop's motherboard compatibility and performance
            requirements.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "HP",
              "Dell",
              "Lenovo",
              "ASUS",
              "Acer",
              "Apple",
              "MSI",
              "Samsung",
              "LG",
              "Microsoft",
            ].map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-yellow-400 px-4 py-2 text-sm font-medium text-yellow-300"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}