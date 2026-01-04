import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Terminal as TerminalIcon, Minimize2 } from 'lucide-react';

const KNOWLEDGE_BASE = {
    default: "I am Suyash's AI Digital Assistant. I can tell you about his projects, skills, contact info, or background. Try asking 'What are his skills?' or 'How can I contact him?'",
    skills: "Suyash is proficient in AI/ML (PyTorch, OpenCV, Timm), Web Development (React, MERN Stack), and Mobile Apps (React Native, Firebase). He builds scalable, full-stack solutions.",
    projects: "His flagship projects include a Real-Time Deepfake Detection System, the SEWA NGO Platform, and a Personal Finance Manager App. Scroll to the 'Projects' section to see them in 3D!",
    contact: "You can reach Suyash at Suyash.Motkari@gmail.com or +91 7058911643. He is based in Nashik, Maharashtra.",
    deepfake: "The Deepfake Detection System is his Final Year Project. It uses PyTorch and OpenCV to analyze both video and audio streams for authenticity in real-time.",
    status: "He is currently a B.Tech student at K. K. Wagh Institute (2022-Present).",
    hello: "Hello! Accessing neural network... system ready. How can I assist you with Suyash's portfolio?",
    crazy: "System visual intensity set to MAXIMUM. Enjoy the ride!"
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "System Initialized. Greetings, I am Suyash's AI Assistant.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const processInput = async (text) => {
        const lowerText = text.toLowerCase();
        let response = KNOWLEDGE_BASE.default;

        if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('stack')) response = KNOWLEDGE_BASE.skills;
        else if (lowerText.includes('project') || lowerText.includes('work')) response = KNOWLEDGE_BASE.projects;
        else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('hire')) response = KNOWLEDGE_BASE.contact;
        else if (lowerText.includes('deepfake')) response = KNOWLEDGE_BASE.deepfake;
        else if (lowerText.includes('status') || lowerText.includes('education')) response = KNOWLEDGE_BASE.status;
        else if (lowerText.includes('hello') || lowerText.includes('hi')) response = KNOWLEDGE_BASE.hello;
        else if (lowerText.includes('crazy')) response = KNOWLEDGE_BASE.crazy;

        setIsTyping(true);

        // Simulate thinking/typing delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        processInput(input);
        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 md:w-96 bg-black/90 border border-cyber rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.2)] backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-cyber/10 p-3 border-b border-cyber/30 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-cyber">
                                <TerminalIcon size={16} />
                                <span className="font-mono text-sm font-bold tracking-wider">SUYASH_AI_V1.0</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Minimize2 size={16} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyber/20">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user'
                                                ? 'bg-cyber/20 text-white border border-cyber/50 rounded-tr-none'
                                                : 'bg-gray-900 text-gray-300 border border-gray-700 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 rounded-tl-none flex gap-1">
                                        <span className="w-2 h-2 bg-cyber rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-cyber rounded-full animate-bounce delay-75" />
                                        <span className="w-2 h-2 bg-cyber rounded-full animate-bounce delay-150" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-black/50 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask command..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-white font-mono text-sm placeholder:text-gray-600 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="text-cyber hover:text-white transition-colors p-1"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'bg-gray-800 text-gray-400 border border-gray-600' : 'bg-cyber text-black border border-white animate-pulse-fast shadow-[0_0_20px_rgba(0,243,255,0.6)]'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} strokeWidth={2.5} />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
