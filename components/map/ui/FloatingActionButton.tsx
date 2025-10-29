import React from "react";
import Image from "next/image";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: string;
  alt: string;
  className?: string;
  disabled?: boolean;
}

export function FloatingActionButton({
  onClick,
  icon,
  alt,
  className = "",
  disabled = false,
}: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={alt}
    >
      <Image
        src={icon}
        alt={alt}
        className="w-6 h-6"
      />
    </button>
  );
}