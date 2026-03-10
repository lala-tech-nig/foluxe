'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlaskConical, Activity, Microscope, Settings, CheckCircle2, ArrowRight } from 'lucide-react';

const servicesData = {
    'lab-chemicals': {
        title: 'Laboratory Chemicals Supply',
        subtitle: 'Procurement & Supply of Premium Analytical Chemicals',
        description: 'We source and supply high-purity chemicals used in diverse laboratory settings, ensuring accuracy and reliability in scientific experimentation.',
        icon: FlaskConical,
        items: ['Ethanol & Methanol', 'Hydrochloric Acid', 'Sodium Chloride', 'Analytical Reagents', 'Culture Media', 'Buffer Solutions'],
        customers: ['Universities', 'Research Institutes', 'Industrial Laboratories', 'Pharmaceutical Companies'],
        image: 'https://images.unsplash.com/photo-1614850523296-e8c041de4392?auto=format&fit=crop&q=80&w=1000'
    },
    'medical-chemicals': {
        title: 'Medical / Diagnostic Chemicals',
        subtitle: 'Supply of Vital Diagnostic Reagents & Consumables',
        description: 'Providing essential chemicals and kits used in medical testing and diagnosis, supporting healthcare providers with rapid and accurate results.',
        icon: Activity,
        items: ['Blood Test Reagents', 'Urine Test Chemicals', 'ELISA Kits', 'Rapid Test Kits', 'Diagnostic Reagents', 'Laboratory Test Kits'],
        customers: ['Hospitals', 'Medical Laboratories', 'Diagnostic Centers', 'Clinics', 'Public Health Agencies'],
        image: 'https://images.unsplash.com/photo-1579154236528-40391ca05639?auto=format&fit=crop&q=80&w=1000'
    },
    'lab-equipment': {
        title: 'Laboratory Equipment Sales & Repairs',
        subtitle: 'High-Precision Scientific Instruments & Maintenance',
        description: 'We offer a wide range of laboratory machines alongside professional installation, maintenance, and expert repair services.',
        icon: Microscope,
        items: ['Microscopes', 'Centrifuges', 'Incubators', 'Autoclaves', 'Spectrophotometers', 'Analytical Balances', 'Lab Ovens'],
        customers: ['Schools & Universities', 'Research Labs', 'Hospitals', 'Food & Beverage Industries'],
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1000'
    },
    'medical-equipment': {
        title: 'Medical / Diagnostic Equipment',
        subtitle: 'Sales & Expert Maintenance of Hospital Machines',
        description: 'Partnering with global brands to bring world-class diagnostic equipment to Nigerian hospitals, supported by our robust technical repair team.',
        icon: Settings,
        items: ['Hematology Analyzers', 'Chemistry Analyzers', 'Ultrasound Machines', 'Blood Analyzers', 'ECG Machines', 'Patient Monitors'],
        customers: ['State & Private Hospitals', 'Diagnostic Centers', 'General Clinics', 'Specialist Medical Centers'],
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000'
    }
};

export default function ServiceDetail() {
    const { slug } = useParams();
    const service = servicesData[slug];

    if (!service) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 font-outfit">Service Not Found</h1>
                <Link href="/" className="text-primary font-bold">Return Home</Link>
            </div>
        </div>
    );

    return (
        <div className="pt-32 pb-24">
            <section className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                            <service.icon size={32} />
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold font-outfit text-slate-900 mb-4">{service.title}</h1>
                        <p className="text-xl text-primary font-medium mb-8 italic">{service.subtitle}</p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-12">{service.description}</p>

                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                        >
                            Request a Quote <ArrowRight size={20} />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl relative">
                            <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Details Grid */}
            <section className="py-24 bg-slate-50 mt-24">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
                    {/* Key Items */}
                    <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                        <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-8 border-b border-slate-100 pb-4">Key Products & Services</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {service.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="font-medium text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Target Customers */}
                    <div className="bg-slate-900 p-12 rounded-[2.5rem] text-white shadow-xl">
                        <h3 className="text-2xl font-bold font-outfit mb-8 border-b border-white/10 pb-4">Industries We Serve</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {service.customers.map((customer, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-400">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="font-medium text-sm">{customer}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pt-24 container mx-auto px-6">
                <div className="p-12 rounded-[3rem] bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-3xl font-bold font-outfit text-slate-900 mb-2">Need a Specific Item?</h3>
                        <p className="text-slate-600 italic">We can source specialized medical and lab items tailored to your needs.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all whitespace-nowrap"
                    >
                        Contact Sales Team
                    </Link>
                </div>
            </section>
        </div>
    );
}
