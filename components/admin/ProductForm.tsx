"use client";

import { useEffect, useState } from "react";

import ImageUpload from "@/components/admin/ImageUpload";

import {
  addProduct,
  updateProduct,
} from "@/services/productService";

import { Product } from "@/types/product";

type ProductFormProps = {
  product?: Product | null;
  onSuccess?: () => void;
};

export default function ProductForm({
  product,
  onSuccess,
}: ProductFormProps) {
  // ==========================
  // Form State
  // ==========================

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

  // ==========================
  // Fill Form (Edit Mode)
  // ==========================

  useEffect(() => {
    if (!product) return;

    setBrand(product.brand);
    setModel(product.model);
    setProcessor(product.processor);

    setRam(product.ram);
    setStorage(product.storage);
    setDisplay(product.display);

    setPrice(String(product.price));
    setOriginalPrice(String(product.originalPrice));

    setWarranty(product.warranty);

    setGift(product.gift);
    setOffer(product.offer);

    setRating(String(product.rating));
    setReviews(String(product.reviews));

    setStock(product.stock);
    setImage(product.image);

  }, [product]);
  // ==========================
  // Save Product
  // ==========================

  async function handleSubmit() {
    if (!brand || !model || !processor || !price || !image) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const productData: Omit<Product, "id"> = {
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

      if (product?.id) {
        await updateProduct(product.id, productData);

        alert("✅ Product Updated Successfully");
      } else {
        await addProduct(productData);

        alert("✅ Product Added Successfully");
      }

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

      setStock(true);
      setImage("");

      onSuccess?.();

    } catch (error) {
      console.error("Save Product Error:", error);
      alert("❌ Failed to save product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        {product ? "Edit Laptop" : "Add New Laptop"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Brand */}
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Model */}
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Processor */}
        <input
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          placeholder="Processor"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* RAM */}
        <input
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          placeholder="RAM"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Storage */}
        <input
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          placeholder="Storage"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Display */}
        <input
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          placeholder="Display"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Selling Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Selling Price"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Original Price */}
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Original Price"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Warranty */}
        <input
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
          placeholder="Warranty"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Free Gift */}
        <input
          value={gift}
          onChange={(e) => setGift(e.target.value)}
          placeholder="Free Gift"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Offer */}
        <input
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="Offer"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Rating */}
        <input
          type="number"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Reviews */}
        <input
          type="number"
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}
          placeholder="Reviews"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
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
          id="stock"
          type="checkbox"
          checked={stock}
          onChange={(e) => setStock(e.target.checked)}
          className="h-5 w-5"
        />

        <label
          htmlFor="stock"
          className="text-white"
        >
          In Stock
        </label>

      </div>

      <div className="mt-8">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? (product ? "Updating..." : "Saving...")
            : (product ? "Update Laptop" : "Save Laptop")}
        </button>

      </div>

    </div>
  );
}