import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { skills } from "@/data/skills";
import { Icons } from "@/components/Icons";

// Category colour identity — violet/indigo spectrum to match portfolio
const PALETTES = [
    { accent: "#8b5cf6", from: "from-violet-500", to: "to-purple-600", glow: "rgba(139,92,246,0.15)" },
    { accent: "#6366f1", from: "from-indigo-500", to: "to-blue-600", glow: "rgba(99,102,241,0.15)" },
    { accent: "#a855f7", from: "from-purple-500", to: "to-fuchsia-600", glow: "rgba(168,85,247,0.15)" },
    { accent: "#8b5cf6", from: "from-violet-500", to: "to-indigo-600", glow: "rgba(139,92,246,0.15)" },
    { accent: "#7c3aed", from: "from-violet-600", to: "to-purple-700", glow: "rgba(124,58,237,0.15)" },
    { accent: "#4f46e5", from: "from-indigo-600", to: "to-violet-700", glow: "rgba(79,70,229,0.15)" },
    { accent: "#9333ea", from: "from-purple-600", to: "to-violet-600", glow: "rgba(147,51,234,0.15)" },
];

const SLIDE = {
    enter: (dir: number) => ({ x: dir > 0 ? "35%" : "-35%", opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-35%" : "35%", opacity: 0, scale: 0.96 }),
};

const PILL_STAGGER = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const PILL_ITEM: any = {
    hidden: { opacity: 0, y: 20, scale: 0.88 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

export function Skills() {
    const [active, setActive] = useState(0);
    const [dir, setDir] = useState(1);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((idx: number) => {
        setDir(idx >= active ? 1 : -1);
        setActive(idx);
    }, [active]);

    const next = useCallback(() => {
        setDir(1);
        setActive(p => (p + 1) % skills.length);
    }, []);

    const prev = useCallback(() => {
        setDir(-1);
        setActive(p => (p - 1 + skills.length) % skills.length);
    }, []);

    // Auto-rotate every 4 s, paused on hover
    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, 4000);
        return () => clearInterval(t);
    }, [paused, next]);

    const cat = skills[active];
    const palette = PALETTES[active % PALETTES.length];
    const iconKey = cat.icon.trim();
    let Icon = Icons[iconKey as keyof typeof Icons];
    if (!Icon) Icon = Icons.code;

    return (
        <section
            id="skills"
            className="py-16 relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* ── Ambient background glow that changes colour per category ── */}
            <motion.div
                key={`glow-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 pointer-events-none -z-10"
                style={{
                    background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${palette.glow}, transparent)`,
                }}
            />

            <div className="container px-4 mx-auto max-w-6xl">

                {/* ── Section header ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-block mb-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-xs font-medium text-zinc-300 tracking-wider uppercase">Expertise</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600">
                        SKILL MATRIX
                    </h2>
                </motion.div>

                {/* ── Main stage ──────────────────────────────────────────── */}
                <div className="relative min-h-[300px] flex flex-col items-center justify-center">

                    {/* Subtle dot grid for depth with masking to blend into background */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" style={{ maskImage: "radial-gradient(ellipse 45% 45% at 50% 50%, #000 10%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 45% 45% at 50% 50%, #000 10%, transparent 80%)" }} />

                    {/* Prev / Next arrows — larger & glowing */}
                    {[
                        { fn: prev, label: "←", side: "left-0 md:-left-16" },
                        { fn: next, label: "→", side: "right-0 md:-right-16" },
                    ].map(({ fn, label, side }) => (
                        <motion.button
                            key={label}
                            onClick={fn}
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.95 }}
                            className={`absolute top-1/2 -translate-y-1/2 ${side} z-20 w-12 h-12 rounded-full border border-white/20 bg-white/[0.06] hover:border-white/40 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xl font-bold backdrop-blur-sm`}
                            style={{ boxShadow: `0 0 20px ${palette.accent}33` }}
                        >
                            {label}
                        </motion.button>
                    ))}

                    {/* Animated category panel */}
                    <AnimatePresence custom={dir} mode="wait">
                        <motion.div
                            key={active}
                            custom={dir}
                            variants={SLIDE}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full flex flex-col items-center text-center gap-5 px-10"
                        >
                            {/* ── Counter ── */}
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: palette.accent + "99" }}>category</span>
                                <span className="text-2xl font-black font-mono tabular-nums" style={{ color: palette.accent }}>
                                    {String(active + 1).padStart(2, "0")}
                                </span>
                                <span className="text-zinc-700 font-mono text-lg">/</span>
                                <span className="text-lg font-bold font-mono text-zinc-600">{String(skills.length).padStart(2, "0")}</span>
                            </div>

                            {/* ── Icon with rotating orbit ring ── */}
                            <div className="relative flex items-center justify-center">
                                {/* Outer rotating ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-28 h-28 rounded-full border border-dashed"
                                    style={{ borderColor: palette.accent + "44" }}
                                />
                                {/* Inner pulsing glow */}
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-20 h-20 rounded-full blur-xl"
                                    style={{ background: palette.accent + "55" }}
                                />
                                {/* Icon box */}
                                <motion.div
                                    initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${palette.from} ${palette.to} z-10`}
                                    style={{ boxShadow: `0 0 40px ${palette.accent}66` }}
                                >
                                    <Icon className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>

                            {/* ── Giant category name ── */}
                            <motion.h3
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08, duration: 0.4 }}
                                className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r ${palette.from} ${palette.to} bg-clip-text text-transparent leading-none`}
                            >
                                {cat.title}
                            </motion.h3>

                            {/* ── Divider line ── */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.18, duration: 0.5, ease: "circOut" }}
                                className={`h-[2px] w-32 bg-gradient-to-r ${palette.from} ${palette.to} rounded-full`}
                            />

                            {/* ── Skill pills (staggered) ── */}
                            <motion.div
                                key={`pills-${active}`}
                                variants={PILL_STAGGER}
                                initial="hidden"
                                animate="show"
                                className="flex flex-wrap justify-center gap-2.5 max-w-2xl"
                            >
                                {cat.skills.map((skill, i) => (
                                    <motion.span
                                        key={i}
                                        variants={PILL_ITEM}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border text-zinc-200 bg-white/[0.05] cursor-default transition-colors hover:bg-white/10"
                                        style={{ borderColor: palette.accent + "44" }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── Category dot nav + progress bar ──────────────────────── */}
                <div className="mt-8 flex flex-col items-center gap-3">

                    {/* Progress bar */}
                    {!paused && (
                        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                key={`bar-${active}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4, ease: "linear" }}
                                className={`h-full bg-gradient-to-r ${palette.from} ${palette.to} rounded-full`}
                            />
                        </div>
                    )}

                    {/* Dot indicators */}
                    <div className="flex items-center gap-2">
                        {skills.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className="transition-all duration-300"
                                aria-label={`Go to ${skills[i].title}`}
                            >
                                <motion.div
                                    animate={{
                                        width: i === active ? 24 : 6,
                                        opacity: i === active ? 1 : 0.3,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`h-1.5 rounded-full bg-gradient-to-r ${PALETTES[i % PALETTES.length].from} ${PALETTES[i % PALETTES.length].to}`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Category quick-nav labels */}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                        {skills.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border transition-all duration-200 ${i === active
                                    ? "text-white border-white/30 bg-white/10"
                                    : "text-zinc-600 border-white/5 hover:text-zinc-300 hover:border-white/15"
                                    }`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
