

const SKILLS = [
  "TypeScript",
  "Next.js",
  "Distributed Systems",
  "Rust",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Go",
];

function SliderTrack({hidden = false}: {hidden?: boolean}){
    return (
        <div aria-hidden={hidden} className="flex py-4 justify-around items-center min-w-full animate-marquee shrink-0 gap-8 pr-8 group-hover:[animation-play-state:paused]">
            {
                SKILLS.map((skill, index)=>{
                    return <>
                        <p key={skill}>{skill}</p>
                        <p className="text-red-500 text-xl">+</p>
                    </>
                })
            }
        </div>
    )
}

export default function Slider(){
    return (
        <div className="my-5 font-xl text-white font-sans group relative flex w-full overflow-hidden border-y bg-black/95">
            <SliderTrack></SliderTrack>
            <SliderTrack hidden></SliderTrack>
        </div>
    )
}