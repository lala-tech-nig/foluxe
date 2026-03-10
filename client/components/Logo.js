import Link from 'next/link';

export default function Logo({ className = "" }) {
    return (
        <Link href="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-xl overflow-hidden shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <span className="text-white font-bold text-xl font-outfit">F</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold font-outfit tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                    FOLUXE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500 -mt-1">
                    Integrated Services
                </span>
            </div>
        </Link>
    );
}
