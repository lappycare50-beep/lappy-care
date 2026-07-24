import { Star, Quote, ShieldCheck, Database, Clock } from "lucide-react";

const reviews = [
  {
    name: "Amit Patil",
    location: "Wakad",
    rating: 5,
    review:
      "My laptop SSD suddenly stopped working and I thought all my office data was gone. Lappy Care recovered almost everything and explained the complete process clearly. Highly recommended.",
  },
  {
    name: "Priya Kulkarni",
    location: "Hinjawadi",
    rating: 5,
    review:
      "I accidentally formatted my external hard drive containing family photos. The team recovered my important files and handled everything professionally.",
  },
  {
    name: "Rahul Shinde",
    location: "Baner",
    rating: 5,
    review:
      "Excellent service for laptop data recovery. Professional diagnosis, transparent communication and secure handling of my business documents.",
  },
];

const stats = [
  {
    icon: Database,
    value: "1000+",
    label: "Storage Devices Diagnosed",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    icon: Clock,
    value: "Fast",
    label: "Initial Diagnosis",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Confidential Handling",
  },
];

export default function Reviews() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Customer Reviews
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Trusted by Customers Across
            <span className="block text-yellow-500">
              Pune & PCMC
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Customers trust Lappy Care for professional laptop data recovery,
            secure file handling and transparent communication throughout the
            recovery process.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-6 flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8 border-t pt-6">
                <h3 className="font-bold text-gray-900">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-black p-8 text-center text-white"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <div className="mt-6 text-4xl font-extrabold text-yellow-400">
                  {stat.value}
                </div>

                <p className="mt-3 text-gray-300">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                Professional Service You Can Trust
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                We understand that your personal memories and business files are
                valuable. Our recovery process focuses on careful diagnosis,
                secure handling and transparent communication from start to
                finish.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Professional Diagnosis",
                  "Secure Data Handling",
                  "Transparent Communication",
                  "Customer-Focused Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <ShieldCheck className="h-5 w-5 text-yellow-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h3 className="text-2xl font-bold">
                Why Customers Recommend Lappy Care
              </h3>

              <div className="mt-8 space-y-5">
                <div>
                  <h4 className="font-semibold">
                    ✔ Clear Recovery Assessment
                  </h4>
                  <p className="mt-2 text-sm">
                    We explain recovery possibilities before starting the work.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    ✔ Confidential Process
                  </h4>
                  <p className="mt-2 text-sm">
                    Your personal and business files are handled securely and
                    privately.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    ✔ Local Support
                  </h4>
                  <p className="mt-2 text-sm">
                    Serving customers across Wakad, Hinjawadi, Baner, Balewadi,
                    Punawale, Tathawade, Ravet, Pimple Saudagar, Pune and PCMC.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-black p-5 text-center text-white">
                <p className="font-semibold">
                  Your data deserves professional care and secure handling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}