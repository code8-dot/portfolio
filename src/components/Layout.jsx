import React from 'react';
import Navbar from './Navbar';
import Background from './Background';
import Chatbot from './Chatbot';
import CustomCursor from './CustomCursor';
import SmoothScroll from './SmoothScroll';

const Layout = ({ children }) => {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-ink text-paper overflow-hidden relative selection:bg-accent selection:text-ink">
                <CustomCursor />
                <Chatbot />
                <Background />

                <div className="relative z-10">
                    <Navbar />
                    {children}
                </div>
            </div>
        </SmoothScroll>
    );
};

export default Layout;
