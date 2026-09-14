"use client";

import { useRef, useState } from "react";

import {
  Camera,
  ImagePlus,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import type {
  RepairDevice,
} from "@/types/repair";

// =====================================================
// TYPES
// =====================================================

type Props = {
  device: RepairDevice;
  setDevice: (
    device: RepairDevice
  ) => void;
};

// =====================================================
// CONSTANTS
// =====================================================

const MAX_PHOTOS = 10;

const MAX_OUTPUT_WIDTH = 1600;
const MAX_OUTPUT_HEIGHT = 1600;

const JPEG_QUALITY = 0.82;

// =====================================================
// BRAND OPTIONS
// =====================================================

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

// =====================================================
// COLOR OPTIONS
// =====================================================

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

// =====================================================
// COMPONENT
// =====================================================

export default function DeviceSection({
  device,
  setDevice,
}: Props) {
  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const cameraInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    uploadCount,
    setUploadCount,
  ] = useState(0);

  // ===================================================
  // UPDATE DEVICE FIELD
  // ===================================================

  function update<
    K extends keyof RepairDevice
  >(
    key: K,
    value: RepairDevice[K]
  ) {
    setDevice({
      ...device,
      [key]: value,
    });
  }

  // ===================================================
  // COMPRESS IMAGE
  //
  // Camera photos can be very large.
  // Convert them to JPEG and resize before upload.
  // ===================================================

  async function compressImage(
    file: File
  ): Promise<File> {
    return new Promise(
      (
        resolve,
        reject
      ) => {
        const reader =
          new FileReader();

        reader.onload =
          () => {
            const image =
              new Image();

            image.onload =
              () => {
                let width =
                  image.width;

                let height =
                  image.height;

                // -----------------------------------------
                // KEEP ASPECT RATIO
                // -----------------------------------------

                if (
                  width >
                  MAX_OUTPUT_WIDTH
                ) {
                  const ratio =
                    MAX_OUTPUT_WIDTH /
                    width;

                  width =
                    MAX_OUTPUT_WIDTH;

                  height =
                    Math.round(
                      height *
                        ratio
                    );
                }

                if (
                  height >
                  MAX_OUTPUT_HEIGHT
                ) {
                  const ratio =
                    MAX_OUTPUT_HEIGHT /
                    height;

                  height =
                    MAX_OUTPUT_HEIGHT;

                  width =
                    Math.round(
                      width *
                        ratio
                    );
                }

                // -----------------------------------------
                // CANVAS
                // -----------------------------------------

                const canvas =
                  document.createElement(
                    "canvas"
                  );

                canvas.width =
                  width;

                canvas.height =
                  height;

                const context =
                  canvas.getContext(
                    "2d"
                  );

                if (!context) {
                  reject(
                    new Error(
                      "Could not create image canvas."
                    )
                  );

                  return;
                }

                // White background prevents
                // transparent PNG issues.
                context.fillStyle =
                  "#ffffff";

                context.fillRect(
                  0,
                  0,
                  width,
                  height
                );

                context.drawImage(
                  image,
                  0,
                  0,
                  width,
                  height
                );

                // -----------------------------------------
                // JPEG OUTPUT
                // -----------------------------------------

                canvas.toBlob(
                  (
                    blob
                  ) => {
                    if (!blob) {
                      reject(
                        new Error(
                          "Image compression failed."
                        )
                      );

                      return;
                    }

                    const baseName =
                      file.name.replace(
                        /\.[^/.]+$/,
                        ""
                      );

                    const compressedFile =
                      new File(
                        [
                          blob,
                        ],
                        `${baseName}.jpg`,
                        {
                          type:
                            "image/jpeg",
                          lastModified:
                            Date.now(),
                        }
                      );

                    resolve(
                      compressedFile
                    );
                  },
                  "image/jpeg",
                  JPEG_QUALITY
                );
              };

            image.onerror =
              () => {
                reject(
                  new Error(
                    "Could not decode selected image."
                  )
                );
              };

            image.src =
              String(
                reader.result
              );
          };

        reader.onerror =
          () => {
            reject(
              new Error(
                "Could not read selected image."
              )
            );
          };

        reader.readAsDataURL(
          file
        );
      }
    );
  }

  // ===================================================
  // UPLOAD ONE IMAGE TO CLOUDINARY
  // ===================================================

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

    const uploadPreset =
      "lappycare_upload";

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      uploadPreset
    );

    const response =
      await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method:
            "POST",

          body:
            formData,
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

  // ===================================================
  // PHOTO UPLOAD
  // ===================================================

  async function handlePhotoUpload(
    files: FileList | null
  ) {
    if (
      !files ||
      files.length === 0
    ) {
      return;
    }

    const selectedFiles =
      Array.from(files);

    const existingPhotos =
      device.devicePhotos || [];

    const remainingSlots =
      MAX_PHOTOS -
      existingPhotos.length;

    if (
      remainingSlots <= 0
    ) {
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
        let index = 0;
        index <
        filesToUpload.length;
        index++
      ) {
        const originalFile =
          filesToUpload[index];

        // =============================================
        // IMAGE VALIDATION
        // =============================================

        if (
          !originalFile.type.startsWith(
            "image/"
          )
        ) {
          console.warn(
            "Skipping non-image file:",
            originalFile.name
          );

          continue;
        }

        // =============================================
        // COMPRESS
        // =============================================

        const compressedFile =
          await compressImage(
            originalFile
          );

        console.log(
          "Device photo compression:",
          {
            file:
              originalFile.name,

            originalBytes:
              originalFile.size,

            compressedBytes:
              compressedFile.size,

            originalMB:
              (
                originalFile.size /
                1024 /
                1024
              ).toFixed(2),

            compressedMB:
              (
                compressedFile.size /
                1024 /
                1024
              ).toFixed(2),
          }
        );

        // =============================================
        // CLOUDINARY UPLOAD
        // =============================================

        const uploadedUrl =
          await uploadImage(
            compressedFile
          );

        uploadedUrls.push(
          uploadedUrl
        );

        setUploadCount(
          uploadedUrls.length
        );
      }

      // ===============================================
      // NOTHING UPLOADED
      // ===============================================

      if (
        uploadedUrls.length ===
        0
      ) {
        throw new Error(
          "No photos were uploaded."
        );
      }

      // ===============================================
      // UPDATE DEVICE PHOTOS
      // ===============================================

      const updatedPhotos = [
        ...existingPhotos,
        ...uploadedUrls,
      ];

      setDevice({
        ...device,

        // First uploaded/existing photo
        // remains the main image.
        image:
          device.image ||
          updatedPhotos[0] ||
          "",

        devicePhotos:
          updatedPhotos,
      });
    } catch (
      error
    ) {
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

      if (
        cameraInputRef.current
      ) {
        cameraInputRef.current.value =
          "";
      }
    }
  }

  // ===================================================
  // REMOVE SINGLE PHOTO
  // ===================================================

  function removePhoto(
    index: number
  ) {
    const photos =
      device.devicePhotos || [];

    const updatedPhotos =
      photos.filter(
        (
          _,
          photoIndex
        ) =>
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

  // ===================================================
  // CLEAR ALL PHOTOS
  // ===================================================

  function clearAllPhotos() {
    const photos =
      device.devicePhotos || [];

    if (
      photos.length === 0
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Remove all device photos from this repair?"
      );

    if (!confirmed) {
      return;
    }

    setDevice({
      ...device,

      image:
        "",

      devicePhotos:
        [],
    });
  }

  // ===================================================
  // PHOTOS
  // ===================================================

  const photos =
    device.devicePhotos || [];

  // ===================================================
  // RENDER
  // ===================================================

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
            value={
              device.type
            }
            onChange={(event) =>
              update(
                "type",
                event.target.value
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
            value={
              device.brand
            }
            onChange={(event) =>
              update(
                "brand",
                event.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="">
              Select Brand
            </option>

            {BRAND_OPTIONS.map(
              (
                brand
              ) => (
                <option
                  key={
                    brand
                  }
                  value={
                    brand
                  }
                >
                  {
                    brand
                  }
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
            value={
              device.model
            }
            onChange={(event) =>
              update(
                "model",
                event.target.value
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
            value={
              device.serialNo
            }
            onChange={(event) =>
              update(
                "serialNo",
                event.target.value
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
              device.processor ??
              ""
            }
            onChange={(event) =>
              update(
                "processor",
                event.target.value
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
            value={
              device.ram ??
              ""
            }
            onChange={(event) =>
              update(
                "ram",
                event.target.value
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
              device.storage ??
              ""
            }
            onChange={(event) =>
              update(
                "storage",
                event.target.value
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
            value={
              device.color ??
              ""
            }
            onChange={(event) =>
              update(
                "color",
                event.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="">
              Select Color
            </option>

            {COLOR_OPTIONS.map(
              (
                color
              ) => (
                <option
                  key={
                    color
                  }
                  value={
                    color
                  }
                >
                  {
                    color
                  }
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

        {/* Header */}

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

          {photos.length >
            0 && (
            <button
              type="button"
              onClick={
                clearAllPhotos
              }
              disabled={
                uploading
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2
                size={16}
              />

              Remove All
            </button>
          )}

        </div>

        {/* =================================================
            CAMERA + GALLERY BUTTONS
        ================================================= */}

        {photos.length <
          MAX_PHOTOS && (
          <div className="grid gap-3 sm:grid-cols-2">

            {/* Camera */}

            <button
              type="button"
              disabled={
                uploading
              }
              onClick={() =>
                cameraInputRef.current?.click()
              }
              className="flex min-h-[140px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-yellow-500/30 bg-[#111111] px-5 py-6 transition hover:border-yellow-400 hover:bg-yellow-500/5 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {uploading ? (
                <>
                  <Loader2
                    size={34}
                    className="mb-3 animate-spin text-yellow-400"
                  />

                  <p className="font-semibold text-white">
                    Uploading
                    {uploadCount >
                    0
                      ? ` ${uploadCount}...`
                      : "..."}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Please wait
                  </p>
                </>
              ) : (
                <>
                  <Camera
                    size={36}
                    className="mb-3 text-yellow-400"
                  />

                  <p className="font-semibold text-white">
                    Take Photo
                  </p>

                  <p className="mt-2 text-center text-xs text-zinc-500">
                    Use device camera
                  </p>
                </>
              )}

            </button>

            {/* Gallery */}

            <button
              type="button"
              disabled={
                uploading
              }
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="flex min-h-[140px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-[#111111] px-5 py-6 transition hover:border-yellow-400 hover:bg-yellow-500/5 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {uploading ? (
                <>
                  <Loader2
                    size={34}
                    className="mb-3 animate-spin text-yellow-400"
                  />

                  <p className="font-semibold text-white">
                    Uploading
                    {uploadCount >
                    0
                      ? ` ${uploadCount}...`
                      : "..."}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Please wait
                  </p>
                </>
              ) : (
                <>
                  <ImagePlus
                    size={36}
                    className="mb-3 text-yellow-400"
                  />

                  <p className="font-semibold text-white">
                    Choose Photos
                  </p>

                  <p className="mt-2 text-center text-xs text-zinc-500">
                    Select JPG, PNG or WEBP
                    <br />
                    Maximum {MAX_PHOTOS} photos
                  </p>
                </>
              )}

            </button>

          </div>
        )}

        {/* =================================================
            CAMERA INPUT
        ================================================= */}

        <input
          ref={
            cameraInputRef
          }
          type="file"
          hidden
          accept="image/*"
          capture="environment"
          onChange={(
            event
          ) =>
            void handlePhotoUpload(
              event.target.files
            )
          }
        />

        {/* =================================================
            GALLERY INPUT
        ================================================= */}

        <input
          ref={
            fileInputRef
          }
          type="file"
          hidden
          multiple
          accept="image/jpeg,image/png,image/webp,image/*"
          onChange={(
            event
          ) =>
            void handlePhotoUpload(
              event.target.files
            )
          }
        />

        {/* =================================================
            PHOTO GRID
        ================================================= */}

        {photos.length >
          0 && (
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
                      src={
                        photo
                      }
                      alt={`Device photo ${
                        index +
                        1
                      }`}
                      className="aspect-square w-full object-cover"
                    />

                    {/* Number */}

                    <div className="absolute left-2 top-2 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-bold text-white">
                      #
                      {index +
                        1}
                    </div>

                    {/* Main */}

                    {index ===
                      0 && (
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
                      disabled={
                        uploading
                      }
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-600 disabled:opacity-50"
                      title="Remove photo"
                      aria-label={`Remove device photo ${
                        index +
                        1
                      }`}
                    >
                      <X
                        size={15}
                      />
                    </button>

                  </div>
                )
              )}

            </div>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {photos.length ===
          0 &&
          !uploading && (
            <div className="mt-5 rounded-xl border border-zinc-800 bg-[#111111] p-4 text-center text-sm text-zinc-600">
              No device photos added yet.
            </div>
          )}

      </div>

    </div>
  );
}