import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-900 pt-16 pb-8 text-gray-500">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/foluxelogo.png"
                                alt="Foluxe Logo"
                                width={36}
                                height={36}
                                className="object-contain"
                            />
                            <span className="text-white font-extrabold text-xl tracking-tighter uppercase">
                                Foluxe Global
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 mt-2">
                            Leading Medical & Laboratory Solutions Provider in Nigeria. Quality equipment, reliable service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-white transition-colors">Our Shop</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Shop Categories</h4>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li><Link href="/products?category=Laboratory+Equipment" className="hover:text-white transition-colors">Laboratory Equipment</Link></li>
                            <li><Link href="/products?category=Medical+Equipment" className="hover:text-white transition-colors">Medical Equipment</Link></li>
                            <li><Link href="/products?category=Chemicals+%26+Reagents" className="hover:text-white transition-colors">Chemicals & Reagents</Link></li>
                            <li><Link href="/products?category=Consumables" className="hover:text-white transition-colors">Consumables</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Contact Us</h4>
                        <ul className="flex flex-col gap-5 text-sm">
                            <li className="flex gap-3 items-start hover:text-white transition-colors">
                                <MapPin className="text-gray-600 shrink-0 mt-0.5" size={18} />
                                <span>1st Floor, Obafemi Awolowo House, 29/31 Obafemi Awolowo Way, Ikeja, Lagos.</span>
                            </li>
                            <li className="flex gap-3 hover:text-white transition-colors">
                                <Phone className="text-gray-600 shrink-0" size={18} />
                                <div className="flex flex-col">
                                    <span>0814 213 5297</span>
                                    <span>0802 442 0010</span>
                                </div>
                            </li>
                            <li className="flex gap-3 items-center hover:text-white transition-colors">
                                <Mail className="text-gray-600 shrink-0" size={18} />
                                <span>foluxeconcepts@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 mt-12">
                    <p>© {new Date().getFullYear()} FOLUXE INTEGRATED SERVICES LIMITED. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
