import {
  Laptop,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  HardDrive,
  Database,
} from "lucide-react";

const brands = [
  "HP",
  "Dell",
  "Lenovo",
  "ASUS",
  "Acer",
  "Apple MacBook",
  "MSI",
  "Samsung",
  "LG",
  "Microsoft Surface",
];

const storageTypes = [
  {
    title: "NVMe SSD",
    description:
      "Professional recovery for PCIe NVMe SSDs used in modern laptops.",
  },
  {
    title: "SATA SSD",
    description:
      "Recover data from SATA solid-state drives affected by corruption or failure.",
  },
  {
    title: "2.5\" Hard Disk",
    description:
      "Data recovery for traditional laptop hard disk drives with logical failures.",
  },
  {
    title: "External Hard Drive",
    description:
      "Recover important files from USB hard drives and portable storage devices.",
  },
];

const supportedFiles = [
  "Documents",
  "Photos",
  "Videos",
  "Excel Files",
  "PDF Files",
  "Presentations",
  "Projects",
  "Emails",
];

export default function SupportedBrands() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Supported Devices
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Data Recovery for
            <span className="block text-yellow-500">
              All Major Laptop Brands
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop data recovery services for
            all leading laptop manufacturers and storage technologies. Whether
            your device uses an SSD, NVMe SSD or traditional hard disk, our
            technicians perform a detailed diagnosis before beginning the
            recovery process.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <Laptop className="mx-auto h-10 w-10 text-yellow-500" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {brand}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {storageTypes.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:border-yellow-400 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <HardDrive className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                File Types We Recover
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                We recover personal and business files from laptops, SSDs,
                hard disks and external storage devices whenever technically
                possible.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {supportedFiles.map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8" />
                <h3 className="text-2xl font-bold">
                  Safe & Secure Recovery
                </h3>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <Database className="mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">
                      Confidential Handling
                    </h4>
                    <p className="text-sm">
                      Customer files are handled securely throughout the recovery
                      process.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Cpu className="mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">
                      Professional Diagnosis
                    </h4>
                    <p className="text-sm">
                      Every storage device is analyzed before attempting data
                      recovery.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <HardDrive className="mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">
                      Advanced Recovery Methods
                    </h4>
                    <p className="text-sm">
                      We use professional recovery techniques suitable for the
                      storage device and failure type.
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