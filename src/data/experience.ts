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
            "Full-stack delivery: UI, REST integrations, and shipping features with code review and iteration.",
        highlights: [
            "Built end-to-end features with React/TypeScript, NestJS-style APIs, and MySQL.",
            "REST integrations, auth-aware flows, and cross-stack debugging with Git-based reviews.",
            "Iterative delivery with the team — scope, ship, and refine UX from feedback.",
        ],
        tech: [
            "React",
            "TypeScript",
            "NestJS",
            "REST APIs",
            "MySQL",
            "Git",
            "Tailwind CSS",
        ],
    },
];
