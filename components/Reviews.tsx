import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-yellow-400">
            Customer Reviews
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-400">
            Trusted by hundreds of happy customers across Pune.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8 transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(255,208,0,0.15)]"
            >

              <div className="mb-5 flex">

                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="leading-7 text-gray-300">
                "{review.review}"
              </p>

              <div className="mt-8 border-t border-yellow-500/20 pt-5">

                <h3 className="font-bold text-white">
                  {review.name}
                </h3>

                <p className="text-sm text-yellow-400">
                  {review.location}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}