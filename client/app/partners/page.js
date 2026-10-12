'use client';

import { ExternalLink, Sparkles, Globe, Clock, ShieldCheck } from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="bg-white min-h-[80vh] flex flex-col justify-between">
      
      {/* Header Note Section */}
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056b3] text-[11px] font-black uppercase tracking-wider mb-5">
            <Sparkles size={13} className="text-[#0056b3]" />
            <span>Foluxe Strategic Partnerships</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-tight mb-6">
            Exploring Medical & Laboratory Supply Potentials
          </h1>

          <div className="w-16 h-1 bg-[#0056b3] mx-auto mb-6 rounded-full" />

          {/* Simple Header Note */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            As part of our vision to be the preferred partner for medical and laboratory supply and procurement in Nigeria and West Africa, Foluxe Global Integrated Services Limited offers its platform to industry players and major distributors to promote and market their products and services.
          </p>

        </div>
      </section>

      {/* Partners Cards Section */}
      <section className="pb-28">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Primary Partner Card: Charge Life Science LLP (Biomal AI) — CLICKABLE TO PARTNER WEBSITE */}
            <a
              href="https://Biomal.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Biomal AI partner website"
              className="group relative bg-white rounded-3xl p-8 md:p-10 border border-gray-200 hover:border-[#0056b3] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Brand Accent Top Border */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0056b3] to-blue-500 group-hover:h-2.5 transition-all" />

              <div>
                {/* Partnership Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0056b3] text-[10px] font-black uppercase tracking-wider border border-blue-100">
                    <ShieldCheck size={13} />
                    Exclusive Country Partner
                  </span>

                  <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-[#0056b3] group-hover:text-white transition-all flex items-center justify-center shrink-0">
                    <ExternalLink size={16} />
                  </div>
                </div>

                {/* Partner Name */}
                <h2 className="text-2xl font-black text-gray-900 group-hover:text-[#0056b3] transition-colors tracking-tight mb-2">
                  Charge Life Science LLP
                  <span className="block text-lg font-bold text-gray-500 group-hover:text-gray-700">
                    (Biomal AI)
                  </span>
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 mt-3">
                  Indian company dealing in lab equipment, reagents, and consumables from over <strong>1,000 verified suppliers worldwide</strong>. Search and source laboratory products directly from their international database.
                </p>

                {/* Verified Highlights */}
                <div className="space-y-2 py-4 border-t border-b border-gray-100 text-xs text-gray-500 font-medium">
                  <div className="flex items-center justify-between">
                    <span>Coverage:</span>
                    <span className="font-bold text-gray-800">1,000+ Global Suppliers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Agreement:</span>
                    <span className="font-bold text-gray-800">Exclusive Country Agreement</span>
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-6 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black text-[#0056b3]">
                  <Globe size={16} />
                  <span>https://Biomal.ai</span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all flex items-center gap-1">
                  Visit Website &rarr;
                </span>
              </div>
            </a>

            {/* Validation Notice & Upcoming Partners Card */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-200/80 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                    <Clock size={12} />
                    Agreements in Progress
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-3">
                  Upcoming Global & Local Partners
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  We are actively engaging leading manufacturers, chemical suppliers, and equipment distributors to expand our procurement catalog.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 text-xs text-gray-700 leading-relaxed font-medium">
                  <p className="italic text-gray-600 mb-2">
                    &ldquo;NOTE: Others will be supplied as soon as an agreement with them are validated.&rdquo;
                  </p>
                  <p className="font-bold text-gray-900 text-right">
                    — Thank you.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-200/60">
                <span className="text-xs text-gray-400 font-medium block">
                  Foluxe Global Integrated Services Limited
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
