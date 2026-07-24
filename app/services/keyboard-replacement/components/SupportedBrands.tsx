import {
  BadgeCheck,
  CheckCircle2,
  Keyboard,
  Laptop,
} from "lucide-react";

const brands = [
  "HP",
  "Dell",
  "Lenovo",
  "ASUS",
  "Acer",
  "Apple",
  "MSI",
  "Samsung",
  "LG",
  "Microsoft Surface",
];

const keyboardTypes = [
  "Standard Keyboard",
  "Backlit Keyboard",
  "Gaming Laptop Keyboard",
  "Ultrabook Keyboard",
  "Business Laptop Keyboard",
  "Premium Laptop Keyboard",
];

const services = [
  "Keyboard Replacement",
  "Keyboard Repair",
  "Backlit Keyboard Replacement",
  "Liquid Damage Diagnosis",
  "Ribbon Cable Replacement",
  "Keyboard Testing",
];

export default function SupportedBrands() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            All Major Laptop Brands
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Keyboard Replacement for
            <span className="block text-yellow-500">
              Every Leading Laptop Brand
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional keyboard replacement services for
            personal, business and gaming laptops. We support both standard and
            backlit keyboards across all major laptop manufacturers.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Supported Brands */}
          <div className="rounded-3xl bg-black p-10 text-white">
            <div className="mb-8 flex items-center gap-3">
              <Laptop className="h-8 w-8 text-yellow-400" />

              <h3 className="text-3xl font-bold">
                Supported Brands
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4"
                >
                  <BadgeCheck className="h-5 w-5 text-yellow-400" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard Types */}
          <div className="rounded-3xl bg-yellow-400 p-10 text-black">
            <div className="mb-8 flex items-center gap-3">
              <Keyboard className="h-8 w-8" />

              <h3 className="text-3xl font-bold">
                Keyboard Types
              </h3>
            </div>

            <div className="space-y-4">
              {keyboardTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-gray-200 bg-gray-50 p-10">
          <h3 className="text-3xl font-bold text-gray-900">
            Our Keyboard Services Include
          </h3>

          <p className="mt-4 leading-8 text-gray-600">
            Every keyboard replacement is performed by experienced technicians
            using professional tools and quality-tested replacement parts.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-gray-800">
                  {service}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-black p-6 text-white">
            <h4 className="text-xl font-bold">
              Serving Pune & PCMC
            </h4>

            <p className="mt-3 leading-7 text-gray-300">
              We provide laptop keyboard replacement services in Wakad,
              Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet,
              Pimple Saudagar, Pune and nearby PCMC areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}