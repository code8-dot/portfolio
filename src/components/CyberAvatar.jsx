import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CyberAvatar = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center
            const moveX = (e.clientX - centerX) / 15; // Divider controls sensitivity
            const moveY = (e.clientY - centerY) / 15;

            // Clamp values to keep eyes within visor
            const clampedX = Math.max(-10, Math.min(10, moveX));
            const clampedY = Math.max(-5, Math.min(5, moveY));

            setMousePos({ x: clampedX, y: clampedY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">

                {/* Static Helmet Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyber/30 shadow-[0_0_50px_rgba(0,243,255,0.3)] bg-black z-10">
                    <img
                        src={`${import.meta.env.BASE_URL}avatar.png`}
                        alt="Cybernetic Avatar"
                        className="w-full h-full object-cover scale-110"
                    />

                    {/* Overlay Scan Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber/5 to-transparent animate-scan-slow pointer-events-none mix-blend-overlay" />
                </div>

                {/* Glowing Eyes Layer (Z-Index above image) */}
                <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
                    {/* Left Eye Glow */}
                    <motion.div
                        animate={{ x: mousePos.x, y: mousePos.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="absolute top-[42%] left-[32%] w-8 h-8 bg-cyber rounded-full blur-[8px] opacity-80 mix-blend-screen"
                    />
                    {/* Left Eye Core */}
                    <motion.div
                        animate={{ x: mousePos.x, y: mousePos.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="absolute top-[44%] left-[34%] w-3 h-3 bg-white rounded-full blur-[1px]"
                    />

                    {/* Right Eye Glow */}
                    <motion.div
                        animate={{ x: mousePos.x, y: mousePos.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="absolute top-[42%] right-[32%] w-8 h-8 bg-cyber rounded-full blur-[8px] opacity-80 mix-blend-screen"
                    />
                    {/* Right Eye Core */}
                    <motion.div
                        animate={{ x: mousePos.x, y: mousePos.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="absolute top-[44%] right-[34%] w-3 h-3 bg-white rounded-full blur-[1px]"
                    />
                </div>

                {/* Floating Halo Rings (Static background decoration) */}
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-cyber/20 rounded-full animate-spin-slow pointer-events-none z-0" />
                <div className="absolute -top-8 -left-8 -right-8 -bottom-8 border border-cyber-purple/20 rounded-full animate-reverse-spin pointer-events-none z-0" />

            </div>
        </div>
    );
};

export default CyberAvatar;
