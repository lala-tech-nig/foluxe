'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

const categories = ['Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'];

export default function AddProduct() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Laboratory Equipment',
        imageUrl: '',
        features: ['']
    });

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Filter out empty features
        const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
        const dataToSend = { ...formData, features: cleanedFeatures, price: formData.price ? Number(formData.price) : null };

        try {
            // Will connect to actual backend API here
            // await fetch('http://localhost:5000/api/products', { method: 'POST', ... })
            console.log('Sending data:', dataToSend);

            // Simulate network request
            await new Promise(r => setTimeout(r, 1000));

            alert('Product added successfully!');
            router.push('/admin/products');
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 text-slate-500 hover:text-primary transition bg-white border border-gray-200 rounded-md shadow-sm">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
                    <p className="text-slate-500 text-sm">Create a new item in your catalog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:p-8 space-y-8">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-2">Basic Information</h3>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Product Title *</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Category *</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₦) <span className="text-slate-400 font-normal">(Leave blank for 'Quote')</span></label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Details Content */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-2">Details & Media</h3>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Full Description *</label>
                        <textarea
                            required
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-2">Key Features</h3>

                    <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder={`Feature ${index + 1}`}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                />
                                {formData.features.length > 1 && (
                                    <button type="button" onClick={() => removeFeature(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md border border-transparent hover:border-red-100 transition">
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="button" onClick={addFeature} className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-700 transition">
                        <Plus size={16} /> Add Another Feature
                    </button>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                    <Link href="/admin/products" className="px-6 py-2.5 border border-gray-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>

            </form>
        </div>
    );
}
