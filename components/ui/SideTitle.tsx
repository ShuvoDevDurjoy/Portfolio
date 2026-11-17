

export default function SideTitle({ t_number = "00", title = "", description = "" }: { t_number: string, title: string, description: string }) {
    return <div className="gap-2 flex flex-col">
        <hr aria-hidden="true" className={`bg-red-500 absolute top-0 left-0 h-[1.5px]`}></hr>
        <div className="col-span-1 flex flex-col gap-1 items-start justify-begin">
            <p className="text-normal text-8xl font-gspace text-transparent [-webkit-text-stroke:1.5px__#d97a5c]">{t_number}</p>
            <p className="font-mono text-neutral-500 text-xs uppercase">{description}</p>
        </div>
        <div className="col-start-5 col-span-7">
            <h1 className="font-sans text-4xl">{title}</h1>
        </div>
    </div>
}