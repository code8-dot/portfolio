import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck } from 'lucide-react';

const CVSection = () => {
    return (
        <section className="py-10 px-4 relative flex justify-center z-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative max-w-2xl w-full"
            >
                {/* Holographic Card Container */}
                <div className="relative bg-black/60 backdrop-blur-md border border-cyber/30 p-8 rounded-xl overflow-hidden group">

                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber rounded-br-lg" />

                    {/* Animated Scan Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber shadow-[0_0_15px_#00f3ff] animate-scan-slow opacity-50 pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

                        {/* Icon & Text */}
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-cyber/10 rounded-full flex items-center justify-center border border-cyber/50 shadow-[0_0_20px_rgba(0,243,255,0.3)] group-hover:animate-pulse">
                                <FileText size={32} className="text-cyber" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-orbitron font-bold text-white">ACCESS PERSONNEL FILE</h3>
                                <p className="text-gray-400 font-mono text-xs mt-1 flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-green-400" />
                                    SECURE_CONNECTION_ESTABLISHED
                                </p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <a
                            href={`${import.meta.env.BASE_URL}suyashmotkari.pdf`}
                            download="Suyash_Motkari_CV.pdf"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-cyber/10 border border-cyber text-cyber font-orbitron font-bold rounded flex items-center gap-3 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] cursor-pointer"
                        >
                            <Download size={20} />
                            DOWNLOAD CV
                        </a>
                    </div>

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                </div>
            </motion.div>
        </section>
    );
};

export default CVSection;
