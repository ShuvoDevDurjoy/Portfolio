"use client";

import { useState } from "react";

export default function CopyButton({ value, label }: { value?: string; label: string }) {
    const [status, setStatus] = useState("");

    async function copyValue() {
        try {
            await navigator.clipboard.writeText(value ?? window.location.href);
            setStatus("Copied");
        } catch {
            setStatus("Copy failed. Select and copy the text instead.");
        }
    }

    return (
        <div className="flex items-center gap-3">
            <button
                className="rounded-full border border-neutral-600 px-4 py-2 font-gmono text-xs text-neutral-200 transition-colors hover:border-white hover:text-white"
                type="button"
                onClick={copyValue}
            >
                {label}
            </button>
            <span aria-live="polite" className="font-gmono text-xs text-neutral-400">{status}</span>
        </div>
    );
}
