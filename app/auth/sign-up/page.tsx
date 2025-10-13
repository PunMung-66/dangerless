import { redirect } from "next/navigation";

export default function Page() {
  // Since OAuth handles both login and registration, redirect to home page
  redirect("/");
}
