export interface PortfolioProfile {
    id: string;
    full_name: string;
    username: string;
    headline: string;
    tagline: string;
    bio: string;
    about: string;
    email: string;
    location: string;
    github_url: string;
    linkedin_url: string;
    twitter_url: string;
    avatar_url: string;
    is_hirable: boolean;
    availability: string;
    university: string;
    degree: string;
    gpa: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface CompetitiveStats {
    leetcode_url: string;
    leetcode_rating: number;
    leetcode_rank: string;
    leetcode_solved: number;
    leetcode_percentile: number;
    codeforces_url: string;
    icpc_achievement: string;
}

export interface AboutSection {
    sectionNumber: number;
    sectionLabel: string;
    displayHeadline: string;
    bio: {
        lead: string;
        paragraphs: string[];
    };
    quote: string;
    metrics: { value: string; label: string; order: number }[];
    workingPrinciples: {
        heading: string;
        items: { text: string; order: number }[];
    };
}

export type EmploymentType = "Full-time" | "Internship" | "Freelance" | "Part-time" | "";

export interface ExperienceItem {
    id: string;
    company_name: string;
    role: string;
    employment_type: EmploymentType;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    highlights: string[];
    skill_ids: string[];
    display_order: number;
}

export interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    field_of_study: string;
    gpa: string;
    start_date: string;
    end_date: string;
    honors: string;
    relevant_coursework: string[];
    display_order: number;
}

export type ProjectMedia =
    | { type: "image"; url: string; alt: string }
    | { type: "video"; url: string; title: string; poster?: string };

export type PortfolioContentBlock =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "image"; url: string; alt: string; caption?: string }
    | { type: "gallery"; items: ProjectMedia[]; caption?: string }
    | { type: "video"; url: string; title: string; poster?: string; caption?: string }
    | { type: "code"; language: string; code: string; caption?: string }
    | { type: "quote"; text: string; attribution?: string };

export interface PortfolioProject {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    summary: string;
    description: string;
    repo_url: string;
    demo_url: string | null;
    thumbnail_url: string;
    is_featured: boolean;
    display_order: number;
    category: string;
    metrics: string[];
    technologies: string[];
    media?: ProjectMedia[];
    content_blocks?: PortfolioContentBlock[];
}

export interface PortfolioBlog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    reading_time: string;
    tags: string[];
    cover: string;
    media?: ProjectMedia[];
    content_blocks?: PortfolioContentBlock[];
}

export type SkillCategory = "Languages" | "Frameworks" | "Tools" | "Soft Skills" | "";
export type SkillLevel = "Advanced" | "Intermediate" | "Familiar" | "";

export interface SkillItem {
    id: string;
    name: string;
    level: SkillLevel;
    note: string;
}

export interface SkillGroup {
    id: number;
    category: SkillCategory;
    items: SkillItem[];
}

export type AchievementCategory = "Competitive Programming" | "Hackathon" | "Academic" | "Open Source" | "";

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: AchievementCategory;
    icon: string;
    year: string;
    highlight: string;
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issue_date: string;
    credential_url: string;
    credential_id: string;
    image_url: string;
    type: string;
}

export interface Course {
    id: string;
    title: string;
    platform: string;
    completed: string;
    topics: string[];
    hours: string;
}

export interface PortfolioSectionContent {
    profile: PortfolioProfile;
    social_links: SocialLink[];
    competitive_stats: CompetitiveStats;
    about: AboutSection;
    projects: PortfolioProject[];
    blogs: PortfolioBlog[];
    skills: SkillGroup[];
    experience: ExperienceItem[];
    education: EducationItem[];
    achievements: Achievement[];
    certificates: Certificate[];
    courses: Course[];
}

export type PortfolioSectionKey = keyof PortfolioSectionContent;

export const portfolioSectionKeys: PortfolioSectionKey[] = [
    "profile",
    "social_links",
    "competitive_stats",
    "about",
    "projects",
    "blogs",
    "skills",
    "experience",
    "education",
    "achievements",
    "certificates",
    "courses",
];

export const portfolioSectionFormSchema: PortfolioSectionContent = {
    profile: {
        id: "",
        full_name: "",
        username: "",
        headline: "",
        tagline: "",
        bio: "",
        about: "",
        email: "",
        location: "",
        github_url: "",
        linkedin_url: "",
        twitter_url: "",
        avatar_url: "",
        is_hirable: false,
        availability: "",
        university: "",
        degree: "",
        gpa: "",
    },
    social_links: [{ name: "", url: "", icon: "" }],
    competitive_stats: {
        leetcode_url: "",
        leetcode_rating: 0,
        leetcode_rank: "",
        leetcode_solved: 0,
        leetcode_percentile: 0,
        codeforces_url: "",
        icpc_achievement: "",
    },
    about: {
        sectionNumber: 0,
        sectionLabel: "",
        displayHeadline: "",
        bio: { lead: "", paragraphs: [""] },
        quote: "",
        metrics: [{ value: "", label: "", order: 0 }],
        workingPrinciples: {
            heading: "",
            items: [{ text: "", order: 0 }],
        },
    },
    projects: [{
        id: "",
        title: "",
        subtitle: "",
        slug: "",
        summary: "",
        description: "",
        repo_url: "",
        demo_url: null,
        thumbnail_url: "",
        is_featured: false,
        display_order: 0,
        category: "",
        metrics: [""],
        technologies: [""],
        media: [{ type: "image", url: "", alt: "" }],
        content_blocks: [{ type: "heading", text: "" }],
    }],
    blogs: [{
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        date: "",
        reading_time: "",
        tags: [""],
        cover: "",
        media: [{ type: "image", url: "", alt: "" }],
        content_blocks: [{ type: "heading", text: "" }],
    }],
    skills: [{
        id: 0,
        category: "",
        items: [{ id: "", name: "", level: "", note: "" }],
    }],
    experience: [{
        id: "",
        company_name: "",
        role: "",
        employment_type: "",
        location: "",
        start_date: "",
        end_date: null,
        is_current: false,
        description: "",
        highlights: [""],
        skill_ids: [""],
        display_order: 0,
    }],
    education: [{
        id: "",
        institution: "",
        degree: "",
        field_of_study: "",
        gpa: "",
        start_date: "",
        end_date: "",
        honors: "",
        relevant_coursework: [""],
        display_order: 0,
    }],
    achievements: [{
        id: "",
        title: "",
        description: "",
        category: "",
        icon: "",
        year: "",
        highlight: "",
    }],
    certificates: [{
        id: "",
        title: "",
        issuer: "",
        issue_date: "",
        credential_url: "",
        credential_id: "",
        image_url: "",
        type: "",
    }],
    courses: [{
        id: "",
        title: "",
        platform: "",
        completed: "",
        topics: [""],
        hours: "",
    }],
};
