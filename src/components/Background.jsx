import React, { useRef, useEffect } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true }); // Standard context
        let animationFrameId;
        let particles = [];

        // Use a separated mouse object to prevent closure staleness
        const mouse = { x: -1000, y: -1000 };

        // Debounce resize to prevent thrashing on mobile scroll
        let resizeTimeout;
        const resizeCanvas = () => {
            // Double check if dimensions actually changed enough to warrant a resize
            // (This helps with mobile address bar hide/show)
            if (Math.abs(canvas.width - window.innerWidth) > 50 ||
                Math.abs(canvas.height - window.innerHeight) > 50) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init(); // Re-distribute particles on big resize
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        };

        // Initial size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', handleResize);

        // Passive listener for better scroll performance
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = '#00f3ff';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                // Simple distance check to avoid expensive square root if far away
                if (Math.abs(dx) < 100 && Math.abs(dy) < 100) {
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        // Gently push away
                        this.vx -= (dx / distance) * force * 0.6;
                        this.vy -= (dy / distance) * force * 0.6;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = 80; // Slightly reduced for performance safety
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Don't fully clear, create trails? No, sticking to clean clear for performance
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
            ctx.lineWidth = 1;

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();

                // Draw particle
                ctx.fillStyle = particles[i].color;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;

                    // Optimization: Manhattan distance check first
                    if (Math.abs(dx) < 100 && Math.abs(dy) < 100) {
                        const distanceSq = dx * dx + dy * dy;
                        if (distanceSq < 10000) { // 100^2
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                        }
                    }
                }
            }
            ctx.stroke();
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-30"
            style={{ willChange: 'transform' }}
        />
    );
};

export default React.memo(Background);
