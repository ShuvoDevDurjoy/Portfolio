import AdminLoginForm from "./AdminLoginForm";
import { hasEnvVars } from "@/lib/utils";

export default function AdminLoginPage() {
    const configured = Boolean(
        hasEnvVars &&
        process.env.SUPABASE_SERVICE_ROLE_KEY &&
        process.env.ADMIN_EMAILS?.trim(),
    );

    return <AdminLoginForm configured={configured} />;
}
