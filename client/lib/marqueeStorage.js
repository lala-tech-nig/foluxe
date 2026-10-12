'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const STORAGE_KEY = 'foluxe_top_marquee_settings';

export const DEFAULT_MARQUEE_SETTINGS = {
  enabled: true,
  backgroundColor: '#0056b3', // Foluxe brand blue
  textColor: '#ffffff',
  speed: 'normal', // 'slow' (45s), 'normal' (30s), 'fast' (18s)
  pauseOnHover: true,
  messages: [
    {
      id: '1',
      badge: 'EXCLUSIVE PARTNERSHIP',
      text: 'Foluxe Global signs Exclusive Country Partnership Agreement with  (Biomall AI) — 1,000+ verified global suppliers worldwide.',
      link: '/partners',
      isExternal: false
    },
    {
      id: '2',
      badge: 'INDUSTRY PLATFORM',
      text: 'Foluxe Global invites medical & laboratory equipment manufacturers, distributors & agents to promote and list products on our West African network.',
      link: '/partners',
      isExternal: false
    },
    {
      id: '3',
      badge: 'SEARCH BiomalL.AI',
      text: 'Search lab equipment, chemicals, reagents and consumables directly from our portal powered by Biomall.ai worldwide catalog.',
      link: 'https://Biomall.ai',
      isExternal: true
    }
  ]
};

/**
 * Fetch top marquee settings from API or localStorage
 */
export async function fetchTopMarquee() {
  if (typeof window === 'undefined') return DEFAULT_MARQUEE_SETTINGS;

  try {
    const res = await fetch(`${API_URL}/api/settings/marquee`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch {
    // Backend unavailable, fallback to local storage
  }

  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch (err) {
    console.error('Failed to parse cached marquee settings', err);
  }

  // Initialize with defaults in localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MARQUEE_SETTINGS));
  } catch { }

  return DEFAULT_MARQUEE_SETTINGS;
}

/**
 * Save top marquee settings to API (with admin auth) and localStorage
 */
export async function saveTopMarquee(token, settings) {
  // Always update localStorage immediately
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent('foluxe-top-marquee-updated', { detail: settings }));
    } catch (err) {
      console.error('Failed to update local marquee cache', err);
    }
  }

  // Attempt backend persistence
  try {
    const res = await fetch(`${API_URL}/api/settings/marquee`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
      const saved = await res.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        window.dispatchEvent(new CustomEvent('foluxe-top-marquee-updated', { detail: saved }));
      }
      return { success: true, data: saved };
    }
  } catch (err) {
    console.warn('Backend sync failed, saved locally in browser:', err);
  }

  return { success: true, data: settings, localOnly: true };
}
