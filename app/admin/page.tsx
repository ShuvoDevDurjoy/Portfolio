import Link from "next/link";
import { connection } from "next/server";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { portfolioSectionOptions } from "@/components/admin/sections";
import { portfolioSectionFormSchema } from "@/components/portfolio-schema";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { signOutAdmin } from "./actions";

export const instant = false;

export default async function AdminPage() {
    await connection();
    const user = await requireAdmin();
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
        .from("portfolio_sections")
        .select("section, content, updated_at");

    if (error) {
        throw new Error(`Unable to load admin content. Apply the portfolio admin migration first: ${error.message}`);
    }

    const savedSections = new Map((data ?? []).map((row) => [row.section, row]));
    const sections = portfolioSectionOptions.map(({ key, label }) => {
        const saved = savedSections.get(key);
        return {
            key,
            label,
            content: saved?.content ?? null,
            schema: portfolioSectionFormSchema[key],
            updatedAt: saved?.updated_at ?? null,
            isSaved: Boolean(saved),
        };
    });

    return (
        <main className="min-h-screen bg-[#f7f5f0] px-4 py-6 text-neutral-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-5">
                    <div>
                        <Link className="font-gmono text-sm font-bold" href="/">Shuvo Dev<span className="text-[#d97a5c]">.</span></Link>
                        <p className="mt-4 font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">Content management</p>
                        <h1 className="mt-1 font-sans text-3xl sm:text-4xl">Portfolio admin</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm text-neutral-500 sm:inline">{user.email}</span>
                        <form action={signOutAdmin}>
                            <button className="rounded-full border border-neutral-300 px-4 py-2 font-gmono text-xs transition-colors hover:border-neutral-900" type="submit">Sign out</button>
                        </form>
                    </div>
                </header>

                <p className="max-w-3xl py-5 text-sm leading-6 text-neutral-600">
                    Add portfolio content using the structured forms. Sections without saved database content stay hidden from public visitors.
                </p>

                <AdminDashboard sections={sections} />
            </div>
        </main>
    );
}
