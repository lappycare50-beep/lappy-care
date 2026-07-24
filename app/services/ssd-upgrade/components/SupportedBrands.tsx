import {
  Laptop,
  BatteryCharging,
  ShieldCheck,
  BadgeCheck,
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
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Supported Laptop Brands
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Laptop Battery Replacement for All Major Brands
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop battery replacement
            services for most leading laptop manufacturers. Whether you
            need an original battery or a high-quality compatible
            replacement, our technicians help you choose the right
            solution for your laptop model.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
                <Laptop className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {brand}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Professional battery replacement, battery health check and
                charging diagnosis for {brand} laptops.
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <BatteryCharging className="h-10 w-10 text-yellow-400" />

              <h3 className="mt-5 text-xl font-bold">
                Genuine & Premium Compatible Batteries
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                We provide genuine batteries whenever available along
                with premium-quality compatible batteries that meet
                safety and performance standards.
              </p>
            </div>

            <div>
              <ShieldCheck className="h-10 w-10 text-yellow-400" />

              <h3 className="mt-5 text-xl font-bold">
                Professional Installation
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Every battery replacement includes careful installation,
                connector inspection, charging verification and complete
                functional testing before delivery.
              </p>
            </div>

            <div>
              <BadgeCheck className="h-10 w-10 text-yellow-400" />

              <h3 className="mt-5 text-xl font-bold">
                Trusted Across Pune & PCMC
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Customers from Wakad, Hinjawadi, Baner, Balewadi,
                Punawale, Tathawade, Ravet, Pimple Saudagar, Pimpri,
                Chinchwad, Aundh and nearby areas trust Lappy Care for
                reliable laptop battery replacement services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}