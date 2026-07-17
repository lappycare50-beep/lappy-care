"use client";

import { toCanvas } from "html-to-image";

export type CanvasPage = {
  image: string;
  width: number;
  height: number;
};

type Options = {
  element: HTMLElement;
  quality: number;
  pageWidth: number;
  pageHeight: number;
};

export async function createCanvasPages({
  element,
  quality,
  pageWidth,
  pageHeight,
}: Options): Promise<CanvasPage[]> {

  // ==========================
  // Render HTML
  // ==========================

  const canvas = await toCanvas(
    element,
    {
      cacheBust: true,
      pixelRatio: quality,
      backgroundColor: "#ffffff",
    }
  );

  const pages: CanvasPage[] = [];

  // ==========================
  // Scale
  // ==========================

  const scale =
    pageWidth / canvas.width;

  const pagePixelHeight =
    pageHeight / scale;

  let offsetY = 0;

  // ==========================
  // Slice Pages
  // ==========================

  while (offsetY < canvas.height) {

    const sliceHeight =
      Math.min(
        pagePixelHeight,
        canvas.height - offsetY
      );

    const pageCanvas =
      document.createElement("canvas");

    pageCanvas.width =
      canvas.width;

    pageCanvas.height =
      sliceHeight;

    const ctx =
      pageCanvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "Unable to create canvas context."
      );
    }

    ctx.drawImage(

      canvas,

      0,
      offsetY,

      canvas.width,
      sliceHeight,

      0,
      0,

      canvas.width,
      sliceHeight

    );

    pages.push({

      image:
        pageCanvas.toDataURL(
          "image/png"
        ),

      width:
        canvas.width,

      height:
        sliceHeight,

    });

    offsetY += sliceHeight;

  }

  return pages;

}