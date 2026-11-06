'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  ShieldCheck,
  ChevronDown,
  Activity,
  Terminal,
} from 'lucide-react';
import EngineeringSculpture from './engineering-sculpture';

export default function CinematicHero({ totalProjects = 84 }: { totalProjects?: number }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-8 sm:pt-14 pb-12 overflow-hidden border-b border-[#E8D2D6] bg-[#F7F5EF]">
      {/* Studio Lighting & Ambient Burgundy Highlights */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Burgundy Ambient Flare */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[500px] bg-gradient-to-b from-[#E8D2D6]/40 via-[#F4E8E8]/30 to-transparent rounded-full blur-[140px]" />
        
        {/* Studio Grid */}
        <div className="absolute inset-0 studio-grid opacity-70" />

        {/* Ambient Warm Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#F7F5EF]/40 to-[#F7F5EF]" />
      </div>

      {/* Top Editorial Metatags Bar - Black Typography */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-[10px] font-mono tracking-widest text-[#111111] select-none pb-6 font-bold">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#6E263D] animate-ping" />
          <span>SYSTEM.ACTIVE // VECNEX CORE v2.0</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[#111111]/80">
          <span>BURGUNDY LUXURY</span>
          <span>•</span>
          <span>IEEE 830 STANDARD</span>
          <span>•</span>
          <span>SPEC: {totalProjects} ACTIVE REPOSITORIES</span>
        </div>
      </div>

      {/* Main Center Stage: 3D Sculpture + Cinematic Typography */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Bold Black Editorial Typography */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Animated Pill Announcement with Light Sweep */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E8D2D6] shadow-xs relative overflow-hidden group">
            <span className="px-2 py-0.5 rounded-md bg-[#F4E8E8] text-[#111111] text-[9px] font-mono tracking-widest uppercase font-bold border border-[#E8D2D6]">
              CINEMATIC RELEASE
            </span>
            <span className="text-xs text-[#111111] font-mono tracking-wide font-bold">
              BURGUNDY LUXURY × ENGINEERING IN MOTION
            </span>
          </div>

          {/* Primary Statement: Oversized Black Typography */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-heading tracking-tight leading-[1.04] text-[#111111]">
            Ideas deserve to be{' '}
            <span className="underline decoration-[#6E263D] underline-offset-8 decoration-3">
              engineered.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-lg text-[#111111]/90 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            VECNEX is an international engineering marketplace for verified B.Tech, B.E., and postgraduate capstone projects. Built with production-grade architectures, verified IEEE documentation, and ready-to-defend viva presentation decks.
          </p>

          {/* Precision Search Box */}
          <div className="max-w-xl mx-auto lg:mx-0 pt-2">
            <form action="/projects" method="GET" className="relative flex items-center group">
              <Search className="absolute left-4.5 h-4.5 w-4.5 text-[#111111]/60 pointer-events-none group-focus-within:text-[#6E263D] transition-colors" />
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, discipline (CSE, AIML...), or tech stack..."
                className="w-full pl-12 pr-32 py-4 rounded-full bg-white border border-[#E8D2D6] text-[#111111] placeholder-[#111111]/50 text-xs sm:text-sm font-semibold shadow-md focus:outline-none focus:border-[#6E263D] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-full luxury-button-accent text-[#111111] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
              </button>
            </form>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full luxury-button-accent font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Compass className="h-4 w-4 text-[#111111]" />
              <span>Explore Projects Catalog</span>
              <ArrowRight className="h-4 w-4 text-[#111111]" />
            </Link>

            <Link
              href="/custom-request"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full luxury-button-primary font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#6E263D]" />
              <span>Custom Engineering Order</span>
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Metallic Engineering Sculpture Showcase Stage */}
        <div className="lg:col-span-5 relative flex items-center justify-center h-[380px] sm:h-[460px] lg:h-[520px]">
          {/* Circular Burgundy Horizon Rings */}
          <div className="absolute inset-4 rounded-full border border-[#E8D2D6] pointer-events-none" />
          <div
            className="absolute inset-12 rounded-full border border-dashed border-[#6E263D]/20 pointer-events-none animate-spin"
            style={{ animationDuration: '60s' }}
          />

          {/* Core Interactive 3D Sculpture Component with Bright Studio Shading */}
          <EngineeringSculpture className="w-full h-full" />

          {/* Floating Telemetry Badges */}
          <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white border border-[#E8D2D6] text-left pointer-events-none shadow-md hidden sm:block">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#111111]/70 font-bold">
              <Activity className="h-3 w-3 text-[#6E263D]" />
              <span>STUDIO METALLICS</span>
            </div>
            <p className="text-xs font-mono font-bold text-[#111111] mt-0.5">TITANIUM CORE // ROT_3D</p>
          </div>

          <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-white border border-[#E8D2D6] text-[10px] font-mono text-[#111111] pointer-events-none hidden sm:flex items-center gap-1.5 shadow-sm font-bold">
            <Terminal className="h-3 w-3 text-[#6E263D]" />
            <span>INTERACTIVE GYRO</span>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 flex items-center justify-between text-[11px] font-mono text-[#111111] border-t border-[#E8D2D6] font-bold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[#6E263D]" />
          <span>100% VERIFIED SOURCE CODE • IEEE FORMATS • READY FOR VIVA</span>
        </div>

        <a
          href="#manifesto"
          className="hover:text-[#6E263D] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>SCROLL TO DISCOVER</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-[#6E263D]" />
        </a>
      </div>
    </section>
  );
}
