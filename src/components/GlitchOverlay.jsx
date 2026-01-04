import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlitchOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 200); // Short glitch duration

            // Random next trigger between 5s and 15s
            const nextTrigger = Math.random() * 10000 + 5000;
            setTimeout(triggerGlitch, nextTrigger);
        };

        const timer = setTimeout(triggerGlitch, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] pointer-events-none bg-white mix-blend-difference"
                >
                    <div className="w-full h-full relative overflow-hidden">
                        {/* Random colored bars */}
                        <div className="absolute top-[10%] left-0 w-full h-[2px] bg-cyber animate-pulse" />
                        <div className="absolute top-[40%] left-0 w-full h-[5px] bg-cyber-purple animate-pulse" />
                        <div className="absolute top-[80%] left-0 w-full h-[10px] bg-white animate-pulse" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlitchOverlay;
