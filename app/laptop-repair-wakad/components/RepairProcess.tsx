import {
  CalendarCheck,
  SearchCheck,
  Wrench,
  CircleCheckBig,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Book Your Repair",
    description:
      "Call us, send a WhatsApp message or submit an online repair request. We will schedule your laptop inspection at your convenience.",
  },
  {
    step: "02",
    icon: SearchCheck,
    title: "Diagnosis & Estimate",
    description:
      "Our technicians perform a detailed diagnosis and provide a transparent repair estimate before any work begins.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Professional Repair",
    description:
      "After your approval, we repair your laptop using quality spare parts and professional repair equipment.",
  },
  {
    step: "04",
    icon: CircleCheckBig,
    title: "Testing & Delivery",
    description:
      "Every repaired laptop undergoes complete quality testing before safe delivery or pickup.",
  },
];

export default function RepairProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Repair Process
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Our Simple & Transparent Repair Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We follow a structured repair process to ensure every laptop
            receives accurate diagnosis, professional repair and complete
            quality testing before delivery.
          </p>

        </div>

        {/* Steps */}

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.step}
                className="relative group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
              >

                {/* Step Badge */}

                <div className="absolute -top-5 left-8 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black shadow-lg">
                  {item.step}
                </div>

                {/* Icon */}

                <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition-transform duration-300 group-hover:scale-110">

                  <Icon
                    size={32}
                    className="text-yellow-600"
                  />

                </div>

                {/* Title */}

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>

                {/* Bottom Badge */}

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">

                  <CheckCircle2 size={18} />

                  Professional Service

                </div>

              </div>

            );

          })}

        </div>

        {/* Bottom Trust Section */}

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <h3 className="text-4xl font-bold text-yellow-400">
                Same Day
              </h3>

              <p className="mt-2 text-gray-300">
                Fast Repair Available
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold text-yellow-400">
                Genuine
              </h3>

              <p className="mt-2 text-gray-300">
                Quality Spare Parts
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold text-yellow-400">
                Warranty
              </h3>

              <p className="mt-2 text-gray-300">
                On Eligible Repairs
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}