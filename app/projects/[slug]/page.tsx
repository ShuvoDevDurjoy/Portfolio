import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getPortfolioSection } from "@/lib/portfolio-content";
import CopyButton from "@/components/ui/CopyButton";
import ProjectMediaGallery from "@/components/ui/ProjectMediaGallery";
import ContentBlocks from "@/components/ui/ContentBlocks";

type ProjectPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const projects = await getPortfolioSection("projects");
    const project = projects?.find((item) => item.slug === slug);

    if (!project) {
        return {};
    }

    return {
        title: `${project.title} — Project`,
        description: project.summary,
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projects = await getPortfolioSection("projects");
    const profile = await getPortfolioSection("profile");
    const project = projects?.find((item) => item.slug === slug);

    if (!project) {
        notFound();
    }

    const cloneCommand = `git clone ${project.repo_url}\ncd ${project.slug}`;
    const media = (project.media?.length
        ? project.media
        : project.thumbnail_url?.trim()
            ? [{ type: "image" as const, url: project.thumbnail_url, alt: `${project.title} project overview` }]
            : []).filter((item) => item.url.trim());

    return (
        <main className="page-enter min-h-screen bg-[#faf9f6] px-4 pb-16 text-neutral-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between border-b border-neutral-200 py-4">
                    <Link className="font-gmono text-sm font-bold" href="/#top">{profile?.full_name || "Portfolio"}<span className="text-[#d97a5c]">.</span></Link>
                    <Link className="font-gmono text-xs text-neutral-600 transition-colors hover:text-neutral-950" href="/#projects">← All projects</Link>
                </div>

                <header className="grid gap-6 py-10 sm:py-14">
                    <p className="font-gmono text-xs uppercase tracking-[0.16em] text-neutral-500">
                        {project.category} <span className="px-2 text-[#d97a5c]">/</span>
                        {String(project.display_order).padStart(2, "0")}
                    </p>
                    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                            <ViewTransition name={`project-title-${project.slug}`}>
                            <h1 className="font-sans text-4xl font-medium leading-tight tracking-tight sm:text-6xl">{project.title}</h1>
                            </ViewTransition>
                            <p className="mt-3 text-lg text-neutral-500 sm:text-xl">{project.subtitle}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a className="rounded-full bg-neutral-900 px-5 py-3 font-gmono text-xs text-white transition-colors hover:bg-[#d97a5c]" href={project.repo_url} target="_blank" rel="noreferrer">
                                View source ↗
                            </a>
                            {project.demo_url && (
                                <a className="rounded-full border border-neutral-300 px-5 py-3 font-gmono text-xs transition-colors hover:border-neutral-900" href={project.demo_url} target="_blank" rel="noreferrer">
                                    Live demo ↗
                                </a>
                            )}
                        </div>
                    </div>
                    <p className="max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">{project.description}</p>
                </header>

                {media.length > 0 && <section className="mt-4" aria-label={`${project.title} images and video`}>
                    <p className="mb-2 font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">Project media</p>
                    <ViewTransition name={`project-cover-${project.slug}`}>
                        <ProjectMediaGallery media={media} projectTitle={project.title} />
                    </ViewTransition>
                </section>}

                <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <section>
                        <p className="font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">01 / Overview</p>
                        <h2 className="mt-3 font-sans text-2xl sm:text-3xl">The problem and the approach</h2>
                        <p className="mt-4 leading-7 text-neutral-600">{project.summary} {project.description}</p>
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                            {project.metrics.map((metric) => (
                                <li className="border-l-2 border-[#d97a5c] bg-white/70 px-4 py-3 text-sm text-neutral-700" key={metric}>{metric}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="border-y border-neutral-300 py-5">
                        <p className="font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">02 / Built with</p>
                        <h2 className="mt-3 font-sans text-2xl">Tools &amp; technologies</h2>
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {project.technologies.map((technology) => (
                                <li className="border border-neutral-300 px-3 py-2 font-gmono text-xs text-neutral-700" key={technology}>{technology}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                {project.content_blocks && project.content_blocks.length > 0 && (
                    <section className="mt-12" aria-label={`${project.title} detailed content`}>
                        <ContentBlocks blocks={project.content_blocks} title={project.title} />
                    </section>
                )}

                <section className="mt-12 bg-neutral-950 p-5 text-white sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className="font-gmono text-xs uppercase tracking-widest text-[#f0a184]">04 / Code</p>
                            <h2 className="mt-2 font-sans text-2xl">Get the source</h2>
                        </div>
                        <CopyButton value={cloneCommand} label="Copy clone commands" />
                    </div>
                    <pre className="mt-6 overflow-x-auto border border-white/10 bg-black/40 p-4 font-mono text-xs leading-7 text-neutral-200 sm:p-5 sm:text-sm"><code>{cloneCommand}</code></pre>
                </section>

                <div className="mt-12 border-t border-neutral-300 pt-5">
                    <Link className="font-gmono text-sm text-neutral-600 transition-colors hover:text-neutral-950" href="/#projects">← Back to selected work</Link>
                </div>
            </div>
        </main>
    );
}
