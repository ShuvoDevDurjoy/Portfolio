import Image from "next/image";
import type { PortfolioContentBlock } from "../portfolio-schema";
import CopyButton from "./CopyButton";
import ProjectMediaGallery from "./ProjectMediaGallery";

export default function ContentBlocks({
    blocks,
    title,
}: {
    blocks: PortfolioContentBlock[];
    title: string;
}) {
    return (
        <div className="space-y-8">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case "heading":
                        return <h2 className="pt-4 font-sans text-2xl leading-tight sm:text-3xl" key={`${block.type}-${index}`}>{block.text}</h2>;
                    case "paragraph":
                        return <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8" key={`${block.type}-${index}`}>{block.text}</p>;
                    case "image":
                        return (
                            <figure className="relative aspect-[16/9] overflow-hidden border border-neutral-200 bg-neutral-100" key={`${block.type}-${index}`}>
                                <Image src={block.url} alt={block.alt} fill unoptimized sizes="(max-width: 1023px) 100vw, 800px" className="object-cover" />
                                {block.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-neutral-950/75 px-4 py-2 text-xs text-white">{block.caption}</figcaption>}
                            </figure>
                        );
                    case "gallery":
                        return (
                            <figure key={`${block.type}-${index}`}>
                                <ProjectMediaGallery media={block.items} projectTitle={title} />
                                {block.caption && <figcaption className="mt-1 text-xs text-neutral-500">{block.caption}</figcaption>}
                            </figure>
                        );
                    case "video":
                        return (
                            <figure key={`${block.type}-${index}`}>
                                <video className="aspect-video w-full bg-neutral-950" controls playsInline preload="metadata" poster={block.poster}>
                                    <source src={block.url} />
                                    Your browser does not support embedded video.
                                </video>
                                {(block.caption || block.title) && <figcaption className="mt-2 text-xs text-neutral-500">{block.caption ?? block.title}</figcaption>}
                            </figure>
                        );
                    case "code":
                        return (
                            <figure className="bg-neutral-950 p-4 text-white sm:p-6" key={`${block.type}-${index}`}>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <figcaption className="font-gmono text-xs text-neutral-400">{block.caption ?? block.language}</figcaption>
                                    <CopyButton label="Copy code" value={block.code} />
                                </div>
                                <pre className="mt-4 overflow-x-auto font-mono text-xs leading-6 text-neutral-200 sm:text-sm"><code>{block.code}</code></pre>
                            </figure>
                        );
                    case "quote":
                        return (
                            <blockquote className="border-l-2 border-[#d97a5c] pl-5 text-lg leading-8 text-neutral-700" key={`${block.type}-${index}`}>
                                <p>{block.text}</p>
                                {block.attribution && <footer className="mt-2 font-gmono text-xs text-neutral-500">{block.attribution}</footer>}
                            </blockquote>
                        );
                }
            })}
        </div>
    );
}
