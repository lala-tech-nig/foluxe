'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Add Product', href: '/admin/products/add', icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0 md:min-h-screen z-20">
                <div className="p-6 border-b border-slate-800">
                    <Logo className="brightness-0 invert" />
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mt-4">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white font-medium shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
                        <LogOut size={18} />
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shrink-0">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            AD
                        </div>
                        <span className="text-sm font-medium text-slate-700">Administrator</span>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 overflow-auto flex-1 bg-slate-50">
                    {children}
                </div>
            </main>
        </div>
    );
}
