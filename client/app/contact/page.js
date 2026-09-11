'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Send, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  ExternalLink,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';
import { submitQuote } from '../../lib/quotesStorage';

const categories = [
  'Medical Equipment',
  'Laboratory Equipment',
  'Chemicals & Reagents',
  'Consumables',
  'Maintenance & Calibration',
  'Complete Facility Setup'
];

const urgencyOptions = [
  { id: 'Immediate (Within 48h)', label: 'Immediate', desc: 'Emergency / 48 hrs' },
  { id: 'Urgent (1-2 Weeks)', label: 'Urgent', desc: '1 to 2 weeks' },
  { id: 'Standard (Within a Month)', label: 'Standard', desc: 'Within 30 days' },
  { id: 'Budgeting & Planning', label: 'Planning', desc: 'Project budgeting' }
];

const serviceTypes = [
  {
    id: 'Procurement Only',
    title: 'Procurement Only',
    desc: 'Supply & doorstep delivery'
  },
  {
    id: 'Procurement + Installation & Calibration',
    title: 'Supply + Installation',
    desc: 'On-site engineering, calibration & certification'
  },
  {
    id: 'Turnkey Facility Solution',
    title: 'Turnkey Facility Setup',
    desc: 'Complete architectural setup, staffing training & warranty'
  }
];

const quickEquipmentSuggestions = [
  'Mindray Patient Monitor',
  'Automated Hematology Analyzer',
  'Clinical Centrifuge (4000 RPM)',
  'Autoclave Sterilizer (50L)',
  'Digital Ultrasound Scanner',
  'Analytical Balance (0.1mg)',
  'Clinical Chemistry Reagents',
  'Vacutainer Blood Collection Tubes'
];

