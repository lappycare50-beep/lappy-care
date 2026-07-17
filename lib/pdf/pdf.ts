"use client";

import { jsPDF } from "jspdf";

import { PDF } from "./constants";
import { GeneratePdfOptions } from "./types";
import { createCanvasPages } from "./canvas";

export async function generatePDF({
  element,
  fileName = "Document",
  orientation = "portrait",
  margin = PDF.DEFAULT_MARGIN,
  quality = PDF.DEFAULT_SCALE,
}: GeneratePdfOptions): Promise<void> {

  if (!element) {
    throw new Error(
      "Printable element not found."
    );
  }

  try {

    // ==========================================
    // Page Size
    // ==========================================

    const pageWidth =
      orientation === "portrait"
        ? PDF.PORTRAIT.WIDTH
        : PDF.LANDSCAPE.WIDTH;

    const pageHeight =
      orientation === "portrait"
        ? PDF.PORTRAIT.HEIGHT
        : PDF.LANDSCAPE.HEIGHT;

    const printableWidth =
      pageWidth - margin * 2;

    const printableHeight =
      pageHeight - margin * 2;

    // ==========================================
    // Render Canvas Pages
    // ==========================================

    const pages =
      await createCanvasPages({

        element,

        quality,

        pageWidth:
          printableWidth,

        pageHeight:
          printableHeight,

      });

    if (!pages.length) {

      throw new Error(
        "Unable to render PDF pages."
      );

    }

    // ==========================================
    // Create PDF
    // ==========================================

    const pdf =
      new jsPDF({

        orientation,

        unit: "mm",

        format: "a4",

        compress: true,

      });

    pages.forEach(
      (page, index) => {

        if (index !== 0) {

          pdf.addPage();

        }

        const imgHeight =
          (page.height *
            printableWidth) /
          page.width;

        pdf.addImage(

          page.image,

          "PNG",

          margin,

          margin,

          printableWidth,

          imgHeight,

          undefined,

          "FAST"

        );

      }
    );

    // ==========================================
    // Save
    // ==========================================

    pdf.save(
      `${fileName}.pdf`
    );

  } catch (error) {

    console.error(
      "PDF Engine Error:",
      error
    );

    throw error;

  }

}