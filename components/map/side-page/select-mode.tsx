import React from "react";
import type { ModeMenu, ModeKey } from "../../../types/map";

const ModeMenus: ModeMenu[] = [
  { key: "scouting", label: "Scouting" },
  { key: "news", label: "News" },
  { key: "history", label: "History" },
];

export default function SelectMode({
  selectMode,
  setSelectMode,
}: {
  selectMode: ModeKey;
  setSelectMode: React.Dispatch<React.SetStateAction<ModeKey>>;
}) {
  return (
    <div className="flex space-x-4 mb-4">
      {ModeMenus.map((menu) => (
        <button
          key={menu.key}
          onClick={() => setSelectMode(menu.key)}
          className={`px-4 py-2 rounded ${
            selectMode === menu.key
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {menu.label}
        </button>
      ))}
    </div>
  );
}
