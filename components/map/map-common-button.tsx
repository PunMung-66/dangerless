import Image from 'next/image';
import React from 'react'

export default function MapCommonButton(
  { onClick ,
    className,
    icon,
    alt,
  }: { onClick: () => void, className: string, icon: string, alt: string }
) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center p-3 bg-slate-950 text-white rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <Image
        src={icon}
        alt={alt}
        className="w-6 h-6"
      />
    </button>
  )
}
