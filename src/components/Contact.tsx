import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useState } from "react";
import { useContactMutation } from "@/hooks/useContact";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [hasLinkError, setHasLinkError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { mutate: submitForm, isPending: isSubmitting } = useContactMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Security: Check for links in the message
        if (name === "message") {
            const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
            setHasLinkError(urlPattern.test(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (hasLinkError) return;

        submitForm(formData, {
            onSuccess: () => {
                setIsSuccess(true);
                setFormData({ name: "", email: "", message: "" });
                // Reset success state after 5 seconds
                setTimeout(() => setIsSuccess(false), 5000);
            },
            onError: (error) => {
                console.error("Error:", error);
                alert("Transmission error. Please try again.");
            }
        });
    };

    return (
        <section id="contact" className="py-14 md:py-20 w-full max-w-[min(100%,1200px)] mx-auto px-4 relative mb-16 md:mb-20">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto relative group"
            >
                {/* Main Card Border/Glow Container */}
                <div className="absolute -inset-px bg-gradient-to-r from-violet-600/80 via-indigo-500/70 to-fuchsia-600/80 rounded-2xl opacity-25 group-hover:opacity-45 blur-sm transition-opacity duration-500" />

                {/* Main Card Content */}
                <div className="relative bg-[#08080a] border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">

                    {/* Decorative Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-80" />

                    {/* Left Panel: The "Terminal" / Pitch */}
                    <div className="md:w-[42%] p-6 sm:p-8 md:p-9 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
                        {/* Futuristic Header */}
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-violet-400/70 mb-6 md:mb-8 tracking-[0.2em] uppercase">
                            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                            System.Link_Ready
                        </div>

                        <div className="relative z-10">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.35em] mb-2">Open channel</p>
                            <h2 className="text-[1.65rem] sm:text-3xl md:text-[1.85rem] lg:text-[2.1rem] font-extrabold text-white leading-[1.12] mb-4 md:mb-5 tracking-tight">
                                <span className="text-zinc-100">Let&apos;s </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                                    build
                                </span>
                                <span className="text-zinc-100"> the impossible</span>
                            </h2>
                            <p className="text-zinc-400 text-sm md:text-[0.95rem] leading-relaxed border-l border-violet-500/40 pl-4 py-1 max-w-sm">
                                I turn complex problems into elegant, scalable code—ready when you are to ship the next idea.
                            </p>
                        </div>

                        {/* Connection Stats / Info */}
                        <div className="grid grid-cols-2 gap-3 mt-8 md:mt-10">
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=anilgowda3103@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:border-violet-500/20 transition-colors group/item"
                            >
                                <div className="mb-1.5 text-violet-400">
                                    <Icons.mail className="w-5 h-5 group-hover/item:scale-110 transition-transform" />
                                </div>
                                <div className="text-[10px] text-zinc-500 font-mono mb-0.5">EMAIL_LINK</div>
                                <div className="text-xs font-medium text-zinc-300 truncate">anilgowda3103@...</div>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/anil-bv-2704a8351"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:border-indigo-500/20 transition-colors group/item"
                            >
                                <div className="mb-1.5 text-indigo-400">
                                    <Icons.linkedin className="w-5 h-5 group-hover/item:scale-110 transition-transform" />
                                </div>
                                <div className="text-[10px] text-zinc-500 font-mono mb-0.5">PROFILE_ID</div>
                                <div className="text-xs font-medium text-zinc-300">Connect</div>
                            </a>
                        </div>
                    </div>

                    {/* Right Panel: The Form Interface */}
                    <div className="md:w-[58%] p-6 sm:p-8 md:p-9 bg-white/[0.015] relative border-t md:border-t-0 md:border-l border-white/[0.06]">

                        {/* Corner Accents */}
                        <div className="absolute top-4 right-4 text-[10px] text-zinc-700 font-mono">ID: 8X-291</div>
                        <div className="absolute bottom-6 right-6 text-zinc-800 opacity-20">
                            <Icons.cpu className="w-24 h-24" />
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="relative z-10 space-y-6 md:space-y-7"
                        >
                            <div className="group/input relative">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5 block group-focus-within/input:text-violet-400 transition-colors">
                                    // 01. Identification
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name_"
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-base md:text-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-all font-light disabled:opacity-50"
                                />
                            </div>

                            <div className="group/input relative">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5 block group-focus-within/input:text-violet-400 transition-colors">
                                    // 02. Communication Channel
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com_"
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-base md:text-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-all font-light disabled:opacity-50"
                                />
                            </div>

                            <div className="group/input relative">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5 block group-focus-within/input:text-violet-400 transition-colors">
                                    // 03. Transmission Data
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    disabled={isSubmitting}
                                    placeholder="Project details, requirements, or just saying hello..."
                                    className={`w-full bg-transparent border-b py-3 text-base md:text-lg text-white placeholder:text-zinc-600 focus:outline-none transition-all font-light resize-none disabled:opacity-50 ${hasLinkError ? 'border-red-500' : 'border-white/10 focus:border-violet-500'}`}
                                />
                                {hasLinkError && (
                                    <div className="absolute bottom-[-24px] left-0 flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse">
                                        <Icons.shield className="w-3 h-3" />
                                        SECURITY ALERT: Links are disabled for safety.
                                    </div>
                                )}
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={hasLinkError || isSubmitting}
                                    className={`relative overflow-hidden group/btn text-black rounded-lg w-full h-12 md:h-14 text-sm md:text-base font-bold tracking-wide transition-all ${hasLinkError
                                        ? 'bg-red-500/10 text-red-500 cursor-not-allowed border border-red-500/50'
                                        : isSuccess
                                            ? 'bg-green-500 hover:bg-green-600 text-white border-none'
                                            : 'bg-white hover:bg-zinc-200'
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {hasLinkError ? (
                                            "TRANSMISSION_BLOCKED"
                                        ) : isSubmitting ? (
                                            <>
                                                ESTABLISHING UPLINK...
                                                <Icons.cpu className="w-5 h-5 animate-pulse" />
                                            </>
                                        ) : isSuccess ? (
                                            <>
                                                TRANSMISSION COMPLETE
                                                <Icons.check className="w-5 h-5" />
                                            </>
                                        ) : (
                                            <>
                                                INITIATE_TRANSMISSION
                                                <Icons.arrowLeft className="w-5 h-5 rotate-180 transition-transform group-hover/btn:translate-x-1" />
                                            </>
                                        )}
                                    </span>
                                    {!hasLinkError && !isSuccess && !isSubmitting && (
                                        <div className="absolute inset-0 bg-violet-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 z-0 mix-blend-difference" />
                                    )}
                                </Button>
                                {/* Subtle Security Note to address user "disclaimer" request meaningfully */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono tracking-widest uppercase opacity-60">
                                    <Icons.shield className="w-3 h-3" />
                                    <span>Encrypted & Verified • No Activation Required</span>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </motion.div>
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsSuccess(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#0a0a0b] border border-white/10 p-8 md:p-10 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Glows */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[50px] pointer-events-none" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-green-500" />

                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                    <Icons.check className="w-10 h-10 text-green-500" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Transmission Received</h3>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    Your message has been successfully uploaded to my system. I will analyze the data and respond to your frequency shortly.
                                </p>

                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    ACKNOWLEDGE
                                </button>

                                <div className="mt-6 flex items-center gap-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Status: Delivered • ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
