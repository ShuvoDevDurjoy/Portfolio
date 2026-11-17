import SideTitle from "../ui/SideTitle";




export default function Contact() {
    return <section>
        <div className="max-w-6xl m-auto py-8 grid grid-cols-12">
            <div className="md:col-span-5 flex flex-col gap-4">
                <div className="">
                    <p className="flex gap-2 items-end">
                        <span className="text-2xl font-gspace text-transparent [-webkit-text-stroke:1px__#d97a5c]">10</span>
                        <span className="font-gspace text-neutral-500">Contact</span>
                    </p>
                    <h2 className="text-normal font-sans text-3xl lg:text-5xl">Have a problem worth solving?</h2>
                </div>
                <p className="text-neutral-500 text-sm font-gspace">I’m open to software engineering roles, internships, and thoughtful collaborations. Tell me what you’re working on.</p>
            </div>
            <div className="md:col-start-7 md:col-span-6">
                <form className="gap-2 flex-col flex justify-between">
                    <div className="py-4 flex flex-col gap-2">
                        <label className="text-neutral-500 text-sm uppercase font-gmono">Name</label>
                        <input className="border-trasparent border-b outline-none font-gspace text-neutral-500" name="title" type="text"></input>
                    </div>
                    <div className="flex py-4 flex-col gap-2">
                        <label htmlFor="title" className="text-neutral-500 text-sm uppercase font-gmono">title</label>
                        <input className="border-trasparent border-b outline-none font-gspace text-neutral-500" name="title" type="text"></input>
                    </div>
                    <div className=" py-4 flex flex-col gap-2">
                        <label htmlFor="email" className="text-neutral-500 text-sm uppercase font-gmono">email</label>
                        <input className="border-trasparent border-b outline-none font-gspace text-neutral-500" name="email" type="text"></input>
                    </div>
                    <div className="py-4 flex flex-col gap-2">
                        <label htmlFor="message" className="text-neutral-500 text-sm uppercase font-gmono">message</label>
                        <textarea className="border-trasparent border-b outline-none font-gspace text-neutral-500" name="message"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </section>
}