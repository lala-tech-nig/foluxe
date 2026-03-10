'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

function QuoteForm() {
    const searchParams = useSearchParams();
    const initialProduct = searchParams.get('product') || '';

    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        phone: '',
        productNeeded: initialProduct,
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            // In a real scenario, we would call our backend here:
            // await fetch('http://localhost:5000/api/quotes', { ... })
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 text-center"
            >
                <div className="w-20 h-20 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto mb-8 shadow-lg shadow-teal-500/20">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-4">Request Received!</h2>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto">
                    Thank you for reaching out to FOLUXE. Our technical sales team will review your request and contact you within 24 hours.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
                >
                    Send Another Request
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 lg:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-8">Request a <span className="text-primary italic">Custom Quote</span></h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Full Name</label>
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Organization</label>
                        <input
                            required
                            type="text"
                            placeholder="Hospital or Lab Name"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Email Address</label>
                        <input
                            required
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Phone Number</label>
                        <input
                            required
                            type="tel"
                            placeholder="080 0000 0000"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Product/Service Interested In</label>
                    <input
                        type="text"
                        placeholder="e.g. Hematology Analyzer or Lab Chemicals"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.productNeeded}
                        onChange={(e) => setFormData({ ...formData, productNeeded: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Your Message (Optional)</label>
                    <textarea
                        rows={4}
                        placeholder="Please provide details about your requirements..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                >
                    {isSubmitting ? 'Sending Request...' : <>Send Quote Request <Send size={20} /></>}
                </button>
            </form>
        </div>
    );
}

export default function QuotePage() {
    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left Side: Info */}
                    <div className="lg:col-span-4 py-8">
                        <h1 className="text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mb-8">Get a Personalized <span className="text-primary italic">Proposal</span>.</h1>
                        <p className="text-slate-600 mb-12 italic">
                            Our experts are ready to help you find the perfect medical and laboratory solutions for your facility.
                        </p>

                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Call for Assistance</h4>
                                    <p className="text-sm text-slate-500">0814 213 5297 <br /> 0802 442 0010</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Email Sales</h4>
                                    <p className="text-sm text-slate-500">foluxeconcepts@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Visit Office</h4>
                                    <p className="text-sm text-slate-500 max-w-[200px]">1st Floor, Obafemi Awolowo House, Ikeja, Lagos.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-primary rounded-[2.5rem] text-white">
                            <div className="text-sm font-bold uppercase tracking-widest mb-4 opacity-60">Success Story</div>
                            <p className="text-lg italic font-medium leading-relaxed mb-6">"FOLUXE transformed our diagnostic lab with their high-precision equipment and superb maintenance support."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20" />
                                <div>
                                    <div className="text-sm font-bold">Dr. Adebayo</div>
                                    <div className="text-[10px] opacity-60">St. Mary's Diagnostic Center</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-8">
                        <Suspense fallback={<div className="p-12 text-center text-slate-400 italic">Loading form assistance...</div>}>
                            <QuoteForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
