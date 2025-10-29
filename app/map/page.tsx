"use client";

import dynamic from "next/dynamic";
import React from "react";
import DetailBar from "@/components/map/detail-bar";
import MapCommonButton from "@/components/map/map-common-button";
import IconPEN from '../../assets/logo/icon-pen.svg';
import MainSearchbar from "../../components/map/main-searchbar";
const MapComponent = dynamic(() => import("../../components/map/map"), {
  ssr: false,
});
import { useMapStage } from "../../contexts/mapcontext";

export default function MapPage() {
  const { stage, setStage } = useMapStage();
  return (
    <>
      <div>
        <MainSearchbar />
        {(stage !== "search") && <DetailBar />}
      </div>
      <div className="relative w-full h-screen">
        <MapComponent />
        <MapCommonButton
          onClick={() => setStage(stage === "addnew" ? "search" : "addnew")}
          className="absolute bottom-12 right-1 sm:right-3"
          icon={IconPEN}
          alt="Add News Icon"
        />
      </div>
    </>
  );
}
