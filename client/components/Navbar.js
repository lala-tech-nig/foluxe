'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About Us', href: '/about' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav 
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' 
                    : 'bg-white border-b border-transparent'
            }`}
        >
            <div className={`container mx-auto px-6 md:px-12 max-w-7xl grid grid-cols-3 items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}>

                {/* Logo — Left */}
                <div className="flex items-center z-50">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/foluxelogo.png"
                            alt="Foluxe Logo"
                            width={36}
                            height={36}
                            className="object-contain"
                        />
                        <span className="text-gray-900 font-extrabold text-2xl tracking-tighter uppercase relative">
                            Foluxe
                            <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </Link>
                </div>

                {/* Nav Links — Center */}
                <div className="hidden lg:flex items-center justify-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors relative group py-2 ${
                                pathname === link.href ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {link.name}
                            <span
                                className={`absolute bottom-0 left-0 h-[2px] bg-gray-900 transition-all duration-300 ${
                                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>
                    ))}
                </div>

                {/* CTA Button — Right */}
                <div className="hidden lg:flex items-center justify-end">
                    <Link
                        href="/products"
                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Shop Now
                    </Link>
                </div>

                {/* Mobile Toggle — spans right slot on mobile */}
                <div className="flex lg:hidden justify-end col-start-3 z-50">
                    <button
                        className="text-gray-900 hover:text-gray-600 transition-colors focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`lg:hidden absolute top-full left-0 right-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
                }`}
            >
                <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-xl font-medium transition-colors ${
                                pathname === link.href ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-full h-px bg-gray-100 my-2"></div>
                    <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white text-center font-medium rounded-full shadow-md hover:bg-black transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Shop Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
