import HeroPortrait from "../HeroPortrait";
import Link from "next/link";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";


export default async function Hero(){
    const profile = await getPortfolioSection("profile");
    if (!profile || !hasPortfolioContent(profile)) {
        return null;
    }

    return (
        <section id="top" className="scroll-mt-24 items-center pb-8 pt-8 sm:pb-12 sm:pt-12">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 py-4 sm:gap-12 lg:grid-cols-12 lg:py-8">
                <div className={`gap-2 font-sans flex flex-col justify-between items-start col-span-1 lg:pt-8 ${profile.avatar_url ? "lg:col-span-9" : "lg:col-span-12"}`}>
                    <p className="block items-center gap-2 font-gmono text-xs uppercase text-gray-500"><span className="mr-2 inline-block aspect-square w-1 rounded-full bg-red-500"></span>{profile.availability}</p>
                    <p className="flex flex-wrap items-start gap-2 font-gmono text-xs uppercase leading-tight"><span className="text-red-500">{profile.full_name}</span><span>/ {profile.headline}</span></p>
                    <h1 className="my-1 font-sans text-4xl font-normal leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-7xl">{profile.tagline}</h1>
                    <div className="my-3 h-px w-full bg-black/20"></div>
                    <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-12 sm:gap-8">
                        <p className="font-sans text-base font-normal text-neutral-500 sm:col-span-6 sm:text-lg">{profile.bio}</p>
                        <div className="grid grid-cols-2 gap-2 font-mono text-xs sm:col-span-6">
                            <Link className="flex items-center justify-between bg-black px-4 py-3 text-white transition-colors duration-200 hover:bg-red-600" href="#projects">Selected work <span aria-hidden="true">↗</span></Link>
                            <Link className="border border-gray-400 px-4 py-3 transition-colors hover:border-neutral-900" href="#contact">Get in touch <span aria-hidden="true">↗</span></Link>
                        </div>
                    </div>
                </div>
                {profile.avatar_url && (
                    <div className="items-center lg:col-span-3">
                        <HeroPortrait avatarUrl={profile.avatar_url} location={profile.location} organization={profile.university} />
                    </div>
                )}
            </div>
        </section>
    )
}