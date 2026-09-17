import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Work', href: '#projects' },
        { name: 'Expertise', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-7'
                }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="font-display font-semibold text-lg tracking-tight text-paper flex items-center gap-2 group">
                        <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                        Suyash Motkari
                    </a>

                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm text-paper-dim hover:text-paper relative group transition-colors"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                        <a
                            href={`${import.meta.env.BASE_URL}suyashmotkari.pdf`}
                            download="Suyash_Motkari_CV.pdf"
                            className="group flex items-center gap-1.5 px-5 py-2.5 bg-paper text-ink text-sm font-medium rounded-full hover:bg-accent transition-colors duration-300"
                        >
                            Resume
                            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>

                    <button
                        className="md:hidden text-paper"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-display text-paper hover:text-accent transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={`${import.meta.env.BASE_URL}suyashmotkari.pdf`}
                            download="Suyash_Motkari_CV.pdf"
                            className="px-6 py-3 bg-paper text-ink text-sm font-medium rounded-full"
                        >
                            Download Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
