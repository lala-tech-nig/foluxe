import Link from 'next/link';

export default function Logo({ className = "" }) {
    return (
        <Link href="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl font-sans text-primary-foreground">F</span>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold font-sans tracking-tight text-foreground group-hover:text-primary transition-colors">
                    FOLUXE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground -mt-1">
                    Integrated Services
                </span>
            </div>
        </Link>
    );
}
