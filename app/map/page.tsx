"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapProvider, useMapMode } from "@/lib/map/contexts";
import { MapSearchBar } from "@/components/map/MapSearchBar";
import { ResponsiveSidebar } from "@/components/map/ResponsiveSidebar";
import { MapSidebar } from "@/components/map/MapSidebar";
import { FloatingActionButton } from "@/components/map/ui";
import IconPEN from "@/assets/logo/icon-pen.svg";

// Dynamically import map to avoid SSR issues
const MapCanvas = dynamic(
  () =>
    import("@/components/map/MapCanvas").then((mod) => ({
      default: mod.MapCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
        <span className="text-muted-foreground">Loading map...</span>
      </div>
    ),
  }
);

function MapPageContent() {
  const { isSearchMode, toggleAddNews } = useMapMode();

  return (
    <div className="relative w-full h-screen">
      {/* Search bar */}
      <MapSearchBar className="absolute z-20 px-5 py-4 sm:px-5 transition-transform duration-300" />

      {/* Detail sidebar - only show when not in search mode */}
      {!isSearchMode && (
        <ResponsiveSidebar>
          <MapSidebar />
        </ResponsiveSidebar>
      )}

      {/* Map canvas */}
      <MapCanvas />

      {/* Floating action button */}
      <FloatingActionButton
        onClick={toggleAddNews}
        icon={IconPEN}
        alt="Add News"
        className="absolute bottom-12 right-1 sm:right-3 z-30"
      />
    </div>
  );
}

export default function MapPage() {
  return (
    <MapProvider>
      <MapPageContent />
    </MapProvider>
  );
}
