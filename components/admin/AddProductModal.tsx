"use client";

import ProductForm from "@/components/admin/ProductForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddProductModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-5xl rounded-3xl bg-[#181818] p-8 max-h-[90vh] overflow-y-auto">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Add New Laptop
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-white hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <ProductForm />

      </div>

    </div>
  );
}