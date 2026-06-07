export interface ExperienceEntry {
    role: string;
    company: string;
    location: string;
    locationUrl?: string;
    /** Shown in the date badge (e.g. full range) */
    period: string;
    /** Short sub-label for the badge, e.g. duration */
    tenureBadge?: string;
    /** One-line positioning statement */
    summary: string;
    /** Outcome-focused bullets — what you shipped and how you worked */
    highlights: string[];
    /** Stack and tools for this role */
    tech: string[];
}

export const experience: ExperienceEntry[] = [
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
