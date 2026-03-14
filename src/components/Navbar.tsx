import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileMenuOpen, toggleMobileMenu } from "@/store/uiSlice";



import { useState, useEffect } from "react";

export function Navbar() {
    const dispatch = useAppDispatch();
    const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Smart Scroll: Hide navbar on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Only hide after 100px of scrolling
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Honors", href: "#certifications" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -120, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                initial="visible"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none pt-6 px-4"
            >
                <div className="flex items-center gap-3 w-full max-w-6xl mx-auto justify-between md:justify-center pointer-events-auto">

                    {/* Brand Island - Identity */}
                    <motion.div
                        className="glass-card backdrop-blur-xl bg-black/40 border border-white/10 rounded-full pl-2 pr-6 py-2 flex items-center gap-4 shadow-xl pointer-events-auto cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative group cursor-pointer">
                            {/* Unique Tech Logo */}
                            <div className="w-12 h-12 rounded-[18px] bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-600 p-[2px] relative overflow-hidden transition-transform duration-300 group-hover:rotate-6 shadow-lg shadow-violet-500/25">
                                <div className="absolute inset-0 bg-white/30 blur-sm animate-pulse"></div>
                                <div className="w-full h-full bg-black/90 backdrop-blur-md rounded-[16px] flex items-center justify-center relative z-10 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent opacity-50"></div>
                                    <span className="text-sm font-black tracking-tighter bg-gradient-to-br from-white via-violet-200 to-indigo-200 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                                        {'<A/>'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-base text-white leading-tight tracking-wide">
                                ANIL B V
                            </span>
                            <span className="text-[10px] uppercase font-medium text-zinc-400 tracking-wider">
                                Developer
                            </span>
                        </div>
                    </motion.div>

                    {/* Navigation Island - Links & Actions (Hidden on Mobile/Tablet) */}
                    <nav className="hidden lg:flex items-center gap-1 pl-6 pr-2 py-2 rounded-full glass-card backdrop-blur-xl bg-black/40 border border-white/10 shadow-xl ml-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative px-5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="w-px h-6 bg-white/10 mx-2"></div>

                        <Button
                            className="rounded-full bg-white text-black hover:bg-zinc-200 font-semibold px-6 ml-2 h-10"
                            asChild
                        >
                            <a href="#contact">Let's Talk</a>
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle (Visible on Mobile/Tablet) */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="lg:hidden rounded-full w-12 h-12 bg-black/40 border-white/10 backdrop-blur-md text-white hover:bg-white/10"
                        onClick={() => dispatch(toggleMobileMenu())}
                    >
                        {isMobileMenuOpen ? <Icons.close className="w-5 h-5" /> : <Icons.menu className="w-5 h-5" />}
                    </Button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center p-6"
                    >
                        <nav className="flex flex-col items-center space-y-8 w-full max-w-sm">
                            {/* Mobile Brand for Context */}
                            <div className="flex flex-col items-center gap-4 mb-2">
                                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-600 p-[3px] relative overflow-hidden shadow-2xl">
                                    <div className="w-full h-full bg-black/90 backdrop-blur-md rounded-[28px] flex items-center justify-center relative z-10 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent opacity-50"></div>
                                        <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-white via-violet-200 to-indigo-200 bg-clip-text text-transparent transform scale-110">
                                            {'<A/>'}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-white">Anil B V</h2>
                                    <p className="text-zinc-400 text-sm">Full Stack Developer</p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/10 my-4"></div>

                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                    href={link.href}
                                    className="text-3xl font-medium text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => dispatch(setMobileMenuOpen(false))}
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="w-full pt-8"
                            >
                                <Button size="lg" className="w-full rounded-full bg-white text-black font-bold h-14 text-lg" asChild>
                                    <a href="#contact" onClick={() => dispatch(setMobileMenuOpen(false))}>Get in Touch</a>
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
 