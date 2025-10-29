import { useMapStage } from "@/contexts/mapcontext";
import AddNewPage from "./addnews-mode";
import HistoryPage from "./history-mode";
import NewsPage from "./news-mode";
import ScoutingPage from "./scouting-mode";
import SelectMode from "./select-mode";

export default function SideContent() {
  const { stage, setStage } = useMapStage();

  return (
    <div className="">
      {stage === "addnew" ? (
        <AddNewPage />
      ) : (
        <>
          <SelectMode selectMode={stage} setSelectMode={setStage} />
          {stage === "scouting" && <ScoutingPage />}
          {stage === "news" && <NewsPage />}
          {stage === "history" && <HistoryPage />}
        </>
      )}
    </div>
  );
}
