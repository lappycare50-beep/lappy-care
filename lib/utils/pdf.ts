"use client";

import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export type GeneratePdfOptions = {
  element: HTMLElement;
  fileName?: string;
};

export async function generatePDF({
  element,
  fileName = "Document",
}: GeneratePdfOptions): Promise<void> {

  if (!element) {
    throw new Error("Printable element not found.");
  }

  try {

    const dataUrl = await toPng(element, {

      cacheBust: true,

      pixelRatio: 2,

      backgroundColor: "#ffffff",

      skipFonts: false,

    });

    const pdf = new jsPDF({

      orientation: "portrait",

      unit: "mm",

      format: "a4",

    });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const img = new Image();

    img.src = dataUrl;

    await new Promise<void>((resolve) => {

      img.onload = () => resolve();

    });

    const imgWidth = pageWidth;

    const imgHeight =
      (img.height * imgWidth) /
      img.width;

    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(

      dataUrl,

      "PNG",

      0,

      position,

      imgWidth,

      imgHeight

    );

    heightLeft -= pageHeight;

    while (heightLeft > 0) {

      position =
        heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(

        dataUrl,

        "PNG",

        0,

        position,

        imgWidth,

        imgHeight

      );

      heightLeft -= pageHeight;

    }

    pdf.save(`${fileName}.pdf`);

  } catch (error) {

    console.error(
      "PDF Generation Error:",
      error
    );

    throw error;

  }

}