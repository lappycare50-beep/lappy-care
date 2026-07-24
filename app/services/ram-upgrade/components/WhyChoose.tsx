import {
  Award,
  BadgeCheck,
  Clock3,
  Headphones,
  MemoryStick,
  ShieldCheck,
  Star,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const reasons = [
  {
    icon: MemoryStick,
    title: "Expert RAM Upgrade",
    description:
      "Professional DDR3, DDR4 and DDR5 RAM upgrades for all major laptop brands with guaranteed compatibility.",
  },
  {
    icon: ShieldCheck,
    title: "Compatibility Verification",
    description:
      "We verify motherboard support, RAM type, speed and maximum capacity before installation.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Safe anti-static installation performed by experienced laptop repair technicians.",
  },
  {
    icon: Clock3,
    title: "Quick Turnaround",
    description:
      "Most laptop RAM upgrades are completed within 30–60 minutes, depending on the laptop model.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Memory Modules",
    description:
      "We use reliable, high-quality RAM modules for stable performance and long-term durability.",
  },
  {
    icon: Headphones,
    title: "After-Service Support",
    description:
      "Get expert guidance and support even after your RAM upgrade is completed.",
  },
];

const highlights = [
  "Professional Laptop RAM Upgrade",
  "DDR3, DDR4 & DDR5 Support",
  "Free RAM Compatibility Check",
  "Complete Hardware Inspection",
  "Performance Testing Included",
  "Experienced Laptop Technicians",
  "Support for HP, Dell, Lenovo, ASUS, Acer & Apple",
  "Serving Pune & PCMC",
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Trusted Laptop RAM Upgrade Service in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Lappy Care, every RAM upgrade is performed after a detailed
            compatibility inspection. Our experienced technicians ensure your
            laptop receives the correct memory upgrade for better speed,
            multitasking and long-term reliability.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-yellow-400" />

                <h3 className="text-3xl font-bold text-yellow-400">
                  Why Customers Trust Lappy Care
                </h3>
              </div>

              <p className="mt-6 leading-8 text-gray-300">
                We don't just install RAM—we verify compatibility, perform
                complete diagnostics and thoroughly test every laptop before
                delivery. Our goal is to provide a stable, reliable and
                noticeable performance improvement for every customer.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-6 py-4 text-black">
                <Star className="h-6 w-6 fill-current" />
                <span className="font-semibold">
                  Trusted Laptop Repair & Upgrade Experts
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white/10 p-4"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}