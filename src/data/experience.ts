export interface ExperienceEntry {
    role: string;
    company: string;
    companyMark?: string;
    employmentType?: string;
    workMode?: string;
    location: string;
    locationUrl?: string;
    /** Shown in the date badge (e.g. full range) */
    period: string;
    /** Short sub-label for the badge, e.g. duration */
    tenureBadge?: string;
    /** One-line positioning statement */
    summary: string;
    /** Outcome-focused bullets — what you shipped and how you worked */
    highlights?: string[];
    /** Stack and tools for this role */
    tech?: string[];
    /** Label for the optional list of technologies or focus areas */
    techLabel?: string;
}

export const experience: ExperienceEntry[] = [
    {
        role: "Software Engineer",
        company: "Thinkify Labs",
        companyMark: "TL",
        employmentType: "Full-time",
        workMode: "Hybrid",
        location: "Bengaluru, Karnataka, India",
        locationUrl:
            "https://www.google.com/maps/search/Thinkify+Labs+Bengaluru",
        period: "September 2026 – Present",
        tenureBadge: "Present",
        summary:
            "Working as a Software Engineer at Thinkify Labs, building AI agents and intelligent automation solutions to solve real-world problems. Developing practical AI-driven applications, exploring modern technologies, and contributing to the design and implementation of intelligent systems.",
        highlights: [
            "AI agent development and intelligent automation for practical, real-world workflows.",
            "Building AI-powered applications with full-stack engineering practices.",
            "Problem solving through thoughtful software engineering and iterative implementation.",
        ],
        tech: [
            "AI Agent Development",
            "Intelligent Automation",
            "AI-Powered Applications",
            "Full-Stack Development",
            "Problem Solving",
            "Software Engineering",
        ],
        techLabel: "Focus areas",
    },
    {
        role: "Software Development Engineering Intern",
        company: "Tally Solutions Pvt Ltd",
        location: "Bengaluru, India",
        locationUrl:
            "https://www.google.com/maps/search/Tally+Solutions+Pvt+Ltd+Bengaluru",
        period: "Jun 2026 – Aug 2026",
        tenureBadge: "3 months",
        summary:
            "Contributing to enterprise-grade software development, focusing on high-performance logic, database optimization, and modular code architecture.",
    },
    {
        role: "Full Stack Developer — Student Intern",
        company: "Inventech Info Solutions Pvt Ltd",
        location: "Bengaluru, India",
        locationUrl:
            "https://www.google.com/maps/search/Inventech+Info+Solutions+Pvt+Ltd+Jayanagar+Bengaluru",
        period: "Nov 2025 – Apr 2026",
        tenureBadge: "6 months",
        summary:
            "Full-stack development and system integration, utilizing cognitive tools to accelerate feature delivery and optimize codebases.",
        highlights: [
            "Built end-to-end features using React/TypeScript, NestJS-style backend architectures, and MySQL.",
            "Integrated REST APIs and secure authentication, using LLM-assisted debugging and code optimization techniques.",
            "Collaborated on iterative feature delivery, leveraging prompt engineering for rapid prototyping and clean system designs.",
        ],
        tech: [
            "React",
            "TypeScript",
            "NestJS",
            "REST APIs",
            "MySQL",
            "AI Engineering Tools",
            "Git",
        ],
    },
];
