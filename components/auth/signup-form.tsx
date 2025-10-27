"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Enforce strong password policy on the client before calling Supabase
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!strongPassword.test(password)) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number and a special character."
      );
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
      if (error) throw error;
      setMessage("Check your email for a confirmation link (if required).");
      // Optionally redirect or keep on the page
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error)?.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const checkPassword = (pwd: string) => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    setPasswordValid(strongPassword.test(pwd));
  };

  const hasMin = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

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
          onChange={(e) => {
            setPassword(e.target.value);
            checkPassword(e.target.value);
          }}
          required
        />

        <div className="text-sm text-muted-foreground mt-1">
          <ul className="list-inside list-disc">
            <li className={hasMin ? "text-green-600" : "text-muted-foreground"}>
              At least 8 characters
            </li>
            <li
              className={hasUpper ? "text-green-600" : "text-muted-foreground"}
            >
              One uppercase letter
            </li>
            <li
              className={hasLower ? "text-green-600" : "text-muted-foreground"}
            >
              One lowercase letter
            </li>
            <li
              className={hasNumber ? "text-green-600" : "text-muted-foreground"}
            >
              One number
            </li>
            <li
              className={
                hasSpecial ? "text-green-600" : "text-muted-foreground"
              }
            >
              One special character
            </li>
          </ul>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        {message && <div className="text-sm text-green-600">{message}</div>}

        <Button
          type="submit"
          disabled={isLoading || !passwordValid}
          className="w-full"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="my-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">or</span>
      </div>

      <div className="flex flex-col gap-3">
        <GoogleAuthButton />
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
