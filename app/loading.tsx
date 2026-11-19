export default function Loading() {
    return (
        <main
            aria-live="polite"
            className="grid min-h-screen place-items-center bg-[#faf9f6] px-4 text-neutral-900"
            role="status"
        >
            <div className="w-full max-w-sm">
                <p className="font-gmono text-sm font-bold tracking-tight">
                    Portfolio<span className="text-[#d97a5c]">.</span>
                </p>
                <div aria-hidden="true" className="mt-10 flex h-1 gap-1">
                    <span className="w-1/3 animate-pulse bg-[#d97a5c]" />
                    <span className="w-1/3 animate-pulse bg-neutral-400 [animation-delay:150ms]" />
                    <span className="w-1/3 animate-pulse bg-neutral-200 [animation-delay:300ms]" />
                </div>
                <h1 className="mt-5 font-sans text-2xl">Loading your portfolio</h1>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Fetching the latest profile, projects, and writing.
                </p>
            </div>
        </main>
    );
}
