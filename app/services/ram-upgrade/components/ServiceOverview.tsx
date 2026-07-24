import {
  MemoryStick,
  Cpu,
  Gauge,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: MemoryStick,
    title: "DDR4 & DDR5 RAM Upgrade",
    description:
      "Upgrade compatible laptops with genuine DDR4 or DDR5 memory modules for better speed and responsiveness.",
  },
  {
    icon: Cpu,
    title: "Compatibility Verification",
    description:
      "We verify motherboard support, processor compatibility, RAM frequency and maximum upgrade capacity before installation.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "After installation, we optimize memory configuration and test the laptop for maximum performance and stability.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Installation",
    description:
      "Safe installation using proper tools followed by complete hardware diagnostics and stress testing.",
  },
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Laptop Memory Upgrade Experts
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Professional Laptop RAM Upgrade Service in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A RAM upgrade is one of the most effective ways to improve laptop
            performance. Whether you need smoother multitasking, faster software
            loading or improved productivity, our certified technicians install
            compatible DDR4 and DDR5 RAM modules after a complete compatibility
            check.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 p-8 transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Why Upgrade Your Laptop RAM?
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Insufficient RAM causes slow performance, application lag and
                poor multitasking. Upgrading your laptop memory allows your
                system to handle multiple applications efficiently while
                improving responsiveness for office work, programming, graphic
                design, video editing and gaming.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Smooth multitasking",
                "Faster application switching",
                "Better browser performance",
                "Improved productivity",
                "Supports heavy software",
                "Professional compatibility testing",
                "Safe installation process",
                "Works with HP, Dell, Lenovo, ASUS, Acer & Apple",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}