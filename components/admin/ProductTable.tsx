"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { getProducts, deleteProduct } from "@/services/productService";
import { Product } from "@/types/product";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id?: string) {
    if (!id) return;

    const ok = confirm("Delete this product?");

    if (!ok) return;

    await deleteProduct(id);

    loadProducts();
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-[#181818] p-10 text-center text-white">
        Loading Products...
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

          {products.map((product) => (

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
                ₹{product.price.toLocaleString("en-IN")}
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
                    className="rounded-lg bg-blue-500 p-2 text-white"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-lg bg-red-500 p-2 text-white"
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