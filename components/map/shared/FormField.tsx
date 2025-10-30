import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
  rows?: number;
  className?: string;
}

export function FormField({
  id,
  label,
  placeholder,
  type = "text",
  rows = 3,
  className,
}: FormFieldProps) {
  const baseInputClass =
    "rounded-xl border-border/20 bg-background/50 focus:bg-background/75 transition-colors";

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-xs font-medium text-foreground/80">
        {label}
      </Label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            "w-full px-3 py-2 focus:border-border/40 focus:outline-none focus:ring-1 focus:ring-ring/20 resize-none text-sm",
            baseInputClass
          )}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn("h-10", baseInputClass)}
        />
      )}
    </div>
  );
}
