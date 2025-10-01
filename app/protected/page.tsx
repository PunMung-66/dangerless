import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-2xl">Welcome back!</h2>
          <p className="text-muted-foreground">
            You&apos;re successfully authenticated. Start building your
            application features here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Dashboard</h3>
            <p className="text-muted-foreground">Main application dashboard</p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Profile</h3>
            <p className="text-muted-foreground">Manage your user profile</p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Settings</h3>
            <p className="text-muted-foreground">Application settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">User Information</h3>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>User ID:</strong> {user.id}
            </p>
            <p className="text-sm">
              <strong>Created:</strong>{" "}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
