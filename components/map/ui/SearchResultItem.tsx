import React from "react";
import Image from "next/image";
import IconLOC from "@/assets/logo/icon-location.svg";

interface SearchResultItemProps {
  displayName: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SearchResultItem({
  displayName,
  isSelected,
  onClick,
}: SearchResultItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
        isSelected ? "bg-slate-100 dark:bg-slate-700" : ""
      } text-xs whitespace-normal break-words`}
    >
      <div className="flex items-start gap-2">
        <Image
          src={IconLOC}
          alt=""
          className="flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <span className="flex-1">{displayName}</span>
      </div>
    </button>
  );
}