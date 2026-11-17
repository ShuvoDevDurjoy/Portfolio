import SideTitle from "./SideTitle";
import { education } from "../data";

export default function Education(){
    return <section>
        <div className="py-10 max-w-6xl grid gap-10 grid-cols-1 lg:grid-cols-12 m-auto">
            <div className="col-span-6">
                <SideTitle t_number="05" title="Foundations in computer science." description="Education"></SideTitle>
            </div>
            <div className="col-span-6 border-y border-neutral-400 divide-y divide-neutral-400">
                {
                    education.map((edu, index)=>{
                        return <div className="flex flex-col gap-6 py-5" key={`edu_${index}`}>
                            <div className="">
                                <p className="text-neutral-500 uppercase text-sm font-gspace">
                                    <span>{edu.start_date}-{edu.end_date}</span>
                                </p>
                                <h2 className="font-sans leading-[1.04] py-2 text-2xl md:text-3xl">{edu.degree}</h2>
                                <p className="font-gspace text-sm md:text-xl text-neutral-500">{edu.institution}</p>
                                <p className="font-gspace text-sm md:text-xl text-neutral-500">{edu.honors}</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {
                                    edu.relevant_coursework.map((ecw, eindex)=>{
                                        return <p key={`edecation_course_work_${index}_${eindex}`} className="font-gspace text-neutral-500 text-xs px-3 py-2 bg-gray-200">{ecw}</p>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </section>
}