'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, CheckCircle2, ChevronLeft, ChevronRight, Tag, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const WHATSAPP_NUMBER = '2348142135297';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    // Normalize images field
                    data.images = data.images?.length > 0
                        ? data.images
                        : (data.imageUrl ? [data.imageUrl] : []);
                    setProduct(data);
                } else if (res.status === 404) {
                    setError('Product not found.');
                } else {
                    setError('Failed to load product. Please try again.');
                }
            } catch {
                setError('Cannot connect to the server. Please ensure it is running.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Loading Details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <AlertCircle size={24} className="text-gray-400" />
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    {error || 'Product Not Found'}
                </h1>
                <p className="text-gray-500 text-sm mb-8 max-w-sm">
                    This product may have been removed or the server is unavailable.
                </p>
                <Link href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-full hover:border-gray-900 hover:text-gray-900 transition-all">
                    <ArrowLeft size={14} /> Back to Shop
                </Link>
            </div>
        );
    }

    const images = product.images || [];
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hello Foluxe, I am interested in: *${product.title}*. Could you provide more information and pricing?`
    )}`;

    const prevImg = () => setActiveImg(prev => (prev - 1 + images.length) % images.length);
    const nextImg = () => setActiveImg(prev => (prev + 1) % images.length);

    return (
        <div className="min-h-screen bg-white pt-10 pb-24">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">

                <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-10">
                    <ArrowLeft size={16} /> Back to Shop
                </Link>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 flex flex-col lg:flex-row shadow-sm overflow-hidden">

                    {/* Image Gallery */}
                    <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-8 flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm group">
                            {images.length > 0 ? (
                                <img
                                    src={images[activeImg]}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                    key={activeImg}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-bold">No Image</div>
                            )}

                            {images.length > 1 && (
                                <>
                                    <button onClick={prevImg}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button onClick={nextImg}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                                        <ChevronRight size={16} />
                                    </button>
                                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                        {images.map((_, i) => (
                                            <button key={i} onClick={() => setActiveImg(i)}
                                                className={`rounded-full transition-all duration-300 ${i === activeImg ? 'bg-gray-900 w-5 h-1.5' : 'bg-gray-400/60 w-1.5 h-1.5'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveImg(i)}
                                        className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${i === activeImg ? 'border-gray-900' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                        <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">{product.category}</span>
                            {product.brand && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">{product.brand}</span>
                            )}
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 tracking-tighter leading-tight">{product.title}</h1>

                        <div className="mb-8 pb-8 border-b border-gray-100">
                            {product.priceType === 'on-request' ? (
                                <p className="text-lg text-gray-500 font-semibold italic">Price on Request</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">₦{product.price?.toLocaleString()}</p>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-sm font-light">{product.description}</p>
                        </div>

                        {product.features && product.features.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">Key Features</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                                            <div className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={12} className="text-white" />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {product.tags && product.tags.length > 0 && (
                            <div className="mb-10">
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, i) => (
                                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <Tag size={10} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-8 border-t border-gray-100">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 tracking-wide text-sm"
                            >
                                <MessageCircle size={18} />
                                Inquire or Buy via WhatsApp
                            </a>
                            <p className="text-xs text-gray-400 mt-4 text-center font-light">
                                Opens WhatsApp with a pre-filled message about this product.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
