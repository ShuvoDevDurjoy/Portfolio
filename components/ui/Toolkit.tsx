import SideTitle from "./SideTitle";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";

export default async function Toolkit(){
    const groupedSkills = await getPortfolioSection("skills");
    const visibleGroups = (groupedSkills ?? []).map((group) => ({
        ...group,
        items: group.items.filter(hasPortfolioContent),
    })).filter((group) => group.items.length > 0 && hasPortfolioContent(group.category));
    if (visibleGroups.length === 0) {
        return null;
    }

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10">
            <div className="lg:col-span-6">
                <SideTitle t_number="04" title="A Practical Workset" description="Toolkit"></SideTitle>
            </div>
            <div className="lg:col-span-6 border-y border-neutral-400 divide-y divide-neutral-400">
                {
                    visibleGroups.map((skill)=>{
                        return <div className="grid grid-cols-1 items-start gap-5 py-5 md:grid-cols-12 md:gap-10" key={skill.id}>
                            <p className="font-gspace uppercase text-sm text-neutral-500 md:col-span-3">{skill.category}</p>
                            <div className="md:col-span-9 grid grid-cols-2 items-start gap-3 md:gap-6 items-start">
                                {
                                    skill.items.map((item)=>{
                                        return <div className="flex flex-col justify-center gap-1 text-xl" key={item.id}>
                                            <p className="font-sans text-neutral-700 text-sm md:text-md font-normal">{item.name}</p>
                                            <span className="text-[9.5px] md:text-xs text-neutral-500 font-gspace leading-[1.04]">{item.note}</span>
                                        </div>
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