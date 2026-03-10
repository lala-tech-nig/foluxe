'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Microscope, ShieldCheck, Truck, Clock } from 'lucide-react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Hero Carousel */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover object-center" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <span className="text-white uppercase tracking-[0.3em] text-sm font-semibold mb-6 block animate-fade-in-up">Welcome to Foluxe</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
                {slide.subtitle}
              </p>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-blue-700 transition-colors"
              >
                {slide.cta} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-10' : 'bg-white/50 hover:bg-white'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Ribbon */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Featured Equipment</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our top-rated medical and laboratory solutions tailored for high-precision environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { _id: '1', title: 'Advanced Binocular Microscope', category: 'Laboratory Equipment', price: 450000, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' },
              { _id: '3', title: 'Hematology Analyzer', category: 'Medical Equipment', price: 1200000, imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' },
              { _id: '4', title: 'Analytical Grade Ethanol (99.9%)', category: 'Chemicals & Reagents', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800' },
              { _id: '5', title: 'Diagnostic Reagent Kit', category: 'Chemicals & Reagents', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1579154236528-40391ca05639?auto=format&fit=crop&q=80&w=800' }
            ].map((product) => (
              <Link href={`/products/${product._id}`} key={product._id} className="group bg-white border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2 block">{product.category}</span>
                  <h3 className="text-slate-900 font-bold mb-2 line-clamp-2 min-h-[3rem]">{product.title}</h3>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-bold text-slate-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="inline-block px-10 py-4 border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-wider text-sm hover:bg-slate-900 hover:text-white transition-colors">
              View Complete Catalog
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
