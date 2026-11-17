import Link from "next/link";
import { blogs } from "../data";
import SideTitle from "../ui/SideTitle";



export default function Blogs() {
    return <section >
        <div className="py-10 max-w-6xl grid gap-10 grid-cols-1 lg:grid-cols-12 m-auto">
            <div className="col-span-6">
                <SideTitle t_number="09" title="Notes from the workbench." description="writing"></SideTitle>
            </div>
            <div className="col-span-6 border-y border-neutral-400 divide-y divide-neutral-400">
                {
                    blogs.map((blog, index) => {
                        return <div className="grid grid-cols-12 gap-6 py-5" key={`blogs_${index}`}>
                            <div className="col-span-10 flex flex-col gap-4 justify-between gap-2">
                                <div>
                                    <p className="text-neutral-700">
                                        <span>{blog.date}</span>
                                        <span className="w-1 h-1 inline-block bg-gray-500 rounded-full mx-2"></span>
                                        <span>{blog.reading_time}</span>
                                    </p>
                                    <h3 className="py-1 text-2xl">{blog.title}</h3>
                                    <p className="text-sm text-neutral-500">{blog.excerpt}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        blog.tags.map((bt, t_index) => {
                                            return <span className="text-xs text-neutral-700 px-2 py-1 bg-gray-100" key={`blog_${index}_${t_index}`}>
                                                {bt}
                                            </span>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="items-center flex col-start-11 col-span-1">
                                <Link className="bg-gray-300 px-4 text-neutral-600 font-sans py-1 rounded-full text-sm" href="/">Visit</Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </section>
}