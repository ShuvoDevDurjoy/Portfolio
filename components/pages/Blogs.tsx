import Link from "next/link";
import { ViewTransition } from "react";
import SideTitle from "../ui/SideTitle";
import { getPortfolioSection } from "@/lib/portfolio-content";



export default async function Blogs() {
    const blogs = await getPortfolioSection("blogs");
    const visibleBlogs = (blogs ?? []).filter((blog) => blog.title.trim() && blog.slug.trim());
    if (visibleBlogs.length === 0) {
        return null;
    }

    return <section id="writing" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-10 lg:grid-cols-12 lg:gap-10">
            <div className="col-span-6">
                <SideTitle t_number="09" title="Notes from the workbench." description="writing"></SideTitle>
            </div>
            <div className="col-span-6 border-y border-neutral-400 divide-y divide-neutral-400">
                {
                    visibleBlogs.map((blog, index) => {
                        return <article className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[1fr_auto] sm:gap-6" key={`blogs_${index}`}>
                            <div className="flex min-w-0 flex-col justify-between gap-4">
                                <div>
                                    <p className="text-neutral-700">
                                        <span>{blog.date}</span>
                                        <span className="w-1 h-1 inline-block bg-gray-500 rounded-full mx-2"></span>
                                        <span>{blog.reading_time}</span>
                                    </p>
                                    <ViewTransition name={`article-title-${blog.slug}`}>
                                        <h3 className="py-1 text-2xl">
                                            <Link className="transition-colors hover:text-[#d97a5c]" href={`/writing/${blog.slug}`}>{blog.title}</Link>
                                        </h3>
                                    </ViewTransition>
                                    <p className="text-sm text-neutral-500">{blog.excerpt}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        blog.tags.map((bt, t_index) => {
                                            return <span className="text-xs text-neutral-700 px-2 py-1 bg-gray-100" key={`blog_${index}_${t_index}`}>
                                                {bt}
                                            </span>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Link className="rounded-full bg-neutral-200 px-4 py-2 font-sans text-sm text-neutral-700 transition-colors hover:bg-neutral-900 hover:text-white" href={`/writing/${blog.slug}`} aria-label={`Read ${blog.title}`}>Read <span aria-hidden="true">↗</span></Link>
                            </div>
                        </article>
                    })
                }
            </div>
        </div>
    </section>
}