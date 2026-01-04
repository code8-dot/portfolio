import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Folder, Github, ExternalLink, Activity, ScanFace, HeartHandshake, Wallet } from 'lucide-react';

const projects = [
    {
        title: "MULTIMODAL DEEPFAKE DETECTION",
        description: "Real-time deepfake detection system using PyTorch, torchvision, and timm. Analyzes both video (OpenCV) and audio (pydub) streams for authenticity verification.",
        tags: ["PyTorch", "OpenCV", "Python", "Timm"],
        links: { github: "#", demo: "#" },
        icon: <ScanFace size={32} />
    },
    {
        title: "SEWA NGO PLATFORM",
        description: "Full-stack web platform bridging the gap between donors and NGOs. Facilitates in-kind donations and resource management for social impact.",
        tags: ["HTML/CSS", "JavaScript", "MySQL", "PHP"],
        links: { github: "#", demo: "#" },
        icon: <HeartHandshake size={32} />
    },
    {
        title: "PERSONAL FINANCE MANAGER",
        description: "Cross-platform mobile application for tracking expenses and managing personal finances. Features real-time data sync and intuitive dashboard.",
        tags: ["React Native", "Firebase", "Android"],
        links: { github: "#", demo: "#" },
        icon: <Wallet size={32} />
    }
];

const TiltCard = ({ children, className = "" }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.5deg)`;
    const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.5deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
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
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <TiltCard className="group relative w-full h-full">
            {/* Background/Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber to-cyber-purple opacity-30 group-hover:opacity-100 transition duration-500 blur leading-none rounded-lg" />

            <div className="relative bg-black/90 border border-white/10 p-6 h-full overflow-hidden rounded-lg flex flex-col backdrop-blur-xl transform translate-z-10">

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-lg" />

                {/* Scan line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyber/50 opacity-0 group-hover:animate-scan-fast pointer-events-none" />

                {/* Content */}
                <div className="flex justify-between items-start mb-6 transform translate-z-20">
                    <div className="text-cyber p-3 bg-cyber/10 rounded-lg border border-cyber/30 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-shadow duration-300">
                        {project.icon}
                    </div>
                    <div className="flex gap-4">
                        <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95 duration-200">
                            <Github size={20} />
                        </a>
                        <a href={project.links.demo} className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95 duration-200">
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between transform translate-z-20">
                    <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-cyber transition-colors">
                        {project.title}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow transform translate-z-20">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto transform translate-z-20">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono text-cyber-purple/80 border border-cyber-purple/20 px-2 py-1 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </TiltCard>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-4 relative perspective-1000">
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-4"
                >
                    <Activity className="text-cyber" />
                    <span className="text-cyber font-mono tracking-widest leading-none">SYSTEM_PROJECTS_LOADED</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold uppercase">
                    Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber via-white to-cyber-purple">Reality</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
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
