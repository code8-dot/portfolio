import React from 'react';
import Navbar from './Navbar';
import Background from './Background';
import Chatbot from './Chatbot';
import CursorTrail from './CursorTrail';
import CursorGlow from './CursorGlow';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-cyber-dark text-white overflow-hidden relative selection:bg-cyber-purple selection:text-white">
            <CursorTrail />
            <Chatbot />

            {/* Animated Background Grid */}
            <Background />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 transform perspective-1000 rotate-x-12 scale-150 animate-pulse-fast" />
            </div>

            {/* Cyber Cursor Glow */}
            <CursorGlow />

            <div className="fixed inset-0 bg-noise opacity-[0.03] z-[1] pointer-events-none mix-blend-overlay" />

            {/* Content */}
            <div className="relative z-10">
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default Layout;
