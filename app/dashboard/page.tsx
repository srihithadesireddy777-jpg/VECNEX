'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, CheckCircle2, FileText, ShoppingBag, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/lib/types';

function BuyerDashboardContent() {
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get('payment') === 'success';
  const orderId = searchParams.get('orderId') || 'ORD-89412';

  const [purchasedProjects, setPurchasedProjects] = useState<Project[]>([]);
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; branch?: string } | null>(null);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem('capstonia_user') ||
        localStorage.getItem('fastrack_user') ||
        localStorage.getItem('vecnex_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}

    try {
      const orders =
        localStorage.getItem('capstonia_purchased_orders') ||
        localStorage.getItem('fastrack_purchased_orders') ||
        localStorage.getItem('vecnex_purchased_orders');
      if (orders) {
        setLocalOrders(JSON.parse(orders));
      }
    } catch {}

    const fetchPurchased = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('projects').select('*').limit(3);
        if (data) setPurchasedProjects(data);
      } catch (e) {
        console.warn('Dashboard projects fetch error:', e);
      }
    };
    fetchPurchased();
  }, []);

  return (
    <div className="space-y-10 text-[#111111]">
      {/* Payment Success Toast Banner */}
      {paymentSuccess && (
        <div className="p-6 rounded-3xl bg-[#F4E8E8] border border-[#6E263D]/30 flex items-center justify-between shadow-[0_10px_30px_rgba(110,38,61,0.06)] animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#E8D2D6] border border-[#6E263D]/40 flex items-center justify-center text-[#6E263D] font-bold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-[#111111]">Order Confirmed!</h3>
              <p className="text-xs text-[#111111]/75 font-normal">
                Order #{orderId} has been verified. Download packages below.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-[#E8D2D6] text-[#111111] px-3 py-1 rounded-full border border-[#6E263D]/30 font-semibold">
            Instant Access Unlocked
          </span>
        </div>
      )}

      {/* Dashboard Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D2D6] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-[#111111]">
              {currentUser?.name ? `${currentUser.name}'s Dashboard` : 'Student Dashboard'}
            </h1>
            {currentUser?.branch && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6]">
                {currentUser.branch}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#111111]/75 mt-1 font-normal">
            Welcome back, <strong className="text-[#111111]">{currentUser?.name || 'Engineering Student'}</strong>! Access your verified project packages, IEEE reports, and viva presentation decks.
          </p>
        </div>

        <Link
          href="/projects"
          className="px-5 py-2.5 rounded-full luxury-button-secondary text-xs font-bold text-[#111111] shrink-0 self-start sm:self-auto cursor-pointer"
        >
          Browse More Projects
        </Link>
      </div>

      {/* Recent WhatsApp / Direct Inquiries Banner */}
      {localOrders.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111]/70 font-bold">
            <ShoppingBag className="h-4 w-4 text-[#6E263D]" />
            <span>Active Project Inquiries ({localOrders.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localOrders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E8D2D6] flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#111111]/60 font-semibold">{ord.orderId}</span>
                  <h4 className="text-xs font-bold text-[#111111] line-clamp-1">{ord.projectTitle}</h4>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#F4E8E8] text-[#111111] border border-[#6E263D]/30 font-semibold whitespace-nowrap">
                  WhatsApp Direct
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Purchased Projects Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-[#111111]">Repository Downloads</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchasedProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-[#111111] px-2.5 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6]">
                    {project.branch}
                  </span>
                  <span className="text-xs font-mono text-[#6E263D] font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Download
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111111] line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-xs text-[#111111]/75 mt-2 line-clamp-2 leading-relaxed font-normal">
                  {project.short_description}
                </p>
              </div>

              {/* Action Downloads */}
              <div className="pt-4 border-t border-[#E8D2D6] space-y-2.5">
                <a
                  href={`/api/download/${orderId}`}
                  className="w-full py-3 px-4 rounded-full luxury-button-primary text-[#111111] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#6E263D]" />
                  <span>Download Source Code & Package (ZIP)</span>
                </a>

                <Link
                  href={`/projects/${project.slug}`}
                  className="w-full py-2.5 px-4 rounded-full luxury-button-secondary text-[#111111] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-[#111111]/70" />
                  <span>View Documentation & Setup Guide</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BuyerDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense
        fallback={
          <div className="text-[#111111]/60 text-xs font-mono py-16 text-center">
            LOADING STUDENT REPOSITORY...
          </div>
        }
      >
        <BuyerDashboardContent />
      </Suspense>
    </div>
  );
}
