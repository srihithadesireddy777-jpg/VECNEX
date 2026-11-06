'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { BRANCHES } from '@/lib/constants';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { formatINR } from '@/lib/utils/currency';

export default function CinematicShowcase({ projects }: { projects: Project[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const spotlight = projects.length > 0 ? projects.slice(0, 6) : [];
  const currentProject = spotlight[selectedIndex] || spotlight[0];

  if (!currentProject) return null;

  const branchInfo = BRANCHES.find((b) => b.id === currentProject.branch);
  const activePrice = currentProject.discounted_price_inr || currentProject.price_inr;

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % spotlight.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + spotlight.length) % spotlight.length);
  };

  return (
    <section className="relative py-24 border-b border-[#E8D2D6] overflow-hidden bg-[#F7F5EF]">
      {/* Background Subtle Flare */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E8D2D6]/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8D2D6] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] text-[10px] font-mono tracking-widest uppercase mb-3 font-bold">
              <Compass className="h-3 w-3 text-[#6E263D]" />
              <span>FLAGSHIP REPOSITORY SPOTLIGHT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#111111] tracking-tight">
              Engineering in Spotlight
            </h2>
            <p className="text-xs sm:text-sm text-[#111111]/80 mt-2 font-medium max-w-xl">
              Curated master projects engineered for seamless seminar defense, IEEE publication standards, and production-grade execution.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#111111] mr-2 font-bold">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(spotlight.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Project"
              className="h-10 w-10 rounded-full bg-white border border-[#E8D2D6] hover:bg-[#F4E8E8] flex items-center justify-center text-[#111111] cursor-pointer shadow-xs transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Project"
              className="h-10 w-10 rounded-full luxury-button-accent flex items-center justify-center text-[#111111] cursor-pointer shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Cinematic Advertising Stage: White Card with Soft Burgundy Accents */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8D2D6] shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Columns: Heroic Image Presentation */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F7F5EF] border border-[#E8D2D6] shadow-md group">
                <Image
                  src={currentProject.thumbnail_url}
                  alt={currentProject.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 55vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Ambient Soft Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-[#111111] border border-[#E8D2D6] shadow-sm">
                    {branchInfo?.name || currentProject.branch}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] shadow-sm">
                    {currentProject.category === 'MAJOR_FINAL_YEAR' ? 'Major Project' : 'Mini Project'}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#111111] pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-[#E8D2D6] font-bold">
                    VERIFIED ARTIFACT
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-[#6E263D]/30 text-[#6E263D] font-bold">
                    100% TESTED CODEBASE
                  </span>
                </div>
              </div>

              {/* Quick Thumbnail Strip */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {spotlight.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative h-12 w-20 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${selectedIndex === idx
                        ? 'border-[#6E263D] ring-2 ring-[#6E263D]/30 scale-105'
                        : 'border-[#E8D2D6] opacity-60 hover:opacity-100'
                      }`}
                  >
                    <Image src={p.thumbnail_url} alt={p.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Editorial Technical Specifications - Black Typography */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 block mb-2 font-bold">
                  {branchInfo?.fullName || currentProject.branch} // SPECIFICATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#111111] leading-tight">
                  {currentProject.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#111111]/90 leading-relaxed font-medium">
                {currentProject.short_description}
              </p>

              {/* Tech Stack Pills */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 block font-bold">
                  IMPLEMENTATION STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(currentProject.tech_stack || []).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverable Highlights */}
              <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E8D2D6] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 block font-bold">
                  VERIFIED DELIVERABLES INCLUDED
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#111111]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-bold">Tested Code ZIP</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-bold">IEEE Word & PDF</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-bold">Seminar Viva PPT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-bold">Video Walkthrough</span>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E5DC]">
                <div>
                  {activePrice && activePrice > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-mono text-[#111111]">
                        {formatINR(activePrice)}
                      </span>
                      {currentProject.discounted_price_inr &&
                        currentProject.price_inr &&
                        currentProject.price_inr > activePrice && (
                          <span className="text-xs font-mono text-[#111111]/50 line-through">
                            {formatINR(currentProject.price_inr)}
                          </span>
                        )}
                    </div>
                  ) : (
                    <span className="text-sm font-mono font-bold text-[#111111]">
                      Complete Package
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#111111]/70 block font-bold">
                    Instant WhatsApp Delivery
                  </span>
                </div>

                <Link
                  href={`/projects/${currentProject.slug}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full luxury-button-accent text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Examine Specifications</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
