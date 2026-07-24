import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/services/productService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LaptopDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#111111] py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Product Image */}
          <div className="rounded-3xl bg-black p-8">
            <Image
              src={product.image}
              alt={product.model}
              width={600}
              height={500}
              className="mx-auto object-contain"
              priority
            />
          </div>

          {/* Product Details */}
          <div>
            <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-semibold text-yellow-400">
              {product.brand}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-white">
              {product.model}
            </h1>

            <div className="mt-6 space-y-3 text-gray-300">
              <p><strong>Processor:</strong> {product.processor}</p>
              <p><strong>RAM:</strong> {product.ram}</p>
              <p><strong>Storage:</strong> {product.storage}</p>
              <p><strong>Display:</strong> {product.display}</p>
              <p><strong>Warranty:</strong> {product.warranty}</p>
            </div>

            <div className="mt-8">
              <p className="text-4xl font-bold text-yellow-400">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-green-400">
                {product.offer}
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://wa.me/919595057006"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                WhatsApp Enquiry
              </a>

              <a
                href="tel:+919595057006"
                className="rounded-xl border border-yellow-400 px-6 py-3 font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                Call Now
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}