import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';

const KNOWLEDGE_BASE = {
    default: "I'm Suyash's assistant. Ask me about his projects, skills, or how to get in touch.",
    skills: "Suyash works across AI/ML (PyTorch, OpenCV, Timm), Web Development (React, MERN), and Mobile Apps (React Native, Firebase) — building scalable, full-stack solutions.",
    projects: "His flagship work includes a real-time deepfake detection system, the SEWA NGO platform, and a personal finance manager app. Scroll down to see them.",
    contact: "Reach Suyash at Suyash.Motkari@gmail.com or +91 7058911643. Based in Nashik, Maharashtra.",
    deepfake: "The deepfake detection system is his final year project — it uses PyTorch and OpenCV to analyze video and audio streams for authenticity in real time.",
    status: "He's currently a B.Tech student at K. K. Wagh Institute (2022–Present).",
    hello: "Hey! How can I help you learn more about Suyash's work?",
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi, I'm Suyash's assistant. Ask me anything about his work.", sender: 'bot' },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const processInput = (text) => {
        const lower = text.toLowerCase();
        let response = KNOWLEDGE_BASE.default;

        if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) response = KNOWLEDGE_BASE.skills;
        else if (lower.includes('project') || lower.includes('work')) response = KNOWLEDGE_BASE.projects;
        else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) response = KNOWLEDGE_BASE.contact;
        else if (lower.includes('deepfake')) response = KNOWLEDGE_BASE.deepfake;
        else if (lower.includes('status') || lower.includes('education')) response = KNOWLEDGE_BASE.status;
        else if (lower.includes('hello') || lower.includes('hi')) response = KNOWLEDGE_BASE.hello;

        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
            setIsTyping(false);
        }, 700 + Math.random() * 600);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
        processInput(input);
        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-4 w-80 md:w-96 bg-ink-soft border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-4 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-paper">
                                <Sparkles size={16} className="text-accent" />
                                <span className="text-sm font-medium">Ask about Suyash</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-paper-faint hover:text-paper transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="h-80 overflow-y-auto p-4 space-y-4 text-sm">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                                            msg.sender === 'user'
                                                ? 'bg-accent text-ink rounded-tr-sm'
                                                : 'bg-white/5 text-paper-dim border border-white/10 rounded-tl-sm'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10 rounded-tl-sm flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-paper-faint rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-paper-faint rounded-full animate-bounce [animation-delay:0.1s]" />
                                        <span className="w-1.5 h-1.5 bg-paper-faint rounded-full animate-bounce [animation-delay:0.2s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none text-paper text-sm placeholder:text-paper-faint focus:outline-none"
                            />
                            <button type="submit" className="text-accent hover:text-paper transition-colors p-1" aria-label="Send">
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 ${
                    isOpen ? 'bg-ink-soft border border-white/10 text-paper-dim' : 'bg-accent text-ink'
                }`}
                aria-label="Toggle chat"
            >
                {isOpen ? <X size={22} /> : <MessageSquare size={22} strokeWidth={2.25} />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
