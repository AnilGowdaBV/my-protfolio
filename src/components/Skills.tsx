import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { skills } from "@/data/skills";

const W = 1200;
const H = 520;
/* Tight side inset so the curve uses almost the full chart width */
const PAD_X = 8;
const AMP = 132;
const MID = H / 2;

const PALETTES = [
    { accent: "#a78bfa", glow: "rgba(167,139,250,0.45)" },
    { accent: "#818cf8", glow: "rgba(129,140,232,0.45)" },
    { accent: "#c084fc", glow: "rgba(192,132,252,0.45)" },
    { accent: "#a78bfa", glow: "rgba(167,139,250,0.45)" },
    { accent: "#8b5cf6", glow: "rgba(139,92,246,0.5)" },
    { accent: "#6366f1", glow: "rgba(99,102,241,0.45)" },
    { accent: "#a855f7", glow: "rgba(168,85,247,0.45)" },
];

function buildWavePath(n: number): string {
    const left = PAD_X;
    const right = W - PAD_X;
    const steps = 360;
    let d = "";
    for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        const x = left + u * (right - left);
        const y = MID - AMP * Math.cos(u * (n - 1) * Math.PI);
        d += s === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return d;
}

function wavePoints(n: number) {
    if (n <= 1) {
        return [{ x: W / 2, y: MID - AMP, isPeak: true }];
    }
    return skills.map((_, i) => {
        const u = i / (n - 1);
        const x = PAD_X + u * (W - 2 * PAD_X);
        const y = MID - AMP * Math.cos(u * (n - 1) * Math.PI);
        return { x, y, isPeak: y < MID - 2 };
    });
}

type TipPos = { left: number; top: number; flip: boolean };

