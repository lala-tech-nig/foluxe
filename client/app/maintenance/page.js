'use client';

import { motion } from 'framer-motion';
import { Settings, Wrench, ShieldCheck, Thermometer, Calendar, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        title: 'Routine Maintenance',
        description: 'Scheduled preventive maintenance to extend the lifespan of your critical laboratory and medical equipment.',
        icon: Calendar,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        title: 'Precision Calibration',
        description: 'Expert calibration services for analytical balances, spectrophotometers, and diagnostic analyzers.',
        icon: Thermometer,
        color: 'bg-teal-50 text-teal-600'
    },
    {
        title: 'Expert Repairs',
        description: 'Rapid diagnostic and technical repair for malfunctioning hospital machines and lab instruments.',
        icon: Wrench,
        color: 'bg-orange-50 text-orange-600'
    },
    {
        title: 'Technical Consultation',
        description: 'Professional advice on equipment optimization, layout planning, and compliance standards.',
        icon: ShieldCheck,
        color: 'bg-purple-50 text-purple-600'
    }
];

export default function Maintenance() {
    return (
        <div className="pt-32 pb-24">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-24">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center mb-8 shadow-xl shadow-primary/20"
                    >
                        <Settings size={32} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-7xl font-bold font-outfit text-slate-900 mb-8"
                    >
                        Reliability Defined by <br />
                        <span className="text-primary italic">Technical Excellence</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 leading-relaxed max-w-3xl italic"
                    >
                        Don't let equipment downtime hinder your scientific or medical progress. Our specialized engineering team ensures your machines perform at peak precision, 24/7.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.color}`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                    {feature.description}
                                </p>
                                <Link href="/quote" className="text-xs font-bold text-primary flex items-center gap-2 group">
                                    Book Service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-32">
                <div className="container mx-auto px-6 lg:flex items-center gap-24">
                    <div className="lg:w-1/2 mb-16 lg:mb-0">
                        <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-12">Our Technical <span className="text-primary italic">Process</span>.</h2>
                        <div className="space-y-12">
                            {[
                                { step: '01', title: 'Diagnostic Assessment', desc: 'Detailed inspection of the equipment to identify core technical faults or calibration drifts.' },
                                { step: '02', title: 'Precision Servicing', desc: 'Expert repair using genuine manufacturer components and specialized technical tools.' },
                                { step: '03', title: 'Verification & Calibration', desc: 'Rigorous testing against international standards to ensure 100% operational accuracy.' },
                                { step: '04', title: 'Detailed Reporting', desc: 'Provision of a comprehensive service certificate and maintenance recommendation report.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="text-4xl font-black text-slate-200 group-hover:text-primary/20 transition-colors font-outfit">{item.step}</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="aspect-square bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                    <Zap size={400} className="text-white -rotate-12 translate-x-1/2" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-white mb-8">Why technical maintenance matters?</h3>
                                    <div className="space-y-6">
                                        {[
                                            'Reduces risk of diagnostic errors',
                                            'Prevents sudden equipment failure',
                                            'Increases longevity of scientific assets',
                                            'Ensures compliance with medical standards',
                                            'Optimizes operational efficiency'
                                        ].map((point, i) => (
                                            <div key={i} className="flex items-center gap-4 text-slate-400">
                                                <CheckCircle2 size={20} className="text-primary" />
                                                <span className="font-medium text-sm">{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href="/quote"
                                        className="inline-block mt-12 px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
                                    >
                                        Book Maintenance Now
                                    </Link>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[2.5rem] shadow-2xl border border-slate-200">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-teal-500 text-white flex items-center justify-center">
                                        <Settings size={32} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 font-outfit">24/7</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-nowrap">Support Available</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
