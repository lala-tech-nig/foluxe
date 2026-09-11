'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Tag, 
  AlertCircle, 
  Plus, 
  LayoutGrid, 
  ClipboardList, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { fetchQuotes, getQuoteStats } from '../../lib/quotesStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ 
      products: 0, 
      categories: 0, 
      onRequested: 0,
      totalQuotes: 0,
      pendingQuotes: 0
    });
    const [recentQuotes, setRecentQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('foluxe_admin_token');
                
                // Fetch products and meta
                let products = [];
                let meta = { categories: [] };
                try {
                  const [pRes, mRes] = await Promise.all([
                      fetch(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } }),
                      fetch(`${API_URL}/api/products/meta`)
                  ]);
                  if (pRes.ok) products = await pRes.json();
                  if (mRes.ok) meta = await mRes.json();
                } catch {
                  // Handled
                }

                // Fetch quotes
                const quotes = await fetchQuotes(token);
                const qStats = getQuoteStats(quotes);

                setStats({
                    products: products.length,
                    categories: meta.categories?.length || 0,
                    onRequested: products.filter(p => p.priceType === 'on-request').length,
                    totalQuotes: qStats.total,
                    pendingQuotes: qStats.pending
                });

                setRecentQuotes(quotes.slice(0, 5));
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

        const handleUpdate = () => fetchDashboardData();
        window.addEventListener('foluxe-quote-added', handleUpdate);
        window.addEventListener('foluxe-quotes-updated', handleUpdate);

        return () => {
            window.removeEventListener('foluxe-quote-added', handleUpdate);
            window.removeEventListener('foluxe-quotes-updated', handleUpdate);
        };
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Welcome to the Foluxe Global executive control center.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/quotes"
                        className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm"
                    >
                        <ClipboardList size={15} /> Manage RFQs
                    </Link>
                    <Link
                        href="/admin/products/add"
                        className="px-5 py-2.5 border border-gray-200 hover:border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                    >
                        <Plus size={15} /> Add Product
                    </Link>
                </div>
            </div>

            {/* Metric Cards (4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Quote Requests */}
                <Link 
                    href="/admin/quotes"
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-blue-600 transition-all duration-300"
                >
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ClipboardList size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Quote Requests</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-extrabold text-gray-900">{loading ? '...' : stats.totalQuotes}</h3>
                            {stats.pendingQuotes > 0 && (
                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                    {stats.pendingQuotes} new
                                </span>
                            )}
                        </div>
                    </div>
                </Link>

                {/* Total Products */}
                <Link
                    href="/admin/products"
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-gray-900 transition-all duration-300"
                >
                    <div className="w-13 h-13 rounded-2xl bg-gray-900 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Package size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Active Products</p>
                        <h3 className="text-2xl font-extrabold text-gray-900">{loading ? '...' : stats.products}</h3>
                    </div>
                </Link>

                {/* Categories */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-gray-900 transition-all duration-300">
                    <div className="w-13 h-13 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0 group-hover:scale-105 transition-transform">
                        <LayoutGrid size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Categories</p>
                        <h3 className="text-2xl font-extrabold text-gray-900">{loading ? '...' : stats.categories}</h3>
                    </div>
                </div>

                {/* On Request Items */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-gray-900 transition-all duration-300">
                    <div className="w-13 h-13 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:scale-105 transition-transform">
                        <AlertCircle size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">On Request Items</p>
                        <h3 className="text-2xl font-extrabold text-gray-900">{loading ? '...' : stats.onRequested}</h3>
                    </div>
                </div>

            </div>

            {/* Recent Quotes Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                            Recent Requests for Quotation (RFQs)
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Live client submissions from the /contact portal</p>
                    </div>

                    <Link
                        href="/admin/quotes"
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 uppercase tracking-wider"
                    >
                        View All Quotes <ArrowRight size={14} />
                    </Link>
                </div>

                {loading ? (
                    <div className="py-12 text-center text-gray-400 text-sm">Loading recent inquiries...</div>
                ) : recentQuotes.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {recentQuotes.map((q) => (
                            <div key={q._id || q.referenceId} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 rounded-2xl px-3 transition-colors">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                                            {q.referenceId}
                                        </span>
                                        <h4 className="font-bold text-gray-900 text-sm">{q.fullName}</h4>
                                        <span className="text-xs text-gray-400">·</span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                                            <Building2 size={13} className="text-gray-400" />
                                            {q.organization}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                        <span className="font-semibold text-gray-900">{q.equipment}</span>
                                        <span>(Qty: {q.quantity})</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-gray-500">{q.location}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-gray-400">{new Date(q.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 self-end sm:self-center">
                                    <span className={`text-[10px] uppercase font-extrabold px-3 py-1 rounded-full ${
                                        q.status === 'pending'
                                            ? 'bg-amber-100 text-amber-800'
                                            : q.status === 'in-review'
                                            ? 'bg-blue-100 text-blue-800'
                                            : q.status === 'quoted'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {q.status}
                                    </span>

                                    <Link
                                        href="/admin/quotes"
                                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                        title="View Details"
                                    >
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-sm">
                        No quote requests received yet. Submissions from the /contact page will appear here.
                    </div>
                )}
            </div>

            {/* Catalog Banner */}
            <div className="bg-gray-900 rounded-[3rem] p-10 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Catalog & Inventory</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm font-light">
                        Efficiently manage your medical equipment and laboratory supplies.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/admin/products/add" className="px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition shadow-lg text-xs tracking-wider uppercase flex items-center gap-2">
                            <Plus size={16} /> Add Product
                        </Link>
                        <Link href="/admin/products" className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition text-xs tracking-wider uppercase">
                            Manage Inventory
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            </div>
        </div>
    );
}
