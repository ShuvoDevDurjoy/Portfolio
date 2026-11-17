import SideTitle from "../ui/SideTitle"


const about = {
    "sectionNumber": 1,
    "sectionLabel": "ABOUT",
    "displayHeadline": "Engineering with curiosity and restraint.",
    "bio": {
        "lead": "CS undergrad at North South University specialising in Distributed Systems, High-Performance Computing, and Full-Stack Engineering.",
        "paragraphs": [
            "Computer Science & Engineering undergraduate at North South University with a deep interest in software architecture, distributed databases, and high-throughput web applications. Expertise in C++, TypeScript, Go, and Python. Active competitive programmer, open-source contributor, and undergraduate TA — aiming to solve large-scale engineering problems at top-tier tech environments globally.",
            "Competitive programming sharpened my ability to reason under pressure. Building distributed software taught me something more important: to design for failure, communicate trade-offs, and keep the path from idea to implementation deliberate."
        ]
    },
    "quote": "The best systems are not the ones with the most moving parts. They're the ones whose behavior remains understandable when things go wrong.",
    "metrics": [
        { "value": "600+", "label": "PROBLEMS SOLVED", "order": 1 },
        { "value": "2050+", "label": "LEETCODE RATING", "order": 2 },
        { "value": "3.92", "label": "UNIVERSITY GPA", "order": 3 },
        { "value": "Top 15", "label": "ICPC REGIONAL", "order": 4 }
    ],
    "workingPrinciples": {
        "heading": "WORKING PRINCIPLES",
        "items": [
            { "text": "Make the system observable before making it clever.", "order": 1 },
            { "text": "Prefer explicit trade-offs over hidden complexity.", "order": 2 },
            { "text": "Ship, measure, learn, and simplify.", "order": 3 }
        ]
    }
}


export default function About() {
    return (
        <div className="my-10">
            <div className="py-10 max-w-6xl m-auto grid grid-cols-4 gap-8 relative after:absolute after:w-full after:h-[1px] after:bg-red-500 after:bottom-0 after:left-0">
                <div className="col-span-2">
                    <SideTitle t_number="01" title={about.displayHeadline} description={about.sectionLabel}></SideTitle>
                </div>
                <div className="flex flex-col gap-4 col-span-2">
                    <h2 className="text-3xl font-gmono">{about.bio.lead}</h2>
                    <p className="font-gmono text-xl text-neutral-500 text-justify">{about.bio.paragraphs}</p>
                </div>
                <div className="col-span-2">
                    <p className="relative before:left-0 before:absolute before:w-[2px] before:h-full before:bg-red-500 before:top-0 px-4 font-gmono text-xl text-neutral-500">{about.quote}</p>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 border-y border-neutral-300 divide-y md:divide-y-0 md:divide-x divide-neutral-300">
                        {about.metrics.map((met, index) => (
                            <div
                                key={`about_metrics_key_${index}`}
                                className="flex flex-col justify-start gap-3 py-3 px-3"
                            >
                                <p className="text-4xl font-normal tracking-tight text-[#d85732]">
                                    {met.value}
                                </p>
                                <p className="font-gmono text-xs uppercase tracking-widest text-neutral-500">
                                    {met.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="py-5">
                        <p className="py-7 text-gmono text-2xlmb-4 font-gmono text-xs uppercase tracking-widest text-neutral-600">{about.workingPrinciples.heading}</p>
                        <ul className="border-y border-neutral-300 divide-y-300 divide-y">
                            {
                                about.workingPrinciples.items.map((wp, index) => {
                                    return <li
                                        key={`principle_${index}`}
                                        className="grid grid-cols-[3.5rem_1fr] items-baseline py-3"
                                    >
                                        <span className="font-gmono text-xs text-[#d85732]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            {wp.text}
                                        </p>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <hr className="w-full "></hr>
            </div>
        </div>
    )
}