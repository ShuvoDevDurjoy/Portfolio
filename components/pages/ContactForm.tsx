"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm({ email }: { email: string }) {
    const [status, setStatus] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const senderEmail = String(formData.get("email") ?? "").trim();
        const subject = String(formData.get("subject") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();
        const body = `From: ${name}\nEmail: ${senderEmail}\n\n${message}`;
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailto;
        setStatus("Your email app should open with this message ready to send.");
    }

    const fieldClassName = "w-full border-b border-neutral-300 bg-transparent py-3 font-sans text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#d97a5c]";

    return (
        <div className="border-t border-neutral-200 pt-5">
            <h3 className="font-gmono text-xs uppercase tracking-widest text-neutral-600">Send a message</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">This opens your email app with the message details filled in. Nothing is sent from this site.</p>
            <form className="mt-3 grid gap-2" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="contact-name">Your name</label>
                <input className={fieldClassName} id="contact-name" name="name" autoComplete="name" placeholder="Your name" required />
                <label className="sr-only" htmlFor="contact-email">Your email</label>
                <input className={fieldClassName} id="contact-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required />
                <label className="sr-only" htmlFor="contact-subject">Subject</label>
                <input className={fieldClassName} id="contact-subject" name="subject" placeholder="Subject" required />
                <label className="sr-only" htmlFor="contact-message">Message</label>
                <textarea className={`${fieldClassName} min-h-28 resize-y`} id="contact-message" name="message" placeholder="Your message" required />
                <button className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 font-gmono text-xs text-white transition-colors hover:bg-[#d97a5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97a5c]" type="submit">
                    Open email draft <span aria-hidden="true">↗</span>
                </button>
                <p aria-live="polite" className="text-xs text-neutral-500">{status}</p>
            </form>
        </div>
    );
}
