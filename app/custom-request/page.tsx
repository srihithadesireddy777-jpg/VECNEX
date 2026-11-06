'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BRANCHES } from '@/lib/constants';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Code2,
  MessageCircle,
  ArrowRight,
  Lock,
  LogIn,
  UserPlus,
  User,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const WHATSAPP_PHONE = '917382324346';
const DISPLAY_PHONE = '+91 73823 24346';

export default function CustomRequestPage() {
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; role?: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    branch: 'CSE',
    category: 'MAJOR_FINAL_YEAR',
    projectTitle: '',
    techStack: '',
    description: '',
    deadline: '',
    budget: '',
  });

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
          setFormData((prev) => ({
            ...prev,
            studentName: prev.studentName || parsed.name || '',
            email: prev.email || parsed.email || '',
            phone: prev.phone || parsed.phone || '',
          }));
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

  const generateWhatsAppMessage = () => {
    return (
      `Hi VECNEX Engineering! 👋\n` +
      `I would like to place a Custom Engineering Project Order:\n\n` +
      `👤 Student Name: ${formData.studentName.trim() || user?.name || 'Engineering Student'}\n` +
      `📱 WhatsApp: ${formData.phone.trim() || user?.phone || 'My WhatsApp Number'}\n` +
      `✉️ Verified Account Email: ${formData.email.trim() || user?.email || 'N/A'}\n` +
      `🎓 Branch: ${formData.branch}\n` +
      `📁 Category: ${formData.category === 'MAJOR_FINAL_YEAR' ? 'Major Final Year Project' : 'Mini Project'}\n` +
      `💡 Project Topic / Title: ${formData.projectTitle.trim()}\n` +
      (formData.techStack.trim() ? `💻 Tech Stack: ${formData.techStack.trim()}\n` : '') +
      (formData.deadline ? `📅 Target Deadline: ${formData.deadline}\n` : '') +
      (formData.budget.trim() ? `💰 Estimated Budget: ${formData.budget.trim()}\n` : '') +
      (formData.description.trim() ? `📝 Project Details / Specifications:\n${formData.description.trim()}\n` : '') +
      `\nPlease review my custom project requirements and share pricing, feasibility & IEEE deliverable details.`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    setError('');

    const message = generateWhatsAppMessage();
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    setWhatsappLink(waUrl);

    try {
      const supabase = createClient();
      await supabase.from('custom_requests').insert({
        student_name: formData.studentName || user.name,
        email: formData.email || user.email,
        phone: formData.phone || user.phone || 'WhatsApp Direct',
        branch: formData.branch,
        category: formData.category,
        project_title: formData.projectTitle,
        tech_stack: formData.techStack || null,
        description: formData.description ? `(User: ${user.email}) ${formData.description}` : `(User: ${user.email})`,
        deadline: formData.deadline || null,
        budget: formData.budget || null,
        status: 'PENDING',
      });
    } catch (err: unknown) {
      console.warn('Database save warning (proceeding to WhatsApp):', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[#111111] space-y-10 bg-[#F7F5EF]">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6]">
          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
          <span>Direct WhatsApp Engineering Consultation</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#111111] tracking-tight">
          Request a Custom Project
        </h1>
        <p className="text-xs sm:text-sm text-[#111111]/80 max-w-xl mx-auto font-medium leading-relaxed">
          Need a unique topic, specific IEEE base paper implementation, or specialized tech stack? Submit your details below to directly connect with our senior mentors on WhatsApp ({DISPLAY_PHONE}).
        </p>
      </div>

      {submitted ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#E8D2D6] text-center space-y-6 shadow-md">
          <div className="w-16 h-16 bg-[#F4E8E8] border border-[#E8D2D6] text-[#6E263D] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="h-9 w-9 text-[#6E263D]" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-[#111111]">Custom Specification Prepared!</h2>
          <p className="text-xs sm:text-sm text-[#111111]/85 max-w-md mx-auto font-medium leading-relaxed">
            Thank you, <strong className="text-[#111111]">{formData.studentName || user?.name}</strong>. Your custom requirements for{' '}
            <strong className="text-[#111111]">&quot;{formData.projectTitle}&quot;</strong> are formatted. Connect on WhatsApp to discuss codebase architecture, IEEE formatting, and delivery schedules.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappLink || `https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E8D2D6] hover:bg-[#F4E8E8] border-2 border-[#6E263D] text-[#111111] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
              <span>Open Chat on WhatsApp ({DISPLAY_PHONE})</span>
              <ArrowRight className="h-4 w-4 text-[#111111]" />
            </a>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  studentName: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  branch: 'CSE',
                  category: 'MAJOR_FINAL_YEAR',
                  projectTitle: '',
                  techStack: '',
                  description: '',
                  deadline: '',
                  budget: '',
                });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full luxury-button-secondary text-xs font-bold"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-4">
            {/* Sign In Notice for Guests */}
            {!user ? (
              <div className="p-4 rounded-2xl bg-[#F4E8E8] border border-[#E8D2D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <Lock className="h-5 w-5 text-[#6E263D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111] block font-bold">
                      AUTHENTICATION REQUIRED
                    </span>
                    <p className="text-xs text-[#111111]/80 mt-0.5 font-medium">
                      Please sign in or register to submit custom project orders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/login?redirect=/custom-request&reason=order"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-white hover:bg-[#F7F5EF] text-[#111111] border border-[#E8D2D6] text-xs font-bold text-center shadow-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login?mode=signup&redirect=/custom-request&reason=order"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-full luxury-button-accent text-xs font-bold text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-white border border-[#E8D2D6] rounded-2xl flex items-center justify-between text-xs text-[#111111] font-bold shadow-xs">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#6E263D]" />
                  <span>
                    Authenticated Student: <strong>{user.name}</strong> ({user.email})
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] px-2 py-0.5 rounded-full font-bold">
                  READY
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-3xl space-y-5 border border-[#E8D2D6] shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@college.edu.in"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Engineering Branch *
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D] cursor-pointer"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b.id} value={b.id} className="bg-white text-[#111111]">
                        {b.fullName} ({b.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Project Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D] cursor-pointer"
                  >
                    <option value="MAJOR_FINAL_YEAR" className="bg-white text-[#111111]">
                      Major Final Year Project
                    </option>
                    <option value="MINI_PROJECT" className="bg-white text-[#111111]">
                      Mini Project
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Preferred Tech Stack
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="e.g. Python, PyTorch, React, FastApi"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                  Project Title / Topic *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  placeholder="e.g. Real-Time Vision Based Autonomous Drone Navigation"
                  className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                  Detailed Specifications & IEEE Reference (Optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your required modules, specific dataset, IEEE base paper details, or unique hardware integration..."
                  className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Submission Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] mb-1 font-bold">
                    Approximate Budget (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. As per project scope"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] focus:outline-none focus:border-[#6E263D]"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-bold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#E8D2D6] hover:bg-[#F4E8E8] border-2 border-[#6E263D] text-[#111111] font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
                <span>
                  {isSubmitting
                    ? 'Preparing WhatsApp Consultation...'
                    : user
                    ? `Submit & Chat on WhatsApp (${DISPLAY_PHONE})`
                    : `Sign In & Submit Order (${DISPLAY_PHONE})`}
                </span>
                <ArrowRight className="h-4 w-4 text-[#111111]" />
              </button>
            </form>
          </div>

          {/* Right Guarantee Column */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl space-y-4 border border-[#E8D2D6] shadow-sm">
              <h3 className="text-sm font-bold font-heading text-[#111111] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#6E263D]" />
                <span>Engineering Standards</span>
              </h3>

              <ul className="space-y-3 text-xs text-[#111111]/85 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#111111]">100% Executable Codebase:</strong> Fully tested on target runtime environments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#111111]">IEEE Compliant:</strong> Formatted docx report, system diagrams, and references.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#111111]">Video Installation:</strong> Screen-recorded step-by-step setup guide.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#111111]">Rapid Delivery:</strong> 24-48 hour turnaround for prioritized modules.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl space-y-2 border border-[#E8D2D6] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
                <Clock className="h-3.5 w-3.5 text-[#6E263D]" />
                <span>Active Response Window</span>
              </div>
              <p className="text-xs text-[#111111]/80 font-medium leading-relaxed">
                Direct response on WhatsApp within 15 minutes during active studio hours (9 AM - 10 PM IST).
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl space-y-2 border border-[#E8D2D6] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
                <Code2 className="h-3.5 w-3.5 text-[#6E263D]" />
                <span>Supported Technologies</span>
              </div>
              <p className="text-xs text-[#111111]/80 font-medium leading-relaxed">
                Python, Django, FastAPI, React, Next.js, Node.js, PyTorch, OpenCV, TensorFlow, Scikit-learn, SQL, MongoDB, NLP, & LLM RAG pipelines.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Sign In Modal for Custom Orders */}
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
              <h3 className="text-xl font-bold font-heading text-[#111111]">Sign In to Request Custom Order</h3>
              <p className="text-xs text-[#111111]/80 font-medium mt-2 leading-relaxed">
                Please sign in or create an account to submit your custom project request. Your account ensures your order is verified and our engineering mentors can track your custom deliverables.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/login?redirect=/custom-request&reason=order"
                className="w-full py-3 bg-[#F4E8E8] hover:bg-[#E8D2D6] border border-[#6E263D]/40 text-[#111111] rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <LogIn className="h-4 w-4 text-[#6E263D]" />
                <span>Sign In with Existing Account</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
              </Link>

              <Link
                href="/login?mode=signup&redirect=/custom-request&reason=order"
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
                Cancel and return to form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
