"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // On success, redirect to home or protected page
      window.location.href = "/";
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error)?.message || "Failed to sign in");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full">
      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="my-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">or</span>
      </div>

      <div className="flex flex-col gap-3">
        <GoogleAuthButton />
        <div className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
