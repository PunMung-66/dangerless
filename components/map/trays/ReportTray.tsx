"use client";

import React from "react";
import { AddNewsMode } from "../modes/AddNewsMode";
import { TrayContainer, TrayHeader } from "../shared";

export function ReportTray() {
  return (
    <TrayContainer>
      <TrayHeader
        title="Report Issue"
        description="Share safety concerns with the community"
      />
      <AddNewsMode />
    </TrayContainer>
  );
}
