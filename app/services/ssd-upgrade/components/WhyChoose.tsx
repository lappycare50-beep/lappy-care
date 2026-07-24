import {
  Award,
  ShieldCheck,
  HardDrive,
  Users,
  Clock3,
  BadgeCheck,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Experienced Technicians",
    description:
      "Our experienced technicians perform SSD upgrades for all major laptop brands with precision and care.",
  },
  {
    icon: HardDrive,
    title: "Genuine SSD Options",
    description:
      "We provide reliable NVMe and SATA SSD options from trusted brands based on your laptop's compatibility and budget.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Data Migration",
    description:
      "Your Windows installation, applications and important files are migrated securely whenever possible.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "Most SSD upgrades are completed within a few hours, depending on laptop model and data migration requirements.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Testing",
    description:
      "Every upgraded laptop is thoroughly tested for SSD health, boot speed, stability and overall performance before delivery.",
  },
  {
    icon: Users,
    title: "Trusted Across Pune & PCMC",
    description:
      "Students, professionals, businesses and gamers trust Lappy Care for reliable laptop upgrades and repair services.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Why Choose Lappy Care?
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Trusted Laptop SSD Upgrade Experts in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Lappy Care, we don't just replace storage—we help improve your
            laptop's overall performance. From compatibility checks to secure
            installation and final testing, every SSD upgrade is completed with
            attention to detail and customer satisfaction.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-black" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Our Commitment
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Before recommending an SSD, we carefully inspect your laptop's
                hardware compatibility and discuss the best upgrade option. Our
                goal is to provide the right solution that delivers noticeable
                speed improvements while maintaining reliability.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "✔ Free Compatibility Check",
                "✔ NVMe & SATA SSD Support",
                "✔ Secure Data Migration",
                "✔ Windows Installation Available",
                "✔ Transparent Pricing",
                "✔ Final Performance Testing",
                "✔ Professional Installation",
                "✔ Friendly Customer Support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}