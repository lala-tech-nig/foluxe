'use client';

import { useState, useEffect } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import {
  fetchPartnerSettings,
  getWebsiteThumbnailUrl,
  DEFAULT_PARTNER
} from '../../lib/partnerStorage';

export default function PartnersPage() {
  const [partner, setPartner] = useState(DEFAULT_PARTNER);
  const [mounted, setMounted] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isCancelled = false;

    const loadPartner = async () => {
      const data = await fetchPartnerSettings();
      if (!isCancelled && data) {
        setPartner(data);
      }
    };

    loadPartner();

    // Listen for live updates from admin dashboard
    const handleUpdate = (e) => {
      if (e?.detail) {
        setPartner(e.detail);
        setThumbError(false);
      } else {
        loadPartner();
      }
    };

    window.addEventListener('foluxe-partner-updated', handleUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'foluxe_partner_settings') {
        loadPartner();
      }
    });

    return () => {
      isCancelled = true;
      window.removeEventListener('foluxe-partner-updated', handleUpdate);
    };
  }, []);

  const websiteUrl = partner.website || 'https://Biomalll.ai';
  // Dynamic thumbnail derived directly from the URL inputted by the admin (no image upload or screenshot upload)
  const dynamicThumbnailSrc = getWebsiteThumbnailUrl(websiteUrl, thumbError ? 'thum' : 'wp');

  return (
    <div className="bg-white min-h-[85vh] flex flex-col justify-between">

      {/* Header Note Section */}
      <section className="pt-20 pb-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center">

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
            As part of our vision to be the preferred partner for medical and laboratory supply and procurements, coupled with our mission to empower healthcare and research institutions in Nigeria and West Africa by providing high-end laboratory and medical solutions, Foluxe Global Integrated Services Limited offers its platform to industry players and major distributors to promote and market their products and services.
          </p>

        </div>
      </section>

      {/* Main Partner Showcase Card */}
      <section className="pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">

          {/* Clickable Card -> Takes visitor to partner website */}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${partner.name} (${partner.platformName}) website`}
            className="group block bg-white rounded-[2.5rem] border border-gray-200 hover:border-[#0056b3] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

              {/* Left: Dynamic Website Thumbnail in Browser Mockup */}
              <div className="lg:col-span-7 bg-slate-900 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group/thumb">

                {/* Browser Frame */}
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 flex flex-col">

                  {/* Browser Address Bar */}
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>

                    <div className="flex-1 max-w-xs mx-auto bg-slate-950/90 rounded-lg px-3 py-1 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 border border-white/5 truncate">
                      <Globe size={11} className="text-blue-400 shrink-0" />
                      <span className="truncate">{websiteUrl}</span>
                    </div>

                    <div className="w-6 shrink-0" />
                  </div>

                  {/* Thumbnail Image — dynamically rendered from admin-inputted URL */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={dynamicThumbnailSrc}
                      alt={`${partner.platformName || partner.name} Website Thumbnail`}
                      loading="eager"
                      onError={() => setThumbError(true)}
                      className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>Visit {partner.platformName || 'Partner'} Website</span>
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>

                </div>

                {/* Subtitle Caption */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Dynamic Live URL Preview</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1">
                    Direct Sourcing Portal <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>

              {/* Right: Partner Details */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-white">
                <div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0056b3] text-[10px] font-black uppercase tracking-wider border border-blue-100">
                      <ShieldCheck size={13} />
                      {partner.agreement || 'Exclusive Country Partnership'}
                    </span>
                  </div>

                  {/* Partner Name & Title */}
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-[#0056b3] transition-colors tracking-tight mb-1">
                    {partner.name}
                  </h2>
                  <div className="text-sm font-bold text-gray-500 mb-5">
                    ({partner.platformName}) &middot; {partner.location}
                  </div>

                  {/* Partner Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                    {partner.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-3 pt-2 pb-6 border-t border-gray-100 text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">Supplier Reach:</span>
                        <span className="text-gray-500 ml-1">{partner.supplierCount}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">Product Categories:</span>
                        <span className="text-gray-500 ml-1">{partner.productScope}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900">Regional Coverage:</span>
                        <span className="text-gray-500 ml-1">{partner.region || 'Nigeria & West Africa'}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-[#0056b3]" />
                    <span className="text-sm font-black text-[#0056b3] underline underline-offset-4 decoration-[#0056b3]/30 group-hover:decoration-[#0056b3]">
                      {websiteUrl}
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
                <strong>NOTE:</strong> {partner.validationNote || 'Others will be supplied as soon as an agreement with them are validated. Thank you.'}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 shrink-0">
              Foluxe Global Integrated Services Limited
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
