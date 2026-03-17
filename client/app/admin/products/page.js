'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Search, Image as ImageIcon, ExternalLink, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('foluxe_admin_token');
            const res = await fetch(`${API_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
        
        setDeletingId(id);
        try {
            const token = localStorage.getItem('foluxe_admin_token');
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            } else {
                alert('Failed to delete product.');
            }
        } catch (err) {
            alert('Error deleting product.');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tighter">Manage Catalog</h1>
                    <p className="text-gray-500 font-medium">View, edit, or remove products from your catalog.</p>
                </div>

                <Link
                    href="/admin/products/add"
                    className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm tracking-wide"
                >
                    <PlusCircle size={18} />
                    Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-50 bg-white flex justify-between items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search catalog..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="p-6 font-bold">Product Details</th>
                                <th className="p-6 font-bold">Category</th>
                                <th className="p-6 font-bold">Pricing</th>
                                <th className="p-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-gray-100 border-t-gray-900 animate-spin" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading Catalog...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                                <AlertCircle size={32} />
                                            </div>
                                            <p className="text-gray-500 font-medium">No products found in your database.</p>
                                            <Link href="/admin/products/add" className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:underline">
                                                Add your first product
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                                                    {product.images?.[0] || product.imageUrl ? (
                                                        <img src={product.images?.[0] || product.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon size={20} className="text-gray-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-900 block leading-tight mb-1">{product.title}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest truncate max-w-[200px] block">{product.brand || 'No Brand'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600 border border-gray-200">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {product.priceType === 'on-request' ? (
                                                <span className="text-xs font-bold text-gray-400 italic">On Request</span>
                                            ) : (
                                                <span className="text-sm font-bold text-gray-900">₦{product.price?.toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/products/${product._id}`}
                                                    target="_blank"
                                                    className="p-2.5 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-xl border border-gray-100 hover:border-gray-900"
                                                    title="View Public Page"
                                                >
                                                    <ExternalLink size={16} />
                                                </Link>
                                                <Link
                                                    href={`/admin/products/edit/${product._id}`}
                                                    className="p-2.5 text-gray-400 hover:text-black transition-colors bg-white rounded-xl border border-gray-100 hover:border-gray-900"
                                                    title="Edit Product"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    disabled={deletingId === product._id}
                                                    className="p-2.5 text-gray-400 hover:text-white transition-all bg-white hover:bg-black rounded-xl border border-gray-100 hover:border-black disabled:opacity-50"
                                                    title="Delete Product"
                                                >
                                                    {deletingId === product._id ? (
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                </button>
                                            </div>
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
