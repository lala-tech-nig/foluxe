'use client';

import { ShieldCheck, Target, Eye, Microscope, Users, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-black border-b border-gray-900">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000" alt="Laboratory" className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>
                <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 text-center text-white">
                    <span className="uppercase tracking-[0.3em] text-xs font-semibold text-gray-400 mb-6 block">Our Story</span>
                    <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tighter">About Foluxe</h1>
                    <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Foluxe Integrated Services Limited is Nigeria's premier provider of top-tier medical and laboratory solutions. We bridge the gap between advanced scientific technology and the institutions that need them.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        <div className="p-10 lg:p-14 bg-gray-50 rounded-[2rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100">
                            <div className="w-16 h-16 bg-white shadow-sm flex items-center justify-center text-gray-900 mb-8 rounded-full border border-gray-100">
                                <Target size={28} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 uppercase tracking-widest">Our Mission</h3>
                            <p className="text-gray-500 leading-relaxed text-lg font-light">
                                To empower healthcare and research institutions in Nigeria by providing reliable, high-end laboratory and medical solutions that enhance diagnostic accuracy and scientific discovery. We are committed to operational excellence and technical superiority.
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-900 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                        </div>

                        <div className="p-10 lg:p-14 bg-gray-50 rounded-[2rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100">
                            <div className="w-16 h-16 bg-white shadow-sm flex items-center justify-center text-gray-900 mb-8 rounded-full border border-gray-100">
                                <Eye size={28} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 uppercase tracking-widest">Our Vision</h3>
                            <p className="text-gray-500 leading-relaxed text-lg font-light">
                                To be the most preferred and trusted partner for medical and laboratory procurement and maintenance services in West Africa, recognized globally for our absolute integrity and technical prowess.
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-900 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 lg:py-32 bg-black text-white">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 uppercase tracking-tighter">Why Partner With Us?</h2>
                    <div className="w-24 h-1 bg-white mx-auto mb-16 opacity-20"></div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 text-left">
                        {[
                            { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'Every product and service we offer meets strictly vetted international standards.' },
                            { icon: Award, title: 'Decades of Experience', desc: 'Our team comprises seasoned engineers and scientific procurement experts.' },
                            { icon: Microscope, title: 'Technical Mastery', desc: 'We don’t just supply; we install, calibrate, and maintain your critical equipment.' },
                            { icon: Users, title: 'Client-Centric Approch', desc: 'Your operational success is our priority. We offer 24/7 technical support.' }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col gap-5 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <feature.icon className="w-6 h-6 transition-colors" />
                                </div>
                                <h4 className="text-lg font-bold">{feature.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
