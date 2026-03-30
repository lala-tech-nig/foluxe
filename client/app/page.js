'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Microscope, ShieldCheck, Truck, Clock } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const features = [
  { icon: ShieldCheck, title: "Quality Assurance", desc: "ISO certified procurement" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Fast & secure shipping across Nigeria" },
  { icon: Microscope, title: "Technical Expertise", desc: "Professional installation & calibration" },
  { icon: Clock, title: "24/7 Support", desc: "Always available for emergencies" }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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

      {/* Hero Video Background */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <span className="text-white/70 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block animate-fade-in">
            WELCOME TO FOLUXE GLOBAL
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 max-w-5xl leading-[1.1] tracking-tight drop-shadow-2xl">
            QUALITY IN EVERY <span className="text-blue-400">DETAIL</span>
          </h1>
          <p className="text-base md:text-lg text-gray-100 mb-12 max-w-2xl font-medium leading-relaxed opacity-90">
            Welcome to Foluxe, Nigeria's leading destination for high-quality medical equipment, analytical chemicals, and expert technical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-xs font-black tracking-widest uppercase rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
            >
              Explore Shop <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/30 text-white text-xs font-black tracking-widest uppercase rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
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
