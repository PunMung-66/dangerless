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
      <div className="flex flex-col bg-card/95 backdrop-blur-sm rounded-lg border shadow-md overflow-hidden">
        {/* Compass Control */}
        {onResetNorth && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onResetNorth}
            className="h-9 w-9 rounded-none hover:bg-accent border-b transition-colors"
            aria-label="Reset north"
            type="button"
          >
            <Compass className="h-4 w-4 text-foreground" strokeWidth={2} />
          </Button>
        )}

        {/* Geolocation Control */}
        {onGeolocate && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onGeolocate}
            className={cn(
              "h-9 w-9 rounded-none hover:bg-accent transition-colors",
              isGeolocating &&
                "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            aria-label="Get current location"
            type="button"
            disabled={isGeolocating}
          >
            <Navigation
              className={cn(
                "h-4 w-4 text-foreground",
                isGeolocating && "text-primary-foreground animate-pulse"
              )}
              strokeWidth={2}
            />
          </Button>
        )}
      </div>

      <div className="hidden md:flex flex-col bg-card/95 backdrop-blur-sm rounded-lg border shadow-md overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="h-9 w-9 rounded-none hover:bg-accent border-b transition-colors"
          aria-label="Zoom in"
          type="button"
        >
          <Plus className="h-4 w-4 text-foreground" strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="h-9 w-9 rounded-none hover:bg-accent transition-colors"
          aria-label="Zoom out"
          type="button"
        >
          <Minus className="h-4 w-4 text-foreground" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
