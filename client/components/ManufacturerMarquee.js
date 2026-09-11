'use client';

import React from 'react';

// Authentic, transparent SVG brand logos for premier medical and laboratory manufacturers
const trackOneLogos = [
  {
    name: "Siemens Healthineers",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <circle cx="16" cy="16" r="15" stroke="#EB780A" strokeWidth="2" fill="none" />
          <circle cx="16" cy="16" r="3.5" fill="#EB780A" />
          <circle cx="16" cy="7" r="2.2" fill="#EB780A" />
          <circle cx="16" cy="25" r="2.2" fill="#EB780A" />
          <circle cx="7" cy="16" r="2.2" fill="#EB780A" />
          <circle cx="25" cy="16" r="2.2" fill="#EB780A" />
          <circle cx="9.5" cy="9.5" r="1.8" fill="#EB780A" />
          <circle cx="22.5" cy="22.5" r="1.8" fill="#EB780A" />
          <circle cx="9.5" cy="22.5" r="1.8" fill="#EB780A" />
          <circle cx="22.5" cy="9.5" r="1.8" fill="#EB780A" />
        </g>
        <text x="44" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" fill="#00646E" letterSpacing="0.05em">SIEMENS</text>
        <text x="44" y="33" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="10.5" fill="#EB780A" letterSpacing="0.04em">Healthineers</text>
      </svg>
    )
  },
  {
    name: "GE Healthcare",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 4)">
          <circle cx="16" cy="16" r="15" fill="#005A9C" />
          <path d="M10 16c0-3.5 2.5-6 6-6 2.5 0 4.2 1.2 5 2.8l-2.2 1.2c-.6-1-1.6-1.6-2.8-1.6-2 0-3.5 1.5-3.5 3.6s1.5 3.6 3.5 3.6c1.2 0 2.2-.6 2.8-1.6h-3.2v-2.2h5.8V21c-1.2 1.8-3.2 2.6-5.4 2.6-3.8 0-6-2.5-6-7.6z" fill="#FFFFFF" />
          <path d="M18 10h4v2h-4zM18 15h3.5v2H18zM18 20h4v2h-4z" fill="#FFFFFF" opacity="0.9" />
        </g>
        <text x="40" y="22" fontFamily="Georgia, serif" fontWeight="700" fontSize="16" fill="#005A9C" letterSpacing="0.02em">GE Healthcare</text>
        <text x="40" y="32" fontFamily="system-ui, sans-serif" fontWeight="500" fontSize="8" fill="#64748B" letterSpacing="0.1em">PRECISION CARE</text>
      </svg>
    )
  },
  {
    name: "Philips Healthcare",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 4)">
          <path d="M16 2c8 0 14 3 14 8v10c0 8-14 12-14 12S2 28 2 20V10c0-5 6-8 14-8z" fill="#0B5FFF" />
          <path d="M8 12c3 2 5 2 8 0s5-2 8 0M8 16c3 2 5 2 8 0s5-2 8 0M8 20c3 2 5 2 8 0s5-2 8 0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <text x="38" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" fill="#0B5FFF" letterSpacing="0.08em">PHILIPS</text>
        <text x="38" y="33" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="8.5" fill="#64748B" letterSpacing="0.08em">HEALTHCARE</text>
      </svg>
    )
  },
  {
    name: "Mindray",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <path d="M4 22V6l7 12 7-12v16" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="11" cy="5" r="3" fill="#E11D48" />
          <circle cx="24" cy="18" r="3" fill="#E11D48" />
        </g>
        <text x="34" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="20" fill="#0F172A" letterSpacing="-0.02em">mindray</text>
      </svg>
    )
  },
  {
    name: "Olympus Medical",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" fill="#0C2340" letterSpacing="0.08em">OLYMPUS</text>
        <rect x="36" y="29" width="46" height="3" rx="1.5" fill="#FDB813" />
      </svg>
    )
  },
  {
    name: "Dräger Medical",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <rect x="2" y="2" width="24" height="24" rx="4" fill="#005082" />
          <path d="M14 7v14M7 14h14" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
        <text x="36" y="26" fontFamily="Georgia, serif" fontWeight="700" fontSize="19" fill="#005082" letterSpacing="0.01em">Dräger</text>
      </svg>
    )
  },
  {
    name: "Carl Zeiss",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="30" height="30" rx="3" fill="#003D82" />
        <path d="M9 13h14l-8 10h8v3H9l8-10H9v-3z" fill="#FFFFFF" />
        <text x="38" y="26" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#003D82" letterSpacing="0.1em">ZEISS</text>
      </svg>
    )
  },
  {
    name: "Beckman Coulter",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 175 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 7)">
          <polygon points="12,1 24,13 12,25 0,13" fill="#D32F2F" />
          <polygon points="12,7 18,13 12,19 6,13" fill="#1976D2" />
        </g>
        <text x="32" y="20" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" fill="#1E293B" letterSpacing="0.08em">BECKMAN</text>
        <text x="32" y="31" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" fill="#D32F2F" letterSpacing="0.08em">COULTER</text>
      </svg>
    )
  }
];

