import {
  CheckCircle2,
  Keyboard,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Keyboard,
    title: "Keyboard Replacement",
    description:
      "Replacement of damaged, missing, broken or non-responsive laptop keyboards using high-quality compatible or genuine parts.",
  },
  {
    icon: Wrench,
    title: "Keyboard Repair",
    description:
      "Diagnosis and repair of loose keys, connector issues and other keyboard-related faults whenever repair is technically possible.",
  },
  {
    icon: Sparkles,
    title: "Liquid Damage Inspection",
    description:
      "Professional inspection after water, tea or coffee spills to identify keyboard and internal component damage before replacement.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Tested",
    description:
      "Every keyboard is thoroughly tested for key response, backlight functionality and overall performance before delivery.",
  },
];

const features = [
  "Backlit Keyboard Replacement",
  "Individual Key Issues",
  "Liquid Damage Diagnosis",
  "Ribbon Connector Inspection",
  "Keyboard Flex Cable Replacement",
  "Same Day Service*",
  "Warranty Supported",
  "Professional Installation",
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Professional Keyboard Solutions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Complete Laptop Keyboard
            <span className="block text-yellow-500">
              Repair & Replacement Services
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your keyboard has stopped working, several keys are missing,
            liquid has been spilled or the backlight has failed, Lappy Care
            provides reliable keyboard replacement services for all major laptop
            brands.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-black p-10 text-white">
            <h3 className="text-3xl font-bold">
              Why Replace Your Keyboard?
            </h3>

            <p className="mt-6 leading-8 text-gray-300">
              A faulty keyboard reduces productivity and can eventually make
              your laptop difficult to use. Replacing it with a professionally
              installed keyboard restores smooth typing, improves reliability
              and protects the internal connector from further damage.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-yellow-400 p-10 text-black">
            <h3 className="text-3xl font-bold">
              Brands We Support
            </h3>

            <p className="mt-6 leading-8">
              We replace laptop keyboards for HP, Dell, Lenovo, ASUS, Acer,
              Apple, MSI, Samsung, LG and Microsoft Surface laptops. Both
              standard and backlit keyboards are available for supported models.
            </p>

            <div className="mt-8 rounded-2xl bg-black p-6 text-white">
              <h4 className="font-semibold">
                Professional Installation
              </h4>

              <p className="mt-3 leading-7 text-gray-300">
                Every replacement includes careful installation, keyboard
                testing and quality checks before delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}