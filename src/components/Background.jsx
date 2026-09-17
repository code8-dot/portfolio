import React from 'react';

// Everything here is painted once. No blur filters, no blend modes, no per-frame
// work — the only motion is a GPU-composited transform drift.
const Background = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Hairline grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

            {/* Ambient glows */}
            <div
                className="absolute -top-[30%] -left-[20%] w-[70vw] h-[70vw] rounded-full will-change-transform animate-drift"
                style={{ background: 'radial-gradient(circle, rgba(139,124,246,0.18), transparent 62%)' }}
            />
            <div
                className="absolute top-[25%] -right-[25%] w-[60vw] h-[60vw] rounded-full will-change-transform animate-drift-slow"
                style={{ background: 'radial-gradient(circle, rgba(91,79,196,0.20), transparent 60%)' }}
            />
            <div
                className="absolute -bottom-[25%] left-[15%] w-[55vw] h-[55vw] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(169,156,249,0.10), transparent 60%)' }}
            />

            {/* Film grain */}
            <div className="absolute inset-0 bg-grain opacity-[0.035]" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,#0a0a0b_100%)]" />
        </div>
    );
};

export default React.memo(Background);
