"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm({ configured }: { configured: boolean }) {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPending(true);
        setMessage("");

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                setMessage(error.message);
                return;
            }

            router.replace("/admin");
            router.refresh();
        } catch {
            setMessage("Sign-in could not be completed. Check the Supabase configuration and try again.");
        } finally {
            setPending(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-10 text-neutral-900">
            <section className="w-full max-w-md border border-neutral-200 bg-white p-6 shadow-sm sm:p-9">
                <Link className="font-gmono text-sm font-bold" href="/">Shuvo Dev<span className="text-[#d97a5c]">.</span></Link>
                <p className="mt-10 font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">Private workspace</p>
                <h1 className="mt-2 font-sans text-3xl">Admin sign in</h1>
                <p className="mt-3 text-sm leading-6 text-neutral-500">Sign in with the Supabase Auth account whose email is listed in the server-side ADMIN_EMAILS setting.</p>

                {!configured ? (
                    <p className="mt-6 border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        Admin setup is incomplete. Configure the Supabase URL, publishable key, server-only service role key, and ADMIN_EMAILS in the deployment environment.
                    </p>
                ) : (
                    <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="font-gmono text-xs uppercase text-neutral-600" htmlFor="admin-email">Email</label>
                            <input className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-[#d97a5c]" autoComplete="email" id="admin-email" name="email" required type="email" />
                        </div>
                        <div>
                            <label className="font-gmono text-xs uppercase text-neutral-600" htmlFor="admin-password">Password</label>
                            <input className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-[#d97a5c]" autoComplete="current-password" id="admin-password" name="password" required type="password" />
                        </div>
                        <button className="w-full bg-neutral-900 px-4 py-3 font-gmono text-sm text-white transition-colors hover:bg-[#d97a5c] disabled:cursor-not-allowed disabled:opacity-60" disabled={pending} type="submit">
                            {pending ? "Signing in..." : "Sign in"}
                        </button>
                        <p aria-live="polite" className="min-h-5 text-sm text-red-700">{message}</p>
                    </form>
                )}

                <p className="mt-5 border-t border-neutral-200 pt-4 text-xs leading-5 text-neutral-500">
                    Admin accounts are created in Supabase Auth; public sign-up is intentionally not offered here.
                </p>
            </section>
        </main>
    );
}
