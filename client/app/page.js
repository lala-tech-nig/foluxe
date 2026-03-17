'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Microscope, ShieldCheck, Truck, Clock } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const slides = [
  {
    id: 1,
    title: "Premium Medical & Laboratory Solutions",
    subtitle: "Procurement, Supply, and Maintenance of High-Quality Scientific Equipment",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1600",
    cta: "Shop Now",
    href: "/products"
  },
  {
    id: 2,
    title: "Expert Equipment Servicing & Repair",
    subtitle: "Ensuring your laboratory machines operate at peak precision, 24/7.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1600",
    cta: "Contact Us",
    href: "/about"
  },
  {
    id: 3,
    title: "Analytical Grade Chemicals & Reagents",
    subtitle: "High-purity supplies for accurate diagnostic and research outcomes.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1600",
    cta: "Browse Chemicals",
    href: "/products?category=Chemicals+%26+Reagents"
  }
];

const features = [
  { icon: ShieldCheck, title: "Quality Assurance", desc: "ISO certified procurement" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Fast & secure shipping across Nigeria" },
  { icon: Microscope, title: "Technical Expertise", desc: "Professional installation & calibration" },
  { icon: Clock, title: "24/7 Support", desc: "Always available for emergencies" }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Hero carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fetch latest 4 products from API
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products?sort=newest&limit=4`);
        if (res.ok) {
          const data = await res.json();
          const normalized = data.slice(0, 4).map(p => ({
            ...p,
            images: p.images?.length > 0 ? p.images : (p.imageUrl ? [p.imageUrl] : []),
          }));
          setFeaturedProducts(normalized);
        }
      } catch {
        // Server unavailable — featured section will show empty state
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Hero Carousel */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover object-center scale-105" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <span className="text-white/70 uppercase tracking-[0.3em] text-sm font-semibold mb-6 block">Welcome to Foluxe</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 max-w-4xl leading-tight tracking-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
                {slide.subtitle}
              </p>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 text-sm font-bold tracking-wider uppercase rounded-full hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {slide.cta} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-10' : 'bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Ribbon */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 transition-transform hover:scale-105">
                  <feature.icon className="text-gray-900 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm tracking-wide">{feature.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products — live from DB */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 uppercase tracking-tighter">Featured Equipment</h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-6"></div>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Discover our top-rated medical and laboratory solutions tailored for high-precision environments.
            </p>
          </div>

          {loadingProducts ? (
            /* Skeleton */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  href={`/products/${product._id}`}
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden relative p-4">
                    <div className="w-full h-full relative rounded-xl overflow-hidden">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-wider font-bold">No Image</div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      {product.brand || product.category}
                    </span>
                    <h3 className="text-gray-900 font-bold mb-3 line-clamp-2 min-h-[3rem] text-sm leading-relaxed">{product.title}</h3>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="font-extrabold text-gray-900 text-sm">
                        {product.priceType === 'on-request'
                          ? <span className="italic text-gray-500 font-semibold text-xs">Price on Request</span>
                          : `₦${product.price?.toLocaleString()}`}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-400 text-sm font-medium">No products yet. Add your first product from the admin panel.</p>
            </div>
          )}

          <div className="text-center mt-20">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-10 py-4 border border-gray-200 bg-white text-gray-900 font-bold uppercase tracking-wider text-xs rounded-full hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              View Complete Catalog
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
