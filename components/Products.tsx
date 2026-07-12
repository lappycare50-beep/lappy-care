
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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  loadProducts();
}, []);
if (loading) {
  return (
    <section className="bg-[#111111] py-20 text-center">
      <h2 className="text-3xl text-white">
        Loading Products...
      </h2>
    </section>
  );
}
  return (
    <section id="products" className="bg-[#111111] py-20">
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

            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818] transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(255,208,0,0.18)]"
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
                  alt={product.model}
                  width={380}
                  height={260}
                  className="object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-2"
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
                    <Monitor size={18} className="text-yellow-400" />
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

                    <span className="rounded-full bg-red-500 px-3 py-1 text
                  -xs font-bold text-white">
                      🔥 {product.offer}
                    </span>

                  </div>

                </div>
                                {/* Buttons */}
                <div className="mt-8 flex gap-3">

                  <button className="flex-1 rounded-xl bg-yellow-400 py-3 font-bold text-black transition duration-300 hover:scale-105 hover:bg-yellow-300">
                    View Details
                  </button>

                  <a
                    href="https://wa.me/919595057006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-yellow-400 py-3 text-center font-bold text-yellow-400 transition duration-300 hover:bg-yellow-400 hover:text-black"
                  >
                    💬 WhatsApp
                  </a>

                </div>

              </div>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}