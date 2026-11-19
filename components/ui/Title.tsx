


export default function Title({t_number = "00", title = "", description = "", progress = 100}: {t_number: string, title: string, description: string, progress?:number}){
    return (
        <div className="relative grid grid-cols-1 items-end justify-between gap-6 border-t border-neutral-300 pt-4 md:grid-cols-12 lg:py-6">
            <span aria-hidden="true" className="absolute left-0 top-[-1px] h-[1.5px] bg-red-500" style={{width: `${progress}%`}} />
                <div className="col-span-1 flex flex-col items-start gap-1">
                    <p className="font-gspace text-6xl text-transparent [-webkit-text-stroke:1.5px__#d97a5c] lg:text-8xl">{t_number}</p>
                    <p className="font-mono text-xs uppercase text-neutral-500">{description}</p>
                </div>
                <div className="md:col-start-6 md:col-span-7">
                    <h2 className="font-sans text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
                </div>
        </div>
    )
}