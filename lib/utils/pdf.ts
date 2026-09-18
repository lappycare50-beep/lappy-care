"use client";

import { toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

export type GeneratePdfOptions = {
  element: HTMLElement;
  fileName?: string;
};

// =====================================================
// CONSTANTS
// =====================================================

const PDF_PIXEL_RATIO = 1.2;
const PDF_JPEG_QUALITY = 0.65;

// =====================================================
// HTML ELEMENT → JPEG DATA URL
// =====================================================

async function generateJpegDataUrl(
  element: HTMLElement
): Promise<string> {
  if (!element) {
    throw new Error(
      "Printable element not found."
    );
  }

  return await toJpeg(element, {
    cacheBust: true,

    pixelRatio:
      PDF_PIXEL_RATIO,

    backgroundColor:
      "#ffffff",

    quality:
      PDF_JPEG_QUALITY,

    skipFonts: false,
  });
}

// =====================================================
// HTML ELEMENT → PDF
// =====================================================
//
// Used for normal "Download / Print PDF"
//

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

    const pdf =
      new jsPDF({
        orientation:
          "portrait",

        unit: "mm",

        format: "a4",

        compress: true,
      });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const img =
      new Image();

    img.src =
      dataUrl;

    await new Promise<void>(
      (
        resolve,
        reject
      ) => {
        img.onload = () =>
          resolve();

        img.onerror = () =>
          reject(
            new Error(
              "Failed to load generated PDF image."
            )
          );
      }
    );

    const imgWidth =
      pageWidth;

    const imgHeight =
      (img.height *
        imgWidth) /
      img.width;

    let heightLeft =
      imgHeight;

    let position = 0;

    // =================================================
    // FIRST PAGE
    // =================================================

    pdf.addImage(
      dataUrl,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight,
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
        imgHeight;

      pdf.addPage();

      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      heightLeft -=
        pageHeight;
    }

    // =================================================
    // SAVE
    // =================================================

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
// HTML ELEMENT → PDF BASE64
// =====================================================
//
// Used by WhatsApp invoice API.
//
// IMPORTANT:
// This function accepts ONLY ONE argument:
//
// generateInvoicePdfBase64(element)
//
// It returns a pure Base64 PDF string.
// No data: prefix.
//
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
    // ================================================
    // HTML → COMPRESSED JPEG
    // ================================================

    const dataUrl =
      await generateJpegDataUrl(
        element
      );

    // ================================================
    // CREATE COMPRESSED PDF
    // ================================================

    const pdf =
      new jsPDF({
        orientation:
          "portrait",

        unit: "mm",

        format: "a4",

        compress: true,
      });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    // ================================================
    // LOAD IMAGE
    // ================================================

    const img =
      new Image();

    img.src =
      dataUrl;

    await new Promise<void>(
      (
        resolve,
        reject
      ) => {
        img.onload = () =>
          resolve();

        img.onerror = () =>
          reject(
            new Error(
              "Failed to load invoice image."
            )
          );
      }
    );

    // ================================================
    // IMAGE DIMENSIONS
    // ================================================

    const imgWidth =
      pageWidth;

    const imgHeight =
      (img.height *
        imgWidth) /
      img.width;

    let heightLeft =
      imgHeight;

    let position = 0;

    // ================================================
    // FIRST PAGE
    // ================================================

    pdf.addImage(
      dataUrl,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );

    heightLeft -=
      pageHeight;

    // ================================================
    // ADDITIONAL PAGES
    // ================================================

    while (
      heightLeft > 0
    ) {
      position =
        heightLeft -
        imgHeight;

      pdf.addPage();

      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      heightLeft -=
        pageHeight;
    }

    // ================================================
    // GET PDF AS DATA URI STRING
    // ================================================

    const pdfDataUri =
      pdf.output(
        "datauristring"
      );

    if (
      !pdfDataUri
    ) {
      throw new Error(
        "PDF generation returned empty data."
      );
    }

    // ================================================
    // REMOVE DATA URI PREFIX
    // ================================================

    const base64 =
      pdfDataUri.replace(
        /^data:application\/pdf;filename=[^;]+;base64,/i,
        ""
      ).replace(
        /^data:application\/pdf;base64,/i,
        ""
      ).trim();

    if (!base64) {
      throw new Error(
        "PDF Base64 generation failed."
      );
    }

    return base64;

  } catch (error) {
    console.error(
      "Invoice PDF Base64 Generation Error:",
      error
    );

    throw error;
  }
}