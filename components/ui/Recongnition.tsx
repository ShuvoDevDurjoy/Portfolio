import Title from "./Title";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";

export default async function Recognition(){
    const achievements = await getPortfolioSection("achievements");
    const visibleAchievements = (achievements ?? []).filter(hasPortfolioContent);
    if (visibleAchievements.length === 0) {
        return null;
    }

    return <div className="py-8">
        <div className="max-w-6xl m-auto">
            <div className="py-8">
                <Title t_number="06" title="Milestones, not finish lines." description="Recognition"></Title>
            </div>
            <div className="grid gap-8 md:grid-cols-2 grid-rows-2 gap2">
                {
                    visibleAchievements.map((achievement, index)=>{
                        return <div className="p-6 border border-neutral-400" key={`achievement_container_${index}`}>
                            <div>
                                <p className="text-neutral-500 font-gspace">
                                    <span>{achievement.year}</span>
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mx-2"></span>
                                    <span>{achievement.category}</span>
                                </p>
                                <h3 className="font-sans text-2xl py-2">{achievement.title}</h3>
                            </div>
                            <div>
                                <p className="text-red-500 font-sm">{achievement.highlight}</p>
                                <p className="text-neutral-500 font-xs font-gspace">{achievement.description}</p>
                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    </div>
}