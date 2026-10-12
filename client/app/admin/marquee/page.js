'use client';

import { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Palette,
  Gauge,
  Sliders,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { 
  fetchTopMarquee, 
  saveTopMarquee, 
  DEFAULT_MARQUEE_SETTINGS 
} from '../../../lib/marqueeStorage';

const COLOR_PRESETS = [
  { name: 'Foluxe Brand Blue (Default)', hex: '#0056b3' },
  { name: 'Deep Medical Sapphire', hex: '#0a3d74' },
  { name: 'Executive Midnight', hex: '#0f172a' },
  { name: 'Clinical Emerald', hex: '#065f46' },
  { name: 'Royal Indigo', hex: '#3730a3' },
];

export default function AdminMarqueePage() {
  const [config, setConfig] = useState(DEFAULT_MARQUEE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTopMarquee();
        if (data) setConfig(data);
      } catch (err) {
        console.error('Failed to load marquee settings', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleToggle = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleColorChange = (hex) => {
    setConfig(prev => ({ ...prev, backgroundColor: hex }));
  };

  const handleSpeedChange = (speed) => {
    setConfig(prev => ({ ...prev, speed }));
  };

  const handlePauseToggle = () => {
    setConfig(prev => ({ ...prev, pauseOnHover: !prev.pauseOnHover }));
  };

  const handleMessageChange = (index, field, value) => {
    setConfig(prev => {
      const updated = [...prev.messages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, messages: updated };
    });
  };

  const handleAddMessage = () => {
    setConfig(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: Date.now().toString(),
          badge: 'NOTICE',
          text: 'New announcement message for Foluxe Global visitors.',
          link: '/partners',
          isExternal: false
        }
      ]
    }));
  };

  const handleRemoveMessage = (index) => {
    if (config.messages.length <= 1) {
      alert('You must have at least one message in the marquee list.');
      return;
    }
    setConfig(prev => ({
      ...prev,
      messages: prev.messages.filter((_, i) => i !== index)
    }));
  };

  const handleResetDefaults = () => {
    if (confirm('Reset the Top Marquee banner to Foluxe default brand messages and styling?')) {
      setConfig({ ...DEFAULT_MARQUEE_SETTINGS });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('foluxe_admin_token') : null;
      const res = await saveTopMarquee(token, config);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Top Marquee updated successfully! The new banner is now live on the website.'
        });
        setTimeout(() => setStatusMessage(null), 5000);
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Failed to update marquee settings. Please check server connection.'
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'An unexpected error occurred while saving.'
      });
    } finally {
      setSaving(false);
    }
  };

  // Speed class for live preview inside admin
  let previewSpeedClass = 'animate-top-marquee-normal';
  if (config.speed === 'slow') previewSpeedClass = 'animate-top-marquee-slow';
  if (config.speed === 'fast') previewSpeedClass = 'animate-top-marquee-fast';

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center text-gray-400">
        Loading Top Marquee configuration...
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
              <Megaphone size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Top Marquee Announcement Banner</h1>
              <p className="text-gray-500 font-medium text-xs mt-0.5">Control the auto-scrolling ticker seen at the very top of Foluxe Global.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
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
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
          statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* LIVE PREVIEW CARD */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-gray-400" />
            <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">Live Banner Preview</h3>
          </div>
          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
            config.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
          }`}>
            {config.enabled ? '● Currently Active' : '○ Currently Disabled'}
          </span>
        </div>

        {/* Live Banner Demonstration */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
          {config.enabled ? (
            <div
              style={{ backgroundColor: config.backgroundColor || '#0056b3', color: config.textColor || '#ffffff' }}
              className={`py-3 overflow-hidden relative ${config.pauseOnHover ? 'hover-pause' : ''}`}
            >
              <div className="flex items-center pl-4">
                <div className="flex items-center gap-1.5 font-black text-[10px] tracking-widest uppercase bg-black/20 text-white px-2 py-0.5 rounded mr-3 shrink-0">
                  <Megaphone size={11} className="text-yellow-300 animate-pulse" />
                  <span>Notice</span>
                </div>

                <div className="overflow-hidden w-full flex mask-gradient-edges">
                  <div className={`${previewSpeedClass} items-center`}>
                    {[...config.messages, ...config.messages].map((msg, i) => (
                      <span key={i} className="inline-flex items-center gap-3 px-6 py-0.5 shrink-0">
                        {msg.badge && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-white/20 text-white backdrop-blur-sm border border-white/20">
                            <Sparkles size={9} className="text-yellow-300" />
                            {msg.badge}
                          </span>
                        )}
                        <span className="text-xs font-medium tracking-wide">{msg.text}</span>
                        {msg.link && (
                          <span className="text-[10px] font-bold underline underline-offset-2 flex items-center gap-1 text-white/90">
                            Learn More {msg.isExternal ? <ExternalLink size={10} /> : <ArrowRight size={10} />}
                          </span>
                        )}
                        <span className="text-white/30 text-xs ml-4">|</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-gray-400 text-xs bg-gray-50 italic">
              The top marquee banner is currently switched OFF and will not show on public pages.
            </div>
          )}
        </div>
      </div>

      {/* BANNER SETTINGS & CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Toggle & Visibility */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold text-sm">
              <Sliders size={16} className="text-blue-600" />
              <span>Marquee Visibility</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Instantly toggle display of the top announcement ticker across all public pages.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Display Top Marquee</span>
            <button
              onClick={handleToggle}
              type="button"
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
                config.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  config.enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Brand Background Color */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold text-sm">
              <Palette size={16} className="text-blue-600" />
              <span>Brand Background Color</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Marquee background inherits Foluxe brand color by default.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-xl border border-gray-200 shadow-sm shrink-0" 
                style={{ backgroundColor: config.backgroundColor || '#0056b3' }}
              />
              <input
                type="text"
                value={config.backgroundColor || '#0056b3'}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#0056b3"
                className="w-full text-xs font-mono font-bold px-3 py-2 border border-gray-200 rounded-xl uppercase focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 pt-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  type="button"
                  title={preset.name}
                  onClick={() => handleColorChange(preset.hex)}
                  className={`w-6 h-6 rounded-lg border transition-all ${
                    config.backgroundColor === preset.hex ? 'ring-2 ring-blue-600 ring-offset-1 scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Speed & Hover Effect */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold text-sm">
              <Gauge size={16} className="text-blue-600" />
              <span>Scroll Speed & Behavior</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Fine-tune the auto-scrolling rate and interactive pause.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
              {['slow', 'normal', 'fast'].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSpeedChange(spd)}
                  className={`py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                    config.speed === spd ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={config.pauseOnHover}
                onChange={handlePauseToggle}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-700 font-medium">Pause scrolling on hover</span>
            </label>
          </div>
        </div>

      </div>

      {/* MESSAGES LIST & BUILDER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Megaphone size={18} className="text-blue-600" />
              Marquee Announcements & Messages
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              These items scroll sequentially across the top banner. You can add partnership announcements, platform invitations, or direct links.
            </p>
          </div>

          <button
            onClick={handleAddMessage}
            type="button"
            className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Plus size={14} /> Add Message
          </button>
        </div>

        {/* Message Items */}
        <div className="space-y-4">
          {config.messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200/70 hover:border-blue-200 hover:bg-blue-50/20 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gray-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Message Item
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveMessage(index)}
                  type="button"
                  title="Remove this message"
                  className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Badge Tag */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={msg.badge || ''}
                    onChange={(e) => handleMessageChange(index, 'badge', e.target.value)}
                    placeholder="e.g. EXCLUSIVE PARTNERSHIP"
                    className="w-full text-xs font-bold px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Main Message Text */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Announcement Message Content
                  </label>
                  <input
                    type="text"
                    value={msg.text || ''}
                    onChange={(e) => handleMessageChange(index, 'text', e.target.value)}
                    placeholder="Enter message text..."
                    className="w-full text-xs font-medium px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Action Link & External Toggle */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Target Link URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={msg.link || ''}
                      onChange={(e) => handleMessageChange(index, 'link', e.target.value)}
                      placeholder="/partners or https://..."
                      className="w-full text-xs font-medium px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      title={msg.isExternal ? 'External Link (New Tab)' : 'Internal Page Link'}
                      onClick={() => handleMessageChange(index, 'isExternal', !msg.isExternal)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                        msg.isExternal ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer Action Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Changes will be reflected in real time once saved.
          </p>

          <button
            onClick={handleSave}
            disabled={saving}
            type="button"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Save size={16} /> {saving ? 'Publishing Changes...' : 'Save & Publish Live'}
          </button>
        </div>

      </div>

    </div>
  );
}
