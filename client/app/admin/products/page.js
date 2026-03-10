'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Image as ImageIcon } from 'lucide-react';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Fetch logic will go here when server is fully connected
    useEffect(() => {
        // Simulating initial fetch with mock data for now
        setTimeout(() => {
            setProducts([
                { _id: '1', title: 'Advanced Binocular Microscope', category: 'Laboratory Equipment', price: 450000 },
                { _id: '2', title: 'Digital Centrifuge 5000 RPM', category: 'Laboratory Equipment', price: null },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // API call to delete will go here
            setProducts(products.filter(p => p._id !== id));
        }
    };

    const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Products</h1>
                    <p className="text-slate-500">View, edit, or remove products from your catalog.</p>
                </div>

                <Link
                    href="/admin/products/add"
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-md hover:bg-blue-700 transition shadow-sm"
                >
                    <PlusCircle size={18} />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                <th className="p-4 font-semibold">Product Info</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500">Loading products...</td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500">No products found.</td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 text-gray-400">
                                                    <ImageIcon size={16} />
                                                </div>
                                                <span className="font-medium text-slate-900">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 font-medium">
                                            {product.price ? `₦${product.price.toLocaleString()}` : <span className="text-gray-400 italic">No Price</span>}
                                        </td>
                                        <td className="p-4 flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/products/edit/${product._id}`}
                                                className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-blue-50 rounded-md"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-slate-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-md"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
