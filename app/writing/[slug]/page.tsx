import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getPortfolioSection } from "@/lib/portfolio-content";
import CopyButton from "@/components/ui/CopyButton";
import ProjectMediaGallery from "@/components/ui/ProjectMediaGallery";
import ContentBlocks from "@/components/ui/ContentBlocks";

type ArticlePageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const blogs = await getPortfolioSection("blogs");
    const article = blogs?.find((item) => item.slug === slug);

    if (!article) {
        return {};
    }

    return {
        title: `${article.title} — Writing`,
        description: article.excerpt,
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const blogs = await getPortfolioSection("blogs");
    const profile = await getPortfolioSection("profile");
    const article = blogs?.find((item) => item.slug === slug);

    if (!article) {
        notFound();
    }

    const relatedArticles = (blogs ?? []).filter((item) => item.slug !== article.slug).slice(0, 2);
    const media = (article.media?.length
        ? article.media
        : article.cover?.trim()
            ? [{ type: "image" as const, url: article.cover, alt: `Illustration for ${article.title}` }]
            : []).filter((item) => item.url.trim());
    const headings = article.content_blocks?.filter((block) => block.type === "heading") ?? [];

    return (
        <main className="page-enter min-h-screen bg-[#faf9f6] px-4 pb-16 text-neutral-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between border-b border-neutral-200 py-4">
                    <Link className="font-gmono text-sm font-bold" href="/#top">{profile?.full_name || "Portfolio"}<span className="text-[#d97a5c]">.</span></Link>
                    <Link className="font-gmono text-xs text-neutral-600 transition-colors hover:text-neutral-950" href="/#writing">← All writing</Link>
                </div>

                <article>
                    <header className="mx-auto max-w-3xl py-10 sm:py-14">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-gmono text-xs text-neutral-500">
                            <time dateTime={article.date}>{article.date}</time>
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#d97a5c]" />
                            <span>{article.reading_time} read</span>
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#d97a5c]" />
                            <span>{profile?.full_name}</span>
                        </div>
                        <ViewTransition name={`article-title-${article.slug}`}>
                            <h1 className="mt-5 font-sans text-4xl font-medium leading-tight tracking-tight sm:text-5xl">{article.title}</h1>
                        </ViewTransition>
                        <p className="mt-5 text-lg leading-8 text-neutral-600">{article.excerpt}</p>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <ul className="flex flex-wrap gap-2">
                                {article.tags.map((tag) => (
                                    <li className="bg-neutral-200/70 px-3 py-1.5 font-gmono text-xs text-neutral-700" key={tag}>{tag}</li>
                                ))}
                            </ul>
                            <CopyButton label="Copy article link" />
                        </div>
                    </header>

                    {media.length > 0 && (
                        <section className="mx-auto max-w-5xl" aria-label={`${article.title} images and video`}>
                            <ProjectMediaGallery media={media} projectTitle={article.title} />
                        </section>
                    )}

                    <div className="mx-auto grid max-w-5xl gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_15rem]">
                        <div className="max-w-3xl">
                            <div className="mb-8 border-l-2 border-[#d97a5c] pl-5 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                                {article.excerpt}
                            </div>
                            {article.content_blocks?.length
                                ? <ContentBlocks blocks={article.content_blocks} title={article.title} />
                                : <p className="text-base leading-7 text-neutral-600">{article.excerpt}</p>}
                        </div>

                        <aside className="h-fit border-y border-neutral-300 py-5 lg:sticky lg:top-24">
                            <p className="font-gmono text-xs uppercase tracking-widest text-neutral-500">In this article</p>
                            <ol className="mt-4 space-y-3">
                                {headings.map((heading, index) => (
                                    <li className="flex gap-3 text-sm text-neutral-700" key={heading.text}>
                                        <span className="font-gmono text-xs text-[#d97a5c]">{String(index + 1).padStart(2, "0")}</span>
                                        {heading.text}
                                    </li>
                                ))}
                            </ol>
                            {profile?.email && (
                                <a className="mt-6 inline-flex font-gmono text-xs text-neutral-600 transition-colors hover:text-neutral-950" href={`mailto:${profile.email}?subject=${encodeURIComponent(`About: ${article.title}`)}`}>
                                    Discuss this article ↗
                                </a>
                            )}
                        </aside>
                    </div>
                </article>

                <section className="border-t border-neutral-300 pt-8" aria-labelledby="related-writing">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">Keep reading</p>
                            <h2 id="related-writing" className="mt-2 font-sans text-2xl sm:text-3xl">More from the workbench</h2>
                        </div>
                        <Link className="font-gmono text-xs text-neutral-600 transition-colors hover:text-neutral-950" href="/#writing">All writing ↗</Link>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {relatedArticles.map((related) => (
                            <Link className="group border border-neutral-200 bg-white/50 p-5 transition-colors hover:border-neutral-400" href={`/writing/${related.slug}`} key={related.slug}>
                                <p className="font-gmono text-xs text-neutral-500">{related.date} · {related.reading_time} read</p>
                                <h3 className="mt-3 font-sans text-xl leading-snug transition-colors group-hover:text-[#d97a5c]">{related.title}</h3>
                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{related.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
