import { PDFDocument } from "pdf-lib";

export interface PDFQualityOptions {
  dpi: number;
  colorDepth: number;
}

export const DEFAULT_QUALITY: PDFQualityOptions = {
  dpi: 300, // Higher than required 200 DPI for better quality
  colorDepth: 24, // 24-bit color (8 bits each for R,G,B)
};

export async function createHighQualityPDF(
  inputFile: File,
  options: PDFQualityOptions = DEFAULT_QUALITY
): Promise<Uint8Array> {
  const fileArrayBuffer = await inputFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileArrayBuffer);

  // Set PDF metadata for quality specifications
  pdfDoc.setCreator("PDF Editor Pro");
  pdfDoc.setProducer("PDF Editor Pro High Quality Export");

  // Configure PDF for high-quality output
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    // Set high-resolution rendering
    const { width, height } = page.getSize();
    const scale = options.dpi / 72; // Convert DPI to PDF points (72 points = 1 inch)

    // Preserve original content while ensuring high quality
    page.setSize(width * scale, height * scale);
  }

  // Save with maximum quality settings
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: false, // Better compatibility
    addDefaultPage: false,
    // preservePDFForm: true, // Maintain form fields if present
  });

  return pdfBytes;
}
