import { CheckCircle2, Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Amit Patil",
    location: "Wakad, Pune",
    review:
      "My Dell laptop keyboard stopped working after a water spill. Lappy Care replaced it the same day and now it works perfectly. Excellent service.",
  },
  {
    name: "Priya Kulkarni",
    location: "Hinjawadi, Pune",
    review:
      "Very professional team. They replaced the backlit keyboard on my HP laptop at a reasonable price. Highly recommended.",
  },
  {
    name: "Rahul Shinde",
    location: "Baner, Pune",
    review:
      "Fast diagnosis, transparent pricing and quality workmanship. My Lenovo keyboard replacement was completed within a few hours.",
  },
];

const stats = [
  {
    value: "1000+",
    label: "Laptops Repaired",
  },
  {
    value: "4.9★",
    label: "Average Rating",
  },
  {
    value: "Same Day*",
    label: "Keyboard Replacement",
  },
  {
    value: "100%",
    label: "Quality Tested",
  },
];

export default function Reviews() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            Customer Reviews
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Trusted Laptop Keyboard
            <span className="block text-yellow-400">
              Replacement Service in Pune
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Customers across Pune and PCMC trust Lappy Care for reliable laptop
            keyboard replacement, transparent pricing and professional service.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-gray-800 bg-gray-900 p-8"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-gray-300">
                "{review.review}"
              </p>

              <div className="mt-8 border-t border-gray-800 pt-6">
                <h3 className="font-bold">{review.name}</h3>

                <p className="text-sm text-gray-400">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-yellow-400 p-10 text-black">
          <h3 className="text-center text-3xl font-bold">
            Why Customers Recommend Lappy Care
          </h3>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <h4 className="text-4xl font-extrabold">
                  {stat.value}
                </h4>

                <p className="mt-3 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-black p-5 text-white">
              <CheckCircle2 className="h-6 w-6 text-yellow-400" />
              <span>Experienced Laptop Repair Technicians</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-black p-5 text-white">
              <CheckCircle2 className="h-6 w-6 text-yellow-400" />
              <span>Quality Tested Keyboard Replacement</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-black p-5 text-white">
              <CheckCircle2 className="h-6 w-6 text-yellow-400" />
              <span>Transparent Pricing & Honest Advice</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-black p-5 text-white">
              <CheckCircle2 className="h-6 w-6 text-yellow-400" />
              <span>Serving Pune & PCMC with Trusted Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}