const trackTwoLogos = [
  {
    name: "Roche Diagnostics",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 5)">
          <polygon points="15,1 29,8 29,22 15,29 1,22 1,8" stroke="#0066CC" strokeWidth="2.5" fill="none" />
          <text x="15" y="19" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="9" fill="#0066CC">Roche</text>
        </g>
        <text x="40" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" fill="#0F172A">Roche</text>
        <text x="40" y="32" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="7.5" fill="#64748B" letterSpacing="0.08em">DIAGNOSTICS</text>
      </svg>
    )
  },
  {
    name: "Thermo Fisher Scientific",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <polygon points="14,1 27,24 1,24" fill="#EE3124" />
          <polygon points="14,8 21,21 7,21" fill="#FFFFFF" />
          <polygon points="14,12 18,19 10,19" fill="#EE3124" />
        </g>
        <text x="34" y="20" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#1E293B" letterSpacing="0.03em">Thermo Fisher</text>
        <text x="34" y="31" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#EE3124" letterSpacing="0.12em">SCIENTIFIC</text>
      </svg>
    )
  },
  {
    name: "Shimadzu Corporation",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <polygon points="13,1 19,12 7,12" fill="#D3122A" />
          <polygon points="7,13 13,24 1,24" fill="#D3122A" />
          <polygon points="19,13 25,24 13,24" fill="#D3122A" />
        </g>
        <text x="34" y="25" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" fill="#1E293B" letterSpacing="0.08em">SHIMADZU</text>
      </svg>
    )
  },
  {
    name: "Sysmex Corporation",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 7)">
          <circle cx="10" cy="13" r="8" stroke="#004696" strokeWidth="3" fill="none" />
          <circle cx="19" cy="13" r="8" stroke="#0096D6" strokeWidth="3" fill="none" />
        </g>
        <text x="36" y="26" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#004696" letterSpacing="-0.01em">Sysmex</text>
      </svg>
    )
  },
  {
    name: "Abbott Laboratories",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <circle cx="14" cy="14" r="13" stroke="#007DC3" strokeWidth="2.5" fill="none" />
          <path d="M14 6c4 0 7 3 7 7v8M21 16c-1.5-2.5-4-3.5-7-3.5-4 0-6.5 2.5-6.5 5.5s2.5 5.5 6.5 5.5c3 0 5.5-1 7-3.5" stroke="#007DC3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
        <text x="38" y="26" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" fill="#1E293B" letterSpacing="-0.02em">Abbott</text>
      </svg>
    )
  },
  {
    name: "Becton Dickinson (BD)",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 115 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 5)">
          <path d="M4 4h12c4.5 0 8 3 8 7s-3.5 7-8 7H4V4z" fill="#005696" />
          <circle cx="12" cy="18" r="8" fill="#F47920" />
          <path d="M12 10v16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <text x="34" y="26" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#005696" letterSpacing="0.04em">BD</text>
      </svg>
    )
  },
  {
    name: "Eppendorf",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <path d="M12 2c3 5 8 9 8 15a8 8 0 1 1-16 0c0-6 5-10 8-15z" fill="#004F9F" />
          <circle cx="12" cy="18" r="2.5" fill="#FFFFFF" />
        </g>
        <text x="30" y="25" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="17" fill="#004F9F" letterSpacing="-0.02em">eppendorf</text>
      </svg>
    )
  },
  {
    name: "Sartorius Group",
    logo: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(2, 6)">
          <rect x="2" y="4" width="22" height="4" fill="#FFDA00" />
          <rect x="11" y="8" width="4" height="16" fill="#1E293B" />
          <circle cx="6" cy="16" r="4" fill="#1E293B" />
          <circle cx="20" cy="16" r="4" fill="#1E293B" />
        </g>
        <text x="32" y="25" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" fill="#1E293B" letterSpacing="-0.01em">sartorius</text>
      </svg>
    )
  }
];

export default function ManufacturerMarquee() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">
          Direct OEM Partnerships
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          World-Class Medical & Laboratory Manufacturers
        </h2>
      </div>

      {/* Parallel Sliding Tracks of Transparent Logos */}
      <div className="relative w-full mask-gradient-edges pause-hover space-y-6">
        
        {/* Track 1 (Sliding Left) */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-left items-center">
            {[...trackOneLogos, ...trackOneLogos].map((item, idx) => (
              <div
                key={`t1-${idx}`}
                className="flex items-center justify-center shrink-0 mx-8 md:mx-12 select-none opacity-65 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                title={item.name}
              >
                {item.logo}
              </div>
            ))}
          </div>
        </div>

        {/* Track 2 (Sliding Right) */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-right items-center">
            {[...trackTwoLogos, ...trackTwoLogos].map((item, idx) => (
              <div
                key={`t2-${idx}`}
                className="flex items-center justify-center shrink-0 mx-8 md:mx-12 select-none opacity-65 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                title={item.name}
              >
                {item.logo}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
