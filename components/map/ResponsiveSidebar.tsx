"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChevronIcon from "@/assets/logo/chevron-icon.svg";
import { DETAIL_BAR_CONFIG } from "@/lib/map/constants";

interface ResponsiveSidebarProps {
  children: React.ReactNode;
  className?: string;
}

type ViewState = 0 | 1 | 2; // 0: collapsed, 1: partial, 2: full

export function ResponsiveSidebar({
  children,
  className = "",
}: ResponsiveSidebarProps) {
  const [viewState, setViewState] = useState<ViewState>(1);

  const nextState = () => setViewState((s) => ((s + 1) % 3) as ViewState);
  const toggleDesktop = () => setViewState((s) => (s > 0 ? 0 : 2));

  const { MOBILE, DESKTOP } = DETAIL_BAR_CONFIG;

  // Mobile calculations
  const closedTranslateY = MOBILE.FULL_HEIGHT - MOBILE.COLLAPSED_HEIGHT;
  const partialTranslateY = MOBILE.FULL_HEIGHT - MOBILE.PARTIAL_HEIGHT;

  // Desktop calculations
  const closedTranslateX = -(DESKTOP.EXPANDED_WIDTH - DESKTOP.COLLAPSED_WIDTH);

  return (
    <>
      {/* Mobile version (bottom slide-up) */}
      <div
        className={`absolute left-0 w-full z-40 lg:hidden ${className}`}
        style={{
          height: MOBILE.FULL_HEIGHT,
          bottom: 0,
          transform: `translateY(${
            viewState === 2
              ? 0
              : viewState === 1
              ? partialTranslateY
              : closedTranslateY
          }px)`,
          transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="h-full flex flex-col shadow-lg rounded-t-xl bg-background/75 backdrop-blur-xl">
          {/* Handle bar */}
          <div className="relative flex items-center justify-center px-5 border-b border-border/20">
            <button
              type="button"
              onClick={nextState}
              className="absolute h-7 -top-7 flex flex-col items-center justify-center gap-1 py-1 px-6 rounded-t-xl bg-background/75 backdrop-blur-xl transition-all duration-200 hover:bg-background/85 active:bg-background/90"
              aria-label={getAriaLabel(viewState, "mobile")}
            >
              <Image
                src={ChevronIcon}
                alt=""
                className={`w-5 h-3 transform transition-transform duration-280 opacity-80 ${getChevronRotation(
                  viewState,
                  "mobile"
                )}`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Mobile content */}
          <div
            className="flex-1 overflow-auto"
            style={{
              maxHeight:
                viewState === 2
                  ? MOBILE.FULL_HEIGHT - 56
                  : viewState === 1
                  ? MOBILE.PARTIAL_HEIGHT - 56
                  : 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Desktop version (left sidebar) */}
      <div
        className={`hidden lg:block absolute top-0 left-0 h-full z-10 ${className} `}
        style={{
          width: DESKTOP.EXPANDED_WIDTH,
          transform: `translateX(${viewState > 0 ? 0 : closedTranslateX}px)`,
          transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="h-full flex flex-row shadow-lg bg-background/75 backdrop-blur-xl">
          {/* Desktop content */}
          <div className="flex-1 flex flex-col overflow-hidden pt-2">
            <div className="flex-1 mt-16 overflow-auto border-t border-border/20">
              {children}
            </div>
          </div>

          {/* Desktop toggle button */}
          <button
            type="button"
            onClick={toggleDesktop}
            className="absolute top-[45%] -right-8 h-20 w-8 flex items-center justify-center bg-background/75 backdrop-blur-xl hover:bg-background/85 active:bg-background/90 transition-all duration-200 rounded-r-xl shadow-lg"
            aria-label={getAriaLabel(viewState, "desktop")}
          >
            <Image
              src={ChevronIcon}
              alt=""
              className={`w-4 h-3 transform transition-transform duration-280 opacity-80 ${getChevronRotation(
                viewState,
                "desktop"
              )}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}

function getAriaLabel(
  viewState: ViewState,
  platform: "mobile" | "desktop"
): string {
  if (platform === "mobile") {
    return viewState === 0
      ? "Expand to partial"
      : viewState === 1
      ? "Expand to full"
      : "Collapse sidebar";
  } else {
    return viewState > 0 ? "Collapse sidebar" : "Expand sidebar";
  }
}

function getChevronRotation(
  viewState: ViewState,
  platform: "mobile" | "desktop"
): string {
  if (platform === "mobile") {
    return viewState === 2 ? "rotate-180" : "rotate-0";
  } else {
    return viewState > 0 ? "-rotate-90" : "rotate-90";
  }
}
