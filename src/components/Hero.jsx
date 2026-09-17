import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail, ArrowDown } from 'lucide-react';
import TextReveal from './TextReveal';

const Hero3D = lazy(() => import('./Hero3D'));

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center relative px-6 pt-28 pb-10">
            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4 items-center relative">

                {/* Text Content */}
                <div className="space-y-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-2 text-paper-dim text-xs tracking-[0.25em] uppercase"
                    >
                        <span className="w-6 h-px bg-accent" />
                        AI/ML Engineer &amp; Full-Stack Developer
                    </motion.div>

                    <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-balance">
                        <TextReveal text="Building intelligent" delay={0.15} onMount />
                        <br />
                        <TextReveal text="products that" delay={0.35} onMount />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-soft to-paper">
                            <TextReveal text="feel inevitable." delay={0.5} onMount />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.85 }}
                        className="text-paper-dim text-lg leading-relaxed max-w-lg"
                    >
                        I design and ship end-to-end systems across
                        <span className="text-paper"> deep learning</span>,
                        <span className="text-paper"> web</span>, and
                        <span className="text-paper"> mobile</span> — turning
                        ambitious ideas into production-grade software.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1 }}
                        className="flex flex-wrap items-center gap-4 pt-2"
                    >
                        <a
                            href="#projects"
                            className="group flex items-center gap-2 px-7 py-4 bg-paper text-ink font-medium rounded-full hover:bg-accent transition-colors duration-300"
                        >
                            View Work
                            <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        <div className="flex gap-3">
                            <a
                                href="https://linkedin.com/in/suyash-motkari-9733a3217"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-paper-dim hover:text-paper hover:border-accent/50 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={19} />
                            </a>
                            <a
                                href="mailto:Suyash.Motkari@gmail.com"
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-paper-dim hover:text-paper hover:border-accent/50 transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail size={19} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* 3D Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0"
                >
                    <Suspense fallback={<div className="absolute inset-[15%] rounded-full bg-accent/20 blur-3xl animate-pulse" />}>
                        <Hero3D />
                    </Suspense>
                </motion.div>
            </div>

            <motion.a
                href="#projects"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper-faint hover:text-paper-dim transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
            >
                <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <ArrowDown size={14} />
                </motion.span>
            </motion.a>
        </section>
    );
};

export default Hero;
