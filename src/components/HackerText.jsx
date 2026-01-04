import React, { useState, useEffect } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const HackerText = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        let iterations = 0;

        const interval = setInterval(() => {
            setDisplayText(text.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className={`${className} font-mono`}>
            {displayText}
        </span>
    );
};

export default HackerText;
