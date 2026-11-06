'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, CheckCircle2, X, ArrowRight, Lock, LogIn, UserPlus, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const WHATSAPP_PHONE = '917382324346';
const DISPLAY_PHONE = '+91 73823 24346';

interface RazorpayButtonProps {
  projectId: string;
  projectTitle: string;
  priceInr?: number;
  className?: string;
}

export default function RazorpayButton({
  projectId,
  projectTitle,
  priceInr,
  className = '',
}: RazorpayButtonProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; role?: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored =
          localStorage.getItem('capstonia_user') ||
          localStorage.getItem('fastrack_user') ||
          localStorage.getItem('vecnex_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          if (parsed.name) setStudentName(parsed.name);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.phone) setPhone(parsed.phone);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleOrderClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setShowOrderModal(true);
  };

  const getWhatsAppMessage = (nameVal?: string, phoneVal?: string, emailVal?: string) => {
    return (
      `Hi VECNEX Engineering! 👋\n` +
      `I want to inquire & order this engineering project package:\n\n` +
      `📦 Project: ${projectTitle}\n` +
      `👤 Student Name: ${nameVal?.trim() || user?.name || 'Engineering Student'}\n` +
      `📱 WhatsApp: ${phoneVal?.trim() || user?.phone || 'My WhatsApp Number'}\n` +
      `✉️ Student Account Email: ${emailVal?.trim() || user?.email || 'N/A'}\n` +
      `\n✅ Deliverables Included:\n` +
      `• Verified Source Code (ZIP)\n` +
      `• IEEE Format Project Report (.docx/PDF)\n` +
      `• Seminar Viva PPT Presentation\n` +
      `• Video Execution Walkthrough & Setup Guide\n\n` +
      `Please confirm availability and share order details directly here on WhatsApp.`
    );
  };

  const handleDirectWhatsApp = () => {
    const message = getWhatsAppMessage(studentName, phone, email);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      await supabase.from('custom_requests').insert({
        student_name: studentName.trim() || user?.name || 'Student Buyer',
        email: email.trim() || user?.email || `${phone.replace(/\D/g, '')}@student.vecnex`,
        phone: phone.trim() || user?.phone || 'WhatsApp Direct',
        branch: 'CSE',
        category: 'DIRECT_ORDER',
        project_title: `ORDER: ${projectTitle}`,
        description: `Verified Student Order for project: ${projectTitle} (User: ${user?.email || 'N/A'})`,
        budget: 'WhatsApp Inquiry',
        status: 'PENDING',
      });
    } catch (err) {
      console.warn('Could not record order to database:', err);
    }

    try {
      const existingRaw =
        localStorage.getItem('capstonia_purchased_orders') ||
        localStorage.getItem('fastrack_purchased_orders') ||
        localStorage.getItem('vecnex_purchased_orders');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const newInquiry = {
        id: `wa_${Date.now()}`,
        orderId: `VN-${Date.now().toString().slice(-6)}`,
        projectId,
        projectTitle,
        amount: priceInr || 0,
        createdAt: new Date().toISOString(),
        buyerEmail: email || user?.email || phone,
        status: 'WHATSAPP_ORDER',
      };
      existing.unshift(newInquiry);
      localStorage.setItem('capstonia_purchased_orders', JSON.stringify(existing));
      localStorage.setItem('vecnex_purchased_orders', JSON.stringify(existing));
    } catch (_) {}

    setIsSubmitting(false);
    setShowOrderModal(false);

    handleDirectWhatsApp();
  };

  return (
    <>
      {/* Prominent Direct WhatsApp Order Button - Black Typography */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleOrderClick}
          className={`w-full bg-[#E8D2D6] hover:bg-[#F4E8E8] text-[#111111] font-black py-3.5 px-6 rounded-full shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 text-xs sm:text-sm active:scale-[0.99] border-2 border-[#6E263D] cursor-pointer ${className}`}
        >
          {/* Universal WhatsApp Icon */}
          <svg className="w-5 h-5 fill-[#25D366] shrink-0" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16.002 2C8.269 2 2 8.27 2 16.002c0 2.658.742 5.228 2.152 7.461L2.05 30.014l6.732-2.073A13.93 13.93 0 0 0 16.002 30C23.733 30 30 23.732 30 16.002 30 8.27 23.733 2 16.002 2zm7.644 19.832c-.32.898-1.59 1.656-2.586 1.871-.68.148-1.57.266-4.555-.973-3.816-1.586-6.28-5.46-6.473-5.715-.187-.258-1.547-2.062-1.547-3.934 0-1.871.977-2.793 1.328-3.176.352-.383.766-.48 1.023-.48.258 0 .512.004.738.016.242.012.566-.094.887.676.328.789 1.125 2.742 1.223 2.941.098.2.164.434.031.691-.133.258-.2.418-.398.652-.199.234-.418.523-.598.703-.2.2-.41.418-.176.82.234.398 1.043 1.723 2.234 2.785 1.535 1.367 2.832 1.793 3.23 1.992.398.2.633.168.867-.098.234-.266.996-1.16 1.262-1.559.266-.398.531-.332.898-.2.367.133 2.332 1.1 2.73 1.3.398.2.664.297.766.465.098.172.098.992-.223 1.89z" />
          </svg>
          <span className="text-[#111111]">Order via WhatsApp</span>
        </button>

        <p className="text-center text-[10px] text-[#111111]/80 font-mono flex items-center justify-center gap-1.5 font-bold">
          <Lock className="h-3 w-3 text-[#6E263D]" />
          <span>Student Sign In required to place order • Instant Delivery</span>
        </p>
      </div>

      {/* Mandatory Sign In Modal - Burgundy Luxury White Card */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center border-2 border-[#E8D2D6]">
            <div className="w-12 h-12 rounded-2xl bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
              <Lock className="h-6 w-6 text-[#6E263D]" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] mb-2 font-bold">
                AUTHENTICATION REQUIRED
              </span>
              <h3 className="text-xl font-bold font-heading text-[#111111]">Sign In to Order Project</h3>
              <p className="text-xs text-[#111111]/80 font-medium mt-2 leading-relaxed">
                Please sign in or create a student account to order <strong>&quot;{projectTitle}&quot;</strong>. Your account protects order history, verified IEEE downloads, and 1-on-1 technical mentoring.
              </p>
            </div>

            <div className="p-4 bg-[#F7F5EF] border border-[#E8E5DC] rounded-2xl text-[11px] text-left space-y-1.5">
              <div className="text-[#111111] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span>Verified Account Privileges:</span>
              </div>
              <div className="pl-5 text-[#111111]/80 font-medium text-[11px] space-y-1">
                <div>• Permanent access to Source Code ZIP & Reports</div>
                <div>• Verified WhatsApp student support & guidance</div>
                <div>• Fast 1-click re-downloads across devices</div>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}&reason=order`}
                className="w-full py-3 bg-[#F4E8E8] hover:bg-[#E8D2D6] border border-[#6E263D]/40 text-[#111111] rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <LogIn className="h-4 w-4 text-[#6E263D]" />
                <span>Sign In with Existing Account</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
              </Link>

              <Link
                href={`/login?mode=signup&redirect=${encodeURIComponent(pathname)}&reason=order`}
                className="w-full py-3 luxury-button-accent rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="h-4 w-4 text-[#111111]" />
                <span>Create New Student Account</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="w-full py-2 text-xs font-mono text-[#111111]/70 hover:text-[#111111] transition-colors cursor-pointer font-bold"
              >
                Cancel and continue browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal - Burgundy Luxury White Card */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border-2 border-[#E8D2D6]">
            <div className="flex items-start justify-between border-b border-[#E8E5DC] pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] mb-1.5 font-bold">
                  VERIFIED STUDENT ORDER
                </span>
                <h3 className="text-lg font-bold font-heading text-[#111111]">Order Project Package</h3>
                <p className="text-xs text-[#111111]/80 font-medium line-clamp-1">
                  {projectTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="text-[#111111]/70 hover:text-[#111111] p-1 rounded-lg hover:bg-[#F4E8E8] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Signed In User Pill */}
            {user && (
              <div className="p-3 bg-[#F4E8E8] border border-[#E8D2D6] rounded-2xl flex items-center gap-2 text-xs text-[#111111] font-bold">
                <User className="h-4 w-4 text-[#6E263D] shrink-0" />
                <span className="truncate">
                  Signed in as <strong>{user.name}</strong> ({user.email})
                </span>
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-[#111111] text-xs focus:outline-none focus:border-[#6E263D] font-bold placeholder:text-[#111111]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-[#111111] text-xs focus:outline-none focus:border-[#6E263D] font-bold placeholder:text-[#111111]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                  Student Email
                </label>
                <input
                  type="email"
                  placeholder="student@college.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-[#111111] text-xs focus:outline-none focus:border-[#6E263D] font-bold placeholder:text-[#111111]/40"
                />
              </div>

              <div className="p-3 bg-[#F4E8E8] border border-[#E8D2D6] rounded-2xl space-y-1 text-[11px]">
                <div className="text-[#111111] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                  <span>Deliverables Ready via WhatsApp:</span>
                </div>
                <div className="text-[#111111]/80 font-medium pl-5 space-y-0.5 text-[11px]">
                  <div>• Tested Source Code ZIP</div>
                  <div>• IEEE Formatted Report (.docx/PDF) & Viva PPT</div>
                  <div>• Execution Walkthrough & Technical Support</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#E8D2D6] hover:bg-[#F4E8E8] border-2 border-[#6E263D] text-[#111111] font-bold rounded-full text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
                  <span>Send Order to WhatsApp ({DISPLAY_PHONE})</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
