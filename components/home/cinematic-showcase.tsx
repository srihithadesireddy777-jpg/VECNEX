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
    <section className="relative py-12 sm:py-16 lg:py-20 border-b border-[#E8D2D6] overflow-hidden bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8D2D6] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6E263D] font-bold block mb-1">
              Curated Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111111] tracking-tight">
              Featured Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#111111]/80 mt-1 font-normal max-w-lg">
              Pre-verified major and mini engineering project deliverables ready for immediate download.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <span className="text-xs font-mono text-[#111111]/70 mr-1 font-semibold">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(spotlight.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Project"
              className="h-9 w-9 rounded-full bg-white border border-[#E8D2D6] hover:bg-[#F4E8E8] flex items-center justify-center text-[#111111] cursor-pointer shadow-xs transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Project"
              className="h-9 w-9 rounded-full luxury-button-accent flex items-center justify-center text-[#111111] cursor-pointer shadow-xs"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Clean Featured Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#E8D2D6] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left 7 Columns: Responsive Image Preview */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F7F5EF] border border-[#E8D2D6]">
                <Image
                  src={currentProject.thumbnail_url}
                  alt={currentProject.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 55vw"
                  className="object-cover"
                />

                {/* Subtle Category Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-[#111111] border border-[#E8D2D6] shadow-xs">
                    {branchInfo?.name || currentProject.branch}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] shadow-xs">
                    {currentProject.category === 'MAJOR_FINAL_YEAR' ? 'Major Project' : 'Mini Project'}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {spotlight.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative h-11 w-16 sm:w-20 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      selectedIndex === idx
                        ? 'border-[#6E263D] ring-2 ring-[#6E263D]/20'
                        : 'border-[#E8D2D6] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={p.thumbnail_url} alt={p.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Project Details */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E263D] block mb-1 font-bold">
                  {branchInfo?.fullName || currentProject.branch}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111111] leading-tight">
                  {currentProject.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
                {currentProject.short_description}
              </p>

              {/* Tech Stack Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 block font-bold">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(currentProject.tech_stack || []).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverable Checkpoints */}
              <div className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#E8D2D6]">
                <div className="grid grid-cols-2 gap-2 text-xs text-[#111111]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-semibold">Source Code ZIP</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-semibold">IEEE Report Doc</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-semibold">Viva Presentation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D]" />
                    <span className="font-semibold">Video Demo</span>
                  </div>
                </div>
              </div>

              {/* Price & Details CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#E8E5DC]">
                <div>
                  {activePrice && activePrice > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-[#111111]">
                        {formatINR(activePrice)}
                      </span>
                      {currentProject.discounted_price_inr &&
                        currentProject.price_inr &&
                        currentProject.price_inr > activePrice && (
                          <span className="text-xs font-mono text-[#111111]/45 line-through">
                            {formatINR(currentProject.price_inr)}
                          </span>
                        )}
                    </div>
                  ) : (
                    <span className="text-sm font-mono font-bold text-[#111111]">
                      Complete Package
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#111111]/70 block font-semibold">
                    Instant WhatsApp delivery
                  </span>
                </div>

                <Link
                  href={`/projects/${currentProject.slug}`}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full luxury-button-accent text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>View Specifications</span>
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
