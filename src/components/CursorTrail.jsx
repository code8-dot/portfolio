import React, { useRef, useEffect } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const createParticle = (x, y) => {
            const particle = {
                x,
                y,
                size: Math.random() * 2 + 1, // Smaller particles
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                life: 1,
                color: Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'
            };
            particles.current.push(particle);
        };

        const handleMouseMove = (e) => {
            // Significantly reduced spawn rate (single particle)
            createParticle(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.05; // Faster decay fade out
                p.size *= 0.9;

                if (p.life <= 0) {
                    particles.current.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.fill();
                }
            });

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none mix-blend-screen" />;
};

export default CursorTrail;
