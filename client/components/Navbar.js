'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
        name: 'Services',
        href: '/services',
        subLinks: [
            { name: 'Laboratory Chemicals', href: '/services/lab-chemicals' },
            { name: 'Medical Chemicals', href: '/services/medical-chemicals' },
            { name: 'Laboratory Equipment', href: '/services/lab-equipment' },
            { name: 'Medical Equipment', href: '/services/medical-equipment' },
        ]
    },
    { name: 'Products', href: '/products' },
    { name: 'Maintenance', href: '/maintenance' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Logo />

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            <Link
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-slate-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                            {link.subLinks && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                    {link.subLinks.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            href={sub.href}
                                            className="block px-4 py-3 text-xs text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/quote"
                        className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                        Request a Quote
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300">
                    <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-lg font-semibold text-slate-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                                {link.subLinks && (
                                    <div className="mt-2 pl-4 flex flex-col gap-3">
                                        {link.subLinks.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="text-sm text-slate-500"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/quote"
                            className="mt-4 px-6 py-4 bg-primary text-white text-center font-bold rounded-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
