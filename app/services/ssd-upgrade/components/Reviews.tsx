import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rahul Patil",
    location: "Wakad",
    review:
      "My laptop was taking several minutes to start. After the SSD upgrade from Lappy Care, Windows boots in seconds. The service was quick and professional.",
  },
  {
    name: "Sneha Kulkarni",
    location: "Hinjawadi",
    review:
      "The team upgraded my laptop to an NVMe SSD and migrated all my data safely. Everything worked perfectly without losing any files.",
  },
  {
    name: "Amit Deshmukh",
    location: "Baner",
    review:
      "Excellent service and transparent pricing. My laptop feels like a new machine after the SSD upgrade. Highly recommended.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Customer Reviews
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Customers across Pune and PCMC trust Lappy Care for professional
            laptop SSD upgrades, secure data migration and reliable service.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8 border-t pt-5">
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

        <div className="mt-20 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Trusted Laptop Upgrade Specialists
          </h3>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-300">
            Whether you need a SATA SSD or a high-speed NVMe SSD upgrade,
            our technicians ensure professional installation, secure data
            migration and complete testing before delivering your laptop.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Professional SSD Installation",
              "Safe Data Migration",
              "Fast Turnaround",
              "Quality Tested",
              "Transparent Pricing",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-yellow-400 px-4 py-2 text-sm font-medium text-yellow-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}