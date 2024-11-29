// src/components/Toolbar.tsx
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { SettingsModal } from "./SettingsModal";
import { PDFQualityOptions } from "../../utils/pdfUtils";

interface ToolbarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  zoom: number;
  rotation: number;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  onFullscreen: () => void;
  quality: PDFQualityOptions; // New prop
  onQualityChange: (quality: PDFQualityOptions) => void; // New prop
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  zoom,
  rotation,
  onZoomChange,
  onRotationChange,
  onFullscreen,
  quality,
  onQualityChange,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Previous Page Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        title="Previous Page"
        aria-label="Previous Page"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Page Indicator */}
      <span className="text-sm text-gray-700 dark:text-gray-300 mx-2">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Page Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        title="Next Page"
        aria-label="Next Page"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Divider */}
      <Separator
        orientation="vertical"
        className="h-6 bg-gray-300 dark:bg-gray-600 mx-3"
      />

      {/* Zoom Out Button */}
      <Button
        onClick={() => onZoomChange(Math.max(0.5, zoom - 0.25))}
        title="Zoom Out"
        aria-label="Zoom Out"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Zoom Level Indicator */}
      <span className="text-sm text-gray-700 dark:text-gray-300 w-16 text-center">
        {Math.round(zoom * 100)}%
      </span>

      {/* Zoom In Button */}
      <Button
        onClick={() => onZoomChange(Math.min(3, zoom + 0.25))}
        title="Zoom In"
        aria-label="Zoom In"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Divider */}
      <Separator
        orientation="vertical"
        className="h-6 bg-gray-300 dark:bg-gray-600 mx-3"
      />

      {/* Rotate Button */}
      <Button
        onClick={() => onRotationChange((rotation + 90) % 360)}
        title="Rotate"
        aria-label="Rotate"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <RotateCw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Fullscreen Button */}
      <Button
        onClick={onFullscreen}
        title="Fullscreen"
        aria-label="Fullscreen"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <Maximize2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Divider */}
      <Separator
        orientation="vertical"
        className="h-6 bg-gray-300 dark:bg-gray-600 mx-3"
      />

      {/* Settings Button */}
      <Button
        onClick={handleSettingsClick}
        title="Settings"
        aria-label="Settings"
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Settings Modal */}
      <SettingsModal
        open={isSettingsOpen}
        onClose={handleSettingsClose}
        quality={quality}
        onQualityChange={onQualityChange}
      />
    </div>
  );
};
