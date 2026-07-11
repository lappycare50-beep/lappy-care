"use client";

import { Product } from "@/types/product";
import ProductForm from "@/components/admin/ProductForm";

type Props = {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess?: () => void;
};

export default function AddProductModal({
  open,
  onClose,
  product,
  onSuccess,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#181818] p-8">

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            {product ? "Edit Laptop" : "Add New Laptop"}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-white transition hover:text-red-500"
          >
            ×
          </button>
        </div>

        <ProductForm
          product={product}
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />

      </div>
    </div>
  );
}