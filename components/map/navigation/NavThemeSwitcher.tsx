"use client";

import { useEffect, useState, useRef } from "react";
import { Laptop, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Z_INDEX } from "@/lib/constants/navigation";

interface NavThemeSwitcherProps {
  isExpanded: boolean;
}

export function NavThemeSwitcher({ isExpanded }: NavThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

  if (!mounted) {
    return null;
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      default:
        return Laptop;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light Theme";
      case "dark":
        return "Dark Theme";
      default:
        return "System Theme";
    }
  };

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Laptop },
  ];

  const Icon = getIcon();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={cn(
          "w-full h-10 rounded-lg hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 flex items-center overflow-hidden",
          isExpanded ? "gap-3 px-3 justify-start" : "justify-center"
        )}
        aria-label={`Current theme: ${getLabel()}. Click to change theme.`}
      >
        <div className="shrink-0">
          <Icon className="w-5 h-5 text-foreground/80" aria-hidden="true" />
        </div>
        <span
          className={cn(
            "text-sm text-foreground/80 whitespace-nowrap transition-all duration-300",
            isExpanded
              ? "opacity-100 max-w-xs"
              : "opacity-0 max-w-0 overflow-hidden"
          )}
        >
          {getLabel()}
        </span>
      </button>

      {showMenu && (
        <div
          className="absolute left-full ml-4 top-0 bg-background/95 backdrop-blur-xl border border-border/20 rounded-lg shadow-lg overflow-hidden w-40"
          style={{ zIndex: Z_INDEX.TOOLTIP }}
        >
          {themes.map(({ id, label, icon: ThemeIcon }) => (
            <button
              key={id}
              onClick={() => {
                setTheme(id);
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 flex items-center gap-2 hover:bg-foreground/10 active:bg-foreground/15 transition-colors text-left"
            >
              <ThemeIcon
                className="w-4 h-4 text-foreground/80"
                aria-hidden="true"
              />
              <span className="text-sm text-foreground/80 flex-1">{label}</span>
              {theme === id && (
                <Check
                  className="w-4 h-4 text-foreground/80"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
