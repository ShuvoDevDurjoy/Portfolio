import Certificate from "../ui/Certificates";
import Courses from "../ui/Courses";
import Education from "../ui/Education";
import Experience from "../ui/Experience";
import Recognition from "../ui/Recongnition";
import Toolkit from "../ui/Toolkit";
import CompetitiveStats from "../ui/CompetitiveStats";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";


export default async function Skills() {
    const [skills, experience, education, achievements, certificates, courses, competitiveStats] = await Promise.all([
        getPortfolioSection("skills"),
        getPortfolioSection("experience"),
        getPortfolioSection("education"),
        getPortfolioSection("achievements"),
        getPortfolioSection("certificates"),
        getPortfolioSection("courses"),
        getPortfolioSection("competitive_stats"),
    ]);

    if (![skills, experience, education, achievements, certificates, courses, competitiveStats].some(hasPortfolioContent)) {
        return null;
    }

    return <section id="skills" className="scroll-mt-24">
        <div className="max-w-6xl m-auto">
            <CompetitiveStats />
            <Toolkit></Toolkit>
            <Experience />
            <Education></Education>
            <Recognition></Recognition>
            <Certificate></Certificate>
            <Courses></Courses>
        </div>
    </section>
}