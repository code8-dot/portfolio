import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

    useEffect(() => {
        if (!enabled) return;

        document.documentElement.classList.add('cursor-hidden');

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ring = { x: target.x, y: target.y, scale: 1 };
        let targetScale = 1;

        let revealed = false;
        const handleMove = (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
            if (!revealed) {
                revealed = true;
                ring.x = e.clientX;
                ring.y = e.clientY;
                if (dotRef.current) dotRef.current.style.opacity = '1';
                if (ringRef.current) ringRef.current.style.opacity = '1';
            }
            // Dot tracks 1:1 so the cursor never feels like it's trailing behind
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        const handleOver = (e) => {
            targetScale = e.target.closest('a, button, [role="button"], input, textarea') ? 1.9 : 1;
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        window.addEventListener('pointerover', handleOver, { passive: true });

        let frameId;
        const animate = () => {
            ring.x += (target.x - ring.x) * 0.2;
            ring.y += (target.y - ring.y) * 0.2;
            ring.scale += (targetScale - ring.scale) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ring.scale.toFixed(3)})`;
            }
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);

        return () => {
            document.documentElement.classList.remove('cursor-hidden');
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerover', handleOver);
            cancelAnimationFrame(frameId);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={dotRef}
                style={{ opacity: 0 }}
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-paper pointer-events-none z-[100] will-change-transform"
            />
            <div
                ref={ringRef}
                style={{ opacity: 0 }}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/60 pointer-events-none z-[100] will-change-transform transition-opacity duration-300"
            />
        </>
    );
};

export default CustomCursor;
