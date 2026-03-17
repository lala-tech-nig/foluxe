'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowRight, SlidersHorizontal, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';



const categories = ['All', 'Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'];
const priceTypeOptions = [
    { label: 'All', value: 'All' },
    { label: 'Fixed Price', value: 'fixed' },
    { label: 'On Request', value: 'on-request' },
];
const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
];

const WHATSAPP_NUMBER = '2348142135297';

function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Image auto-slide card
function ProductCard({ product }) {
    const [imgIndex, setImgIndex] = useState(0);
    const intervalRef = useRef(null);
    const images = product.images && product.images.length > 0 ? product.images : [];

    const startSlide = useCallback(() => {
        if (images.length <= 1) return;
        intervalRef.current = setInterval(() => {
            setImgIndex(prev => (prev + 1) % images.length);
        }, 1000);
    }, [images.length]);

    const stopSlide = useCallback(() => {
        clearInterval(intervalRef.current);
        setImgIndex(0);
    }, []);

    return (
        <Link
            href={`/products/${product._id}`}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={startSlide}
            onMouseLeave={stopSlide}
        >
            <div className="aspect-square bg-gray-50 overflow-hidden relative p-4">
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                    {images.length > 0 ? (
                        <>
                            <img
                                src={images[imgIndex]}
                                alt={product.title}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                            {/* Dot indicators */}
                            {images.length > 1 && (
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                    {images.map((_, i) => (
                                        <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'bg-gray-900 w-3' : 'bg-gray-400/60'}`} />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-wider font-bold">No Image</div>
                    )}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">{product.brand || product.category}</span>
                <h3 className="text-gray-900 font-bold mb-3 line-clamp-2 min-h-[3rem] text-sm leading-relaxed">{product.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="font-extrabold text-gray-900 text-sm">
                        {product.priceType === 'on-request' ? (
                            <span className="italic text-gray-500 font-semibold text-xs">Price on Request</span>
                        ) : (
                            `₦${product.price?.toLocaleString()}`
                        )}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [activeBrand, setActiveBrand] = useState('All');
    const [activePriceType, setActivePriceType] = useState('All');
    const [activeSort, setActiveSort] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    const debouncedSearch = useRef(null);

    // Fetch products with filters applied server-side
    const fetchProducts = useCallback(async (overrides = {}) => {
        setLoading(true);
        const params = new URLSearchParams();
        const q = overrides.searchQuery !== undefined ? overrides.searchQuery : searchQuery;
        const cat = overrides.activeCategory !== undefined ? overrides.activeCategory : activeCategory;
        const brand = overrides.activeBrand !== undefined ? overrides.activeBrand : activeBrand;
        const priceType = overrides.activePriceType !== undefined ? overrides.activePriceType : activePriceType;
        const sort = overrides.activeSort !== undefined ? overrides.activeSort : activeSort;

        if (q) params.set('search', q);
        if (cat !== 'All') params.set('category', cat);
        if (brand !== 'All') params.set('brand', brand);
        if (priceType !== 'All') params.set('priceType', priceType);
        params.set('sort', sort);

        try {
            const res = await fetch(`${API_URL}/api/products?${params}`);
            if (res.ok) {
                const data = await res.json();
                // Normalize: support both old imageUrl and new images[]
                const normalized = data.map(p => ({
                    ...p,
                    images: p.images?.length > 0 ? p.images : (p.imageUrl ? [p.imageUrl] : []),
                }));
                setProducts(normalized);
            } else {
                setProducts([]);
            }
        } catch {
            // Server unavailable — show empty state
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, activeCategory, activeBrand, activePriceType, activeSort]);

    // Fetch brands for filters
    useEffect(() => {
        fetch(`${API_URL}/api/products/meta`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.brands?.length) setBrands(['All', ...data.brands]);
                else setBrands(['All']);
            })
            .catch(() => setBrands(['All']));
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [activeCategory, activeBrand, activePriceType, activeSort]);

    // Debounced search
    const handleSearchChange = (value) => {
        setSearchQuery(value);
        clearTimeout(debouncedSearch.current);
        debouncedSearch.current = setTimeout(() => {
            fetchProducts({ searchQuery: value });
        }, 350);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setActiveCategory('All');
        setActiveBrand('All');
        setActivePriceType('All');
        setActiveSort('newest');
        fetchProducts({ searchQuery: '', activeCategory: 'All', activeBrand: 'All', activePriceType: 'All', activeSort: 'newest' });
    };

    const specialRequestUrl = buildWhatsAppUrl(
        searchQuery
            ? `Hi Foluxe, I searched for "${searchQuery}" but couldn't find what I'm looking for. Can you help me?`
            : `Hi Foluxe, I can't find what I'm looking for in your catalog. Can you help me?`
    );

    const hasActiveFilters = activeCategory !== 'All' || activeBrand !== 'All' || activePriceType !== 'All' || searchQuery;

    return (
        <div className="min-h-screen bg-white pt-10 pb-24">

            {/* Page Header */}
            <section className="container mx-auto px-6 md:px-12 max-w-7xl mb-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase tracking-tighter mb-4">Shop Catalog</h1>
                        <div className="w-20 h-1 bg-gray-900"></div>
                    </div>
                    {/* WhatsApp CTA - always visible */}
                    <a
                        href={specialRequestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366] text-white font-bold text-sm rounded-full shadow-md hover:bg-[#20bd5a] transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <MessageCircle size={18} />
                        Can't find what you need?
                    </a>
                </div>
            </section>

            {/* Filters Bar */}
            <section className="container mx-auto px-6 md:px-12 max-w-7xl mb-10 sticky top-[calc(4rem)] z-30">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm">
                    {/* Top row: search + filter toggle */}
                    <div className="flex gap-3 p-4 border-b border-gray-100">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products, brands, keywords..."
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                            />
                            {searchQuery && (
                                <button onClick={() => handleSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${showFilters || hasActiveFilters
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'}`}>
                            <SlidersHorizontal size={16} />
                            Filters {hasActiveFilters && <span className="w-2 h-2 bg-white rounded-full"></span>}
                        </button>
                        {/* Sort */}
                        <select
                            value={activeSort}
                            onChange={(e) => { setActiveSort(e.target.value); fetchProducts({ activeSort: e.target.value }); }}
                            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-bold focus:outline-none focus:border-gray-900 transition-all cursor-pointer hidden md:block"
                        >
                            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>

                    {/* Expanded filters */}
                    {showFilters && (
                        <div className="p-4 flex flex-col gap-4">
                            {/* Category */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => { setActiveCategory(cat); fetchProducts({ activeCategory: cat }); }}
                                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${activeCategory === cat
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brand */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Brand</p>
                                <div className="flex flex-wrap gap-2">
                                    {brands.map(b => (
                                        <button key={b} onClick={() => { setActiveBrand(b); fetchProducts({ activeBrand: b }); }}
                                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${activeBrand === b
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Type */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Price Type</p>
                                <div className="flex gap-2">
                                    {priceTypeOptions.map(opt => (
                                        <button key={opt.value} onClick={() => { setActivePriceType(opt.value); fetchProducts({ activePriceType: opt.value }); }}
                                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${activePriceType === opt.value
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <button onClick={clearFilters}
                                    className="self-start text-xs font-bold text-gray-500 underline hover:text-gray-900 transition-colors">
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Product Grid */}
            <section className="container mx-auto px-6 md:px-12 max-w-7xl">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl aspect-[3/4] animate-pulse" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">
                            {products.length} product{products.length !== 1 ? 's' : ''} found
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map(product => <ProductCard key={product._id} product={product} />)}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-32 bg-gray-50 rounded-3xl border border-gray-100">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                            <Search size={28} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">No Products Found</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
                            We couldn't find a match for <strong>"{searchQuery || 'your search'}"</strong>.
                            Send us a special request and we'll help you find it!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={clearFilters}
                                className="px-6 py-3 border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-full hover:border-gray-900 hover:text-gray-900 transition-all">
                                Clear Search
                            </button>
                            <a
                                href={specialRequestUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-[#25D366] text-white font-bold text-sm rounded-full shadow-md hover:bg-[#20bd5a] transition-all"
                            >
                                <MessageCircle size={16} />
                                Send a Special Request
                            </a>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading catalog...</p>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
