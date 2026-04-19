import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import avatar from "@/assets/profile.jpg";

const titles = [
    "AI-Augmented Developer",
    "Full-Stack Engineer",
    "AI-Assisted Builder",
    "Prompt Engineering Practitioner"
];

export function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-[90vh] lg:h-screen flex items-center justify-center overflow-x-hidden pt-16 lg:pt-12 pb-4">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="w-full max-w-[98%] lg:max-w-[96%] xl:max-w-[94%] mx-auto px-4 md:px-8 z-10 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 items-center mt-8 lg:mt-12">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-3 lg:gap-4 text-center lg:text-left order-2 lg:order-1 relative z-10"
                    >
                        {/* Subtle Grid Background for Texture */}
                        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                        <div className="space-y-1 lg:space-y-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-sm md:text-base lg:text-lg font-light text-violet-300 tracking-wider"
                            >
                                Hi, I Am
                            </motion.div>

                            <div className="space-y-1">
                                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-none drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                    ANIL <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 animate-gradient-x drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">B V</span>
                                </h1>
                                
                                <div className="h-5 sm:h-6 lg:h-8 overflow-hidden flex items-center justify-center lg:justify-start">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={titleIndex}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-300"
                                        >
                                            {titles[titleIndex]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                
                                <div className="space-y-1 pt-0.5 lg:max-w-[95%] xl:max-w-full">
                                    <p className="text-xs md:text-sm lg:text-base text-zinc-300 mx-auto lg:mx-0 leading-snug font-medium">
                                        Building scalable web applications and intelligent developer workflows using modern full-stack technologies and AI-assisted engineering.
                                    </p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-zinc-500 mx-auto lg:mx-0 leading-snug hidden sm:block">
                                        Focused on scalable systems, intelligent workflows, and practical software solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Core Expertise Arsenal */}
                        <div className="space-y-1.5 xl:space-y-2">
                            <h3 className="text-[10px] lg:text-xs font-semibold text-zinc-500 uppercase tracking-widest">Core Expertise</h3>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 group">
                                    <Icons.layout className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs lg:text-sm text-zinc-300 group-hover:text-white transition-colors">Web Systems</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group">
                                    <Icons.server className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs lg:text-sm text-zinc-300 group-hover:text-white transition-colors">Backend Architecture</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300 group">
                                    <Icons.database className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs lg:text-sm text-zinc-300 group-hover:text-white transition-colors">Data Systems</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 group">
                                    <Icons.brain className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs lg:text-sm text-zinc-300 group-hover:text-white transition-colors">AI-Driven Devel.</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Card */}
                        <div className="glass-card p-3 lg:p-4 mx-auto lg:mx-0 w-full backdrop-blur-md border-white/5 bg-white/[0.02] rounded-2xl relative group hover:border-violet-500/30 transition-colors">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs xl:text-sm">
                                {/* Address */}
                                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors min-w-0 cursor-default">
                                    <div className="p-1.5 shrink-0 rounded-lg bg-violet-500/10 text-violet-400">
                                        <Icons.mapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    </div>
                                    <span className="truncate">Byagadihalli, Hassan - 573123</span>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors min-w-0 cursor-default">
                                    <div className="p-1.5 shrink-0 rounded-lg bg-violet-500/10 text-violet-400">
                                        <Icons.mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    </div>
                                    <span className="truncate">anilgowda3103@gmail.com</span>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors min-w-0 cursor-default">
                                    <div className="p-1.5 shrink-0 rounded-lg bg-violet-500/10 text-violet-400">
                                        <Icons.phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    </div>
                                    <span className="whitespace-nowrap">+91 6360634863</span>
                                </div>

                                {/* Socials */}
                                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors min-w-0">
                                    <div className="p-1.5 shrink-0 rounded-lg bg-violet-500/10 text-violet-400">
                                        <Icons.share className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a href="https://www.linkedin.com/in/anil-bv-2704a8351" target="_blank" rel="noreferrer" className="p-1 rounded-md hover:bg-white/10 transition-colors">
                                            <Icons.linkedin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                        </a>
                                        <a href="https://www.google.com" target="_blank" rel="noreferrer" className="p-1 rounded-md hover:bg-white/10 transition-colors">
                                            <Icons.github className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 lg:gap-4 justify-center lg:justify-start pt-1 lg:pt-2">
                            <Button asChild className="h-10 lg:h-11 px-6 lg:px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-sm lg:text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95">
                                <a href="/Anil_BV.pdf" download="Anil_BV.pdf">
                                    Download Resume
                                    <Icons.download className="ml-2 w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="h-10 lg:h-11 px-6 lg:px-8 rounded-full border-white/10 bg-black/40 hover:bg-white/10 text-white text-sm lg:text-base hover:text-violet-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-violet-500/50 transition-all duration-300 hover:scale-[1.03] active:scale-95">
                                <a href="#projects">
                                    View Projects
                                    <Icons.arrowLeft className="ml-2 w-3.5 h-3.5 lg:w-4 lg:h-4 rotate-180" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        transition={{ 
                            opacity: { duration: 0.8 },
                            scale: { duration: 0.8 },
                            y: { repeat: Infinity, duration: 6, ease: "easeInOut" } 
                        }}
                        className="relative flex justify-center order-1 lg:order-2 w-full lg:w-11/12 xl:w-full mx-auto"
                    >
                        <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] aspect-[4/5] lg:aspect-square">
                            {/* Rotating Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="absolute inset-0 border border-violet-500/20 rounded-[3rem] rotate-6 scale-110"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                                className="absolute inset-0 border border-indigo-500/20 rounded-[3rem] -rotate-3 scale-105"
                            />

                            {/* Main Image Container */}
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.3)] glass-card group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                <img
                                    src={avatar}
                                    alt="Anil B V"
                                    className="w-full h-full object-cover filter contrast-125 saturate-110 brightness-105 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:saturate-125"
                                />
                                {/* subtle inner glow */}
                                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(139,92,246,0.2)] pointer-events-none z-20 rounded-[2.5rem]"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
