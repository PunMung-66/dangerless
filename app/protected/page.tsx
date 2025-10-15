import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  const profileImage = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  const firstName =
    fullName?.split(" ")[0] || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <div className="w-full text-center space-y-8 p-8">
        <div className="space-y-6">
          {profileImage && (
            <Image
              src={profileImage}
              alt={fullName || "User"}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full mx-auto"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="space-y-3">
            <h1 className="text-5xl font-bold w-full">Welcome, {firstName}!</h1>
            <p className="text-muted-foreground text-xl">
              You&apos;re successfully authenticated with Google
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
