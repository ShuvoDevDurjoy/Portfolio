import SideTitle from "./SideTitle";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";

export default async function Experience() {
    const experiences = await getPortfolioSection("experience");
    const visibleExperiences = (experiences ?? []).filter(hasPortfolioContent);
    if (visibleExperiences.length === 0) {
        return null;
    }

    return (
        <section id="experience" className="scroll-mt-24 py-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                    <SideTitle t_number="05" title="Experience shaped by real systems." description="Experience" />
                </div>
                <div className="divide-y divide-neutral-300 border-y border-neutral-300 lg:col-span-6">
                    {visibleExperiences.map((experience) => (
                        <article className="py-5" key={experience.id}>
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <p className="font-gmono text-xs uppercase text-neutral-500">
                                    {experience.start_date} — {experience.end_date ?? "Present"}
                                </p>
                                <span className="font-gmono text-xs text-[#d97a5c]">{experience.employment_type}</span>
                            </div>
                            <h3 className="mt-2 font-sans text-xl sm:text-2xl">{experience.role}</h3>
                            <p className="mt-1 text-sm text-neutral-600">{experience.company_name} · {experience.location}</p>
                            <p className="mt-4 text-sm leading-6 text-neutral-600">{experience.description}</p>
                            <ul className="mt-4 space-y-2">
                                {experience.highlights.map((highlight) => (
                                    <li className="flex gap-2 text-sm leading-6 text-neutral-700" key={highlight}>
                                        <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-red-500" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
