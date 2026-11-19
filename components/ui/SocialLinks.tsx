import { getPortfolioSection } from "@/lib/portfolio-content";

type SocialLink = {
    name: string;
    url: string;
    icon: string;
};

const shortNames: Record<string, string> = {
    GitHub: "GH",
    LinkedIn: "in",
    Twitter: "X",
    LeetCode: "LC",
    Codeforces: "CF",
};

export default async function SocialLinks({ links }: { links?: SocialLink[] | null } = {}) {
    const social_links = links === undefined ? await getPortfolioSection("social_links") : links;
    if (!social_links?.length) {
        return null;
    }

    return (
        <ul className="flex flex-wrap gap-2 sm:gap-3">
            {social_links.map(({ name, url }) => (
                <li key={name}>
                    <a
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 font-gmono text-xs text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-950 sm:px-4"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span aria-hidden="true" className="font-bold text-[#d97a5c]">{shortNames[name] ?? name.slice(0, 2)}</span>
                        {name}
                        <span aria-hidden="true">↗</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
