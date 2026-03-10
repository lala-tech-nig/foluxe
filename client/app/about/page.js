'use client';

import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Handshake, Award } from 'lucide-react';

const values = [
    {
        title: 'Technical Expertise',
        description: 'Our team consists of highly skilled engineers and scientific experts committed to technical excellence.',
        icon: Settings
    },
    {
        title: 'Quality Assurance',
        description: 'We adhere to the highest international standards in procurement, calibration, and maintenance.',
        icon: ShieldCheck
    },
    {
        title: 'Customer Partnerships',
        description: 'We believe in long-term relationships, providing ongoing support well after the initial sale.',
        icon: Handshake
    },
    {
        title: 'Innovation',
        description: 'We continuously source the latest scientific technologies to empower Nigerian labs and clinics.',
        icon: Activity
    }
];

import { Settings, Activity } from 'lucide-react';

export default function About() {
    return (
        <div className="pt-32 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-24">
                <div className="max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block"
                    >
                        Since 2014
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-bold font-outfit text-slate-900 mb-8"
                    >
                        Bridging the Gap in <br />
                        <span className="text-primary italic">Scientific Excellence</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 leading-relaxed max-w-3xl"
                    >
                        FOLUXE INTEGRATED SERVICES LIMITED is a premier Medical and Laboratory Solutions provider based in Lagos, Nigeria. We specialize in the procurement, supply, and maintenance of high-quality scientific equipment and chemicals.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 relative z-10">
                    <div>
                        <div className="w-16 h-1 w-16 bg-primary mb-8 rounded-full" />
                        <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-4">
                            <Target className="text-primary" size={32} /> Our Mission
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed italic">
                            "To empower healthcare and research institutions in Nigeria by providing reliable, high-end laboratory and medical solutions that enhance diagnostic accuracy and scientific discovery."
                        </p>
                    </div>
                    <div>
                        <div className="w-16 h-1 w-16 bg-secondary mb-8 rounded-full" />
                        <h2 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-4">
                            <Eye className="text-secondary" size={32} /> Our Vision
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed italic">
                            "To be the most preferred and trusted partner for medical and laboratory procurement and maintenance services in West Africa, recognized for our integrity and technical prowess."
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
            </section>

            {/* Core Values */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-6">Our Core Values</h2>
                        <p className="text-slate-500 italic max-w-2xl mx-auto">
                            The principles that drive every interaction and every service we provide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-105 transition-transform">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center mb-8 border border-slate-100">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-32">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-8 leading-tight">Decades of Collective <br />Technical Expertise.</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Based in the heart of Ikeja, Lagos, we have built a reputation for being the go-to experts for complex laboratory equipment repairs and calibration. Our technical team is trained to handle high-precision instruments from world-renowned manufacturers.
                        </p>
                        <div className="flex items-start gap-6 p-8 bg-blue-50 rounded-3xl border border-blue-100">
                            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg">
                                <Award size={32} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Technical Excellence</h4>
                                <p className="text-slate-600 text-sm">Our engineers are certified specialists in hematology, chemistry, and molecular diagnostic equipment.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-video bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
                            <img src="https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Medical Technology" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 -skew-y-1">
                            <div className="text-5xl font-bold text-primary mb-2">10+</div>
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">Years of Service</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
