"use client";

import { createRoot } from "react-dom/client";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

import type { Repair } from "@/types/repair";

import JobCardPreview from "@/components/jobcard/JobCardPreview";

// =====================================================
// WAIT FOR BROWSER RENDER
// =====================================================

function waitForRender() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

// =====================================================
// GENERATE JOB CARD PDF BASE64
//
// Returns:
// pure base64 string
//
// Does NOT return:
// data:application/pdf;base64,...
// =====================================================

export async function generateJobCardPdfBase64(
  repair: Repair
): Promise<string> {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    throw new Error(
      "Job Card PDF can only be generated in the browser."
    );
  }

  // ===================================================
  // TEMPORARY PDF RENDER CONTAINER
  // ===================================================

  const container =
    document.createElement("div");

  container.style.position = "fixed";
  container.style.left = "-100000px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.background = "#ffffff";
  container.style.zIndex = "999999";
  container.style.pointerEvents = "none";
  container.style.overflow = "visible";

  document.body.appendChild(
    container
  );

  const root =
    createRoot(container);

  try {
    // =================================================
    // RENDER SAME JOB CARD PREVIEW
    // =================================================

    root.render(
      <JobCardPreview
        repair={repair}
      />
    );

    // Wait until React + browser layout settles.
    await waitForRender();

    // =================================================
    // FIND ACTUAL JOB CARD
    // =================================================

    const element =
      container.querySelector(
        "#job-card-print"
      ) as HTMLElement | null;

    if (!element) {
      throw new Error(
        "Job Card print area was not found."
      );
    }

    // Extra layout safety.
    await waitForRender();

    // =================================================
    // CAPTURE EXACT JOB CARD
    // =================================================

    const imageDataUrl =
      await toPng(
        element,
        {
          cacheBust: true,

          backgroundColor:
            "#ffffff",

          pixelRatio: 2,

          width:
            element.scrollWidth,

          height:
            element.scrollHeight,

          style: {
            margin: "0",
            background:
              "#ffffff",
          },
        }
      );

    if (!imageDataUrl) {
      throw new Error(
        "Job Card image generation failed."
      );
    }

    // =================================================
    // CREATE A4 PDF
    // =================================================

    const pdf =
      new jsPDF({
        orientation:
          "portrait",

        unit: "mm",

        format: "a4",

        compress: true,
      });

    const imageProperties =
      pdf.getImageProperties(
        imageDataUrl
      );

    const pageWidth = 210;
    const pageHeight = 297;

    const imageWidth =
      Number(
        imageProperties.width
      );

    const imageHeight =
      Number(
        imageProperties.height
      );

    if (
      !imageWidth ||
      !imageHeight
    ) {
      throw new Error(
        "Generated Job Card image dimensions are invalid."
      );
    }

    // =================================================
    // FIT INSIDE A4
    // =================================================

    const scale =
      Math.min(
        pageWidth / imageWidth,
        pageHeight / imageHeight
      );

    const finalWidth =
      imageWidth * scale;

    const finalHeight =
      imageHeight * scale;

    const x =
      (pageWidth -
        finalWidth) /
      2;

    const y =
      (pageHeight -
        finalHeight) /
      2;

    // =================================================
    // ADD IMAGE
    // =================================================

    pdf.addImage(
      imageDataUrl,
      "PNG",
      x,
      y,
      finalWidth,
      finalHeight,
      undefined,
      "FAST"
    );

    // =================================================
    // OUTPUT BASE64
    // =================================================

    const dataUri =
      pdf.output(
        "datauristring"
      );

    const marker =
      "base64,";

    const markerIndex =
      dataUri.indexOf(
        marker
      );

    if (
      markerIndex === -1
    ) {
      throw new Error(
        "Failed to convert Job Card PDF to base64."
      );
    }

    const base64 =
      dataUri.slice(
        markerIndex +
          marker.length
      );

    if (!base64) {
      throw new Error(
        "Job Card PDF base64 data is empty."
      );
    }

    return base64;
  } catch (error) {
    console.error(
      "Job Card PDF generation error:",
      error
    );

    throw error instanceof Error
      ? error
      : new Error(
          "Failed to generate Job Card PDF."
        );
  } finally {
    // =================================================
    // CLEANUP
    // =================================================

    try {
      root.unmount();
    } catch (error) {
      console.warn(
        "Job Card PDF React unmount warning:",
        error
      );
    }

    container.remove();
  }
}