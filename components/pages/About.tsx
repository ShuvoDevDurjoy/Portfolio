import SideTitle from "../ui/SideTitle"
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";


export default async function About() {
    const about = await getPortfolioSection("about");
    if (!about || !hasPortfolioContent(about)) {
        return null;
    }

    return (
        <section id="about" className="scroll-mt-24 py-6 sm:py-10">
            <div className="relative mx-auto grid max-w-6xl gap-8 pb-10 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-red-500 lg:grid-cols-4">
                <div className="col-span-2">
                    <SideTitle t_number="01" title={about.displayHeadline} description={about.sectionLabel}></SideTitle>
                </div>
                <div className="flex flex-col gap-4 col-span-2">
                    <h2 className="text-2xl lg:text-3xl font-sans">{about.bio.lead}</h2>
                    <div className="space-y-4 font-gmono text-sm leading-relaxed text-neutral-500 sm:text-base">
                        {about.bio.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                </div>
                <div className="col-span-2">
                    <p className="relative before:left-0 before:absolute before:w-[2px] before:h-full before:bg-red-500 before:top-0 px-4 font-gmono text-sm lg:text-xl text-neutral-500">{about.quote}</p>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 border-y border-neutral-300 divide-y md:divide-y-0 md:divide-x divide-neutral-300">
                        {about.metrics.map((met, index) => (
                            <div
                                key={`about_metrics_key_${index}`}
                                className="flex flex-col justify-start gap-3 py-3 px-3"
                            >
                                <p className="text-4xl font-normal tracking-tight text-[#d85732]">
                                    {met.value}
                                </p>
                                <p className="font-gmono text-xs uppercase tracking-widest text-neutral-500">
                                    {met.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="py-5">
                        <p className="mb-4 py-3 font-gmono text-xs uppercase tracking-widest text-neutral-600">{about.workingPrinciples.heading}</p>
                        <ul className="divide-y divide-neutral-300 border-y border-neutral-300">
                            {
                                about.workingPrinciples.items.map((wp, index) => {
                                    return <li
                                        key={`principle_${index}`}
                                        className="grid grid-cols-[3.5rem_1fr] items-baseline py-3"
                                    >
                                        <span className="font-gmono text-xs text-[#d85732]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            {wp.text}
                                        </p>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}