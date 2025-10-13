"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
      if (error) throw error;
      // Don't set loading to false here as the user will be redirected
    } catch (error: unknown) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      size="sm"
      disabled={isLoading}
      className="min-w-[140px]"
    >
      {isLoading ? "Redirecting..." : "Sign In with Google"}
    </Button>
  );
}
