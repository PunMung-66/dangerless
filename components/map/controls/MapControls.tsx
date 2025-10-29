"use client";

import React from "react";
import { Plus, Minus, Compass, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetNorth?: () => void;
  onGeolocate?: () => void;
  className?: string;
  isGeolocating?: boolean;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onResetNorth,
  onGeolocate,
  className,
  isGeolocating = false,
}: MapControlsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Compass and Location Controls Group */}
      <div className="flex flex-col bg-background/75 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden">
        {/* Compass Control */}
        {onResetNorth && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onResetNorth}
            className="h-10 w-10 rounded-none hover:bg-foreground/10 active:bg-foreground/15 border-b border-border/20 transition-all duration-200"
            aria-label="Reset north"
            type="button"
          >
            <Compass className="h-5 w-5 text-foreground/80" strokeWidth={2} />
          </Button>
        )}

        {/* Geolocation Control */}
        {onGeolocate && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onGeolocate}
            className={cn(
              "h-10 w-10 rounded-none hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-200",
              isGeolocating &&
                "bg-primary/90 text-primary-foreground hover:bg-primary active:bg-primary/80"
            )}
            aria-label="Get current location"
            type="button"
            disabled={isGeolocating}
          >
            <Navigation
              className={cn(
                "h-5 w-5 text-foreground/80",
                isGeolocating && "text-primary-foreground animate-pulse"
              )}
              strokeWidth={2}
            />
          </Button>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="hidden md:flex flex-col bg-background/75 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="h-10 w-10 rounded-none hover:bg-foreground/10 active:bg-foreground/15 border-b border-border/20 transition-all duration-200"
          aria-label="Zoom in"
          type="button"
        >
          <Plus className="h-5 w-5 text-foreground/80" strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="h-10 w-10 rounded-none hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-200"
          aria-label="Zoom out"
          type="button"
        >
          <Minus className="h-5 w-5 text-foreground/80" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
