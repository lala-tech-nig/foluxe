'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Cpu, Sparkles, Activity } from 'lucide-react';

const trackOneEquipment = [
  {
    name: "Siemens Healthineers",
    origin: "Germany",
    category: "Diagnostic Imaging & CT/MRI",
    highlight: "ISO 13485 Certified",
    tag: "Medical Machinery",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),
  },
  {
    name: "GE Healthcare",
    origin: "United States",
    category: "Ultrasound & Patient Monitoring",
    highlight: "OEM Direct Partner",
    tag: "Medical Machinery",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Philips Healthcare",
    origin: "Netherlands",
    category: "Critical Care & Resuscitation",
    highlight: "Hospital Grade",
    tag: "Clinical Systems",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12a4 4 0 0 1 8 0M8 12a8 8 0 0 1 8 0" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: "Mindray Medical",
    origin: "Global",
    category: "Anesthesia & Patient Vitals",
    highlight: "Full Service Warranty",
    tag: "Medical Machinery",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Olympus Medical",
    origin: "Japan",
    category: "Surgical Endoscopy & Optics",
    highlight: "Precision Optics",
    tag: "Surgical Devices",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      </svg>
    ),
  },
  {
    name: "Dräger Medical",
    origin: "Germany",
    category: "Respiratory & Intensive Care",
    highlight: "CE Compliant",
    tag: "Critical Care",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h8" />
      </svg>
    ),
  },
  {
    name: "Carl Zeiss Meditec",
    origin: "Germany",
    category: "Microsurgery & Diagnostic Optics",
    highlight: "Ultra High Precision",
    tag: "Optical Machinery",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="m10 15 4-6" />
        <path d="M9 9h6M9 15h6" />
      </svg>
    ),
  },
  {
    name: "Beckman Coulter",
    origin: "United States",
    category: "Biomedical Centrifugation",
    highlight: "High-Throughput",
    tag: "Biomedical Machines",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const trackTwoMaterials = [
  {
    name: "Roche Diagnostics",
    origin: "Switzerland",
    category: "Clinical Reagents & Chemistry",
    highlight: "Gold Standard Reagents",
    tag: "Lab Materials",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    name: "Thermo Fisher Scientific",
    origin: "United States",
    category: "Analytical Materials & Spectroscopy",
    highlight: "ISO 9001 Procurement",
    tag: "Scientific Materials",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v12a6 6 0 0 0 12 0V3" />
        <line x1="4" y1="3" x2="20" y2="3" />
        <line x1="6" y1="8" x2="18" y2="8" />
        <line x1="6" y1="13" x2="18" y2="13" />
      </svg>
    ),
  },
  {
    name: "Shimadzu Corporation",
    origin: "Japan",
    category: "HPLC & Precision Chromatography",
    highlight: "Analytical Instruments",
    tag: "Lab Machines",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    name: "Sysmex Corporation",
    origin: "Japan",
    category: "Hematology & Coagulation Materials",
    highlight: "Automated Diagnostics",
    tag: "Clinical Materials",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
      </svg>
    ),
  },
  {
    name: "Abbott Laboratories",
    origin: "United States",
    category: "Point-of-Care & Rapid Immunoassays",
    highlight: "CLIA Certified",
    tag: "Diagnostic Materials",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    name: "Becton Dickinson (BD)",
    origin: "United States",
    category: "Vacutainers & Bioscience Consumables",
    highlight: "Sterile Medical Consumables",
    tag: "Medical Materials",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 11-4-4-8.5 8.5a2.12 2.12 0 1 0 3 3L18 10" />
        <path d="m5 19-2 2" />
        <path d="m14 6 2-2 4 4-2 2" />
      </svg>
    ),
  },
  {
    name: "Eppendorf AG",
    origin: "Germany",
    category: "Liquid Handling & Centrifugation",
    highlight: "High Precision Pipetting",
    tag: "Laboratory Consumables",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Sartorius Group",
    origin: "Germany",
    category: "Analytical Balances & Bioprocess",
    highlight: "Ultra-Micro Balance",
    tag: "Analytical Materials",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <polyline points="4 8 12 3 20 8" />
        <path d="M4 14a4 4 0 0 0 8 0" />
        <path d="M12 14a4 4 0 0 0 8 0" />
      </svg>
    ),
  },
];

function ManufacturerCard({ item, track }) {
  return (
    <div className="group relative w-[310px] md:w-[340px] shrink-0 mx-3 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-900/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 select-none">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gray-950 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-blue-600 transition-all duration-300">
            {item.icon}
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
              {item.name}
            </h4>
            <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              {item.origin}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-blue-200 group-hover:text-blue-700 transition-colors shrink-0">
          {item.tag}
        </span>
      </div>

      {/* Specialty & Description */}
      <p className="text-xs text-gray-600 font-medium mb-3 line-clamp-1 leading-relaxed">
        {item.category}
      </p>

      {/* Footer Tag */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 text-[11px]">
        <span className="text-gray-400 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          {item.highlight}
        </span>
        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
          Genuine OEM
        </span>
      </div>

      {/* Subtle top glow line on hover */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    </div>
  );
}

export default function ManufacturerMarquee() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Verified OEM & Materials Network
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Direct Partnerships with World-Class Medical & Laboratory Manufacturers
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-3 font-normal leading-relaxed">
              We source precision diagnostic machinery, clinical equipment, and certified chemical reagents directly from internationally accredited manufacturers with factory warranty and Nigerian technical support.
            </p>
          </div>

          {/* Quick trust metrics */}
          <div className="hidden lg:flex items-center gap-6 text-left shrink-0 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="border-r border-gray-100 pr-5">
              <span className="text-xl font-black text-gray-900 block">50+</span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Global Brands</span>
            </div>
            <div className="border-r border-gray-100 pr-5">
              <span className="text-xl font-black text-gray-900 block">100%</span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">OEM Guaranteed</span>
            </div>
            <div>
              <span className="text-xl font-black text-blue-600 block">ISO 9001</span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Procurement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parallel Sliding Tracks Container with Smooth Vignette Mask */}
      <div className="relative w-full mask-gradient-edges pause-hover space-y-5">
        
        {/* Track 1: Medical Machines & Diagnostics (Sliding Left) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-left">
            {/* Duplicate track array twice for perfectly seamless infinite looping */}
            {[...trackOneEquipment, ...trackOneEquipment].map((item, idx) => (
              <ManufacturerCard key={`t1-${idx}`} item={item} track="equipment" />
            ))}
          </div>
        </div>

        {/* Track 2: Materials, Reagents & Consumables (Sliding Right - Parallel Counterflow) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-right">
            {/* Duplicate track array twice for perfectly seamless infinite looping */}
            {[...trackTwoMaterials, ...trackTwoMaterials].map((item, idx) => (
              <ManufacturerCard key={`t2-${idx}`} item={item} track="materials" />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Trust Indicators Ribbon */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-100/80 text-xs">
          <div className="flex items-center gap-2.5 text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Direct Factory Calibration</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold">Full Manufacturer Warranties</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold">ISO & CE Certified Supplies</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <Activity className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-semibold">In-Country Technical Spares</span>
          </div>
        </div>
      </div>
    </section>
  );
}
