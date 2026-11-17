import SideTitle from "./SideTitle";
import { groupedSkills } from "../data";

export default function Toolkit(){
    return <div>
        <div className="grid grid-cols-12 gap-10 py-10">
            <div className="col-span-6">
                <SideTitle t_number="04" title="A Practical Workset" description="Toolkit"></SideTitle>
            </div>
            <div className="col-span-6 border-y border-neutral-400 divide-y divide-neutral-400">
                {
                    groupedSkills.map((skill, index)=>{
                        return <div className="py-5 grid grid-cols-12 gap-10 items-begin">
                            <p className="font-gspace uppercase text-sm text-neutral-500 col-span-3">{skill.category}</p>
                            <div className="col-span-9 grid grid-cols-2 items-center gap-6 items-start">
                                {
                                    skill.items.map((item, index)=>{
                                        return <div className="text-xl flex flex-col items-begin gap-1">
                                            <p className="font-gspace text-neutral-700 text-md font-normal">{item.name}</p>
                                            <span className="text-xs text-neutral-500 font-gspace">{item.note}</span>
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