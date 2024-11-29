// src/components/PDFEditor.tsx
import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Header } from "./Header";
import {
  createHighQualityPDF,
  DEFAULT_QUALITY,
  PDFQualityOptions,
} from "../../utils/pdfUtils";
import { PDFViewer } from "./PDFViewer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toolbar } from "./Toolbar";

export interface PDFEditorProps {
  className?: string;
  onSave?: (pdfBytes: Uint8Array, fileName: string) => void;
  initialFile?: File;
}

export const PDFEditor: React.FC<PDFEditorProps> = ({
  className = "",
  onSave,
  initialFile,
}) => {
  const [pdfFile, setPdfFile] = useState<File | null>(initialFile || null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [quality, setQuality] = useState<PDFQualityOptions>(DEFAULT_QUALITY);
  const fileSlice = useMemo(
    () => (pdfFile ? pdfFile.slice(0) : null),
    [pdfFile]
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
      setCurrentPage(1);
      setZoom(1);
      setRotation(0);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleDownload = useCallback(async () => {
    if (!pdfFile || isProcessing) return;

    try {
      setIsProcessing(true);
      const pdfBytes = await createHighQualityPDF(pdfFile, quality);

      if (onSave) {
        onSave(pdfBytes, `enhanced-${pdfFile.name}`);
      } else {
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `enhanced-${pdfFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error processing PDF:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [pdfFile, isProcessing, onSave, quality]);

  const handleFullscreen = useCallback(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }, []);

  const handleLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setTotalPages(numPages);
    },
    []
  );

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col ${className}`}
    >
      {/* Header Component */}
      <Header
        onUpload={() => document.getElementById("fileInput")?.click()}
        onDownload={handleDownload}
      />

      {/* Toolbar Component */}
      <Toolbar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        zoom={zoom}
        rotation={rotation}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onFullscreen={handleFullscreen}
        quality={quality} // Pass the current quality
        onQualityChange={setQuality} // Pass the handler to update quality
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[calc(100vh-12rem)]">
          <div {...getRootProps()} className="h-full cursor-pointer">
            <input {...getInputProps()} id="fileInput" />
            <PDFViewer
              fileSlice={fileSlice}
              currentPage={currentPage}
              zoom={zoom}
              rotation={rotation}
              onLoadSuccess={handleLoadSuccess}
            />
          </div>
        </div>
      </main>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <LoadingSpinner />
            <p className="text-gray-700 dark:text-gray-300">
              Converting PDF with enhanced quality settings...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
