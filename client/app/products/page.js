'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, ArrowRight } from 'lucide-react';

// Hardcoded mock data to simulate the backend before we connect it
const mockProducts = [
    { _id: '1', title: 'Advanced Binocular Microscope', category: 'Laboratory Equipment', description: 'High-resolution binocular microscope with LED illumination and 4 objective lenses.', price: 450000, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' },
    { _id: '2', title: 'Digital Centrifuge 5000 RPM', category: 'Laboratory Equipment', description: 'Programmable benchtop centrifuge with variable speed settings up to 5000 RPM.', price: null, imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800' },
    { _id: '3', title: 'Hematology Analyzer', category: 'Medical Equipment', description: '3-part differential automated hematology analyzer for rapid blood counts.', price: 1200000, imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' },
    { _id: '4', title: 'Analytical Grade Ethanol (99.9%)', category: 'Chemicals & Reagents', description: 'High-purity ethanol 99.9% for analytical and research use.', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800' },
    { _id: '5', title: 'Diagnostic Reagent Kit', category: 'Chemicals & Reagents', description: 'Comprehensive diagnostic kit for clinical chemistry testing.', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1579154236528-40391ca05639?auto=format&fit=crop&q=80&w=800' },
    { _id: '6', title: 'Patient Monitor', category: 'Medical Equipment', description: 'Multi-parameter bedside patient monitor with high-resolution display.', price: null, imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'];

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    const [products, setProducts] = useState(mockProducts); // Will be replaced by fetch
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-12 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-12">
                <div className="max-w-3xl">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Our Shop Catalog</h1>
                    <div className="w-16 h-1 bg-primary mb-6"></div>
                    <p className="text-slate-600">
                        Browse our extensive collection of premium medical and laboratory products.
                    </p>
                </div>
            </section>

            {/* Filters & Search Bar */}
            <section className="container mx-auto px-6 mb-12">
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white p-4 border border-gray-200 shadow-sm">
                    {/* Categories Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-sm font-semibold transition-colors ${activeCategory === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="container mx-auto px-6">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Link href={`/products/${product._id}`} key={product._id} className="group bg-white border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2 block">{product.category}</span>
                                    <h3 className="text-slate-900 font-bold mb-2 line-clamp-2 min-h-[3rem]">{product.title}</h3>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="font-bold text-slate-900">
                                            {product.price ? `₦${product.price.toLocaleString()}` : 'Request Quote'}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white border border-gray-200">
                        <p className="text-slate-500">No products found matching your search criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-4 text-primary font-bold hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-12 pb-24 container mx-auto px-6 text-center text-slate-500">Loading catalog...</div>}>
            <ShopContent />
        </Suspense>
    );
}
