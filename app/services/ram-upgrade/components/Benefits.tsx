import {
  CheckCircle2,
  Gauge,
  Layers3,
  MonitorSmartphone,
  Briefcase,
  Gamepad2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Gauge,
    title: "Faster Overall Performance",
    description:
      "A RAM upgrade improves system responsiveness, allowing your laptop to open applications faster and perform everyday tasks more efficiently.",
  },
  {
    icon: Layers3,
    title: "Smooth Multitasking",
    description:
      "Run multiple applications, browser tabs and office software simultaneously without slowing down your laptop.",
  },
  {
    icon: MonitorSmartphone,
    title: "Better Creative Workflow",
    description:
      "Improve the performance of Photoshop, Illustrator, AutoCAD, Premiere Pro, Visual Studio and other professional applications.",
  },
  {
    icon: Briefcase,
    title: "Boost Productivity",
    description:
      "Experience fewer slowdowns during meetings, online classes, programming, accounting and office work.",
  },
  {
    icon: Gamepad2,
    title: "Improved Gaming Experience",
    description:
      "Supported gaming laptops benefit from smoother gameplay, faster loading and reduced stuttering after a compatible RAM upgrade.",
  },
  {
    icon: Clock3,
    title: "Longer Laptop Life",
    description:
      "Upgrading RAM is a cost-effective way to extend the usable life of your laptop instead of purchasing a new device.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Benefits of RAM Upgrade
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Why Upgrade Your Laptop RAM?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Laptop RAM upgrades offer one of the highest performance gains for
            the lowest investment. Whether you use your laptop for business,
            studies, designing, programming or gaming, additional memory helps
            your system perform faster and more efficiently.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
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
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Professional RAM Upgrade at Lappy Care
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                Every laptop undergoes a complete hardware inspection before a
                RAM upgrade. We verify RAM generation, frequency, supported
                capacity and compatibility to ensure maximum performance and
                long-term reliability.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "DDR4 & DDR5 RAM Support",
                "Original Quality Memory Modules",
                "Motherboard Compatibility Check",
                "Performance Testing After Installation",
                "Safe & Professional Installation",
                "Support for HP, Dell, Lenovo, ASUS, Acer & Apple",
                "Affordable Upgrade Solutions",
                "Experienced Laptop Technicians",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 text-yellow-400" />

              <div>
                <h4 className="text-xl font-semibold text-white">
                  Expert Compatibility Check Included
                </h4>

                <p className="mt-3 text-gray-300">
                  Before installing new RAM, our technicians verify your
                  laptop's motherboard compatibility, maximum supported memory,
                  RAM speed and BIOS support to ensure a stable and reliable
                  upgrade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}