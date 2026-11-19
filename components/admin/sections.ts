import type { PortfolioSectionKey } from "../portfolio-schema";

export const portfolioSectionOptions: { key: PortfolioSectionKey; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "social_links", label: "Social links" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "blogs", label: "Blog posts" },
    { key: "skills", label: "Skills & toolkit" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "competitive_stats", label: "Competitive stats" },
    { key: "achievements", label: "Achievements" },
    { key: "certificates", label: "Certificates" },
    { key: "courses", label: "Courses" },
];
