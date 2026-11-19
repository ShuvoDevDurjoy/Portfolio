import Title from "./Title";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";




export default async function Courses() {
    const courses = await getPortfolioSection("courses");
    const visibleCourses = (courses ?? []).filter(hasPortfolioContent);
    if (visibleCourses.length === 0) {
        return null;
    }

    return <div className="py-8">
        <div>
            <div className="py-10">
                <Title t_number="08" title="Courses did complete" description="Courses"></Title>
            </div>
            <div className="grid gap-8 md:grid-cols-2 grid-rows-2 gap-2">
                {
                    visibleCourses.map((c, index) => {
                        return <div className="p-6 border flex flex-col justify-between gap-2 border-neutral-400" key={`courses_${index}`}>
                            <div className="flex-col flex gap-1">
                                <span className="text-neutral-500 text-sm">{c.completed}</span>
                                <h2 className="font-sans text-3xl">{c.title}</h2>
                                <p className="text-neutral-500 text-sm">{c.platform}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {
                                    c.topics.map((ct, t_index) => {
                                        return <span className="bg-gray-100 text-xs text-neutral-700 px-2 py-1" key={`courses_index_${index}_${t_index}`}>{ct}</span>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}