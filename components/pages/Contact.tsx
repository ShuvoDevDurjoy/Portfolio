import SocialLinks from "../ui/SocialLinks";
import ContactForm from "./ContactForm";
import { getPortfolioSection } from "@/lib/portfolio-content";

export default async function Contact() {
    const profile = await getPortfolioSection("profile");
    if (!profile?.email) {
        return null;
    }

    return <section id="contact" className="scroll-mt-24 border-t border-neutral-300 py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="flex flex-col gap-4 md:col-span-5">
                <p className="flex items-end gap-2">
                    <span className="font-gspace text-2xl text-transparent [-webkit-text-stroke:1px__#d97a5c]">10</span>
                    <span className="font-gspace text-neutral-500">Contact</span>
                </p>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl">Have a problem worth solving?</h2>
                <p className="font-gspace text-sm leading-relaxed text-neutral-500">I’m open to software engineering roles, internships, and thoughtful collaborations. Tell me what you’re working on.</p>
            </div>
            <div className="flex flex-col justify-between gap-6 border-y border-neutral-300 py-6 md:col-start-7 md:col-span-6">
                <div>
                    <p className="mb-2 font-gmono text-xs uppercase tracking-widest text-neutral-500">Email</p>
                    <a className="break-all font-sans text-xl transition-colors hover:text-[#d97a5c] sm:text-2xl" href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
                <SocialLinks />
                <ContactForm email={profile.email} />
            </div>
        </div>
        <footer className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-neutral-200 pt-5 font-gmono text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {profile.full_name}</span>
            <a className="transition-colors hover:text-neutral-900" href="#top">Back to top ↑</a>
        </footer>
    </section>
}
