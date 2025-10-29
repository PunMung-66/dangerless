"use client";

import React, { useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  useMapInstance,
  useMapMarkers,
  useMapHighlights,
  useMapSelection,
  useMapControls,
  useUserLocation,
} from "@/lib/map/hooks";
import { MapControls, LayerSelector } from "./controls";
import { useMapView } from "@/lib/map/contexts";

export function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { map, isReady } = useMapInstance(containerRef);
  const { selectedLocation, userLocation } = useMapView();
  const {
    handleZoomIn,
    handleZoomOut,
    handleResetNorth,
    handleGeolocate,
    isGeolocating,
  } = useMapControls(map);

  useMapMarkers(map, selectedLocation || null);
  useMapHighlights(map, selectedLocation || null);
  useUserLocation(map, userLocation);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full"
        role="application"
        aria-label="Interactive map"
      />

      {/* Custom Map Controls - show when map is ready */}
      {isReady && (
        <div className="absolute top-4 right-4 z-[1000] pointer-events-auto flex flex-col gap-2">
          <LayerSelector />
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetNorth={handleResetNorth}
            onGeolocate={handleGeolocate}
            isGeolocating={isGeolocating}
          />
        </div>
      )}
    </div>
  );
}
