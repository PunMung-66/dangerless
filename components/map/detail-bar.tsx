"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChevronIcon from "../../assets/logo/chevron-icon.svg";

type DetailBarProps = {
  initialOpen?: boolean;
  collapsedHeight?: number; // px visible when collapsed (mobile)
  expandedHeight?: number; // px total height when expanded (mobile)
  collapsedWidth?: number; // px visible when collapsed (desktop sidebar)
  expandedWidth?: number; // px total width when expanded (desktop sidebar)
  title?: string;
  searchBar?: React.ReactNode; // Search bar component to embed
  children?: React.ReactNode;
};

export default function DetailBar({
  initialOpen = false,
  collapsedHeight = 300,
  expandedHeight = 700,
  collapsedWidth = 0,
  expandedWidth = 400,
  children,
}: DetailBarProps) {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      // cleanup (nothing for now)
    };
  }, []);

  const toggleOpen = () => setOpen((v) => !v);

  // Mobile: translateY distance when closed
  const closedTranslateY = expandedHeight - collapsedHeight;
  // Desktop: translateX distance when closed (slide from left)
  const closedTranslateX = -(expandedWidth - collapsedWidth);

  return (
    <>
      {/* Mobile version (bottom slide-up) - visible only on screens < lg */}
      <div
        ref={containerRef}
        aria-expanded={open}
        className="absolute left-0 w-full z-40 lg:hidden"
        style={{
          height: expandedHeight,
          bottom: 0,
          transform: `translateY(${open ? 0 : closedTranslateY}px)`,
          transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="h-full flex flex-col shadow-lg rounded-t-lg bg-white/80 dark:bg-slate-950/95 backdrop-blur">
          {/* Mobile header with centered button */}
          <div className="relative flex items-center justify-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={toggleOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleOpen();
              }}
              className="absolute h-7 -top-7 flex flex-col items-center justify-center gap-1 py-1 px-6 rounded-t-md bg-white dark:bg-slate-950/95 backdrop-blur transition-colors"
              aria-label={open ? "Collapse details" : "Expand details"}
            >
              <Image
                src={ChevronIcon}
                alt=""
                className={`w-5 h-3 text-slate-700 dark:text-slate-200 transform ${
                  open ? "rotate-180" : "rotate-0"
                } transition-transform duration-280`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Mobile content area */}
          <div
            className="px-4 py-3 overflow-auto"
            style={{
              maxHeight: expandedHeight - 56,
            }}
          >
            {children ?? (
              <div className="text-sm text-slate-700 dark:text-slate-200">
                No details provided.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop version (left sidebar) - visible only on screens >= lg */}
      <div
        aria-expanded={open}
        className="hidden lg:block absolute top-0 left-0 h-full z-10"
        style={{
          width: expandedWidth,
          transform: `translateX(${open ? 0 : closedTranslateX}px)`,
          transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="h-full flex flex-row shadow-lg bg-white/80 dark:bg-slate-950/95 backdrop-blur">
          {/* Sidebar content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sidebar header */}
            <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Place Details
              </h2>
            </div>

            {/* Sidebar content area */}
            <div className="flex-1 px-4 py-3 overflow-auto">
              {children ?? (
                <div className="text-sm text-slate-700 dark:text-slate-200">
                  No details provided.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar toggle button (right edge) */}
          <button
            type="button"
            onClick={toggleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleOpen();
            }}
            className=" absolute top-[45%] -right-8  h-20 w-8 flex items-center justify-center bg-white/95 dark:bg-slate-950/95 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors rounded-r-lg"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Image
              src={ChevronIcon}
              alt=""
              className={`w-4 h-3 text-slate-700 dark:text-slate-200 transform ${
                open ? "-rotate-90" : "rotate-90"
              } transition-transform duration-280`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}
