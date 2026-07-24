import {
  Quote,
  Star,
  CheckCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";

const reviews = [
  {
    name: "Amit Patil",
    location: "Wakad",
    rating: 5,
    review:
      "My laptop became much faster after upgrading from 8GB to 16GB RAM. The compatibility check and installation were completed professionally within an hour.",
  },
  {
    name: "Priya Kulkarni",
    location: "Hinjawadi",
    rating: 5,
    review:
      "Excellent RAM upgrade service. The team explained the difference between DDR4 and DDR5 and recommended the correct upgrade for my laptop.",
  },
  {
    name: "Rahul Shinde",
    location: "Baner",
    rating: 5,
    review:
      "Very professional service with transparent pricing. Multitasking and application performance improved significantly after the RAM upgrade.",
  },
];

const stats = [
  {
    value: "1000+",
    label: "RAM Upgrades Completed",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    value: "30-60 Min",
    label: "Average Upgrade Time",
  },
  {
    value: "100%",
    label: "Compatibility Checked",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Customer Reviews
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Trusted Laptop RAM Upgrade Service in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Customers choose Lappy Care for professional RAM upgrades,
            compatibility verification and reliable laptop performance
            improvements across Pune and PCMC.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-6 flex gap-1">
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
                <h3 className="font-semibold text-gray-900">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.location}, Pune
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-4xl font-extrabold text-yellow-400">
                  {stat.value}
                </h3>

                <p className="mt-2 text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-yellow-400" />

                <h3 className="text-3xl font-bold text-yellow-400">
                  Why Customers Recommend Us
                </h3>
              </div>

              <p className="mt-6 leading-8 text-gray-300">
                Every RAM upgrade includes compatibility verification,
                professional installation and complete performance testing.
                Our goal is to deliver a noticeable speed improvement while
                maintaining long-term system stability.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Professional laptop technicians",
                "DDR3, DDR4 & DDR5 support",
                "Free compatibility inspection",
                "Transparent pricing",
                "Performance testing included",
                "Fast turnaround time",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-yellow-400" />

                  <span className="text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 text-yellow-400" />

              <div>
                <h4 className="text-xl font-bold text-white">
                  Professional Service You Can Trust
                </h4>

                <p className="mt-3 text-gray-300">
                  From RAM compatibility checks to final stability testing,
                  every upgrade is performed using industry best practices to
                  ensure reliable performance for work, business, study and
                  gaming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}