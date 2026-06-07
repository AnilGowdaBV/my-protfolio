import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, Certification } from "@/data/certifications";
import { Icons } from "@/components/Icons";

const CertCard = ({ item, onClick }: { item: Certification; onClick?: () => void }) => {
    const isAchievement = item.type === "Achievement";
    const hasSubCerts = item.subCertificates && item.subCertificates.length > 0;

    return (
        <div 
            onClick={onClick}
            className={`
                h-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden glass-card
                ${isAchievement
                    ? "border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                    : "border-violet-500/20 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                }
                ${hasSubCerts ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : ""}
            `}
        >
            {/* Background Gradient Hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${isAchievement ? "from-amber-500/10" : "from-violet-500/10"} to-transparent`} />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon & Badge */}
                <div className="flex justify-between items-start mb-4">
                    {(item.link || item.file) ? (
                        <a
                            href={item.link || item.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                p-3 rounded-xl border flex items-center justify-center transition-transform hover:scale-110 cursor-pointer relative z-20
                                ${isAchievement
                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                    : "bg-violet-500/10 border-violet-500/20 text-violet-400"
                                }
                            `}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {isAchievement ? <Icons.award className="w-6 h-6" /> : <Icons.shield className="w-6 h-6" />}
                        </a>
                    ) : (
                        <div className={`
                            p-3 rounded-xl border flex items-center justify-center
                            ${isAchievement
                                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                : "bg-violet-500/10 border-violet-500/20 text-violet-400"
                            }
                        `}>
                            {isAchievement ? <Icons.award className="w-6 h-6" /> : <Icons.shield className="w-6 h-6" />}
                        </div>
                    )}
                    <span className={`
                        text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border
                        ${isAchievement
                            ? "bg-amber-950/30 border-amber-500/20 text-amber-300"
                            : "bg-violet-950/30 border-violet-500/20 text-violet-300"
                        }
                    `}>
                        {item.type}
                    </span>
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-violet-100 transition-colors">
                    {item.title}
                </h3>
                <div className="text-xs sm:text-sm font-medium mb-3 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className={isAchievement ? "text-amber-200/80" : "text-violet-200/80"}>
                        {item.issuer}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                    <span className="text-zinc-400">{item.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 flex-grow">
                    {item.description}
                </p>

                {/* Decorative Line or View Details */}
                {hasSubCerts ? (
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-violet-400 mt-2">
                        <span>View collection</span>
                        <Icons.arrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                ) : (
                    <div className={`h-[3px] w-12 rounded-full ${isAchievement ? "bg-amber-500/30" : "bg-violet-500/30"} group-hover:w-full transition-all duration-500`} />
                )}
            </div>
        </div>
    );
};

export function Certifications() {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    // Auto-advance slideshow every 5 seconds, unless the certificate details modal is open
    useEffect(() => {
        if (certifications.length <= 1 || selectedCert !== null) return;
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % certifications.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIdx, selectedCert]);

    return (
        <section id="certifications" className="py-24 w-full container px-4 md:px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600 inline-block">
                    Achievements & Certifications
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full mb-4" />
                <p className="text-zinc-400 max-w-lg mx-auto text-sm">
                    Professional validations and competitive milestones from my journey.
                </p>
            </motion.div>

            {/* Desktop view: standard grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {certifications.map((item, idx) => {
                    const hasSubCerts = item.subCertificates && item.subCertificates.length > 0;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-full"
                        >
                            <CertCard
                                item={item}
                                onClick={() => hasSubCerts && setSelectedCert(item)}
                            />
                        </motion.div>
                    );
                })}
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
                                    setActiveIdx((prev) => (prev + 1) % certifications.length);
                                } else if (info.offset.x > swipeThreshold) {
                                    // Swipe right -> Prev
                                    setActiveIdx((prev) => (prev - 1 + certifications.length) % certifications.length);
                                }
                            }}
                            className="w-full h-full group select-none cursor-grab active:cursor-grabbing touch-pan-y"
                        >
                            <CertCard
                                item={certifications[activeIdx]}
                                onClick={() => {
                                    const item = certifications[activeIdx];
                                    const hasSubCerts = item.subCertificates && item.subCertificates.length > 0;
                                    if (hasSubCerts) {
                                        setSelectedCert(item);
                                    }
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between w-full mt-6 px-2">
                        <button
                            onClick={() => setActiveIdx((prev) => (prev - 1 + certifications.length) % certifications.length)}
                            className="p-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                        >
                            <Icons.arrowLeft className="w-4 h-4" />
                        </button>

                        {/* Dots indicators */}
                        <div className="flex gap-2">
                            {certifications.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-violet-500 w-4" : "bg-zinc-700"}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setActiveIdx((prev) => (prev + 1) % certifications.length)}
                            className="p-2.5 rounded-full bg-zinc-900 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                        >
                            <Icons.arrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Sub-Certificates */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900/90 border border-violet-500/20 rounded-3xl p-6 md:p-8 max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/20"
                        >
                            <div className="flex justify-between items-start mb-8 shrink-0">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-indigo-400 mb-2">
                                        {selectedCert.title}
                                    </h3>
                                    <p className="text-zinc-400 flex items-center gap-2">
                                        <Icons.shield className="w-4 h-4 text-violet-400" />
                                        {selectedCert.issuer} Collection
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="p-2 rounded-full hover:bg-white/5 transition-colors group"
                                >
                                    <Icons.close className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            <div className="overflow-y-auto custom-scrollbar pr-2 -mr-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {selectedCert.subCertificates?.map((sub, idx) => (
                                        <div
                                            key={idx}
                                            className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all duration-300 group/card"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 group-hover/card:bg-violet-500/20 transition-colors">
                                                    <Icons.award className="w-5 h-5" />
                                                </div>
                                                <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded-md">
                                                    {sub.date}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-zinc-100 mb-2 group-hover/card:text-violet-200 transition-colors">
                                                {sub.title}
                                            </h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                                {sub.description}
                                            </p>

                                            {sub.file && (
                                                <a
                                                    href={sub.file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors py-2 px-3 rounded-lg bg-violet-500/10 hover:bg-violet-500/20"
                                                >
                                                    <Icons.eye className="w-3.5 h-3.5" />
                                                    View Certificate
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex justify-end shrink-0">
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors font-medium text-sm"
                                >
                                    Close Gallery
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
