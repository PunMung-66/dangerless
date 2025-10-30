"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface NavThemeSwitcherProps {
  isExpanded: boolean;
}

export function NavThemeSwitcher({ isExpanded }: NavThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"];
    const currentTheme = theme || "system";
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    if (nextTheme) {
      setTheme(nextTheme);
    }
  };

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

  const Icon = getIcon();

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "w-full h-10 rounded-lg hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-300 flex items-center overflow-hidden",
        isExpanded ? "gap-3 px-3 justify-start" : "justify-center"
      )}
      aria-label={`Current theme: ${getLabel()}. Click to cycle themes.`}
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
  );
}
