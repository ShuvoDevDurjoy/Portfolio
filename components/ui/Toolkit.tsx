import SideTitle from "./SideTitle";
import { groupedSkills } from "../data";

export default function Toolkit(){
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10">
            <div className="lg:col-span-6">
                <SideTitle t_number="04" title="A Practical Workset" description="Toolkit"></SideTitle>
            </div>
            <div className="lg:col-span-6 border-y border-neutral-400 divide-y divide-neutral-400">
                {
                    groupedSkills.map((skill, index)=>{
                        return <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-begin">
                            <p className="font-gspace uppercase text-sm text-neutral-500 md:col-span-3">{skill.category}</p>
                            <div className="md:col-span-9 grid grid-cols-2 items-start gap-3 md:gap-6 items-start">
                                {
                                    skill.items.map((item, index)=>{
                                        return <div className="text-xl flex flex-col justify-center items-begin gap-1">
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