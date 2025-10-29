import React from "react";

export function AddNewsMode() {
  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">Report Safety Issue</h3>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>
            Help your community by reporting safety concerns or sharing
            important safety information.
          </p>
        </div>

        {/* Placeholder for form */}
        <div className="bg-foreground/5 p-5 rounded-xl">
          <p className="text-sm text-muted-foreground">
            Report form will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
