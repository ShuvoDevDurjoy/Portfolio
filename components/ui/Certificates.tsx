import Image from "next/image"
import { certificates } from "../data"
import Title from "./Title"


export default function Certificate() {
    return <div className="py-8">
        <div className="max-w-6xl m-auto">
            <div className="py-8">
                <Title t_number="07" title="Certificates Achieved" description="certificates"></Title>
            </div>
            <div className="grid gap-8 md:grid-cols-2 grid-rows-2 gap2">
                {
                    certificates.map((cer, index) => {
                        return <div className="border border-neutral-400" key={`certificates_${index}`}>
                            <div className="w-full relative aspect-[3/2]">
                                <Image src='/images/image.png' className="object-cover w-full h-full" width = {400} height={400} alt={`cer_img_${index}`}></Image>
                            </div>
                            <div className="p-2">
                                <span className="text-sm text-neutral-500">{cer.issue_date}</span>
                                <a className="block font-sans text-xl" href='/'>{cer.title}</a>
                                <p className="text-sm text-neutral-500">{cer.issuer}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}