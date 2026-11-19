import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { PortfolioProject } from "@/components/portfolio-schema";
import ScrollReveal from "./ScrollReveal";

export default function ProjectContainer({ projects }: { projects: PortfolioProject[] }) {
    return (
        <div className="mx-auto flex max-w-5xl flex-col">
            {projects.map((project, index) => {
                const imageOnRight = index % 2 === 1;

                return (
                    <ScrollReveal className="w-full" delay={Math.min(index, 3) * 0.06} key={project.id}>
                    <article
                        className={`grid grid-cols-1 items-center gap-6 border-b border-neutral-200 py-10 first:pt-5 last:border-b-0 sm:gap-10 md:grid-cols-2 md:gap-12 md:py-14 ${imageOnRight ? "md:[&_.project-image]:order-2" : ""}`}
                    >
                        <ViewTransition name={`project-cover-${project.slug}`}>
                            <Link
                                className="project-image group relative block aspect-[3/2] w-full overflow-hidden border border-neutral-300 bg-neutral-200"
                                href={`/projects/${project.slug}`}
                                aria-label={`View ${project.title} project details`}
                            >
                                {project.thumbnail_url?.trim() ? (
                                    <Image
                                        src={project.thumbnail_url}
                                        alt={`${project.title} project`}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 767px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                ) : (
                                    <span className="flex h-full items-center justify-center bg-neutral-100 font-gmono text-xs text-neutral-500">
                                        {project.title}
                                    </span>
                                )}
                                <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 font-gmono text-xs text-neutral-800">
                                    View project ↗
                                </span>
                            </Link>
                        </ViewTransition>
                        <div className="flex min-w-0 flex-col justify-center">
                            <p className="font-gmono text-xs uppercase tracking-[0.12em] text-neutral-500">
                                {project.category}
                                <span className="px-2 text-red-500">/</span>
                                {String(project.display_order).padStart(2, "0")}
                            </p>
                            <ViewTransition name={`project-title-${project.slug}`}>
                                <h2 className="py-2 font-sans text-3xl font-medium leading-tight sm:text-4xl">
                                    <Link className="transition-colors hover:text-[#d97a5c]" href={`/projects/${project.slug}`}>
                                        {project.title}
                                    </Link>
                                </h2>
                            </ViewTransition>
                            <p className="font-sans text-lg leading-relaxed text-neutral-500">{project.subtitle}</p>
                            <p className="mt-4 border-t border-neutral-200 pt-4 font-sans text-sm leading-7 text-neutral-600 sm:text-base">
                                {project.description}
                            </p>
                            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                                {project.metrics.map((metric) => (
                                    <li className="flex items-center gap-2 text-sm text-neutral-800" key={metric}>
                                        <span aria-hidden="true" className="h-px w-3 bg-red-500" />
                                        {metric}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <span className="border border-neutral-200 px-3 py-1 font-gmono text-xs text-neutral-600" key={technology}>
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                    </ScrollReveal>
                );
            })}
        </div>
    );
}
