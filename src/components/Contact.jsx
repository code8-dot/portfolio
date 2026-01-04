import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Linkedin, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS SERVICE ID, TEMPLATE ID, AND PUBLIC KEY
        const SERVICE_ID = 'service_0czvprb';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        if (SERVICE_ID === 'YOUR_SERVICE_ID') {
            setTimeout(() => {
                setIsLoading(false);
                alert("EmailJS not configured yet! Please add your credentials in Contact.jsx");
            }, 1000);
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setIsLoading(false);
                setStatus('success');
                e.target.reset();
                setTimeout(() => setStatus(null), 5000);
            }, (error) => {
                console.log(error.text);
                setIsLoading(false);
                setStatus('error');
            });
    };

    return (
        <section id="contact" className="py-20 px-4 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-purple/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-4xl font-orbitron font-bold mb-2">INITIALIZE <br /><span className="text-cyber">CONNECTION</span></h2>
                        <p className="text-gray-400">Ready to build the unexpected. Let's collaborate.</p>
                    </div>

                    <div className="space-y-6">
                        <a href="mailto:Suyash.Motkari@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-cyber group-hover:border-cyber/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                                <Mail size={20} />
                            </div>
                            <div>
                                <span className="text-xs text-cyber-purple font-mono block mb-1">EMAIL</span>
                                <span className="font-mono">Suyash.Motkari@gmail.com</span>
                            </div>
                        </a>

                        <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-cyber group-hover:border-cyber/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <span className="text-xs text-cyber-purple font-mono block mb-1">LOCATION</span>
                                <span className="font-mono">Nashik, Maharashtra</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-cyber group-hover:border-cyber/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                                <Phone size={20} />
                            </div>
                            <div>
                                <span className="text-xs text-cyber-purple font-mono block mb-1">PHONE</span>
                                <span className="font-mono">+91 7058911643</span>
                            </div>
                        </div>

                        <a href="https://linkedin.com/in/suyash-motkari-9733a3217" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-cyber group-hover:border-cyber/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                                <Linkedin size={20} />
                            </div>
                            <div>
                                <span className="text-xs text-cyber-purple font-mono block mb-1">LINKEDIN</span>
                                <span className="font-mono">Connect on LinkedIn</span>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Terminal Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-black/80 border border-cyber/30 p-6 rounded relative backdrop-blur-sm"
                >
                    <div className="absolute top-0 left-0 w-full h-8 bg-cyber/10 border-b border-cyber/30 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-mono text-xs text-cyber/80">suyash@admin-terminal:~</span>
                    </div>

                    <form ref={form} onSubmit={sendEmail} className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-cyber">{">>"} ENTER_IDENTITY</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-black/50 border-b border-gray-700 text-white px-2 py-2 focus:outline-none focus:border-cyber transition-colors font-mono"
                                placeholder="Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-cyber">{">>"} ENTER_CONTACT_PROTOCOL</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-black/50 border-b border-gray-700 text-white px-2 py-2 focus:outline-none focus:border-cyber transition-colors font-mono"
                                placeholder="Email"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-cyber">{">>"} TRANSMIT_MESSAGE</label>
                            <textarea
                                name="message"
                                required
                                className="w-full bg-black/50 border-b border-gray-700 text-white px-2 py-2 focus:outline-none focus:border-cyber transition-colors font-mono h-32 resize-none"
                                placeholder="Type your message..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className={`w-full border py-3 font-mono transition-all duration-300 flex items-center justify-center gap-2 ${status === 'success' ? 'bg-green-900/20 border-green-500 text-green-500' :
                                status === 'error' ? 'bg-red-900/20 border-red-500 text-red-500' :
                                    'bg-cyber/20 border-cyber text-cyber hover:bg-cyber hover:text-black'
                                }`}
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={16} />
                            ) : status === 'success' ? (
                                <> <CheckCircle size={16} /> TRANSMISSION_COMPLETE </>
                            ) : status === 'error' ? (
                                <> <AlertCircle size={16} /> TRANSMISSION_FAILED </>
                            ) : (
                                <> <Send size={16} /> EXECUTE_TRANSMISSION </>
                            )}
                        </motion.button>

                        {/* Instruction Note */}
                        {status === null && (
                            <p className="text-[10px] text-gray-500 font-mono text-center pt-2">
                                * System configured for EmailJS transmission.
                            </p>
                        )}
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
