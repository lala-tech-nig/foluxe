'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
    return (
        <div className="pt-32 pb-24">
            <section className="container mx-auto px-6 mb-24 text-center">
                <h1 className="text-5xl lg:text-7xl font-bold font-outfit text-slate-900 mb-8">Get in <span className="text-primary italic">Touch</span>.</h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto italic">
                    Whether you need a specific product, equipment repair, or technical advice, our team is here to assist you.
                </p>
            </section>

            {/* Contact Cards */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Call Us',
                            info: ['0814 213 5297', '0802 442 0010'],
                            icon: Phone,
                            color: 'bg-blue-50 text-blue-600',
                            cta: 'Call Now',
                            href: 'tel:08142135297'
                        },
                        {
                            title: 'Email Us',
                            info: ['foluxeconcepts@gmail.com'],
                            icon: Mail,
                            color: 'bg-teal-50 text-teal-600',
                            cta: 'Send Email',
                            href: 'mailto:foluxeconcepts@gmail.com'
                        },
                        {
                            title: 'WhatsApp',
                            info: ['Chat with our experts'],
                            icon: MessageCircle,
                            color: 'bg-green-50 text-green-600',
                            cta: 'Open WhatsApp',
                            href: 'https://wa.me/2348142135297'
                        }
                    ].map((card, i) => (
                        <motion.a
                            key={i}
                            href={card.href}
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm ${card.color}`}>
                                <card.icon size={30} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                            <div className="space-y-1 mb-8">
                                {card.info.map((line, j) => (
                                    <p key={j} className="text-slate-500 font-medium">{line}</p>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-primary uppercase tracking-widest group-hover:scale-110 transition-transform">
                                {card.cta}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* Map & Address */}
            <section className="container mx-auto px-6">
                <div className="bg-slate-900 rounded-[4rem] overflow-hidden lg:flex items-stretch shadow-2xl">
                    <div className="lg:w-1/2 p-12 lg:p-24 text-white flex flex-col justify-center">
                        <h2 className="text-4xl font-bold font-outfit mb-12">Our Headquarters.</h2>
                        <div className="space-y-12">
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">Location</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                                        1st Floor, Obafemi Awolowo House, 29/31 Obafemi Awolowo Way, Ikeja, Lagos, Nigeria.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                                    <Send size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">Service Hours</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        Monday — Friday: 8:00 AM — 6:00 PM <br />
                                        Saturday: 9:00 AM — 2:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-16 border-t border-white/10">
                            <p className="text-sm text-slate-500 italic">Serving hospitals and research centers nationwide.</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 min-h-[500px] bg-slate-800 relative grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Simple Map Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin size={100} className="text-primary/20 animate-pulse" />
                        </div>
                        {/* In a real scenario, embed a Google Map here */}
                        <div className="absolute bottom-10 left-10 p-6 glass rounded-3xl text-xs font-bold uppercase tracking-widest">
                            Ikeja, Lagos
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8">Prefer a Direct Quote?</h3>
                    <Link
                        href="/quote"
                        className="inline-block px-12 py-5 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
                    >
                        Go to Quote Form
                    </Link>
                </div>
            </section>
        </div>
    );
}
