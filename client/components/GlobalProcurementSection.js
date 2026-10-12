'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe2,
  Search,
  ExternalLink,
  Building2,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Layers,
  Microscope,
  Handshake
} from 'lucide-react';

export default function GlobalProcurementSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      // Direct visitor to Biomall.ai search
      window.open(`https://Biomall.ai/?search=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://Biomall.ai', '_blank', 'noopener,noreferrer');
    }
  };

  const sampleQuickSearches = [
    'Automated Hematology Analyzer',
    'Refrigerated Centrifuge',
    'Real-Time PCR System',
    'Analytical Chemistry Reagents',
    'Biosafety Cabinet Class II'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-b border-gray-100">

      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-black uppercase tracking-widest mb-4">
            <Handshake size={14} className="text-blue-600" />
            <span>Strategic Expansion & Global Alliances</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight uppercase">
            Foluxe Global: Exploring Supply, Procurement & Marketing Potentials
          </h2>
          <div className="w-20 h-1.5 bg-[#0056b3] mx-auto mt-6 mb-6 rounded-full" />

          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
            As part of our vision to be the preferred partner for medical and laboratory procurement, coupled with our mission to empower healthcare and research institutions in Nigeria and West Africa, Foluxe Global Integrated Services Limited offers its platform to industry players to promote and market their products and services.
          </p>
        </div>

        {/* Grid: Biomal AI Partnership Showcase & Partner Listing Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Main Feature:  (Biomal AI) Exclusive Country Partnership */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group">

            {/* Top Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0056b3] via-blue-600 to-indigo-600" />

            <div>
              {/* Partnership Pill */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                  <Sparkles size={12} className="text-yellow-300" />
                  Exclusive Country Partnership Agreement
                </span>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Nigeria & West Africa
                </span>
              </div>

              {/* Partner Title */}
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                <span className="text-[#0056b3]">(Biomall AI)</span>
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-normal">
                Foluxe Global has signed an <strong>Exclusive Country Partnership Agreement</strong> with  (Biomall AI), an Indian global leader providing lab equipment, reagents, and consumables sourced directly from over <strong>1,000+ verified suppliers worldwide</strong>.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-gray-50/90 border border-gray-100 mb-8">
                <div>
                  <span className="text-2xl font-black text-[#0056b3] block">1,000+</span>
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Verified Global Suppliers</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-gray-900 block">Global</span>
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Lab & Medical Sourcing</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-600 block">Direct</span>
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Search from Our Site</span>
                </div>
              </div>

              {/* Direct Search From Our Site into Biomall.ai */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-6 rounded-2xl border border-blue-100/80 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0056b3] mb-2">
                  <Search size={14} />
                  <span>Search Directly from Our Website</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Query international laboratory equipment, chemicals, reagents, and consumables live across the Biomall AI global catalog:
                </p>

                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. Centrifuge, Hematology Analyzer, Reagents..."
                      className="w-full text-sm font-medium px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#0056b3] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0"
                  >
                    <Search size={14} /> Search Biomall.ai
                  </button>
                </form>

                {/* Quick Keyword Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">Popular:</span>
                  {sampleQuickSearches.slice(0, 3).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSearchQuery(item)}
                      className="text-[11px] font-medium text-gray-600 hover:text-[#0056b3] bg-white px-2.5 py-1 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-semibold text-gray-900">Official Portal:</span>
                <a
                  href="https://Biomall.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0056b3] font-bold hover:underline inline-flex items-center gap-1"
                >
                  https://Biomall.ai <ExternalLink size={12} />
                </a>
              </div>

              <div className="text-[11px] italic text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/60 font-medium">
                * Others will be supplied as soon as agreements are validated.
              </div>
            </div>

          </div>

          {/* Side Module: Open Platform for Industry Players & Intending Partners */}
          <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">

            <div className="relative z-10">
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] block mb-3">
                Call For Collaboration
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-white">
                Promote Your Products on Foluxe Global
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                We intend to partner with major distributors and suppliers of medical and laboratory equipment and chemicals to enhance our stock of items. We offer our high-traffic platform to players in the industry or their agents to list and market their products.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-400 border border-white/10 mt-0.5">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Catalog Listing</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Showcase your specialized devices, reagents, and kits to vetted hospitals and research labs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-400 border border-white/10 mt-0.5">
                    <Globe2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">West African Market Reach</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Tap into established procurement channels across key healthcare hubs in Nigeria & ECOWAS.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-400 border border-white/10 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Technical Support & Warranty</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Backed by Foluxe's in-house biomedical installation and routine maintenance team.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10 flex flex-col gap-3">
              <Link
                href="/partners"
                className="w-full py-4 bg-[#0056b3] hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-center"
              >
                <span>Read Full Partnership Details</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/contact?type=partnership"
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Inquire for Partnership / Listing</span>
              </Link>
            </div>

            {/* Glowing background blob */}
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
