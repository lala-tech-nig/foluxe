'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Shield } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About Us', href: '/about' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-[#0056b3] shadow-md">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-2xl font-sans tracking-tight">
                        FOLUXE
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-200 ${pathname === link.href ? 'text-white' : 'text-blue-100'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="w-px h-6 bg-blue-400 mx-2"></div>

                    <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors"
                    >
                        <Shield className="w-4 h-4" />
                        Admin
                    </Link>

                    <Link
                        href="/products"
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#0056b3] text-sm font-bold rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Shop Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0056b3] border-t border-blue-400 shadow-xl">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-lg font-medium transition-colors ${pathname === link.href ? 'text-white' : 'text-blue-100'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-blue-400 my-2"></div>
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 text-lg font-medium text-blue-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <Shield className="w-5 h-5" />
                            Admin Dashboard
                        </Link>
                        <Link
                            href="/products"
                            className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0056b3] text-center font-bold rounded-md shadow-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Shop Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
