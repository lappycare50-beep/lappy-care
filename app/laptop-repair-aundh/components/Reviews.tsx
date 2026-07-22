import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul P.",
    location: "Aundh",
    review:
      "Excellent laptop repair service. My Dell laptop motherboard issue was repaired quickly with professional support and reasonable pricing.",
  },
  {
    name: "Sneha K.",
    location: "Baner",
    review:
      "Very satisfied with the screen replacement service. Genuine quality parts, quick turnaround and friendly staff.",
  },
  {
    name: "Amit S.",
    location: "Pashan",
    review:
      "SSD and RAM upgrade made my HP laptop much faster. Smooth experience and transparent pricing.",
  },
  {
    name: "Priya M.",
    location: "Pimple Nilakh",
    review:
      "Fast diagnosis and excellent customer support. One of the most reliable laptop repair services near Aundh.",
  },
  {
    name: "Vikas J.",
    location: "Sangvi",
    review:
      "Keyboard replacement and complete servicing were finished on the same day. Highly recommended.",
  },
  {
    name: "Neha D.",
    location: "Balewadi",
    review:
      "They successfully recovered important office data from my damaged SSD. Professional technicians and trustworthy service.",
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
            What Customers Say About Lappy Care
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Thousands of happy customers across Aundh and nearby Pune areas
            trust Lappy Care for reliable laptop repair services.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="mb-6 flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-7 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="h-7 w-7 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <h3 className="mt-6 text-4xl font-bold text-white">
            Rated 4.9★ by Happy Customers
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Lappy Care is trusted by students, professionals and businesses
            across Aundh, Baner, Pashan, Pimple Nilakh, Sangvi, Balewadi and
            nearby Pune locations for dependable laptop repair services.
          </p>
        </div>
      </div>
    </section>
  );
}