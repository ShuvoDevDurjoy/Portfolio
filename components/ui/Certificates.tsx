import Image from "next/image"
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";
import Title from "./Title"


export default async function Certificate() {
    const certificates = await getPortfolioSection("certificates");
    const visibleCertificates = (certificates ?? []).filter(hasPortfolioContent);
    if (visibleCertificates.length === 0) {
        return null;
    }

    return <div className="py-8">
        <div className="max-w-6xl m-auto">
            <div className="py-8">
                <Title t_number="07" title="Certificates Achieved" description="certificates"></Title>
            </div>
            <div className="grid gap-8 md:grid-cols-2 grid-rows-2 gap2">
                {
                    visibleCertificates.map((cer, index) => {
                        return <div className="border border-neutral-400" key={`certificates_${index}`}>
                            {cer.image_url?.trim() && (
                                <div className="relative aspect-[3/2] w-full">
                                    <Image src={cer.image_url} className="h-full w-full object-cover" width={800} height={533} unoptimized alt={`${cer.title} certificate`} />
                                </div>
                            )}
                            <div className="p-2">
                                <span className="text-sm text-neutral-500">{cer.issue_date}</span>
                                <a className="block font-sans text-xl transition-colors hover:text-[#d97a5c]" href={cer.credential_url} target="_blank" rel="noreferrer">{cer.title}</a>
                                <p className="text-sm text-neutral-500">{cer.issuer}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}