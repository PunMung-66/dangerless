import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards for development */}
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Safety Map</h3>
            <p className="text-muted-foreground">
              Interactive map component goes here
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Recent Alerts</h3>
            <p className="text-muted-foreground">
              Safety alerts component goes here
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Your Reports</h3>
            <p className="text-muted-foreground">
              User reports component goes here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
