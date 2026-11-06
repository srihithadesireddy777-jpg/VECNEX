'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { BRANCHES } from '@/lib/constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/lib/utils/currency';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const branchInfo = BRANCHES.find((b) => b.id === project.branch);
  const activePrice = project.discounted_price_inr || project.price_inr;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full relative transition-all duration-300 hover:-translate-y-1 border border-[#E8E5DC] hover:border-[#E8D2D6] shadow-xs hover:shadow-md">
      {/* Product Image Stage */}
      <div className="relative aspect-[16/10] w-full bg-[#F7F5EF] overflow-hidden">
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Category & Branch Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-[#111111] border border-[#E8D2D6] shadow-xs">
            {branchInfo?.name || project.branch}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] shadow-xs">
            {project.category === 'MAJOR_FINAL_YEAR' ? 'Major Project' : 'Mini Project'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow space-y-3.5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E263D] block mb-0.5 font-bold">
            {branchInfo?.fullName || project.branch}
          </span>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#111111] group-hover:text-[#6E263D] transition-colors line-clamp-2 leading-snug">
              {project.title}
            </h3>
          </Link>
        </div>

        <p className="text-xs text-[#111111]/75 line-clamp-2 leading-relaxed font-normal">
          {project.short_description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {(project.tech_stack || []).slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F4E8E8] text-[#111111] border border-[#E8D2D6] font-semibold"
            >
              {tech}
            </span>
          ))}
          {(project.tech_stack || []).length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#F7F5EF] text-[#111111]/70 border border-[#E8E5DC] font-semibold">
              +{(project.tech_stack || []).length - 3}
            </span>
          )}
        </div>

        {/* Deliverables Checklist */}
        <div className="flex items-center gap-2.5 pt-1 text-[10px] text-[#111111]/80 font-semibold">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[#6E263D]" /> Code ZIP
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[#6E263D]" /> IEEE Report
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[#6E263D]" /> Viva PPT
          </span>
        </div>

        {/* Card Footer with Price & Action */}
        <div className="mt-auto pt-3.5 border-t border-[#E8E5DC] flex items-center justify-between gap-2">
          <div>
            {activePrice && activePrice > 0 ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-bold font-mono text-[#111111]">
                  {formatINR(activePrice)}
                </span>
                {project.discounted_price_inr && project.price_inr && project.price_inr > activePrice && (
                  <span className="text-[10px] font-mono text-[#111111]/45 line-through">
                    {formatINR(project.price_inr)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs font-mono font-bold text-[#111111]">
                Complete Package
              </span>
            )}
            <span className="text-[10px] text-[#111111]/60 font-mono block">
              Tested & Verified
            </span>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors luxury-button-accent text-[#111111] shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform text-[#111111]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
