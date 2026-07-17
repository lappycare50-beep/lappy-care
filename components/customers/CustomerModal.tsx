"use client";

import { Customer } from "@/types/customer";

import CustomerForm from "./CustomerForm";

type Props = {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
  onSuccess?: () => void;
};

export default function CustomerModal({
  open,
  onClose,
  customer,
  onSuccess,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-[#181818] p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            {customer ? "Edit Customer" : "New Customer"}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-white transition hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <CustomerForm
          customer={customer}
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />

      </div>

    </div>
  );
}