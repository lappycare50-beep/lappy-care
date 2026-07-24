import {
  Monitor,
  BatteryCharging,
  Keyboard,
  HardDrive,
  Cpu,
  Database,
  CheckCircle2,
} from "lucide-react";

const pricing = [
  {
    icon: Monitor,
    service: "Screen Replacement",
    price: "₹3,499+",
  },
  {
    icon: BatteryCharging,
    service: "Battery Replacement",
    price: "₹1,499+",
  },
  {
    icon: Keyboard,
    service: "Keyboard Replacement",
    price: "₹999+",
  },
  {
    icon: HardDrive,
    service: "SSD Upgrade",
    price: "₹3,999+",
  },
  {
    icon: Cpu,
    service: "Motherboard Repair",
    price: "₹2,999+",
  },
  {
    icon: Database,
    service: "Data Recovery",
    price: "₹1,499+",
  },
];

const benefits = [
  "Transparent Pricing",
  "No Hidden Charges",
  "Quality Spare Parts",
  "Professional Installation",
  "Repair Warranty Available",
  "Free Repair Estimate",
];

export default function Pricing() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Affordable Pricing
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Repair Pricing
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe in transparent pricing. Below are our typical starting
            prices. The final cost depends on your laptop model, spare parts
            required and the fault diagnosed by our engineers.
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {pricing.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.service}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {item.service}
                </h3>

                <div className="mt-5 text-4xl font-extrabold text-yellow-500">
                  {item.price}
                </div>

                <p className="mt-3 text-gray-600">
                  Starting Price
                </p>
              </div>
            );
          })}

        </div>

        {/* Bottom Card */}

        <div className="mt-20 rounded-3xl bg-black p-10">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>

              <h3 className="text-3xl font-bold text-white">
                Why Our Pricing is Fair
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Every laptop is different. After diagnosing your device,
                we provide a clear repair estimate before any work begins,
                so you always know what you're paying for.
              </p>

            </div>

            <div className="grid gap-4">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center rounded-xl bg-white/5 p-4 text-white"
                >
                  <CheckCircle2
                    className="mr-3 text-yellow-400"
                    size={22}
                  />
                  {benefit}
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Disclaimer */}

        <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-center">
          <p className="text-gray-700">
            <strong>Note:</strong> Prices shown above are indicative starting
            prices. The final repair cost depends on your laptop model,
            fault diagnosis and spare parts required.
          </p>
        </div>

      </div>
    </section>
  );
}