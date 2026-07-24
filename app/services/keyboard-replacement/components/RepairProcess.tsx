import {
  ArrowRight,
  ClipboardCheck,
  Keyboard,
  Settings,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Free Diagnosis",
    description:
      "We inspect the keyboard, ribbon connector and laptop to identify the exact cause of the problem.",
  },
  {
    icon: Keyboard,
    title: "Compatible Keyboard Selection",
    description:
      "We choose a genuine or high-quality compatible keyboard that matches your laptop model.",
  },
  {
    icon: Settings,
    title: "Professional Replacement",
    description:
      "Our technicians carefully install the replacement keyboard using professional tools and testing procedures.",
  },
  {
    icon: ShieldCheck,
    title: "Final Quality Testing",
    description:
      "Every key, backlight (if available) and keyboard functionality is thoroughly tested before delivery.",
  },
];

export default function RepairProcess() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            Our Repair Process
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Simple, Safe &
            <span className="block text-yellow-400">
              Professional Keyboard Replacement
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Every laptop keyboard replacement follows a structured process to
            ensure compatibility, quality installation and reliable performance.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <span className="text-sm font-semibold text-yellow-400">
                  Step {index + 1}
                </span>

                <h3 className="mt-3 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-yellow-400 xl:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-yellow-400 p-10 text-black">
          <h3 className="text-3xl font-bold">
            Why Customers Choose Lappy Care
          </h3>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="text-4xl font-bold">1000+</h4>
              <p className="mt-2 font-medium">
                Laptops Repaired
              </p>
            </div>

            <div>
              <h4 className="text-4xl font-bold">4.9★</h4>
              <p className="mt-2 font-medium">
                Customer Rating
              </p>
            </div>

            <div>
              <h4 className="text-4xl font-bold">Same Day*</h4>
              <p className="mt-2 font-medium">
                Service Available
              </p>
            </div>

            <div>
              <h4 className="text-4xl font-bold">Warranty</h4>
              <p className="mt-2 font-medium">
                On Supported Replacements
              </p>
            </div>
          </div>

          <p className="mt-8 text-lg leading-8">
            We proudly serve customers across Wakad, Hinjawadi, Baner,
            Balewadi, Punawale, Tathawade, Ravet, Pimple Saudagar,
            Pune and nearby PCMC areas with professional laptop repair
            and keyboard replacement services.
          </p>
        </div>
      </div>
    </section>
  );
}