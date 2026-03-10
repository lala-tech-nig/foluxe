'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, CheckCircle2 } from 'lucide-react';

// Using the same mock data for immediate visual result before backend connection
const mockProducts = [
    { _id: '1', title: 'Advanced Binocular Microscope', category: 'Laboratory Equipment', description: 'Experience unparalleled clarity with our Advanced Binocular Microscope. Designed for both clinical and educational laboratories, it features high-intensity LED illumination, four objective lenses (4x, 10x, 40x, 100x Oil), and an ergonomic design for extended use without fatigue. The precision mechanical stage allows for smooth slide navigation.', features: ['LED Illumination', 'Mechanical Stage', 'Coaxial Coarse & Fine Focus', 'Anti-fungal Optics'], price: 450000, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' },
    { _id: '2', title: 'Digital Centrifuge 5000 RPM', category: 'Laboratory Equipment', description: 'Programmable benchtop centrifuge with variable speed settings up to 5000 RPM.', features: ['Digital Display', 'Brushless Motor', 'Safety Lid Lock'], price: null, imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800' },
    // ... we only need to mock one detailed item for testing the UI
];

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch
        const fetchProduct = () => {
            const found = mockProducts.find(p => p._id === id) || mockProducts[0]; // Fallback to first if not found in mock
            setProduct(found);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center p-6"><span className="text-slate-500 font-medium">Loading product details...</span></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Product not found.</h1></div>;

    // Construct WhatsApp message
    const phoneNumber = "2348142135297"; // Format without (+)
    const defaultMessage = `Hello Foluxe, I am interested in purchasing the product: *${product.title}*. Could you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-24">
            <div className="container mx-auto px-6">

                {/* Back Link */}
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8">
                    <ArrowLeft size={16} /> Back to Shop
                </Link>

                <div className="bg-white border border-gray-200 flex flex-col lg:flex-row shadow-sm">
                    {/* Image Section */}
                    <div className="lg:w-1/2 bg-gray-100 relative min-h-[400px] lg:min-h-0 flex items-center justify-center">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">No Image Available</span>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">{product.category}</span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">{product.title}</h1>

                        <div className="text-2xl font-bold text-slate-900 mb-8 pb-8 border-b border-gray-100">
                            {product.price ? `₦${product.price.toLocaleString()}` : <span className="text-lg text-slate-500 font-medium">Price on Request</span>}
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Description</h3>
                            <p className="leading-relaxed">{product.description}</p>
                        </div>

                        {product.features && product.features.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide text-sm">Key Features</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                            <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-auto pt-8 border-t border-gray-100">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20"
                            >
                                <MessageCircle size={20} />
                                Buy via WhatsApp
                            </a>
                            <p className="text-xs text-slate-400 mt-4 text-center sm:text-left">
                                Clicking this will securely open WhatsApp and pre-fill your inquiry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
