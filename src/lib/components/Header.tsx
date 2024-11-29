// src/components/Header.tsx
import React from "react";
import { FileUp, Download, Info } from "lucide-react";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle"; // Ensure this is correctly imported

interface HeaderProps {
  onUpload: () => void;
  onDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onUpload, onDownload }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Section: Logo and Info Tooltip */}
          <div className="flex items-center space-x-3">
            <FileUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              PDF Editor Pro
            </h1>
            {/* Info Tooltip */}
            <div className="relative group">
              <Info className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
              <div className="absolute left-0 top-8 w-64 p-3 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                  High Quality Export:
                </p>
                <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                  <li>300 DPI Resolution</li>
                  <li>24-bit Color (16.7M colors)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons and Dark Mode Toggle */}
          <div className="flex items-center space-x-3">
            {/* Upload Button */}
            <Button
              variant="default"
              onClick={onUpload}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200"
              title="Upload PDF"
            >
              <FileUp className="w-4 h-4 mr-2" />
              <span>Upload PDF</span>
            </Button>

            {/* Download Button */}
            <Button
              variant="outline"
              onClick={onDownload}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors duration-200"
              title="Download PDF"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>Download</span>
            </Button>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
