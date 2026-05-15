import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Layers, Shield, Smartphone, Server } from 'lucide-react';

const skills = [
    { icon: <Cpu size={24} />, name: "AI/ML & Data Science", items: ["Python", "PyTorch", "OpenCV", "Timm", "Computer Vision"] },
    { icon: <Globe size={24} />, name: "Web Development", items: ["React", "JavaScript", "HTML/CSS", "MySQL", "REST APIs"] },
    { icon: <Smartphone size={24} />, name: "Mobile Development", items: ["React Native", "Firebase", "Cross-Platform", "Android"] },
    { icon: <Server size={24} />, name: "Backend & Cloud", items: ["Firebase", "MySQL", "AWS Cloud Foundations", "Git"] },
];

const SkillCard = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-6 relative overflow-hidden group hover:border-cyber/50 transition-colors duration-300 rounded-lg flex flex-col h-full"
        >
            {/* Background circuit pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-cyber/10 rounded-lg border border-cyber/30 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
                    {/* Icon Color Change on Hover */}
                    <div className="text-cyber group-hover:text-white transition-colors">
                        {skill.icon}
                    </div>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-cyber transition-colors">{skill.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                {skill.items.map(item => (
                    <span key={item} className="text-sm font-mono px-3 py-1.5 bg-black/50 border border-white/10 text-gray-300 rounded hover:border-cyber/50 hover:text-white hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all cursor-default">
                        {item}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="py-20 px-4 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-orbitron font-bold mb-4">
                        TECHNICAL <span className="text-cyber">ARSENAL</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyber-purple to-transparent mx-auto" />
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Technologies I use to build independent, scalable, and futuristic systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
