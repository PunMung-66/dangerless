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
  className = "" 
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
        <div className="h-full flex flex-col shadow-lg rounded-t-lg bg-white/95 dark:bg-slate-950/95 backdrop-blur">
          {/* Mobile header with toggle button */}
          <div className="relative flex items-center justify-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={nextState}
              className="absolute h-7 -top-7 flex flex-col items-center justify-center gap-1 py-1 px-6 rounded-t-md bg-white/95 dark:bg-slate-950/95 backdrop-blur transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
              aria-label={getAriaLabel(viewState, 'mobile')}
            >
              <Image
                src={ChevronIcon}
                alt=""
                className={`w-5 h-3 transform transition-transform duration-280 ${getChevronRotation(viewState, 'mobile')}`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Mobile content */}
          <div
            className="flex-1 overflow-auto"
            style={{
              maxHeight: viewState === 2 
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
        className={`hidden lg:block absolute top-0 left-0 h-full z-10 ${className}`}
        style={{
          width: DESKTOP.EXPANDED_WIDTH,
          transform: `translateX(${viewState > 0 ? 0 : closedTranslateX}px)`,
          transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="h-full flex flex-row shadow-lg bg-white/95 dark:bg-slate-950/95 backdrop-blur">
          {/* Desktop content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 mt-16 overflow-auto border-t border-slate-200 dark:border-slate-800">
              {children}
            </div>
          </div>

          {/* Desktop toggle button */}
          <button
            type="button"
            onClick={toggleDesktop}
            className="absolute top-[45%] -right-8 h-20 w-8 flex items-center justify-center bg-white/95 dark:bg-slate-950/95 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors rounded-r-lg shadow-md"
            aria-label={getAriaLabel(viewState, 'desktop')}
          >
            <Image
              src={ChevronIcon}
              alt=""
              className={`w-4 h-3 transform transition-transform duration-280 ${getChevronRotation(viewState, 'desktop')}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}

function getAriaLabel(viewState: ViewState, platform: 'mobile' | 'desktop'): string {
  if (platform === 'mobile') {
    return viewState === 0
      ? "Expand to partial"
      : viewState === 1
      ? "Expand to full"
      : "Collapse sidebar";
  } else {
    return viewState > 0 ? "Collapse sidebar" : "Expand sidebar";
  }
}

function getChevronRotation(viewState: ViewState, platform: 'mobile' | 'desktop'): string {
  if (platform === 'mobile') {
    return viewState === 2 ? "rotate-180" : "rotate-0";
  } else {
    return viewState > 0 ? "-rotate-90" : "rotate-90";
  }
}