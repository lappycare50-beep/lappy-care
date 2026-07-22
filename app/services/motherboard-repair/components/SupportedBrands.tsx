import {
  Laptop,
  BadgeCheck,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const brands = [
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
  "Razer",
  "Avita",
];

export default function SupportedBrands() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Supported Laptop Brands
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Motherboard Repair for All Major Laptop Brands
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our chip-level engineers repair laptop motherboards for all
            leading brands. Whether your device has power issues, no
            display, charging faults, BIOS corruption or liquid damage,
            we provide professional motherboard repair using advanced
            diagnostic equipment and high-quality replacement components.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <Laptop className="h-6 w-6 text-yellow-500" />

              <span className="font-semibold text-gray-800">
                {brand}
              </span>
            </div>
          ))}
        </div>

        {/* Information Card */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex gap-4">
              <Cpu className="mt-1 h-8 w-8 text-yellow-400" />

              <div>
                <h3 className="text-xl font-bold">
                  Advanced Chip-Level Repair
                </h3>

                <p className="mt-3 text-gray-300 leading-7">
                  We diagnose and repair motherboard ICs, MOSFETs,
                  power circuits, charging circuits, display circuits,
                  BIOS chips and other board-level components whenever
                  technically feasible.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 text-yellow-400" />

              <div>
                <h3 className="text-xl font-bold">
                  Genuine Repair Process
                </h3>

                <p className="mt-3 text-gray-300 leading-7">
                  Every laptop undergoes detailed diagnostics before
                  repair. We explain the fault, estimated repair cost
                  and available options before starting any work.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <BadgeCheck className="mt-1 h-8 w-8 text-yellow-400" />

              <div>
                <h3 className="text-xl font-bold">
                  Trusted Across Pune
                </h3>

                <p className="mt-3 text-gray-300 leading-7">
                  We proudly serve customers from Wakad, Hinjawadi,
                  Baner, Balewadi, Punawale, Tathawade, Ravet,
                  Pimpri-Chinchwad, Aundh, Pashan and nearby areas with
                  reliable motherboard repair services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}