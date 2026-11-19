import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";

export default async function CompetitiveStats() {
    const stats = await getPortfolioSection("competitive_stats");
    if (!stats || !hasPortfolioContent(stats)) {
        return null;
    }

    const metrics = [
        { label: "LeetCode rating", value: stats.leetcode_rating },
        { label: "Rank", value: stats.leetcode_rank },
        { label: "Solved", value: stats.leetcode_solved },
        { label: "Percentile", value: stats.leetcode_percentile ? `${stats.leetcode_percentile}%` : "" },
    ].filter(({ value }) => value !== "" && value !== 0 && value !== null);

    return (
        <section className="border-y border-neutral-300 py-8" aria-labelledby="competitive-stats-title">
            <h2 id="competitive-stats-title" className="font-gmono text-xs uppercase tracking-widest text-neutral-500">
                Competitive programming
            </h2>
            {metrics.length > 0 && (
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {metrics.map(({ label, value }) => (
                        <div className="border-l-2 border-[#d97a5c] bg-white/70 px-4 py-3" key={label}>
                            <dt className="font-gmono text-[10px] uppercase text-neutral-500">{label}</dt>
                            <dd className="mt-1 text-xl text-neutral-900">{value}</dd>
                        </div>
                    ))}
                </dl>
            )}
            {stats.icpc_achievement && (
                <p className="mt-4 text-sm leading-6 text-neutral-700">{stats.icpc_achievement}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
                {stats.leetcode_url && <a className="font-gmono text-xs text-[#b84b2a] underline underline-offset-4" href={stats.leetcode_url} target="_blank" rel="noreferrer">LeetCode profile ↗</a>}
                {stats.codeforces_url && <a className="font-gmono text-xs text-[#b84b2a] underline underline-offset-4" href={stats.codeforces_url} target="_blank" rel="noreferrer">Codeforces profile ↗</a>}
            </div>
        </section>
    );
}
