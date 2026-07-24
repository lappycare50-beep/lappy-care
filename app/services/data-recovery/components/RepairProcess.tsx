import {
  Search,
  ClipboardCheck,
  Database,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  HardDrive,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Device Diagnosis",
    description:
      "We inspect your laptop, SSD, hard disk or external storage device to identify the cause of data loss and determine the safest recovery approach.",
  },
  {
    step: "02",
    icon: ClipboardCheck,
    title: "Recovery Assessment",
    description:
      "Our technicians evaluate the storage condition, estimate recovery possibilities and explain the available recovery options before proceeding.",
  },
  {
    step: "03",
    icon: Database,
    title: "Professional Data Recovery",
    description:
      "Using professional recovery techniques, we recover deleted files, documents, photos, videos and business data whenever technically possible.",
  },
  {
    step: "04",
    icon: ShieldCheck,
    title: "Verification & Secure Delivery",
    description:
      "Recovered files are verified and securely handed over to you while maintaining complete confidentiality throughout the process.",
  },
];

const checklist = [
  "Storage Device Diagnosis",
  "Recovery Possibility Assessment",
  "Deleted File Recovery",
  "Formatted Drive Recovery",
  "SSD & HDD Recovery",
  "Photo & Video Recovery",
  "Business File Recovery",
  "Secure Data Delivery",
];

export default function RepairProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Recovery Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Simple & Secure
            <span className="block text-yellow-500">
              Data Recovery Process
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every data recovery case follows a structured process. We begin with
            diagnosis, assess recovery possibilities, recover the data using
            professional techniques and verify everything before secure delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 text-5xl font-extrabold text-yellow-100">
                  {step.step}
                </div>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                What Happens During Recovery?
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                Our goal is to maximize recovery chances while protecting the
                storage device from unnecessary risks. Every case is handled
                carefully using professional procedures and secure data handling
                practices.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {checklist.map((item) => (
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

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h3 className="text-2xl font-bold">
                Why Our Process Works
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <Clock className="mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">
                      Fast Initial Diagnosis
                    </h4>
                    <p className="text-sm">
                      We quickly identify the storage issue and discuss the
                      available recovery options with you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Lock className="mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">
                      Confidential Data Handling
                    </h4>
                    <p className="text-sm">
                      Your personal and business files remain secure and are
                      handled with complete confidentiality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <HardDrive className="mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">
                      Professional Recovery Methods
                    </h4>
                    <p className="text-sm">
                      Every recovery follows industry best practices appropriate
                      for the storage device and type of failure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-black p-5 text-center text-white">
                <p className="font-semibold">
                  Trusted Data Recovery Service for Wakad • Hinjawadi • Baner •
                  Balewadi • Punawale • Tathawade • Ravet • Pimple Saudagar •
                  Pune • PCMC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}