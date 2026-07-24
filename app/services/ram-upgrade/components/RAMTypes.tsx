import {
  MemoryStick,
  BadgeCheck,
  Zap,
  Cpu,
  ArrowRight,
} from "lucide-react";

const ramTypes = [
  {
    title: "DDR3 RAM",
    subtitle: "For Older Laptops",
    icon: MemoryStick,
    features: [
      "Suitable for older generation laptops",
      "Affordable upgrade option",
      "Improves basic performance",
      "Ideal for office & home use",
    ],
  },
  {
    title: "DDR4 RAM",
    subtitle: "Most Popular Choice",
    icon: BadgeCheck,
    features: [
      "Higher speed than DDR3",
      "Better multitasking",
      "Lower power consumption",
      "Perfect for business & students",
    ],
  },
  {
    title: "DDR5 RAM",
    subtitle: "Latest Generation",
    icon: Zap,
    features: [
      "Maximum bandwidth",
      "Best gaming performance",
      "Professional workloads",
      "Future-ready technology",
    ],
  },
];

const supportedBrands = [
  "HP",
  "Dell",
  "Lenovo",
  "ASUS",
  "Acer",
  "Apple MacBook",
  "MSI",
  "Samsung",
  "LG",
  "Microsoft Surface",
];

export default function RAMTypes() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            DDR3 • DDR4 • DDR5
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop RAM Types We Support
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide professional laptop RAM upgrade services for DDR3,
            DDR4 and DDR5 memory. Before installation, our technicians check
            motherboard compatibility, RAM speed, maximum supported capacity
            and BIOS compatibility to recommend the right upgrade.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {ramTypes.map((ram) => {
            const Icon = ram.icon;

            return (
              <div
                key={ram.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {ram.title}
                </h3>

                <p className="mt-2 font-medium text-yellow-600">
                  {ram.subtitle}
                </p>

                <div className="mt-6 space-y-3">
                  {ram.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <ArrowRight className="mt-1 h-4 w-4 text-yellow-500" />
                      <span className="text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Cpu className="h-8 w-8 text-yellow-400" />

                <h3 className="text-3xl font-bold text-yellow-400">
                  Compatibility Matters
                </h3>
              </div>

              <p className="mt-6 leading-8 text-gray-300">
                Every laptop supports a specific RAM generation, memory speed
                and maximum capacity. Installing incompatible RAM may prevent
                your laptop from booting or operating correctly. Our experts
                perform a complete compatibility check before recommending
                any upgrade.
              </p>

              <div className="mt-8 rounded-2xl bg-yellow-400 p-6 text-black">
                <h4 className="text-xl font-bold">
                  Free RAM Compatibility Check
                </h4>

                <p className="mt-2">
                  Visit Lappy Care for a professional inspection and get the
                  best RAM upgrade recommendation for your laptop.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                Supported Laptop Brands
              </h3>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {supportedBrands.map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center gap-3 rounded-xl bg-white/10 p-4"
                  >
                    <BadgeCheck className="h-5 w-5 text-yellow-400" />
                    <span>{brand}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-gray-300">
                Whether you own an HP, Dell, Lenovo, ASUS, Acer, Apple MacBook
                or any other laptop, we help you choose the correct RAM module
                for reliable performance and long-term stability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}