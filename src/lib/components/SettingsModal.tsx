// src/components/SettingsModal.tsx
import React from "react";
import { PDFQualityOptions } from "../../utils/pdfUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogOverlay,
} from "./ui/dialog"; // Ensure DialogOverlay is imported
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  quality: PDFQualityOptions;
  onQualityChange: (quality: PDFQualityOptions) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  quality,
  onQualityChange,
}) => {
  const handleDpiChange = (value: string) => {
    onQualityChange({ ...quality, dpi: Number(value) });
  };

  const handleColorDepthChange = (value: string) => {
    onQualityChange({ ...quality, colorDepth: Number(value) });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      {/* Overlay */}
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Content */}
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-md w-full p-6 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Export Settings
          </DialogTitle>
          {/* Single Close Button */}
          <DialogClose />
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Optionally handle form submission here
            onClose(); // Close the modal after saving
          }}
        >
          <div className="space-y-6 mt-4">
            {/* Resolution (DPI) */}
            <div>
              <label
                htmlFor="dpi"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Resolution (DPI)
              </label>
              <Select
                onValueChange={handleDpiChange}
                value={quality.dpi.toString()}
              >
                <SelectTrigger id="dpi" className="w-full">
                  <SelectValue placeholder="Select DPI" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                  <SelectItem value="200">200 DPI</SelectItem>
                  <SelectItem value="300">300 DPI (Recommended)</SelectItem>
                  <SelectItem value="600">600 DPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color Depth */}
            <div>
              <label
                htmlFor="colorDepth"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Color Depth
              </label>
              <Select
                onValueChange={handleColorDepthChange}
                value={quality.colorDepth.toString()}
              >
                <SelectTrigger id="colorDepth" className="w-full">
                  <SelectValue placeholder="Select Color Depth" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                  <SelectItem value="24">24-bit (16.7M colors)</SelectItem>
                  <SelectItem value="32">
                    32-bit (1B+ colors with alpha)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Save Settings
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
