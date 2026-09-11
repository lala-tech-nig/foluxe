'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Truck, 
  MessageSquare, 
  ChevronDown, 
  AlertCircle 
} from 'lucide-react';
import { submitQuote } from '../../lib/quotesStorage';

const categories = [
  'Medical Equipment',
  'Laboratory Equipment',
  'Chemicals & Reagents',
  'Consumables',
  'Maintenance & Calibration',
  'General Inquiry'
];

const faqs = [
  {
    q: 'How fast will I receive my formal quotation?',
    a: 'Our biomedical engineers and sales team review inquiries promptly. Standard requests receive an official proforma invoice and technical datasheet within 12 to 24 hours. Emergency inquiries are handled even faster.'
  },
  {
    q: 'Are your medical machines covered by manufacturer warranties?',
    a: 'Yes. All equipment supplied by Foluxe comes with authentic OEM manufacturer warranties (ranging from 12 to 36 months). We also stock verified spare parts and provide preventative maintenance contracts across Nigeria.'
  },
  {
    q: 'Do you provide on-site installation and biomedical calibration in Nigeria?',
    a: 'Yes. Our certified biomedical engineers travel nationwide (Lagos, Abuja, Port Harcourt, Kano, Ibadan, Enugu, etc.) to install, calibrate to ISO standards, and train your hospital or laboratory staff on proper operation.'
  },
  {
    q: 'Can you supply customized laboratory reagent batches with cold-chain delivery?',
    a: 'Absolutely. We maintain temperature-controlled storage and validated cold-chain logistics across Nigeria for sensitive analytical chemicals, diagnostic reagents, and laboratory consumables.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    location: '',
    category: 'Medical Equipment',
    equipment: '',
    quantity: 1,
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide your phone number.');
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMessage('Please provide your organization or hospital name.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitQuote(formData);
      if (result.success) {
        setSubmittedQuote({
          ...formData,
          referenceId: result.referenceId
        });
      } else {
        setErrorMessage(result.msg || 'Submission error. Please try again.');
      }
    } catch {
      setErrorMessage('Could not process submission. Please check your network.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedQuote(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      location: '',
      category: 'Medical Equipment',
      equipment: '',
      quantity: 1,
      message: ''
    });
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Header Section - Solid Colors, No Gradients */}
      <section className="pt-32 pb-16 bg-gray-950 text-white border-b border-gray-900">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-gray-800 text-gray-300 text-xs font-bold uppercase tracking-wider mb-4 border border-gray-700">
              Get in Touch
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Contact Foluxe Global
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Have questions about medical equipment, laboratory reagents, or need an official proforma quotation? Send us a message and our team will get back to you within 24 hours.
            </p>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-800 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>24h Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>OEM Warranty Backed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-300 shrink-0" />
                <span>Nationwide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">

          {/* Success State */}
          {submittedQuote ? (
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You, {submittedQuote.fullName.split(' ')[0]}!
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                Your message has been received. Our sales and engineering team will review your specifications and contact you promptly.
              </p>

              <div className="bg-gray-100 p-4 rounded-xl mb-6 text-sm text-gray-700">
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Reference ID</span>
                <span className="font-mono font-bold text-base text-gray-900">{submittedQuote.referenceId}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/2348142135297?text=${encodeURIComponent(
                    `Hello Foluxe Global, I submitted an inquiry with Reference ID ${submittedQuote.referenceId} for ${submittedQuote.organization}. Please provide an update.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct Contact Information (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                    Contact Details
                  </h3>

                  <div className="space-y-5 text-sm text-gray-600">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Lagos Operational HQ</span>
                        <span className="text-xs text-gray-600 leading-relaxed">
                          1st Floor, Obafemi Awolowo House, 29/31 Obafemi Awolowo Way, Ikeja, Lagos, Nigeria.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Phone Support</span>
                        <div className="flex flex-col gap-1 text-xs mt-0.5">
                          <a href="tel:08142135297" className="hover:text-blue-600 font-medium">0814 213 5297</a>
                          <a href="tel:08024420010" className="hover:text-blue-600 font-medium">0802 442 0010</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Email Inquiries</span>
                        <a href="mailto:foluxeconcepts@gmail.com" className="text-xs hover:text-blue-600 font-medium">
                          foluxeconcepts@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
                        <Clock size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Business Hours</span>
                        <span className="text-xs text-gray-600 block">Monday – Friday: 8:00 AM – 6:00 PM</span>
                        <span className="text-xs text-gray-600 block">Saturday: 9:00 AM – 2:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct WhatsApp Callout */}
                  <div className="pt-2">
                    <a
                      href="https://wa.me/2348142135297?text=Hello%20Foluxe%20Global%2C%20I%20would%20like%20to%20inquire%20about%20medical%20equipment%20procurement."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                    >
                      <MessageSquare size={16} />
                      Chat Directly on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean, Basic Contact Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>
                  <p className="text-xs text-gray-500 mt-1">Fill out the form below to request equipment details or a formal quote.</p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="name@organization.com"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="0802 123 4567"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Hospital / Organization <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => handleChange('organization', e.target.value)}
                          placeholder="Clinic or Laboratory Name"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        City / Location (Optional)
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          placeholder="e.g. Lagos, Abuja, Port Harcourt"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Equipment or Product Needed
                      </label>
                      <input
                        type="text"
                        value={formData.equipment}
                        onChange={(e) => handleChange('equipment', e.target.value)}
                        placeholder="e.g. Patient Monitor, Hematology Analyzer, Reagents..."
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => handleChange('quantity', Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Message / Inquiry Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Please share any specific requirements, models, or details about your request..."
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Message / Request Quote</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Frequently Asked Questions - Solid Colors, No Gradients */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-gray-900' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
