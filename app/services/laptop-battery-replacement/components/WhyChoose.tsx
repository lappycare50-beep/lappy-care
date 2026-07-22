import {
  Award,
  BatteryCharging,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Experienced Laptop Technicians",
    description:
      "Our experienced technicians diagnose battery-related issues accurately and recommend the most suitable replacement for your laptop model.",
    icon: Award,
  },
  {
    title: "Genuine & Premium Compatible Batteries",
    description:
      "We use genuine batteries whenever available and premium-quality compatible batteries that are tested for safety, reliability and performance.",
    icon: BatteryCharging,
  },
  {
    title: "Transparent Diagnosis",
    description:
      "Before recommending a battery replacement, we inspect the battery, charger, charging port and charging circuit to identify the actual cause of the issue.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Turnaround Time",
    description:
      "Most battery replacements are completed quickly, depending on battery availability and the laptop model.",
    icon: Clock3,
  },
  {
    title: "Warranty on Eligible Replacements",
    description:
      "Eligible battery replacements include warranty coverage for additional peace of mind and dependable after-service support.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Across Pune & PCMC",
    description:
      "Customers from Wakad, Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet, Pimpri, Chinchwad, Aundh and nearby areas rely on Lappy Care for professional laptop battery replacement.",
    icon: Users,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care?
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Trusted Laptop Battery Replacement Experts
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choosing the right battery replacement service helps improve
            battery backup, charging reliability and the overall lifespan of
            your laptop. At Lappy Care, we focus on accurate diagnosis,
            quality batteries and professional installation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">
                Reliable Battery Replacement Starts with the Right Diagnosis
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Not every charging issue is caused by a faulty battery. Our
                technicians inspect the complete charging system, including
                the charger, charging port, battery connector and related
                hardware before recommending a replacement.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h4 className="text-xl font-bold">
                What You Can Expect
              </h4>

              <ul className="mt-6 space-y-4">
                <li>✓ Professional Battery Health Check</li>
                <li>✓ Genuine & Compatible Battery Options</li>
                <li>✓ Safe & Secure Installation</li>
                <li>✓ Complete Charging & Performance Testing</li>
                <li>✓ Warranty on Eligible Replacements</li>
                <li>✓ Friendly After-Service Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}