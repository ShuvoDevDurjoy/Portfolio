"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectMedia } from "../portfolio-schema";

export default function ProjectMediaGallery({
    media,
    projectTitle,
}: {
    media: ProjectMedia[];
    projectTitle: string;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeMedia = media[activeIndex];

    function showPrevious() {
        setActiveIndex((index) => (index - 1 + media.length) % media.length);
    }

    function showNext() {
        setActiveIndex((index) => (index + 1) % media.length);
    }

    return (
        <div>
            <div className="relative aspect-[16/9] overflow-hidden border border-neutral-300 bg-neutral-950">
                {activeMedia.type === "image" ? (
                    <Image
                        src={activeMedia.url}
                        alt={activeMedia.alt}
                        fill
                        unoptimized
                        priority={activeIndex === 0}
                        sizes="(max-width: 1023px) 100vw, 1024px"
                        className="object-cover"
                    />
                ) : (
                    <video
                        key={activeMedia.url}
                        className="h-full w-full object-contain"
                        controls
                        playsInline
                        preload="metadata"
                        poster={activeMedia.poster}
                        aria-label={activeMedia.title}
                    >
                        <source src={activeMedia.url} />
                        Your browser does not support embedded video.
                    </video>
                )}

                {media.length > 1 && (
                    <>
                        <button
                            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/75 text-xl text-white transition-colors hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                            type="button"
                            aria-label="Previous project media"
                            onClick={showPrevious}
                        >
                            ‹
                        </button>
                        <button
                            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950/75 text-xl text-white transition-colors hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                            type="button"
                            aria-label="Next project media"
                            onClick={showNext}
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                <p className="font-gmono text-xs text-neutral-500" aria-live="polite">
                    {activeMedia.type === "video" ? "Video demo" : activeMedia.alt}
                </p>
                {media.length > 1 && (
                    <div className="flex items-center gap-2" aria-label={`${projectTitle} media selection`}>
                        {media.map((item, index) => (
                            <button
                                aria-label={`Show ${item.type} ${index + 1} of ${media.length}`}
                                aria-current={index === activeIndex}
                                className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-6 bg-[#d97a5c]" : "w-2 bg-neutral-300 hover:bg-neutral-500"}`}
                                key={`${item.type}-${item.url}`}
                                onClick={() => setActiveIndex(index)}
                                type="button"
                            />
                        ))}
                    </div>
                )}
            </div>
            <span className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {media.length} for {projectTitle}</span>
        </div>
    );
}
