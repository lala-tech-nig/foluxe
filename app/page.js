'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Beaker, Activity, Truck, Settings, ArrowRight, CheckCircle2, FlaskConical, Microscope } from 'lucide-react';

const services = [
  {
    title: 'Laboratory Chemicals',
    description: 'Procurement and supply of premium laboratory chemicals and reagents for research and industry.',
    icon: FlaskConical,
    href: '/services/lab-chemicals',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Medical Reagents',
    description: 'High-quality diagnostic reagents and chemicals for hospitals and clinical laboratories.',
    icon: Activity,
    href: '/services/medical-chemicals',
    color: 'bg-teal-50 text-teal-600'
  },
  {
    title: 'Lab Equipment',
    description: 'Sales and professional repairs of laboratory machines, from microscopes to centrifuges.',
    icon: Microscope,
    href: '/services/lab-equipment',
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    title: 'Medical Devices',
    description: 'Expert sales and maintenance of hospital machines and diagnostic equipment.',
    icon: Settings,
    href: '/services/medical-equipment',
    color: 'bg-cyan-50 text-cyan-600'
  }
];

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Products Supplied', value: '500+' },
  { label: 'Clients Served', value: '200+' },
  { label: 'Repairs Completed', value: '1000+' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 hero-gradient" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 500 500" className="w-full h-full text-primary/20">
            <path d="M150,50 Q300,0 450,50 T450,250 T150,450 T50,250 T150,50" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Empowering Nigeria's Health & Science
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold font-outfit text-slate-900 leading-[1.1] mb-8">
              Premium Medical & <br />
              <span className="text-primary italic">Laboratory</span> Solutions.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              FOLUXE INTEGRATED SERVICES LIMITED is your trusted partner for high-quality laboratory chemicals, diagnostic reagents, and scientific equipment sales and maintenance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
              >
                Browse Products <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Our Services
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* This would ideally be an image, using a placeholder box for now */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="w-full aspect-square bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Microscope size={200} className="text-primary/10" />
              </div>
              <img
                src="/images/medical_lab_hero.png"
                alt="Medical Laboratory"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-xl animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">ISO Certified</div>
                  <div className="text-[10px] text-slate-500">Quality Guaranteed</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <Truck size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Swift Delivery</div>
                  <div className="text-[10px] text-slate-500">Across Nigeria</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-6">Our Core Specialties</h2>
            <p className="text-slate-500 italic">
              Comprehensive solutions tailored for hospitals, universities, research institutes, and diagnostic centers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.color}`}>
                  <service.icon size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
                <Link href={service.href} className="text-xs font-bold text-primary flex items-center gap-2 group/link">
                  Learn More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 bg-slate-200 rounded-3xl overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1579154273155-236b3f7fadb2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Research" />
                  </div>
                  <div className="h-40 bg-primary/10 rounded-3xl flex items-center justify-center">
                    <Microscope size={60} className="text-primary/20" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-40 bg-secondary/10 rounded-3xl flex items-center justify-center">
                    <FlaskConical size={60} className="text-secondary/20" />
                  </div>
                  <div className="h-64 bg-slate-200 rounded-3xl overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Medical Lab" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-8">Why Choose <span className="text-primary italic">FOLUXE</span>?</h2>
              <p className="text-slate-600 mb-12">
                With a deep understanding of the Nigrian healthcare landscape, we provide more than just products. We provide peace of mind through technical excellence and reliable support.
              </p>

              <div className="space-y-6">
                {[
                  'Authorized distributors of global scientific brands',
                  'ISO certified procurement and calibration processes',
                  'Expert technical team for equipment maintenance',
                  'Competitive pricing and swift delivery nationwide',
                  'Comprehensive 24/7 technical support'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-block mt-12 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white">
                <circle cx="0" cy="0" r="40" fill="currentColor" />
                <circle cx="100" cy="100" r="40" fill="currentColor" />
              </svg>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold font-outfit mb-8 leading-tight">Ready to Equip Your Facility with the Best?</h2>
              <p className="text-blue-100 text-lg mb-12 italic">
                Get a custom quote for your laboratory or medical equipment needs today.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/quote"
                  className="px-10 py-5 bg-white text-primary font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-primary-foreground/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/10 transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
