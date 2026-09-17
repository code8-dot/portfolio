import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.5;
const RING_RADIUS = 1.8;

// Round, soft-edged sprite so points read as glowing dots instead of squares
const createDotTexture = () => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.65)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
};

const Lattice = ({ pointCount }) => {
    const group = useRef(null);
    const ring = useRef(null);
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    // Fibonacci sphere: even point distribution, no clustering at the poles
    const positions = useMemo(() => {
        const array = new Float32Array(pointCount * 3);
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < pointCount; i++) {
            const y = 1 - (i / (pointCount - 1)) * 2;
            const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
            const theta = goldenAngle * i;
            array[i * 3] = Math.cos(theta) * radiusAtY * RADIUS;
            array[i * 3 + 1] = y * RADIUS;
            array[i * 3 + 2] = Math.sin(theta) * radiusAtY * RADIUS;
        }
        return array;
    }, [pointCount]);

    const dotTexture = useMemo(() => createDotTexture(), []);
    const latticeSource = useMemo(() => new THREE.IcosahedronGeometry(RADIUS * 0.985, 2), []);

    useEffect(() => () => {
        dotTexture.dispose();
        latticeSource.dispose();
    }, [dotTexture, latticeSource]);

    useFrame((state, delta) => {
        const g = group.current;
        if (!g) return;
        const step = Math.min(delta, 0.05);

        g.rotation.y += step * 0.14;
        g.rotation.x += (target.current.y * 0.3 - g.rotation.x) * 0.045;
        g.position.x += (target.current.x * 0.1 - g.position.x) * 0.045;
        g.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.05;

        if (ring.current) ring.current.rotation.z += step * 0.22;
    });

    return (
        <group ref={group}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    map={dotTexture}
                    size={0.06}
                    color="#cfc8ff"
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation
                />
            </points>

            <lineSegments>
                <wireframeGeometry args={[latticeSource]} />
                <lineBasicMaterial color="#8b7cf6" transparent opacity={0.16} depthWrite={false} />
            </lineSegments>

            <mesh ref={ring} rotation={[Math.PI / 2.6, 0, 0]}>
                <torusGeometry args={[RING_RADIUS, 0.004, 8, 160]} />
                <meshBasicMaterial color="#8b7cf6" transparent opacity={0.45} />
            </mesh>
        </group>
    );
};

const Hero3D = () => {
    const wrap = useRef(null);
    const [active, setActive] = useState(true);
    const pointCount = useMemo(() => (window.innerWidth < 768 ? 520 : 950), []);

    // Stop rendering entirely once the hero scrolls out of view
    useEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setActive(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrap} className="absolute inset-0">
            <div className="absolute inset-[24%] rounded-full bg-accent/15 blur-[70px] pointer-events-none" />
            <Canvas
                dpr={[1, 1.5]}
                frameloop={active ? 'always' : 'never'}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <fog attach="fog" args={['#0a0a0b', 4.2, 7.6]} />
                <Lattice pointCount={pointCount} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
