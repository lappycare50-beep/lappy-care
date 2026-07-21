import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Patil",
    location: "Tathawade",
    review:
      "Excellent laptop repair service. My Dell laptop motherboard was repaired quickly and is working perfectly.",
  },
  {
    name: "Sneha Kulkarni",
    location: "Punawale",
    review:
      "Very professional team. My HP laptop screen was replaced the same day at a reasonable price.",
  },
  {
    name: "Amit Jadhav",
    location: "Wakad",
    review:
      "Fast SSD upgrade and Windows installation. Laptop performance improved significantly.",
  },
  {
    name: "Pooja Shinde",
    location: "Ravet",
    review:
      "Highly recommended for laptop battery replacement. Genuine parts and excellent customer support.",
  },
  {
    name: "Nikhil More",
    location: "Hinjawadi",
    review:
      "Recovered important office data from my damaged SSD. Great technical knowledge and transparent pricing.",
  },
  {
    name: "Priya Deshmukh",
    location: "Balewadi",
    review:
      "Friendly staff, quick diagnosis and quality repair. Definitely my first choice for laptop service.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Trusted by Customers Across Tathawade
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Customers from Tathawade and nearby areas trust Lappy Care for
            professional laptop repair, transparent pricing and dependable
            after-service support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="mb-5 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-7">
                "{review.review}"
              </p>

              <div className="mt-6">
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

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Rated 4.9★ by Happy Customers
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Lappy Care is trusted by students, professionals, businesses and
            home users across Tathawade, Wakad, Punawale, Ravet and nearby Pune
            areas for reliable laptop repair services.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-7 w-7 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}