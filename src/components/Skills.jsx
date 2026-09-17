import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Smartphone, Server } from 'lucide-react';
import TextReveal from './TextReveal';

const skills = [
    { icon: <Cpu size={22} />, name: 'AI / ML & Data Science', items: ['Python', 'PyTorch', 'OpenCV', 'Timm', 'Computer Vision'] },
    { icon: <Globe size={22} />, name: 'Web Development', items: ['React', 'JavaScript', 'HTML/CSS', 'MySQL', 'REST APIs'] },
    { icon: <Smartphone size={22} />, name: 'Mobile Development', items: ['React Native', 'Firebase', 'Cross-Platform', 'Android'] },
    { icon: <Server size={22} />, name: 'Backend & Cloud', items: ['Firebase', 'MySQL', 'AWS Cloud Foundations', 'Git'] },
];

const marqueeItems = [
    'Python', 'PyTorch', 'React', 'React Native', 'OpenCV', 'Firebase', 'MySQL',
    'JavaScript', 'AWS', 'Git', 'REST APIs', 'Computer Vision',
];

const SkillCard = ({ skill, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="group relative bg-ink-soft/50 border border-white/10 hover:border-accent/40 p-7 rounded-2xl transition-colors duration-300 h-full flex flex-col"
    >
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-105 transition-transform">
            {skill.icon}
        </div>
        <h3 className="font-display font-semibold text-lg text-paper mb-4">{skill.name}</h3>
        <div className="flex flex-wrap gap-2 mt-auto">
            {skill.items.map((item) => (
                <span
                    key={item}
                    className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-paper-dim rounded-full group-hover:border-accent/30 group-hover:text-paper transition-colors"
                >
                    {item}
                </span>
            ))}
        </div>
    </motion.div>
);

const Skills = () => {
    return (
        <section id="skills" className="py-28 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-paper-dim mb-4"
                    >
                        <span className="w-6 h-px bg-accent" />
                        Expertise
                    </motion.div>
                    <h2 className="font-display font-semibold text-4xl md:text-5xl text-paper text-balance">
                        <TextReveal text="A toolkit built for" />
                        <span className="text-accent"><TextReveal text="shipping fast." delay={0.15} /></span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>

            {/* Infinite marquee strip */}
            <div className="mt-16 relative overflow-hidden py-6 border-y border-white/5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
                <div className="flex w-max animate-marquee">
                    {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span
                            key={i}
                            className="font-display text-2xl md:text-3xl text-paper-faint/40 mx-8 whitespace-nowrap"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
