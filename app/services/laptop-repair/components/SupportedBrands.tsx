import {
  Laptop,
  ShieldCheck,
  CheckCircle2,
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
  "Toshiba",
  "Fujitsu",
];

export default function SupportedBrands() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            All Major Laptop Brands
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            We Repair Every Popular Laptop Brand
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our certified technicians repair laptops from all leading
            manufacturers using professional diagnostic equipment and
            high-quality compatible spare parts.
          </p>
        </div>

        {/* Brand Grid */}

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

          {brands.map((brand) => (
            <div
              key={brand}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black">
                <Laptop size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {brand}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Repair • Upgrade • Service
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Section */}

        <div className="mt-20 overflow-hidden rounded-3xl bg-black">

          <div className="grid gap-10 p-10 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">
                <ShieldCheck className="mr-2" size={18} />
                Trusted Multi-Brand Service Center
              </div>

              <h3 className="mt-6 text-3xl font-bold text-white">
                One Repair Center for Every Laptop Brand
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Whether you own a business laptop, gaming laptop,
                student notebook or premium ultrabook, our experienced
                engineers can diagnose and repair hardware as well as
                software issues quickly and professionally.
              </p>

            </div>

            <div className="grid gap-4">

              <div className="flex items-center rounded-xl bg-white/5 p-4 text-white">
                <CheckCircle2
                  className="mr-3 text-yellow-400"
                  size={22}
                />
                Genuine & High-Quality Compatible Parts
              </div>

              <div className="flex items-center rounded-xl bg-white/5 p-4 text-white">
                <CheckCircle2
                  className="mr-3 text-yellow-400"
                  size={22}
                />
                Experienced Certified Engineers
              </div>

              <div className="flex items-center rounded-xl bg-white/5 p-4 text-white">
                <CheckCircle2
                  className="mr-3 text-yellow-400"
                  size={22}
                />
                Transparent Repair Estimate
              </div>

              <div className="flex items-center rounded-xl bg-white/5 p-4 text-white">
                <CheckCircle2
                  className="mr-3 text-yellow-400"
                  size={22}
                />
                Fast Turnaround Time
              </div>

              <div className="flex items-center rounded-xl bg-white/5 p-4 text-white">
                <CheckCircle2
                  className="mr-3 text-yellow-400"
                  size={22}
                />
                Warranty on Selected Repairs
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}