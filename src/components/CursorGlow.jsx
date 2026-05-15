import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
            animate={{
                x: mousePosition.x - 192,
                y: mousePosition.y - 192,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
    );
};

export default CursorGlow;
