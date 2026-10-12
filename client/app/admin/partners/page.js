'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Globe,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
  ShieldCheck,
  Link2
} from 'lucide-react';
import {
  fetchPartnerSettings,
  savePartnerSettings,
  getWebsiteThumbnailUrl,
  DEFAULT_PARTNER
} from '../../../lib/partnerStorage';

export default function AdminPartnersPage() {
  const [partner, setPartner] = useState(DEFAULT_PARTNER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [thumbError, setThumbError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPartnerSettings();
        if (data) setPartner(data);
      } catch (err) {
        console.error('Failed to load partner settings', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (field, value) => {
    setPartner(prev => ({ ...prev, [field]: value }));
    if (field === 'website') setThumbError(false);
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('foluxe_admin_token') : null;
      const res = await savePartnerSettings(token, partner);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Partner details & website URL saved successfully! Live thumbnail and card updated.'
        });
        setTimeout(() => setStatusMessage(null), 5000);
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Failed to save partner settings. Please verify server connection.'
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'An error occurred while saving.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset partner information and website URL to default ( / Biomall AI)?')) {
      setPartner(DEFAULT_PARTNER);
      setThumbError(false);
    }
  };

  const dynamicThumbUrl = getWebsiteThumbnailUrl(partner.website, thumbError ? 'thum' : 'wp');

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center text-gray-400">
        Loading Partner configuration...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Partner Settings & Website URL</h1>
              <p className="text-gray-500 font-medium text-xs mt-0.5">
                Input the partner's website URL and details. The thumbnail preview is generated automatically from the URL.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            type="button"
            className="px-4 py-2.5 border border-gray-200 hover:border-gray-900 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            type="button"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <Save size={14} /> {saving ? 'Saving...' : 'Save & Publish Live'}
          </button>
        </div>
      </div>

      {/* Status Feedback */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* DYNAMIC URL THUMBNAIL LIVE PREVIEW */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-blue-600" />
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
              Live Website Thumbnail (Generated from URL)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
            No image upload needed &middot; Auto-derived from URL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Thumbnail Preview Browser Frame */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-gray-200 shadow-md">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900 flex flex-col">

              {/* Browser Header Bar */}
              <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 max-w-xs mx-auto bg-slate-950 rounded px-2.5 py-0.5 text-[10px] font-mono text-slate-400 text-center truncate">
                  {partner.website || 'https://Biomall.ai'}
                </div>
              </div>

              {/* Live Thumbnail Image */}
              <div className="relative aspect-[16/10] bg-slate-900 flex items-center justify-center overflow-hidden">
                <img
                  src={dynamicThumbUrl}
                  alt={`Preview for ${partner.website}`}
                  onError={() => setThumbError(true)}
                  className="w-full h-full object-cover object-top"
                />
              </div>

            </div>
          </div>

          {/* Quick info on thumbnail generation */}
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0056b3] text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Automated URL Snapshot</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900">
              {partner.name} <span className="text-[#0056b3]">({partner.platformName})</span>
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              When you enter or change the website URL below, Foluxe automatically derives the thumbnail preview from the live target website in real-time.
            </p>
            <a
              href={partner.website || 'https://Biomall.ai'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0056b3] hover:underline pt-2"
            >
              Test Link: {partner.website} <ExternalLink size={13} />
            </a>
          </div>

        </div>
      </div>

      {/* FORM: INPUT PARTNER URL & DETAILS */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight pb-4 border-b border-gray-100 flex items-center gap-2">
          <Link2 size={18} className="text-blue-600" />
          Partner Details & Web Address Input
        </h3>

        <div className="space-y-6">

          {/* Target Website URL (The key input) */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#0056b3] flex items-center gap-1.5">
              <Globe size={14} />
              <span>Partner Website URL * (Generates Thumbnail)</span>
            </label>
            <input
              type="text"
              required
              value={partner.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://Biomall.ai"
              className="w-full text-sm font-mono font-bold px-4 py-3 bg-white border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#0056b3] text-gray-900 shadow-sm"
            />
            <p className="text-[11px] text-gray-500">
              Enter the full website URL (e.g. <code>https://Biomall.ai</code>). The thumbnail image is automatically rendered from this address.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Company Name *</label>
              <input
                type="text"
                required
                value={partner.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder=""
                className="w-full text-xs font-bold px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

            {/* Platform / Brand Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Platform / Brand Name</label>
              <input
                type="text"
                value={partner.platformName}
                onChange={(e) => handleChange('platformName', e.target.value)}
                placeholder="Biomall AI"
                className="w-full text-xs font-bold px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Location / Country */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Location / Country</label>
              <input
                type="text"
                value={partner.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="India"
                className="w-full text-xs font-medium px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

            {/* Agreement Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Agreement Title</label>
              <input
                type="text"
                value={partner.agreement}
                onChange={(e) => handleChange('agreement', e.target.value)}
                placeholder="Exclusive Country Partnership Agreement"
                className="w-full text-xs font-medium px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Supplier Network Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Supplier Network Reach</label>
              <input
                type="text"
                value={partner.supplierCount}
                onChange={(e) => handleChange('supplierCount', e.target.value)}
                placeholder="1,000+ Verified Suppliers Worldwide"
                className="w-full text-xs font-medium px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

            {/* Product Scope */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Product Scope</label>
              <input
                type="text"
                value={partner.productScope}
                onChange={(e) => handleChange('productScope', e.target.value)}
                placeholder="Lab Equipment, Reagents & Consumables"
                className="w-full text-xs font-medium px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

          </div>

          {/* Partner Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Partner Description & Summary *</label>
            <textarea
              required
              rows={3}
              value={partner.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the partner and their international catalog..."
              className="w-full text-xs font-medium px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all leading-relaxed"
            />
          </div>

          {/* Validation Notice Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Validation Disclaimer Note</label>
            <input
              type="text"
              value={partner.validationNote}
              onChange={(e) => handleChange('validationNote', e.target.value)}
              placeholder="NOTE: Others will be supplied as soon as an agreement with them are validated. Thank you."
              className="w-full text-xs font-medium px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Changes to the URL and partner info will reflect on public pages immediately upon saving.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save size={16} /> {saving ? 'Publishing...' : 'Save & Publish Live'}
          </button>
        </div>
      </form>

    </div>
  );
}
