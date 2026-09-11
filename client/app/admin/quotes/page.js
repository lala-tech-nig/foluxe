'use client';

import { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Trash2, 
  ExternalLink, 
  MessageSquare, 
  Eye, 
  X, 
  Printer, 
  Check, 
  Send,
  FileText,
  Calendar,
  Sparkles
} from 'lucide-react';
import { fetchQuotes, updateQuoteStatus, deleteQuote, getQuoteStats } from '../../../lib/quotesStorage';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const loadQuotes = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('foluxe_admin_token') : null;
    const data = await fetchQuotes(token);
    setQuotes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadQuotes();

    const handleQuoteAdded = () => loadQuotes();
    const handleQuoteUpdated = () => loadQuotes();

    window.addEventListener('foluxe-quote-added', handleQuoteAdded);
    window.addEventListener('foluxe-quotes-updated', handleQuoteAdded);

    return () => {
      window.removeEventListener('foluxe-quote-added', handleQuoteAdded);
      window.removeEventListener('foluxe-quotes-updated', handleQuoteAdded);
    };
  }, []);

  const stats = getQuoteStats(quotes);

  const handleStatusChange = async (quoteId, newStatus) => {
    const token = localStorage.getItem('foluxe_admin_token');
    await updateQuoteStatus(quoteId, newStatus, undefined, token);
    await loadQuotes();
    if (selectedQuote && (selectedQuote._id === quoteId || selectedQuote.referenceId === quoteId)) {
      setSelectedQuote(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = async (quoteId) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;
    const token = localStorage.getItem('foluxe_admin_token');
    await deleteQuote(quoteId, token);
    if (selectedQuote && (selectedQuote._id === quoteId || selectedQuote.referenceId === quoteId)) {
      setSelectedQuote(null);
    }
    await loadQuotes();
  };

  const handleSaveNote = async () => {
    if (!selectedQuote) return;
    setSavingNote(true);
    const token = localStorage.getItem('foluxe_admin_token');
    await updateQuoteStatus(selectedQuote._id, selectedQuote.status, adminNoteInput, token);
    setSelectedQuote(prev => ({ ...prev, adminNotes: adminNoteInput }));
    setSavingNote(false);
    await loadQuotes();
  };

  const openQuoteModal = (quote) => {
    setSelectedQuote(quote);
    setAdminNoteInput(quote.adminNotes || '');
  };

  // Filtered quotes list
  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (q.referenceId && q.referenceId.toLowerCase().includes(searchLower)) ||
      (q.fullName && q.fullName.toLowerCase().includes(searchLower)) ||
      (q.organization && q.organization.toLowerCase().includes(searchLower)) ||
      (q.email && q.email.toLowerCase().includes(searchLower)) ||
      (q.equipment && q.equipment.toLowerCase().includes(searchLower)) ||
      (q.location && q.location.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Requests for Quotation (RFQs)
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Manage, review, and issue official proforma quotes for healthcare facilities and labs across Nigeria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-900 text-gray-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Printer size={15} /> Print Summary
          </button>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div 
          onClick={() => setStatusFilter('all')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'all' ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-900 border-gray-100 hover:border-gray-300'
          }`}
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${statusFilter === 'all' ? 'text-gray-400' : 'text-gray-500'}`}>
            Total Quotes
          </span>
          <h4 className="text-2xl font-black">{stats.total}</h4>
        </div>

        <div 
          onClick={() => setStatusFilter('pending')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'pending' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-white text-gray-900 border-gray-100 hover:border-amber-300'
          }`}
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${statusFilter === 'pending' ? 'text-amber-100' : 'text-amber-600'}`}>
            Pending Review
          </span>
          <h4 className="text-2xl font-black">{stats.pending}</h4>
        </div>

        <div 
          onClick={() => setStatusFilter('in-review')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'in-review' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-900 border-gray-100 hover:border-blue-300'
          }`}
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${statusFilter === 'in-review' ? 'text-blue-100' : 'text-blue-600'}`}>
            In Technical Review
          </span>
          <h4 className="text-2xl font-black">{stats.inReview}</h4>
        </div>

        <div 
          onClick={() => setStatusFilter('quoted')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'quoted' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-gray-900 border-gray-100 hover:border-emerald-300'
          }`}
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${statusFilter === 'quoted' ? 'text-emerald-100' : 'text-emerald-600'}`}>
            Quoted / Proforma
          </span>
          <h4 className="text-2xl font-black">{stats.quoted}</h4>
        </div>

        <div 
          onClick={() => setStatusFilter('completed')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all col-span-2 sm:col-span-1 ${
            statusFilter === 'completed' ? 'bg-gray-800 text-white border-gray-800 shadow-md' : 'bg-white text-gray-900 border-gray-100 hover:border-gray-300'
          }`}
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${statusFilter === 'completed' ? 'text-gray-400' : 'text-gray-500'}`}>
            Completed
          </span>
          <h4 className="text-2xl font-black">{stats.completed}</h4>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, name, hospital, item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'in-review', label: 'In Review' },
            { id: 'quoted', label: 'Quoted' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 text-center text-gray-400 text-sm">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
            Loading quote requests...
          </div>
        ) : filteredQuotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-400 font-extrabold uppercase tracking-widest text-[10px]">
                  <th className="py-4 px-6">Reference ID & Date</th>
                  <th className="py-4 px-6">Client & Hospital</th>
                  <th className="py-4 px-6">Equipment Requested</th>
                  <th className="py-4 px-6">Urgency / Timeline</th>
                  <th className="py-4 px-6">Status Pipeline</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredQuotes.map((q) => (
                  <tr 
                    key={q._id || q.referenceId}
                    className="hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    onClick={() => openQuoteModal(q)}
                  >
                    {/* ID & Date */}
                    <td className="py-4 px-6">
                      <span className="font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-xs block w-fit mb-1">
                        {q.referenceId}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(q.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>

                    {/* Client & Facility */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-sm">{q.fullName}</div>
                      <div className="text-gray-500 flex items-center gap-1 mt-0.5 font-medium">
                        <Building2 size={13} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{q.organization}</span>
                      </div>
                      {q.location && (
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="shrink-0" />
                          <span>{q.location}</span>
                        </div>
                      )}
                    </td>

                    {/* Equipment */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900 text-xs line-clamp-1 max-w-[220px]">
                        {q.equipment}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
                        <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">
                          Qty: {q.quantity}
                        </span>
                        <span className="text-gray-400 truncate max-w-[120px]">{q.category}</span>
                      </div>
                    </td>

                    {/* Urgency */}
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                        q.urgency && q.urgency.includes('Immediate')
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : q.urgency && q.urgency.includes('Urgent')
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {q.urgency ? q.urgency.split(' ')[0] : 'Standard'}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q._id || q.referenceId, e.target.value)}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border focus:outline-none transition-all ${
                          q.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : q.status === 'in-review'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : q.status === 'quoted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-review">In Review</option>
                        <option value="quoted">Quoted</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Reply */}
                        {q.phone && (
                          <a
                            href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${q.fullName}, this is the Foluxe Global engineering and sales team regarding your quotation request ${q.referenceId} for ${q.equipment}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Reply via WhatsApp"
                          >
                            <MessageSquare size={16} />
                          </a>
                        )}

                        {/* Email */}
                        {q.email && (
                          <a
                            href={`mailto:${q.email}?subject=${encodeURIComponent(
                              `Foluxe Global Proforma Invoice: ${q.referenceId} - ${q.equipment}`
                            )}`}
                            className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Send Email"
                          >
                            <Mail size={16} />
                          </a>
                        )}

                        {/* View Modal */}
                        <button
                          onClick={() => openQuoteModal(q)}
                          className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(q._id || q.referenceId)}
                          className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 text-sm">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-bold text-gray-700">No quotation requests found</p>
            <p className="text-xs text-gray-400 mt-1">
              {searchQuery ? 'Try adjusting your search criteria.' : 'Quotes submitted via /contact will appear here.'}
            </p>
          </div>
        )}
      </div>

      {/* Quote Detail Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl border border-gray-100 shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gray-900 text-white p-6 sm:p-8 flex items-start justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-bold block mb-1">
                  OFFICIAL RFQ SPECIFICATION TICKET
                </span>
                <h3 className="text-2xl font-black">{selectedQuote.referenceId}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Submitted: {new Date(selectedQuote.createdAt).toLocaleString('en-GB')}
                </p>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative z-10"
              >
                <X size={18} />
              </button>

              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs max-h-[70vh] overflow-y-auto">
              
              {/* Status & Category Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Status</span>
                  <span className={`font-extrabold uppercase text-xs ${
                    selectedQuote.status === 'pending' ? 'text-amber-700' :
                    selectedQuote.status === 'in-review' ? 'text-blue-700' :
                    selectedQuote.status === 'quoted' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    {selectedQuote.status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Category</span>
                  <span className="font-bold text-gray-900 text-xs">{selectedQuote.category}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Urgency</span>
                  <span className="font-bold text-gray-900 text-xs">{selectedQuote.urgency}</span>
                </div>
              </div>

              {/* Client & Organization Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-gray-100 bg-white">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">
                    Client Details
                  </span>
                  <div className="space-y-1.5 text-gray-800">
                    <p className="font-extrabold text-sm text-gray-900">{selectedQuote.fullName}</p>
                    <p className="flex items-center gap-2">
                      <Mail size={13} className="text-gray-400" />
                      <a href={`mailto:${selectedQuote.email}`} className="hover:text-blue-600">{selectedQuote.email}</a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={13} className="text-gray-400" />
                      <a href={`tel:${selectedQuote.phone}`} className="hover:text-blue-600">{selectedQuote.phone}</a>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-gray-100 bg-white">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">
                    Facility & Location
                  </span>
                  <div className="space-y-1.5 text-gray-800">
                    <p className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                      <Building2 size={15} className="text-blue-600" />
                      {selectedQuote.organization}
                    </p>
                    <p className="flex items-center gap-2 text-gray-500">
                      <MapPin size={13} className="text-gray-400" />
                      {selectedQuote.location || 'Nigeria'}
                    </p>
                    <p className="text-gray-500">
                      Scope: <span className="font-semibold text-gray-800">{selectedQuote.serviceType}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Equipment Requirements */}
              <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  Equipment Requested & Quantities
                </span>
                <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
                  <span className="text-sm font-black text-gray-900">{selectedQuote.equipment}</span>
                  <span className="font-extrabold text-xs px-2.5 py-1 bg-gray-100 rounded-md text-gray-800">
                    Qty: {selectedQuote.quantity}
                  </span>
                </div>

                {selectedQuote.budget && (
                  <p className="text-gray-500 pt-1">
                    Indicated Budget: <span className="font-semibold text-gray-800">{selectedQuote.budget}</span>
                  </p>
                )}

                {selectedQuote.message && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Client Notes:</span>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl">
                      {selectedQuote.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Internal Admin Notes */}
              <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  Internal Administrative Notes (Private)
                </span>
                <textarea
                  rows={2}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Record proforma number, follow-up call outcomes, or technical engineer assigned..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none transition-all resize-none"
                />
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={savingNote}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                >
                  {savingNote ? 'Saving...' : 'Save Internal Note'}
                </button>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedQuote.phone && (
                  <a
                    href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedQuote.fullName}, this is Foluxe Global regarding your RFQ ${selectedQuote.referenceId} for ${selectedQuote.equipment}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                )}

                {selectedQuote.email && (
                  <a
                    href={`mailto:${selectedQuote.email}?subject=${encodeURIComponent(
                      `Foluxe Global Proforma Invoice: ${selectedQuote.referenceId} - ${selectedQuote.equipment}`
                    )}`}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Mail size={14} /> Send Email
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedQuote._id || selectedQuote.referenceId, 'quoted')}
                  className="px-4 py-2.5 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors"
                >
                  Mark as Quoted
                </button>

                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
