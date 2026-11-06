import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import VecnexLogo from '@/components/common/vecnex-logo';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-[#111111] text-center">
      <div className="max-w-md mx-auto space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.06)]">
        <div className="inline-block">
          <VecnexLogo size="md" showWordmark={false} />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 font-bold">
            ERROR 404 • REPOSITORY NOT FOUND
          </span>
          <h1 className="text-3xl font-black font-heading text-[#111111]">Project Not Found</h1>
          <p className="text-xs text-[#111111]/75 font-normal leading-relaxed">
            The requested engineering repository or page does not exist or has been relocated within the VECNEX catalog.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 py-3 rounded-full luxury-button-primary text-[#111111] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Compass className="h-4 w-4 text-[#6E263D]" />
            <span>Browse Catalog</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full luxury-button-secondary text-xs font-bold text-[#111111] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Return Home</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
