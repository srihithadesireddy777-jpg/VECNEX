import Link from 'next/link';
import { ShieldCheck, Download, FileText, CheckCircle2, MessageSquare, Terminal } from 'lucide-react';
import { BRANCHES } from '@/lib/constants';
import VecnexLogo from '@/components/common/vecnex-logo';

export default function Footer() {
  return (
    <footer className="bg-[#F7F5EF] border-t border-[#E8D2D6] pt-16 pb-12 text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deliverable Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-14 border-b border-[#E8E5DC]">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#E8D2D6] shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
              <Download className="h-5 w-5 text-[#6E263D]" />
            </div>
            <div>
              <h4 className="text-[#111111] text-xs font-bold uppercase tracking-wider font-heading">
                Instant Access
              </h4>
              <p className="text-[11px] text-[#111111]/80 mt-0.5 font-medium">
                ZIP source code package delivered immediately
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#E8D2D6] shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-[#6E263D]" />
            </div>
            <div>
              <h4 className="text-[#111111] text-xs font-bold uppercase tracking-wider font-heading">
                Complete Package
              </h4>
              <p className="text-[11px] text-[#111111]/80 mt-0.5 font-medium">
                Tested Code + IEEE Report + Viva PPT Slides
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#E8D2D6] shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-[#6E263D]" />
            </div>
            <div>
              <h4 className="text-[#111111] text-xs font-bold uppercase tracking-wider font-heading">
                100% Tested & Verified
              </h4>
              <p className="text-[11px] text-[#111111]/80 mt-0.5 font-medium">
                Guaranteed execution walkthrough demo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#E8D2D6] shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
              <MessageSquare className="h-5 w-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-[#111111] text-xs font-bold uppercase tracking-wider font-heading">
                WhatsApp Support
              </h4>
              <p className="text-[11px] text-[#111111]/80 mt-0.5 font-medium">
                +91 73823 24346 • Direct technical guidance
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <VecnexLogo size="md" />
            </Link>

            <p className="text-xs font-mono text-[#6E263D] italic font-bold">
              &quot;Ideas deserve to be engineered.&quot;
            </p>

            <p className="text-xs text-[#111111]/80 leading-relaxed max-w-sm font-medium">
              VECNEX is an engineering marketplace for B.Tech, B.E., and postgraduate students. Curated, tested deliverables with source code archives, IEEE documentation, viva presentations, and continuous technical mentoring.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#111111]/70 font-bold">
              © 2026 VECNEX. All rights reserved.
            </div>
          </div>

          {/* Disciplines */}
          <div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-widest font-heading mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              {BRANCHES.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/branches/${b.id}`}
                    className="text-[#111111] hover:text-[#6E263D] transition-colors flex items-center justify-between"
                  >
                    <span>{b.fullName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Package Deliverables */}
          <div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-widest font-heading mb-4">
              Package Includes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#111111] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span className="font-bold">Source Code ZIP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span className="font-bold">IEEE Word (.docx) Report</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span className="font-bold">Submission PDF Document</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span className="font-bold">Seminar Viva PPT (.pptx)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span className="font-bold">Video Setup Walkthrough</span>
              </li>
            </ul>
          </div>

          {/* Legal & Direct Support */}
          <div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-widest font-heading mb-4">
              Platform & Orders
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <Link href="/projects" className="text-[#111111] hover:text-[#6E263D] transition-colors">
                  All Projects Catalog
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#111111] hover:text-[#6E263D] transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/custom-request" className="text-[#111111] hover:text-[#6E263D] transition-colors">
                  Custom Engineering Order
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#111111] hover:text-[#6E263D] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#111111] hover:text-[#6E263D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#111111] hover:text-[#6E263D] transition-colors">
                  Student Portal Login
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/917382324346?text=Hi%20VECNEX%20Engineering!%20I%20have%20a%20query%20about%20an%20engineering%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8D2D6] border border-[#6E263D]/30 text-[#111111] hover:bg-[#F4E8E8] transition-colors font-mono text-[11px] font-bold"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#25D366] shrink-0" />
                  <span>WhatsApp: +91 73823 24346</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="pt-8 border-t border-[#E8E5DC] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#111111]/70 gap-2 font-bold">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-[#6E263D]" />
            <span>VECNEX SYSTEM v2.0 • BURGUNDY LUXURY ARCHITECTURE</span>
          </div>
          <div>ESTABLISHED 2026 • DIRECT DELIVERABLES</div>
        </div>
      </div>
    </footer>
  );
}
