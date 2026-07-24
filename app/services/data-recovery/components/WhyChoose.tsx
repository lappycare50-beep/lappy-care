import {
  ShieldCheck,
  Lock,
  Clock3,
  BadgeCheck,
  Database,
  HardDrive,
  CheckCircle2,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Professional Data Recovery",
    description:
      "Our technicians follow a structured recovery process to maximize the chances of recovering valuable data whenever technically possible.",
  },
  {
    icon: Lock,
    title: "100% Confidential Handling",
    description:
      "Your personal and business files remain confidential throughout the diagnosis and recovery process.",
  },
  {
    icon: Database,
    title: "Advanced Recovery Techniques",
    description:
      "We recover deleted files, formatted drives, SSDs, HDDs and external storage devices using professional recovery methods.",
  },
  {
    icon: Clock3,
    title: "Fast Diagnosis",
    description:
      "Every recovery begins with a quick diagnosis so you understand the available recovery options before any work starts.",
  },
  {
    icon: HardDrive,
    title: "Supports Multiple Storage Types",
    description:
      "We work with NVMe SSDs, SATA SSDs, laptop hard disks and external storage devices.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent Process",
    description:
      "We explain the diagnosis, recovery possibilities and estimated cost before proceeding with the recovery process.",
  },
];

const highlights = [
  "Deleted File Recovery",
  "SSD Data Recovery",
  "Hard Disk Recovery",
  "Formatted Drive Recovery",
  "Photo & Video Recovery",
  "Office Document Recovery",
  "Business Data Recovery",
  "External Hard Drive Recovery",
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
            Trusted Laptop
            <span className="block text-yellow-500">
              Data Recovery Experts
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop data recovery services in
            Pune with a focus on secure handling, transparent communication and
            reliable recovery procedures. Whether your files were accidentally
            deleted or your storage device has failed, we help you understand
            the available recovery options before beginning the recovery
            process.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
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

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                Complete Data Recovery Solutions
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                From deleted documents and family photos to important business
                data, our recovery service supports a wide range of storage
                devices and file types. Every case is evaluated individually to
                determine the safest and most effective recovery approach.
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

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <h3 className="text-2xl font-bold">
                  Customer First Approach
                </h3>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-semibold">
                    ✔ Clear Communication
                  </h4>
                  <p className="mt-2 text-sm">
                    We explain the diagnosis, recovery possibilities and expected
                    process before starting any recovery work.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    ✔ Secure Data Handling
                  </h4>
                  <p className="mt-2 text-sm">
                    Your recovered files are handled confidentially and delivered
                    securely after verification.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    ✔ Local Support
                  </h4>
                  <p className="mt-2 text-sm">
                    Convenient data recovery service for customers across Pune
                    and PCMC.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-black p-5 text-center text-white">
                <p className="font-semibold">
                  Serving Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                  Tathawade • Ravet • Pimple Saudagar • Pune • PCMC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}