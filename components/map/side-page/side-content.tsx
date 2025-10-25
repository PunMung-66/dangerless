import { useState } from "react";
import type { ModeKey } from "../../../types/map";
import HistoryPage from "./history-mode";
import NewsPage from "./news-mode";
import ScoutingPage from "./scouting-mode";
import SelectMode from "./select-mode";

export default function SideContent() {
  const [selectMode, setSelectMode] = useState<ModeKey>("scouting");

  return (
    <div className="">
      <SelectMode
        selectMode={selectMode}
        setSelectMode={setSelectMode}
      />
      {selectMode === "scouting" && (
        <>
          <ScoutingPage />
        </>
      )}
      {selectMode === "news" && <NewsPage />}
      {selectMode === "history" && <HistoryPage />}
    </div>
  );
}
