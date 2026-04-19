import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";

export function About() {
    return (
        <section id="about" className="py-12 md:py-16 w-full max-w-[min(100%,1400px)] mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    About <span className="text-violet-500">Me</span>
                </h2>
                <div className="max-w-3xl text-zinc-400 text-lg leading-relaxed space-y-6">
                    <p>
                        I’m a <span className="text-white font-bold">developer</span> who focuses on building efficient solutions by combining <span className="text-violet-400 font-medium">strong engineering fundamentals</span> with modern <span className="text-indigo-400 font-medium">AI-assisted development</span>. I actively work with AI systems, prompt engineering, and intelligent tooling to accelerate development, solve complex problems, and explore new ways of building software.
                    </p>
                    <p>
                        My approach to development is driven by <span className="text-white font-medium">curiosity, experimentation, and continuous improvement</span>. I enjoy breaking down complex systems, refining workflows, and finding smarter ways to design and build scalable applications.
                    </p>
                    <p>
                        I believe the future of software development lies in engineers who can <span className="text-zinc-200 font-medium">think critically</span>, understand systems deeply, and <span className="text-violet-400 font-medium">effectively collaborate with AI</span> to build faster, better, and more resilient solutions.
                    </p>
                </div>
            </motion.div>

            <div className="mt-20 md:mt-24 mb-10 md:mb-12 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                    How I Build <span className="text-violet-500">Software</span>
                </h2>
                <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed px-2">
                    My approach to building reliable, scalable, and intelligent software systems.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 w-full">
                {[
                    {
                        icon: Icons.terminal,
                        title: "Clean Engineering",
                        description: "Writing maintainable, well-structured code with strong fundamentals and clear system design.",
                        color: "from-cyan-400 to-blue-500",
                        shadow: "shadow-cyan-500/20",
                        border: "group-hover:border-cyan-500/50",
                        hoverGlow: "group-hover:shadow-cyan-500/15",
                    },
                    {
                        icon: Icons.brain,
                        title: "AI & Automation",
                        description: "Leveraging AI-assisted workflows and prompt engineering to accelerate development and improve problem solving.",
                        color: "from-violet-400 to-fuchsia-500",
                        shadow: "shadow-violet-500/20",
                        border: "group-hover:border-violet-500/50",
                        hoverGlow: "group-hover:shadow-violet-500/15",
                    },
                    {
                        icon: Icons.code,
                        title: "Modern Tech Stack",
                        description: "Building scalable applications using modern frameworks such as React, NestJS, and Python.",
                        color: "from-pink-400 to-rose-500",
                        shadow: "shadow-pink-500/20",
                        border: "group-hover:border-pink-500/50",
                        hoverGlow: "group-hover:shadow-pink-500/15",
                    },
                    {
                        icon: Icons.cpu,
                        title: "Intelligent Systems",
                        description: "Designing systems that simplify complex workflows through automation and thoughtful architecture.",
                        color: "from-amber-400 to-orange-500",
                        shadow: "shadow-amber-500/20",
                        border: "group-hover:border-amber-500/50",
                        hoverGlow: "group-hover:shadow-amber-500/15",
                    },
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`group relative p-7 md:p-8 rounded-3xl border border-white/[0.07] bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur-sm transition-all duration-500 overflow-hidden ${feature.border} hover:shadow-2xl ${feature.hoverGlow} hover:-translate-y-1.5`}
                    >
                        {/* Hover Gradient Bloom */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-15 bg-gradient-to-br ${feature.color} transition-opacity duration-500 pointer-events-none`} />

                        {/* Top Accent Line */}
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                        <div className="relative z-10 flex flex-col items-center text-center h-full">
                            {/* Icon Container */}
                            <div className={`mb-6 p-4 rounded-2xl bg-zinc-950 border border-white/10 ${feature.shadow} shadow-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                                <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr ${feature.color}`} />
                                <feature.icon className="w-8 h-8 text-white relative z-10" />
                            </div>

                            <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-[15px] md:text-base text-zinc-300/95 leading-relaxed group-hover:text-zinc-100 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Visual Divider */}
            <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent mt-12 opacity-50" />
        </section>
    );
}
