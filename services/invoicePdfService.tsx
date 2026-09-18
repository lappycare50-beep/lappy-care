"use client";

import type { Invoice } from "@/types/invoice";

import { toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

// =====================================================
// WAIT FOR IMAGE
// =====================================================

function waitForImage(
  src: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(
        new Error(
          "Failed to load invoice image."
        )
      );
    };

    image.src = src;
  });
}

// =====================================================
// GENERATE INVOICE PDF BASE64
//
// HTML Invoice
//      ↓
// JPEG
//      ↓
// A4 PDF
//      ↓
// Base64
//
// WhatsApp target: <= 1 MB
// =====================================================

export async function generateInvoicePdfBase64(
  element: HTMLElement,
  invoiceData: Invoice
): Promise<string> {
  // ===================================================
  // BROWSER CHECK
  // ===================================================

  if (
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    throw new Error(
      "Invoice PDF can only be generated in the browser."
    );
  }

  // ===================================================
  // ELEMENT CHECK
  // ===================================================

  if (!element) {
    throw new Error(
      "Invoice PDF element was not found."
    );
  }

  // ===================================================
  // WAIT FOR FONTS
  // ===================================================

  if (
    "fonts" in document &&
    document.fonts?.ready
  ) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font loading errors.
    }
  }

  // ===================================================
  // HTML → JPEG
  // ===================================================

  let imageData: string;

  try {
    imageData = await toJpeg(
      element,
      {
        cacheBust: true,

        backgroundColor:
          "#ffffff",

        // Lower pixel ratio helps keep
        // WhatsApp PDF size small.
        pixelRatio:
          1.15,

        // JPEG compression.
        quality:
          0.65,

        width:
          element.scrollWidth,

        height:
          element.scrollHeight,

        style: {
          margin: "0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Invoice image generation failed:",
      error
    );

    throw new Error(
      "Invoice image generation failed."
    );
  }

  if (!imageData) {
    throw new Error(
      "Invoice image generation failed."
    );
  }

  // ===================================================
  // LOAD GENERATED IMAGE
  // ===================================================

  const image =
    await waitForImage(
      imageData
    );

  if (
    !image.width ||
    !image.height
  ) {
    throw new Error(
      "Invoice image dimensions are invalid."
    );
  }

  // ===================================================
  // CREATE A4 PDF
  // ===================================================

  const pdf =
    new jsPDF({
      orientation:
        "portrait",

      unit:
        "mm",

      format:
        "a4",

      compress:
        true,
    });

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  // ===================================================
  // CALCULATE IMAGE SIZE
  // ===================================================

  const imageHeight =
    (
      image.height *
      pageWidth
    ) /
    image.width;

  // ===================================================
  // MULTI PAGE PDF
  // ===================================================

  let position = 0;

  let remainingHeight =
    imageHeight;

  let pageNumber = 1;

  while (
    remainingHeight > 0
  ) {
    pdf.addImage(
      imageData,
      "JPEG",
      0,
      position,
      pageWidth,
      imageHeight,
      undefined,
      "FAST"
    );

    remainingHeight -=
      pageHeight;

    if (
      remainingHeight > 0
    ) {
      pdf.addPage();

      pageNumber += 1;

      position -=
        pageHeight;
    }
  }

  // ===================================================
  // PDF → DATA URI
  // ===================================================

  const dataUri =
    pdf.output(
      "datauristring"
    );

  const parts =
    dataUri.split(",");

  const pdfBase64 =
    parts.length > 1
      ? parts[1]
      : "";

  if (!pdfBase64) {
    throw new Error(
      "Invoice PDF base64 generation failed."
    );
  }

  // ===================================================
  // APPROXIMATE FILE SIZE
  // ===================================================

  const approximateBytes =
    Math.floor(
      (pdfBase64.length * 3) /
        4
    );

  const approximateMb =
    approximateBytes /
    (1024 * 1024);

  // ===================================================
  // DEBUG LOG
  // ===================================================

  console.log(
    "========================================"
  );

  console.log(
    "INVOICE PDF GENERATED"
  );

  console.log(
    JSON.stringify(
      {
        invoiceNo:
          invoiceData.invoiceNo ||
          "-",

        invoiceId:
          invoiceData.id ||
          "-",

        pages:
          pageNumber,

        width:
          image.width,

        height:
          image.height,

        bytes:
          approximateBytes,

        sizeMB:
          approximateMb.toFixed(
            2
          ),
      },
      null,
      2
    )
  );

  console.log(
    "========================================"
  );

  // ===================================================
  // WHATSAPP SIZE SAFETY
  // ===================================================

  if (
    approximateBytes >
    1024 * 1024
  ) {
    throw new Error(
      `Invoice PDF is ${approximateMb.toFixed(
        2
      )} MB. Please reduce invoice content/image size.`
    );
  }

  // ===================================================
  // RETURN PURE BASE64
  // ===================================================

  return pdfBase64;
}