'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Save, Plus, X, ImagePlus, Tag, DollarSign, CheckCircle, ChevronRight, LayoutGrid, ImageIcon, ListChecks } from 'lucide-react';

const categories = ['Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'];
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AddProduct() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [step, setStep] = useState(1);
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

    const handleFeatureChange = (index, value) => {
        const updated = [...formData.features];
        updated[index] = value;
        setFormData({ ...formData, features: updated });
    };
    const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
    const removeFeature = (index) => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const total = selectedImages.length + files.length;
        if (total > 5) {
            setError('Maximum 5 images allowed.');
            return;
        }
        setError('');
        const newFiles = [...selectedImages, ...files].slice(0, 5);
        setSelectedImages(newFiles);

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
        if (e) e.preventDefault();
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
            setError('Server connection failed.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const inputClass = "w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-gray-900 text-sm focus:bg-white focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400";
    const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3";

    const steps = [
        { id: 1, name: 'Identity', icon: LayoutGrid },
        { id: 2, name: 'Media', icon: ImageIcon },
        { id: 3, name: 'Details', icon: ListChecks },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-3 text-gray-400 hover:text-gray-900 bg-white rounded-2xl border border-gray-100 transition-all hover:border-gray-900 shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tighter">New Product</h1>
                        <p className="text-gray-500 font-medium text-sm">Add a new item to the Foluxe database.</p>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                    {steps.map((s) => (
                        <div key={s.id} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${step === s.id ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400'}`}>
                            <s.icon size={14} />
                            <span className="hidden sm:inline uppercase tracking-widest">{s.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {success && (
                <div className="flex items-center gap-4 bg-gray-900 text-white rounded-[2rem] p-6 mb-10 shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <CheckCircle size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-lg leading-none mb-1">Success!</p>
                        <p className="text-gray-400 text-sm font-light">Product created. Redirecting to catalog...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-[2rem] p-6 mb-10 shadow-sm text-gray-900">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                        <X size={20} className="text-gray-900" />
                    </div>
                    <div>
                        <p className="font-bold">Something went wrong</p>
                        <p className="text-gray-500 text-sm font-light">{error}</p>
                    </div>
                </div>
            )}

            <div className={`bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-8 md:p-12 transition-all duration-500 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                
                {/* STEP 1: IDENTITY */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className={labelClass}>Product Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Advanced Binocular Microscope" 
                                    className={inputClass}
                                    value={formData.title} 
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Category</label>
                                <select 
                                    className={inputClass} 
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Brand</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Olympus, Mindray" 
                                    className={inputClass}
                                    value={formData.brand} 
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })} 
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Description</label>
                                <textarea 
                                    rows={6} 
                                    placeholder="Provide a detailed description of the equipment..." 
                                    className={inputClass}
                                    value={formData.description} 
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: MEDIA */}
                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                <ImageIcon size={32} className="text-gray-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Visual Assets</h2>
                            <p className="text-gray-500 text-sm font-light mt-2">Upload up to 5 clear images of the product.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 group border border-gray-100">
                                    <img src={preview} alt="" className="w-full h-full object-cover" />
                                    <button 
                                        type="button" 
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {selectedImages.length < 5 && (
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-[4/5] border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ImagePlus size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-widest">Add Image</p>
                                    </div>
                                </button>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelect} />
                    </div>
                )}

                {/* STEP 3: SPECIFICATIONS */}
                {step === 3 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Pricing */}
                        <div>
                            <label className={labelClass}>Pricing Strategy</label>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button 
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priceType: 'fixed' })}
                                    className={`flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border-2 text-sm font-bold transition-all ${formData.priceType === 'fixed'
                                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                        : 'bg-white text-gray-400 border-gray-50 hover:border-gray-900 hover:text-gray-900'}`}
                                >
                                    <DollarSign size={18} /> Fixed Price
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priceType: 'on-request', price: '' })}
                                    className={`flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border-2 text-sm font-bold transition-all ${formData.priceType === 'on-request'
                                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                        : 'bg-white text-gray-400 border-gray-50 hover:border-gray-900 hover:text-gray-900'}`}
                                >
                                    <ArrowRight size={18} /> On Request
                                </button>
                            </div>

                            {formData.priceType === 'fixed' && (
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</div>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="0.00" 
                                        className={`${inputClass} pl-10`}
                                        value={formData.price} 
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                                    />
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        <div>
                            <label className={labelClass}>Key Features & Specs</label>
                            <div className="space-y-3">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">{index + 1}</div>
                                        <input 
                                            type="text" 
                                            placeholder={`e.g. High precision sensor...`} 
                                            className={inputClass}
                                            value={feature} 
                                            onChange={(e) => handleFeatureChange(index, e.target.value)} 
                                        />
                                        {formData.features.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeFeature(index)}
                                                className="p-3 text-gray-400 hover:text-gray-900 transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button 
                                type="button" 
                                onClick={addFeature}
                                className="mt-4 flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-[0.2em] transition-colors"
                            >
                                <Plus size={14} /> Add Feature Line
                            </button>
                        </div>

                        {/* Search Tags */}
                        <div>
                            <label className={labelClass}>Discovery Tags <span className="text-gray-400 font-light normal-case">(comma separated)</span></label>
                            <div className="relative">
                                <Tag size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="lab, medical, genetics, analyzer" 
                                    className={`${inputClass} pl-14`}
                                    value={formData.tags} 
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })} 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP NAVIGATION */}
                <div className="mt-16 flex items-center justify-between pt-10 border-t border-gray-50">
                    <button
                        type="button"
                        onClick={prevStep}
                        className={`flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                        <ArrowLeft size={16} /> Previous Step
                    </button>

                    <div className="flex gap-4">
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex items-center gap-3 px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm tracking-wide"
                            >
                                Continue To {steps[step].name} <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading || success}
                                className="flex items-center gap-3 px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm tracking-wide disabled:opacity-50"
                            >
                                <Save size={18} /> {loading ? 'Saving Catalog...' : 'Publish Product'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
