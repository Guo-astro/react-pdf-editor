// src/components/PDFViewer.tsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  fileSlice: Blob | null;
  currentPage: number;
  zoom: number;
  rotation: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  fileSlice,
  currentPage,
  zoom,
  rotation,
  onLoadSuccess,
}) => {
  // Conditional rendering based on file presence
  if (!fileSlice) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-300 mb-2">
            Drop your PDF here or click to upload
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Supports high-quality PDF processing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center overflow-auto h-full bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Document
        file={fileSlice}
        onLoadSuccess={onLoadSuccess}
        className="max-w-full"
        loading={
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-300">Loading PDF...</p>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500 dark:text-red-400">
              Failed to load PDF.
            </p>
          </div>
        }
        noData={
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-300">
              No PDF file specified.
            </p>
          </div>
        }
      >
        <Page
          pageNumber={currentPage}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="shadow-lg"
          scale={zoom}
          rotate={rotation}
          loading={
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-300">
                Loading page...
              </p>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-full">
              <p className="text-red-500 dark:text-red-400">
                Failed to load page.
              </p>
            </div>
          }
        />
      </Document>
    </div>
  );
};
