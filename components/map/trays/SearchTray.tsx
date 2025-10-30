"use client";

import React from "react";
import { MapSearchBar } from "../MapSearchBar";
import { TrayContainer, TrayHeader } from "../shared";

export function SearchTray() {
  return (
    <TrayContainer>
      <TrayHeader
        title="Find Location"
        description="Search for places, addresses, or coordinates"
      />
      <MapSearchBar className="w-full" />
    </TrayContainer>
  );
}
