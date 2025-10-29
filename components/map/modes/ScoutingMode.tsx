import React from "react";

export function ScoutingMode() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
        Location Details
      </h3>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        <p>Select a location from the search results to view detailed information about the area, including safety reports and community insights.</p>
      </div>
    </div>
  );
}