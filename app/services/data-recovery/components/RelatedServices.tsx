import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  HardDrive,
  Cpu,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "Laptop Repair",
    description:
      "Complete laptop hardware and software repair services for all major brands.",
    href: "/services/laptop-repair",
    icon: Laptop,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop with a high-speed SSD for faster boot time and improved performance.",
    href: "/services/ssd-upgrade",
    icon: HardDrive,
  },
  {
    title: "RAM Upgrade",
    description:
      "Boost your laptop performance with a professional RAM upgrade.",
    href: "/services/ram-upgrade",
    icon: Cpu,
  },
  {
    title: "Motherboard Repair",
    description:
      "Professional chip-level motherboard diagnosis and repair service.",
    href: "/services/motherboard-repair",
    icon: Wrench,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Explore Our Other
            <span className="block text-yellow-500">
              Laptop Services
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care offers complete laptop repair, SSD upgrades, RAM
            upgrades and motherboard repair services across Pune & PCMC.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black transition-transform group-hover:scale-110">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
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

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                Complete Laptop Solutions
              </h3>

              <p className="mt-6 text-gray-300 leading-8">
                From professional laptop repair to SSD upgrades, RAM upgrades,
                motherboard repair and secure data recovery, Lappy Care provides
                complete laptop solutions under one roof.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Laptop Repair",
                  "SSD Upgrade",
                  "RAM Upgrade",
                  "Motherboard Repair",
                  "Data Recovery",
                  "Performance Optimization",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <ArrowRight className="h-5 w-5 text-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h3 className="text-2xl font-bold">
                Why Choose Lappy Care?
              </h3>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-semibold">
                    ✔ Complete Laptop Services
                  </h4>
                  <p className="mt-2 text-sm">
                    Repair, upgrades, motherboard repair and data recovery from
                    one trusted service center.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    ✔ Experienced Engineers
                  </h4>
                  <p className="mt-2 text-sm">
                    Skilled technicians for HP, Dell, Lenovo, ASUS, Acer,
                    Apple, MSI and more.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    ✔ Serving Pune & PCMC
                  </h4>
                  <p className="mt-2 text-sm">
                    Wakad, Hinjawadi, Baner, Balewadi, Punawale, Tathawade,
                    Ravet, Pimple Saudagar and nearby locations.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-black p-5 text-center text-white">
                <p className="font-semibold">
                  Professional Laptop Repair • Upgrades • Data Recovery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}