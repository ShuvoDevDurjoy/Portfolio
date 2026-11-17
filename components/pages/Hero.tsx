import Image from "next/image";
import HeroPortrait from "../HeroPortrait";


export default function Hero(){
    return (
        <div className="items-center mb-10">
            <div className="max-w-6xl py-10 m-auto grid grid-cols-1 gap-12 lg:grid-cols-12 justify-between">
                <div className=" gap-2 font-sans flex flex-col justify-between items-start col-span-1 lg:pt-8 lg:col-span-9">
                    <p className="font-mono flex gap-2 items-center text-gray-500 uppercase text-[14px] block"><span className="w-2 rounded-full inline-block aspect-square bg-red-500"></span> Open to Internships & Full-Time Roles</p>
                    <p className="font-gmono mt-3 uppercase flex items-start gap-2 text-[14px]"><span className="text-red-500">Shuvo Dev</span> <span>/</span> <span>Software engineer</span></p>
                    <h1 className="my-1 flex leading-[1.0] tracking-[-0.03em] font-normal flex-col font-sans text-7xl "><span>Building dependable </span> <span>systems</span> <span className="text-gray-400">for the real world.</span></h1>
                    <div className="h-[1px] w-full bg-black/20 my-3"></div>
                    <div className="grid sm:grid-cols-12 grid-cols-1 items-end gap-8">
                        <p className="font-sans text-neutral-500 font-normal text-[18px] sm:col-span-6">I’m a computer science student and competitive programmer focused on distributed systems, high-throughput software, and products that remain clear under complexity.</p>
                        <div className="sm:col-span-6 grid font-mono grid-cols-2 gap-2">
                            <div className="bg-black flex items-center justify-between hover:bg-red-600 hover:duration-200 transition duration-200 text-white px-4 text-xs py-3">Selected Work</div>
                            <div className="px-4 py-3 border-gray-400 text-xs border-2">Get in <br></br>Touch</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <HeroPortrait></HeroPortrait>
                </div>
            </div>
        </div>
    )
}