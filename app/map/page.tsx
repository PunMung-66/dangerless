"use client";

import dynamic from "next/dynamic";
import React from "react";
import MainSearchbar from "../../components/map/main-searchbar";
const MapComponent = dynamic(() => import("../../components/map/map"), {
  ssr: false,
});
import { MapProvider } from "../../contexts/mapcontext";

export default function MapPage() {
  return (
    <MapProvider>
      <div className="relative w-full h-screen">
        <h1 className="sr-only">Map (MapLibre + Nominatim)</h1>
        <MainSearchbar />
        <MapComponent />
      </div>
    </MapProvider>
  );
}
