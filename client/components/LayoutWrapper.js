'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Check if the current path is an admin or login page
  const isAdminPage = pathname?.startsWith('/admin') || pathname === '/login';

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main>{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
}
