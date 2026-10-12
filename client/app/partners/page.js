'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Send, 
  CheckCircle2, 
  FileText, 
  Check, 
  Handshake, 
  Microscope,
  ArrowRight
} from 'lucide-react';

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Medical Equipment',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      window.open(`https://Biomal.ai/?search=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://Biomal.ai', '_blank', 'noopener,noreferrer');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate partner inquiry submission
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-24 bg-black border-b border-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#0056b3_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-black uppercase tracking-widest mb-6">
            <Handshake size={14} className="text-blue-400" />
            <span>Strategic Alliances & Industry Expansion</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.15] mb-6 max-w-5xl mx-auto">
            Foluxe Global: Exploring the Medical & Laboratory Supply / Procurement and Services Marketing Potentials
          </h1>

          <div className="w-24 h-1.5 bg-[#0056b3] mx-auto mb-8 rounded-full" />

          <p className="text-gray-300 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Empowering healthcare and research institutions in Nigeria and West Africa through high-end solutions, industry collaboration, and global partner networks.
          </p>
        </div>
      </section>

      {/* Official Vision & Manifesto Statement Section */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          
          <div className="bg-white rounded-3xl p-8 md:p-14 border border-gray-200/80 shadow-xl shadow-gray-200/50 relative">
            <div className="w-12 h-1 bg-[#0056b3] mb-6 rounded-full" />
            
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase mb-8">
              Executive Statement from Foluxe Global Integrated Services Limited
            </h2>

            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed font-normal">
              <p>
                As part of our vision to be the preferred partner for medical and laboratory supply and procurements, coupled with our mission to empower healthcare and research institutions in Nigeria and West Africa by providing high-end laboratory and medical solutions, <strong>Foluxe Global Integrated Services Limited</strong> intends to offer its platform to players in the industry to promote and market their products and services.
              </p>

              <p>
                This it intends to do by <strong>listing the products and services of intending partners or their agents on our platforms</strong>. We intend to partner with some major distributors and suppliers of medical and laboratory equipment and chemicals to enhance our stock of items.
              </p>

              <div className="p-6 md:p-8 bg-blue-50/70 rounded-2xl border-l-4 border-[#0056b3] text-gray-900 my-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0056b3]">
                  <Sparkles size={16} />
                  <span>Exclusive Country Partnership Landmark</span>
                </div>
                <p className="font-semibold text-lg md:text-xl text-gray-900">
                  In the meantime, we have signed an Exclusive Country Partnership Agreement with Charge Life Science LLP, (Biomal AI) an Indian company dealing in lab equipment, reagents and consumables from over 1,000 verified suppliers worldwide.
                </p>
                <p className="text-sm md:text-base text-gray-700 font-medium">
                  We intend to add their web address to our website to enable our followers and visitors to search directly from our site.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="font-bold text-gray-900">Partner Website:</span>
                <a
                  href="https://Biomal.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0056b3] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition shadow-sm"
                >
                  <span>https://Biomal.ai</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold">
                NOTE: Others will be supplied as soon as an agreement with them are validated.
              </div>

              <p className="text-right font-extrabold text-gray-900 text-base pt-4">
                Thank you.
                <span className="block text-xs font-normal text-gray-500 uppercase tracking-widest mt-1">
                  Management, Foluxe Global Integrated Services Limited
                </span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Biomal.ai Live Direct Search Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          
          <div className="bg-gradient-to-br from-blue-900 via-[#0056b3] to-indigo-950 rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
            
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white border border-white/20 text-[11px] font-black uppercase tracking-wider mb-4">
                <Search size={13} className="text-yellow-300" />
                <span>Live Direct Search Engine</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Search Biomal.ai Global Database Directly
              </h2>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-light">
                Leverage our Exclusive Country Partnership with Charge Life Science LLP. Enter any laboratory instrument, reagent, consumable, or clinical product to query their verified worldwide network.
              </p>

              {/* Direct Search Input */}
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 mb-6 max-w-3xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search equipment, chemicals, reagents or consumables..."
                    className="w-full text-base font-medium px-5 py-4 bg-white text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-xl placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 shrink-0 border border-white/20"
                >
                  <Search size={16} /> Search on Biomal.ai
                </button>
              </form>

              {/* Verified Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>1,000+ Verified Suppliers Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Exclusive West African Country Agreement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Direct Technical Support & Logistics</span>
                </div>
              </div>
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>
      </section>

      {/* For Intending Partners & Distributors: Application Form Section */}
      <section id="partner-form" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#0056b3] block mb-2">
              Join Our Network
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
              List Your Products & Services on Foluxe Global
            </h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto mt-4 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Are you a manufacturer, distributor, chemical supplier, or authorized agent? Partner with us to list your items on our platforms and reach hospitals, universities, and research laboratories across Nigeria and West Africa.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/80 shadow-sm max-w-3xl mx-auto">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Partnership Inquiry Received!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Thank you for your interest in partnering with Foluxe Global. Our strategic partnership team will review your details and reach out within 24-48 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-all"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Company / Agency Name *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.companyName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                      placeholder="e.g. Apex Scientific Diagnostics Ltd"
                      className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0056b3] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.contactPerson}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0056b3] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      placeholder="partner@company.com"
                      className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0056b3] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0056b3] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Product / Service Classification</label>
                  <select
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0056b3] focus:bg-white transition-all"
                  >
                    <option value="Medical Equipment">Medical & Diagnostic Equipment</option>
                    <option value="Laboratory Instruments">Laboratory & Scientific Instruments</option>
                    <option value="Chemicals & Reagents">Analytical Chemicals & Reagents</option>
                    <option value="Consumables">Medical & Lab Consumables</option>
                    <option value="Calibration & Services">Engineering & Maintenance Services</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Products to List / Partnership Proposal *</label>
                  <textarea
                    required
                    rows={4}
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    placeholder="Briefly describe the brands, equipment types, or inventory you intend to promote on the Foluxe platform..."
                    className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0056b3] focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0056b3] hover:bg-blue-700 text-white font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={15} /> Submit Partnership Application
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
