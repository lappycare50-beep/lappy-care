import {
  Search,
  Monitor,
  PackageCheck,
  Wrench,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Device Inspection",
    description:
      "Our technicians inspect the laptop to identify whether the issue is limited to the display or involves other hardware components.",
  },
  {
    icon: Monitor,
    title: "2. Screen Diagnosis",
    description:
      "We verify the display type, size, resolution, connector compatibility and identify the appropriate replacement option for your laptop model.",
  },
  {
    icon: PackageCheck,
    title: "3. Display Selection",
    description:
      "Based on availability, we recommend a genuine or high-quality compatible display panel and explain the available options before proceeding.",
  },
  {
    icon: Wrench,
    title: "4. Professional Installation",
    description:
      "The damaged display is carefully removed and the replacement screen is installed using proper repair procedures and handling practices.",
  },
  {
    icon: ShieldCheck,
    title: "5. Quality Testing",
    description:
      "The new display is tested for brightness, colour accuracy, resolution, backlight performance and touch functionality where applicable.",
  },
  {
    icon: CheckCircle2,
    title: "6. Ready for Delivery",
    description:
      "After successful testing, the laptop is cleaned, final quality checks are completed and the device is prepared for customer delivery.",
  },
];

export default function RepairProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Repair Workflow
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Screen Replacement Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every laptop screen replacement follows a structured process
            to help ensure compatibility, quality installation and
            reliable performance before your device is returned.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          <div className="absolute left-7 top-0 hidden h-full w-1 rounded-full bg-yellow-300 lg:block" />

          <div className="space-y-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl lg:flex-row lg:items-start"
                >
                  <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black lg:absolute lg:-left-7">
                    <Icon size={28} />
                  </div>

                  <div className="lg:ml-12">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-8 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Careful Repair Process
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Every laptop model is different. Our technicians verify
                display compatibility and inspect the device before
                replacing the screen. This helps ensure that the
                replacement display is appropriate for your specific
                laptop model.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Final Quality Checks
              </h3>

              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✓ Display Brightness Check</li>
                <li>✓ Colour & Resolution Verification</li>
                <li>✓ Dead Pixel Inspection</li>
                <li>✓ Backlight Performance Test</li>
                <li>✓ Touch Function Test (Supported Models)</li>
                <li>✓ Overall Display Quality Verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Closing Content */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Professional Laptop Screen Replacement in Pune
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your laptop screen is cracked, flickering, showing
            lines, suffering from backlight problems or has stopped
            working completely, Lappy Care provides professional screen
            replacement services for a wide range of laptop brands. Our
            goal is to deliver a quality repair experience using
            appropriate replacement parts and careful installation.
          </p>
        </div>
      </div>
    </section>
  );
}