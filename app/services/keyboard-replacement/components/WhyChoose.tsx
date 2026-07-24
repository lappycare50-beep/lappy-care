import {
  Award,
  CheckCircle2,
  Clock3,
  Keyboard,
  ShieldCheck,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: Keyboard,
    title: "Expert Keyboard Replacement",
    description:
      "Professional replacement for damaged, non-working, backlit and liquid-damaged laptop keyboards.",
  },
  {
    icon: Award,
    title: "Quality Replacement Parts",
    description:
      "We use genuine or premium-quality compatible keyboards for reliable long-term performance.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "Most keyboard replacements are completed on the same day, subject to spare availability.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Support",
    description:
      "Warranty is available on supported replacement keyboards for added peace of mind.",
  },
  {
    icon: Users,
    title: "Experienced Technicians",
    description:
      "Our trained technicians carefully replace and test every keyboard before delivery.",
  },
  {
    icon: CheckCircle2,
    title: "Complete Quality Testing",
    description:
      "Every key, shortcut, function row and backlight is tested before your laptop is returned.",
  },
];

const highlights = [
  "HP, Dell, Lenovo, ASUS & Acer Specialists",
  "Apple MacBook Keyboard Support",
  "Backlit Keyboard Replacement",
  "Liquid Damage Diagnosis",
  "Gaming Laptop Keyboard Support",
  "Professional Installation",
  "Transparent Pricing",
  "Trusted Laptop Repair Center in Pune",
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care?
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Trusted Laptop Keyboard
            <span className="block text-yellow-500">
              Replacement Experts in Pune
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides reliable laptop keyboard replacement services
            using quality-tested parts, experienced technicians and a
            professional repair process for all major laptop brands.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-black p-10 text-white">
            <h3 className="text-3xl font-bold">
              What Makes Us Different?
            </h3>

            <p className="mt-6 leading-8 text-gray-300">
              Our goal is to provide dependable keyboard replacement services
              with transparent pricing, quality workmanship and fast turnaround
              for customers across Pune and PCMC.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-yellow-400 p-10 text-black">
            <h3 className="text-3xl font-bold">
              Serving Pune & PCMC
            </h3>

            <p className="mt-6 leading-8">
              We provide laptop keyboard replacement services in Wakad,
              Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet,
              Pimple Saudagar, Aundh, Pashan, Pimpri, Chinchwad and nearby
              areas.
            </p>

            <div className="mt-8 rounded-2xl bg-black p-6 text-white">
              <h4 className="text-xl font-bold">
                Customer Satisfaction First
              </h4>

              <p className="mt-3 leading-7 text-gray-300">
                From diagnosis to final testing, every laptop is handled with
                care to ensure reliable performance and a smooth customer
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}