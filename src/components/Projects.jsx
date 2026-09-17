import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Github, ExternalLink, ScanFace, HeartHandshake, Wallet, Users } from 'lucide-react';
import TextReveal from './TextReveal';

const projects = [
    {
        title: 'PeopleSpark HRM Ecosystem',
        description: 'Multi-tenant human resource management ecosystem with a hierarchical data model. Real-time attendance, live workforce metrics, and role-based access control.',
        tags: ['React Native', 'React.js', 'Firebase', 'Redux'],
        links: { github: '#', demo: '#' },
        icon: <Users size={26} />,
    },
    {
        title: 'Multimodal Deepfake Detection',
        description: 'Real-time deepfake detection system using PyTorch, torchvision, and timm. Analyzes both video (OpenCV) and audio (pydub) streams for authenticity verification.',
        tags: ['PyTorch', 'OpenCV', 'Python', 'Timm'],
        links: { github: 'https://github.com/code8-dot/deepfake-1st', demo: '#' },
        icon: <ScanFace size={26} />,
    },
    {
        title: 'SEWA NGO Platform',
        description: 'Full-stack web platform bridging the gap between donors and NGOs. Facilitates in-kind donations and resource management for social impact.',
        tags: ['HTML/CSS', 'JavaScript', 'MySQL', 'PHP'],
        links: { github: '#', demo: '#' },
        icon: <HeartHandshake size={26} />,
    },
    {
        title: 'Personal Finance Manager',
        description: 'Cross-platform mobile application for tracking expenses and managing personal finances. Real-time data sync and an intuitive dashboard.',
        tags: ['React Native', 'Firebase', 'Android'],
        links: { github: 'https://github.com/code8-dot/finance', demo: '#' },
        icon: <Wallet size={26} />,
    },
];

const TiltCard = ({ children, className = '' }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.4deg)`;
    const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.4deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct * 20);
        y.set(yPct * 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const ProjectCard = ({ project, index }) => (
    <TiltCard className="group relative w-full h-full">
        <div className="relative bg-ink-soft/90 border border-white/10 group-hover:border-accent/40 p-7 h-full overflow-hidden rounded-2xl flex flex-col transition-colors duration-300">
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, rgba(139,124,246,0.12), transparent 60%)' }}
            />

            <div className="flex justify-between items-start mb-7 relative">
                <div className="text-accent p-3 bg-accent/10 rounded-xl border border-accent/20">
                    {project.icon}
                </div>
                <span className="font-display text-sm text-paper-faint pt-1">0{index + 1}</span>
            </div>

            <h3 className="font-display font-semibold text-xl text-paper mb-3 relative group-hover:text-accent transition-colors">
                {project.title}
            </h3>

            <p className="text-paper-dim text-sm mb-6 leading-relaxed flex-grow relative">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 relative">
                {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-paper-faint border border-white/10 px-2.5 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 relative pt-4 border-t border-white/5">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-paper-dim hover:text-paper transition-colors">
                    <Github size={16} /> Code
                </a>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-paper-dim hover:text-paper transition-colors">
                    <ExternalLink size={16} /> Live
                </a>
            </div>
        </div>
    </TiltCard>
);

const Projects = () => {
    return (
        <section id="projects" className="py-28 px-6 relative" style={{ perspective: '1000px' }}>
            <div className="max-w-6xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-paper-dim mb-4"
                >
                    <span className="w-6 h-px bg-accent" />
                    Selected Work
                </motion.div>
                <h2 className="font-display font-semibold text-4xl md:text-5xl text-paper text-balance">
                    <TextReveal text="Projects engineered to" />
                    <span className="text-accent"><TextReveal text="solve real problems." delay={0.15} /></span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <ProjectCard project={project} index={index} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
