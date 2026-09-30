"use client";

import { toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

export type GeneratePdfOptions = {
  element: HTMLElement;
  fileName?: string;
};

// =====================================================
// PDF SETTINGS
// =====================================================

const PDF_PIXEL_RATIO = 1.0;
const PDF_JPEG_QUALITY = 0.55;

// =====================================================
// HELPERS
// =====================================================

function getBase64Bytes(
  base64: string
): number {
  const cleanBase64 =
    base64.replace(
      /\s/g,
      ""
    );

  const padding =
    cleanBase64.endsWith("==")
      ? 2
      : cleanBase64.endsWith("=")
      ? 1
      : 0;

  return Math.max(
    0,
    Math.floor(
      (cleanBase64.length * 3) /
        4
    ) - padding
  );
}

function formatMB(
  bytes: number
): string {
  return (
    bytes /
    (1024 * 1024)
  ).toFixed(2);
}

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

      image.onload = () =>
        resolve(image);

      image.onerror = () =>
        reject(
          new Error(
            "Failed to load generated image."
          )
        );

      image.src = src;
    }
  );
}

// =====================================================
// HTML → JPEG
// =====================================================

async function generateJpegDataUrl(
  element: HTMLElement
): Promise<string> {
  if (!element) {
    throw new Error(
      "Printable element not found."
    );
  }

  return await toJpeg(
    element,
    {
      cacheBust: true,

      backgroundColor:
        "#ffffff",

      pixelRatio:
        PDF_PIXEL_RATIO,

      quality:
        PDF_JPEG_QUALITY,

      width:
        element.scrollWidth,

      height:
        element.scrollHeight,

      style: {
        margin: "0",
      },
    }
  );
}

// =====================================================
// NORMAL PDF DOWNLOAD
// =====================================================

export async function generatePDF({
  element,
  fileName = "Document",
}: GeneratePdfOptions): Promise<void> {
  if (!element) {
    throw new Error(
      "Printable element not found."
    );
  }

  try {
    const dataUrl =
      await generateJpegDataUrl(
        element
      );

    const image =
      await waitForImage(
        dataUrl
      );

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

    const imageWidth =
      pageWidth;

    const imageHeight =
      (image.height *
        imageWidth) /
      image.width;

    let heightLeft =
      imageHeight;

    let position = 0;

    pdf.addImage(
      dataUrl,
      "JPEG",
      0,
      position,
      imageWidth,
      imageHeight,
      undefined,
      "FAST"
    );

    heightLeft -=
      pageHeight;

    while (
      heightLeft > 0
    ) {
      position =
        heightLeft -
        imageHeight;

      pdf.addPage();

      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        position,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      heightLeft -=
        pageHeight;
    }

    pdf.save(
      `${fileName}.pdf`
    );
  } catch (error) {
    console.error(
      "PDF Generation Error:",
      error
    );

    throw error;
  }
}

// =====================================================
// HTML → PDF BASE64
//
// Used by WhatsApp invoice.
//
// IMPORTANT:
// This function accepts ONLY:
// generateInvoicePdfBase64(element)
//
// Returns pure Base64.
// =====================================================

export async function generateInvoicePdfBase64(
  element: HTMLElement
): Promise<string> {
  if (!element) {
    throw new Error(
      "Printable invoice element not found."
    );
  }

  try {
    // =================================================
    // GENERATE JPEG
    // =================================================

    console.log(
      "========================================"
    );

    console.log(
      "INVOICE PDF DIAGNOSTIC"
    );

    console.log(
      "Generating JPEG..."
    );

    const dataUrl =
      await generateJpegDataUrl(
        element
      );

    if (!dataUrl) {
      throw new Error(
        "Invoice JPEG generation failed."
      );
    }

    // =================================================
    // JPEG BASE64 SIZE
    // =================================================

    const jpegBase64 =
      dataUrl.split(",")[1] ||
      "";

    const jpegBytes =
      getBase64Bytes(
        jpegBase64
      );

    console.log(
      "JPEG DATA"
    );

    console.log(
      JSON.stringify(
        {
          jpegBytes,
          jpegMB:
            formatMB(
              jpegBytes
            ),
          elementWidth:
            element.scrollWidth,
          elementHeight:
            element.scrollHeight,
          pixelRatio:
            PDF_PIXEL_RATIO,
          quality:
            PDF_JPEG_QUALITY,
        },
        null,
        2
      )
    );

    // =================================================
    // LOAD JPEG
    // =================================================

    const image =
      await waitForImage(
        dataUrl
      );

    if (
      !image.width ||
      !image.height
    ) {
      throw new Error(
        "Invoice image dimensions are invalid."
      );
    }

    console.log(
      "JPEG DIMENSIONS"
    );

    console.log(
      JSON.stringify(
        {
          width:
            image.width,
          height:
            image.height,
        },
        null,
        2
      )
    );

    // =================================================
    // CREATE PDF
    // =================================================

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

    const imageWidth =
      pageWidth;

    const imageHeight =
      (image.height *
        imageWidth) /
      image.width;

    let heightLeft =
      imageHeight;

    let position = 0;

    let pageCount = 1;

    // =================================================
    // FIRST PAGE
    // =================================================

    pdf.addImage(
      dataUrl,
      "JPEG",
      0,
      position,
      imageWidth,
      imageHeight,
      undefined,
      "FAST"
    );

    heightLeft -=
      pageHeight;

    // =================================================
    // ADDITIONAL PAGES
    // =================================================

    while (
      heightLeft > 0
    ) {
      position =
        heightLeft -
        imageHeight;

      pdf.addPage();

      pageCount += 1;

      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        position,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      heightLeft -=
        pageHeight;
    }

    // =================================================
    // PDF DATA URI
    // =================================================

    const pdfDataUri =
      pdf.output(
        "datauristring"
      );

    if (!pdfDataUri) {
      throw new Error(
        "PDF generation returned empty data."
      );
    }

    // =================================================
    // EXTRACT BASE64
    // =================================================

    const commaIndex =
      pdfDataUri.indexOf(",");

    if (
      commaIndex === -1
    ) {
      throw new Error(
        "Invalid PDF data URI."
      );
    }

    const base64 =
      pdfDataUri
        .slice(
          commaIndex + 1
        )
        .trim();

    if (!base64) {
      throw new Error(
        "PDF Base64 generation failed."
      );
    }

    // =================================================
    // PDF SIZE
    // =================================================

    const pdfBytes =
      getBase64Bytes(
        base64
      );

    console.log(
      "PDF DATA"
    );

    console.log(
      JSON.stringify(
        {
          pdfBytes,
          pdfMB:
            formatMB(
              pdfBytes
            ),
          pages:
            pageCount,
        },
        null,
        2
      )
    );

    console.log(
      "========================================"
    );

    return base64;

  } catch (error) {
    console.error(
      "Invoice PDF Base64 Generation Error:",
      error
    );

    throw error;
  }
}