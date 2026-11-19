import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const allowedEmails = process.env.ADMIN_EMAILS
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!allowedEmails?.length) {
    throw new Error("Set ADMIN_EMAILS to the comma-separated admin email allowlist.");
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Unable to verify the admin session: ${error.message}`);
  }
  if (!user) {
    redirect("/admin/login");
  }
  if (!user.email || !allowedEmails.includes(user.email.toLowerCase())) {
    redirect("/admin/unauthorized");
  }

  return user;
}
