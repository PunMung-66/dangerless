"use client";

import React from "react";
import { useMapMode } from "@/lib/map/contexts";
import { ModeTabs } from "./ui";
import { MAP_MODES } from "@/lib/map/constants";
import type { ModeMenu } from "@/types/map";
import { ScoutingMode, NewsMode, HistoryMode, AddNewsMode } from "./modes";

const MODE_MENUS: ModeMenu[] = [
  { key: MAP_MODES.SCOUTING, label: "Scouting" },
  { key: MAP_MODES.NEWS, label: "News" },
  { key: MAP_MODES.HISTORY, label: "History" },
];

export function MapSidebar() {
  const { mode, setMode, isAddNewsMode } = useMapMode();

  if (isAddNewsMode) {
    return <AddNewsMode />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-b-foreground/10">
        <ModeTabs currentMode={mode} onChange={setMode} modes={MODE_MENUS} />
      </div>

      <div className="flex-1 overflow-auto">
        {mode === MAP_MODES.SCOUTING && <ScoutingMode />}
        {mode === MAP_MODES.NEWS && <NewsMode />}
        {mode === MAP_MODES.HISTORY && <HistoryMode />}
      </div>
    </div>
  );
}
