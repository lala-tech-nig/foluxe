import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <Logo className="brightness-0 invert" />
                        <p className="text-sm leading-relaxed text-slate-400">
                            Leading Medical & Laboratory Solutions Provider in Nigeria. We specialize in procurement, supply, and maintenance of high-quality scientific equipment and chemicals.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Our Products</Link></li>
                            <li><Link href="/maintenance" className="hover:text-primary transition-colors">Maintenance Services</Link></li>
                            <li><Link href="/quote" className="hover:text-primary transition-colors">Request a Quote</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link href="/services/lab-chemicals" className="hover:text-primary transition-colors">Laboratory Chemicals</Link></li>
                            <li><Link href="/services/medical-chemicals" className="hover:text-primary transition-colors">Medical Reagents</Link></li>
                            <li><Link href="/services/lab-equipment" className="hover:text-primary transition-colors">Lab Equipment Sales</Link></li>
                            <li><Link href="/services/medical-equipment" className="hover:text-primary transition-colors">Medical Equipment Repair</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="flex flex-col gap-5 text-sm">
                            <li className="flex gap-3">
                                <MapPin className="text-primary shrink-0" size={18} />
                                <span>1st Floor, Obafemi Awolowo House, 29/31 Obafemi Awolowo Way, Ikeja, Lagos, Nigeria</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="text-primary shrink-0" size={18} />
                                <div className="flex flex-col">
                                    <span>0814 213 5297</span>
                                    <span>0802 442 0010</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="text-primary shrink-0" size={18} />
                                <span>foluxeconcepts@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} FOLUXE INTEGRATED SERVICES LIMITED. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
