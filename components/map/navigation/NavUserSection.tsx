import { LogIn, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { UserData } from "@/types/navigation";

interface NavUserSectionProps {
  user?: UserData | null;
  onSignIn?: () => void;
  onProfileClick?: () => void;
  isExpanded: boolean;
}

export function NavUserSection({
  user,
  onSignIn,
  onProfileClick,
  isExpanded,
}: NavUserSectionProps) {
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
    <button
      onClick={onProfileClick}
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
  );
}
