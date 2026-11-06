import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-[#111111] space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] text-[10px] font-mono uppercase tracking-widest mb-3 font-semibold">
          <ShieldCheck className="h-3 w-3 text-[#6E263D]" />
          <span>LEGAL COMPLIANCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#111111]">Terms of Service</h1>
        <p className="text-xs font-mono text-[#111111]/60 mt-1 font-semibold">Last Updated: October 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-8 text-xs sm:text-sm font-normal leading-relaxed text-[#111111]/80">
        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">1. Introduction</h2>
          <p className="text-[#111111]/80">
            Welcome to <strong className="text-[#111111]">VECNEX</strong>. By accessing our platform and purchasing engineering project deliverables, source code packages, documentation, or custom orders, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">2. Product Usage & License</h2>
          <p className="text-[#111111]/80">
            All project deliverables provided on VECNEX—including source code ZIPs, IEEE reports (.docx/PDF), viva presentation slides (.pptx), and execution video demos—are licensed strictly for personal educational and academic reference purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">3. WhatsApp Ordering & Digital Deliverables</h2>
          <p className="text-[#111111]/80">
            Orders and custom requirements are coordinated and delivered directly via WhatsApp (+91 73823 24346) for fast student communication, immediate file transfers, and continuous technical mentoring.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">4. Refund & Technical Support Policy</h2>
          <p className="text-[#111111]/80">
            Due to the downloadable digital nature of engineering source code packages, refunds are only issued if a package is proven non-executable and our engineering mentors cannot resolve the runtime issue within 48 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">5. Contact & Support</h2>
          <p className="text-[#111111]/80">
            For support inquiries or custom requests, please visit our{' '}
            <Link href="/custom-request" className="text-[#111111] underline font-bold">
              Custom Order Request Page
            </Link>{' '}
            or contact our team directly on WhatsApp (+91 73823 24346).
          </p>
        </section>
      </div>
    </div>
  );
}
