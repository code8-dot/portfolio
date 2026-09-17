import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Linkedin, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import TextReveal from './TextReveal';

const Contact = () => {
    const form = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        const SERVICE_ID = 'service_0czvprb';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        if (TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            setTimeout(() => {
                setIsLoading(false);
                alert('EmailJS not configured yet! Please add your credentials in Contact.jsx');
            }, 800);
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(() => {
                setIsLoading(false);
                setStatus('success');
                e.target.reset();
                setTimeout(() => setStatus(null), 5000);
            }, () => {
                setIsLoading(false);
                setStatus('error');
            });
    };

    const contactItems = [
        { icon: <Mail size={19} />, label: 'Email', value: 'Suyash.Motkari@gmail.com', href: 'mailto:Suyash.Motkari@gmail.com' },
        { icon: <MapPin size={19} />, label: 'Location', value: 'Nashik, Maharashtra', href: null },
        { icon: <Phone size={19} />, label: 'Phone', value: '+91 7058911643', href: 'tel:+917058911643' },
        { icon: <Linkedin size={19} />, label: 'LinkedIn', value: 'Connect on LinkedIn', href: 'https://linkedin.com/in/suyash-motkari-9733a3217' },
    ];

    return (
        <section id="contact" className="py-28 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                >
                    <div>
                        <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-paper-dim mb-4">
                            <span className="w-6 h-px bg-accent" />
                            Get In Touch
                        </div>
                        <h2 className="font-display font-semibold text-4xl md:text-5xl text-paper text-balance">
                            <TextReveal text="Let's build" />
                            <br />
                            <span className="text-accent"><TextReveal text="something great." delay={0.15} /></span>
                        </h2>
                        <p className="text-paper-dim mt-4 max-w-sm">
                            Open to full-time roles, freelance projects, and interesting collaborations.
                        </p>
                    </div>

                    <div className="space-y-1">
                        {contactItems.map((item) => {
                            const Wrapper = item.href ? 'a' : 'div';
                            return (
                                <Wrapper
                                    key={item.label}
                                    href={item.href}
                                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="flex items-center gap-4 py-3 text-paper-dim hover:text-paper transition-colors group"
                                >
                                    <div className="w-11 h-11 shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <span className="text-[10px] tracking-[0.2em] uppercase text-paper-faint block mb-0.5">{item.label}</span>
                                        <span className="text-sm">{item.value}</span>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-ink-soft/90 border border-white/10 p-8 rounded-2xl"
                >
                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs text-paper-dim">Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-transparent border-b border-white/15 text-paper px-1 py-2.5 focus:outline-none focus:border-accent transition-colors placeholder:text-paper-faint"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-paper-dim">Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-transparent border-b border-white/15 text-paper px-1 py-2.5 focus:outline-none focus:border-accent transition-colors placeholder:text-paper-faint"
                                placeholder="you@company.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-paper-dim">Message</label>
                            <textarea
                                name="message"
                                required
                                className="w-full bg-transparent border-b border-white/15 text-paper px-1 py-2.5 focus:outline-none focus:border-accent transition-colors h-28 resize-none placeholder:text-paper-faint"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                                status === 'error' ? 'bg-red-500/20 text-red-400' :
                                'bg-paper text-ink hover:bg-accent'
                            }`}
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={16} />
                            ) : status === 'success' ? (
                                <><CheckCircle size={16} /> Message sent</>
                            ) : status === 'error' ? (
                                <><AlertCircle size={16} /> Something went wrong</>
                            ) : (
                                <><Send size={16} /> Send Message</>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
