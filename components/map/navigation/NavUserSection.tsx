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
          "w-full h-10 rounded-lg hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-200 flex items-center",
          isExpanded ? "gap-3 px-3 justify-start" : "justify-center"
        )}
        aria-label="Sign in to your account"
      >
        <LogIn
          className="w-5 h-5 shrink-0 text-foreground/80"
          aria-hidden="true"
        />
        {isExpanded && (
          <span className="text-sm text-foreground/80 whitespace-nowrap">
            Sign In
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onProfileClick}
      className={cn(
        "w-full h-10 rounded-lg hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-200 flex items-center",
        isExpanded ? "gap-3 px-3 justify-start" : "justify-center"
      )}
      aria-label={`View profile for ${user.name}`}
    >
      {user.image ? (
        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
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
        <User
          className="w-5 h-5 shrink-0 text-foreground/80"
          aria-hidden="true"
        />
      )}
      {isExpanded && (
        <span className="text-sm text-foreground/80 whitespace-nowrap">
          {user.name}
        </span>
      )}
    </button>
  );
}
