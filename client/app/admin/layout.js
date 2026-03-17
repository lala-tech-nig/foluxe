'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, PlusCircle, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [adminEmail, setAdminEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('foluxe_admin_token');
        if (!token) {
            router.replace('/login');
            return;
        }
        // Optionally verify the token by calling /api/auth/me
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) {
                    localStorage.removeItem('foluxe_admin_token');
                    router.replace('/login');
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data?.email) setAdminEmail(data.email);
            })
            .catch(() => {
                // Server offline - allow access but show no email
            });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('foluxe_admin_token');
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Add Product', href: '/admin/products/add', icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-black text-white flex flex-col shrink-0 md:min-h-screen z-20">
                <div className="p-6 border-b border-white/5">
                    <span className="text-white font-extrabold text-xl tracking-tighter uppercase">Foluxe</span>
                    <span className="text-xs uppercase tracking-widest text-gray-600 font-bold block mt-1">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                                    isActive
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon size={16} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors text-sm rounded-xl hover:bg-white/5"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 h-16 flex items-center px-8 shrink-0">
                    <div className="flex-1">
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Foluxe Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                            AD
                        </div>
                        <span className="text-sm font-medium text-gray-700">{adminEmail || 'Administrator'}</span>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 overflow-auto flex-1 bg-gray-50">
                    {children}
                </div>
            </main>
        </div>
    );
}