const faqs = [
  {
    q: 'How fast will I receive my formal quotation?',
    a: 'Our biomedical engineers and sales team review RFQs promptly. Standard inquiries receive an official proforma invoice and technical datasheet within 12 to 24 hours. For emergency ICU or theater equipment, we respond within 4 hours.'
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
  // Form view mode: 'guided' or 'express'
  const [formMode, setFormMode] = useState('guided');
  const [step, setStep] = useState(1);

  // Form fields state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    location: '',
    category: 'Medical Equipment',
    equipment: '',
    quantity: 1,
    urgency: 'Standard (Within a Month)',
    budget: '₦5,000,000 - ₦15,000,000',
    serviceType: 'Procurement + Installation & Calibration',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validateStep = (stepNumber) => {
    if (stepNumber === 1) {
      if (!formData.fullName.trim()) return 'Please enter your full name.';
      if (!formData.email.trim() || !formData.email.includes('@')) return 'Please provide a valid email address.';
      if (!formData.phone.trim()) return 'Please provide your phone or WhatsApp number.';
      if (!formData.organization.trim()) return 'Please specify your hospital, laboratory, or organization name.';
    } else if (stepNumber === 2) {
      if (!formData.equipment.trim()) return 'Please enter or select the equipment/item you need.';
    }
    return null;
  };

  const handleNextStep = () => {
    const error = validateStep(step);
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Full validation
    const step1Err = validateStep(1);
    if (step1Err) {
      setErrorMessage(step1Err);
      setStep(1);
      return;
    }
    const step2Err = validateStep(2);
    if (step2Err) {
      setErrorMessage(step2Err);
      setStep(2);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitQuote(formData);
      if (result.success) {
        setSubmittedQuote({
          ...formData,
          referenceId: result.referenceId,
          submittedAt: new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
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
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      location: '',
      category: 'Medical Equipment',
      equipment: '',
      quantity: 1,
      urgency: 'Standard (Within a Month)',
      budget: '₦5,000,000 - ₦15,000,000',
      serviceType: 'Procurement + Installation & Calibration',
      message: ''
    });
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 bg-black text-white overflow-hidden border-b border-gray-900">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Glow orb */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Fast-Track Technical Procurement
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Request a Quote & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                Technical Specification
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
              Equip your healthcare facility or scientific research laboratory with ISO-certified machinery and reagents. Fill out the form below to receive a certified proforma invoice and deployment timeline within 24 hours.
            </p>

            {/* Quick Guarantees bar */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>24h Official Proforma</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct OEM Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Nationwide Shipping Across Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 lg:py-24 bg-gray-50/60">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">

          {/* If already submitted successfully, show rich celebration ticket */}
          {submittedQuote ? (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl animate-fade-in text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3.5 py-1 rounded-full">
                RFQ Submitted to Admin Dashboard
              </span>

              <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-2 tracking-tight">
                Thank You, {submittedQuote.fullName.split(' ')[0]}!
              </h2>

              <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                Your request has been logged directly to our executive engineering dashboard. An official Foluxe proforma invoice is being prepared for your organization.
              </p>

              {/* Reference ID Badge */}
              <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-md mx-auto mb-8 shadow-md text-left relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Reference Ticket ID</span>
                    <span className="text-xl font-mono font-extrabold text-blue-400">{submittedQuote.referenceId}</span>
                  </div>
                  <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-md text-gray-300 font-medium">
                    Status: Pending Review
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Organization:</span>
                    <span className="font-semibold text-white">{submittedQuote.organization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item Requested:</span>
                    <span className="font-semibold text-white">{submittedQuote.equipment} (x{submittedQuote.quantity})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="font-semibold text-white">{submittedQuote.urgency}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Submitted: {submittedQuote.submittedAt}</span>
                  <span className="text-emerald-400 font-bold">Foluxe Verified</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/2348142135297?text=${encodeURIComponent(
                    `Hello Foluxe Global, I just submitted an RFQ on your website with Reference ID ${submittedQuote.referenceId} for ${submittedQuote.quantity}x ${submittedQuote.equipment} for ${submittedQuote.organization}. Please provide updates.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/30 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  Fast-Track on WhatsApp
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  Submit Another Quote
                </button>
              </div>

            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Interactive Form (7 Columns) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm relative">
                
                {/* Form Header & Mode Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Request for Quotation</h3>
                    <p className="text-xs text-gray-500 mt-1">Fill in the specifications for instant processing</p>
                  </div>

                  <div className="flex items-center bg-gray-100 p-1 rounded-full text-xs font-semibold self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setFormMode('guided')}
                      className={`px-3 py-1.5 rounded-full transition-all ${
                        formMode === 'guided' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Step-by-Step
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormMode('express')}
                      className={`px-3 py-1.5 rounded-full transition-all ${
                        formMode === 'express' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Express 1-Page
                    </button>
                  </div>
                </div>

                {/* Step Progression Bar (if guided mode) */}
                {formMode === 'guided' && (
                  <div className="my-6">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
                      <span className={step >= 1 ? 'text-gray-900' : ''}>1. Organization Info</span>
                      <span className={step >= 2 ? 'text-gray-900' : ''}>2. Equipment Specs</span>
                      <span className={step >= 3 ? 'text-gray-900' : ''}>3. Logistics & Scope</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 animate-fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">

                  {/* STEP 1: Organization & Contact Info */}
                  {(formMode === 'express' || step === 1) && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center gap-2 pb-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                          Contact & Organization Profile
                        </h4>
                      </div>

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
                              placeholder="Dr. Amina Danjuma"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Work Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="procurement@hospital.ng"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Phone / WhatsApp Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder="0802 123 4567"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Facility / Hospital / Lab Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={formData.organization}
                              onChange={(e) => handleChange('organization', e.target.value)}
                              placeholder="Cedar Crest Hospital / Apex Lab"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Delivery City / State in Nigeria
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            placeholder="e.g. Ikeja, Lagos or Abuja FCT"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Equipment & Quotation Specifications */}
                  {(formMode === 'express' || step === 2) && (
                    <div className="space-y-4 pt-2 animate-fade-in">
                      <div className="flex items-center gap-2 pb-2 border-t border-gray-100 pt-4">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                          Equipment & Specifications
                        </h4>
                      </div>

                      {/* Category Selection */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Procurement Category
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleChange('category', cat)}
                              className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                                formData.category === cat
                                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Equipment Name Input */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Equipment or Material Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.equipment}
                          onChange={(e) => handleChange('equipment', e.target.value)}
                          placeholder="e.g. 5-Part Differential Hematology Analyzer, Patient Monitor, Autoclave..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                          required
                        />

                        {/* Quick Suggestions Chips */}
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-1">Popular:</span>
                          {quickEquipmentSuggestions.slice(0, 4).map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => handleChange('equipment', item)}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                              + {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity & Urgency */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Estimated Quantity
                          </label>
                          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleChange('quantity', Math.max(1, (Number(formData.quantity) || 1) - 1))}
                              className="px-4 py-3 hover:bg-gray-200 text-gray-600 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={formData.quantity}
                              onChange={(e) => handleChange('quantity', Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-full text-center bg-transparent font-bold text-gray-900 text-sm focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleChange('quantity', (Number(formData.quantity) || 1) + 1)}
                              className="px-4 py-3 hover:bg-gray-200 text-gray-600 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Target Budget Range (Optional)
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => handleChange('budget', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
                          >
                            <option value="Under ₦5,000,000">Under ₦5,000,000</option>
                            <option value="₦5,000,000 - ₦15,000,000">₦5,000,000 - ₦15,000,000</option>
                            <option value="₦15,000,000 - ₦50,000,000">₦15,000,000 - ₦50,000,000</option>
                            <option value="₦50,000,000 - ₦150,000,000">₦50,000,000 - ₦150,000,000</option>
                            <option value="Custom / Large Project Tender">Custom / Large Project Tender</option>
                          </select>
                        </div>
                      </div>

                      {/* Procurement Urgency */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                          Procurement Urgency / Delivery Requirement
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {urgencyOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleChange('urgency', opt.id)}
                              className={`p-3 rounded-xl text-left border transition-all ${
                                formData.urgency === opt.id
                                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <span className="block text-xs">{opt.label}</span>
                              <span className="text-[10px] text-gray-400 font-normal">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Logistics & Scope of Service */}
                  {(formMode === 'express' || step === 3) && (
                    <div className="space-y-4 pt-2 animate-fade-in">
                      <div className="flex items-center gap-2 pb-2 border-t border-gray-100 pt-4">
                        <Wrench className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                          Scope of Service & Technical Notes
                        </h4>
                      </div>

                      {/* Service Type */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Select Required Service Package
                        </label>
                        <div className="grid sm:grid-cols-3 gap-2.5">
                          {serviceTypes.map((st) => (
                            <div
                              key={st.id}
                              onClick={() => handleChange('serviceType', st.id)}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                                formData.serviceType === st.id
                                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              <div className="text-xs font-bold mb-1">{st.title}</div>
                              <p className={`text-[11px] leading-tight ${formData.serviceType === st.id ? 'text-gray-300' : 'text-gray-400'}`}>
                                {st.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed Message / Specifications */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Additional Requirements or Preferred Models (Optional)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Include any specific brand preferences (e.g. Mindray, Sysmex, GE), electrical power requirements (solar, UPS), or existing equipment integration needs..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation / Submit Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                    {formMode === 'guided' && step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {formMode === 'guided' && step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-xl hover:shadow-gray-900/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Routing to Admin...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Submit Request for Quote</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>
              </div>

              {/* Right Column: Live RFQ Preview Ticket & Quick Channels (5 Columns) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Live Proforma Preview Ticket */}
                <div className="bg-gray-900 text-white rounded-3xl p-7 border border-gray-800 shadow-xl relative overflow-hidden">
                  {/* Watermark Logo */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-bold block">FOLUXE GLOBAL RFQ</span>
                      <h4 className="font-extrabold text-lg text-white">Live Quotation Ticket</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider animate-pulse-subtle">
                      Real-time Sync
                    </span>
                  </div>

                  {/* Ticket Content */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase tracking-wider block mb-0.5">Facility / Client</span>
                      <p className="font-bold text-white text-sm">
                        {formData.organization || formData.fullName || 'Pending client input...'}
                      </p>
                      {formData.location && <p className="text-gray-400 text-[11px]">{formData.location}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10">
                      <div>
                        <span className="text-gray-400 text-[10px] uppercase tracking-wider block mb-0.5">Category</span>
                        <p className="font-semibold text-gray-200">{formData.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] uppercase tracking-wider block mb-0.5">Quantity</span>
                        <p className="font-semibold text-white">{formData.quantity} unit(s)</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase tracking-wider block mb-0.5">Requested Equipment</span>
                      <p className="font-semibold text-blue-300">
                        {formData.equipment || 'No item specified yet'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <span className="text-gray-400 text-[10px] uppercase tracking-wider block mb-0.5">Urgency</span>
                        <p className="font-medium text-gray-200">{formData.urgency.split(' ')[0]}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] uppercase tracking-wider block mb-0.5">Package</span>
                        <p className="font-medium text-gray-200 line-clamp-1">{formData.serviceType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Footer */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                    <span>Direct Admin Dispatch</span>
                    <span className="font-mono text-gray-500">LAGOS-HQ-FLX</span>
                  </div>
                </div>

                {/* Direct Contact Cards */}
                <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-5">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-100">
                    Direct Engineering Hotline
                  </h4>

                  <div className="space-y-4 text-xs text-gray-600">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Lagos Operational HQ</span>
                        <span>1st Floor, Obafemi Awolowo House, 29/31 Obafemi Awolowo Way, Ikeja, Lagos.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                        <Phone size={16} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Telephone Inquiries</span>
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <a href="tel:08142135297" className="hover:text-blue-600 font-medium">0814 213 5297</a>
                          <a href="tel:08024420010" className="hover:text-blue-600 font-medium">0802 442 0010</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 border border-gray-100">
                        <Mail size={16} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Official Procurement Email</span>
                        <a href="mailto:foluxeconcepts@gmail.com" className="hover:text-blue-600 font-medium">
                          foluxeconcepts@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Direct WhatsApp Callout */}
                  <div className="pt-2">
                    <a
                      href="https://wa.me/2348142135297?text=Hello%20Foluxe%20Global%2C%20I%20would%20like%20to%20inquire%20about%20medical%20equipment%20procurement."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-2xl text-xs transition-colors border border-emerald-200"
                    >
                      <MessageSquare size={16} className="text-emerald-600" />
                      Chat with Biomedical Engineer
                    </a>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Procurement & Deployment Guidance</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-100 rounded-2xl overflow-hidden transition-all bg-gray-50/50 hover:border-gray-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-gray-900' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-gray-500 font-normal leading-relaxed border-t border-gray-100 pt-4 animate-fade-in">
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
