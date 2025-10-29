import React from "react";

export function NewsMode() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
        Latest News
      </h3>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        <p>Stay updated with the latest safety news and alerts in your selected area.</p>
      </div>
    </div>
  );
}