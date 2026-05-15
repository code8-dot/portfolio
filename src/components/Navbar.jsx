import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '#' },
        { name: 'PROJECTS', href: '#projects' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="relative">
                            <Hexagon className="text-cyber group-hover:rotate-180 transition-transform duration-700" size={32} strokeWidth={1.5} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse" />
                            </div>
                        </div>
                        <span className="font-orbitron font-bold text-xl tracking-widest text-white group-hover:text-cyber transition-colors">
                            WELCOME!
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-mono text-gray-400 hover:text-white relative group overflow-hidden"
                            >
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-cyber">
                                    {link.name}
                                </span>
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyber transition-all duration-300 group-hover:w-full" />
                                <span className="absolute -bottom-1 right-0 text-[10px] text-cyber-purple opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                  //01
                                </span>
                            </a>
                        ))}
                        <a href={`${import.meta.env.BASE_URL}suyashmotkari.pdf`} download="Suyash_Motkari_CV.pdf" className="px-6 py-2 bg-white/5 border border-white/10 rounded-sm font-mono text-xs hover:bg-cyber hover:text-black hover:border-cyber transition-all duration-300">
                            DOWNLOAD_CV
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-cyber transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween' }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-orbitron text-white hover:text-cyber transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
