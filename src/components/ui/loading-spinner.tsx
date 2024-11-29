// src/components/ui/loading-spinner.tsx
import React from "react";
import { cn } from "@/lib/utils";

export const LoadingSpinner: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn(
      "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400",
      className
    )}
  />
);
