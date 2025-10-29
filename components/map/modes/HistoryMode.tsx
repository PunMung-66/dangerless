import React from "react";

export function HistoryMode() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
        Safety History
      </h3>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        <p>View historical safety data and trends for the selected location to better understand patterns and risks.</p>
      </div>
    </div>
  );
}