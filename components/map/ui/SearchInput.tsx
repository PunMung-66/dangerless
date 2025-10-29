import React from "react";
import Image from "next/image";
import IconSearch from "@/assets/logo/icon-search.svg";
import { LoadingSpinner } from "./LoadingSpinner";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Search for a location",
  loading = false,
  disabled = false,
  className = "",
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && !loading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex ${className}`}>
      <div className="flex items-center w-full rounded-lg overflow-hidden bg-background shadow-md border border-input">
        {loading ? (
          <LoadingSpinner size="sm" className="px-3" />
        ) : (
          <button
            type="submit"
            className="flex-shrink-0 px-3 hover:opacity-70 transition-opacity disabled:opacity-50"
            disabled={disabled || loading}
            aria-label="Search"
          >
            <Image
              src={IconSearch}
              alt=""
              className="inline-block w-4 h-4"
              aria-hidden="true"
            />
          </button>
        )}
        <input
          aria-label="Search place"
          className="w-full py-2.5 pr-3 text-sm focus:outline-none bg-inherit disabled:opacity-50 placeholder:text-muted-foreground"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || loading}
        />
      </div>
    </form>
  );
}
