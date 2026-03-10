'use client';

import { ShieldCheck, Target, Eye, Microscope, Users, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-slate-900 border-b-8 border-primary">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000" alt="Laboratory" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                    <span className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-4 block">Our Story</span>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Foluxe</h1>
                    <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Foluxe Integrated Services Limited is Nigeria's premier provider of top-tier medical and laboratory solutions. We bridge the gap between advanced scientific technology and the institutions that need them.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        <div className="p-10 bg-slate-50 border border-slate-100 rounded-sm relative overflow-hidden group hover:border-primary transition-colors">
                            <div className="w-16 h-16 bg-white shadow-sm flex items-center justify-center text-primary mb-8 rounded-full border border-slate-100">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-wide">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To empower healthcare and research institutions in Nigeria by providing reliable, high-end laboratory and medical solutions that enhance diagnostic accuracy and scientific discovery. We are committed to operational excellence and technical superiority.
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                        </div>

                        <div className="p-10 bg-slate-50 border border-slate-100 rounded-sm relative overflow-hidden group hover:border-primary transition-colors">
                            <div className="w-16 h-16 bg-white shadow-sm flex items-center justify-center text-primary mb-8 rounded-full border border-slate-100">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-wide">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To be the most preferred and trusted partner for medical and laboratory procurement and maintenance services in West Africa, recognized globally for our absolute integrity and technical prowess.
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 uppercase tracking-widest">Why Partner With Us?</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                        {[
                            { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'Every product and service we offer meets strictly vetted international standards.' },
                            { icon: Award, title: 'Decades of Experience', desc: 'Our team comprises seasoned engineers and scientific procurement experts.' },
                            { icon: Microscope, title: 'Technical Mastery', desc: 'We don’t just supply; we install, calibrate, and maintain your critical equipment.' },
                            { icon: Users, title: 'Client-Centric Approch', desc: 'Your operational success is our priority. We offer 24/7 technical support.' }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <feature.icon className="text-primary w-10 h-10" />
                                <h4 className="text-xl font-bold">{feature.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
