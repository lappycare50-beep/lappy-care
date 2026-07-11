"use client";

import { useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { addProduct } from "@/services/productService";
import { Product } from "@/types/product";

export default function ProductForm() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [display, setDisplay] = useState("");

  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");

  const [warranty, setWarranty] = useState("6 Months");
  const [gift, setGift] = useState("");

  const [offer, setOffer] = useState("");
  const [rating, setRating] = useState("4.8");
  const [reviews, setReviews] = useState("0");

  const [stock, setStock] = useState(true);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
async function handleSubmit() {
  if (!brand || !model || !processor || !price || !image) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    setLoading(true);

    const product: Omit<Product, "id"> = {
      brand,
      model,
      processor,
      ram,
      storage,
      display,
      price: Number(price),
      originalPrice: Number(originalPrice),
      warranty,
      stock,
      image,
      rating: Number(rating),
      reviews: Number(reviews),
      gift,
      offer,
    };

    await addProduct(product);

    alert("✅ Product Added Successfully!");

    // Reset Form
    setBrand("");
    setModel("");
    setProcessor("");
    setRam("");
    setStorage("");
    setDisplay("");
    setPrice("");
    setOriginalPrice("");
    setWarranty("6 Months");
    setGift("");
    setOffer("");
    setRating("4.8");
    setReviews("0");
    setImage("");
    setStock(true);

  } catch (error) {
    console.error(error);
    alert("❌ Failed to save product.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Add New Laptop
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          placeholder="Processor"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          placeholder="RAM"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          placeholder="Storage"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          placeholder="Display"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Selling Price"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Original Price"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
          placeholder="Warranty"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={gift}
          onChange={(e) => setGift(e.target.value)}
          placeholder="Free Gift"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="Offer"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

        <input
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}
          placeholder="Reviews"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white"
        />

      </div>

      <div className="mt-8">

        <ImageUpload
          value={image}
          onChange={setImage}
        />

      </div>

      <div className="mt-8 flex items-center gap-3">

        <input
          type="checkbox"
          checked={stock}
          onChange={(e) => setStock(e.target.checked)}
        />

        <label className="text-white">
          In Stock
        </label>

      </div>
      <div className="mt-8">
  <button
    onClick={handleSubmit}
    disabled={loading}
    className="w-full rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
  >
    {loading ? "Saving..." : "Save Laptop"}
  </button>
</div>

    </div>

);
}