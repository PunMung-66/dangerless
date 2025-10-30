"use client";

import React from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TrayContainer, TrayHeader } from "../shared";

export function ThemeTray() {
  return (
    <TrayContainer>
      <TrayHeader title="Theme" description="Choose your preferred theme" />
      <div className="flex items-center justify-between p-3 rounded-xl bg-background/75 backdrop-blur-xl border border-border/20">
        <span className="text-sm font-medium text-foreground/80">
          Appearance
        </span>
        <ThemeSwitcher />
      </div>
    </TrayContainer>
  );
}
