'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BRANCHES } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';
import VecnexLogo from '@/components/common/vecnex-logo';
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Loader2,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role?: string } | null>(null);

  // Password visibility toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const supabase = createClient();

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
  }, []);

  useEffect(() => {
    const currentMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
    setMode(currentMode);
  }, [searchParams]);

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      if (newMode === 'signup') {
        currentUrl.searchParams.set('mode', 'signup');
      } else {
        currentUrl.searchParams.delete('mode');
      }
      window.history.replaceState(null, '', currentUrl.toString());
    }
  };

  const performRedirect = (userRole?: string) => {
    let target = searchParams.get('redirect') || '';

    if (!target || target.startsWith('/login') || target.startsWith('/signup')) {
      target = userRole === 'ADMIN' ? '/admin' : '/dashboard';
    }

    setTimeout(() => {
      try {
        router.push(target);
        router.refresh();
      } catch (e) {
        console.warn('router.push failed, using fallback:', e);
      }
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/login')) {
          window.location.href = target;
        }
      }, 300);
    }, 400);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email: cleanEmail,
          password: cleanPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials. Please verify your details or sign up.');
      }

      const userObj = data.user;

      try {
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });
      } catch {}

      localStorage.setItem('capstonia_user', JSON.stringify(userObj));
      localStorage.setItem('fastrack_user', JSON.stringify(userObj));
      localStorage.setItem('vecnex_user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('authChange'));

      setSuccessMsg(`Sign in successful! Welcome back, ${userObj.name}. Redirecting...`);
      performRedirect(userObj.role);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanName = fullName.trim();
    const cleanEmail = signupEmail.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPassword = signupPassword.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (cleanPassword !== confirmPassword.trim()) {
      setErrorMsg('Passwords do not match. Please re-enter identical passwords.');
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          branch,
          password: cleanPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create account. Please check your details.');
      }

      const userObj = data.user;

      try {
        let registry: any[] = [];
        const stored = localStorage.getItem('capstonia_registered_users');
        if (stored) {
          registry = JSON.parse(stored);
        }
        registry = registry.filter((u) => u.email?.toLowerCase() !== cleanEmail);
        registry.push({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          branch,
          role: userObj.role,
          password: cleanPassword,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('capstonia_registered_users', JSON.stringify(registry));
      } catch {}

      localStorage.setItem('capstonia_user', JSON.stringify(userObj));
      localStorage.setItem('fastrack_user', JSON.stringify(userObj));
      localStorage.setItem('vecnex_user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('authChange'));

      setSuccessMsg(`Account created successfully for ${cleanName}! Redirecting...`);
      performRedirect(userObj.role);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during sign up.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'STUDENT' | 'ADMIN') => {
    setErrorMsg('');
    setLoading(true);

    const user =
      role === 'ADMIN'
        ? { name: 'Admin Lead', email: 'admin@vecnex.com', role: 'ADMIN', branch: 'CSE', phone: '7382324346' }
        : { name: 'Rahul Sharma', email: 'student@college.edu', role: 'STUDENT', branch: 'CSE', phone: '9876543210' };

    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync', user }),
      });
    } catch {}

    localStorage.setItem('capstonia_user', JSON.stringify(user));
    localStorage.setItem('fastrack_user', JSON.stringify(user));
    localStorage.setItem('vecnex_user', JSON.stringify(user));
    window.dispatchEvent(new Event('authChange'));

    setSuccessMsg(`Signed in as ${user.name} (${role})! Redirecting...`);
    performRedirect(role);
  };

  const handleSwitchAccount = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      supabase.auth.signOut();
    } catch {}

    localStorage.removeItem('capstonia_user');
    localStorage.removeItem('fastrack_user');
    localStorage.removeItem('vecnex_user');
    setCurrentUser(null);
    window.dispatchEvent(new Event('authChange'));
    setErrorMsg('');
    setSuccessMsg('Signed out of previous session. You can now authenticate below.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-[#111111]">
      {/* Top Brand & Title Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-block">
          <VecnexLogo size="lg" showWordmark={false} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-[#111111] tracking-tight">
          {mode === 'login' ? 'Authenticate to VECNEX' : 'Create Student Account'}
        </h1>
        <p className="text-xs text-[#111111]/75 font-normal">
          {mode === 'login'
            ? 'Access your purchased deliverables, reports, and viva slides.'
            : 'Join engineering students downloading verified academic packages.'}
        </p>
      </div>

      {/* Already Logged In Banner */}
      {currentUser && (
        <div className="mb-5 p-4 rounded-2xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] flex items-center justify-center font-bold shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="font-bold text-[#111111] text-[12px] truncate">
                Signed in as {currentUser.name}
              </p>
              <p className="text-[10px] text-[#111111]/60 font-mono truncate">{currentUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => performRedirect(currentUser.role)}
              className="px-3 py-1.5 rounded-full luxury-button-primary text-[#111111] text-[11px] font-bold cursor-pointer"
            >
              Continue →
            </button>
            <button
              type="button"
              onClick={handleSwitchAccount}
              title="Sign in with different account"
              className="p-1.5 rounded-full hover:bg-[#F4E8E8] text-[#111111]/60 hover:text-[#111111] transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Order Redirection Notice */}
      {searchParams.get('reason') === 'order' && (
        <div className="mb-4 p-4 rounded-2xl bg-[#F4E8E8] border border-[#6E263D]/30 text-xs flex items-start gap-3">
          <Lock className="h-4 w-4 text-[#6E263D] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#111111] text-[12px]">Account Required to Order</p>
            <p className="text-[11px] text-[#111111]/75 mt-0.5 leading-relaxed">
              Please sign in or register to finalize your project order. Once authenticated, you will be redirected to WhatsApp delivery!
            </p>
          </div>
        </div>
      )}

      {/* Auth Card Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.06)] space-y-5">
        {/* Toggle Mode Buttons */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#F7F5EF] border border-[#E8D2D6]">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login'
                ? 'luxury-button-primary text-[#111111] font-bold shadow-sm'
                : 'text-[#111111]/60 hover:text-[#111111]'
            }`}
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'signup'
                ? 'luxury-button-primary text-[#111111] font-bold shadow-sm'
                : 'text-[#111111]/60 hover:text-[#111111]'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-[#F4E8E8] border border-[#6E263D]/30 text-xs text-[#111111] flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#6E263D] mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold block text-[#111111] mb-0.5">Notice</span>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-[#F4E8E8] border border-[#6E263D]/30 text-xs text-[#111111] flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6E263D]" />
            <div className="leading-snug">
              <span className="font-bold block text-[#111111]">Success</span>
              <span>{successMsg}</span>
            </div>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMsg('Password recovery: You can use the Quick Demo access below or create a new student account.');
                  }}
                  className="text-[10px] font-mono text-[#111111]/60 hover:text-[#111111] font-semibold"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111111]/50 hover:text-[#111111] p-1 cursor-pointer"
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-[#111111]/75 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E8D2D6] bg-white text-[#6E263D] focus:ring-0 h-4 w-4 cursor-pointer"
                />
                <span className="font-medium">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full luxury-button-primary text-[#111111] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#6E263D]" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                  WhatsApp Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                  Branch *
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50 pointer-events-none" />
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full pl-9 pr-2 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:border-[#6E263D] cursor-pointer"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b.id} value={b.id} className="bg-white text-[#111111]">
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111111]/50 hover:text-[#111111] p-1 cursor-pointer"
                  title={showSignupPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 font-bold mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#111111]/50" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F7F5EF] border border-[#E8D2D6] rounded-xl text-xs font-medium text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#6E263D] focus:ring-1 focus:ring-[#6E263D]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111111]/50 hover:text-[#111111] p-1 cursor-pointer"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-[#111111]/75 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#E8D2D6] bg-white text-[#6E263D] focus:ring-0 h-4 w-4 cursor-pointer"
              />
              <span className="font-medium">
                I agree to the <Link href="/terms" className="underline text-[#111111] font-bold">Terms of Service</Link> and <Link href="/privacy" className="underline text-[#111111] font-bold">Privacy Policy</Link>.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full luxury-button-primary text-[#111111] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#6E263D]" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Join</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Quick One-Click Demo Access */}
        <div className="pt-4 border-t border-[#E8D2D6] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 font-bold">
              Instant Access
            </span>
            <span className="text-[10px] font-mono text-[#111111] bg-[#F4E8E8] border border-[#6E263D]/30 px-2 py-0.5 rounded-full font-bold">
              1-Click Demo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('STUDENT')}
              className="px-3 py-2.5 rounded-xl luxury-button-secondary text-xs font-bold text-[#111111] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#6E263D]" />
              <span>Student Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="px-3 py-2.5 rounded-xl luxury-button-secondary text-xs font-bold text-[#111111] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#6E263D]" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center font-mono text-xs text-[#111111]/60">
          INITIALIZING AUTHENTICATION...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
