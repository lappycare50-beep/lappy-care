import {
  BatteryCharging,
  Battery,
  ShieldCheck,
  Zap,
  Gauge,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "Laptop Battery Replacement",
    description:
      "Professional replacement for weak, damaged, swollen or non-charging laptop batteries using genuine or premium compatible batteries.",
    icon: BatteryCharging,
  },
  {
    title: "Battery Health Check",
    description:
      "Complete battery health diagnosis to evaluate charging cycles, battery capacity and overall battery condition before replacement.",
    icon: Gauge,
  },
  {
    title: "Genuine & Compatible Batteries",
    description:
      "We provide genuine batteries whenever available along with carefully tested premium compatible batteries for multiple laptop brands.",
    icon: ShieldCheck,
  },
  {
    title: "Charging Problem Diagnosis",
    description:
      "Not every charging issue is caused by the battery. We inspect the charger, charging port, charging IC and motherboard before recommending replacement.",
    icon: Zap,
  },
  {
    title: "Professional Installation",
    description:
      "Safe battery installation with proper internal inspection, connector verification and post-installation testing.",
    icon: Wrench,
  },
  {
    title: "Battery Performance Optimization",
    description:
      "After replacement, we verify charging performance, battery backup and system stability to ensure reliable day-to-day usage.",
    icon: Battery,
  },
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Battery Replacement Services
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Complete Laptop Battery Replacement Solutions
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care offers professional laptop battery replacement
            services for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook,
            MSI, Samsung and many other brands. Whether your battery
            drains quickly, does not charge, or has swollen, our
            experienced technicians diagnose the issue and recommend the
            most suitable solution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Content */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-white">
          <h3 className="text-2xl font-bold">
            Trusted Laptop Battery Replacement in Pune & PCMC
          </h3>

          <p className="mt-5 leading-8 text-gray-300">
            If your laptop battery no longer provides sufficient backup,
            charges slowly, shuts down unexpectedly or has swollen,
            replacing it at the right time helps protect your laptop from
            further damage. At Lappy Care, we provide professional battery
            diagnosis, genuine and premium compatible battery replacement,
            safe installation and complete testing for customers across
            Wakad, Hinjawadi, Baner, Balewadi, Punawale, Tathawade,
            Ravet, Pimple Saudagar, Pimpri, Chinchwad, Aundh, Pashan and
            nearby areas of Pune & PCMC.
          </p>
        </div>
      </div>
    </section>
  );
}