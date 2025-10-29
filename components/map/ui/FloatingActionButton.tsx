import React from "react";
import { Pen } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
  alt: string;
  className?: string;
  disabled?: boolean;
}

export function FloatingActionButton({
  onClick,
  alt,
  className = "",
  disabled = false,
}: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center w-12 h-12 bg-background/75 backdrop-blur-xl rounded-xl shadow-lg transition-all duration-200 ease-in-out hover:bg-foreground/10 hover:shadow-xl hover:scale-105 active:bg-foreground/15 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={alt}
    >
      <Pen className="h-6 w-6 text-foreground/80" strokeWidth={2} />
    </button>
  );
}
