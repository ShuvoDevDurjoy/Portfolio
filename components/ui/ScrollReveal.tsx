"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export default function ScrollReveal({
    children,
    className,
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        let observer: IntersectionObserver | undefined;
        const context = gsap.context(() => {
            const intersectionObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(
                        element,
                        { autoAlpha: 0, y: 18 },
                        { autoAlpha: 1, y: 0, duration: 0.45, delay, ease: "power2.out" },
                    );
                    intersectionObserver.disconnect();
                }
            }, { threshold: 0.08 });

            observer = intersectionObserver;
            intersectionObserver.observe(element);
        }, element);

        return () => {
            observer?.disconnect();
            context.revert();
        };
    }, [delay]);

    return <div ref={elementRef} className={className}>{children}</div>;
}
