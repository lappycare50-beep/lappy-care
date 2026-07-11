import {
  Laptop,
  Monitor,
  HardDrive,
  Cpu,
  Database,
  ShieldCheck,
} from "lucide-react";

import { services } from "@/data/services";

const icons = {
  laptop: Laptop,
  monitor: Monitor,
  harddrive: HardDrive,
  cpu: Cpu,
  database: Database,
  shield: ShieldCheck,
};

export default function Services() {
  return (
    <section id="services" className="bg-[#0B0B0B] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            Our Services
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Professional Laptop Repair Solutions
          </h2>

          <p className="mt-4 text-gray-400">
            Fast • Reliable • Affordable
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon =
              icons[service.icon as keyof typeof icons];

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-yellow-500/20 bg-[#111111] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400"
              >
                <div className="mb-6 inline-flex rounded-xl bg-yellow-400/10 p-4 text-yellow-400 transition-all group-hover:bg-yellow-400 group-hover:text-black">
                  <Icon size={34} />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mb-6 text-gray-400">
                  {service.description}
                </p>

                <button className="font-semibold text-yellow-400">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}