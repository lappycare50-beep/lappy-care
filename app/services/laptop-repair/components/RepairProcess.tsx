import {
  CalendarCheck2,
  SearchCheck,
  FileText,
  Wrench,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    icon: CalendarCheck2,
    step: "01",
    title: "Book Your Repair",
    description:
      "Call us, WhatsApp us, or visit our service center to register your laptop repair request.",
  },
  {
    icon: SearchCheck,
    step: "02",
    title: "Free Diagnosis",
    description:
      "Our engineers perform a complete inspection to identify the exact hardware or software issue.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Repair Estimate",
    description:
      "Receive a transparent repair estimate with pricing before we begin any repair work.",
  },
  {
    icon: Wrench,
    step: "04",
    title: "Professional Repair",
    description:
      "Experienced technicians repair your laptop using quality compatible spare parts and professional tools.",
  },
  {
    icon: ShieldCheck,
    step: "05",
    title: "Quality Testing",
    description:
      "Every repaired laptop undergoes multiple quality checks to ensure reliable performance.",
  },
  {
    icon: PackageCheck,
    step: "06",
    title: "Ready for Delivery",
    description:
      "Collect your repaired laptop or choose delivery (where available) with warranty on eligible repairs.",
  },
];

export default function RepairProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Simple & Transparent Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Our Laptop Repair Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We follow a transparent repair workflow so you always know what is
            happening with your laptop from diagnosis to final delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 text-5xl font-extrabold text-yellow-100">
                  {step.step}
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Fast, Reliable & Hassle-Free Laptop Repair
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Our goal is to repair your laptop quickly without compromising
            quality. Every repair is performed with care, transparency and
            attention to detail so you can get back to work with confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919595057006"
              className="rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}