"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(value || "");
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "lappycare_upload");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setPreview(data.secure_url);

      onChange(data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="mb-3 block font-medium text-white">
        Laptop Image
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20">

          <Image
            src={preview}
            alt="Preview"
            width={500}
            height={350}
            className="h-64 w-full object-cover"
          />

          <button
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white"
          >
            <X size={18} />
          </button>

        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-yellow-500/30 bg-[#181818] transition hover:border-yellow-400"
        >
          <Upload
            size={42}
            className="mb-4 text-yellow-400"
          />

          <p className="font-semibold text-white">
            Click to Upload Image
          </p>

          <p className="mt-2 text-sm text-gray-400">
            JPG • PNG • WEBP
          </p>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          uploadImage(file);
        }}
      />

      {loading && (
        <p className="mt-4 text-yellow-400">
          Uploading Image...
        </p>
      )}
    </div>
  );
}