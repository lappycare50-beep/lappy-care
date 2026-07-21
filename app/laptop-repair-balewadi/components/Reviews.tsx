import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Patil",
    location: "Balewadi",
    rating: 5,
    review:
      "Excellent laptop repair service. My Dell laptop motherboard issue was repaired quickly with transparent pricing and professional support.",
  },
  {
    name: "Sneha Kulkarni",
    location: "Baner",
    rating: 5,
    review:
      "My HP laptop screen was replaced on the same day. The pickup and delivery service was very convenient.",
  },
  {
    name: "Amit Deshmukh",
    location: "Mahalunge",
    rating: 5,
    review:
      "Lappy Care upgraded my Lenovo laptop with an SSD and transferred all my data safely. Highly recommended.",
  },
  {
    name: "Priya Joshi",
    location: "Sus",
    rating: 5,
    review:
      "Very professional technicians. They repaired my ASUS laptop keyboard quickly and at a reasonable price.",
  },
  {
    name: "Karan Shah",
    location: "Aundh",
    rating: 5,
    review:
      "Needed urgent MacBook repair before an office presentation. The team completed the repair faster than expected.",
  },
  {
    name: "Neha More",
    location: "Pashan",
    rating: 5,
    review:
      "Highly recommended for laptop repair near Balewadi. Friendly staff, quality work and excellent customer service.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Customer Reviews
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Trusted by Customers Across Balewadi
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Customers across Balewadi trust Lappy Care for professional laptop
            repair, motherboard repair, screen replacement, SSD upgrades,
            battery replacement and data recovery services.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-7 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-6">
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

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            ⭐ 4.9/5 Google Rating
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-300">
            Trusted by students, professionals, businesses and home users
            across Balewadi, Baner, Mahalunge, Sus, Aundh and nearby Pune
            locations.
          </p>
        </div>
      </div>
    </section>
  );
}