"use client";

import ImageUpload from "@/components/admin/ImageUpload";

type Props = {
  brand: string;
  setBrand: (value: string) => void;

  model: string;
  setModel: (value: string) => void;

  serialNo: string;
  setSerialNo: (value: string) => void;

  image: string;
  setImage: (value: string) => void;
};

export default function DeviceSection({
  brand,
  setBrand,
  model,
  setModel,
  serialNo,
  setSerialNo,
  image,
  setImage,
}: Props) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Device Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Brand */}
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand (HP, Dell, Lenovo...)"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Model */}
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        {/* Serial Number */}
        <input
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          placeholder="Serial Number"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400 md:col-span-2"
        />

      </div>

      {/* Device Image */}
      <div className="mt-8">

        <h3 className="mb-3 text-lg font-semibold text-white">
          Device Photo
        </h3>

        <ImageUpload
          value={image}
          onChange={setImage}
        />

      </div>

    </div>
  );
}