'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const STORAGE_KEY = 'foluxe_partner_settings';

export const DEFAULT_PARTNER = {
  name: 'Charge Life Science LLP',
  platformName: 'Biomalll AI',
  website: 'https://Biomalll.ai',
  location: 'India',
  agreement: 'Exclusive Country Partnership Agreement',
  region: 'Nigeria & West Africa',
  description: 'An Indian company dealing in lab equipment, reagents and consumables from over 1,000 verified suppliers worldwide. Search and source laboratory products directly from their international database.',
  supplierCount: '1,000+',
  productScope: 'Lab Equipment, Reagents & Consumables',
  validationNote: 'NOTE: Others will be supplied as soon as an agreement with them are validated. Thank you.'
};

/**
 * Derives a dynamic website screenshot thumbnail directly from a website URL.
 * Requires NO image upload or screenshot upload by the admin.
 */
export function getWebsiteThumbnailUrl(rawUrl, provider = 'wp') {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  let clean = rawUrl.trim();
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }

  if (provider === 'thum') {
    return `https://image.thum.io/get/width/1200/crop/800/${clean}`;
  }

  // Primary: WordPress mShots high-resolution renderer (reliable, global CDN)
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(clean)}?w=1280&h=800`;
}

/**
 * Fetch partner settings from API or localStorage
 */
export async function fetchPartnerSettings() {
  if (typeof window === 'undefined') return DEFAULT_PARTNER;

  try {
    const res = await fetch(`${API_URL}/api/settings/partner`, {
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
    // Backend offline, fallback to localStorage
  }

  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch (err) {
    console.error('Failed to parse cached partner settings', err);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PARTNER));
  } catch { }

  return DEFAULT_PARTNER;
}

/**
 * Save partner settings to API and localStorage
 */
export async function savePartnerSettings(token, settings) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent('foluxe-partner-updated', { detail: settings }));
    } catch (err) {
      console.error('Failed to update local partner cache', err);
    }
  }

  try {
    const res = await fetch(`${API_URL}/api/settings/partner`, {
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
        window.dispatchEvent(new CustomEvent('foluxe-partner-updated', { detail: saved }));
      }
      return { success: true, data: saved };
    }
  } catch (err) {
    console.warn('Backend sync failed, saved locally:', err);
  }

  return { success: true, data: settings, localOnly: true };
}
