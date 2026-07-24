import {
  HardDrive,
  Zap,
  Gauge,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const ssdTypes = [
  {
    title: "NVMe SSD",
    icon: Zap,
    badge: "Highest Performance",
    description:
      "NVMe SSDs use the PCIe interface and deliver significantly higher read and write speeds than SATA SSDs. They are ideal for gaming, video editing, software development and professional workloads.",
    features: [
      "Ultra-fast boot time",
      "High read & write speeds",
      "Ideal for heavy workloads",
      "Excellent multitasking",
    ],
  },
  {
    title: "SATA SSD",
    icon: HardDrive,
    badge: "Best Value Upgrade",
    description:
      "SATA SSDs are an excellent upgrade for laptops using traditional hard drives. They provide a major speed improvement while remaining cost-effective.",
    features: [
      "Much faster than HDD",
      "Affordable upgrade",
      "Reliable performance",
      "Compatible with many laptops",
    ],
  },
];

const comparison = [
  {
    icon: Gauge,
    title: "Performance",
    description:
      "NVMe SSDs are considerably faster, while SATA SSDs still offer a huge improvement over HDDs.",
  },
  {
    icon: ShieldCheck,
    title: "Compatibility Check",
    description:
      "We inspect your laptop to determine whether it supports NVMe SSDs, SATA SSDs or both before recommending an upgrade.",
  },
];

export default function SSDTypes() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            SSD Technology
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            NVMe SSD vs SATA SSD
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choosing the right SSD depends on your laptop's hardware,
            motherboard compatibility and performance requirements. Our experts
            help you select the best upgrade for maximum speed and value.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {ssdTypes.map((ssd) => {
            const Icon = ssd.icon;

            return (
              <div
                key={ssd.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                    <Icon className="h-8 w-8 text-black" />
                  </div>

                  <span className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-yellow-400">
                    {ssd.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {ssd.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {ssd.description}
                </p>

                <div className="mt-8 space-y-3">
                  {ssd.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {comparison.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-gray-50 p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Not Sure Which SSD is Right for Your Laptop?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-300">
            Bring your laptop to Lappy Care. We will check compatibility,
            recommend the right NVMe or SATA SSD, migrate your data if required
            and professionally install the upgrade for the best performance.
          </p>
        </div>
      </div>
    </section>
  );
}