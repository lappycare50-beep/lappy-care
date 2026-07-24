"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";

import {
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Star,
  Gift,
  ShieldCheck,
  Package,
} from "lucide-react";

function ProductSkeleton() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <div className="mx-auto h-4 w-40 animate-pulse rounded bg-yellow-400/20" />
          <div className="mx-auto mt-5 h-10 w-80 animate-pulse rounded bg-neutral-800" />
          <div className="mx-auto mt-4 h-4 w-64 animate-pulse rounded bg-neutral-800" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818]"
            >
              <div className="h-72 animate-pulse bg-black" />

              <div className="space-y-4 p-6">
                <div className="h-5 w-24 animate-pulse rounded bg-neutral-800" />
                <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
                <div className="h-4 w-28 animate-pulse rounded bg-neutral-800" />

                <div className="space-y-3 pt-4">
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
                </div>

                <div className="mt-6 h-24 animate-pulse rounded-2xl bg-black" />

                <div className="mt-6 h-12 animate-pulse rounded-xl bg-green-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (active) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <section
      id="products"
      className="bg-[#111111] py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">

          <p className="font-semibold uppercase tracking-[0.25em] text-yellow-400">
            Refurbished Laptops
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Featured Laptop Collection
          </h2>

          <p className="mt-4 text-gray-400">
            Professionally Tested • Warranty Included • Ready To Use
          </p>

        </div>

        {/* Products */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (
                        <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative flex h-72 items-center justify-center bg-black p-4">
                {/* Badges */}
                <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    🔥 Best Seller
                  </span>

                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                    ✔ {product.warranty} Warranty
                  </span>
                </div>

                {/* Stock */}
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
                    {product.stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.model} Refurbished Laptop`}
                  width={380}
                  height={260}
                  loading="lazy"
                  quality={85}
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Brand */}
                <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
                  {product.brand}
                </span>

                {/* Model */}
                <h3 className="mt-4 text-3xl font-bold text-white">
                  {product.model}
                </h3>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-semibold text-yellow-400">
                    {product.rating}
                  </span>

                  <span className="text-gray-500">
                    ({product.reviews} Reviews)
                  </span>
                </div>

                {/* Specs */}
                <div className="mt-6 space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <Cpu size={18} className="text-yellow-400" />
                    {product.processor}
                  </div>

                  <div className="flex items-center gap-3">
                    <MemoryStick
                      size={18}
                      className="text-yellow-400"
                    />
                    {product.ram}
                  </div>

                  <div className="flex items-center gap-3">
                    <HardDrive
                      size={18}
                      className="text-yellow-400"
                    />
                    {product.storage}
                  </div>

                  <div className="flex items-center gap-3">
                    <Monitor
                      size={18}
                      className="text-yellow-400"
                    />
                    {product.display}
                  </div>
                </div>

                {/* Extras */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <Gift size={16} />
                    {product.gift}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <ShieldCheck size={16} />
                    {product.warranty} Warranty
                  </div>

                  <div className="flex items-center gap-2 text-sm text-yellow-400">
                    <Package size={16} />
                    Ready To Dispatch
                  </div>
                </div>

                {/* Price */}
                <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-black p-4">
                  <p className="text-sm text-gray-500">
                    Offer Price
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-yellow-400">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>

                      <p className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </p>
                    </div>

                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                      🔥 {product.offer}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href="https://wa.me/919595057006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl bg-green-600 py-3 text-center font-bold text-white transition-colors duration-300 hover:bg-green-700"
                  >
                    💬 Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}