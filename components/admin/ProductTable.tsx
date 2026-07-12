"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import {
  subscribeProducts,deleteProduct,
} from "@/services/productService";
import { Product } from "@/types/product";

type ProductTableProps = {
  search: string;
  onEdit: (product: Product) => void;
};

export default function ProductTable({
  search,
  onEdit,
}: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 

useEffect(() => {
  const unsubscribe = subscribeProducts((data) => {
    setProducts(data);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

 async function handleDelete(id?: string) {
  if (!id) return;

  const ok = confirm("Delete this product?");

  if (!ok) return;

  try {
    await deleteProduct(id);
  } catch (error) {
    console.error(error);
    alert("Failed to delete product.");
  }
}
const filteredProducts = products.filter((product) => {
  const keyword = search.trim().toLowerCase();

  return (
    product.brand.toLowerCase().includes(keyword) ||
    product.model.toLowerCase().includes(keyword) ||
    product.processor.toLowerCase().includes(keyword)
  );
});

  if (loading) {
    return (
      <div className="rounded-3xl bg-[#181818] p-10 text-center text-white">
        Loading Products...
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="rounded-3xl bg-[#181818] p-10 text-center text-gray-400">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-yellow-500/20">
      <table className="w-full">
        <thead className="bg-[#111111]">
          <tr className="text-left text-yellow-400">
            <th className="p-5">Laptop</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th className="p-5">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-[#181818]">
          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              className="border-t border-yellow-500/10"
            >
              <td className="p-5 font-semibold text-white">
                {product.model}
              </td>

              <td className="text-gray-300">
                {product.brand}
              </td>

              <td className="font-bold text-yellow-400">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </td>

              <td
                className={
                  product.stock
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {product.stock ? "In Stock" : "Out of Stock"}
              </td>

              <td className="p-5">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}