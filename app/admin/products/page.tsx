"use client";

import { useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AddProductModal from "@/components/admin/AddProductModal";
import ProductTable from "@/components/admin/ProductTable";

import { Product } from "@/types/product";

import {
  Plus,
  Search,
} from "lucide-react";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

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
            onClick={() => {
              setSelectedProduct(null);
              setOpen(true);
            }}
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
         type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Brand, Model or Processor..."
  className="w-full rounded-xl border border-yellow-500/20 bg-[#181818] py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-400"
/>
  

        </div>

        <ProductTable
  search={search}
  onEdit={(product) => {
    setSelectedProduct(product);
    setOpen(true);
  }}
/>

      </AdminLayout>

      {/* Modal */}

      <AddProductModal
        open={open}
        product={selectedProduct}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}
      />

    </>
  );
}