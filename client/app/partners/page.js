'use client';

import Image from 'next/image';
import { 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  Building2, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="bg-white min-h-[85vh] flex flex-col justify-between">
      
      {/* Header Note Section */}
      <section className="pt-20 pb-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056b3] text-[11px] font-black uppercase tracking-wider mb-5">
            <Sparkles size={13} className="text-[#0056b3]" />
            <span>Strategic Alliances & Industry Expansion</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-tight mb-6">
            Exploring Medical & Laboratory Supply Potentials
          </h1>

          <div className="w-16 h-1 bg-[#0056b3] mx-auto mb-6 rounded-full" />

          {/* Simple Header Note */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            As part of our vision to be the preferred partner for medical and laboratory supply and procurements, coupled with our mission to empower healthcare and research institutions in Nigeria and West Africa by providing high-end laboratory and medical solutions, Foluxe Global Integrated Services Limited offers its platform to industry players to promote and market their products and services.
          </p>

        </div>
      </section>

      {/* Main Partners Showcase Card */}
      <section className="pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          
          {/* Large Comprehensive Partner Card (Clickable to Partner's Website) */}
          <a
            href="https://Biomal.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Charge Life Science LLP (Biomal AI) website"
            className="group block bg-white rounded-[2.5rem] border border-gray-200 hover:border-[#0056b3] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Website Preview Thumbnail in Browser Frame */}
              <div className="lg:col-span-7 bg-slate-900 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group/thumb">
                
                {/* Browser Mockup Window */}
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 flex flex-col">
                  
                  {/* Browser Window Header Bar */}
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 max-w-xs mx-auto bg-slate-950/80 rounded-lg px-3 py-1 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 border border-white/5">
                      <Globe size={11} className="text-blue-400" />
                      <span>https://Biomal.ai</span>
                    </div>

                    <div className="w-6" />
                  </div>

                  {/* Website Thumbnail Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <Image
                      src="/partners/biomal_thumbnail.jpg"
                      alt="Biomal AI Website Thumbnail - Charge Life Science LLP"
                      fill
                      priority
                      className="object-cover object-top group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Overlay Prompt */}
                    <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>Visit Biomal.ai Website</span>
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>

                </div>

                {/* Subtitle caption */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Live Platform Preview</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1">
                    Direct Sourcing Portal <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>

              {/* Right Column: Partner Details */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-white">
                <div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0056b3] text-[10px] font-black uppercase tracking-wider border border-blue-100">
                      <ShieldCheck size={13} />
                      Exclusive Country Partnership
                    </span>
                  </div>

                  {/* Partner Name & Title */}
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-[#0056b3] transition-colors tracking-tight mb-1">
                    Charge Life Science LLP
                  </h2>
                  <div className="text-sm font-bold text-gray-500 mb-5">
                    (Biomal AI) &middot; India
                  </div>

                  {/* Partner Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                    We have signed an <strong>Exclusive Country Partnership Agreement</strong> with Charge Life Science LLP (Biomal AI), an Indian company dealing in laboratory equipment, analytical reagents, and consumables sourced from over <strong>1,000+ verified suppliers worldwide</strong>.
                  </p>

                  {/* Key Highlights List */}
                  <div className="space-y-3 pt-2 pb-6 border-t border-gray-100 text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">1,000+ Verified Suppliers:</span>
                        <span className="text-gray-500 ml-1">Comprehensive international inventory for research and clinical labs.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">Product Scope:</span>
                        <span className="text-gray-500 ml-1">Lab equipment, diagnostic reagents, and high-purity consumables.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">Direct Search Access:</span>
                        <span className="text-gray-500 ml-1">Search and inquiry directly via their global online address.</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Call-to-Action Link */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-[#0056b3]" />
                    <span className="text-sm font-black text-[#0056b3] underline underline-offset-4 decoration-[#0056b3]/30 group-hover:decoration-[#0056b3]">
                      https://Biomal.ai
                    </span>
                  </div>

                  <span className="px-4 py-2 bg-gray-900 group-hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm">
                    <span>Visit Site</span>
                    <ExternalLink size={13} />
                  </span>
                </div>

              </div>

            </div>
          </a>

          {/* Validation Notice Box */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>
                <strong>NOTE:</strong> Others will be supplied as soon as an agreement with them are validated.
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 shrink-0">
              Thank you &mdash; Foluxe Global
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
