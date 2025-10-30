"use client";

import { useState, useRef, useEffect } from "react";
import { LogIn, User, LogOut } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Z_INDEX } from "@/lib/constants/navigation";
import type { UserData } from "@/types/navigation";

interface NavUserSectionProps {
  user?: UserData | null;
  onSignIn?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  isExpanded: boolean;
}

export function NavUserSection({
  user,
  onSignIn,
  onProfileClick,
  onLogout,
  isExpanded,
}: NavUserSectionProps) {
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    if (showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLogout]);
  if (!user) {
    return (
      <button
        onClick={onSignIn}
        className={cn(
          "w-full h-10 rounded-lg hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 flex items-center overflow-hidden",
          isExpanded ? "gap-3 px-3 justify-start" : "justify-center"
        )}
        aria-label="Sign in to your account"
      >
        <div className="shrink-0">
          <LogIn className="w-5 h-5 text-foreground/80" aria-hidden="true" />
        </div>
        <span
          className={cn(
            "text-sm text-foreground/80 whitespace-nowrap transition-all duration-300",
            isExpanded
              ? "opacity-100 max-w-xs"
              : "opacity-0 max-w-0 overflow-hidden"
          )}
        >
          Sign In
        </span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setShowLogout(!showLogout);
          onProfileClick?.();
        }}
        className={cn(
          "w-full h-10 rounded-lg hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 flex items-center overflow-hidden",
          isExpanded ? "gap-3 px-3 justify-start" : "justify-center"
        )}
        aria-label={`View profile for ${user.name}`}
      >
        <div className="shrink-0">
          {user.image ? (
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={user.image}
                alt=""
                width={24}
                height={24}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <User className="w-5 h-5 text-foreground/80" aria-hidden="true" />
          )}
        </div>
        <span
          className={cn(
            "text-sm text-foreground/80 whitespace-nowrap transition-all duration-300",
            isExpanded
              ? "opacity-100 max-w-xs"
              : "opacity-0 max-w-0 overflow-hidden"
          )}
        >
          {user.name}
        </span>
      </button>

      {showLogout && (
        <div
          className={cn(
            "absolute left-full ml-4 top-0 bg-background/95 backdrop-blur-xl border border-border/20 rounded-lg shadow-lg overflow-hidden w-48"
          )}
          style={{ zIndex: Z_INDEX.TOOLTIP }}
        >
          <button
            onClick={() => {
              setShowLogout(false);
              onLogout?.();
            }}
            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-foreground/10 active:bg-foreground/15 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-foreground/80" aria-hidden="true" />
            <span className="text-sm text-foreground/80">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
