'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Shield,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogIn,
  LogOut,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { BRANCHES } from '@/lib/constants';
import VecnexLogo from '@/components/common/vecnex-logo';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const stored =
        localStorage.getItem('capstonia_user') ||
        localStorage.getItem('fastrack_user') ||
        localStorage.getItem('vecnex_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('authChange', checkUser);
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('authChange', checkUser);
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    localStorage.removeItem('capstonia_user');
    localStorage.removeItem('fastrack_user');
    localStorage.removeItem('vecnex_user');
    setUser(null);
    setUserDropdownOpen(false);
    window.dispatchEvent(new Event('authChange'));
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-navbar border-b border-[#E8D2D6] backdrop-blur-md">
      {/* Top Burgundy & Ivory Micro-Announcement Bar */}
      <div className="bg-[#F4E8E8] border-b border-[#E8D2D6] text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#111111] font-medium truncate">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8D2D6] border border-[#6E263D]/20 text-[#111111] text-[10px] font-mono uppercase tracking-wider font-bold">
              VERIFIED REPOSITORY
            </span>
            <span className="hidden md:inline text-[#111111]">
              Curated Academic Engineering Packages • Production Code & IEEE Formats
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[#111111]">
            <Link
              href="/custom-request"
              className="text-[11px] font-mono text-[#111111] hover:text-[#6E263D] transition-colors flex items-center gap-1 font-bold"
            >
              <span>Custom R&D</span>
              <ArrowRight className="h-3 w-3 text-[#6E263D]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* VECNEX Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <VecnexLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F4E8E8] hover:text-[#6E263D] transition-all tracking-wide"
            >
              Home
            </Link>

            <Link
              href="/projects"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F4E8E8] hover:text-[#6E263D] transition-all tracking-wide flex items-center gap-1.5"
            >
              <Compass className="h-3.5 w-3.5 text-[#6E263D]" />
              <span>All Projects</span>
            </Link>

            {/* Branches Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBranchesOpen(true)}
              onMouseLeave={() => setBranchesOpen(false)}
            >
              <button
                type="button"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F4E8E8] hover:text-[#6E263D] transition-all tracking-wide flex items-center gap-1 cursor-pointer"
              >
                <span>Branches</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-[#111111]/70 transition-transform duration-200 ${
                    branchesOpen ? 'rotate-180 text-[#6E263D]' : ''
                  }`}
                />
              </button>

              {branchesOpen && (
                <div className="absolute top-full left-0 w-80 p-2 mt-1 rounded-2xl bg-white border border-[#E8D2D6] shadow-xl space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 border-b border-[#E8E5DC] mb-1 font-bold">
                    Specialized Disciplines
                  </div>
                  {BRANCHES.map((b) => (
                    <Link
                      key={b.id}
                      href={`/branches/${b.id}`}
                      onClick={() => setBranchesOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-[#111111] hover:bg-[#F4E8E8] transition-colors group/item"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-[#111111] group-hover/item:text-[#6E263D]">
                          {b.fullName}
                        </span>
                        <span className="text-[10px] text-[#111111]/70 font-mono">
                          {b.name} Specialization
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] font-bold">
                        {b.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/custom-request"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F4E8E8] hover:text-[#6E263D] transition-all tracking-wide flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#6E263D]" />
              <span>Custom Order</span>
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#F4E8E8] text-[#111111] text-xs font-bold transition-all border border-[#E8D2D6] shadow-xs"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-[#6E263D]" />
              <span>My Purchases</span>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F4E8E8] hover:bg-[#E8D2D6] text-[#111111] text-xs font-bold transition-all border border-[#6E263D]/30 cursor-pointer shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-white text-[#111111] border border-[#6E263D]/40 flex items-center justify-center text-[10px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#111111]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-white border border-[#E8D2D6] shadow-xl z-50 space-y-1 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-[#E8E5DC] mb-1">
                      <p className="text-xs font-bold text-[#111111] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#111111]/70 font-mono truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F4E8E8] transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4 text-[#6E263D]" />
                      <span>My Purchases</span>
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F4E8E8] transition-colors"
                      >
                        <Shield className="h-4 w-4 text-[#6E263D]" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#6E263D] hover:bg-[#F4E8E8] transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-[#6E263D]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#F4E8E8] text-[#111111] text-xs font-bold transition-all border border-[#E8D2D6]"
                >
                  <LogIn className="h-3.5 w-3.5 text-[#6E263D]" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/login?mode=signup"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full luxury-button-accent text-xs font-bold transition-all"
                >
                  <User className="h-3.5 w-3.5 text-[#111111]" />
                  <span>Join</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#111111] hover:bg-[#F4E8E8] border border-[#E8D2D6] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5EF] border-b border-[#E8D2D6] px-4 pt-4 pb-8 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-xs font-bold text-[#111111] bg-white rounded-xl border border-[#E8D2D6]"
          >
            All Projects Catalog
          </Link>

          <Link
            href="/custom-request"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-[#111111] bg-white rounded-xl border border-[#E8D2D6]"
          >
            <Sparkles className="h-4 w-4 text-[#6E263D]" />
            <span>Custom Engineering Request</span>
          </Link>

          <div className="pt-2">
            <p className="px-2 text-[10px] font-mono text-[#111111]/70 uppercase tracking-widest mb-2 font-bold">
              Browse Departments
            </p>
            <div className="grid grid-cols-2 gap-2">
              {BRANCHES.map((b) => (
                <Link
                  key={b.id}
                  href={`/branches/${b.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-xs text-[#111111] hover:bg-[#F4E8E8] bg-white border border-[#E8D2D6] rounded-xl font-bold"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8D2D6] flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-4 py-3 bg-white rounded-xl border border-[#E8D2D6]">
                  <p className="text-xs font-bold text-[#111111]">{user.name}</p>
                  <p className="text-[10px] text-[#111111]/70 font-mono">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 bg-white text-[#111111] rounded-full text-xs font-bold border border-[#E8D2D6]"
                >
                  My Purchases
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 bg-white text-[#111111] rounded-full text-xs font-bold border border-[#E8D2D6]"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-3 bg-[#F4E8E8] text-[#6E263D] border border-[#6E263D]/30 rounded-full text-xs font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 bg-white text-[#111111] rounded-full text-xs font-bold border border-[#E8D2D6]"
                >
                  Sign In
                </Link>
                <Link
                  href="/login?mode=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 luxury-button-accent rounded-full text-xs font-bold"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
