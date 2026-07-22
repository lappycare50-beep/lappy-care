import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Patil",
    location: "Ravet",
    review:
      "Excellent laptop repair service. My Dell laptop motherboard was repaired professionally and delivered on time.",
  },
  {
    name: "Sneha Kulkarni",
    location: "Kiwale",
    review:
      "Very happy with the screen replacement on my HP laptop. Quick service and transparent pricing.",
  },
  {
    name: "Amit Jadhav",
    location: "Punawale",
    review:
      "SSD upgrade and Windows installation were completed the same day. Laptop performance improved significantly.",
  },
  {
    name: "Pooja Shinde",
    location: "Tathawade",
    review:
      "Professional team with genuine spare parts. My laptop battery replacement was completed quickly.",
  },
  {
    name: "Nikhil More",
    location: "Nigdi",
    review:
      "Recovered important office data from my damaged SSD. Excellent technical knowledge and friendly support.",
  },
  {
    name: "Priya Deshmukh",
    location: "Akurdi",
    review:
      "Highly recommended for laptop repairs. Fast diagnosis, reasonable pricing and quality workmanship.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Trusted by Customers Across Ravet
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Customers across Ravet and nearby locations trust Lappy Care for
            reliable laptop repair, experienced technicians and excellent
            customer support.
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

              <p className="leading-7 text-gray-600">
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
            home users across Ravet, Kiwale, Punawale, Tathawade, Nigdi and
            nearby Pune areas for dependable laptop repair services.
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