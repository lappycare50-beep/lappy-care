import {
  HardDrive,
  Database,
  FileSearch,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Laptop,
  Clock,
} from "lucide-react";

const services = [
  {
    icon: FileSearch,
    title: "Deleted File Recovery",
    description:
      "Recover accidentally deleted files, folders, photos, videos and important documents from laptops and storage devices.",
  },
  {
    icon: HardDrive,
    title: "Hard Disk & SSD Recovery",
    description:
      "Professional recovery solutions for failed HDDs, SSDs and external hard drives using advanced recovery methods.",
  },
  {
    icon: Database,
    title: "Formatted Drive Recovery",
    description:
      "Recover valuable data from formatted, corrupted or inaccessible partitions whenever technically possible.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Recovery Process",
    description:
      "Every recovery is performed with strict confidentiality to protect your personal and business information.",
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
  "External Hard Disk Recovery",
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Professional Laptop Data Recovery
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Recover Important Data from
            <span className="block text-yellow-500">
              Laptops, SSDs & Hard Drives
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop data recovery services in
            Pune for deleted files, formatted drives, damaged hard disks, SSDs,
            external storage devices and corrupted operating systems. We focus
            on secure recovery procedures, protecting your valuable personal and
            business data throughout the recovery process.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                Why Choose Professional Data Recovery?
              </h3>

              <p className="mt-6 text-gray-300 leading-8">
                Data loss can occur due to accidental deletion, formatting,
                storage failure, operating system corruption, malware attacks or
                hardware damage. Professional diagnosis significantly improves
                the chances of recovering valuable information while minimizing
                additional risk to your storage device.
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
              <h4 className="text-2xl font-bold">
                Lappy Care Data Recovery
              </h4>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <Laptop className="mt-1 h-6 w-6" />
                  <div>
                    <h5 className="font-semibold">
                      Supports All Major Laptop Brands
                    </h5>
                    <p className="text-sm">
                      HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI,
                      Samsung, LG and Microsoft Surface.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Lock className="mt-1 h-6 w-6" />
                  <div>
                    <h5 className="font-semibold">
                      Confidential Data Handling
                    </h5>
                    <p className="text-sm">
                      Your files remain private and are handled with strict
                      confidentiality throughout the recovery process.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="mt-1 h-6 w-6" />
                  <div>
                    <h5 className="font-semibold">
                      Fast Diagnosis
                    </h5>
                    <p className="text-sm">
                      We inspect the storage device first and explain the
                      possible recovery options before starting the recovery
                      process.
                    </p>
                  </div>
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