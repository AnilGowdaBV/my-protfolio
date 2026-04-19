import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Icons } from "@/components/Icons";

export function Experience() {
    return (
        <section id="experience" className="py-20 w-full container px-4 md:px-6 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-10 md:mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600 inline-block">
                    Work Experience
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full mb-3" />
                <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto leading-snug">
                    Stack, scope, and outcomes — easy to scan.
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6 relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-violet-500 via-indigo-500/50 to-transparent hidden md:block" />

                <div className="space-y-6">
                    {experience.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative md:pl-11 group"
                        >
                            <div className="absolute left-[4px] top-6 w-5 h-5 rounded-full border-2 border-zinc-950 bg-violet-500 z-10 hidden md:block shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-transform duration-300 group-hover:scale-110" />

                            <motion.div
                                whileHover={{ y: -2 }}
                                className="glass-card rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-black/50 to-transparent hover:border-violet-500/30 transition-all duration-300 shadow-xl shadow-black/30 ring-1 ring-violet-500/10 hover:ring-violet-500/20 relative overflow-hidden"
                            >
                                <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500/70 to-indigo-600" />

                                <div className="p-4 sm:p-5 md:p-6 relative">
                                    <div className="absolute inset-0 rounded-b-xl bg-gradient-to-br from-violet-500/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                            <div className="min-w-0 flex gap-2.5">
                                                <Icons.briefcase className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                                <div className="space-y-0.5 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-violet-100 transition-colors">
                                                        {job.role}
                                                    </h3>
                                                    <div className="text-sm sm:text-[15px] text-violet-200/95 font-semibold">
                                                        {job.company}
                                                    </div>
                                                    {job.locationUrl && (
                                                        <a
                                                            href={job.locationUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-violet-300 transition-colors w-fit mt-0.5"
                                                        >
                                                            <Icons.mapPin className="w-3 h-3 shrink-0" />
                                                            {job.location}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-1.5 shrink-0 sm:pt-0.5">
                                                <span className="px-2.5 py-1 rounded-md bg-violet-500/12 border border-violet-500/30 text-[11px] font-mono text-violet-100/95 whitespace-nowrap">
                                                    {job.period}
                                                </span>
                                                {job.tenureBadge && (
                                                    <span className="px-2.5 py-1 rounded-md bg-zinc-800/90 border border-white/8 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                                                        {job.tenureBadge}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-zinc-400 text-xs sm:text-sm leading-snug mb-3 pl-3 border-l-2 border-violet-500/40">
                                            {job.summary}
                                        </p>

                                        <div className="border-t border-white/5 pt-3 mb-3">
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                                                Impact & responsibilities
                                            </p>
                                            <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1.5">
                                                {job.highlights.map((line, hIdx) => (
                                                    <li
                                                        key={hIdx}
                                                        className="flex gap-2 text-[12px] sm:text-[13px] text-zinc-400 leading-snug"
                                                    >
                                                        <span className="mt-1 shrink-0 w-3.5 h-3.5 rounded-full bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                                                            <Icons.check className="w-2 h-2 text-violet-300" />
                                                        </span>
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="border-t border-white/5 pt-3">
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                                                Stack & tools
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {job.tech.map((t, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900/80 text-zinc-300 border border-violet-500/15 font-medium"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
