"use client";

import React from "react";
import { NewsMode } from "../modes/NewsMode";
import { TrayContainer, TrayHeader } from "../shared";

export function NewsTray() {
  return (
    <TrayContainer>
      <TrayHeader
        title="Safety News"
        description="Latest safety alerts and updates"
      />
      <NewsMode />
    </TrayContainer>
  );
}
