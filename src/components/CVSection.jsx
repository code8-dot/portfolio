import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight } from 'lucide-react';

const CVSection = () => {
    return (
        <section className="py-6 px-6 relative flex justify-center z-20">
            <motion.a
                href={`${import.meta.env.BASE_URL}suyashmotkari.pdf`}
                download="Suyash_Motkari_CV.pdf"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="group relative max-w-3xl w-full flex flex-col sm:flex-row items-center justify-between gap-6 bg-ink-soft/90 border border-white/10 hover:border-accent/40 p-8 rounded-2xl transition-colors duration-300"
            >
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-colors">
                        <FileText size={24} className="text-accent" />
                    </div>
                    <div>
                        <h3 className="font-display font-semibold text-xl text-paper">Full resume, one click away</h3>
                        <p className="text-paper-dim text-sm mt-1">Experience, education, and project details in PDF.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-6 py-3.5 bg-paper text-ink font-medium rounded-full group-hover:bg-accent transition-colors duration-300 shrink-0">
                    Download CV
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </motion.a>
        </section>
    );
};

export default CVSection;
