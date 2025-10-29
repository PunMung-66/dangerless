import React from "react";

export function ScoutingMode() {
  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Location Details
      </h3>
      <div className="text-sm text-muted-foreground">
        <p>Select a location from the search results to view detailed information about the area, including safety reports and community insights.</p>
      </div>
    </div>
  );
}