'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Microscope, FlaskConical, Beaker, Settings, ChevronRight } from 'lucide-react';

const products = [
    // Laboratory Equipment
    { id: 1, name: 'Advanced Binocular Microscope', category: 'Laboratory Equipment', description: 'High-resolution binocular microscope with LED illumination and 4 objective lenses.', icon: Microscope },
    { id: 2, name: 'Digital Centrifuge', category: 'Laboratory Equipment', description: 'Programmable benchtop centrifuge with variable speed settings up to 5000 RPM.', icon: Settings },
    { id: 3, name: 'Incubator Shaker', category: 'Laboratory Equipment', description: 'Temperature-controlled incubator shaker for microbiology and cell culture.', icon: Settings },
    { id: 4, name: 'Autoclave Sterilizer', category: 'Laboratory Equipment', description: 'Top-loading pressure steam sterilizer with digital control panel.', icon: Settings },

    // Medical Equipment
    { id: 5, name: 'Hematology Analyzer', category: 'Medical Equipment', description: '3-part differential automated hematology analyzer for rapid blood counts.', icon: Beaker },
    { id: 6, name: 'Clinical Chemistry Analyzer', category: 'Medical Equipment', description: 'Fully automated biochemistry analyzer for routine medical diagnostics.', icon: Activity },
    { id: 7, name: 'Patient Monitor', category: 'Medical Equipment', description: 'Multi-parameter bedside patient monitor with high-resolution display.', icon: Activity },
    { id: 8, name: 'Ultrasound Machine', category: 'Medical Equipment', description: 'Portable color Doppler ultrasound system for multiple clinical applications.', icon: Settings },

    // Chemicals & Reagents
    { id: 9, name: 'Analytical Grade Ethanol', category: 'Chemicals & Reagents', description: 'High-purity ethanol 99.9% for analytical and research use.', icon: FlaskConical },
    { id: 10, name: 'Culture Media (Nutrient Agar)', category: 'Chemicals & Reagents', description: 'Premium grade nutrient agar for general purpose microbial growth.', icon: FlaskConical },
    { id: 11, name: 'Diagnostic Reagent Kit', category: 'Chemicals & Reagents', description: 'Comprehensive diagnostic kit for clinical chemistry testing.', icon: FlaskConical },
    { id: 12, name: 'Sodium Chloride (Analytical)', category: 'Chemicals & Reagents', description: 'Pure sodium chloride crystals for laboratory preparations.', icon: FlaskConical },
];

import { Activity } from 'lucide-react';

const categories = ['All', 'Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents'];

export default function Products() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-32 pb-24">
            <section className="container mx-auto px-6 mb-16">
                <div className="max-w-3xl">
                    <h1 className="text-4xl lg:text-6xl font-bold font-outfit text-slate-900 mb-6">Our Product <span className="text-primary italic">Catalog</span></h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Explore our curated selection of high-end scientific equipment and laboratory chemicals. Each item is sourced from world-class manufacturers to ensure technical precision.
                    </p>
                </div>
            </section>

            {/* Filters & Search */}
            <section className="container mx-auto px-6 mb-12">
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={product.id}
                                className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-2xl transition-all flex flex-col"
                            >
                                <div className="w-full aspect-square bg-slate-50 rounded-3xl mb-8 flex items-center justify-center text-primary/20 group-hover:text-primary transition-colors relative overflow-hidden">
                                    <product.icon size={80} strokeWidth={1} />
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <span className="text-[10px] uppercase tracking-widest font-bold text-teal-600 mb-2">{product.category}</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 font-outfit leading-tight group-hover:text-primary transition-colors line-clamp-2 h-14">
                                    {product.name}
                                </h3>
                                <p className="text-slate-500 text-sm mb-8 line-clamp-3">
                                    {product.description}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        href={`/quote?product=${encodeURIComponent(product.name)}`}
                                        className="flex lg:inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 text-xs font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all w-full"
                                    >
                                        Request Quote <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-slate-400 italic">No products found matching your criteria.</p>
                    </div>
                )}
            </section>

            {/* Tech Support CTA */}
            <section className="container mx-auto px-6 mt-32">
                <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl lg:text-4xl font-bold font-outfit mb-6">Need Equipment Maintenance?</h2>
                        <p className="text-slate-400 mb-8 italic">
                            Our technical team provides expert repair, calibration, and preventive maintenance services for all medical and laboratory devices.
                        </p>
                        <Link
                            href="/maintenance"
                            className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
                        >
                            Learn About Maintenance
                        </Link>
                    </div>
                    <div className="relative z-10 flex gap-4">
                        <div className="w-32 h-32 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
                            <Settings size={40} className="text-slate-500" />
                        </div>
                        <div className="w-32 h-32 rounded-[2rem] bg-primary/20 border border-primary/30 flex items-center justify-center mt-8">
                            <Microscope size={40} className="text-primary" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
