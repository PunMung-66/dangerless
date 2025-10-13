import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { GoogleAuthButton } from "./google-auth-button";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <GoogleAuthButton />;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium hidden md:inline">
          {user.email?.split("@")[0] || "User"}
        </span>
      </div>
      <LogoutButton />
    </div>
  );
}
