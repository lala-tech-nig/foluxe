'use client';

import { Package, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome to your store control center.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Total Products</p>
                        <h3 className="text-2xl font-bold text-slate-900">45</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Active Categories</p>
                        <h3 className="text-2xl font-bold text-slate-900">4</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Items Needs Update</p>
                        <h3 className="text-2xl font-bold text-slate-900">2</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Actions</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">Manage your catalog quickly from here. Ensure your product details are always up to date.</p>
                <div className="flex justify-center gap-4">
                    <Link href="/admin/products/add" className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-blue-700 transition">
                        Add New Product
                    </Link>
                    <Link href="/admin/products" className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition">
                        Manage Catalog
                    </Link>
                </div>
            </div>
        </div>
    );
}
