"use client";

import React, { useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapInstance, useMapMarkers, useMapHighlights, useMapSelection } from "@/lib/map/hooks";

export function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { map } = useMapInstance(containerRef);
  const { selectedLocation } = useMapSelection();
  
  useMapMarkers(map, selectedLocation || null);
  useMapHighlights(map, selectedLocation || null);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      role="application"
      aria-label="Interactive map"
    />
  );
}