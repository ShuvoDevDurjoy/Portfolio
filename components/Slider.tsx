import { Fragment } from "react";
import { getPortfolioSection } from "@/lib/portfolio-content";

function SliderTrack({skills, hidden = false}: {skills: string[]; hidden?: boolean}){
    return (
        <div aria-hidden={hidden} className="flex min-w-full shrink-0 items-center justify-around gap-4 py-3 pr-4 animate-marquee group-hover:[animation-play-state:paused] sm:gap-8 sm:py-4 sm:pr-8">
            {
                skills.map((skill, index)=>{
                    return <Fragment key={`${skill}-${index}`}>
                        <p className="whitespace-nowrap text-xs font-sans font-normal sm:text-sm">{skill}</p>
                        <span aria-hidden="true" className="text-base text-red-500 sm:text-xl">+</span>
                    </Fragment>
                })
            }
        </div>
    )
}

export default async function Slider(){
    const groups = await getPortfolioSection("skills");
    const skills = [...new Set((groups ?? []).flatMap((group) => group.items.map((item) => item.name).filter(Boolean)))];
    if (skills.length === 0) {
        return null;
    }

    return (
        <div aria-label="Technology highlights" className="group relative my-5 flex w-full overflow-hidden border-y border-neutral-800 bg-black/95 font-sans text-white">
            <SliderTrack skills={skills} />
            <SliderTrack skills={skills} hidden />
        </div>
    )
}