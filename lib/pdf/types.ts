export type PdfOrientation =
  | "portrait"
  | "landscape";

export interface GeneratePdfOptions {
  element: HTMLElement;
  fileName?: string;
  orientation?: PdfOrientation;
  margin?: number;
  quality?: number;
}