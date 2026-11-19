import ProjectContainer from "../ui/ProjectContainer"
import Title from "../ui/Title"
import SocialLinks from "../ui/SocialLinks";
import { getPortfolioSection } from "@/lib/portfolio-content";


export default async function Projects() {
    const [projects, socialLinks] = await Promise.all([
        getPortfolioSection("projects"),
        getPortfolioSection("social_links"),
    ]);
    const visibleProjects = (projects ?? []).filter((project) => project.title.trim() && project.slug.trim());
    const visibleSocialLinks = (socialLinks ?? []).filter((link) => link.name.trim() && link.url.trim());
    const hasProjects = visibleProjects.length > 0;
    const hasSocialLinks = visibleSocialLinks.length > 0;

    if (!hasProjects && !hasSocialLinks) {
        return null;
    }

    return (
        <section id="projects" className="scroll-mt-24 py-6 sm:py-10">
            <div className="mx-auto max-w-6xl">
                {hasProjects && (
                    <>
                        <div className="py-6 lg:py-10">
                            <Title t_number="02" title="Selected work" description="Projects" progress={20}></Title>
                        </div>
                        <ProjectContainer projects={visibleProjects} />
                    </>
                )}
                {hasSocialLinks && (
                    <div className={`${hasProjects ? "mt-5 border-y" : "border-y"} border-neutral-200 py-5`}>
                        <div className="mb-3 shrink-0">
                            <p className="font-gmono text-xs uppercase tracking-widest text-neutral-500">Elsewhere on the web</p>
                            <p className="mt-1 text-sm text-neutral-600">Find me, follow along, or explore my work.</p>
                        </div>
                        <SocialLinks links={visibleSocialLinks} />
                    </div>
                )}
            </div>
        </section>
    )
}