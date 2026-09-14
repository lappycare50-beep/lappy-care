"use client";

import type {
  Invoice,
} from "@/types/invoice";

import {
  toJpeg,
} from "html-to-image";

import {
  jsPDF,
} from "jspdf";

// =====================================================
// WAIT FOR IMAGE
// =====================================================

function waitForImage(
  src: string
): Promise<HTMLImageElement> {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const image =
        new Image();

      image.onload =
        () => resolve(
          image
        );

      image.onerror =
        () =>
          reject(
            new Error(
              "Failed to load invoice image."
            )
          );

      image.src =
        src;
    }
  );
}

// =====================================================
// GENERATE INVOICE PDF
//
// Returns:
// pure base64 PDF data
//
// Optimized for WhatsApp:
// target <= 1 MB
// =====================================================

export async function generateInvoicePdfBase64(
  element: HTMLElement,
  invoiceData: Invoice
): Promise<string> {
  if (
    typeof window ===
      "undefined" ||
    typeof document ===
      "undefined"
  ) {
    throw new Error(
      "Invoice PDF can only be generated in the browser."
    );
  }

  if (!element) {
    throw new Error(
      "Invoice PDF element was not found."
    );
  }

  // ===================================================
  // HTML → JPEG
  // ===================================================

  const imageData =
    await toJpeg(
      element,
      {
        cacheBust: true,

        backgroundColor:
          "#ffffff",

        pixelRatio:
          1.25,

        quality:
          0.70,

        width:
          element.scrollWidth,

        height:
          element.scrollHeight,
      }
    );

  if (!imageData) {
    throw new Error(
      "Invoice image generation failed."
    );
  }

  // ===================================================
  // LOAD IMAGE
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
  // A4 PDF
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
  // IMAGE DIMENSIONS
  // ===================================================

  const imageHeight =
    (
      image.height *
      pageWidth
    ) /
    image.width;

  let position =
    0;

  let remainingHeight =
    imageHeight;

  // ===================================================
  // MULTI PAGE SUPPORT
  // ===================================================

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

      position -=
        pageHeight;
    }
  }

  // ===================================================
  // BASE64
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
  // SIZE LOG
  // ===================================================

  const approximateBytes =
    Math.floor(
      (pdfBase64.length *
        3) /
        4
    );

  const approximateMb =
    approximateBytes /
    (1024 * 1024);

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
          invoiceData.invoiceNo,

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
  // SIZE SAFETY CHECK
  //
  // 1 MB target
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

  return pdfBase64;
}