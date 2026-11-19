import About from "@/components/pages/About";
import Hero from "@/components/pages/Hero";
import Navbar from "@/components/pages/Navbar";
import Projects from "@/components/pages/Projects";
import Contact from "@/components/pages/Contact";
import Skills from "@/components/pages/Skills";
import Slider from "@/components/Slider";
import Blogs from "@/components/pages/Blogs";
import { getPortfolioSection, hasPortfolioContent } from "@/lib/portfolio-content";


export default async function Home(){
    const [
        profile,
        about,
        projects,
        socialLinks,
        skills,
        experience,
        education,
        achievements,
        certificates,
        courses,
        blogs,
        competitiveStats,
    ] = await Promise.all([
        getPortfolioSection("profile"),
        getPortfolioSection("about"),
        getPortfolioSection("projects"),
        getPortfolioSection("social_links"),
        getPortfolioSection("skills"),
        getPortfolioSection("experience"),
        getPortfolioSection("education"),
        getPortfolioSection("achievements"),
        getPortfolioSection("certificates"),
        getPortfolioSection("courses"),
        getPortfolioSection("blogs"),
        getPortfolioSection("competitive_stats"),
    ]);
    const showSkills = [skills, experience, education, achievements, certificates, courses, competitiveStats].some(hasPortfolioContent);
    const showProjects = Boolean(projects?.some((project) => project.title.trim() && project.slug.trim()));
    const showBlogs = Boolean(blogs?.some((blog) => blog.title.trim() && blog.slug.trim()));
    const navLinks = [];
    if (hasPortfolioContent(about)) navLinks.push({ href: "/#about", label: "About" });
    if (showProjects || hasPortfolioContent(socialLinks)) navLinks.push({ href: "/#projects", label: showProjects ? "Projects" : "Connect" });
    if (hasPortfolioContent(experience)) navLinks.push({ href: "/#experience", label: "Experience" });
    if (showSkills) navLinks.push({ href: "/#skills", label: "Skills" });
    if (showBlogs) navLinks.push({ href: "/#writing", label: "Writing" });
    if (profile?.email) navLinks.push({ href: "/#contact", label: "Contact" });

    return (
        <div className="min-h-screen overflow-x-clip bg-[#faf9f6] px-4 text-neutral-900 sm:px-6 lg:px-8">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">
                Skip to content
            </a>
            <Navbar name={profile?.full_name || "Portfolio"} links={navLinks} />
            <main id="main-content" className="page-enter">
            {hasPortfolioContent(profile) && <Hero />}
            {hasPortfolioContent(skills) && <Slider />}
            {hasPortfolioContent(about) && <About />}
            {(showProjects || hasPortfolioContent(socialLinks)) && <Projects />}
            {showSkills && <Skills />}
            {showBlogs && <Blogs />}
            {Boolean(profile?.email) && <Contact />}
            </main>
        </div>
    )
}