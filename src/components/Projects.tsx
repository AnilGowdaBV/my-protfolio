import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { projects as staticProjects } from "@/data/projects";
import { Icons } from "@/components/Icons";
import { useProjects } from "@/hooks/useProjects";

const ROTATION_RANGE = 20.5;
const HALF_ROTATION_RANGE = 20.5 / 2;

const ProjectCard = ({ project, index }: { project: typeof staticProjects[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-full w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 p-[1px] group"
        >
            <div
                style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                className="relative h-full w-full rounded-xl bg-zinc-950/90 p-6 flex flex-col justify-between overflow-hidden"
            >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(#a78bfa 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                />

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <Link to={`/project/${project.id}`} className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20 text-violet-400 group-hover:text-violet-300 transition-colors cursor-pointer hover:bg-violet-500/20 z-50">
                            <Icons.folder className="w-5 h-5" />
                        </Link>
                        <div className="flex gap-2">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <Icons.github className="w-5 h-5" />
                                </a>
                            )}
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <Icons.linkedin className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-violet-400 transition-colors duration-300">
                        {project.title}
                    </h3>

                    <p className="text-sm text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="relative z-10 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export function Projects() {
    const { data: projectsData, isLoading } = useProjects();
    const projects = projectsData || [];
    const [activeIdx, setActiveIdx] = useState(0);

    // Auto-advance slideshow every 5 seconds
    useEffect(() => {
        if (projects.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [projects.length, activeIdx]);

    if (isLoading) {
        return (
            <section id="projects" className="py-24 w-full text-zinc-100 overflow-hidden relative min-h-[500px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Icons.cpu className="w-12 h-12 text-violet-500 animate-pulse" />
                    <p className="text-zinc-400 font-mono text-sm tracking-widest">LOADING_SYSTEM_DATA...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-24 w-full text-zinc-100 overflow-hidden relative">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600">
                        Featured <span className="text-white">Ware</span>
                    </h2>
                    <p className="text-zinc-400 max-w-lg mx-auto">
                        A selection of projects that push the boundaries of what's possible with modern web technologies.
                    </p>
                </motion.div >

                {/* Desktop view: standard grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {/* Mobile view: interactive slideshow carousel */}
                <div className="block md:hidden w-full max-w-[340px] mx-auto relative px-2">
                    <div className="relative w-full min-h-[350px] flex flex-col justify-between items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, info) => {
                                    const swipeThreshold = 50;
                                    if (info.offset.x < -swipeThreshold) {
                                        // Swipe left -> Next
                                        setActiveIdx((prev) => (prev + 1) % projects.length);
                                    } else if (info.offset.x > swipeThreshold) {
                                        // Swipe right -> Prev
                                        setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
                                    }
                                }}
                                className="w-full h-full select-none cursor-grab active:cursor-grabbing touch-pan-y"
                            >
                                <ProjectCard project={projects[activeIdx]} index={activeIdx} />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between w-full mt-4 px-2">
                            <button
                                onClick={() => setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length)}
                                className="p-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                            >
                                <Icons.arrowLeft className="w-4 h-4" />
                            </button>

                            {/* Dots indicators */}
                            <div className="flex gap-2">
                                {projects.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIdx(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-violet-500 w-4" : "bg-zinc-700"}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setActiveIdx((prev) => (prev + 1) % projects.length)}
                                className="p-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                            >
                                <Icons.arrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}
