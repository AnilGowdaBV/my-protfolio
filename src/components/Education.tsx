import { motion } from "framer-motion";
import { education } from "@/data/education";
import { Icons } from "@/components/Icons";

export function Education() {
    return (
        <section id="education" className="py-24 w-full container px-4 md:px-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600 inline-block">
                    My Journey
                </h2>
                <p className="text-zinc-400 max-w-sm mx-auto text-sm">
                    Academic milestones that paved the path for my technical career.
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto relative">
                {/* Timeline Line - adjusted position */}
                <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-violet-500 via-indigo-500/50 to-transparent hidden md:block" />

                <div className="space-y-8">
                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                            className="relative md:pl-12 group"
                        >
                            {/* Timeline Dot - Smaller and tighter */}
                            <div className="absolute left-[4px] top-6 w-6 h-6 rounded-full border-[3px] border-zinc-950 bg-violet-500 z-10 hidden md:block shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-transform duration-300 group-hover:scale-125" />

                            <motion.div
                                whileHover={{ y: -3, scale: 1.005 }}
                                className="glass-card p-5 md:p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-violet-500/30 transition-all duration-300 shadow-lg relative overflow-hidden"
                            >
                                {/* Active State Border Gradient */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-4 md:gap-8 items-start">
                                    <div className="space-y-2">

                                        {/* Mobile Header (Year & Grade) */}
                                        <div className="md:hidden flex items-center justify-between mb-3">
                                            <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 text-xs font-mono border border-violet-500/20">
                                                {edu.year}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-white/5 text-[11px] font-mono text-zinc-300">
                                                {edu.score}
                                            </span>
                                        </div>

                                        <h3 className="text-[17px] sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                                            {edu.degree}
                                        </h3>

                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm sm:text-base text-violet-200/80 font-medium">
                                                {edu.college}
                                            </span>
                                            <span className="text-xs sm:text-sm text-zinc-400">
                                                {edu.university}
                                            </span>
                                        </div>

                                        {/* Compact Location Link */}
                                        {edu.locationUrl && (
                                            <a
                                                href={edu.locationUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-violet-400 mt-2 transition-colors w-fit py-1 px-2 -ml-2 rounded-lg hover:bg-white/5"
                                            >
                                                <Icons.mapPin className="w-3.5 h-3.5" />
                                                <span>{edu.location}</span>
                                            </a>
                                        )}
                                    </div>

                                    <div className="hidden md:flex flex-col items-end gap-3 text-right">
                                        <span className="px-3 py-1 rounded-full bg-zinc-800/50 border border-white/5 text-xs font-mono text-zinc-400 group-hover:text-violet-300 group-hover:border-violet-500/20 transition-all">
                                            {edu.year}
                                        </span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Grade</span>
                                            <span className="text-base font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-white">
                                                {edu.score}
                                            </span>
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
