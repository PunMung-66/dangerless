import React from "react";

export function AddNewsMode() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
        Report Safety Issue
      </h3>
      <div className="space-y-4">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <p>Help your community by reporting safety concerns or sharing important safety information.</p>
        </div>
        
        {/* Placeholder for form */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Report form will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}