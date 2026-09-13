"use client";

import { useRef, useState } from "react";
import {
  Camera,
  ImagePlus,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { RepairDevice } from "@/types/repair";

type Props = {
  device: RepairDevice;
  setDevice: (device: RepairDevice) => void;
};

const MAX_PHOTOS = 10;

// ==========================================
// Brand Options
// ==========================================

const BRAND_OPTIONS = [
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Acer",
  "MSI",
  "Apple",
  "Microsoft",
  "Samsung",
  "Xiaomi",
  "Realme",
  "Other",
];

// ==========================================
// Color Options
// ==========================================

const COLOR_OPTIONS = [
  "Black",
  "Silver",
  "Grey",
  "White",
  "Blue",
  "Red",
  "Gold",
  "Rose Gold",
  "Other",
];

export default function DeviceSection({
  device,
  setDevice,
}: Props) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [uploadCount, setUploadCount] =
    useState(0);

  // =====================================================
  // UPDATE DEVICE FIELD
  // =====================================================

  const update = <
    K extends keyof RepairDevice
  >(
    key: K,
    value: RepairDevice[K]
  ) => {
    setDevice({
      ...device,
      [key]: value,
    });
  };

  // =====================================================
  // UPLOAD ONE PHOTO TO CLOUDINARY
  // =====================================================

  async function uploadImage(
    file: File
  ): Promise<string> {
    const cloudName =
      process.env
        .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      throw new Error(
        "Cloudinary cloud name is not configured."
      );
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      "lappycare_upload"
    );

    const response =
      await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data?.secure_url
    ) {
      throw new Error(
        data?.error?.message ||
          "Image upload failed."
      );
    }

    return data.secure_url;
  }

  // =====================================================
  // MULTIPLE PHOTO UPLOAD
  // =====================================================

  async function handlePhotoUpload(
    files: FileList | null
  ) {
    if (!files?.length) {
      return;
    }

    const selectedFiles =
      Array.from(files);

    const existingPhotos =
      device.devicePhotos || [];

    const remainingSlots =
      MAX_PHOTOS -
      existingPhotos.length;

    if (remainingSlots <= 0) {
      alert(
        `Maximum ${MAX_PHOTOS} device photos allowed.`
      );

      return;
    }

    const filesToUpload =
      selectedFiles.slice(
        0,
        remainingSlots
      );

    if (
      selectedFiles.length >
      remainingSlots
    ) {
      alert(
        `Only ${remainingSlots} more photo(s) can be added.`
      );
    }

    try {
      setUploading(true);
      setUploadCount(0);

      const uploadedUrls: string[] =
        [];

      for (
        const file of filesToUpload
      ) {
        if (
          !file.type.startsWith(
            "image/"
          )
        ) {
          continue;
        }

        const maxSize =
          10 * 1024 * 1024;

        if (file.size > maxSize) {
          console.warn(
            `Skipping ${file.name}: file is larger than 10 MB.`
          );

          continue;
        }

        const url =
          await uploadImage(
            file
          );

        uploadedUrls.push(url);

        setUploadCount(
          uploadedUrls.length
        );
      }

      if (
        uploadedUrls.length === 0
      ) {
        throw new Error(
          "No photos were uploaded."
        );
      }

      const updatedPhotos = [
        ...existingPhotos,
        ...uploadedUrls,
      ];

      setDevice({
        ...device,

        image:
          device.image ||
          uploadedUrls[0] ||
          updatedPhotos[0] ||
          "",

        devicePhotos:
          updatedPhotos,
      });
    } catch (error) {
      console.error(
        "Device photo upload error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Device photo upload failed."
      );
    } finally {
      setUploading(false);
      setUploadCount(0);

      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          "";
      }
    }
  }

  // =====================================================
  // REMOVE PHOTO
  // =====================================================

  function removePhoto(
    index: number
  ) {
    const photos =
      device.devicePhotos || [];

    const updatedPhotos =
      photos.filter(
        (_, photoIndex) =>
          photoIndex !== index
      );

    setDevice({
      ...device,

      image:
        updatedPhotos[0] ||
        "",

      devicePhotos:
        updatedPhotos,
    });
  }

  // =====================================================
  // CLEAR ALL PHOTOS
  // =====================================================

  function clearAllPhotos() {
    if (
      !device.devicePhotos?.length
    ) {
      return;
    }

    const ok =
      window.confirm(
        "Remove all device photos from this repair?"
      );

    if (!ok) {
      return;
    }

    setDevice({
      ...device,

      image: "",

      devicePhotos: [],
    });
  }

  // =====================================================
  // PHOTO LIST
  // =====================================================

  const photos =
    device.devicePhotos || [];

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Device Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Record the device information and photos at the time of repair intake.
          </p>

        </div>

        <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-bold text-yellow-400">
          Photos: {photos.length}/{MAX_PHOTOS}
        </div>

      </div>

      {/* =================================================
          DEVICE DETAILS
      ================================================= */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* Device Type */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Device Type
          </label>

          <select
            value={device.type}
            onChange={(e) =>
              update(
                "type",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="Laptop">
              Laptop
            </option>

            <option value="Desktop">
              Desktop
            </option>

            <option value="MacBook">
              MacBook
            </option>

            <option value="Printer">
              Printer
            </option>

            <option value="Monitor">
              Monitor
            </option>
          </select>
        </div>

        {/* Brand */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Brand *
          </label>

          <select
            value={device.brand}
            onChange={(e) =>
              update(
                "brand",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="">
              Select Brand
            </option>

            {BRAND_OPTIONS.map(
              (brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              )
            )}
          </select>
        </div>

        {/* Model */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Model *
          </label>

          <input
            type="text"
            value={device.model}
            onChange={(e) =>
              update(
                "model",
                e.target.value
              )
            }
            placeholder="Latitude 5420"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Serial Number */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Serial Number
          </label>

          <input
            type="text"
            value={device.serialNo}
            onChange={(e) =>
              update(
                "serialNo",
                e.target.value
              )
            }
            placeholder="Serial Number"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Processor */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Processor
          </label>

          <input
            type="text"
            value={
              device.processor ?? ""
            }
            onChange={(e) =>
              update(
                "processor",
                e.target.value
              )
            }
            placeholder="Intel Core i5 11th Gen"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* RAM */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            RAM
          </label>

          <input
            type="text"
            value={device.ram ?? ""}
            onChange={(e) =>
              update(
                "ram",
                e.target.value
              )
            }
            placeholder="8 GB"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Storage */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Storage
          </label>

          <input
            type="text"
            value={
              device.storage ?? ""
            }
            onChange={(e) =>
              update(
                "storage",
                e.target.value
              )
            }
            placeholder="512 GB SSD"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        {/* Color */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Color
          </label>

          <select
            value={device.color ?? ""}
            onChange={(e) =>
              update(
                "color",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="">
              Select Color
            </option>

            {COLOR_OPTIONS.map(
              (color) => (
                <option
                  key={color}
                  value={color}
                >
                  {color}
                </option>
              )
            )}
          </select>
        </div>

      </div>

      {/* =================================================
          DEVICE PHOTOS
      ================================================= */}

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-5">

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <Camera
                size={19}
                className="text-yellow-400"
              />

              <h3 className="text-lg font-bold text-white">
                Device Photos
              </h3>

            </div>

            <p className="mt-1 text-sm text-zinc-500">
              Add photos of the device condition before repair.
            </p>

          </div>

          {photos.length > 0 && (
            <button
              type="button"
              onClick={
                clearAllPhotos
              }
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 size={16} />

              Remove All
            </button>
          )}

        </div>

        {/* Upload Button */}

        {photos.length <
          MAX_PHOTOS && (
          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={uploading}
            className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-yellow-500/30 bg-[#111111] px-5 py-8 transition hover:border-yellow-400 hover:bg-yellow-500/5 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {uploading ? (
              <>
                <Loader2
                  size={38}
                  className="mb-3 animate-spin text-yellow-400"
                />

                <p className="font-semibold text-white">
                  Uploading{" "}
                  {uploadCount > 0
                    ? `${uploadCount}...`
                    : "..."}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Please wait
                </p>
              </>
            ) : (
              <>
                <ImagePlus
                  size={38}
                  className="mb-3 text-yellow-400"
                />

                <p className="font-semibold text-white">
                  Add Device Photos
                </p>

                <p className="mt-2 text-center text-xs text-zinc-500">
                  Select multiple JPG, PNG or WEBP images
                  <br />
                  Maximum 10 photos • 10 MB each
                </p>
              </>
            )}

          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          accept="image/jpeg,image/png,image/webp,image/*"
          onChange={(e) =>
            void handlePhotoUpload(
              e.target.files
            )
          }
        />

        {/* =================================================
            PHOTO GRID
        ================================================= */}

        {photos.length > 0 && (
          <div className="mt-6">

            <div className="mb-3 flex items-center justify-between">

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Uploaded Photos
              </p>

              <p className="text-xs text-zinc-600">
                First photo is used as the main device image
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

              {photos.map(
                (
                  photo,
                  index
                ) => (
                  <div
                    key={`${photo}-${index}`}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
                  >

                    <img
                      src={photo}
                      alt={`Device photo ${
                        index + 1
                      }`}
                      className="aspect-square w-full object-cover"
                    />

                    {/* Number */}

                    <div className="absolute left-2 top-2 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-bold text-white">
                      #{index + 1}
                    </div>

                    {/* Main */}

                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 rounded-lg bg-yellow-400 px-2 py-1 text-[10px] font-black uppercase text-black">
                        Main
                      </div>
                    )}

                    {/* Remove */}

                    <button
                      type="button"
                      onClick={() =>
                        removePhoto(
                          index
                        )
                      }
                      disabled={uploading}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-600 disabled:opacity-50"
                      title="Remove photo"
                      aria-label={`Remove device photo ${
                        index + 1
                      }`}
                    >
                      <X size={15} />
                    </button>

                  </div>
                )
              )}

            </div>

          </div>
        )}

        {/* Empty State */}

        {photos.length === 0 &&
          !uploading && (
            <div className="mt-5 rounded-xl border border-zinc-800 bg-[#111111] p-4 text-center text-sm text-zinc-600">
              No device photos added yet.
            </div>
          )}

      </div>

    </div>
  );
}