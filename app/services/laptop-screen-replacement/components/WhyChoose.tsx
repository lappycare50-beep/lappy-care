import {
  Award,
  ShieldCheck,
  Users,
  Wrench,
  Clock3,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Experienced Technicians",
    description:
      "Our technicians have experience diagnosing and repairing display-related issues across a wide range of laptop brands and models.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Replacement Parts",
    description:
      "We use genuine or high-quality compatible display panels depending on your laptop model and parts availability.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Each replacement is performed using proper repair procedures to help ensure a clean fit and reliable performance.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Testing",
    description:
      "Every repaired laptop undergoes display quality checks before it is handed over to the customer.",
  },
  {
    icon: Clock3,
    title: "Transparent Repair Process",
    description:
      "We explain the diagnosis, available repair options and estimated cost before beginning the replacement work.",
  },
  {
    icon: Users,
    title: "Customer-Focused Service",
    description:
      "Our goal is to provide professional service, clear communication and a smooth repair experience from start to finish.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Trusted Laptop Screen Replacement Service in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choosing the right repair centre is important when replacing
            a laptop screen. At Lappy Care, we focus on professional
            workmanship, quality parts, transparent communication and a
            customer-first approach for every repair.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Our Commitment
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Every laptop is inspected before repair, and we discuss
                the available replacement options with you before any
                work begins. Our aim is to provide reliable repairs using
                suitable parts and professional installation practices.
              </p>

              <ul className="mt-8 space-y-3 text-gray-300">
                <li>✓ Professional Diagnosis</li>
                <li>✓ Clear Repair Recommendations</li>
                <li>✓ Quality Replacement Displays</li>
                <li>✓ Careful Installation</li>
                <li>✓ Final Quality Inspection</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-black/30 p-8">
              <h3 className="text-3xl font-bold text-yellow-400">
                Serving Pune & PCMC
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                We provide laptop screen replacement services for
                customers across:
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-gray-300">
                <div>• Wakad</div>
                <div>• Hinjawadi</div>
                <div>• Baner</div>
                <div>• Balewadi</div>
                <div>• Punawale</div>
                <div>• Tathawade</div>
                <div>• Ravet</div>
                <div>• Pimple Saudagar</div>
                <div>• Chinchwad</div>
                <div>• Aundh</div>
                <div>• Bavdhan</div>
                <div>• Pashan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom SEO Content */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Professional Laptop Display Repair & Replacement
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your laptop display is cracked, flickering, showing
            lines or no longer functioning correctly, Lappy Care offers
            professional inspection and screen replacement services for
            a wide range of laptop models. We aim to restore your laptop
            with quality workmanship and dependable customer service.
          </p>
        </div>
      </div>
    </section>
  );
}