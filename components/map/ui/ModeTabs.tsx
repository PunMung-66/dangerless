import React from "react";
import type { MapMode, ModeMenu } from "@/types/map";

interface ModeTabsProps {
  currentMode: MapMode;
  onChange: (mode: MapMode) => void;
  modes: ModeMenu[];
  className?: string;
}

export function ModeTabs({ 
  currentMode, 
  onChange, 
  modes, 
  className = "" 
}: ModeTabsProps) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => onChange(mode.key)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            currentMode === mode.key
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}