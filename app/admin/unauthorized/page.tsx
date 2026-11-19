import Link from "next/link";

export default function AdminUnauthorizedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 text-neutral-900">
            <section className="w-full max-w-md border border-neutral-200 bg-white p-7">
                <p className="font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">403 / Not authorized</p>
                <h1 className="mt-3 font-sans text-3xl">Admin access required</h1>
                <p className="mt-3 text-sm leading-6 text-neutral-500">This signed-in account is not included in the server-side ADMIN_EMAILS allowlist.</p>
                <Link className="mt-6 inline-flex rounded-full bg-neutral-900 px-4 py-2 font-gmono text-xs text-white" href="/admin/login">Return to sign in</Link>
            </section>
        </main>
    );
}
