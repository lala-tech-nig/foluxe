import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-2xl font-sans tracking-tight">
                                FOLUXE
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 mt-2">
                            Leading Medical & Laboratory Solutions Provider in Nigeria. Quality equipment, reliable service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Our Shop</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Area</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop Categories</h4>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li><Link href="/products?category=Laboratory+Equipment" className="hover:text-primary transition-colors">Laboratory Equipment</Link></li>
                            <li><Link href="/products?category=Medical+Equipment" className="hover:text-primary transition-colors">Medical Equipment</Link></li>
                            <li><Link href="/products?category=Chemicals+%26+Reagents" className="hover:text-primary transition-colors">Chemicals & Reagents</Link></li>
                            <li><Link href="/products?category=Consumables" className="hover:text-primary transition-colors">Consumables</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                        <ul className="flex flex-col gap-5 text-sm">
                            <li className="flex gap-3 items-start hover:text-white transition-colors">
                                <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                                <span>1st Floor, Obafemi Awolowo House, 29/31 Obafemi Awolowo Way, Ikeja, Lagos.</span>
                            </li>
                            <li className="flex gap-3 hover:text-white transition-colors">
                                <Phone className="text-primary shrink-0" size={18} />
                                <div className="flex flex-col">
                                    <span>0814 213 5297</span>
                                    <span>0802 442 0010</span>
                                </div>
                            </li>
                            <li className="flex gap-3 items-center hover:text-white transition-colors">
                                <Mail className="text-primary shrink-0" size={18} />
                                <span>foluxeconcepts@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} FOLUXE INTEGRATED SERVICES LIMITED. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
