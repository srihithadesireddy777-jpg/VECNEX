'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import EngineeringSculpture from './engineering-sculpture';

export default function CinematicHero({ totalProjects = 84 }: { totalProjects?: number }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative flex flex-col justify-between pt-8 sm:pt-12 lg:pt-16 pb-10 sm:pb-14 overflow-hidden border-b border-[#E8D2D6] bg-[#F7F5EF]">
      {/* Studio Lighting & Ambient Neutral Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-[#E8D2D6]/35 via-[#F4E8E8]/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 studio-grid opacity-50" />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Editorial Typography */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Subtle Domain Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8D2D6] text-[11px] font-mono text-[#111111] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#6E263D]" />
              <span>Engineering Project Marketplace</span>
            </div>

            {/* Primary Headline: Elegant, balanced, no excessive boldness or underlines */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.12] text-[#111111]">
              Ideas deserve to be engineered.
            </h1>

            {/* Concise Supporting Description */}
            <p className="text-sm sm:text-base text-[#111111]/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Curated, lab-tested academic projects for engineering students. Every package includes verified source code, formatted IEEE reports, and defense-ready viva presentation decks.
            </p>

            {/* Precision Search Box */}
            <div className="max-w-xl mx-auto lg:mx-0 pt-1">
              <form action="/projects" method="GET" className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-[#111111]/50 pointer-events-none" />
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, discipline (CSE, AIML...), or tech stack..."
                  className="w-full pl-11 pr-28 py-3.5 rounded-full bg-white border border-[#E8D2D6] text-[#111111] placeholder-[#111111]/45 text-xs sm:text-sm font-medium shadow-xs focus:outline-none focus:border-[#6E263D] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 sm:px-5 py-2 rounded-full luxury-button-accent text-[#111111] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
                </button>
              </form>
            </div>

            {/* CTAs: Neat, comfortable touch targets, responsive */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-full luxury-button-accent font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs"
              >
                <Compass className="h-4 w-4 text-[#111111]" />
                <span>Explore Projects ({totalProjects})</span>
              </Link>

              <Link
                href="/custom-request"
                className="w-full sm:w-auto px-6 py-3 rounded-full luxury-button-primary font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="h-4 w-4 text-[#6E263D]" />
                <span>Custom Project Order</span>
              </Link>
            </div>

            {/* Clean Trust Checklist */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-[#111111]/75 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                Tested Source Code
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                IEEE Report Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                WhatsApp Mentor Guidance
              </span>
            </div>
          </div>

          {/* Right Column: Balanced 3D Metallic Engineering Sculpture */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[260px] sm:h-[340px] lg:h-[440px] w-full">
            {/* Subtle Horizon Ring */}
            <div className="absolute inset-2 sm:inset-4 rounded-full border border-[#E8D2D6]/80 pointer-events-none" />
            
            {/* 3D Sculpture Component */}
            <EngineeringSculpture className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
