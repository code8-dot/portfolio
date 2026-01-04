import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Download, Linkedin, Mail } from 'lucide-react';
import HackerText from './HackerText';
import CyberAvatar from './CyberAvatar';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative px-4 pt-20">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 relative z-10"
                >
                    <div className="flex items-center gap-2 text-cyber font-mono text-sm tracking-widest bg-cyber/10 w-fit px-3 py-1 rounded border border-cyber/30">
                        <Terminal size={14} />
                        <span>SYSTEM_ONLINE_V.2.5.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight leading-none">
                        HI, I'M <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber via-white to-cyber-purple">
                            <HackerText text="SUYASH MOTKARI" />
                        </span>
                    </h1>

                    <div className="text-xl md:text-2xl font-mono text-gray-300 h-8">
                        <span className="text-cyber-purple">{">"}</span> <HackerText text="AI/ML Engineer & Full Stack Dev" />
                    </div>

                    <p className="text-gray-400 max-w-lg text-lg leading-relaxed border-l-2 border-cyber/30 pl-6">
                        Building impactful solutions across
                        <span className="text-cyber"> AI/ML</span>,
                        <span className="text-cyber-purple"> Web</span>, and
                        <span className="text-white"> Mobile</span>.
                        Specialized in Deep Learning, Computer Vision, and Scalable Architectures.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-cyber/10 border border-cyber text-cyber font-mono rounded hover:bg-cyber hover:text-black transition-all duration-300 backdrop-blur-sm cursor-pointer"
                        >
                            VIEW_PROJECTS
                        </motion.a>

                        <div className="flex gap-4">
                            <motion.a
                                href="https://linkedin.com/in/suyash-motkari-9733a3217"
                                target="_blank"
                                whileHover={{ scale: 1.1, color: '#00f3ff' }}
                                className="p-4 border border-white/10 text-white rounded hover:bg-white/5 transition-all duration-300 backdrop-blur-sm flex items-center justify-center group"
                            >
                                <Linkedin size={20} className="group-hover:text-cyber transition-colors" />
                            </motion.a>
                            <motion.a
                                href="mailto:Suyash.Motkari@gmail.com"
                                whileHover={{ scale: 1.1, color: '#bc13fe' }}
                                className="p-4 border border-white/10 text-white rounded hover:bg-white/5 transition-all duration-300 backdrop-blur-sm flex items-center justify-center group"
                            >
                                <Mail size={20} className="group-hover:text-cyber-purple transition-colors" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Element (3D Avatar) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full flex items-center justify-center lg:justify-end"
                >
                    <CyberAvatar />
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-cyber to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
};

export default Hero;
