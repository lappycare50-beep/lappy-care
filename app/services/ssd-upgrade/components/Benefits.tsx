import {
  Zap,
  Clock3,
  BatteryCharging,
  ShieldCheck,
  Database,
  Laptop,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "SSD upgrades dramatically improve laptop speed, making Windows boot faster and applications open almost instantly.",
  },
  {
    icon: Clock3,
    title: "Faster Boot Time",
    description:
      "Reduce startup time from minutes to seconds with a high-speed SATA or NVMe SSD upgrade.",
  },
  {
    icon: BatteryCharging,
    title: "Better Battery Efficiency",
    description:
      "SSDs consume less power than traditional HDDs, helping improve battery life on many laptops.",
  },
  {
    icon: Database,
    title: "Safe Data Migration",
    description:
      "Transfer your existing Windows installation, software and personal files safely to your new SSD.",
  },
  {
    icon: Laptop,
    title: "Improved Multitasking",
    description:
      "Enjoy smoother multitasking, quicker file transfers and better productivity for work, study and gaming.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Storage",
    description:
      "SSDs have no moving parts, making them more durable, quieter and more reliable than traditional hard drives.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Why Upgrade to an SSD?
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Experience a Faster & More Reliable Laptop
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Replacing an old HDD with a modern SSD is one of the best upgrades
            you can make. Whether you use your laptop for office work, online
            classes, programming, designing or gaming, an SSD provides a
            noticeable improvement in speed, stability and overall performance.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Why Customers Choose Lappy Care
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Our technicians carefully inspect your laptop before recommending
                an SSD upgrade. We verify compatibility, install the correct SSD,
                migrate your data (if required) and thoroughly test the laptop
                before delivery.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "✔ Genuine SSD Options",
                "✔ NVMe & SATA Support",
                "✔ Professional Installation",
                "✔ Secure Data Migration",
                "✔ Windows Installation",
                "✔ Complete Performance Testing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur"
                >
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