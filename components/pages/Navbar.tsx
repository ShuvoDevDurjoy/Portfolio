import Link from "next/link";


export default function Navbar() {
    return (
        <div className="navbar_container font-mono text-gray-500 bg-red relative static top-0 sticky bg-white/10 z-10 backdrop-blur-md">
            <div className="p-2 m-auto lg:max-w-6xl flex items-center justify-between">
                <div>
                    <h2 className="font-gmono dev_name text-neutral-900 bg-gray-300/50 backdrop-blur-xl px-4 rounded-full py-2 text-xl">
                        Shuvo Dev
                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full ml-1"></span>
                    </h2>
                </div>
                <div className="flex text-neutral-900 text-sm items-center justify-center bg-gray-300/50 rounded-full px-2 backdrop-blur-xl">
                    <Link className="p-3 b-2 border-black block" href='/'>About</Link>
                    <Link className="p-3 b-2 border-black block" href='/'>Projects</Link>
                    <Link className="p-3 b-2 border-black block" href='/'>Experience</Link>
                    <Link className="p-3 b-2 border-black block" href='/'>Skills</Link>
                    <Link className="p-3 b-2 border-black block" href='/'>Writings</Link>
                    <Link className="p-3 b-2 border-black block" href='/'>Contact</Link>
                    <Link className="p-3 b-2 border-black block" href='/'>Mode</Link>
                </div>
            </div>
            <hr className="bg-gray-400 h-[1.5px]"></hr>
        </div>
    );
}