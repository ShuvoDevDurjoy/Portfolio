

export default function SideTitle({ t_number = "00", title = "", description = "" }: { t_number: string, title: string, description: string }) {
    return <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-1">
            <p className="font-gspace text-6xl text-transparent [-webkit-text-stroke:1.5px__#d97a5c] lg:text-8xl">{t_number}</p>
            <p className="font-mono text-xs uppercase text-neutral-500">{description}</p>
        </div>
        <div>
            <h2 className="font-sans text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
        </div>
    </div>
}