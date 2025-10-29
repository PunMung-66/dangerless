"use client";

import React from "react";
import { MapDataProvider } from "./MapDataContext";
import { MapModeProvider } from "./MapModeContext";
import { MapViewProvider } from "./MapViewContext";
import { MapLayerProvider } from "./MapLayerContext";

interface MapProviderProps {
  children: React.ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  return (
    <MapDataProvider>
      <MapViewProvider>
        <MapLayerProvider>
          <MapModeProvider>{children}</MapModeProvider>
        </MapLayerProvider>
      </MapViewProvider>
    </MapDataProvider>
  );
}

// Re-export all the hooks for easier imports
export { useMapData } from "./MapDataContext";
export { useMapMode } from "./MapModeContext";
export { useMapView } from "./MapViewContext";
export { useMapLayer } from "./MapLayerContext";
