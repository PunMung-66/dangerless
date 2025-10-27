import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // When not authenticated, link to the dedicated login page where
    // Google and email/password sign-in are available.
    return (
      <Link href="/auth/login">
        <Button variant="default" size="sm">
          Sign in
        </Button>
      </Link>
    );
  }

  // Get Google profile data from user metadata
  const profileImage = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  const displayName = fullName || user.email?.split("@")[0] || "User";

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {profileImage ? (
          <Image
            src={profileImage}
            alt={displayName}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        )}
        <span className="text-sm font-medium hidden md:inline">
          {displayName}
        </span>
      </div>
      <LogoutButton />
    </div>
  );
}
