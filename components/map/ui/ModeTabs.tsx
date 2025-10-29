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
  className = "",
}: ModeTabsProps) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => onChange(mode.key)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            currentMode === mode.key
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
