import Image from "next/image";
import React from "react";
import IconLOC from "../../assets/logo/icon-location.svg";

interface MapButtonProps {
  displayName: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function MapButton({
  displayName,
  isSelected,
  onClick,
}: MapButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 ${
        isSelected ? "bg-slate-100 dark:bg-slate-700" : ""
      } text-xs whitespace-normal break-words`}
    >
        <div className="flex">

      <Image
        src={IconLOC}
        alt=""
        className="inline-block  mr-2"
        aria-hidden="true"
        />
      <span className="align-middle">{displayName}</span>
        </div>
    </button>
  );
}
