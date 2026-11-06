import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-[#111111] space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] text-[10px] font-mono uppercase tracking-widest mb-3 font-semibold">
          <ShieldCheck className="h-3 w-3 text-[#6E263D]" />
          <span>DATA PROTECTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#111111]">Privacy Policy</h1>
        <p className="text-xs font-mono text-[#111111]/60 mt-1 font-semibold">Last Updated: October 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-8 text-xs sm:text-sm font-normal leading-relaxed text-[#111111]/80">
        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">1. Information We Collect</h2>
          <p className="text-[#111111]/80">
            When you purchase a project or submit a custom project request on VECNEX, we collect minimal necessary information including your name, email address, phone number (for WhatsApp deliverable updates), and academic project specifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">2. Order & Direct WhatsApp Communication</h2>
          <p className="text-[#111111]/80">
            All order confirmations, delivery links, and technical mentoring are communicated directly via WhatsApp (+91 73823 24346) and email for rapid student coordination and file transfers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">3. How Information is Used</h2>
          <p className="text-[#111111]/80">
            Collected data is strictly used for fulfilling digital downloads, delivering order receipts, providing customer support, and sending custom engineering deliverables.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">4. Data Protection & Sharing</h2>
          <p className="text-[#111111]/80">
            VECNEX does not sell, trade, or rent user personal data to any third-party marketing companies. All code assets and user details are securely stored.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-[#111111]">5. Questions & Support</h2>
          <p className="text-[#111111]/80">
            If you have questions regarding our privacy practices, please contact us via our{' '}
            <Link href="/custom-request" className="text-[#111111] underline font-bold">
              Custom Order Request Page
            </Link>{' '}
            or directly on WhatsApp (+91 73823 24346).
          </p>
        </section>
      </div>
    </div>
  );
}
