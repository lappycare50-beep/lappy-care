"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AddProductModal from "@/components/admin/AddProductModal";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminLayout>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Products
            </h2>

            <p className="text-gray-400">
              Manage refurbished laptops
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105"
          >
            <Plus size={18} />
            Add Laptop
          </button>

        </div>

        {/* Search */}

        <div className="relative mb-8">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-500"
          />

          <input
            placeholder="Search Laptop..."
            className="w-full rounded-xl border border-yellow-500/20 bg-[#181818] py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Products Table */}

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

              <tr className="border-t border-yellow-500/10">

                <td className="p-5 font-semibold text-white">
                  HP EliteBook 840 G8
                </td>

                <td className="text-gray-300">
                  HP
                </td>

                <td className="font-bold text-yellow-400">
                  ₹29,100
                </td>

                <td className="text-green-400">
                  In Stock
                </td>

                <td className="p-5">

                  <div className="flex gap-3">

                    <button className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600">
                      <Pencil size={18} />
                    </button>

                    <button className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </AdminLayout>

      {/* Modal */}

      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}