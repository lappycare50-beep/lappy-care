import {
  Laptop,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

const brands = [
  {
    name: "HP",
    description:
      "Professional screen replacement for HP Pavilion, ProBook, EliteBook, Envy, Spectre and other HP laptops.",
  },
  {
    name: "Dell",
    description:
      "Display replacement for Dell Inspiron, Latitude, Vostro, Precision, XPS and Alienware laptops.",
  },
  {
    name: "Lenovo",
    description:
      "Screen replacement services for ThinkPad, IdeaPad, Legion, Yoga and other Lenovo models.",
  },
  {
    name: "ASUS",
    description:
      "Professional display replacement for ASUS VivoBook, ZenBook, TUF Gaming and ROG laptops.",
  },
  {
    name: "Acer",
    description:
      "Laptop screen replacement for Acer Aspire, Nitro, Predator, Swift and TravelMate series.",
  },
  {
    name: "Apple",
    description:
      "MacBook Air and MacBook Pro display replacement performed by experienced technicians.",
  },
  {
    name: "MSI",
    description:
      "Replacement of high-quality displays for MSI gaming and creator laptops.",
  },
  {
    name: "Samsung",
    description:
      "Screen replacement for selected Samsung laptop models using quality replacement panels.",
  },
  {
    name: "LG",
    description:
      "Professional display replacement services for supported LG laptop models.",
  },
  {
    name: "Microsoft Surface",
    description:
      "Display repair and replacement solutions for supported Microsoft Surface laptops.",
  },
];

export default function SupportedBrands() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Supported Laptop Brands
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Screen Replacement for All Major Brands
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop screen replacement
            services for most leading laptop manufacturers. Whether you
            use a business laptop, gaming laptop, student laptop or
            premium ultrabook, our technicians can inspect your device
            and recommend a suitable replacement display.
          </p>
        </div>

        {/* Brand Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                <Laptop size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                {brand.name}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {brand.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Genuine & Compatible Display Options
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Depending on your laptop model and parts availability,
                we can provide genuine or high-quality compatible
                replacement display panels. Before proceeding with any
                replacement, we explain the available options so you can
                make an informed decision.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <BadgeCheck className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h4 className="font-semibold">
                    Wide Model Coverage
                  </h4>

                  <p className="text-gray-300">
                    Support for business, gaming, creator and everyday
                    laptops across multiple manufacturers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h4 className="font-semibold">
                    Quality Checked Parts
                  </h4>

                  <p className="text-gray-300">
                    Replacement displays are tested for proper fit,
                    brightness and functionality before delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Laptop className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h4 className="font-semibold">
                    Experienced Technicians
                  </h4>

                  <p className="text-gray-300">
                    Careful installation helps ensure reliable
                    performance and a professional finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Looking for Laptop Screen Replacement in Pune?
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your laptop has a cracked display, flickering
            screen, dead pixels, display lines or backlight issues,
            Lappy Care offers professional inspection and replacement
            services for a wide range of laptop brands. Our technicians
            help identify the issue and recommend the most appropriate
            repair solution for your specific model.
          </p>
        </div>
      </div>
    </section>
  );
}