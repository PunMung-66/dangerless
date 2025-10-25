"use client";

import dynamic from "next/dynamic";
import React from "react";
import DetailBar from "@/components/map/detail-bar";
import MainSearchbar from "../../components/map/main-searchbar";
const MapComponent = dynamic(() => import("../../components/map/map"), {
  ssr: false,
});
import { useDataMap } from "../../contexts/mapcontext";

export default function MapPage() {
  const { selectedIndex } = useDataMap();
  return (
    <>
      <div>
        <MainSearchbar />
        {selectedIndex !== null && <DetailBar />}
      </div>
      <div className="relative w-full h-screen">
        <MapComponent />
      </div>
    </>
  );
}
