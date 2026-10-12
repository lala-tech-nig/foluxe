'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Sparkles, Megaphone, X } from 'lucide-react';
import { fetchTopMarquee, DEFAULT_MARQUEE_SETTINGS } from '../lib/marqueeStorage';

export default function TopMarquee() {
  const [config, setConfig] = useState(DEFAULT_MARQUEE_SETTINGS);
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isCancelled = false;

    const loadSettings = async () => {
      const data = await fetchTopMarquee();
      if (!isCancelled && data) {
        setConfig(data);
      }
    };

    loadSettings();

    // Listen for live updates dispatched by the admin panel
    const handleUpdate = (e) => {
      if (e?.detail) {
        setConfig(e.detail);
        setDismissed(false); // Re-show on new updates
      } else {
        loadSettings();
      }
    };

    window.addEventListener('foluxe-top-marquee-updated', handleUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'foluxe_top_marquee_settings') {
        loadSettings();
      }
    });

    return () => {
      isCancelled = true;
      window.removeEventListener('foluxe-top-marquee-updated', handleUpdate);
    };
  }, []);

  // Avoid SSR hydration discrepancy
  if (!mounted) {
    return null;
  }

  // Check if marquee is enabled or dismissed
  if (!config?.enabled || dismissed) {
    return null;
  }

  const messages = Array.isArray(config.messages) && config.messages.length > 0
    ? config.messages
    : DEFAULT_MARQUEE_SETTINGS.messages;

  // Determine animation speed class
  let speedClass = 'animate-top-marquee-normal';
  if (config.speed === 'slow') speedClass = 'animate-top-marquee-slow';
  if (config.speed === 'fast') speedClass = 'animate-top-marquee-fast';

  const pauseClass = config.pauseOnHover ? 'hover-pause' : '';
  const bgColor = config.backgroundColor || '#0056b3';
  const textColor = config.textColor || '#ffffff';

  // Render a message pill / block
  const renderMessageItem = (msg, keyPrefix) => {
    const isExt = Boolean(msg.isExternal);
    const hasLink = Boolean(msg.link);

    const content = (
      <span className="inline-flex items-center gap-3 px-6 py-1 group/item">
        {msg.badge && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-white/20 text-white backdrop-blur-sm border border-white/25 shadow-sm">
            <Sparkles size={11} className="text-yellow-300" />
            {msg.badge}
          </span>
        )}
        <span className="text-xs sm:text-sm font-medium tracking-wide">
          {msg.text}
        </span>
        {hasLink && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold underline underline-offset-4 decoration-white/40 group-hover/item:decoration-white transition-all text-white/95">
            Learn More
            {isExt ? <ExternalLink size={12} className="opacity-80" /> : <ArrowRight size={12} className="opacity-80" />}
          </span>
        )}
        <span className="text-white/30 text-sm ml-4 font-light select-none">|</span>
      </span>
    );

    if (hasLink) {
      if (isExt) {
        return (
          <a
            key={`${keyPrefix}-${msg.id || msg.text}`}
            href={msg.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-95 transition-opacity cursor-pointer shrink-0"
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          key={`${keyPrefix}-${msg.id || msg.text}`}
          href={msg.link}
          className="hover:opacity-95 transition-opacity cursor-pointer shrink-0"
        >
          {content}
        </Link>
      );
    }

    return (
      <span key={`${keyPrefix}-${msg.id || msg.text}`} className="shrink-0">
        {content}
      </span>
    );
  };

  return (
    <div
      role="region"
      aria-label="Announcement Marquee"
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`relative z-50 w-full overflow-hidden border-b border-black/10 shadow-sm transition-colors duration-300 ${pauseClass}`}
    >
      <div className="relative flex items-center py-2.5">
        
        {/* Left Indicator Tag */}
        <div 
          style={{ backgroundColor: bgColor }}
          className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-4 pr-3 shadow-[12px_0_16px_-4px_rgba(0,0,0,0.15)]"
        >
          <div className="flex items-center gap-2 font-black text-[10px] md:text-xs tracking-widest uppercase bg-black/20 text-white px-2.5 py-1 rounded-md border border-white/10">
            <Megaphone size={13} className="text-yellow-300 animate-pulse" />
            <span className="hidden sm:inline">Notice</span>
          </div>
        </div>

        {/* Continuous Scrolling Track (Duplicate 2x to achieve seamless loop) */}
        <div className="overflow-hidden w-full flex mask-gradient-edges pl-20 sm:pl-28 pr-12">
          <div className={`${speedClass} items-center`}>
            {messages.map((msg, i) => renderMessageItem(msg, `t1-${i}`))}
            {messages.map((msg, i) => renderMessageItem(msg, `t2-${i}`))}
            {messages.map((msg, i) => renderMessageItem(msg, `t3-${i}`))}
            {messages.map((msg, i) => renderMessageItem(msg, `t4-${i}`))}
          </div>
        </div>

        {/* Right Dismiss Button */}
        <div
          style={{ backgroundColor: bgColor }}
          className="absolute right-0 top-0 bottom-0 z-20 flex items-center pr-3 pl-2 shadow-[-12px_0_16px_-4px_rgba(0,0,0,0.15)]"
        >
          <button
            onClick={() => setDismissed(true)}
            title="Dismiss notice banner"
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-black/20 transition-all"
            aria-label="Dismiss banner"
          >
            <X size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
