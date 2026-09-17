import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// The words start translated fully outside their overflow-hidden wrappers, which
// makes them invisible to IntersectionObserver (it clips against ancestor
// overflow). So the observer watches the un-clipped outer element instead —
// framer-motion's own whileInView would never fire on the words themselves.
const TextReveal = ({
    text,
    className = '',
    delay = 0,
    stagger = 0.05,
    onMount = false,
    as: Tag = 'span',
}) => {
    const ref = useRef(null);
    const [shown, setShown] = useState(
        () => onMount || typeof IntersectionObserver === 'undefined'
    );

    useEffect(() => {
        if (shown) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [shown]);

    return (
        <Tag ref={ref} className={`inline-block ${className}`}>
            {text.split(' ').map((w, i) => (
                <span
                    key={`${w}-${i}`}
                    className="inline-block overflow-hidden align-bottom pb-[0.14em] mr-[0.28em]"
                >
                    <motion.span
                        className="inline-block"
                        initial={{ y: '110%' }}
                        animate={shown ? { y: '0%' } : { y: '110%' }}
                        transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + i * stagger,
                        }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
};

export default TextReveal;
