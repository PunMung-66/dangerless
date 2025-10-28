"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChevronIcon from "../../assets/logo/chevron-icon.svg";
import SideContent from "./side-page/side-content";

type DetailBarProps = {
  // initial state: 0 = collapsed, 1 = expanded (partial), 2 = expanded (full)
  initialState?: 0 | 1 | 2;
  initialOpen?: boolean; // backward-compatible: true -> initialState 2
  collapsedHeight?: number; // px visible when collapsed (mobile)
  expandedHeight1?: number; // px total height for first expanded state (mobile)
  expandedHeight2?: number; // px total height for second (full) expanded state (mobile)
  collapsedWidth?: number; // px visible when collapsed (desktop sidebar)
  expandedWidth?: number; // px total width when expanded (desktop sidebar)
  title?: string;
  searchBar?: React.ReactNode; // Search bar component to embed
  children?: React.ReactNode;
};

export default function DetailBar({
  initialState,
  initialOpen = false,
  collapsedHeight = 0,
  expandedHeight1 = 300,
  expandedHeight2 = 500,
  collapsedWidth = 0,
  expandedWidth = 400,
  children,
}: DetailBarProps) {
  // viewState: 0 collapsed, 1 partial expanded, 2 full expanded
  const initial =
    typeof initialState === "number" ? initialState : initialOpen ? 2 : 0;
  const [viewState, setViewState] = useState<0 | 1 | 2>(initial as 0 | 1 | 2);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      // cleanup (nothing for now)
    };
  }, []);

  // Cycle to next mobile state: 0 -> 1 -> 2 -> 0
  const nextState = () => setViewState((s) => ((s + 1) % 3) as 0 | 1 | 2);

  // Mobile: We use expandedHeight2 as the container height (max). Calculate translateY for each state.
  const closedTranslateY = expandedHeight2 - collapsedHeight; // fully closed
  const partialTranslateY = expandedHeight2 - expandedHeight1; // partially open
  // Desktop: translateX distance when closed (slide from left)
  const closedTranslateX = -(expandedWidth - collapsedWidth);

  return (
    <>
      {/* Mobile version (bottom slide-up) - visible only on screens < lg */}
      <div
        ref={containerRef}
        aria-expanded={viewState > 0}
        className="absolute left-0 w-full z-40 lg:hidden"
        style={{
          // container is sized to the largest expanded height
          height: expandedHeight2,
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
        <div className="h-full flex flex-col shadow-lg rounded-t-lg bg-white/80 dark:bg-slate-950/95 backdrop-blur">
          {/* Mobile header with centered button */}
          <div className="relative flex items-center justify-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={nextState}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") nextState();
              }}
              className="absolute h-7 -top-7 flex flex-col items-center justify-center gap-1 py-1 px-6 rounded-t-md bg-white dark:bg-slate-950/95 backdrop-blur transition-colors"
              aria-label={
                viewState === 0
                  ? "Expand to partial"
                  : viewState === 1
                  ? "Expand to full"
                  : "Collapse details"
              }
            >
              <Image
                src={ChevronIcon}
                alt=""
                className={`w-5 h-3 text-slate-700 dark:text-slate-200 transform ${
                  viewState === 2
                    ? "rotate-180"
                    : viewState === 1
                    ? "rotate-0"
                    : "rotate-0"
                } transition-transform duration-280`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Mobile content area */}
          <div
            className="px-4 py-3 overflow-auto"
            style={{
              maxHeight:
                viewState === 2
                  ? expandedHeight2 - 56
                  : viewState === 1
                  ? expandedHeight1 - 56
                  : 0,
            }}
          >
            {children ?? (
              <div className="text-sm text-slate-700 dark:text-slate-200">
                <SideContent />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop version (left sidebar) - visible only on screens >= lg */}
      <div
        aria-expanded={viewState > 0}
        className="hidden lg:block absolute top-0 left-0 h-full z-10"
        style={{
          width: expandedWidth,
          transform: `translateX(${viewState > 0 ? 0 : closedTranslateX}px)`,
          transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="h-full flex flex-row shadow-lg bg-white/80 dark:bg-slate-950/95 backdrop-blur">
          {/* Sidebar content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sidebar header */}
            {/* <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Place Details
              </h2>
            </div> */}

            {/* Sidebar content area */}
            <div className="flex-1 px-4 py-3 mt-16 overflow-auto border-t border-slate-200 dark:border-slate-800">
              {children ?? (
                <div className="text-sm text-slate-700 dark:text-slate-200">
                  <SideContent />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar toggle button (right edge) */}
          <button
            type="button"
            onClick={() => setViewState((s) => (s > 0 ? 0 : 2))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setViewState((s) => (s > 0 ? 0 : 2));
            }}
            className=" absolute top-[45%] -right-8  h-20 w-8 flex items-center justify-center bg-white/95 dark:bg-slate-950/95 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors rounded-r-lg"
            aria-label={viewState > 0 ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Image
              src={ChevronIcon}
              alt=""
              className={`w-4 h-3 text-slate-700 dark:text-slate-200 transform ${
                viewState > 0 ? "-rotate-90" : "rotate-90"
              } transition-transform duration-280`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}
