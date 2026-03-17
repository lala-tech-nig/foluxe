'use client';

import { useState, useEffect } from 'react';
import { Package, Tag, AlertCircle, Plus, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, categories: 0, onRequested: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('foluxe_admin_token');
                // Fetch products and meta to calculate stats
                const [pRes, mRes] = await Promise.all([
                    fetch(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } }),
                    fetch(`${API_URL}/api/products/meta`)
                ]);

                if (pRes.ok && mRes.ok) {
                    const products = await pRes.json();
                    const meta = await mRes.json();
                    
                    setStats({
                        products: products.length,
                        categories: meta.categories?.length || 0,
                        onRequested: products.filter(p => p.priceType === 'on-request').length
                    });
                }
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tighter">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Welcome to your store control center.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-gray-900 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Products</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">{loading ? '...' : stats.products}</h3>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-gray-900 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0 group-hover:scale-110 transition-transform">
                        <LayoutGrid size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Categories</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">{loading ? '...' : stats.categories}</h3>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-gray-900 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:scale-110 transition-transform">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">On Request Items</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">{loading ? '...' : stats.onRequested}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Catalog Management</h3>
                    <p className="text-gray-400 mb-10 max-w-md mx-auto text-sm font-light">Efficiently manage your medical and laboratory supplies. Keep your inventory current and accurate.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/admin/products/add" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm tracking-wide flex items-center gap-2">
                            <Plus size={18} /> Add New Product
                        </Link>
                        <Link href="/admin/products" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition text-sm tracking-wide">
                            Manage Catalog
                        </Link>
                    </div>
                </div>
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            </div>
        </div>
    );
}
