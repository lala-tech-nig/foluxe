'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

const categories = ['Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'];

// Mock data to simulate fetching an existing product
const mockProducts = [
    { _id: '1', title: 'Advanced Binocular Microscope', category: 'Laboratory Equipment', description: 'High-resolution binocular microscope.', features: ['LED Illumination', 'Mechanical Stage'], price: 450000, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' }
];

export default function EditProduct() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        features: ['']
    });

    useEffect(() => {
        // Simulate fetching product details
        const fetchProduct = () => {
            const found = mockProducts.find(p => p._id === id) || mockProducts[0];
            setFormData({
                ...found,
                price: found.price || '',
                features: found.features && found.features.length > 0 ? found.features : ['']
            });
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

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
        setSaving(true);

        const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
        const dataToSend = { ...formData, features: cleanedFeatures, price: formData.price ? Number(formData.price) : null };

        try {
            // Will connect to actual backend API here
            // await fetch(`http://localhost:5000/api/products/${id}`, { method: 'PUT', ... })
            console.log('Updating data:', dataToSend);

            await new Promise(r => setTimeout(r, 1000)); // Simulate network request

            alert('Product updated successfully!');
            router.push('/admin/products');
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-12 text-center text-slate-500">Loading product details...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 text-slate-500 hover:text-primary transition bg-white border border-gray-200 rounded-md shadow-sm">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
                    <p className="text-slate-500 text-sm">Update details for {formData.title}</p>
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
                        {formData.imageUrl && (
                            <div className="mt-2 w-32 h-32 rounded bg-gray-100 border border-gray-200 overflow-hidden">
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
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
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Updating...' : 'Update Product'}
                    </button>
                </div>

            </form>
        </div>
    );
}
