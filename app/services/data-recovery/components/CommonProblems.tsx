import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  Database,
  FolderX,
  HardDrive,
  Laptop,
  Trash2,
} from "lucide-react";

const problems = [
  {
    icon: Trash2,
    title: "Accidentally Deleted Files",
    description:
      "Recover deleted photos, videos, office documents and important files before they are permanently overwritten.",
  },
  {
    icon: FolderX,
    title: "Formatted Drive",
    description:
      "Recover data from formatted SSDs, hard disks, external drives and USB storage devices.",
  },
  {
    icon: HardDrive,
    title: "Hard Disk Failure",
    description:
      "Professional recovery from slow, inaccessible or physically failing hard drives whenever recovery is possible.",
  },
  {
    icon: Database,
    title: "SSD Failure",
    description:
      "Advanced SSD data recovery for corrupted, inaccessible and failed solid-state drives.",
  },
  {
    icon: Bug,
    title: "Virus & Malware Damage",
    description:
      "Recover important files affected by malware, ransomware or operating system corruption.",
  },
  {
    icon: Laptop,
    title: "Laptop Not Booting",
    description:
      "Retrieve valuable data from laptops that fail to boot because of storage or software issues.",
  },
];

const recoverableData = [
  "Deleted Photos & Videos",
  "Office Documents",
  "Business Files",
  "Project Data",
  "External Hard Drive Recovery",
  "SSD Recovery",
  "Hard Disk Recovery",
  "Formatted Drive Recovery",
];

export default function CommonProblems() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Common Data Loss Problems
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Professional Solutions for
            <span className="block text-yellow-500">
              Every Data Recovery Situation
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Data loss can happen unexpectedly. Whether files were deleted,
            storage was formatted, an SSD failed or the laptop stopped booting,
            Lappy Care provides secure and professional data recovery services.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {problem.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-black p-10 text-white">
            <h3 className="text-3xl font-bold">
              What Can We Recover?
            </h3>

            <p className="mt-6 leading-8 text-gray-300">
              We recover personal files, business documents, office projects,
              photos, videos and many other types of important data from SSDs,
              HDDs and external storage devices.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {recoverableData.map((item) => (
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

          <div className="rounded-3xl bg-yellow-400 p-10 text-black">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8" />

              <h3 className="text-3xl font-bold">
                Important Advice
              </h3>
            </div>

            <p className="mt-6 leading-8">
              If you accidentally deleted files or your storage device has
              failed, stop using it immediately. Installing software or copying
              new files may overwrite recoverable data and reduce recovery
              success.
            </p>

            <div className="mt-8 rounded-2xl bg-black p-6 text-white">
              <p className="font-semibold">
                ✔ Stop using the device immediately.
              </p>

              <p className="mt-3">
                ✔ Contact Lappy Care before attempting any recovery.
              </p>

              <p className="mt-3">
                ✔ Professional diagnosis improves recovery success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}