import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Laptop Screen Replacement",
    description:
      "Professional LCD & LED screen replacement for all major laptop brands.",
    href: "/services/laptop-screen-replacement",
  },
  {
    title: "Motherboard Repair",
    description:
      "Advanced chip-level motherboard diagnosis and repair services.",
    href: "/services/motherboard-repair",
  },
  {
    title: "Battery Replacement",
    description:
      "High-quality laptop battery replacement with warranty support.",
    href: "/services/laptop-battery-replacement",
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade your laptop with a high-speed SSD for faster boot time and overall performance.",
    href: "/services/ssd-upgrade",
  },
  {
    title: "RAM Upgrade",
    description:
      "Increase your laptop memory for smoother multitasking and improved productivity.",
    href: "/services/ram-upgrade",
  },
  {
    title: "Data Recovery",
    description:
      "Professional data recovery services for laptops, HDDs and SSDs.",
    href: "/services/data-recovery",
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Related Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Complete Laptop Repair Solutions
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Explore our professional laptop repair and upgrade services
            available for customers in Pashan and nearby Pune locations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-900 transition-colors group-hover:text-yellow-600">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {service.description}
              </p>

              <div className="mt-8 inline-flex items-center font-semibold text-yellow-600">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Looking for a Specific Laptop Repair Service?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            From motherboard repairs and screen replacements to SSD upgrades,
            RAM upgrades, battery replacements and professional data recovery,
            Lappy Care provides reliable laptop repair services with
            experienced technicians and transparent pricing.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}