export function Skills() {
    const pathD = useMemo(() => buildWavePath(skills.length), []);
    const points = useMemo(() => wavePoints(skills.length), []);

    const [hovered, setHovered] = useState<number | null>(null);
    const [pinned, setPinned] = useState<number | null>(null);
    const [tipPos, setTipPos] = useState<TipPos | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pinnedRef = useRef(pinned);
    pinnedRef.current = pinned;

    const open = hovered !== null ? hovered : pinned;

    const measureTip = useCallback(
        (idx: number) => {
            const el = chartRef.current;
            if (!el || idx < 0) return;
            const r = el.getBoundingClientRect();
            const pt = points[idx];
            if (!pt) return;

            const cx = r.left + (pt.x / W) * r.width;
            const cy = r.top + (pt.y / H) * r.height;
            // Popup is centered with translate(-50%, …) — clamp the *center* X, not the left edge
            const panelW = Math.min(300, window.innerWidth - 24);
            const halfW = panelW / 2;
            const margin = 12;
            const left = Math.max(margin + halfW, Math.min(cx, window.innerWidth - margin - halfW));

            // Peak (high): panel opens downward. Trough (low): panel opens upward.
            let flip = !pt.isPeak;
            let top = pt.isPeak ? cy + margin : cy - margin;

            if (pt.isPeak && cy > window.innerHeight - 200) {
                flip = true;
                top = cy - margin;
            }
            if (!pt.isPeak && cy < 180) {
                flip = false;
                top = cy + margin;
            }

            setTipPos({ left, top, flip });
        },
        [points],
    );

    useLayoutEffect(() => {
        if (open === null) {
            setTipPos(null);
            return;
        }
        measureTip(open);
        const onScroll = () => measureTip(open);
        const onResize = () => measureTip(open);
        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
        };
    }, [open, measureTip]);

    const close = useCallback(() => {
        setHovered(null);
        setPinned(null);
        setTipPos(null);
    }, []);

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            const t = e.target as Node;
            if (!sectionRef.current?.contains(t) && !document.getElementById("skill-floating-tip")?.contains(t)) {
                close();
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [close]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [close]);

    useEffect(
        () => () => {
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        },
        [],
    );

    const cancelLeaveTimer = () => {
        if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
        }
    };

    const handleEnter = (i: number) => {
        cancelLeaveTimer();
        setHovered(i);
    };

    const handleLeave = () => {
        cancelLeaveTimer();
        leaveTimerRef.current = setTimeout(() => {
            if (pinnedRef.current === null) setHovered(null);
        }, 140);
    };

    const handleTipEnter = () => {
        cancelLeaveTimer();
        if (open !== null) setHovered(open);
    };

    const handleTipLeave = () => {
        if (pinnedRef.current === null) setHovered(null);
    };

    const handleClick = (i: number) => {
        setPinned((p) => (p === i ? null : i));
    };

    const tipContent =
        open !== null &&
        tipPos &&
        createPortal(
            <AnimatePresence mode="wait">
                <motion.div
                    key={open}
                    id="skill-floating-tip"
                    role="tooltip"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className="fixed z-[100] pointer-events-none"
                    style={{
                        left: tipPos.left,
                        top: tipPos.top,
                    }}
                >
                    {/* Inner wrapper keeps translate(-50%) — framer must not override transform (was shifting popup to bottom-right) */}
                    <div
                        className="pointer-events-auto w-[min(calc(100vw-24px),300px)]"
                        style={{
                            transform: tipPos.flip ? "translate(-50%, calc(-100% - 12px))" : "translate(-50%, 0)",
                        }}
                        onMouseEnter={handleTipEnter}
                        onMouseLeave={handleTipLeave}
                    >
                    {/* Aurora + conic border */}
                    <div
                        className="relative rounded-2xl p-[1px] overflow-hidden"
                        style={{
                            background: `conic-gradient(from 120deg, ${PALETTES[open % PALETTES.length].accent}66, transparent 40%, ${PALETTES[open % PALETTES.length].accent}99, transparent 75%)`,
                            boxShadow: `0 0 60px -10px ${PALETTES[open % PALETTES.length].glow}, 0 25px 50px -20px rgba(0,0,0,0.85)`,
                        }}
                    >
                        <div className="rounded-2xl bg-zinc-950/90 backdrop-blur-2xl px-3.5 py-3 relative overflow-hidden">
                            <div
                                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-40 blur-3xl"
                                style={{ background: `radial-gradient(circle, ${PALETTES[open % PALETTES.length].accent} 0%, transparent 70%)` }}
                            />
                            <div
                                className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
                                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
                            />

                            <div className="relative flex items-start gap-2.5 mb-3">
                                <div
                                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-lg"
                                    style={{
                                        background: `linear-gradient(145deg, ${PALETTES[open % PALETTES.length].accent}dd, #1e1b4b)`,
                                        boxShadow: `0 0 20px ${PALETTES[open % PALETTES.length].glow}`,
                                    }}
                                >
                                    <span className="text-[11px] font-black text-white">◇</span>
                                </div>
                                <div className="min-w-0 pt-0.5">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-violet-300/80 mb-0.5">
                                        Skill cluster
                                    </p>
                                    <p className="text-sm font-bold uppercase tracking-wide text-white leading-tight">
                                        {skills[open].title}
                                    </p>
                                </div>
                            </div>

                            {/* Chips — wrap, no scrollbars */}
                            <div className="relative flex flex-wrap gap-1.5">
                                {skills[open].skills.map((s) => (
                                    <span
                                        key={s}
                                        className="inline-flex max-w-full items-center rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 text-[10px] leading-snug text-zinc-200 shadow-inner shadow-black/20"
                                        style={{ borderColor: `${PALETTES[open % PALETTES.length].accent}35` }}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </motion.div>
            </AnimatePresence>,
            document.body,
        );

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="w-full min-w-0 self-stretch py-7 md:py-10 relative overflow-x-hidden overflow-y-visible"
        >
            <div
                className="absolute inset-0 pointer-events-none -z-10 opacity-35"
                style={{
                    background:
                        "radial-gradient(ellipse 90% 55% at 50% 35%, rgba(139,92,246,0.08), transparent 60%)",
                }}
            />

            <div className="w-full max-w-[min(100%,1200px)] mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-3 md:mb-5"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 tracking-tight text-white">
                        Skill{" "}
                        <span className="text-violet-500">Matrix</span>
                    </h2>
                    <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
                        Follow the curve — hover or tap a node to explore skills.
                    </p>
                </motion.div>
            </div>

            {/* Full-width wave — only tiny side padding so labels don’t clip on small screens */}
            <div className="w-full mt-1 px-1.5 sm:px-3 md:px-4">
                <div ref={chartRef} className="relative mx-auto w-full max-w-[100vw] overflow-visible pb-4">
                    <div className="relative mx-auto w-full h-[clamp(260px,min(40vh,520px),560px)] min-h-[260px]">
                            <svg
                                viewBox={`0 0 ${W} ${H}`}
                                className="absolute inset-0 h-full w-full max-h-none drop-shadow-[0_0_36px_rgba(139,92,246,0.22)]"
                                preserveAspectRatio="xMidYMid meet"
                                aria-hidden
                            >
                                <defs>
                                    <linearGradient id="skill-wave-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                                        <stop offset="35%" stopColor="#a78bfa" stopOpacity="0.95" />
                                        <stop offset="65%" stopColor="#6366f1" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
                                    </linearGradient>
                                    <filter id="skill-wave-glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter id="skill-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                                        <feGaussianBlur stdDeviation="2.5" result="b" />
                                        <feMerge>
                                            <feMergeNode in="b" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter id="skill-label-shadow" x="-35%" y="-35%" width="170%" height="170%">
                                        <feDropShadow
                                            dx="0"
                                            dy="2"
                                            stdDeviation="2.5"
                                            floodColor="#000000"
                                            floodOpacity="0.9"
                                        />
                                    </filter>
                                </defs>

                                <path
                                    d={pathD}
                                    fill="none"
                                    stroke="url(#skill-wave-stroke)"
                                    strokeWidth="26"
                                    strokeLinecap="round"
                                    opacity="0.15"
                                    transform="translate(0, 6)"
                                />

                                <motion.path
                                    d={pathD}
                                    fill="none"
                                    stroke="url(#skill-wave-stroke)"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#skill-wave-glow)"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ pathLength: { duration: 1.6, ease: "easeInOut" }, opacity: { duration: 0.4 } }}
                                />

                                <circle r="6" fill="#f5d0fe" filter="url(#skill-dot-glow)" opacity="0.95">
                                    <animateMotion dur="16s" repeatCount="indefinite" path={pathD} rotate="auto" />
                                </circle>

                                {points.map((pt, i) => {
                                    const p = PALETTES[i % PALETTES.length];
                                    const labelAbove = pt.isPeak;
                                    const ty = labelAbove ? pt.y - 48 : pt.y + 58;
                                    const t = skills[i].title;
                                    const len = t.length;
                                    const fs =
                                        len > 24 ? 16 : len > 20 ? 18 : len > 16 ? 20 : 22;
                                    const sw = len > 22 ? 4 : 5;
                                    return (
                                        <g key={skills[i].title}>
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r="36"
                                                fill="transparent"
                                                className="cursor-pointer"
                                                onMouseEnter={() => handleEnter(i)}
                                                onMouseLeave={handleLeave}
                                                onClick={() => handleClick(i)}
                                            />
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r="15"
                                                fill="#0a0a0c"
                                                stroke={p.accent}
                                                strokeWidth="3"
                                                filter="url(#skill-dot-glow)"
                                                className="pointer-events-none"
                                            />
                                            <circle cx={pt.x} cy={pt.y} r="5.5" fill={p.accent} className="pointer-events-none" />
                                            <text
                                                x={pt.x}
                                                y={ty}
                                                textAnchor="middle"
                                                fill="#fafafa"
                                                stroke="#09090b"
                                                strokeWidth={sw}
                                                strokeLinejoin="round"
                                                paintOrder="stroke fill"
                                                fontSize={fs}
                                                fontWeight="800"
                                                letterSpacing={len > 20 ? "0.02em" : "0.06em"}
                                                filter="url(#skill-label-shadow)"
                                                className="uppercase pointer-events-none select-none"
                                                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                                            >
                                                {t}
                                            </text>
                                            <rect
                                                x={pt.x - 150}
                                                y={ty - 28}
                                                width="300"
                                                height="44"
                                                fill="transparent"
                                                className="cursor-pointer"
                                                onMouseEnter={() => handleEnter(i)}
                                                onMouseLeave={handleLeave}
                                                onClick={() => handleClick(i)}
                                            />
                                        </g>
                                    );
                                })}
                            </svg>
                    </div>
                </div>
            </div>

            {tipContent}
        </section>
    );
}
