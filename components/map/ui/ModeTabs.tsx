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
          className={`px-3 py-1.5 text-sm rounded-xl transition-all duration-200 ${
            currentMode === mode.key
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10 active:bg-foreground/15"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
