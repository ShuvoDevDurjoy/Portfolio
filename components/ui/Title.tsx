


export default function Title({t_number = "00", title = "", description = "", progress = 100}: {t_number: string, title: string, description: string, progress?:number}){
    return (
        <div className={`title_container_${t_number}`}>
            <div className="max-w-6xl lg:py-6 m-auto grid relative grid-cols-1 gap-2 md:grid-cols-12 items-begin justify-between gap-6">
                <hr aria-hidden="true" className={`bg-red-500 absolute top-0 left-0 h-[1.5px]`} style={{width: `${progress}`}}></hr>
                <div className="col-span-1 flex flex-col gap-1 items-start justify-begin">
                    <p className="text-normal text-6xl lg:text-8xl font-gspace text-transparent [-webkit-text-stroke:1.5px__#d97a5c]">{t_number}</p>
                    <p className="font-mono text-neutral-500 text-xs uppercase">{description}</p>
                </div>
                <div className="md:col-start-6 md:col-span-7">
                    <h1 className="font-sans text-3xl lg:text-5xl">{title}</h1>
                </div>
            </div>

        </div>
    )
}