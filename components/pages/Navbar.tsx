"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

type NavbarLink = { href: string; label: string };

export default function Navbar({ name, links }: { name: string; links: NavbarLink[] }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const hasContact = links.some(({ href }) => href === "/#contact");

    return (
        <header className="-mx-4 sticky top-0 z-50 border-b border-neutral-200/80 bg-[#faf9f6]/90 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="relative mx-auto max-w-6xl">
                <div className="flex min-h-16 items-center justify-between gap-4">
                <Link className="shrink-0 py-3 font-gmono text-base font-bold tracking-tight text-neutral-900" href="/#top">
                    {name}<span aria-hidden="true" className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[#d97a5c]" />
                </Link>
                <nav aria-label="Main navigation" className="hidden items-center gap-1 font-gmono text-xs text-neutral-600 md:flex">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            className="shrink-0 rounded-full px-3 py-2 transition-colors hover:bg-neutral-200/70 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97a5c]"
                            href={href}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                {hasContact && (
                    <Link className="hidden rounded-full bg-neutral-900 px-4 py-2 font-gmono text-xs text-white transition-colors hover:bg-[#d97a5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97a5c] md:inline-flex" href="/#contact">
                        Let&apos;s talk
                    </Link>
                )}
                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 transition-colors hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97a5c] md:hidden"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                </button>
                </div>
                {menuOpen && (
                    <nav
                        id="mobile-navigation"
                        aria-label="Mobile navigation"
                        className="absolute inset-x-0 top-full z-50 border border-neutral-200 bg-[#faf9f6] p-3 shadow-lg md:hidden"
                    >
                        <div className="flex flex-col">
                            {links.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    className="rounded-md px-3 py-3 font-gmono text-sm text-neutral-700 transition-colors hover:bg-neutral-200/70 hover:text-neutral-950"
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                            {hasContact && <Link
                                className="mt-2 rounded-md bg-neutral-900 px-3 py-3 font-gmono text-sm text-white transition-colors hover:bg-[#d97a5c]"
                                href="/#contact"
                                onClick={() => setMenuOpen(false)}
                            >
                                Let&apos;s talk <span aria-hidden="true">↗</span>
                            </Link>}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}