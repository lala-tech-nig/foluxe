'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X, Upload, ImagePlus, Tag, DollarSign, CheckCircle } from 'lucide-react';

const categories = ['Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'];
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AddProduct() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceType: 'fixed',
        price: '',
        category: 'Laboratory Equipment',
        brand: '',
        features: [''],
        tags: '',
    });

    const [selectedImages, setSelectedImages] = useState([]); // File objects
    const [imagePreviews, setImagePreviews] = useState([]);   // Data URLs for preview

    // Feature management
    const handleFeatureChange = (index, value) => {
        const updated = [...formData.features];
        updated[index] = value;
        setFormData({ ...formData, features: updated });
    };
    const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
    const removeFeature = (index) => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });

    // Image selection
    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const total = selectedImages.length + files.length;
        if (total > 5) {
            setError('You can upload a maximum of 5 images.');
            return;
        }
        setError('');
        const newFiles = [...selectedImages, ...files].slice(0, 5);
        setSelectedImages(newFiles);

        // Generate previews
        const previews = [];
        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                previews.push(ev.target.result);
                if (previews.length === newFiles.length) {
                    setImagePreviews([...previews]);
                }
            };
            reader.readAsDataURL(file);
        });
        if (newFiles.length === 0) setImagePreviews([]);
    };

    const removeImage = (index) => {
        const newFiles = selectedImages.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setSelectedImages(newFiles);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('foluxe_admin_token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const body = new FormData();
            body.append('title', formData.title);
            body.append('description', formData.description);
            body.append('priceType', formData.priceType);
            if (formData.priceType === 'fixed' && formData.price) {
                body.append('price', formData.price);
            }
            body.append('category', formData.category);
            body.append('brand', formData.brand);
            formData.features.filter(f => f.trim()).forEach(f => body.append('features', f));
            body.append('tags', formData.tags);
            selectedImages.forEach(img => body.append('images', img));

            const res = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body,
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.msg || 'Failed to create product.');
            } else {
                setSuccess(true);
                setTimeout(() => router.push('/admin/products'), 1500);
            }
        } catch (err) {
            setError('Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all placeholder-gray-400";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2";

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all border border-gray-200">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Add New Product</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Create a new item in the Foluxe catalog.</p>
                </div>
            </div>

            {success && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                    <CheckCircle size={18} className="text-green-600 shrink-0" />
                    <p className="text-green-700 font-medium text-sm">Product created successfully! Redirecting...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                    <X size={18} className="text-red-500 shrink-0" />
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT: Main Form */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">Basic Information</h3>

                        <div>
                            <label className={labelClass}>Product Title *</label>
                            <input required type="text" placeholder="e.g. Advanced Binocular Microscope" className={inputClass}
                                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Category *</label>
                                <select required className={inputClass} value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Brand</label>
                                <input type="text" placeholder="e.g. Olympus, Mindray" className={inputClass}
                                    value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Description *</label>
                            <textarea required rows={5} placeholder="Describe the product in detail..." className={inputClass}
                                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">Pricing</h3>

                        <div>
                            <label className={labelClass}>Price Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button"
                                    onClick={() => setFormData({ ...formData, priceType: 'fixed' })}
                                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-bold transition-all ${formData.priceType === 'fixed'
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                                    <DollarSign size={16} /> Fixed Price
                                </button>
                                <button type="button"
                                    onClick={() => setFormData({ ...formData, priceType: 'on-request', price: '' })}
                                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-bold transition-all ${formData.priceType === 'on-request'
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                                    On Request
                                </button>
                            </div>
                        </div>

                        {formData.priceType === 'fixed' && (
                            <div>
                                <label className={labelClass}>Price (₦) *</label>
                                <input type="number" min="0" placeholder="0" required={formData.priceType === 'fixed'} className={inputClass}
                                    value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">Key Features</h3>
                        <div className="space-y-3">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input type="text" placeholder={`Feature ${index + 1}`} className={inputClass}
                                        value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} />
                                    {formData.features.length > 1 && (
                                        <button type="button" onClick={() => removeFeature(index)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-200 hover:border-red-200 transition-all shrink-0">
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addFeature}
                            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors">
                            <Plus size={14} /> Add Feature
                        </button>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">Tags <span className="text-gray-400 font-normal normal-case tracking-normal">(comma separated)</span></h3>
                        <div className="relative">
                            <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="microscope, lab, diagnostics" className={`${inputClass} pl-10`}
                                value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* RIGHT: Images + Submit */}
                <div className="flex flex-col gap-6">
                    {/* Image Upload */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">
                            Product Images <span className="text-gray-400 font-normal normal-case tracking-normal">(up to 5)</span>
                        </h3>

                        {/* Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                                        <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeImage(index)}
                                            className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload Area */}
                        {selectedImages.length < 5 && (
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all group">
                                <ImagePlus size={24} className="transition-transform group-hover:scale-110" />
                                <div className="text-center">
                                    <p className="text-xs font-bold uppercase tracking-widest">Click to upload</p>
                                    <p className="text-xs mt-1 font-normal">{5 - selectedImages.length} slots remaining</p>
                                </div>
                            </button>
                        )}
                        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelect} />
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3">
                        <button type="submit" disabled={loading || success}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white font-bold text-sm rounded-full hover:bg-black transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            <Save size={16} />
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                        <Link href="/admin/products"
                            className="w-full flex items-center justify-center px-6 py-3.5 border border-gray-200 text-gray-500 font-medium text-sm rounded-full hover:border-gray-900 hover:text-gray-900 transition-all">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
